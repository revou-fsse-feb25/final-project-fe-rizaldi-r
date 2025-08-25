"use client";

import { AddAccordionContentForm } from "@/components/lecturer/my-courses/courses/AddAccordionContentForm";
import { usePostApi } from "@/hooks/addContent";
import { deleteSection, postModule, postSection } from "@/services/api";
import { CourseSection } from "@/types/course-interface";
import { ModuleType } from "@/types/module-interface";
import { BookMinus, ChevronDown, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
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

  // handle aadding module
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [sectionSuccessMessage, setSectionSuccessMessage] = useState<string | null>(null);
  const [sectionErrorMessage, setSectionErrorMessage] = useState<string | null>(null);
  const { isLoading: isLoadingSection, postData: postNewSection } = usePostApi({
    postApiFunc: postSection,
    refetchFunc: refetchCourse,
    refetchParam: courseId,
    token,
    onSuccess: () => setSectionSuccessMessage("Section added successfully!"),
    onError: () => setSectionErrorMessage("Failed to add section. Please try again"),
  });

  const handleNewSectionSubmit = async (newSectionTitle: string) => {
    setSectionSuccessMessage(null);
    setSectionErrorMessage(null);

    await postNewSection(courseId, newSectionTitle);
  };

  // handle adding module
  const [addingModuleForSectionId, setAddingModuleForSectionId] = useState<string | null>(null);
  const [moduleSuccessMessage, setModuleSuccessMessage] = useState<string | null>(null);
  const [moduleErrorMessage, setModuleErrorMessage] = useState<string | null>(null);
  const { isLoading: isLoadingModule, postData: postNewModule } = usePostApi({
    postApiFunc: postModule,
    refetchFunc: refetchCourse,
    refetchParam: courseId,
    token,
    onSuccess: () => setModuleSuccessMessage("Module added successfully!"),
    onError: () => setModuleErrorMessage("Failed to add module. Please try again"),
  });
  const handleNewModuleSubmit = async (newModuleTitle: string) => {
    setModuleSuccessMessage(null);
    setModuleErrorMessage(null);

    const payload = {
      sectionId: addingModuleForSectionId || "",
      title: newModuleTitle,
      description: "Module Description",
      moduleType: ModuleType.LECTURE,
    };
    await postNewModule(payload);
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
      {!isAddingSection ? (
        <div className="p-3 border-b border-slate-300">
          <button
            onClick={() => {
              setIsAddingSection(true);
              setSectionSuccessMessage("");
              setSectionErrorMessage("");
            }}
            className="w-full text-center text-blue-500 font-medium py-2 rounded-sm border border-blue-500 hover:bg-blue-50 transition-colors"
          >
            Add New Section
          </button>
        </div>
      ) : (
        <AddAccordionContentForm
          onAdd={handleNewSectionSubmit}
          onCancel={() => setIsAddingSection(false)}
          isLoading={isLoadingSection}
          successMesssage={sectionSuccessMessage}
          errorMessage={sectionErrorMessage}
          placeholderText={"Enter section title"}
        />
      )}

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
                <div>
                  {addingModuleForSectionId !== section.id ? (
                    <button
                      onClick={() => {
                        setAddingModuleForSectionId(section.id);
                      }}
                      className="w-4/5 text-center text-blue-500 font-medium py-2 rounded-sm border border-blue-500 hover:bg-blue-50 transition-colors text-sm m-auto block my-3"
                    >
                      Add New Module
                    </button>
                  ) : (
                    <AddAccordionContentForm
                      onAdd={handleNewModuleSubmit}
                      onCancel={() => {
                        setAddingModuleForSectionId(null);
                        setModuleSuccessMessage(null);
                        setModuleErrorMessage(null);
                      }}
                      isLoading={isLoadingModule}
                      successMesssage={moduleSuccessMessage}
                      errorMessage={moduleErrorMessage}
                      placeholderText="Enter module title"
                    />
                  )}
                </div>
              </div>
            )}
          </section>
        ))}
    </div>
  );
}
