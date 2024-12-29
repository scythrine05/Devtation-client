import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";
import { User } from "firebase/auth";
import { auth } from "/src/configs/firebase";

const apiClient = axios.create();

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const user: User | null = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const user: User | null = auth.currentUser;
      if (user && error.config) {
        try {
          const newToken = await user.getIdToken(true);

          error.config.headers = {
            ...(error.config.headers || {}),
            Authorization: `Bearer ${newToken}`,
          } as AxiosRequestHeaders;

          return apiClient.request(error.config);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          throw refreshError;
        }
      }
    }
    return Promise.reject(error);
  }
);

export const handleRequest = async (
  method: "get" | "post" | "put" | "delete" | "options",
  URL: string,
  baseOptions: AxiosRequestConfig
): Promise<AxiosResponse | void> => {
  try {
    return await apiClient({
      method,
      url: URL,
      ...baseOptions,
    });
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};
