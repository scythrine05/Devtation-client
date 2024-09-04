import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { User } from "firebase/auth";

export const handleRequest = async (
  method: "get" | "post" | "put" | "delete",
  URL: string,
  user: User | null,
  baseOptions: AxiosRequestConfig,
  refreshTokenEnabled: boolean = true
): Promise<AxiosResponse | void> => {
  try {
    const response = await axios({ method, url: URL, ...baseOptions });
    return response;
  } catch (err) {
    if (refreshTokenEnabled)
      return handleTokenExpiration(err, method, URL, user, baseOptions);
    else {
      console.error("Request error (no token refresh):", err);
      throw err;
    }
  }
};

export const handleTokenExpiration = async (
  err: AxiosError | any,
  method: "get" | "post" | "put" | "delete",
  URL: string,
  user: User | null,
  baseOptions: AxiosRequestConfig
): Promise<AxiosResponse | void> => {
  if (axios.isAxiosError(err) && err.response?.status === 401 && user) {
    try {
      const _id_token_ = await user.getIdToken(true);
      const response = await axios({
        method,
        url: URL,
        ...baseOptions,
        headers: {
          ...baseOptions.headers,
          Authorization: `Bearer ${_id_token_}`,
        },
      });
      return response;
    } catch (retryErr) {
      console.error("Error during token refresh and retry:", retryErr);
      throw retryErr;
    }
  } else {
    console.error("Error during request:", err);
    throw err;
  }
};
