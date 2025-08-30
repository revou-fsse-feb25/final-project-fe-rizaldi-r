import AssignmentScore from "@/components/student/performance/AssignmentScore";
import OverallScores from "@/components/student/performance/OverallScores";
import ExpandableMoreContent from "@/components/_commons/ExpandableMoreContent";
import { Submission } from "@/types/submission-interface";
import { EnrollmentProgress } from "@/types/enrollment-interface";

export interface CourseScoresItf {
  courseId?: string;
  enrollmentId?: string;
  moduleProgress: EnrollmentProgress;
  lectureProgress: EnrollmentProgress;
  assignmentProgress: EnrollmentProgress;
  assignmentScore: EnrollmentProgress;
  submissions: Submission[];
}

export default function CourseScores({
  courseId,
  enrollmentId,
  moduleProgress,
  lectureProgress,
  assignmentProgress,
  assignmentScore,
  submissions,
}: CourseScoresItf) {
  return (
    <section className=" flex flex-col gap-6 sm:w-4/5">
      {/* Module Completed Section */}
      <OverallScores
        {...{ moduleProgress, lectureProgress, assignmentProgress, assignmentScore }}
      />

      <ExpandableMoreContent isInitialExpanded={false}>
        {/* Each Assignment Scores Section */}
        {submissions.map((submission, index) => (
          <AssignmentScore
            {...submission}
            key={index}
            courseId={courseId || "course-not-found"}
            enrollmentId={enrollmentId || "enrollment-not-found"}
          />
        ))}
      </ExpandableMoreContent>
    </section>
  );
}
