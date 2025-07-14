"use client";

import Breadcrumps from "@/components/_commons/Breadcrumps";
import Layout from "@/components/_commons/layout/Layout";
import AccordionMenu from "@/components/student/my-courses/courses/AccordionMenu";
import CourseHeader from "@/components/student/my-courses/courses/CourseHeader";
import CourseInfoCard from "@/components/student/my-courses/courses/CourseInfoCard";
import ModuleContent from "@/components/student/my-courses/courses/ModuleContent";
import { ItfModule } from "@/types/types";
import { courseData, ModuleListData, modulesData } from "@/utils/MockData";
import React, { useState } from "react";

interface ICoursesPageProps {
  params: Promise<{ enrollmentId: string }>;
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
  // Get the id from parameter
  const tempParams = React.use(params);
  const id = tempParams?.enrollmentId;

  // Handle refetch on module change
  const [currentModuleData, setcurrentModuleData] = useState<ItfModule | null>(modulesData[0]);
  const handleModuleChange = (newactiveModuleId: string | null) => {
    const foundModule = modulesData.find((courseData) => courseData.id === newactiveModuleId);
    setcurrentModuleData(foundModule || null);
  };

  // Handle fetch course data
  const currentCourseData = courseData.find((courseData) => {
    return courseData.id === id;
  });

  // TODO: handle not found
  if (!currentCourseData) return <div>Course not found</div>;
  
  return (
    <Layout>
      <main className="flex flex-col gap-6 my-4">
        <Breadcrumps items={breadcrumbsData} />
        {/* Course Header */}
        <CourseHeader
          title={currentCourseData.title || "Course Title"}
          categories={currentCourseData.categories || []}
          endDate={currentCourseData.endDate || "Anytime"}
          status={currentCourseData.status.map((s) => ({
            label: s.label,
            dotColorClass: "bg-gray-300",
          }))}
        />
        <section className="flex gap-4">
          {/* Course Content */}
          <section className="flex flex-col gap-4 w-5/7">
            {currentModuleData ? (
              <ModuleContent {...currentModuleData} />
            ) : (
              // TODO: add error/not found component
              <div>Module not found</div>
            )}
          </section>

          {/* Course Menu & Detail */}
          <section className="flex flex-col gap-4 w-2/7">
            <AccordionMenu sections={ModuleListData} onModuleChange={handleModuleChange} />
            {/* Course Details */}
            <CourseInfoCard
              lecturerName={currentCourseData.lecturer.name}
              lecturerTitle={currentCourseData.lecturer.title}
              courseDescription={currentCourseData.description || "No description available."}
              startDate={currentCourseData.startDate || "Not specified"}
              endDate={currentCourseData.endDate || "Not specified"}
            />
          </section>
        </section>
      </main>
    </Layout>
  );
}
