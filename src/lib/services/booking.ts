import type { BookingResponse, BookingValues } from "../../types/booking";
import { api } from "../api/api";

export const bookLesson = async (
  data: BookingValues,
): Promise<BookingResponse> => {
  const { teacherId, ...formData } = data;

  const response = await api.post<BookingResponse>(
    `/booking/${teacherId}`,
    formData,
  );
  return response.data;
};
