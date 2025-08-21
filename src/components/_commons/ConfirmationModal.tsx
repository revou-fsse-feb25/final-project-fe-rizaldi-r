import React, { MouseEventHandler } from "react";

interface confirmationModalProp {
  message: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  isDeleting: boolean;
}

export default function ConfirmationModal({
  message,
  onConfirm,
  onCancel,
  isDeleting,
}: confirmationModalProp) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-100 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full border-1 border-slate-300">
        <p className="text-lg font-medium mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
