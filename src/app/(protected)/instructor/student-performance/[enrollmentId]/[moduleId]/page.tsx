"use client";

import Breadcrumps from "@/components/_commons/Breadcrumps";
import Layout from "@/components/_commons/layout/Layout";
import AssignmentDetails from "@/components/lecturer/student-performance/assignment-page/AssignmentDetails";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchEnrollmentWithSubmission, fetchModule } from "@/services/api";
import { Enrollment } from "@/types/enrollment-interface";
import { CourseModuleDetails } from "@/types/module-interface";
import { createFullName } from "@/utils/create-full-name";
import Module from "module";
import { useSession } from "next-auth/react";
import React from "react";

interface ICoursesPageProps {
  params: Promise<{ enrollmentId: string; moduleId: string }>;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const breadcrumbsData: BreadcrumbItem[] = [
  { label: "Student Performance", href: "/instructor/student-performance" },
  { label: "" },
  { label: "" },
  { label: "" },
];

export default function StudentAssignmentPage({ params }: ICoursesPageProps) {
  // Get the id from parameter
  const tempParams = React.use(params);
  const { enrollmentId, moduleId } = tempParams;

  // get session
  const { data: session } = useSession();
  const token = session?.accessToken;

  // Handle fetch enrollment data
  const {
    data: enrollment,
    isLoading: isLoadingEnrollment,
    error: errorEnrollment,
  } = useFetchData<Enrollment, [string]>(fetchEnrollmentWithSubmission, token, enrollmentId);

  // Handle fetch module data
  const {
    data: moduleData,
    isLoading: isLoadingModule,
    error: errorModule,
  } = useFetchData<CourseModuleDetails, [string]>(fetchModule, token, moduleId);

  // TODO: handle not found
  if (!enrollment) return <div>Enrollment not found</div>;

  // change the breadcumbs
  breadcrumbsData[1].label = `${enrollment.course.title}`;
  breadcrumbsData[2].label = `${moduleData?.title}`;
  breadcrumbsData[3].label = `${createFullName(enrollment.student.user)}'s Work`;

  // find the submission
  const foundSubmission = enrollment.submissions.find((submission) => {
    return submission.moduleId === moduleId;
  });

  return (
    <Layout>
      <Breadcrumps items={breadcrumbsData} />
      <section className="flex gap-4">
        {/* Course Content */}
        <section className="flex flex-col gap-4 w-5/7">
          {foundSubmission && moduleData ? (
            <AssignmentDetails
              {...foundSubmission}
              embedVideoLink={moduleData?.embedVideoLink}
              title={moduleData?.title}
              description={moduleData?.description}
              subdescriptions={moduleData?.subdescriptions}
              links={moduleData?.links}
            />
          ) : (
            // TODO: add error/not found component
            <div>Module not found</div>
          )}
        </section>
      </section>
    </Layout>
  );
}
