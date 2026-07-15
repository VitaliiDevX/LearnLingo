import type { Language, Price } from "../../types/filters";
import { api } from "../api/api";

export const getLanguages = async (): Promise<Language[]> => {
  const { data } = await api.get<Language[]>("/languages");
  return data;
};

export const getPrices = async (): Promise<Price[]> => {
  const { data } = await api.get<Price[]>("/prices");
  return data;
};
