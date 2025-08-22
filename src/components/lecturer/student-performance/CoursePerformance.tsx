import React from "react";
import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import { CoursePerformanceItf } from "@/types/types";
import UserDetail from "@/components/_commons/UserDetail";
import OverallScores from "@/components/student/performance/OverallScores";
import CourseScores from "@/components/student/performance/CourseScores";
import { CourseDetails } from "@/types/course-interface";
import { fetchEnrollmentsByCourse } from "@/services/api";
import { useFetchData } from "@/hooks/useFetchData";
import { Enrollment } from "@/types/enrollment-interface";
import { transformDate } from "@/utils/transform-date";
import { createFullName } from "@/utils/create-full-name";
import { capitalizeFirstWord } from "@/utils/capitalize-first-word";

export default function CoursePerformance({
  id,
  title,
  imageSrc,
  imageAlt,
  description,
  startDate,
  endDate,
  isMemberOnly,
  isLocked,
  instructorId,
  allowedPrograms,
  allowedBatchYears,
  instructor,
  categories,
  sections,
  token,
}: CourseDetails & { token?: string }) {
  const {
    data: enrollments,
    isLoading: isLoadingEnrollments,
    error: errorEnrollments,
  } = useFetchData<Enrollment[], [string]>(fetchEnrollmentsByCourse, token, id);

  return (
    <div className="bg-white rounded-lg p-4 sm:p-8 border border-slate-300 flex flex-col sm:flex-row sm:gap-8 mb-4">
      {/* Section Header */}
      <section className="sm:sticky top-4 sm:w-1/5 h-fit">
        <section className="flex flex-col gap-4 mb-4">
          <Header element="h2" size="20">
            {title}
          </Header>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories?.map((category, index) => (
              <Label key={index}>{category.category.name}</Label>
            ))}
          </div>

          {/* End Date */}
          <p className="text-slate-600">End date: {endDate ? transformDate(endDate) : "Anytime"}</p>
        </section>

        {/* Lecturer Details */}
        {/* <p className="mb-2">Lecturer</p>
        <UserDetail
          username={createFullName(instructorUser)}
          userTitle={instructor.userTitle}
          userAvatarSrc={instructorUser.avatarSrc || ""}
        /> */}
      </section>

      <section className=" flex flex-col gap-6 sm:w-4/5">
        {/* Section Overall Performance */}
        {/* <OverallScores
          moduleOverallProgressDataList={[moduleOverallProgressData, ...moduleProgressDataList]}
          assignmentOverallScoresData={assignmentOverallScoresData}
        /> */}

        {enrollments?.map((enrollment, index) => (
          <div
            key={index}
            className="border-1 border-slate-300 rounded-lg flex flex-col sm:flex-row items-start gap-12 p-4 sm:p-8"
          >
            <div className="sm:sticky top-4">
              <p className="mb-2">Student</p>
              <UserDetail
                username={createFullName(enrollment.student.user)}
                userTitle={`${capitalizeFirstWord(enrollment.student.program)} student`}
                userAvatarSrc={enrollment.student.user.avatarSrc || ""}
              />
            </div>
            <CourseScores
              enrollmentId={enrollment.id}
              moduleProgress={enrollment.moduleProgress}
              lectureProgress={enrollment.lectureProgress}
              assignmentProgress={enrollment.assignmentProgress}
              assignmentScore={enrollment.assignmentScore}
              submissions={enrollment.submissions}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
