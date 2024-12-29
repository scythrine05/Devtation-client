import { handleRequest } from "../helpers/apiHandler";

const baseOptions = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const convertUrlsToFiles = async (urls: string[]): Promise<File[]> => {
  const files = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await handleRequest("get", url, {
          ...baseOptions,
          responseType: "blob",
        });

        if (!response?.data) {
          throw new Error("No data received from the response.");
        }

        const blob = response.data;
        const filename = url.substring(url.lastIndexOf("/") + 1);

        return new File([blob], filename, { type: blob.type });
      } catch (error) {
        console.error(`Error processing URL: ${url}`, error);
        throw error;
      }
    })
  );

  return files;
};
