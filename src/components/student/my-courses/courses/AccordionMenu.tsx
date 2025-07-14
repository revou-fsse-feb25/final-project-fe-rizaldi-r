"use client";

import { ItfSection } from "@/types/types";
import { useState } from "react";

interface CourseContentAccordionProps {
  sections: ItfSection[];
  onItemToggle?: (moduleId: string, itemId: string) => void;
  onModuleChange?: (moduleId: string) => void;
}

export default function AccordionMenu({
  sections,
  onItemToggle,
  onModuleChange,
}: CourseContentAccordionProps) {
  const [activeModule, setActiveModule] = useState(sections[0].modules[0].id);
  const [expandedCourse, setexpandedCourse] = useState(true);
  const [expandedSections, setExpandedSections] = useState(() => {
    const initialExpanded: Record<string, boolean> = {};
    sections.forEach((section) => {
      initialExpanded[section.id] = section.isExpanded !== undefined ? section.isExpanded : false;
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

  const handleCheckboxChange = (sectionId: string, moduleId: string) => {
    // TODO: everytime checkbox is checked, it should hit the api from parent component
    // we would post the data then refetch the data from api
    // when the data from api change the checkbox will also change automaticly
    onItemToggle?.(sectionId, moduleId);
    console.log(`Module: ${sectionId}, module: ${moduleId} checkbox toggled.`);
  };

  return (
    <div
      // TODO: remove the class space and new line
      className="border w-full border-gray-300 rounded-lg last:border-b-0 max-h-135 
      overflow-y-scroll
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300
      "
    >
      {/* Menu Header */}
      <button
        className="flex justify-between border-b bg-gray-50 border-gray-300 w-full font-medium p-3"
        onClick={() => setexpandedCourse(!expandedCourse)}
        aria-expanded={expandedCourse}
      >
        <span className="text-base">Course Content</span>
        <img src="/chevron-down.svg" alt="" />
      </button>

      {/* Section List */}
      {expandedCourse &&
        sections.map((section) => (
          <section key={section.id} className="border-b border-gray-300">
            {/* Section Header */}
            <button
              className={`flex justify-between border-gray-300 bg-white w-full font-medium p-3 ${
                expandedSections[section.id] ? "border-b" : "border-b-0"
              }`}
              onClick={() => toggleExtendSection(section.id)}
              aria-expanded={expandedSections[section.id]}
              aria-controls={`section-content-${section.id}`}
            >
              <span className="text-base">{section.title}</span>
              <img src="/chevron-down.svg" alt="" />
            </button>

            {/* Module List */}
            {expandedSections[section.id] && (
              <div id={`section-content-${section.id}`}>
                {section.modules.map((module) => (
                  <div
                    key={module.id}
                    className={`flex items-center gap-3 pl-4 pr-2 rounded-md ${
                      module.id === activeModule ? "bg-blue-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={`checkbox-${module.id}`}
                      checked={module.completed}
                      onChange={() => handleCheckboxChange(section.id, module.id)}
                      className="h-4 w-4 rounded cursor-pointer"
                    />
                    <button
                      className={`text-gray-700 text-sm cursor-pointer py-3`}
                      onClick={() => handleModuleChange(module.id)}
                    >
                      {module.label}
                    </button>
                    {module.type === "assignment" && (
                      <img src="/book.svg" className="opacity-75 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
    </div>
  );
}
