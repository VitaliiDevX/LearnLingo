import type { User } from "../../types/user";
import { api } from "../api/api";

export const getUserProfile = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};
