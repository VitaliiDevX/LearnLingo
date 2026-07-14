import type {
  FavoriteActionParams,
  FavoriteActionResponse,
  GetFavoritesParams,
  GetTeachersParams,
  PaginatedTeachers,
} from "../../types/teacher";
import { api } from "../api/api";

export const getTeachers = async ({
  page,
  perPage,
  language,
  level,
  price,
}: GetTeachersParams): Promise<PaginatedTeachers> => {
  const { data } = await api.get<PaginatedTeachers>("/teachers", {
    params: {
      page,
      perPage,
      language,
      level,
      price,
    },
  });

  return data;
};

export const getFavoriteTeachers = async (
  params: GetFavoritesParams,
): Promise<PaginatedTeachers> => {
  const { data } = await api.get<PaginatedTeachers>("/users/favorites", {
    params,
  });
  return data;
};

export const addToFavorites = async ({
  teacherId,
}: FavoriteActionParams): Promise<FavoriteActionResponse> => {
  const { data } = await api.post<FavoriteActionResponse>(
    `/users/favorites/${teacherId}`,
  );
  return data;
};

export const removeFromFavorites = async ({
  teacherId,
}: FavoriteActionParams): Promise<FavoriteActionResponse> => {
  const { data } = await api.delete<FavoriteActionResponse>(
    `/users/favorites/${teacherId}`,
  );
  return data;
};
