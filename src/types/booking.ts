import type { FieldValues } from "react-hook-form";

export interface BookingValues extends FieldValues {
  name: string;
  email: string;
  phone: string;
  reason: string;
  teacherId: string;
  isTrial?: boolean;
}

export interface BookingResponse {
  message: string;
}
