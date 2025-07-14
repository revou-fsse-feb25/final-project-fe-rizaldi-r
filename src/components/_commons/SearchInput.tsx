"use client";

import { ChangeEvent, useState } from "react";

interface SearchInputProps {
  type?: string;
  name: string;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  type,
  name,
  placeholder,
  className,
}: SearchInputProps) {
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
    <div
      className={`flex gap-2 bg-slate-100 border border-gray-300 rounded-md py-2.5 px-3.5 ${className}`}
    >
      <img src="/search.svg" className="w-5.5 opacity-50" />
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleFormChange}
        className="w-full focus:outline-none"
        required
      />
    </div>
  );
}
