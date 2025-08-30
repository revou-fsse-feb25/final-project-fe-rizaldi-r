import { CourseDetails } from "@/types/course-interface";
import { ModuleProgress } from "@/types/module-interface";
import { Submission } from "@/types/submission-interface";
import { InstructorInfo, StudentInfo } from "@/types/user-interface";

// This interface defines all possible options for the fetch function.
export interface EnrollmentOptions {
  categoryId?: string | null;
  searchData?: { searchQuery: string; searchBy: string } | null;
  sortOption?: { sortBy: string; sortOrder: "asc" | "desc" } | null;
  courseId?: string | null;
  includeCourse?: boolean | null;
  includeSections?: boolean | null;
  includeSubmissions?: boolean | null;
  includeAllProgress?: boolean | null;
  includeModuleProgresses?: boolean | null;
}

/**
 * Interface for the module progress object.
 * This object tracks a student's progress within a course's modules.
 */
export interface EnrollmentProgress {
  id: string;
  progressPercentage?: number | null;
  moduleCompleted?: number | null;
  moduleTotal?: number | null;
  createdAt: string;
  updatedAt: string;
  moduleProgressId: string | null;
  lectureProgressId: string | null;
  assignmentProgressId: string | null;
  assignmentScoreId: string | null;
}

/**
 * Interface for the progress objects, which share a common structure.
 * This can be reused for moduleProgress, lectureProgress, assignmentProgress, and assignmentScore.
 */
interface ProgressDetails {
  id: string;
  progressPercentage: number | null;
  moduleCompleted: number | null;
  moduleTotal: number | null;
  createdAt: string;
  updatedAt: string;
  moduleProgressId: string | null;
  lectureProgressId: string | null;
  assignmentProgressId: string | null;
  assignmentScoreId: string | null;
}

/**
 * The main interface representing the complete enrollment object.
 */
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  instructor: InstructorInfo;
  student: StudentInfo;
  moduleProgress: ProgressDetails;
  lectureProgress: ProgressDetails;
  assignmentProgress: ProgressDetails;
  assignmentScore: ProgressDetails;
  moduleProgresses: ModuleProgress[];
  course: CourseDetails;
  submissions: Submission[];
}
