import React from "react";
import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import UserDetail from "@/components/_commons/UserDetail";
import CourseScores from "@/components/student/performance/CourseScores";
import { enrollmentDataItf } from "@/types/types";
import { Enrollment } from "@/types/enrollment-interface";
import { courseData } from "@/utils/mock-data";
import { transformDate } from "@/utils/transform-date";
import { createFullName } from "@/utils/create-full-name";

export default function StudentCoursePerformance({
  id,
  studentId,
  courseId,
  status,
  createdAt,
  updatedAt,
  instructor,
  moduleProgress,
  lectureProgress,
  assignmentProgress,
  assignmentScore,
  course,
  submissions,
}: Enrollment) {
  const instructorUser = instructor.user;

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 w-7/8 border border-slate-300 flex gap-8 mb-4">
      {/* Section Header */}
      <section className="sticky top-4 w-1/5 h-fit">
        <section className="flex flex-col gap-4 mb-4">
          <Header element="h2" size="20">
            {course.title}
          </Header>

          {/* Category */}
          <div className="flex flex-wrap gap-2">
            {course.categories.map((category, index) => (
              <Label key={index}>{category.category.name}</Label>
            ))}
          </div>

          {/* End Date */}
          <p className="text-slate-600">
            End date: {course.endDate ? transformDate(course.endDate) : "Anytime"}
          </p>
        </section>

        {/* Lecturer Details */}
        <p className="mb-2">Lecturer</p>
        <UserDetail
          username={createFullName(instructorUser)}
          userTitle={instructor.userTitle}
          userAvatarSrc={instructorUser.avatarSrc || ""}
        />
      </section>

      <CourseScores
        {...{
          courseId,
          moduleProgress,
          lectureProgress,
          assignmentProgress,
          assignmentScore,
          submissions,
        }}
      />
    </div>
  );
}
