"use client";

import TextInput from "@/components/_commons/TextInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter()

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
    setIsLoading(true);
    try {
      const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value;
      const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement)?.value;

      if (email === "user@example.com" && password === "password123") {
        setMessage("Login successful!");
        router.
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <main className="grid grid-cols-2 bg-white h-dvh">
      <img src="/img-placeholder.png" alt="" className="object-cover h-full" />
      <section className="flex flex-col gap-12 p-20">
        <h2 className="text-4xl font-bold">Log In</h2>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email Address</label>
            {/* <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleFormChange}
              className="bg-gray-100 border-b border-b-gray-300 py-3 px-4"
              required
            /> */}
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
            {/* <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleFormChange}
              className="bg-gray-100 border-b border-b-gray-300 py-3 px-4"
              required
            /> */}
            <TextInput
              type="password"
              name="password"
              placeholder="********"
              onChange={(val) => handleInputChange("password", val)}
              value={formData["password"] || ""}
              required={true}
              submitted={submitted}
            />
          </div>

          <Link href={""} className="text-blue-600">
            Forgot Password
          </Link>

          {/* Submit Button */}
          <button type="submit" className="text-white bg-blue-600 w-full py-3 px-4 cursor-pointer">
            Login
          </button>
          {/* Message Display */}
          {message && <p className="text-red-500">{message}</p>}
        </form>

        {/* Sign Up Link */}
        <p>
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold">
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}
