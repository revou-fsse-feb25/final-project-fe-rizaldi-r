"use client";

import ConfirmationModal from "@/components/_commons/ConfirmationModal";
import ContentHeader from "@/components/_commons/ContentHeader";
import DeleteConfirmation from "@/components/_commons/DeleteConfirmation";
import SmallSpinner from "@/components/_commons/icons/SmallSpinner";
import TextInput from "@/components/_commons/TextInput";
import { deleteSubmissionField, postSubmissionField } from "@/services/api";
import { SubmissionField } from "@/types/module-interface";
import { Submission } from "@/types/submission-interface";
import { Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface AssignmentSubmissionFormProps {
  refetchModule: (params_0: string) => Promise<void>;
  moduleId: string;
  submissions?: Submission[];
  submissionTitle?: string;
  submissionFields?: SubmissionField[];
  submissionTemplateId: string;
}

export default function EditAssignmentSubmissionForm({
  refetchModule,
  moduleId,
  submissions,
  submissionTitle,
  submissionFields,
  submissionTemplateId,
}: AssignmentSubmissionFormProps) {
  const [isAddingField, setIsAddingField] = useState(false);
  const [newField, setNewField] = useState({ label: "", isTextfield: false });
  const [isSubmittingNewField, setIsSubmittingNewField] = useState(false);
  const [localSubmissionFields, setLocalSubmissionFields] = useState(submissionFields || []);
  const [deletingFieldId, setDeletingFieldId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    setLocalSubmissionFields(submissionFields || []);
  }, [submissionFields]);

  const handleAddField = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNewField(true);
    try {
      const reqBody = {
        label: newField.label,
        isTextfield: newField.isTextfield,
        submissionTemplateId: submissionTemplateId,
      };
      const response = await postSubmissionField(token || "", reqBody);
      refetchModule(moduleId);

      const addedField = response.data;
      setLocalSubmissionFields((prevFields) => [...prevFields, addedField]);
      setNewField({ label: "", isTextfield: false });
      setIsAddingField(false);
      console.log("New submission field added:", addedField);
    } catch (error) {
      console.error("Failed to add new submission field:", error);
    } finally {
      setIsSubmittingNewField(false);
    }
  };

  const handleDeleteField = async (fieldId: string) => {
    setIsDeleting(true);
    try {
      await deleteSubmissionField(token || "", fieldId);
      refetchModule(moduleId);
      setLocalSubmissionFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
    } catch (error) {
      console.error(`Failed to delete submission field ${fieldId}:`, error);
    } finally {
      setIsDeleting(false);
      setDeletingFieldId(null);
    }
  };

  const handleOpenDeleteConfirmation = (fieldId: string) => {
    setDeletingFieldId(fieldId);
  };

  const handleCancelDelete = () => {
    setDeletingFieldId(null);
  };

  return (
    <section>
      <section className="bg-white py-6 px-7 rounded-lg border border-slate-300">
        <ContentHeader
          title={submissionTitle || ""}
          descriptionDetail={{ text: "Submission & Essay" }}
        />
        {!isAddingField ? (
          <button
            onClick={() => setIsAddingField(true)}
            className="flex items-center gap-1 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} /> Add New Field
          </button>
        ) : (
          <form onSubmit={handleAddField} className="flex flex-col gap-4">
            <div className="w-full">
              <label
                htmlFor="field-label"
                className="block text-slate-700 text-sm font-medium mb-1"
              >
                Field Label
              </label>
              <input
                id="field-label"
                type="text"
                value={newField.label}
                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Project Abstract"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="field-type" className="block text-slate-700 text-sm font-medium mb-1">
                Field Type
              </label>
              <select
                id="field-type"
                value={newField.isTextfield ? "textarea" : "input"}
                onChange={(e) =>
                  setNewField({ ...newField, isTextfield: e.target.value === "textarea" })
                }
                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="input">Single-line Input</option>
                <option value="textarea">Multi-line Textarea</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={isSubmittingNewField}
              >
                {isSubmittingNewField ? <SmallSpinner /> : "Add Field"}
              </button>
              <button
                type="button"
                onClick={() => setIsAddingField(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
                disabled={isSubmittingNewField}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {localSubmissionFields?.map((submissionfield, index) => (
          <div
            key={submissionfield.id || index}
            className="mb-4 w-full border-b border-gray-200 pb-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <label
                htmlFor={`submission-field-${submissionfield.id}`}
                className="block text-slate-700 text-sm font-medium flex-grow"
              >
                {submissionfield.label}
              </label>
              {deletingFieldId === submissionfield.id ? (
                <DeleteConfirmation
                  onConfirm={() => handleDeleteField(submissionfield.id)}
                  cancelDelete={handleCancelDelete}
                  isDeleting={isDeleting}
                />
              ) : (
                <button
                  onClick={() => handleOpenDeleteConfirmation(submissionfield.id)}
                  className="p-1 rounded-md text-red-500 hover:bg-red-100 transition-colors"
                  disabled={isDeleting}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <TextInput
              isTextarea={submissionfield.isTextfield}
              name={`submission-field-${submissionfield.id}`}
              value=""
              onChange={() => {}}
              placeholder="Type your answer here"
            />
          </div>
        ))}
      </section>
    </section>
  );
}
