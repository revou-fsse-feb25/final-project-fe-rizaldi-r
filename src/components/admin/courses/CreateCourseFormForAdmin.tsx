import { postCourse, postCourseByAdmin } from "@/services/api";
import { createFullName } from "@/utils/create-full-name";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-600/50 overflow-y-auto h-full w-full flex justify-center items-center z-50 border-1 border-slate-300">
      <div className="relative p-8 px-12 bg-white w-118 rounded-sm">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export const CreateCourseFormForAdmin = ({
  refetchCourses,
  token,
  courseCategories,
  userInstructors,
}) => {
  console.log("🚀 ~ userInstructors:", userInstructors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    imageSrc: "",
    description: "",
    startDate: "",
    endDate: "",
    isMemberOnly: false,
    allowedPrograms: ["WEBDEV"],
    allowedBatchYears: [2023, 2024],
    categoryIds: "",
    instructorId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear validation error when the user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required.";
    }
    if (!formData.categoryIds) {
      errors.categoryIds = "Category is required.";
    }
    if (!formData.instructorId) {
      errors.instructorId = "Instructor is required.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);

    const isValid = validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        title: formData.title,
        imageSrc: formData.imageSrc,
        description: formData.description,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        isMemberOnly: formData.isMemberOnly,
        allowedPrograms: formData.allowedPrograms,
        allowedBatchYears: formData.allowedBatchYears,
        categoryIds: [formData.categoryIds],
        instructorId: formData.instructorId,
      };
      console.log("🚀 ~ token.token:", token)

      const response = await postCourseByAdmin(token, payload);
      if (response.status === 201) {
        setMessage("Course added successfully!");
        setIsSuccess(true);
        refetchCourses();
        setFormData({
          title: "",
          imageSrc: "",
          description: "",
          startDate: "",
          endDate: "",
          isMemberOnly: false,
          allowedPrograms: ["WEBDEV"],
          allowedBatchYears: [2023, 2024],
          categoryIds: "",
          instructorId: "",
        });
        setTimeout(() => setIsModalOpen(false), 2000);
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || "Failed to add course."}`);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 rounded-sm bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <Plus size={18} />
        Add New Course
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-sm ${
                validationErrors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {validationErrors.title && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
            )}
          </label>
          <label className="flex flex-col">
            Image URL:
            <input
              type="text"
              name="imageSrc"
              value={formData.imageSrc}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-sm"
            />
          </label>
          <label className="flex flex-col">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-sm ${
                validationErrors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {validationErrors.description && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
            )}
          </label>
          <div className="flex gap-4">
            <label className="flex flex-col flex-1">
              Start Date:
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-sm"
              />
            </label>
            <label className="flex flex-col flex-1">
              End Date:
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-sm"
              />
            </label>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isMemberOnly"
              checked={formData.isMemberOnly}
              onChange={handleChange}
              className="mt-1"
            />
            Is Member Only
          </label>
          <label className="flex flex-col">
            Categories:
            <select
              name="categoryIds"
              value={formData.categoryIds}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-sm"
            >
              <option value="">Select a category</option>
              {courseCategories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {validationErrors.categoryIds && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.categoryIds}</p>
            )}
          </label>
          {/* dropdown for userInstructors */}
          <label className="flex flex-col">
            Instructor:
            <select
              name="instructorId"
              value={formData.instructorId}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-sm ${
                validationErrors.instructorId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select an instructor</option>
              {userInstructors?.map((userInstructor) => (
                <option key={userInstructor.instructor.id} value={userInstructor.instructor.id}>
                  {createFullName(userInstructor)}
                </option>
              ))}
            </select>
            {validationErrors.instructorId && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.instructorId}</p>
            )}
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 rounded-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-sm bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Course"}
            </button>
          </div>
        </form>
        {message && (
          <p className={`mt-4 text-center ${isSuccess ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </Modal>
    </>
  );
};
