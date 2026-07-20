import * as yup from "yup";

const nameSchema = yup
  .string()
  .trim()
  .required("Name is required")
  .min(2, "Name must be at least 2 characters");

const emailSchema = yup
  .string()
  .trim()
  .required("Email is required")
  .email("Invalid email");

const passwordSchema = yup
  .string()
  .trim()
  .required("Password is required")
  .min(8, "Must be at least 8 characters");

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const bookingSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  phone: yup
    .string()
    .trim()
    .required("Phone number is required")
    .matches(/^\d{12}$/, "Invalid phone number"),
  reason: yup.string().required("Please select a reason"),
});
