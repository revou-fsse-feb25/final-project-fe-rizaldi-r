"use client";

import { deleteSection, postModule, postSection } from "@/services/api";
import { CourseSection } from "@/types/course-interface";
import { ModuleType } from "@/types/module-interface";
import { BookMinus, CheckCircle, ChevronDown, Trash2, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { title } from "process";
import { useEffect, useState } from "react";

interface CourseContentAccordionProps {
  refetchCourse: (params_0: string) => Promise<void>;
  courseId: string;
  sections: CourseSection[];
  onItemToggle?: (moduleId: string, itemId: string) => void;
  onModuleChange?: (moduleId: string) => void;
  initialActiveModuleId?: string;
}

export default function EditAccordionMenu({
  refetchCourse,
  courseId,
  sections,
  onItemToggle,
  onModuleChange,
  initialActiveModuleId,
}: CourseContentAccordionProps) {
  const [activeModule, setActiveModule] = useState(sections[0]?.modules[0]?.id);
  const [expandedCourse, setexpandedCourse] = useState(true);
  const [expandedSections, setExpandedSections] = useState(() => {
    const initialExpanded: Record<string, boolean> = {};
    sections.forEach((section) => {
      initialExpanded[section.id] = true;
    });
    return initialExpanded;
  });

  const toggleExtendSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId);
    onModuleChange?.(moduleId);
  };

  useEffect(() => {
    if (initialActiveModuleId) setActiveModule(initialActiveModuleId);
  }, []);

  const handleCheckboxChange = (sectionId: string, moduleId: string) => {
    onItemToggle?.(sectionId, moduleId);
    console.log(`Module: ${sectionId}, module: ${moduleId} checkbox toggled.`);
  };

  const { data: session } = useSession();
  const token = session?.accessToken;

  // Handle new section
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleNewSectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) {
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await postSection(token || "", courseId, newSectionTitle);
      refetchCourse(courseId);
      setIsSuccess(true);
      setNewSectionTitle("");
      setIsAddingSection(false);
    } catch (error) {
      setIsError(true);
      console.error("Failed to add new section:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new module
  const [addingModuleForSectionId, setAddingModuleForSectionId] = useState<string | null>(null);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [isLoadingModule, setIsLoadingModule] = useState(false);
  const [isSuccessModule, setIsSuccessModule] = useState(false);
  const [isErrorModule, setIsErrorModule] = useState(false);
  const handleNewModuleSubmit = async (sectionId: string) => {
    if (!newModuleTitle.trim()) {
      setIsErrorModule(true);
      return;
    }

    setIsLoadingModule(true);
    setIsSuccessModule(false);
    setIsErrorModule(false);

    try {
      const reqBody = {
        sectionId,
        title: newModuleTitle,
        description: "Module Description",
        moduleType: ModuleType.LECTURE,
      };
      const response = await postModule(token || "", reqBody);
      refetchCourse(courseId);
      setIsSuccessModule(true);
      setNewModuleTitle("");
      setAddingModuleForSectionId(null);
    } catch (error) {
      setIsErrorModule(true);
      console.error("Failed to add new module:", error);
    } finally {
      setIsLoadingModule(false);
    }
  };

  // handle section deletion
  const [confirmDeleteSectionId, setConfirmDeleteSectionId] = useState<string | null>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);
  const [isErrorDelete, setIsErrorDelete] = useState(false);
  const handleDeleteSection = async (sectionId: string) => {
    setIsLoadingDelete(true);
    setIsSuccessDelete(false);
    setIsErrorDelete(false);
    setConfirmDeleteSectionId(null);

    try {
      const response = await deleteSection(token || "", sectionId);
      refetchCourse(courseId);
      setIsSuccessDelete(true);
    } catch (error) {
      setIsErrorDelete(true);
      console.error("Failed to delete section:", error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <div
      // TODO: remove the class space and new line
      className="border w-full border-slate-300 rounded-lg last:border-b-0 max-h-135 
      overflow-y-scroll
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-slate-300
      "
    >
      {/* Menu Header */}
      <button
        className="flex justify-between border-b bg-slate-50 border-slate-300 w-full font-medium p-3"
        onClick={() => setexpandedCourse(!expandedCourse)}
        aria-expanded={expandedCourse}
      >
        <span className="text-base">Course Content</span>
        <ChevronDown
          strokeWidth={1}
          className={`inline mr-2 ${!expandedCourse ? "rotate-180" : ""}`}
        />
      </button>

      {/* Add New Section Button & Form */}
      <div className="p-3 border-b border-slate-300">
        {!isAddingSection ? (
          <button
            onClick={() => setIsAddingSection(true)}
            className="w-full text-center text-blue-500 font-medium py-2 rounded-sm border border-blue-500 hover:bg-blue-50 transition-colors"
          >
            Add New Section
          </button>
        ) : (
          <form onSubmit={handleNewSectionSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="Enter section title"
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
                onClick={() => setIsAddingSection(false)}
                className="flex-1 text-slate-500 bg-slate-100 border-1 border-slate-300 font-medium py-2 rounded-sm disabled:opacity-50"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        <div>
          {isSuccess && (
            <p className="text-green-600 flex items-center mt-2">
              <CheckCircle size={16} className="mr-2" /> Section added successfully!
            </p>
          )}
          {isError && (
            <p className="text-red-600 flex items-center mt-2">
              <XCircle size={16} className="mr-2" /> Failed to add section.
            </p>
          )}
        </div>
      </div>

      {/* Section List */}
      {expandedCourse &&
        sections.map((section) => (
          <section key={section.id} className="border-b border-slate-300">
            {/* Section Header */}
            <div
              className={`flex justify-between border-slate-300 bg-white w-full font-medium p-3 ${
                expandedSections[section.id] ? "border-b" : "border-b-0"
              }`}
            >
              <button
                onClick={() => toggleExtendSection(section.id)}
                aria-expanded={expandedSections[section.id]}
                aria-controls={`section-content-${section.id}`}
                className="w-full text-left"
              >
                <ChevronDown
                  strokeWidth={1}
                  className={`inline mr-2 ${!expandedSections[section.id] ? "rotate-180" : ""}`}
                />
                <span className="text-base">{section.title}</span>
              </button>
              <button
                onClick={() => setConfirmDeleteSectionId(section.id)}
                className="ml-4 p-1 text-slate-400 hover:text-red-500 transition-colors"
                aria-label={`Delete section ${section.title}`}
              >
                <Trash2 size={18} />
              </button>
            </div>

            {confirmDeleteSectionId === section.id && (
              <div className="p-3 bg-red-50 text-red-700 text-sm flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
                <span>Are you sure you want to delete this section?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="text-white bg-red-500 py-1 px-3 rounded-md font-medium"
                    disabled={isLoadingDelete}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmDeleteSectionId(null)}
                    className="text-red-400 bg-white border border-red-400 py-1 px-3 rounded-md font-medium"
                    disabled={isLoadingDelete}
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {/* Module List */}
            {expandedSections[section.id] && (
              <div id={`section-content-${section.id}`}>
                {section.modules.map((module) => (
                  <div
                    key={module.id}
                    className={`flex items-center gap-3 px-3 rounded-md ${
                      module.id === activeModule ? "bg-blue-50" : ""
                    }`}
                  >
                    <button
                      className={`text-left text-slate-700 text-sm cursor-pointer py-3 `}
                      onClick={() => handleModuleChange(module.id)}
                    >
                      {module.title}
                    </button>
                    {module.moduleType === ModuleType.ASSIGNMENT && (
                      <BookMinus size={16} className="text-slate-400 ml-auto min-w-8" />
                    )}
                  </div>
                ))}

                {/* Add New Module Button & Form */}
                <div className="p-3">
                  {addingModuleForSectionId !== section.id ? (
                    <button
                      onClick={() => {
                        setAddingModuleForSectionId(section.id);
                        setNewModuleTitle("");
                        setIsSuccessModule(false);
                        setIsErrorModule(false);
                      }}
                      className="w-4/5 text-center text-blue-500 font-medium py-2 rounded-sm border border-blue-500 hover:bg-blue-50 transition-colors text-sm m-auto block"
                    >
                      Add New Module
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                        placeholder="Enter module title"
                        className="w-full p-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        disabled={isLoadingModule}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleNewModuleSubmit(section.id)}
                          className="flex-1 bg-blue-500 text-white font-medium py-2 rounded-sm disabled:opacity-50 text-sm"
                          disabled={isLoadingModule}
                        >
                          {isLoadingModule ? "Submitting..." : "Submit"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setAddingModuleForSectionId(null)}
                          className="flex-1 text-slate-500 bg-slate-100 font-medium py-2 rounded-sm disabled:opacity-50 text-sm border-1 border-slate-300"
                          disabled={isLoadingModule}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  <div>
                    {isSuccessModule && addingModuleForSectionId === section.id && (
                      <p className="text-green-600 flex items-center text-sm mt-2">
                        <CheckCircle size={14} className="mr-1" /> Module added successfully!
                      </p>
                    )}
                    {isErrorModule && addingModuleForSectionId === section.id && (
                      <p className="text-red-600 flex items-center text-sm mt-2">
                        <XCircle size={14} className="mr-1" /> Failed to add module.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}
    </div>
  );
}
