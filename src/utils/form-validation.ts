import { ValidationConfigItf } from "@/types/types";

export const validateForm = (formData: Record<string, any>, validationConfig: ValidationConfigItf) => {
  let isValid = true;

  for (const fieldName in validationConfig) {
    const config = validationConfig[fieldName];
    const value = formData[fieldName];

    // Check for required fields
    if (config.required && (!value || (typeof value === "string" && value.trim() === ""))) {
      isValid = false;
    }
    // number validation
    else if (config.type === "number") {
      const numValue = parseFloat(value);
      // Check for valid number and positive value
      if (isNaN(numValue) || numValue < 0) {
        isValid = false;
      }
      // Check for max value if defined
      else if (config.maxValue !== undefined && numValue > config.maxValue) {
        isValid = false;
      }
    }
    // characters min long
    else if (
      config.type === "text" &&
      config.minLength !== undefined &&
      typeof value === "string" &&
      value.length < config.minLength
    ) {
      isValid = false;
    }
    // characters max long
    else if (
      config.type === "text" &&
      config.maxLength !== undefined &&
      typeof value === "string" &&
      value.length > config.maxLength
    ) {
      isValid = false;
    }
  }

  return isValid;
};
