import AssignmentScore from "@/components/student/performance/AssignmentScore";
import OverallScores from "@/components/student/performance/OverallScores";
import { CourseScoresItf } from "@/types/types";
import ExpandableMoreContent from "@/components/_commons/ExpandableMoreContent";

export default function CourseScores({
  identifier,
  moduleOverallProgressData,
  moduleProgressDataList,
  assignmentOverallScoresData,
  assignmentScoreDataList,
}: CourseScoresItf & { identifier: string }) {
  return (
    <section className=" flex flex-col gap-6 w-4/5">
      {/* Module Completed Section */}
      <OverallScores
        moduleOverallProgressDataList={[moduleOverallProgressData, ...moduleProgressDataList]}
        assignmentOverallScoresData={assignmentOverallScoresData}
      />

      <ExpandableMoreContent isInitialExpanded={false}>
        {/* Each Assignment Scores Section */}
        {assignmentScoreDataList.map((assignmentScoreData, index) => (
          <AssignmentScore {...assignmentScoreData} key={index} identifier={identifier} />
        ))}
      </ExpandableMoreContent>
    </section>
  );
}
