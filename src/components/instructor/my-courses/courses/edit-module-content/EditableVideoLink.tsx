import React, { useState } from "react";
import { Pencil, Check, X, Play, Link, AlertCircle } from "lucide-react";

interface EditableVideoLinkProps {
  embedVideoLink?: string | null;
  onUpdate: (videoLink: string) => Promise<void>;
  onRemove?: () => Promise<void>;
  isReadOnly?: boolean;
}

// YouTube URL validation and conversion utility
const processVideoUrl = (url: string): { isValid: boolean; embedUrl: string; error?: string } => {
  if (!url.trim()) {
    return { isValid: false, embedUrl: "", error: "URL is required" };
  }

  try {
    const urlObj = new URL(url);

    // YouTube patterns
    const youtubePatterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
      /(?:https?:\/\/)?youtu\.be\/([^&\n?#]+)/,
    ];

    // Vimeo patterns
    const vimeoPatterns = [
      /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/,
      /(?:https?:\/\/)?player\.vimeo\.com\/video\/(\d+)/,
    ];

    // Check YouTube patterns
    for (const pattern of youtubePatterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return {
          isValid: true,
          embedUrl: `https://www.youtube.com/embed/${match[1]}?rel=0`,
        };
      }
    }

    // Check Vimeo patterns
    for (const pattern of vimeoPatterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return {
          isValid: true,
          embedUrl: `https://player.vimeo.com/video/${match[1]}`,
        };
      }
    }

    // If it's already an embed URL, validate it
    if (url.includes("youtube.com/embed/") || url.includes("player.vimeo.com/video/")) {
      return { isValid: true, embedUrl: url };
    }

    return {
      isValid: false,
      embedUrl: "",
      error: "Please enter a valid YouTube or Vimeo URL",
    };
  } catch (error) {
    return {
      isValid: false,
      embedUrl: "",
      error: "Invalid URL format",
    };
  }
};

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-slate-600"></div>
);

export default function EditableVideoLink({
  embedVideoLink,
  onUpdate,
  onRemove,
  isReadOnly = false,
}: EditableVideoLinkProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editedUrl, setEditedUrl] = useState("");
  const [validationError, setValidationError] = useState<string>("");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUrl(embedVideoLink || "");
    setValidationError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, embedUrl, error } = processVideoUrl(editedUrl);

    if (!isValid) {
      setValidationError(error || "Invalid URL");
      return;
    }

    // Don't update if URL hasn't changed
    if (embedUrl === embedVideoLink) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(embedUrl);
      setIsEditing(false);
      setValidationError("");
    } catch (error) {
      console.error("Failed to update video link:", error);
      setValidationError("Failed to save video link");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUrl("");
    setValidationError("");
  };

  const handleRemove = async () => {
    if (!onRemove) return;

    // const confirmed = window.confirm("Are you sure you want to remove this video?");
    // if (!confirmed) return;

    setIsUpdating(true);
    try {
      await onRemove();
    } catch (error) {
      console.error("Failed to remove video:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUrlChange = (value: string) => {
    setEditedUrl(value);
    if (validationError) {
      setValidationError("");
    }
  };

  // Show add video form if no video exists and we're editing
  if (!embedVideoLink && !isEditing) {
    return (
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-slate-100 rounded-full">
            <Play size={24} className="text-slate-500" />
          </div>
          <div>
            <p className="text-slate-600 font-medium">No video added yet</p>
            <p className="text-slate-500 text-sm">Add a YouTube or Vimeo video to this module</p>
          </div>
          {!isReadOnly && (
            <button
              onClick={handleEdit}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Link size={16} />
              Add Video
            </button>
          )}
        </div>
      </div>
    );
  }

  // Show editing form
  if (isEditing) {
    return (
      <div className="space-y-4">
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label htmlFor="video-url" className="block text-sm font-medium text-slate-700 mb-2">
              Video URL
            </label>
            <input
              id="video-url"
              type="url"
              value={editedUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                validationError ? "border-red-300 focus:ring-red-500" : "border-slate-300"
              }`}
              disabled={isUpdating}
              autoFocus
              required
            />
            {validationError && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {validationError}
              </div>
            )}
            <p className="mt-2 text-xs text-slate-500">
              Supports YouTube and Vimeo URLs. Paste any format and we'll convert it to an
              embeddable link.
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              disabled={isUpdating || !editedUrl.trim()}
            >
              {isUpdating ? <LoadingSpinner /> : <Check size={16} />}
              {isUpdating ? "Saving..." : "Save Video"}
            </button>
          </div>
        </form>

        {/* Preview current video while editing */}
        {embedVideoLink && (
          <div className="border-t pt-4">
            <p className="text-sm text-slate-600 mb-3">Current video:</p>
            <div className="relative opacity-75">
              <iframe
                src={embedVideoLink}
                title="Current video preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full aspect-video rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show video with edit controls
  return (
    <div className="group relative">
      <iframe
        src={embedVideoLink || ""}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="w-full aspect-video rounded-xl shadow-lg"
      />

      {/* Edit overlay */}
      {!isReadOnly && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors"
              title="Edit video"
              disabled={isUpdating}
            >
              <Pencil size={16} className="text-slate-700" />
            </button>
            {onRemove && (
              <button
                onClick={handleRemove}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white hover:text-red-600 transition-colors"
                title="Remove video"
                disabled={isUpdating}
              >
                {isUpdating ? <LoadingSpinner /> : <X size={16} />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
