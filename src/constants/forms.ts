import {
  bookingSchema,
  loginSchema,
  registerSchema,
} from "../schemas/validationSchemas";
import { ObjectSchema, type AnyObject } from "yup";
import type { Teacher } from "../types/teacher";
import type { LoginValues, RegisterValues } from "../types/auth";
import type { BookingValues } from "../types/booking";

export interface RadioOption {
  label: string;
  value: string;
}

export interface BookingOptions {
  name: string;
  question: string;
  reasons: RadioOption[];
}

export interface FormProps {
  teacher?: Teacher;
  bookingOptions?: BookingOptions;
}

export type FormValues = LoginValues | RegisterValues | BookingValues;

interface FormConfig {
  title: string;
  description: string;
  schema: ObjectSchema<AnyObject>;
  buttonText: string;
  className: string;
  defaultValues: FormValues;
}

export const BOOKING_OPTIONS: BookingOptions = {
  name: "reason",
  question: "What is your main reason for learning language?",
  reasons: [
    { label: "Career and business", value: "career" },
    { label: "Lesson for kids", value: "kids" },
    { label: "Living abroad", value: "abroad" },
    { label: "Exams and coursework", value: "exams" },
    { label: "Culture, travel or hobby", value: "hobby" },
  ],
};

export const FORMS_CONFIG: Record<string, FormConfig> = {
  login: {
    title: "Log in",
    description:
      "Welcome back! Please enter your credentials to access your account and continue your search for an teacher.",
    schema: loginSchema,
    buttonText: "Log in",
    className: "loginForm",
    defaultValues: { email: "", password: "" },
  },
  register: {
    title: "Registration",
    description:
      "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information",
    schema: registerSchema,
    buttonText: "Sign up",
    className: "loginForm",
    defaultValues: { name: "", email: "", password: "" },
  },
  booking: {
    title: "Book trial lesson",
    description:
      "Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.",
    schema: bookingSchema,
    buttonText: "Book",
    className: "bookingForm",
    defaultValues: {
      reason: BOOKING_OPTIONS.reasons[0].value,
      name: "",
      email: "",
      phone: "",
      teacherId: "",
    },
  },
} as const;

export type FormType = keyof typeof FORMS_CONFIG;
