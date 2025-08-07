"use client";

import Button from "@/components/_commons/Button";
import ContentHeader from "@/components/_commons/ContentHeader";
import TextInput from "@/components/_commons/TextInput";
import { ValidationConfigItf } from "@/types/types";
import { validateForm } from "@/utils/form-validation";
import { useState } from "react";

interface GradingProps {
  submissionTitle: string;
  submissionList: { label: string; submission: string }[];
  scoreLimit: number;
}

export default function Grading({ submissionTitle, submissionList, scoreLimit }: GradingProps) {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {};
    if (submissionList) {
      submissionList.forEach((_, index) => {
        initialData[`grading-${index}`] = "";
      });
    }
    return initialData;
  });

  // validation prop config for each input
  const validationConfig: ValidationConfigItf = {
    "grading-score": {
      type: "number",
      required: true,
      maxValue: scoreLimit,
      label: "Score",
      placeholder: "0",
    },
    "grading-feedback": {
      type: "text",
      required: true,
      minLength: 0,
      maxLength: 500,
      label: "Feedback",
      isTextarea: true,
      placeholder: "Type your feedback here",
    },
  };

  const handleTextInputChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isValid = validateForm(formData, validationConfig);

    if (!isValid) {
      console.error("Form validation failed:");
      return;
    }

    console.log("🚀 ~ formData:", formData);
  };

  // TODO: put this on utils?
  /**
   * Helper function to dynamically generate props for a TextInput component.
   */
  const getTextFieldProps = (fieldName: string, validationConfigParam: ValidationConfigItf) => {
    const validationRule = validationConfigParam[fieldName];
    return {
      name: fieldName,
      value: formData[fieldName] || "",
      onChange: (val: string) => handleTextInputChange(fieldName, val),
      isSubmitted: isSubmitted,
      ...validationRule,
    };
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
      {/* submission details */}
      <section className="bg-white py-6 px-7 rounded-lg border border-slate-300 w-full">
        <ContentHeader title={submissionTitle} descriptionDetail={{ text: "Submission & Essay" }} />
        {submissionList.map((submission, index) => (
          <div key={index} className="mb-4 w-full">
            <label
              htmlFor={`submission-${index}`}
              className="block text-slate-700 text-sm font-medium mb-1"
            >
              {submission.label}
            </label>
            <div className="border-1 border-slate-300 px-6 py-4 rounded-lg">
              {submission.submission}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-4">
          <label
            htmlFor={`grading-score`}
            className="block text-slate-700 text-sm font-medium mb-1"
          >
            Scores
          </label>
          <TextInput {...getTextFieldProps("grading-score", validationConfig)} className="w-18" />
          <p>/ {scoreLimit}</p>
        </div>
      </section>

      {/* feedback section */}
      <section className="bg-white py-4 px-7 rounded-lg border border-slate-300 w-full">
        <ContentHeader title="Feedback" />
        <label
          htmlFor={`grading-feedback`}
          className="block text-slate-700 text-sm font-medium mb-1"
        >
          Type your feedback for the student's work
        </label>
        {/* TODO: get value from the name */}
        {/* TODO: get error */}
        <TextInput {...getTextFieldProps("grading-feedback", validationConfig)} />
      </section>

      <Button
        type="submit"
        fontWeight="font-medium"
        padding="large"
        isFilled={true}
        className="bg-blue-600 text-blue-50"
      >
        Submit Grade
      </Button>
    </form>
  );
}
