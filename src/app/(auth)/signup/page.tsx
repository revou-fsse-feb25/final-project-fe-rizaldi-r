"use client";

import TextInput from "@/components/_commons/TextInput";
import { postRegister } from "@/services/api";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

// const requiredFields: string[] = ["firstName", "lastName", "email", "password"];

enum Program {
  WEBDEV = "WEBDEV",
  DATA_ANALYST = "DATA_ANALYST",
  MARKETING = "MARKETING",
}

export default function SignUpPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Clear validation error when the user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName || formData.firstName.trim() === "") {
      errors.firstName = "First name is required.";
    }
    if (!formData.lastName || formData.lastName.trim() === "") {
      errors.lastName = "Last name is required.";
    }
    if (!formData.username || formData.username.trim() === "") {
      errors.username = "Username is required.";
    }
    if (!formData.email || formData.email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.password || formData.password.trim() === "") {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (!formData.program || formData.program.trim() === "") {
      errors.program = "Program selection is required.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const isValid = validateForm();
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await postRegister({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        program: formData.program,
      });

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      router.refresh();

      if (response.status === 201) {
        setMessage("Registration successful!");
      }

      setFormData({});
    } catch (err) {
      if (err.response?.data?.message === "User with this email or username already exists") {
        setError("This email address or username is already in use. Please use a different one.");
      } else {
        setError(
          err.response?.data?.message || "An unexpected error occurred during registration."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="">
      <section className="flex flex-col items-center gap-12 h-fit w-170 border border-slate-200 bg-white p-20 my-15 m-auto">
        <h2 className="text-4xl font-bold">Sign Up</h2>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 w-full">
          {/* Name Input */}
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="first-name" className="text-gray-600 mb-1 text-sm">
                First Name
              </label>
              <TextInput
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={(val) => handleInputChange("firstName", val)}
                value={formData["firstName"] || ""}
                required={true}
              />
              {validationErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="last-name" className="text-gray-600 mb-1 text-sm">
                Last Name
              </label>
              <TextInput
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={(val) => handleInputChange("lastName", val)}
                value={formData["lastName"] || ""}
                required={true}
              />
              {validationErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
              )}
            </div>
          </div>

          {/* Username Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <TextInput
              type="text"
              name="username"
              placeholder="username123"
              onChange={(val) => handleInputChange("username", val)}
              value={formData["username"] || ""}
              required={true}
            />
          </div>

          {/* Email input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 mb-1 text-sm">
              Email
            </label>
            <TextInput
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={(val) => handleInputChange("email", val)}
              value={formData["email"] || ""}
              required={true}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-600 mb-1 text-sm">
              Password
            </label>
            <TextInput
              type="password"
              name="password"
              placeholder="********"
              onChange={(val) => handleInputChange("password", val)}
              value={formData["password"] || ""}
              required={true}
            />
            {validationErrors.password && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
            )}
            <p className="text-xs text-slate-400 mt-1">
              It must be a combination of minimum 8 letters, numbers, and symbols.
            </p>
          </div>

          {/* Program Select */}
          <div className="flex flex-col gap-2">
            <label htmlFor="program">Program</label>
            <select
              name="program"
              onChange={(e) => handleInputChange("program", e.target.value)}
              value={formData["program"] || ""}
              className={`p-2 border rounded-md ${
                validationErrors.program ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a program</option>
              {Object.values(Program).map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
            {validationErrors.program && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.program}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-blue-600 w-full py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Message Display */}
          {message && <p className="text-blue-500 text-center mt-2">{message}</p>}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
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
