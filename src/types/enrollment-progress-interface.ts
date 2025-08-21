/**
 * Interface for the module progress object.
 * This object tracks a student's progress within a course's modules.
 */
interface EnrollmentProgress {
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
