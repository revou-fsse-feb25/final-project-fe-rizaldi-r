import {
  CourseCreateData,
  SearchData,
  SortBy,
  SortOption,
  SortOrder,
} from "@/types/course-interface";
import { UserRole } from "@/types/jwtPayload";
import {
  DescriptionType,
  ModuleType,
  SubmissionField,
  SubmissionTemplate,
} from "@/types/module-interface";
import { GradeSubmission, SubmissionFieldValue } from "@/types/submission-interface";
import axios, { AxiosError, Method } from "axios";

// API base URL
const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.baseURL = BaseUrl;

// Bearer token
export const setDefaultAuthHeader = (token?: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Clear the header if there's no token
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Reusable function to create the headers object
export const createAuthHeaders = (token?: string) => {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {};
};

// Error handling
const handleAxiosError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    console.error("Axios Error:", error.response?.data);
    console.error("Status:", error.response?.status);
    throw error;
  } else {
    // Handle other types of errors
    console.error("Unexpected Error:", error);
    throw error;
  }
};

const api = async <T>(
  token: string | undefined,
  method: Method,
  url: string,
  data?: any
): Promise<T> => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios({ method, url, data, ...config });
    return response.data;
    // TODO: generalize respon data type
    // return response; // Return full response object
  } catch (error) {
    handleAxiosError(error);
    throw error; // Re-throw to propagate the error
  }
};

// FETCH functions (GET)
export const fetchUsers = async (token: string) => api<any[]>(token, "GET", "/users");

export const fetchInstructorList = async (token: string) =>
  api<any[]>(token, "GET", "/users?role=INSTRUCTOR");

export const fetchCategoryList = async (token: string) => api<any[]>(token, "GET", "/categories");

export const fetchCoursesList = async (
  token: string,
  categoryId?: string | null,
  searchData?: SearchData | null,
  sortOption?: SortOption | null
) => {
  const filterCategory = categoryId ? `categoryId=${categoryId}` : "";
  const sortCourse = sortOption
    ? `sortBy=${sortOption.sortBy}&sortOrder=${sortOption.sortOrder}`
    : "";
  const searchCourse = searchData ? `${searchData.searchBy}=${searchData.searchQuery}` : "";
  return api<any[]>(token, "GET", `/courses?${filterCategory}&${sortCourse}&${searchCourse}`);
};

export const fetchCourse = async (token: string, courseId?: string | null) =>
  api<any>(
    token,
    "GET",
    `/courses/${courseId}?showInstructor=true&showCategories=true&showSections=true`
  );

export const fetchModule = async (token: string, moduleId?: string | null) =>
  api<any>(token, "GET", `/modules/${moduleId}`);

export const fetchEnrollmentWithCourseList = async (token: string, categoryId?: string | null) => {
  const filterCategory = categoryId ? `&courseCategoryId=${categoryId}` : "";
  return api<any[]>(
    token,
    "GET",
    `/enrollments/by-student?includeCourse=true&includeSections=true${filterCategory}`
  );
};

export const fetchEnrollmentWithSubmissionByStudent = async (
  token: string,
  courseId?: string | null,
  includeCourse?: boolean | null
) => {
  const filterCourse = courseId ? `&courseId=${courseId}` : "";
  const queryincludeCourse = includeCourse ? `&includeCourse=true` : "";
  return api<any[]>(
    token,
    "GET",
    `/enrollments/by-student?includeSubmissions=true${queryincludeCourse}${filterCourse}`
  );
};

export const fetchEnrollmentsWithSubmissionAndProgressByStudent = async (token: string) =>
  api<any[]>(
    token,
    "GET",
    "/enrollments/by-student?includeCourse=true&includeSubmissions=true&includeAllProgress=true"
  );

export const fetchCourseByInstructor = async (
  token: string,
  categoryId?: string,
  showSections?: boolean | null
) => {
  const filterCategory = categoryId ? `categoryId=${categoryId}` : "";
  const queryShowSections = showSections ? `showSections=true` : "";
  return api<any[]>(
    token,
    "GET",
    `/courses/by-instructor?showCategories=true&${queryShowSections}&${filterCategory}`
  );
};

export const fetchEnrollmentWithSubmission = async (token: string, enrollmentId: string) =>
  api<any>(token, "GET", `/enrollments/${enrollmentId}?includeSubmissions=true&includeCourse=true`);

