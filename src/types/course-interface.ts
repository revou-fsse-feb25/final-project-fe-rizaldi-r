import { CourseModuleDetails } from "@/types/module-interface";
import { InstructorInfo } from "@/types/user-interface";

enum Program {
  WEBDEV,
  DATA_ANALYST,
  MARKETING,
}

/**
 * Interface for the nested category object within the categories array.
 */
interface CategoryInfo {
  id: string;
  name: string;
  programs: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface for the course's category information, linking the course to a specific category.
 */
export interface CourseCategory {
  courseId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryInfo;
}

/**
 * Interface for a course section, which contains an array of modules.
 */
export interface CourseSection {
  id: string;
  title: string;
  modules: CourseModuleDetails[];
}

/**
 * The main interface for the course details, based on the provided JSON data.
 */
export interface CourseDetails {
  id: string;
  title: string;
  imageSrc: string | null;
  imageAlt: string | null;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isMemberOnly: boolean;
  isLocked: boolean;
  instructorId: string;
  allowedPrograms: Program[];
  allowedBatchYears: number[];
  instructor: InstructorInfo;
  categories: CourseCategory[];
  sections: CourseSection[];
}

export interface CourseCreateData {
  title: string;
  imageSrc: string;
  imageAlt?: string;
  description: string;
  startDate?: string | null;
  endDate?: string | null;
  isMemberOnly: boolean;
  isLocked?: boolean;
  allowedPrograms: string[];
  allowedBatchYears: number[];
  categoryIds: string[];
  instructorId?: string;
}
