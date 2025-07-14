import Header from "@/components/_commons/Header";
import ProgressDisplay from "@/components/_commons/ProgressDisplay";
import { itfAssignmentScoreDataList } from "@/types/types";
import React from "react";

export default function AssignmentScore({
  assignmentTitle,
  scorePercentage,
  scoreAchieved,
  scoreTotal,
  feedback,
}: itfAssignmentScoreDataList) {
  return (
    <section className="bg-gray-50 rounded-lg border border-gray-300 p-3 sm:p-3 sm:px-4 w-full flex flex-col gap-3">
      {/* Assignment Header */}
      <div className="flex items-center gap-2">
        <img src="/book.svg" alt="" />
        <Header element="h3" size="18px" className="">
          {assignmentTitle}
        </Header>
      </div>

      {/* Score Display */}
      <ProgressDisplay
        progressLabel="Score"
        countLabel="scores achieved"
        progressPercentage={scorePercentage}
        countCompleted={scoreAchieved}
        countTotal={scoreTotal}
      />

      {/* Feedback Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Feedback</h3>
        <p className="text-gray-700 leading-relaxed">{feedback}</p>
      </div>
    </section>
  );
}
