const API_URL = import.meta.env.VITE_API_URL;
import { User } from "firebase/auth";
import { handleRequest } from "../helpers/apiHandler";
import { ProfileData, SignUpData, AccountData } from "/src/types";

const baseOptions = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

//Authentication APIs

export const saveToken = async (token: string) => {
  const URL = `${API_URL}/auth/save-token`;
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

export const getUserById = async (user: User | null, id: string | null) => {
  const URL = `${API_URL}/user/${id}`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

export const updateUserById = async (
  userData: ProfileData,
  user: User | null
) => {
  const id = user ? user.uid : user;
  const URL = `${API_URL}/user/${id}`;
  return await handleRequest("put", URL, user, {
    ...baseOptions,
    data: userData,
  });
};

export const removeUserById = async (user: User | null) => {
  const id = user ? user.uid : user;
  const URL = `${API_URL}/user/${id}`;
  return handleRequest("delete", URL, user, baseOptions);
};

//Account APIs
export const getUserAccount = async (
  user: User | null,
  username: string | null
): Promise<AccountData> => {
  const id = user ? user.uid : "";
  const URL = username
    ? `${API_URL}/account/${username}`
    : `${API_URL}/account/${id}`;
  const response = await handleRequest("get", URL, user, baseOptions);
  return response?.data;
};

//Backend session check
export const testUser = async (user: User | null) => {
  const URL = `${API_URL}/auth/check-token`;
  return handleRequest("get", URL, user, baseOptions);
};

//Open APIs

export const checkUsernameExists = async (
  username: string
): Promise<boolean> => {
  const URL = `${API_URL}/user/check-username/${username}`;
  const response = await handleRequest("get", URL, null, baseOptions, false);
  return response?.data.exists ?? false;
};

export const checkEmailExists = async (email: string) => {
  const URL = `${API_URL}/user/check-email/${email}`;
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
