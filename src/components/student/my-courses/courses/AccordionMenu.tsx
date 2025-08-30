"use client";

import { CourseSection } from "@/types/course-interface";
import { ModuleType } from "@/types/module-interface";
import { BookMinus, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

interface ModuleProgress {
  id: string;
  isCompleted: boolean;
  enrollmentId: string;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseContentAccordionProps {
  sections: CourseSection[];
  moduleProgress?: ModuleProgress[];
  enrollmentId: string;
  onItemToggle?: (moduleId: string, isChecked: boolean, enrollmentId: string) => Promise<void>;
  onModuleChange?: (moduleId: string) => void;
  initialActiveModuleId?: string;
}

// Custom hook for debouncing API calls
const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { debouncedCallback, cancel };
};

export default function AccordionMenu({
  sections,
  moduleProgress = [],
  enrollmentId,
  onItemToggle,
  onModuleChange,
  initialActiveModuleId,
}: CourseContentAccordionProps) {
  const [activeModule, setActiveModule] = useState(sections?.[0]?.modules?.[0]?.id);
  const [expandedCourse, setExpandedCourse] = useState(true);
  const [expandedSections, setExpandedSections] = useState(() => {
    const initialExpanded: Record<string, boolean> = {};
    sections.forEach((section) => {
      initialExpanded[section.id] = true;
    });
    return initialExpanded;
  });

  // Create a map for quick lookup of module completion status
  const progressMap = useState(() => {
    const map = new Map<string, ModuleProgress>();
    moduleProgress.forEach((progress) => {
      map.set(progress.moduleId, progress);
    });
    return map;
  })[0];

  // Track pending updates and loading states
  const [pendingUpdates, setPendingUpdates] = useState<Set<string>>(new Set());
  const [optimisticStates, setOptimisticStates] = useState<Record<string, boolean>>({});

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

  // Debounced API call function
  const makeApiCall = useCallback(
    async (moduleId: string, isChecked: boolean) => {
      const updateKey = moduleId;

      try {
        setPendingUpdates((prev) => new Set(prev).add(updateKey));

        if (onItemToggle) {
          await onItemToggle(moduleId, isChecked, enrollmentId);
        }

        // console.log(`✅ API call successful: Module ${moduleId}, Checked: ${isChecked}`);
      } catch (error) {
        // console.error(`❌ API call failed for Module ${moduleId}:`, error);

        // Revert optimistic state on error
        setOptimisticStates((prev) => ({
          ...prev,
          [moduleId]: !isChecked,
        }));
      } finally {
        setPendingUpdates((prev) => {
          const newSet = new Set(prev);
          newSet.delete(updateKey);
          return newSet;
        });
      }
    },
    [onItemToggle, enrollmentId]
  );

  // Debounced version with 500ms delay
  const { debouncedCallback: debouncedApiCall } = useDebounce(makeApiCall, 500);

  const handleCheckboxChange = (moduleId: string, currentCheckedState: boolean) => {
    const newCheckedState = !currentCheckedState;

    // Immediately update UI (optimistic update)
    setOptimisticStates((prev) => ({
      ...prev,
      [moduleId]: newCheckedState,
    }));

    // Make debounced API call
    debouncedApiCall(moduleId, newCheckedState);

    // console.log(`🔄 Checkbox toggled: Module ${moduleId}, New state: ${newCheckedState}`);
  };

  useEffect(() => {
    if (initialActiveModuleId) setActiveModule(initialActiveModuleId);
  }, [initialActiveModuleId]);

  // Helper function to get current checked state from ModuleProgress
  const getCheckedState = (moduleId: string) => {
    // Check optimistic state first
    if (moduleId in optimisticStates) {
      return optimisticStates[moduleId];
    }

    // Fall back to progress map
    const progress = progressMap.get(moduleId);
    return progress?.isCompleted || false;
  };

  // Helper function to check if module is being updated
  const isModuleUpdating = (moduleId: string) => {
    return pendingUpdates.has(moduleId);
  };

  return (
    <div
      // TODO: remove the class space and new line
      className="border border-slate-300 w-full rounded-lg last:border-b-0 max-h-135 
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
        onClick={() => setExpandedCourse(!expandedCourse)}
        aria-expanded={expandedCourse}
      >
        <span className="text-base">Course Content</span>
        <ChevronDown
          strokeWidth={1}
          className={`inline ${!expandedCourse ? "rotate-180" : ""}`}
        />
      </button>

      {expandedCourse &&
        sections.map((section) => (
          <div key={section.id}>
            {/* Section Header */}
            <button
              onClick={() => toggleExtendSection(section.id)}
              className={`flex justify-between border-slate-300 bg-white w-full font-medium p-3 ${
                expandedSections[section.id] ? "border-b" : "border-b-0"
              }`}
            >
              <span className="font-medium text-gray-900">{section.title}</span>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform ${
                  expandedSections[section.id] ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Module List */}
            {expandedSections[section.id] && (
              <div id={`section-content-${section.id}`} className="border-b border-slate-300">
                {section.modules.map((module) => {
                  const isChecked = getCheckedState(module.id);
                  const isUpdating = isModuleUpdating(module.id);
                  const progress = progressMap.get(module.id);

                  return (
                    <div
                      key={module.id}
                      className={`flex items-center gap-3 px-4 py-2 ${
                        module.id === activeModule ? "bg-blue-50 border-l-3 border-l-blue-500" : ""
                      }`}
                    >
                      {/* Checkbox with loading state */}
                      <div className="relative">
                        <input
                          type="checkbox"
                          id={`checkbox-${module.id}`}
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(module.id, isChecked)}
                          disabled={isUpdating}
                          className={`h-4 w-4 rounded cursor-pointer transition-opacity ${
                            isUpdating ? "opacity-50" : ""
                          }`}
                        />
                        {isUpdating && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>

                      {/* Module Title */}
                      <button
                        className={`text-left text-slate-700 text-sm cursor-pointer py-1 flex-grow hover:text-slate-900 transition-colors ${
                          isChecked ? "line-through opacity-75" : ""
                        }`}
                        onClick={() => handleModuleChange(module.id)}
                        title={module.title}
                      >
                        {module.title}
                      </button>

                      {/* Assignment Icon */}
                      {module.moduleType === ModuleType.ASSIGNMENT && (
                        <BookMinus size={16} className="text-slate-400 flex-shrink-0" />
                      )}

                      {/* Update status indicator */}
                      {isUpdating && (
                        <div className="text-xs text-blue-600 flex-shrink-0">Updating...</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
