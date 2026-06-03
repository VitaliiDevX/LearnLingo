import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Must be at least 8 characters")
    .required("Password is required"),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Must be at least 8 characters")
    .required("Password is required"),
});
