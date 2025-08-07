import React from "react";
import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import { CoursePerformanceItf } from "@/types/types";
import UserDetail from "@/components/_commons/UserDetail";
import OverallScores from "@/components/student/performance/OverallScores";
import CourseScores from "@/components/student/performance/CourseScores";

export default function CoursePerformance({
  id,
  courseTitle,
  tags,
  dueDate,
  lecturerData,
  moduleOverallProgressData,
  moduleProgressDataList,
  assignmentOverallScoresData,
  courseEnrollmentDataList,
}: CoursePerformanceItf) {
  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-300 flex gap-8 mb-4">
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

      <section className=" flex flex-col gap-6 w-4/5">
        {/* Section Overall Performance */}
        <OverallScores
          moduleOverallProgressDataList={[moduleOverallProgressData, ...moduleProgressDataList]}
          assignmentOverallScoresData={assignmentOverallScoresData}
        />

        {courseEnrollmentDataList.map((enrollmentDataList, index) => (
          <div
            key={index}
            className="border-1 border-slate-300 rounded-lg flex items-start gap-12 p-6 sm:p-8"
          >
            <div className="sticky top-4">
              <p className="mb-2">Student</p>
              <UserDetail {...enrollmentDataList.userDetail} />
            </div>
            <CourseScores identifier={enrollmentDataList.id} {...enrollmentDataList} />
          </div>
        ))}
      </section>
    </div>
  );
}
