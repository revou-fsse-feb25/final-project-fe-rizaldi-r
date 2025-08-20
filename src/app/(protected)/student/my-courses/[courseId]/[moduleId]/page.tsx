"use client";

import Breadcrumps from "@/components/_commons/Breadcrumps";
import Layout from "@/components/_commons/layout/Layout";
import AccordionMenu from "@/components/student/my-courses/courses/AccordionMenu";
import CourseHeader from "@/components/student/my-courses/courses/CourseHeader";
import CourseInfoCard from "@/components/student/my-courses/courses/CourseInfoCard";
import ModuleContent from "@/components/student/my-courses/courses/ModuleContent";
import { useFetchData } from "@/hooks/useFetchData";
import {
  fetchCourse,
  fetchModule,
  fetchEnrollmentWithCourseList,
  fetchEnrollmentWithSubmission,
} from "@/services/api";
import { CourseDetails } from "@/types/course-interface";
import { Enrollment } from "@/types/enrollment-interface";
import { CourseModuleDetails } from "@/types/module-interface";
import { createFullName } from "@/utils/create-full-name";
import { courseData, ModuleListData, modulesData } from "@/utils/mock-data";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

interface ICoursesPageProps {
  params: Promise<{ courseId: string; moduleId: string }>;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const breadcrumbsData: BreadcrumbItem[] = [
  { label: "My Courses", href: "/" },
  { label: "Intro to NextJS" },
];

export default function coursePage({ params }: ICoursesPageProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Get the id from parameter
  const tempParams = React.use(params);
  const { courseId, moduleId } = tempParams;

  // fetch course
  const { data: session } = useSession();
  const token = session?.accessToken;
  const {
    data: courseData,
    isLoading: isLoadingCourseData,
    error: errorCourseData,
  } = useFetchData<CourseDetails, [string]>(fetchCourse, token, courseId);

  // Find the current module data based on the URL parameter
  const {
    data: moduleData,
    isLoading: isLoadingModuleData,
    error: errorModuleData,
  } = useFetchData<CourseModuleDetails, [string]>(fetchModule, token, moduleId);

  // Find the current module data based on the URL parameter
  const {
    data: enrollment,
    isLoading: isLoadingEnrollment,
    error: errorEnrollment,
  } = useFetchData<Enrollment[], [string]>(fetchEnrollmentWithSubmission, token, courseId);
  const submissions = enrollment && enrollment[0].submissions;

  // Update the URL to reflect the new active module
  const handleModuleChange = (newactiveModuleId: string) => {
    router.push(`/student/my-courses/${courseId}/${newactiveModuleId}#overview`);
  };

  // TODO: handle not found
  if (!courseData) return <div>Course not found</div>;

  return (
    <Layout>
      <Breadcrumps items={breadcrumbsData} />
      {/* Course Header */}
      <CourseHeader
        title={courseData.title || "Course Title"}
        categories={courseData.categories || []}
        endDate={courseData.endDate}
        // status={courseData.status.map((s) => ({
        //   label: s.label,
        //   dotColorClass: "bg-slate-300",
        // }))}
      />
      <section className="flex gap-4">
        {/* Course Content */}
        <section className="flex flex-col gap-4 w-5/7">
          {moduleData ? (
            <ModuleContent {...moduleData} submissions={submissions} />
          ) : (
            // TODO: add error/not found component
            <div>Module not found</div>
          )}
        </section>

        {/* Course Menu & Detail */}
        <section className="flex flex-col gap-4 w-2/7">
          <AccordionMenu
            sections={courseData.sections}
            onModuleChange={handleModuleChange}
            initialActiveModuleId={moduleId || modulesData[0]?.id}
          />
          {/* Course Details */}
          <CourseInfoCard
            instructorName={createFullName(courseData.instructor.user)}
            instructorTitle={courseData.instructor.userTitle}
            courseDescription={courseData.description}
            startDate={courseData.startDate}
            endDate={courseData.endDate}
          />
        </section>
      </section>
    </Layout>
  );
}
