import { loginSchema, registerSchema } from "../schemas/authSchemas";

export const AUTH_CONFIG = {
  login: {
    title: "Log in",
    description:
      "Welcome back! Please enter your credentials to access your account and continue your search for an teacher.",
    schema: loginSchema,
    button: "Log in",
  },
  register: {
    title: "Registration",
    description:
      "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information",
    schema: registerSchema,
    button: "Sign up",
  },
};
