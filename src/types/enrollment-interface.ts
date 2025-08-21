import { CourseDetails } from "@/types/course-interface";
import { Submission } from "@/types/submission-interface";
import { InstructorInfo, StudentInfo } from "@/types/user-interface";

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
  course: CourseDetails;
  submissions: Submission[];
}
