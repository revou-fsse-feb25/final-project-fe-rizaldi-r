"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(" formData", formData);
  };

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      if (formData.email === "user@example.com" && formData.password === "password123") {
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
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleFormChange}
              className="bg-gray-100 border-b border-b-gray-300 py-3 px-4"
              required
            />
          </div>
          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleFormChange}
              className="bg-gray-100 border-b border-b-gray-300 py-3 px-4"
              required
            />
            <p className="text-xs text-gray-400">
              It must be a combination of minimum 8 letters, numbers, and symbols.
            </p>
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
          Don't have an account? <Link href="/signup" className="font-semibold">Sign Up</Link>
        </p>
      </section>
    </main>
  );
}
