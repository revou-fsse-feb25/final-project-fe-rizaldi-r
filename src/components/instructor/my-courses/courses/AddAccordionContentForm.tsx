import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface AddSectionFormProps {
  onAdd: (param: string) => void;
  onCancel: () => void;
  isLoading: boolean;
  successMesssage: string | null;
  errorMessage: string | null;
  placeholderText: string;
}

export const AddAccordionContentForm: React.FC<AddSectionFormProps> = ({
  onAdd,
  onCancel,
  isLoading,
  successMesssage,
  errorMessage,
  placeholderText,
}) => {
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSectionTitle.trim()) {
      onAdd(newSectionTitle);
      setNewSectionTitle("");
    }
  };

  return (
    <div className="p-3 border-b border-slate-300">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          placeholder={placeholderText}
          className="w-full p-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white font-medium py-2 rounded-sm disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 text-slate-500 bg-slate-100 border-1 border-slate-300 font-medium py-2 rounded-sm disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
      <div>
        {successMesssage && (
          <p className="text-green-600 flex items-center mt-2">
            <CheckCircle size={16} className="mr-2" /> {successMesssage}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-600 flex items-center mt-2">
            <XCircle size={16} className="mr-2" /> {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
