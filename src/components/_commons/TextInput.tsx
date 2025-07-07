"use client";

import { ChangeEvent, useState } from "react";

interface TextInputProps {
  type?: string;
  name: string;
  placeholder?: string;
}

export default function TextInput({ type, name, placeholder }: TextInputProps) {
  const [formData, setFormData] = useState({
    [name]: "",
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleFormChange}
      className="bg-gray-100 border-b border-gray-300 py-3 px-4"
      required
    />
  );
}
