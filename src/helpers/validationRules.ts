import { ValidationRule } from "../types";
import { verifyUniqueUsername, verifyUniqueEmail } from "/src/apis/custom";

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
  validate: async (value) => !(await verifyUniqueUsername(value)),
};

export const emailExists: ValidationRule = {
  field: "email",
  message: "Email already exists",
  validate: async (value) => !(await verifyUniqueEmail(value)),
};

export const isValidLink: ValidationRule = {
  field: "link",
  message: "Invalid URL",
  validate: (value) => {
    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(value.trim());
  },
};

export const isImageFile: ValidationRule = {
  field: "file",
  message: "File must be an image (JPEG, PNG, GIF)",
  validate: (value) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];

    if (typeof value === "object" && value !== null && "type" in value) {
      return allowedFileTypes.includes((value as File).type);
    }
    return false;
  },
};
