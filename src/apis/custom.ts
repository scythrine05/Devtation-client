const API_URL = import.meta.env.VITE_API_URL;
import { User } from "firebase/auth";
import { handleRequest } from "../helpers/apiHandler";
import { ProfileData, SignUpData, AccountData, ProjectData } from "/src/types";

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
  const URL = `${API_URL}/user/_id/${userId}`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

export const getUserByUsername = async (user: User | null, username: string | null) => {
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
): Promise<AccountData> => {
  const userId = user ? user.uid : "";
  const URL = username
    ? `${API_URL}/account/username/${username}`
    : `${API_URL}/account/_id/${userId}`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

//Project APIs

export const getProjects = async (user: User | null) => {
  const URL = `${API_URL}/project`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

export const getProjectsByUserId = async (user: User | null, userId: string | null) => {
  const URL = `${API_URL}/project/user/${userId}`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

export const postProject = async (
  user: User | null,
  projectData: ProjectData
) => {
  const URL = `${API_URL}/project`;
  return handleRequest("post", URL, user, {
    ...baseOptions,
    data: projectData,
  });
};

//token test API
export const testUser = async (user: User | null) => {
  const URL = `${API_URL}/auth/check-token`;
  return handleRequest("get", URL, user, baseOptions);
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
