"use client";

import Button from "@/components/_commons/Button";
import ContentHeader from "@/components/_commons/ContentHeader";
import TextInput from "@/components/_commons/TextInput";
import { patchGradeSubmission } from "@/services/api";
import { SubmissionFieldValue } from "@/types/submission-interface";
import { ValidationConfigItf } from "@/types/types";
import { validateForm } from "@/utils/form-validation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface GradingProps {
  submissionId: string;
  submissionTitle: string;
  initialFeedback: string;
  initialScore: string;
  initialPassStatus: boolean;
  submissionFieldValueList: SubmissionFieldValue[];
  scoreLimit: number;
}

export default function Grading({
  submissionId,
  submissionTitle,
  initialFeedback,
  initialScore,
  initialPassStatus,
  submissionFieldValueList,
  scoreLimit,
}: GradingProps) {
  const [formData, setFormData] = useState<Record<string, string>>({
    "grading-score": "",
    "grading-feedback": "",
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

  const [isPassed, setIsPassed] = useState<boolean>();
  const handlePassStatusChange = (status: boolean) => {
    setIsPassed(status);
  };

  useEffect(() => {
    setFormData({
      "grading-score": initialScore,
      "grading-feedback": initialFeedback,
    });
    setIsPassed(initialPassStatus);
  }, [initialScore, initialFeedback]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { data: session } = useSession();
  const token = session?.accessToken;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // validation
    const isValid = validateForm(formData, validationConfig);
    if (!isValid) {
      console.error("Form validation failed");
      return;
    }

    // Construct the request body
    const gradeSubmissionData = {
      isPassed: isPassed || false,
      scoreAchieved: formData["grading-score"].toString(),
      feedback: formData["grading-feedback"],
    };

    if (!token) throw new Error("Token not found");
    if (!submissionId) throw new Error("Submission id not found");

    setIsSubmitting(true);
    try {
      const response = await patchGradeSubmission(token, submissionId, gradeSubmissionData);

      setMessage("Form submitted successfully");
      setIsSubmitted(false);
    } catch (error) {
      setMessage("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
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
        {submissionFieldValueList?.map((submissionFieldValue, index) => (
          <div key={index} className="mb-4 w-full">
            <label
              htmlFor={`submission-${index}`}
              className="block text-slate-700 text-sm font-medium mb-1"
            >
              {submissionFieldValue.submissionField?.label}
            </label>
            <div className="border-1 border-slate-300 px-6 py-4 rounded-lg">
              {submissionFieldValue.submitted}
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
          <TextInput
            {...getTextFieldProps("grading-score", validationConfig)}
            onFocus={() => setMessage("")}
            className="w-18"
          />
          <p>/ {scoreLimit}</p>
        </div>
      </section>

      {/* pass/fail section */}
      <section className="bg-white py-4 px-7 rounded-lg border border-slate-300 w-full">
        <ContentHeader title="Pass / Fail Status" />
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-slate-700 text-sm font-medium">
            <input
              type="radio"
              name="passStatus"
              value="Pass"
              checked={isPassed === true}
              onChange={() => handlePassStatusChange(true)}
              className="form-radio text-blue-600"
            />
            Pass
          </label>
          <label className="flex items-center gap-2 text-slate-700 text-sm font-medium">
            <input
              type="radio"
              name="passStatus"
              value="Fail"
              checked={isPassed === false}
              onChange={() => handlePassStatusChange(false)}
              className="form-radio text-red-600"
            />
            Fail
          </label>
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
        <TextInput
          {...getTextFieldProps("grading-feedback", validationConfig)}
          onFocus={() => setMessage("")}
        />
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
      <p className="mt-2">{message}</p>
    </form>
  );
}
