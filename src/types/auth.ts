import { type FieldValues } from "react-hook-form";

export interface LoginValues extends FieldValues {
  email: string;
  password: string;
}

export interface RegisterValues extends LoginValues {
  name: string;
}

export interface BookingValues extends FieldValues {
  reason: string;
  name: string;
  email: string;
  phone: string;
}
