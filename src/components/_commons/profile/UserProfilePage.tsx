import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Upload,
} from "lucide-react";

export interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string | null;
  avatarSrc?: string | null;
}

interface ValidationErrors {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface UserProfilePageProps {
  initialProfile?: UserProfile;
  onUpdateProfile?: (field: keyof UserProfile, value: string) => Promise<void>;
  onUploadAvatar?: (file: File) => Promise<string>; // Returns new avatar URL
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  initialProfile,
  onUpdateProfile,
  onUploadAvatar,
}) => {
  const [profile, setProfile] = useState<UserProfile>(
    initialProfile || {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      avatarSrc: "",
    }
  );

  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<UserProfile & { confirmPassword?: string }>>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  // Validation functions
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return (
      password.length >= 8 &&
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)
    );
  };

  const validateUsername = (username: string): boolean => {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
  };

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "username":
        if (!value.trim()) return "Username is required";
        if (!validateUsername(value))
          return "Username must be 3-20 characters, letters, numbers, and underscores only";
        break;
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.length < 2) return "First name must be at least 2 characters";
        break;
      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.length < 2) return "Last name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;
      case "password":
        if (!value) return "Password is required";
        if (!validatePassword(value))
          return "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
        break;
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== editValues.password) return "Passwords do not match";
        break;
    }
    return undefined;
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
    if (field === "password") {
      setEditValues({ password: "", confirmPassword: "" });
    } else {
      setEditValues({ [field]: profile[field as keyof UserProfile] });
    }
    setErrors({});
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValues({});
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSave = async (field: string) => {
    const value = editValues[field as keyof typeof editValues];
    const newErrors: ValidationErrors = {};

    // Validate the field
    const fieldError = validateField(field, value as string);
    if (fieldError) {
      newErrors[field as keyof ValidationErrors] = fieldError;
    }

    // Special validation for password
    if (field === "password") {
      const confirmError = validateField("confirmPassword", editValues.confirmPassword || "");
      if (confirmError) {
        newErrors.confirmPassword = confirmError;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsUpdating(true);
    try {
      // Call parent's update function if provided
      if (onUpdateProfile) {
        await onUpdateProfile(field as keyof UserProfile, value as string);
      } else {
        // Simulate API call for demo
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Update local profile state
      setProfile((prev) => ({
        ...prev,
        [field]: value,
      }));

      setEditingField(null);
      setEditValues({});
      setErrors({});
      setSuccessMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrors({ [field as keyof ValidationErrors]: "Failed to update. Please try again." });
    } finally {
      setIsUpdating(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors({ username: "Please select a valid image file" });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ username: "Image size must be less than 5MB" });
      return;
    }

    setIsUpdating(true);
    try {
      let newAvatarUrl;

      if (onUploadAvatar) {
        // Call parent's upload function
        newAvatarUrl = await onUploadAvatar(file);
      } else {
        // Simulate upload API call and create preview URL for demo
        await new Promise((resolve) => setTimeout(resolve, 1500));
        newAvatarUrl = URL.createObjectURL(file);
      }

      // Update avatar in profile
      setProfile((prev) => ({
        ...prev,
        avatarSrc: newAvatarUrl,
      }));

      setSuccessMessage("Avatar updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrors({ username: "Failed to upload avatar. Please try again." });
    } finally {
      setIsUpdating(false);
    }
  };

  const renderEditableField = (
    field: keyof UserProfile,
    label: string,
    icon: React.ReactNode,
    type: string = "text"
  ) => {
    const isEditing = editingField === field;
    const value = isEditing ? (editValues[field] as string) || "" : profile[field];
    const error = errors[field as keyof ValidationErrors];

    return (
      <div className="bg-white border-b-1 border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
          </div>
          {!isEditing && (
            <button
              onClick={() => handleEdit(field)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title={`Edit ${label.toLowerCase()}`}
            >
              <Edit3 size={18} />
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            {field === "password" ? (
              <>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={editValues.password || ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({ ...prev, password: e.target.value }))
                    }
                    placeholder="New password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    }`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={editValues.confirmPassword || ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({ ...prev, confirmPassword: e.target.value }))
                    }
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
                      errors.confirmPassword ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </>
            ) : (
              <input
                type={type}
                value={value || ""}
                onChange={(e) => setEditValues((prev) => ({ ...prev, [field]: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  error ? "border-red-300" : "border-gray-300"
                }`}
                autoFocus
              />
            )}

            {(error || errors.confirmPassword) && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {error || errors.confirmPassword}
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSave(field)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {field === "password" ? (
              <div className="font-mono text-sm">••••••••••••</div>
            ) : (
              <div className="text-lg">{value}</div>
            )}
            {field === "email" && (
              <div className="text-sm text-gray-500 mt-1">
                Make sure this email is active for important notifications
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            <Check size={20} />
            {successMessage}
          </div>
        )}

        {/* Avatar Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={profile.avatarSrc || "/user-thumb.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `/user-thumb.png`;
                }}
              />
              {isUpdating && editingField === null && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-700 mb-3">Upload a new profile picture</p>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <Upload size={16} />
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Recommended: Square image, at least 200x200px, max 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-0 rounded-lg overflow-clip border-1 border-slate-200">
          {renderEditableField(
            "username",
            "Username",
            <User className="text-blue-600" size={20} />
          )}
          {renderEditableField(
            "firstName",
            "First Name",
            <User className="text-blue-600" size={20} />
          )}
          {renderEditableField(
            "lastName",
            "Last Name",
            <User className="text-blue-600" size={20} />
          )}
          {renderEditableField(
            "email",
            "Email Address",
            <Mail className="text-blue-600" size={20} />,
            "email"
          )}
          {renderEditableField(
            "password",
            "Password",
            <Lock className="text-blue-600" size={20} />,
            "password"
          )}
        </div>

        {/* Additional Info */}
        {/* <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Security Tips</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Use a strong, unique password for your account</li>
                <li>• Keep your email address up to date for security notifications</li>
                <li>• Review your profile information regularly</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserProfilePage;
