import { CourseCreateData } from "@/types/course-interface";
import { DescriptionType, ModuleType } from "@/types/module-interface";
import { GradeSubmission, SubmissionFieldValue } from "@/types/submission-interface";
import axios, { AxiosError } from "axios";

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

// FETCH

export const fetchCategoryList = async (token: string) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.get("/categories", config);
    response.status;
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchCoursesList = async (token: string, categoryId?: string | null) => {
  try {
    const config = createAuthHeaders(token);
    const filterCategory = categoryId ? `?categoryId=${categoryId}` : "";
    const params: string = "/courses" + filterCategory;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchCourse = async (token: string, courseId?: string | null) => {
  try {
    const config = createAuthHeaders(token);
    const params: string = `/courses/${courseId}?showInstructor=true&showCategories=true&showSections=true`;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchModule = async (token: string, moduleId?: string | null) => {
  try {
    const config = createAuthHeaders(token);
    const params: string = `/modules/${moduleId}`;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchEnrollmentWithCourseList = async (token: string, categoryId?: string | null) => {
  try {
    const config = createAuthHeaders(token);
    const filterCategory = categoryId ? `&courseCategoryId=${categoryId}` : "";
    const params: string =
      "/enrollments/by-student?includeCourse=true&includeSections=true" + filterCategory;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchEnrollmentWithSubmissionByStudent = async (
  token: string,
  courseId?: string | null,
  includeCourse?: boolean | null
) => {
  try {
    const config = createAuthHeaders(token);
    const filterCourse = courseId ? `&courseId=${courseId}` : "";
    const queryincludeCourse = includeCourse ? `&includeCourse=true` : "";
    const params: string =
      "/enrollments/by-student?includeSubmissions=true" + queryincludeCourse + filterCourse;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchEnrollmentsWithSubmissionAndProgressByStudent = async (token: string) => {
  try {
    const config = createAuthHeaders(token);
    const params: string =
      "/enrollments/by-student?includeCourse=true&includeSubmissions=true&includeAllProgress=true";
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

// instructor students performace page

export const fetchCourseByInstructor = async (
  token: string,
  categoryId?: string,
  showSections?: boolean | null
) => {
  try {
    const config = createAuthHeaders(token);
    const filterCategory = categoryId ? `categoryId=${categoryId}` : "";
    const queryShowSections = showSections ? `showSections=true` : "";
    const params: string = `/courses/by-instructor?showCategories=true&${queryShowSections}&${filterCategory}`;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchEnrollmentWithSubmission = async (token: string, enrollmentId: string) => {
  try {
    const config = createAuthHeaders(token);
    const params: string = `/enrollments/${enrollmentId}?includeSubmissions=true&includeCourse=true`;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchEnrollmentsByCourse = async (token: string, courseId: string) => {
  try {
    const config = createAuthHeaders(token);
    const params: string = `/enrollments/by-course/${courseId}`;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchSubmissionsByEnrollment = async (token: string, enrollmentId: string) => {
  try {
    const config = createAuthHeaders(token);
    const params: string = `/submissions/by-enrollment/${enrollmentId}`;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

// PATCH and POST

export const patchStudentSubmission = async (
  token: string,
  submissionId: string,
  submissionFieldValueData: SubmissionFieldValue[]
) => {
  try {
    const config = createAuthHeaders(token);
    const requestBody = {
      submissionFieldValueData,
    };
    const response = await axios.patch(`/submissions/${submissionId}`, requestBody, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const patchGradeSubmission = async (
  token: string,
  submissionId: string,
  submissionGradeData: GradeSubmission
) => {
  try {
    const config = createAuthHeaders(token);
    const requestBody = {
      ...submissionGradeData,
    };
    const response = await axios.patch(`/submissions/grade/${submissionId}`, requestBody, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const postSection = async (token: string, courseId: string, title: string) => {
  try {
    const config = createAuthHeaders(token);
    const requestBody = {
      courseId,
      title,
    };
    const response = await axios.post(`/sections`, requestBody, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteSection = async (token: string, sectionId: string) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.delete(`/sections/${sectionId}`, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const postModule = async (
  token: string,
  createModuleData: {
    sectionId: string;
    title: string;
    description: string;
    moduleType: ModuleType;
  }
) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.post(`/modules`, createModuleData, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const patchModule = async (
  token: string,
  moduleId: string,
  editModuleData: { title?: string; description?: string; moduleType?: string }
) => {
  try {
    const config = createAuthHeaders(token);
    const requestBody = editModuleData;
    const response = await axios.patch(`/modules/${moduleId}`, requestBody, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const patchSubdescription = async (
  token: string,
  subdescId: string,
  editModuleData: { header?: string; description?: string; type?: DescriptionType }
) => {
  try {
    const config = createAuthHeaders(token);
    const requestBody = editModuleData;
    const response = await axios.patch(`/subdescriptions/${subdescId}`, requestBody, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteSubdescription = async (token: string, subdescId: string) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.delete(`/subdescriptions/${subdescId}`, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const patchLink = async (
  token: string,
  linkId: string,
  editLinkData: { label?: string; href?: string }
) => {
  try {
    const config = createAuthHeaders(token);
    const requestBody = editLinkData;
    const response = await axios.patch(`/links/${linkId}`, requestBody, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteLink = async (token: string, linkId: string) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.delete(`/links/${linkId}`, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

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

export const postSubmissionField = async (
  token: string,
  addSubmissionFieldData: { label?: string; isTextfield?: boolean; submissionTemplateId: string }
) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.post(`/submission-fields`, addSubmissionFieldData, config);
    return response;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteSubmissionField = async (token: string, submissionFieldId: string) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.delete(`/submission-fields/${submissionFieldId}`, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteCourse = async (token: string, courseId: string) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.delete(`/courses/${courseId}`, config);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const postCourse = async (token: string, addCourseData: CourseCreateData) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.post(`/courses`, addCourseData, config);
    return response;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const postRegister = async (addUserData: {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  program: string;
}) => {
  try {
    const response = await axios.post(`/auth/register`, addUserData);
    return response;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const createEnrollment = async (token: string, courseId: string) => {
  try {
    const config = createAuthHeaders(token);
    const response = await axios.post(`/enrollments`, { courseId }, config);
    return response;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
