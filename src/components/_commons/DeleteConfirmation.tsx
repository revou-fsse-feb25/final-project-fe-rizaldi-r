import React, { MouseEventHandler } from "react";

interface DeleteConfirmationProp {
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  cancelDelete: MouseEventHandler<HTMLButtonElement>;
  isDeleting: boolean;
}

export default function DeleteConfirmation({
  onConfirm,
  isDeleting,
  cancelDelete,
}: DeleteConfirmationProp) {
  return (
    <div className="p-2 px-3 bg-slate-50 rounded-sm flex items-center justify-between">
      <span className="text-sm text-gray-700">Are you sure you want to delete this?</span>
      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="text-sm px-3 py-1 rounded-sm bg-red-500 text-slate-100 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={cancelDelete}
          disabled={isDeleting}
          className="text-sm px-3 py-1 rounded-sm border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
