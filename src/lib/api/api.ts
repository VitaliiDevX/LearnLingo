import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../../store/useAuthStore";
import { refreshSession } from "../services/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

type FailedRequest = {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _skipAuthRefresh?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest._skipAuthRefresh
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshSession();

        failedQueue.forEach((q) => q.resolve(undefined));
        failedQueue = [];
        return api(originalRequest);
      } catch (e) {
        failedQueue.forEach((q) => q.reject(e));
        failedQueue = [];
        useAuthStore.getState().clearIsAuthenticated();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
