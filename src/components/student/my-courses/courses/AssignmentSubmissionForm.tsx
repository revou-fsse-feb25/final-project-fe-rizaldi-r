"use client";

import Button from "@/components/_commons/Button";
import ContentHeader from "@/components/_commons/ContentHeader";
import TextInput from "@/components/_commons/TextInput";
import { patchStudentSubmission } from "@/services/api";
import { SubmissionField } from "@/types/module-interface";
import { Submission } from "@/types/submission-interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface AssignmentSubmissionFormProps {
  submissions: Submission[];
  submissionTitle: string;
  submissionFields: SubmissionField[];
  submissionTemplateId: string;
}

export default function AssignmentSubmissionForm({
  submissions,
  submissionTitle,
  submissionFields,
  submissionTemplateId,
}: AssignmentSubmissionFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {};
    if (submissionFields) {
      submissionFields.forEach((submissionfield) => {
        initialData[`submission-field-${submissionfield.id}`] = "";
      });
    }
    return initialData;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { data: session } = useSession();
  const token = session?.accessToken;

  const handleTextInputChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Effect to fill in submission field
  useEffect(() => {
    const existingSubmission = submissions?.find(
      (submission) => submission.submissionTemplateId === submissionTemplateId
    );

    if (existingSubmission && existingSubmission.submissionFieldValue) {
      const newFormData: Record<string, string> = {};
      existingSubmission.submissionFieldValue.forEach((fieldValue) => {
        newFormData[`submission-field-${fieldValue.submissionFieldId}`] = fieldValue.submitted;
      });
      setFormData(newFormData);
    }
  }, [submissions, submissionTemplateId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsSubmitted(true);

    // validate input after submit
    let formIsValid = true;
    submissionFields.forEach((submissionfield) => {
      const inputName = `submission-field-${submissionfield.id}`;
      const inputValue = formData[inputName];

      // Check is empty
      if (inputValue.trim() === "") {
        formIsValid = false;
      }
    });

    // if valid, reset form and do api call
    if (formIsValid) {
      setIsSubmitting(true);
      try {
        // Construct the request body as per the required structure
        const submissionFieldValueData = submissionFields.map((submissionfield, index) => ({
          submissionFieldId: submissionfield.id,
          submitted: formData[`submission-field-${submissionfield.id}`] || "",
        }));

        // find the matching submission id
        const submissionId = submissions.find((submission) => {
          return submission.submissionTemplateId === submissionTemplateId;
        })?.id;

        if (!token) throw new Error("Token not found");
        if (!submissionId) throw new Error("Submission id not found");
        
        // PATCH request
        const response = await patchStudentSubmission(
          token,
          submissionId,
          submissionFieldValueData
        );

        setMessage("Form submitted successfully");
        setIsSubmitted(false);
      } catch (error) {
        setMessage("Failed to submit");
      } finally {
        setIsSubmitting(false);
      }
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="bg-white py-6 px-7 rounded-lg border border-slate-300">
        <ContentHeader title={submissionTitle} descriptionDetail={{ text: "Submission & Essay" }} />
        {submissionFields.map((submissionfield, index) => (
          <div key={index} className="mb-4 w-full">
            <label
              htmlFor={`submission-field-${submissionfield.id}`}
              className="block text-slate-700 text-sm font-medium mb-1"
            >
              {submissionfield.label}
            </label>
            <TextInput
              isTextarea={submissionfield.isTextfield}
              name={`submission-field-${submissionfield.id}`}
              required={true}
              value={formData[`submission-field-${submissionfield.id}`] || ""}
              onChange={(val) =>
                handleTextInputChange(`submission-field-${submissionfield.id}`, val)
              }
              isSubmitted={isSubmitted}
              onFocus={() => setMessage("")}
              placeholder="Type your answer here"
            />
          </div>
        ))}
      </section>

      <Button
        type="submit"
        fontWeight="font-medium"
        padding="large"
        isFilled={true}
        className="bg-blue-600 text-blue-50 mt-4"
        isDisabled={isSubmitting}
      >
        Submit Assignment
      </Button>
      <p className="mt-2">{message}</p>
    </form>
  );
}
