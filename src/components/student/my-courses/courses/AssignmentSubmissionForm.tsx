"use client";

import Button from "@/components/_commons/Button";
import ContentHeader from "@/components/_commons/ContentHeader";
import TextInput from "@/components/_commons/TextInput";
import { ItfModuleSubmission } from "@/types/types";
import { useState } from "react";

interface AssignmentSubmissionFormProps {
  submissionTitle: string;
  submissions: ItfModuleSubmission[];
}

export default function AssignmentSubmissionForm({
  submissionTitle,
  submissions,
}: AssignmentSubmissionFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {};
    if (submissions) {
      submissions.forEach((_, index) => {
        initialData[`submission-${index}`] = "";
      });
    }
    return initialData;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTextInputChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // validate input after submt
    let formIsValid = true;
    submissions.forEach((_, index) => {
      const inputName = `submission-${index}`;
      const inputValue = formData[inputName];
      // Check is empty
      if (inputValue.trim() === "") {
        formIsValid = false;
      }
    });

    // if valid, reset form and do api call
    if (formIsValid) {
      // console.log("Form isSubmitted successfully", formData);
      setFormData({});
      setIsSubmitted(false);
    } else {
      // console.log("Form has validation errors.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="bg-white py-6 px-7 rounded-lg border border-slate-300">
        <ContentHeader title={submissionTitle} descriptionDetail={{ text: "Submission & Essay" }} />
        {submissions.map((submission, index) => (
          <div key={index} className="mb-4 w-full">
            <label
              htmlFor={`submission-${index}`}
              className="block text-slate-700 text-sm font-medium mb-1"
            >
              {submission.label}
            </label>
            <TextInput
              isTextarea={submission.isTextfield}
              name={`submission-${index}`}
              required={true}
              value={formData[`submission-${index}`] || ""}
              onChange={(val) => handleTextInputChange(`submission-${index}`, val)}
              isSubmitted={isSubmitted}
              placeholder="Type your answer here"
            />
          </div>
        ))}
      </section>

      <Button type="submit" fontWeight="font-medium" padding="large" isFilled={true} className="bg-blue-600 text-blue-50 mt-4">
        Submit Assignment
      </Button>
    </form>
  );
}
