"use client";

import Breadcrumps from "@/components/_commons/Breadcrumps";
import Layout from "@/components/_commons/layout/Layout";
import EditAccordionMenu from "@/components/lecturer/my-courses/courses/EditAccordionMenu";
import EditCourseHeader from "@/components/lecturer/my-courses/courses/EditCourseHeader";
import EditCourseInfoCard from "@/components/lecturer/my-courses/courses/EditCourseInfoCard";
import EditModuleContent from "@/components/lecturer/my-courses/courses/EditModuleContent";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchCourse, fetchModule, fetchEnrollmentWithSubmissionByStudent } from "@/services/api";
import { CourseDetails } from "@/types/course-interface";
import { Enrollment } from "@/types/enrollment-interface";
import { CourseModuleDetails } from "@/types/module-interface";
import { createFullName } from "@/utils/create-full-name";
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
  { label: "Courses", href: "/admin/courses" },
  { label: "" },
  { label: "" },
];

export default function instructorCoursePage({ params }: ICoursesPageProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Get the id from parameter
  const tempParams = React.use(params);
  const { courseId, moduleId } = tempParams;

  const { data: session } = useSession();
  const token = session?.accessToken;

  // fetch course
  const {
    data: courseData,
    isLoading: isLoadingCourseData,
    error: errorCourseData,
    refetch: refetchCourse,
  } = useFetchData<CourseDetails, [string]>(fetchCourse, token, courseId);

  // Find the current module data based on the URL parameter
  const {
    data: moduleData,
    isLoading: isLoadingModuleData,
    error: errorModuleData,
    refetch: refetchModule,
  } = useFetchData<CourseModuleDetails, [string]>(fetchModule, token, moduleId);

  // update breadcrumps
  breadcrumbsData[1].label = courseData?.title || "Course";
  breadcrumbsData[2].label = moduleData?.title || "Module";

  // Update the URL to reflect the new active module
  const handleModuleChange = (newactiveModuleId: string) => {
    router.push(`/admin/courses/${courseId}/${newactiveModuleId}#overview`);
  };

  // TODO: handle not found
  if (isLoadingCourseData) return <div>Loading...</div>;
  if (!courseData) return <div>404 Course Not Found</div>;


  return (
    <Layout>
      <Breadcrumps items={breadcrumbsData} />

      {/* Course Header */}
      <EditCourseHeader
        courseId={courseId}
        title={courseData.title || "Course Title"}
        categories={courseData.categories || []}
        endDate={courseData.endDate}
      />

      {/* Course Content */}
      <section className="flex flex-col lg:flex-row gap-4">
        <section className="flex flex-col gap-4 lg:w-5/7">
          {moduleData ? (
            <EditModuleContent
              {...moduleData}
              courseId={courseId}
              refetchModule={refetchModule}
              description={moduleData.description || ""}
            />
          ) : (
            // TODO: add error/not found component
            <div>Module not found</div>
          )}
        </section>

        {/* Course Menu & Detail */}
        <section className="flex flex-col gap-4 lg:w-2/7">
          {/* Course Menu */}
          <EditAccordionMenu
            refetchCourse={refetchCourse}
            courseId={courseId}
            sections={courseData.sections}
            onModuleChange={handleModuleChange}
            initialActiveModuleId={moduleId || courseData.sections[0]?.modules[0].id}
          />

          {/* Course Details */}
          <EditCourseInfoCard
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
