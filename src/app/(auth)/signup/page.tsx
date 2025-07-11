"use client";
import TextInput from "@/components/_commons/TextInput";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function SignUpPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
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
              <TextInput type="text" name="firstName" placeholder="First name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="last-name">Last Name</label>
              <TextInput type="text" name="lastName" placeholder="Last name" />
            </div>
          </div>

          {/* Email input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <TextInput type="email" name="email" placeholder="you@example.com" />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <TextInput type="password" name="password" placeholder="********" />
            <p className="text-xs text-gray-400">
              It must be a combination of minimum 8 letters, numbers, and symbols.
            </p>
          </div>

          {/* Submit Button */}
          <button type="submit" className="text-white bg-blue-600 w-full py-3 px-4 cursor-pointer">
            Sign Up
          </button>

          {/* Message Display */}
          {message && <p className="text-red-500">{message}</p>}
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
