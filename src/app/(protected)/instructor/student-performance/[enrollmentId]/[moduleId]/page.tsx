"use client";

import Breadcrumps from "@/components/_commons/Breadcrumps";
import Layout from "@/components/_commons/layout/Layout";
import AssignmentDetails from "@/components/lecturer/student-performance/assignment-page/AssignmentDetails";
import AccordionMenu from "@/components/student/my-courses/courses/AccordionMenu";
import CourseHeader from "@/components/student/my-courses/courses/CourseHeader";
import CourseInfoCard from "@/components/student/my-courses/courses/CourseInfoCard";
import ModuleContent from "@/components/student/my-courses/courses/ModuleContent";
import {
  courseData,
  courseEnrollmentDataList,
  ModuleListData,
  modulesData,
} from "@/utils/mock-data";
import React from "react";

interface ICoursesPageProps {
  params: Promise<{ enrollmentId: string; moduleId?: string }>;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const breadcrumbsData: BreadcrumbItem[] = [
  { label: "Student Performance", href: "" },
  { label: "" },
  { label: "" },
];

export default function StudentAssignmentPage({ params }: ICoursesPageProps) {
  // Get the id from parameter
  const tempParams = React.use(params);
  const { enrollmentId, moduleId } = tempParams;

  // Handle fetch enrollment data
  const currentEnrollmentData = courseEnrollmentDataList.find((enrollment) => {
    return enrollment.id === enrollmentId;
  });
  // TODO: handle not found
  if (!currentEnrollmentData) return <div>Enrollment not found</div>;

  // Handle fetch course data
  const currentCourseData = courseData.find((course) => {
    return course.id === enrollmentId.replace("enroll-", "");
  });
  if (!currentCourseData) return <div>Course not found</div>;

  // Handle fetch module data
  const currentModuleData = modulesData.find((moduleData) => moduleData.id === moduleId);
  if (!currentModuleData) return <div>Module not found</div>;

  // Handle fetch submitted work
  const currentAssignmentScore = currentEnrollmentData.assignmentScoreDataList.find(
    (assignmentScore) => assignmentScore.moduleId === moduleId
  );
  const currentSubmittedData = currentAssignmentScore?.submittedData;

  // change the breadcumbs
  breadcrumbsData[1].label = `${currentEnrollmentData.courseTitle}`;
  breadcrumbsData[2].label = `${currentEnrollmentData.userDetail.username}'s Work`;

  return (
    <Layout>
      <Breadcrumps items={breadcrumbsData} />
      <section className="flex gap-4">
        {/* Course Content */}
        <section className="flex flex-col gap-4 w-5/7">
          {currentModuleData ? (
            <AssignmentDetails {...{ ...currentModuleData, submittedData: currentSubmittedData }} />
          ) : (
            // TODO: add error/not found component
            <div>Module not found</div>
          )}
        </section>
      </section>
    </Layout>
  );
}
