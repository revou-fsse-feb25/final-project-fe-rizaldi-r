import Header from "@/components/_commons/Header";
import ProgressDisplay from "@/components/_commons/ProgressDisplay";
import { OverallScoresItf } from "@/types/types";
import React from "react";

export default function OverallScores({
  moduleOverallProgressDataList,
  assignmentOverallScoresData,
}: OverallScoresItf) {
  return (
    <>
      <section>
        <Header element="h3" size="18" className="mb-2">
          Module Completed
        </Header>
        <div className="flex flex-col md:flex-row  items-center gap-20">
          {moduleOverallProgressDataList.map((moduleProgress, index) => (
            <ProgressDisplay key={index} {...moduleProgress} displayType="Circle" />
          ))}
        </div>
      </section>

      {/* Assignment Scores Section */}
      <section className="max-w-64">
        <Header element="h3" size="18" className="mb-2">
          Scores
        </Header>
        <ProgressDisplay {...assignmentOverallScoresData} />
      </section>
    </>
  );
}
