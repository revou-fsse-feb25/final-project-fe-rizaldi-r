"use client";
import TextInput from "@/components/_commons/TextInput";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

const requiredFields: string[] = ["firstName", "lastName", "email", "password"];

export default function SignUpPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitted(true);

    let formIsValid = true;
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        formIsValid = false;
        break;
      }
    }

    if (!formIsValid) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      setMessage("Submited");
    } catch (error) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <main className="">
      <section className="flex flex-col items-center gap-12 h-fit w-170 border border-gray-200 bg-white p-20 my-15 m-auto">
        <h2 className="text-4xl font-bold">Sign Up</h2>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          {/* Name Input */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="first-name">First Name</label>
              <TextInput
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={(val) => handleInputChange("firstName", val)}
                value={formData["firstName"] || ""}
                required={true}
                submitted={submitted}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="last-name">Last Name</label>
              <TextInput
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={(val) => handleInputChange("lastName", val)}
                value={formData["lastName"] || ""}
                required={true}
                submitted={submitted}
              />
            </div>
          </div>

          {/* Email input */}
          {/* TODO: add regex instead */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <TextInput
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={(val) => handleInputChange("email", val)}
              value={formData["email"] || ""}
              required={true}
              submitted={submitted}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <TextInput
              type="password"
              name="password"
              placeholder="********"
              onChange={(val) => handleInputChange("password", val)}
              value={formData["password"] || ""}
              required={true}
              submitted={submitted}
            />
            <p className="text-xs text-gray-400">
              It must be a combination of minimum 8 letters, numbers, and symbols.
            </p>
          </div>

          {/* Submit Button */}
          <button type="submit" className="text-white bg-blue-600 w-full py-3 px-4 cursor-pointer">
            Sign Up
          </button>

          {/* Message Display */}
          {message && <p className="text-blue-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>

        {/* Sign Up Link */}
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold">
            Log In
          </Link>
        </p>
      </section>
    </main>
  );
}
