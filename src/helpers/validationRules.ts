import { ValidationRule } from "../types";
import { checkUsernameExists, checkEmailExists } from "/src/apis/custom";

export const validEmail: ValidationRule = {
  field: "email",
  message: "Email is invalid",
  validate: (value) => /\S+@\S+\.\S+/.test(value),
};

export const passwordMinLength: ValidationRule = {
  field: "password",
  message: "Password must be at least 8 characters",
  validate: (value) => value.length >= 8,
};

export const usernameExists: ValidationRule = {
  field: "username",
  message: "Username already exists",
  validate: async (value) => !(await checkUsernameExists(value)),
};

export const emailExists: ValidationRule = {
  field: "email",
  message: "Email already exists",
  validate: async (value) => !(await checkEmailExists(value)),
};
