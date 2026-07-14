import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const status = error.response?.status;

    switch (status) {
      case 401:
        return "Session expired. Please login again.";
      case 403:
        return "You do not have permission to view this resource.";
      case 500:
      case 502:
      case 503:
        return "Server is temporarily unavailable. Please try again later.";
      default:
        return error.response?.data?.message || "An unexpected error occurred.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};
