"use client";
import TextInput from "@/components/_commons/TextInput";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value;
      // console.log(" email", email);
      const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement)?.value;
      // console.log(" password", password);

      if (email === "user@example.com" && password === "password123") {
        setMessage("Login successful!");
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
            <TextInput type="email" name="email" placeholder="you@example.com" />
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
            <TextInput type="password" name="password" placeholder="********" />
          </div>

          <Link href={"/"} className="text-blue-600">
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
