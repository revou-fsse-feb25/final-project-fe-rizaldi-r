"use client";

import { ChangeEvent, useEffect, useState } from "react";

interface TextInputProps {
  type?: string;
  isTextarea?: boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  maxValue?: number;
  onChange: (value: string) => void;
  isSubmitted?: boolean;
  className?: string;
}

export default function TextInput({
  type = "text",
  isTextarea = false,
  name,
  placeholder,
  required = false,
  value,
  maxValue,
  onChange,
  isSubmitted,
  className,
}: TextInputProps) {
  const [error, setError] = useState<string | null>(null);

  const validateInput = (value: string) => {
    let currentError: string | null = null;
    let isValid = true;

    // Required field validation
    if (required && value.trim() === "") {
      currentError = "This field is required.";
      isValid = false;
    }

    // Max value/length validation based on input type
    if (maxValue !== undefined) {
      if (type === "number") {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && (numValue > maxValue || numValue < 0)) {
          currentError = `Score cannot be less than 0 or exceed ${maxValue}.`;
          isValid = false;
        }
      } else {
        if (value.length > maxValue) {
          currentError = `Maximum length is ${maxValue} characters.`;
          isValid = false;
        }
      }
    }

    setError(currentError);
    return isValid;
  };

  // Effect to validate input when the form is submitted or value change
  useEffect(() => {
    if (isSubmitted) {
      validateInput(value);
    }
  }, [isSubmitted, value, required]);

  // Handles changes to the input or textarea element.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newValue = e.target.value;

    // truncate if over maxValue
    if (type !== "number" && maxValue !== undefined && newValue.length > maxValue) {
      newValue = newValue.slice(0, maxValue);
    }

    onChange(newValue);
  };

  const Element = isTextarea ? "textarea" : "input";

  return (
    <>
      <Element
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={`bg-slate-100 border-b border-slate-300 py-3 px-4  ${className ?? "w-full"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
}
