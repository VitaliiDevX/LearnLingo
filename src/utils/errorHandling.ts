import { isAxiosError } from "axios";
import { errorMessages } from "../constants/errorMessages";

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const backendMessage = error.response?.data?.message;

    if (typeof backendMessage === "string" && errorMessages[backendMessage]) {
      return errorMessages[backendMessage];
    }

    if (typeof backendMessage === "string") {
      return backendMessage;
    }

    return getStatusMessage(error.response?.status);
  }

  return error instanceof Error
    ? error.message
    : "An unexpected error occurred.";
};

const getStatusMessage = (status?: number): string => {
  switch (status) {
    case 400:
      return "Bad request. Please check your data.";
    case 401:
      return "Unauthorized. Please log in.";
    case 403:
      return "Forbidden. You don't have access.";
    case 404:
      return "Resource not found.";
    case 409:
      return "Conflict. This resource already exists or is unavailable.";
    case 500:
      return "Server error. Please try again later.";
    default:
      return "An unexpected error occurred.";
  }
};
