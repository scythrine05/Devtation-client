import { ValidationRule, FormErrors } from "/src/types";

const isRequired = (field: string, optionalFields: string[]): boolean => {
  return !optionalFields.includes(field);
};

export const validateForm = async (
  values: Record<string, any>,
  modifiedFields: Record<string, boolean> | null,
  rules: ValidationRule[] | null,
  optionalFields: string[] | null = []
): Promise<FormErrors> => {
  const errors: FormErrors = {};
  const optionalFieldsArray = optionalFields || [];

  //Checking empty fields apart from optional fields
  Object.keys(values).forEach((field) => {
    if (isRequired(field, optionalFieldsArray) && values[field] === "") {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  if (!rules) return errors;
  for (const rule of rules) {
    const value = values[rule.field];
    if (modifiedFields && !modifiedFields[rule.field]) {
      continue;
    }
    if (errors[rule.field]) {
      continue;
    }
    const isValid = await rule.validate(value);
    if (!isValid) {
      errors[rule.field] = rule.message;
    }
  }

  return errors;
};
