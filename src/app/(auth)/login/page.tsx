"use client";

import TextInput from "@/components/_commons/TextInput";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: session, status, update } = useSession();
  const router = useRouter();

  // TODO: use form hooks
  // const token = session?.accessToken;
  // if (token) setDefaultAuthHeader(token);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitted(true);
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        setIsLoading(false);
        return;
      }

      router.refresh();
      // router.push("/student/my-courses");
      // redirect("/");
    } catch (error) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <main className="grid lg:grid-cols-2 bg-white h-dvh">
      <section className="h-full relative">
        <img src="/login-image.jpg" alt="" className="object-cover h-full w-full" />
        <p className="absolute left-0 bottom-0 px-2 py-0.5 bg-slate-50 text-xs">
          Photo by{" "}
          <Link
            target="_blank"
            href="https://unsplash.com/@flipboo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >
            Philippe Bout
          </Link>{" "}
          on{" "}
          <Link
            target="_blank"
            href="https://unsplash.com/photos/mens-black-long-sleeved-top-93W0xn4961g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >
            Unsplash
          </Link>
        </p>
      </section>
      <section className="flex flex-col gap-12 p-10 sm:p-20">
        <h2 className="text-4xl font-bold">Log In</h2>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email Address</label>
            <TextInput
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={(val) => handleInputChange("email", val)}
              value={formData["email"] || ""}
              required={true}
              isSubmitted={isSubmitted}
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
              isSubmitted={isSubmitted}
            />
          </div>

          <Link href={""} className="text-blue-600">
            Forgot Password
          </Link>

          {/* Submit Button */}
          {/* TODO: disable login button on loading */}
          <button type="submit" className="text-white bg-blue-600 w-full py-3 px-4 cursor-pointer">
            Login
          </button>
          {/* Message Display */}
          {error && <p className="text-red-500">{error}</p>}
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
