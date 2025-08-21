import Header from "@/components/_commons/Header";
import ProgressDisplay from "@/components/_commons/ProgressDisplay";
import React from "react";

export interface OverallScoresItf {
  moduleProgress: EnrollmentProgress;
  lectureProgress: EnrollmentProgress;
  assignmentProgress: EnrollmentProgress;
  assignmentScore: EnrollmentProgress;
}

export default function OverallScores({
  moduleProgress,
  lectureProgress,
  assignmentProgress,
  assignmentScore,
}: OverallScoresItf) {
  console.log("🚀 ~ assignmentScore:", assignmentScore);

  return (
    <>
      <section>
        <Header element="h3" size="18" className="mb-2">
          Module Completed
        </Header>
        <div className="flex flex-col md:flex-row  items-center gap-20">
          <ProgressDisplay
            {...moduleProgress}
            displayType="Circle"
            progressLabel="Module Overall Progress"
          />
          <ProgressDisplay
            {...lectureProgress}
            displayType="Circle"
            progressLabel="Lecture Completed"
          />
          <ProgressDisplay
            {...assignmentProgress}
            displayType="Circle"
            progressLabel="Assignment Completed"
          />
        </div>
      </section>

      {/* Assignment Scores Section */}
      <section className="max-w-64">
        <Header element="h3" size="18" className="mb-2">
          Scores
        </Header>
        <ProgressDisplay
          {...assignmentScore}
          progressLabel="Assignment Overall Scores"
          moduleLabel="scores achived"
        />
      </section>
    </>
  );
}
