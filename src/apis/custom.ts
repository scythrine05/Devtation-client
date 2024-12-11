const API_URL = import.meta.env.VITE_API_URL;
import { User } from "firebase/auth";
import { handleRequest } from "../helpers/apiHandler";
import { ProfileData, SignUpData, ProjectResquestData } from "/src/types";

const baseOptions = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

//Authentication APIs

export const setToken = async (token: string) => {
  const URL = `${API_URL}/auth/set-token`;
  return handleRequest(
    "get",
    URL,
    null,
    {
      ...baseOptions,
      headers: {
        ...baseOptions.headers,
        Authorization: `Bearer ${token}`,
      },
    },
    false
  );
};

export const logoutUser = async (user: User | null) => {
  const URL = `${API_URL}/auth/logout`;
  return handleRequest("delete", URL, user, baseOptions);
};

//Users APIs

export const createUser = async (userData: SignUpData, token: string) => {
  const URL = `${API_URL}/user`;
  return handleRequest(
    "post",
    URL,
    null,
    {
      ...baseOptions,
      headers: {
        ...baseOptions.headers,
        Authorization: `Bearer ${token}`,
      },
      data: userData,
    },
    false
  );
};

export const getUserById = async (user: User | null, userId: string | null) => {
  const URL = `${API_URL}/user/userId/${userId}`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

export const getUserByUsername = async (
  user: User | null,
  username: string | null
) => {
  const URL = `${API_URL}/user/username/${username}`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

export const updateUserById = async (
  userData: ProfileData,
  user: User | null
) => {
  const userId = user ? user.uid : user;
  const URL = `${API_URL}/user/${userId}`;
  return await handleRequest("put", URL, user, {
    ...baseOptions,
    data: userData,
  });
};

export const removeUserById = async (user: User | null) => {
  const userId = user ? user.uid : user;
  const URL = `${API_URL}/user/${userId}`;
  return handleRequest("delete", URL, user, baseOptions);
};

//Account APIs
export const getUserAccount = async (
  user: User | null,
  username: string | null
): Promise<ProfileData> => {
  const userId = user ? user.uid : user;
  const URL = username
    ? `${API_URL}/account/username/${username}`
    : `${API_URL}/account/userId/${userId}`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

//Project APIs

export const getProjects = async (user: User | null) => {
  const URL = `${API_URL}/project`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

export const getProjectsByUserId = async (
  user: User | null,
  userId: string | null
) => {
  const URL = `${API_URL}/project/user/${userId}`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

export const getProjectById = async (
  user: User | null,
  projectId: string | null
) => {
  const URL = `${API_URL}/project/${projectId}`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

export const postProject = async (
  user: User | null,
  projectData: ProjectResquestData
) => {
  const URL = `${API_URL}/project`;
  return handleRequest("post", URL, user, {
    ...baseOptions,
    data: projectData,
  });
};

export const hypeProject = async (user: User | null, projectId: string) => {
  const userId = user ? user.uid : user;
  const URL = `${API_URL}/project/hype`;
  return handleRequest("post", URL, user, {
    ...baseOptions,
    data: { projectId, userId },
  });
};

export const isProjectHypedByUser = async (
  projectId: string,
  userId: string
): Promise<boolean> => {
  const URL = `${API_URL}/project/${projectId}/ishyped/${userId}`;
  const response = await handleRequest("get", URL, null, baseOptions, false);
  return response?.data.isHype ?? false;
};

export const deleteProjectsByUserId = async (user: User | null) => {
  const userId = user ? user.uid : user;
  const URL = `${API_URL}/project/${userId}`;
  return handleRequest("delete", URL, user, baseOptions);
};

//token test API
export const testUser = async (user: User | null) => {
  const URL = `${API_URL}/auth/check-token`;
  return handleRequest("get", URL, user, baseOptions);
};

//File API

export const uploadImages = async (
  user: User | null,
  files: File[]
): Promise<string[]> => {
  const URL = `${API_URL}/file-upload/images`;
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await handleRequest("post", URL, user, {
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return response?.data ?? [];
};

export const uploadDisplayImage = async (
  user: User | null,
  file: File
): Promise<string> => {
  const URL = `${API_URL}/file-upload/display-image`;
  const formData = new FormData();

  formData.append("image", file);
  const response = await handleRequest("post", URL, user, {
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return response?.data ?? "";
};

//Open APIs

export const verifyUniqueUsername = async (
  username: string
): Promise<boolean> => {
  const URL = `${API_URL}/user/verify-unique-field/username/${username}`;
  const response = await handleRequest("get", URL, null, baseOptions, false);
  return response?.data.exists ?? false;
};

export const verifyUniqueEmail = async (email: string) => {
  const URL = `${API_URL}/user/verify-unique-field/email/${email}`;
  const response = await handleRequest("get", URL, null, baseOptions, false);
  return response?.data.exists ?? false;
};

export const verifyRecaptchaToken = async (captchaValue: string) => {
  const URL = `${API_URL}/user/verify-captcha`;
  const response = await handleRequest(
    "post",
    URL,
    null,
    {
      ...baseOptions,
      data: { captchaValue },
    },
    false
  );
  if (response && response.data) {
    const { success } = response.data;
    return success;
  }
};
