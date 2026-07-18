import type { LoginValues, RegisterValues } from "../../types/auth";
import type { User } from "../../types/user";
import { api } from "../api/api";

export const register = async (data: RegisterValues): Promise<User> => {
  const { data: user } = await api.post<User>("/auth/register", data);
  return user;
};

export const login = async (data: LoginValues): Promise<User> => {
  const { data: user } = await api.post<User>("/auth/login", data, {
    _skipAuthRefresh: true,
  });
  return user;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const refreshSession = async (): Promise<{ message: string }> => {
  const { data } = await api.get<{ message: string }>("/auth/refresh", {
    _skipAuthRefresh: true,
  });
  return data;
};
