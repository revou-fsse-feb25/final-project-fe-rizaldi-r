"use client";

import { ChangeEvent, useEffect, useState } from "react";

interface TextInputProps {
  type?: string;
  isTextarea?: boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  submitted?: boolean;
}

export default function TextInput({
  type = "text",
  isTextarea = false,
  name,
  placeholder,
  required = false,
  value,
  onChange,
  submitted,
}: TextInputProps) {
  const [error, setError] = useState<string | null>(null);
  // const [formData, setFormData] = useState({
  //   [name]: "",
  // });

  const validateInput = (value: string) => {
    if (required && value.trim() === "") {
      setError("This field is required.");
      return false;
    }
    setError(null);
    return true;
  };

  useEffect(() => {
    if (submitted) {
      validateInput(value);
    }
  }, [submitted, value, required]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
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
        className="bg-gray-100 border-b border-gray-300 py-3 px-4  w-full"
        // required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
}
