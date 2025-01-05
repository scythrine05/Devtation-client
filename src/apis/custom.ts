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
  return await handleRequest("get", URL, {
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logoutUser = async () => {
  const URL = `${API_URL}/auth/logout`;
  return await handleRequest("delete", URL, baseOptions);
};

//Users APIs

export const createUser = async (userData: SignUpData, token: string) => {
  const URL = `${API_URL}/user`;
  return await handleRequest("post", URL, {
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      Authorization: `Bearer ${token}`,
    },
    data: userData,
  });
};

export const getUserById = async (userId: string | null) => {
  const URL = `${API_URL}/user/userId/${userId}`;
  const response = await handleRequest("get", URL, baseOptions);
  return response?.data;
};

export const getUserByUsername = async (username: string | null) => {
  const URL = `${API_URL}/user/username/${username}`;
  const response = await handleRequest("get", URL, baseOptions);
  return response?.data;
};

export const updateUserById = async (
  userData: ProfileData,
  user: User | null
) => {
  const userId = user ? user.uid : user;
  const URL = `${API_URL}/user/${userId}`;
  return await handleRequest("put", URL, {
    ...baseOptions,
    data: userData,
  });
};

export const removeUserById = async (user: User | null) => {
  const userId = user ? user.uid : user;
  const URL = `${API_URL}/user/${userId}`;
  return await handleRequest("delete", URL, baseOptions);
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
  const response = await handleRequest("get", URL, baseOptions);
  return response?.data;
};

//Project APIs

export const getProjects = async () => {
  const URL = `${API_URL}/project`;
  const response = await handleRequest("get", URL, baseOptions);
  return response?.data;
};

export const getProjectsByUserId = async (userId: string | null) => {
  const URL = `${API_URL}/project/user/${userId}`;
  const response = await handleRequest("get", URL, baseOptions);
  return response?.data;
};

export const getProjectById = async (projectId: string | null) => {
  const URL = `${API_URL}/project/${projectId}`;
  const response = await handleRequest("get", URL, baseOptions);
  return response?.data;
};

export const postProject = async (projectData: ProjectResquestData) => {
  const URL = `${API_URL}/project`;
  return await handleRequest("post", URL, {
    ...baseOptions,
    data: projectData,
  });
};

export const hypeProject = async (
  user: User | null,
  projectId: string | null
) => {
  const userId = user ? user.uid : user;
  const URL = `${API_URL}/project/hype`;
  return await handleRequest("post", URL, {
    ...baseOptions,
    data: { projectId, userId },
  });
};

export const isProjectHypedByUser = async (
  projectId: string,
  userId: string
): Promise<boolean> => {
  const URL = `${API_URL}/project/${projectId}/ishyped/${userId}`;
  const response = await handleRequest("get", URL, baseOptions);
  return response?.data.isHype ?? false;
};

export const updateProjectById = async (
  projectId: string | undefined,
  projectData: ProjectResquestData
) => {
  const URL = `${API_URL}/project/${projectId}`;
  return await handleRequest("put", URL, {
    ...baseOptions,
    data: projectData,
  });
};

export const deleteProjectById = async (projectId: string | null) => {
  const URL = `${API_URL}/project/${projectId}`;
  return await handleRequest("delete", URL, baseOptions);
};

export const deleteAllProjectsByUserId = async (user: User | null) => {
  const userId = user ? user.uid : user;
  const URL = `${API_URL}/project/user/${userId}`;
  return await handleRequest("delete", URL, baseOptions);
};

//token test API
export const testUser = async () => {
  const URL = `${API_URL}/auth/check-token`;
  return await handleRequest("get", URL, baseOptions);
};

//File API
export const uploadImages = async (files: File[]) => {
  const URL = `${API_URL}/file-upload/images`;

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await handleRequest("post", URL, {
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return response?.data ?? [];
};

export const updateImages = async (
  files: File[] | null,
  removedUrls: string[] | null,
  bucketId: string
) => {
  const URL = `${API_URL}/file-upload/images`;

  const formData = new FormData();

  if (files)
    files.forEach((file) => {
      formData.append("images", file);
    });
  formData.append("bucketId", bucketId);
  formData.append("removedUrls", JSON.stringify(removedUrls));

  const response = await handleRequest("put", URL, {
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return response?.data ?? [];
};

export const uploadDisplayImage = async (file: File) => {
  const URL = `${API_URL}/file-upload/display-image`;

  const formData = new FormData();
  formData.append("displayPicture", file);
  const response = await handleRequest("post", URL, {
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
  const response = await handleRequest("get", URL, baseOptions);
  return response?.data.exists ?? false;
};

export const verifyUniqueEmail = async (email: string) => {
  const URL = `${API_URL}/user/verify-unique-field/email/${email}`;
  const response = await handleRequest("get", URL, baseOptions);
  return response?.data.exists ?? false;
};

export const verifyRecaptchaToken = async (captchaValue: string) => {
  const URL = `${API_URL}/user/verify-captcha`;
  const response = await handleRequest("post", URL, {
    ...baseOptions,
    data: { captchaValue },
  });
  if (response && response.data) {
    const { success } = response.data;
    return success;
  }
};
