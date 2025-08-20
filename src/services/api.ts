import { SubmissionFieldValue } from "@/types/submission-interface";
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
    // Now 'error' is safely typed as AxiosError
    console.error("Axios Error:", error.response?.data);
    console.error("Status:", error.response?.status);
  } else {
    // Handle other types of errors
    console.error("Unexpected Error:", error);
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
    const params: string = "/enrollments/by-student?includeCourse=true" + filterCategory;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchEnrollmentWithSubmission = async (token: string, courseId?: string | null) => {
  try {
    const config = createAuthHeaders(token);
    const filterCategory = courseId ? `&courseId=${courseId}` : "";
    const params: string = "/enrollments/by-student?includeSubmissions=true" + filterCategory;
    const response = await axios.get(params, config);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

// POST

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
