import { ModuleType, SubmissionTemplate } from "@/types/module-interface";
import { capitalizeFirstWord } from "@/utils/capitalize-first-word";
import { BookMinus, Check, Pencil, PlayIcon, TriangleAlert, X } from "lucide-react";
import { useState } from "react";

interface EditableModuleHeaderProps {
  id: string;
  title: string;
  moduleType: ModuleType;
  description: string;
  submissionTemplate?: SubmissionTemplate | null;
  onUpdate: (
    id: string,
    updates: {
      title?: string;
      description?: string;
      moduleType?: ModuleType;
    }
  ) => Promise<void>;
}

export default function EditableModuleHeader({
  id,
  title,
  moduleType,
  description,
  submissionTemplate,
  onUpdate,
}: EditableModuleHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedModuleType, setEditedModuleType] = useState(moduleType);

  const isAssignment = moduleType === ModuleType.ASSIGNMENT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Only include fields that have changed
      const updates: any = {};
      if (editedTitle.trim() !== title.trim()) {
        updates.title = editedTitle.trim();
      }
      if (editedDescription.trim() !== description.trim()) {
        updates.description = editedDescription.trim();
      }
      if (editedModuleType !== moduleType) {
        updates.moduleType = editedModuleType;
      }

      // Only make API call if there are actual changes
      if (Object.keys(updates).length > 0) {
        await onUpdate(id, updates);
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update module:", error);
      // Reset form to original values on error
      resetForm();
    } finally {
      setIsUpdating(false);
    }
  };

  const resetForm = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedModuleType(moduleType);
  };

  const handleCancel = () => {
    setIsEditing(false);
    resetForm();
  };

  const renderModuleTypeIcon = () => {
    if (moduleType === ModuleType.ASSIGNMENT) {
      return <BookMinus size={16} className="text-slate-400 inline mr-2" />;
    }
    return <PlayIcon size={16} className="text-slate-400 inline mr-2" />;
  };

  const renderModuleTypeSelector = () => (
    <select
      value={editedModuleType}
      onChange={(e) => setEditedModuleType(e.target.value as ModuleType)}
      className="p-1 rounded-md border border-slate-300 bg-white text-sm"
      disabled={isUpdating}
    >
      <option value={ModuleType.LECTURE}>Lecture</option>
      <option value={ModuleType.ASSIGNMENT}>Assignment</option>
    </select>
  );

  const renderTitle = () => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="text-2xl font-bold border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 bg-transparent"
          disabled={isUpdating}
          autoFocus
          required
        />
      );
    }

    return <h2 className="text-2xl font-bold text-slate-800">{title}</h2>;
  };

  const renderDescription = () => {
    if (isEditing) {
      return (
        <div className="flex flex-col items-end gap-2 w-full">
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full h-40 p-2 border rounded-md border-blue-500 focus:outline-none focus:border-blue-700 resize-none"
            disabled={isUpdating}
            placeholder="Enter module description..."
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50"
              disabled={isUpdating}
              title="Save changes"
            >
              <Check size={20} />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-50"
              disabled={isUpdating}
              title="Cancel changes"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      );
    }

    return (
      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
        {description || "No description provided"}
      </p>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Module Type */}
      <section className="text-slate-700">
        {isEditing ? (
          renderModuleTypeSelector()
        ) : (
          <div className="flex items-center">
            {renderModuleTypeIcon()}
            <span className="text-sm font-medium">{capitalizeFirstWord(moduleType)}</span>
          </div>
        )}
      </section>

      {/* Title */}
      <div className="flex items-center gap-2">
        {renderTitle()}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            type="button"
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
            title="Edit module"
          >
            <Pencil size={18} />
          </button>
        )}
      </div>

      {/* Assignment Deadline */}
      {isAssignment && submissionTemplate?.endDate && (
        <div className="text-sm text-slate-500">
          <TriangleAlert size={16} className="text-amber-500 inline mr-1 mb-1" />
          <span className="font-medium">Deadline:</span>{" "}
          <time dateTime={submissionTemplate.endDate}>
            {new Date(submissionTemplate.endDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      )}

      {/* Description */}
      <div className="group">{renderDescription()}</div>
    </form>
  );
}
