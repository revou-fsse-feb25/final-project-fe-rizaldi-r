import React from "react";
import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import ProgressDisplay from "@/components/_commons/ProgressDisplay";
import { ItfProgressDashboard } from "@/types/types";
import UserDetail from "@/components/_commons/UserDetail";
import AssignmentScore from "./AssignmentScore";

export default function ModulePerformance({
  courseTitle,
  tags,
  dueDate,
  moduleProgressDataList,
  assignmentOverallScoresData,
  assignmentScoreDataList,
  lecturerData,
}: ItfProgressDashboard) {
  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 w-7/8 border border-gray-300 flex gap-8 mb-4">
      {/* Section Header */}
      <section className="sticky top-4 w-1/5 h-fit">
        <section className="flex flex-col gap-4 mb-4">
          <Header element="h2" size="24px">
            {courseTitle}
          </Header>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Label key={index}>{tag}</Label>
            ))}
          </div>

          {/* End Date */}
          <p className="text-gray-600">End date: {dueDate}</p>
        </section>

        {/* Lecturer Details */}
        <p className="mb-2">Lecturer</p>
        <UserDetail {...lecturerData} />
      </section>

      <section className=" flex flex-col gap-6 w-4/5">
        {/* Module Completed Section */}
        <section>
          <Header element="h3" size="20px" className="mb-2">
            Module Completed
          </Header>
          <div className="flex flex-col md:flex-row  items-center gap-20">
            {moduleProgressDataList.map((moduleProgress, index) => (
              <ProgressDisplay key={index} {...moduleProgress} displayType="Circle" />
            ))}
          </div>
        </section>

        {/* Assignment Scores Section */}
        <section>
          <Header element="h3" size="20px" className="mb-2">
            Scores
          </Header>
          <ProgressDisplay {...assignmentOverallScoresData} />
        </section>

        {/* Each Assignment Scores Section */}
        {assignmentScoreDataList.map((assignmentScoreData, index) => (
          <AssignmentScore {...assignmentScoreData} key={index} />
        ))}
      </section>
    </div>
  );
}
