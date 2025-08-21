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
  fetchEnrollmentWithSubmissionByStudent,
  createEnrollment,
} from "@/services/api";
import { CourseDetails } from "@/types/course-interface";
import { Enrollment } from "@/types/enrollment-interface";
import { CourseModuleDetails } from "@/types/module-interface";
import { createFullName } from "@/utils/create-full-name";
import { AlertCircle } from "lucide-react";
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
  { label: "" },
  { label: "" },
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
    refetch: refetchEnrollment,
  } = useFetchData<Enrollment[], [string]>(fetchEnrollmentWithSubmissionByStudent, token, courseId);

  // update breadcrumps
  breadcrumbsData[1].label = courseData?.title || "Course";
  breadcrumbsData[2].label = moduleData?.title || "Module";

  // Update the URL to reflect the new active module
  const handleModuleChange = (newactiveModuleId: string) => {
    router.push(`/student/my-courses/${courseId}/${newactiveModuleId}#overview`);
  };

  const [enrollmentMessage, setEnrollmentMessage] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const handleEnroll = async () => {
    setIsEnrolling(true);
    setEnrollmentMessage("");
    try {
      await createEnrollment(token || "", courseId);
      setEnrollmentMessage("Enrollment successful! Redirecting...");
      refetchEnrollment(courseId);
    } catch (err) {
      setEnrollmentMessage("Enrollment failed. Please try again.");
    } finally {
      setIsEnrolling(false);
    }
  };

  // TODO: handle not found
  if (isLoadingCourseData) return <div>Loading...</div>;
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

      {/* Course Content */}
      <section className="flex gap-4">
        <section className="flex flex-col gap-4 w-5/7">
          {moduleData ? (
            <ModuleContent {...moduleData} submissions={enrollment?.[0]?.submissions} />
          ) : (
            // TODO: add error/not found component
            <div>Module not found</div>
          )}
        </section>

        {/* Course Menu & Detail */}
        <section className="flex flex-col gap-4 w-2/7">
          {/* Course Menu */}
          {enrollment?.[0] ? (
            <AccordionMenu
              sections={courseData.sections}
              onModuleChange={handleModuleChange}
              initialActiveModuleId={moduleId || courseData.sections[0]?.modules[0].id}
            />
          ) : (
            <>
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex flex-row"
                role="alert"
              >
                <AlertCircle size={24} className="mr-3" />
                <div>
                  <strong className="font-bold">Not Enrolled!</strong>
                  <span className="block sm:inline">
                    {" "}
                    You must enroll in this course to access the content.
                  </span>
                </div>
              </div>
              <button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
              >
                {isEnrolling ? "Enrolling..." : "Enroll Now"}
              </button>
              {enrollmentMessage && (
                <p className="mt-2 text-center text-sm font-medium">{enrollmentMessage}</p>
              )}
            </>
          )}

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