export const fetchEnrollmentsByCourse = async (token: string, courseId: string) =>
  api<any[]>(token, "GET", `/enrollments/by-course/${courseId}`);

export const fetchSubmissionsByEnrollment = async (token: string, enrollmentId: string) =>
  api<any[]>(token, "GET", `/submissions/by-enrollment/${enrollmentId}`);

// POST/PATCH/DELETE functions

export const patchUserRole = async (token: string, userId: string, payload: any) =>
  api<any>(token, "PATCH", `/users/${userId}/role`, payload);

export const deleteUser = async (token: string, userId: string) =>
  api<any>(token, "DELETE", `/users/${userId}`);

export const patchStudentSubmission = async (
  token: string,
  submissionId: string,
  submissionFieldValueData: SubmissionFieldValue[]
) => api(token, "PATCH", `/submissions/${submissionId}`, { submissionFieldValueData });

export const patchGradeSubmission = async (
  token: string,
  submissionId: string,
  submissionGradeData: GradeSubmission
) => api(token, "PATCH", `/submissions/grade/${submissionId}`, submissionGradeData);

export const postSection = async (token: string, courseId: string, title: string) =>
  api(token, "POST", "/sections", { courseId, title });

export const deleteSection = async (token: string, sectionId: string) =>
  api(token, "DELETE", `/sections/${sectionId}`);

export const postModule = async (
  token: string,
  createModuleData: {
    sectionId: string;
    title: string;
    description: string;
    moduleType: ModuleType;
  }
) => api(token, "POST", "/modules", createModuleData);

export const patchModule = async (
  token: string,
  moduleId: string,
  editModuleData: { title?: string; description?: string; moduleType?: string }
) => api(token, "PATCH", `/modules/${moduleId}`, editModuleData);

export const deleteModule = async (token: string, moduleId: string) =>
  api(token, "DELETE", `/modules/${moduleId}`);

export const patchSubdescription = async (
  token: string,
  subdescId: string,
  editModuleData: { header?: string; description?: string; type?: DescriptionType }
) => api(token, "PATCH", `/subdescriptions/${subdescId}`, editModuleData);

export const deleteSubdescription = async (token: string, subdescId: string) =>
  api(token, "DELETE", `/subdescriptions/${subdescId}`);

export const patchLink = async (
  token: string,
  linkId: string,
  editLinkData: { label?: string; href?: string }
) => api(token, "PATCH", `/links/${linkId}`, editLinkData);

export const deleteLink = async (token: string, linkId: string) =>
  api(token, "DELETE", `/links/${linkId}`);

// TODO: convert
export const addLink = async (
  token: string,
  addLinkData: { label?: string; href?: string; moduleId: string }
) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.post(`/links`, addLinkData, config);
    return response;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

// TODO: convert
export const addSubdescription = async (
  token: string,
  addSubdescData: { header?: string; type?: DescriptionType; description: string; moduleId: string }
) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.post(`/subdescriptions`, addSubdescData, config);
    return response;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const postSubmissionTemplate = async (
  token: string,
  payload: { submissionTitle?: string; moduleId: string }
) => api<SubmissionTemplate>(token, "POST", "/submission-templates", payload);

export const postSubmissionField = async (
  token: string,
  addSubmissionFieldData: { label?: string; isTextfield?: boolean; submissionTemplateId: string }
) => api<SubmissionField>(token, "POST", "/submission-fields", addSubmissionFieldData);

export const deleteSubmissionField = async (token: string, submissionFieldId: string) =>
  api(token, "DELETE", `/submission-fields/${submissionFieldId}`);

export const deleteCourse = async (token: string, courseId: string) =>
  api(token, "DELETE", `/courses/${courseId}`);

export const postCourse = async (token: string, addCourseData: CourseCreateData) =>
  api(token, "POST", "/courses", addCourseData);

export const postCourseByAdmin = async (token: string, addCourseData: CourseCreateData) =>
  api(token, "POST", "/courses/by-admin", addCourseData);

export const postRegister = async (addUserData: {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  program: string;
}) => api(undefined, "POST", "/auth/register", addUserData);

export const createEnrollment = async (token: string, courseId: string) =>
  api(token, "POST", "/enrollments", { courseId });
