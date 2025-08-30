import DeleteConfirmation from "@/components/_commons/DeleteConfirmation";
import SmallSpinner from "@/components/_commons/icons/SmallSpinner";
import { DescriptionType } from "@/types/module-interface";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Subdescription {
  id: string;
  header?: string;
  description: string;
  type: DescriptionType;
}

interface SubdescriptionItemProps {
  item: Subdescription;
  isEditing: boolean;
  editedValue: Subdescription;
  isUpdating: boolean;
  isDeleting: boolean;
  showDeleteConfirmation: boolean;
  onEdit: () => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
  onDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onHeaderChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

interface EditableSubdescriptionsProps {
  subdescriptions: Subdescription[];
  onUpdate: (id: string, updates: { header?: string; description: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isReadOnly?: boolean;
}

const SubdescriptionItem: React.FC<SubdescriptionItemProps> = ({
  item,
  isEditing,
  editedValue,
  isUpdating,
  isDeleting,
  showDeleteConfirmation,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onConfirmDelete,
  onCancelDelete,
  onHeaderChange,
  onDescriptionChange,
}) => {
  const renderContent = () => {
    if (item.type === DescriptionType.LIST) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
          {item.description
            .split("\n")
            .filter((line) => line.trim())
            .map((line, lineIndex) => (
              <div key={lineIndex} className="flex items-start mb-1">
                <span className="text-slate-700 mr-2 mt-1 text-sm">•</span>
                <p className="text-slate-700 flex-grow text-sm leading-relaxed">{line.trim()}</p>
              </div>
            ))}
        </div>
      );
    }

    return <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{item.description}</p>;
  };

  if (isEditing) {
    return (
      <form onSubmit={onSave} className="flex flex-col gap-3">
        {item.header && (
          <input
            type="text"
            value={editedValue.header || ""}
            onChange={(e) => onHeaderChange(e.target.value)}
            className="text-lg font-semibold border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 bg-transparent py-1"
            disabled={isUpdating}
            placeholder="Section header"
            autoFocus
          />
        )}
        <textarea
          value={editedValue.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full p-3 border rounded-md border-blue-500 focus:outline-none focus:border-blue-700 resize-none"
          rows={6}
          disabled={isUpdating}
          placeholder="Section content"
          required
        />
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50"
            disabled={isUpdating}
            title="Save changes"
          >
            {isUpdating ? <SmallSpinner /> : <Check size={18} />}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-50"
            disabled={isUpdating}
            title="Cancel changes"
          >
            <X size={18} />
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="group">
      <div className="flex items-start gap-2">
        {item.header && (
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.header}</h3>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            title="Edit section"
            disabled={isDeleting}
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-full text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
            title="Delete section"
            disabled={isDeleting}
          >
            {isDeleting ? <SmallSpinner /> : <Trash2 size={16} />}
          </button>
        </div>
      </div>

      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={onConfirmDelete}
          onCancel={onCancelDelete}
          isDeleting={isDeleting}
        />
      )}

      {renderContent()}
    </div>
  );
};

// Main component
export default function EditableSubdescriptions({
  subdescriptions,
  onUpdate,
  onDelete,
  isReadOnly = false,
}: EditableSubdescriptionsProps) {
  const [editedSubdescriptions, setEditedSubdescriptions] = useState<Subdescription[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmingDeletionId, setConfirmingDeletionId] = useState<string | null>(null);

  // Sync with props when subdescriptions change
  useEffect(() => {
    setEditedSubdescriptions(subdescriptions);
  }, [subdescriptions]);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = async (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const currentItem = subdescriptions.find((item) => item.id === id);
    const editedItem = editedSubdescriptions.find((item) => item.id === id);

    if (!currentItem || !editedItem) return;

    // Check if anything has changed
    const hasChanges =
      editedItem.header?.trim() !== currentItem.header?.trim() ||
      editedItem.description.trim() !== currentItem.description.trim();

    if (!hasChanges) {
      setEditingId(null);
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(id, {
        header: editedItem.header?.trim(),
        description: editedItem.description.trim(),
      });
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update subdescription:", error);
      // Reset to original values on error
      setEditedSubdescriptions(subdescriptions);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    // Reset edited values to original
    setEditedSubdescriptions(subdescriptions);
  };

  const handleDelete = (id: string) => {
    setConfirmingDeletionId(id);
  };

  const handleConfirmDelete = async () => {
    if (!confirmingDeletionId) return;

    setDeletingId(confirmingDeletionId);
    try {
      await onDelete(confirmingDeletionId);
      // Remove from local state after successful deletion
      setEditedSubdescriptions((prev) => prev.filter((item) => item.id !== confirmingDeletionId));
    } catch (error) {
      console.error("Failed to delete subdescription:", error);
    } finally {
      setDeletingId(null);
      setConfirmingDeletionId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmingDeletionId(null);
  };

  const handleFieldChange = (id: string, field: keyof Subdescription, value: string) => {
    setEditedSubdescriptions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  if (editedSubdescriptions.length === 0) {
    return <div className="text-slate-500 text-center py-8 italic">No sections added yet</div>;
  }

  return (
    <section className="space-y-6 flex flex-col gap-4">
      {editedSubdescriptions.map((item) => {
        const editedItem = editedSubdescriptions.find((ed) => ed.id === item.id) || item;
        return (
          <div key={item.id}>
            <SubdescriptionItem
              item={item}
              editedValue={editedItem}
              isEditing={editingId === item.id}
              isUpdating={isUpdating && editingId === item.id}
              isDeleting={deletingId === item.id}
              showDeleteConfirmation={confirmingDeletionId === item.id}
              onEdit={() => handleEdit(item.id)}
              onSave={(e) => handleSave(e, item.id)}
              onCancel={handleCancel}
              onDelete={() => handleDelete(item.id)}
              onConfirmDelete={handleConfirmDelete}
              onCancelDelete={handleCancelDelete}
              onHeaderChange={(value) => handleFieldChange(item.id, "header", value)}
              onDescriptionChange={(value) => handleFieldChange(item.id, "description", value)}
            />
          </div>
        );
      })}
    </section>
  );
}
