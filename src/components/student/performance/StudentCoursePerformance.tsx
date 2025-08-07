import React from "react";
import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import UserDetail from "@/components/_commons/UserDetail";
import CourseScores from "@/components/student/performance/CourseScores";
import { enrollmentDataItf } from "@/types/types";

export default function StudentCoursePerformance({
  id,
  courseId,
  courseTitle,
  tags,
  dueDate,
  lecturerData,
  moduleOverallProgressData,
  moduleProgressDataList,
  assignmentOverallScoresData,
  assignmentScoreDataList,
}: enrollmentDataItf) {
  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 w-7/8 border border-slate-300 flex gap-8 mb-4">
      {/* Section Header */}
      <section className="sticky top-4 w-1/5 h-fit">
        <section className="flex flex-col gap-4 mb-4">
          <Header element="h2" size="20">
            {courseTitle}
          </Header>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Label key={index}>{tag}</Label>
            ))}
          </div>

          {/* End Date */}
          <p className="text-slate-600">End date: {dueDate}</p>
        </section>

        {/* Lecturer Details */}
        <p className="mb-2">Lecturer</p>
        <UserDetail {...lecturerData} />
      </section>

      <CourseScores
        {...{
          // TODO: should be enrollmentId
          identifier: courseId,
          moduleOverallProgressData,
          moduleProgressDataList,
          assignmentOverallScoresData,
          assignmentScoreDataList,
        }}
      />
    </div>
  );
}
