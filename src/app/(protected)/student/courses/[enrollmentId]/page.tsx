"use client";

import Breadcrumps from "@/components/_commons/Breadcrumps";
import Layout from "@/components/_commons/layout/Layout";
import AccordionMenu from "@/components/student/courses/AccordionMenu";
import CourseHeader from "@/components/student/courses/CourseHeader";
import ModuleContent from "@/components/student/courses/ModuleContent";
import { ItfSection } from "@/types/types";
import { enrollmentData } from "@/utils/MockData";
import Module from "module";
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

const ListModuleData: ItfSection[] = [
  {
    id: "section-1",
    title: "1. Section",
    modules: [
      { id: "module-1-1", label: "Introduction", completed: true },
      { id: "module-1-2", label: "Basic stuff", completed: true },
    ],
    isExpanded: true,
  },
  {
    id: "section-2",
    title: "2. Section",
    modules: [
      { id: "module-2-1", label: "Introduction", completed: false },
      { id: "module-2-2", label: "Basic stuff", completed: false },
      { id: "module-2-3", label: "Assignment", completed: false, type: "assignment" },
      { id: "module-2-4", label: "Basic stuff 2", completed: false },
      { id: "module-2-5", label: "Basic stuff 3", completed: false },
    ],
    isExpanded: true,
  },
];

const modulesData = {
  id: "module-1-1",
  type: "Lecture",
  title: "Create Something",
  description: "This module dives deep into one of Next.js's most powerful features: intelligent data fetching. You'll learn how Next.js optimizes the process of bringing data into your applications, offering various strategies to suit different needs.",
  subdescription: [
    {
      header: "Static Site Generation (SSG)",
      type: "description", // "description" or "list"
      description: "We'll explore Static Site Generation (SSG), understanding when and why to pre-render pages at build time for lightning-fast performance. You'll master the getStaticProps function and learn how to implement dynamic routes with getStaticPaths.",
    },
    {
      header: "Key Concepts",
      type: "list",
      description: "Next.js Data Fetching\nServer-Side Rendering (SSR)\nClient-Side Rendering (CSR)\nNext.js Data Fetching\nServer-Side Rendering (SSR)\nClient-Side Rendering (CSR)",
    },
  ],
  links: [
    {
      label: "Lecture slide",
      href: "https://www.google.com/?udm=14",
    },
  ],
};

export default function coursePage({ params }: ICoursesPageProps) {
  // Get the id from parameter
  const tempParams = React.use(params);
  const id = tempParams?.enrollmentId;

  // Handle category change
  const [activeModule, setactiveModule] = useState<number | null>(null);
  const onCategoryChange = (newactiveModule: number | null) => {
    setactiveModule(newactiveModule);
  };

  // Handle fetch product
  const enrollment = enrollmentData.find((enrollment) => {
    return enrollment.id === id;
  });

  // TODO: handle not found
  if (!enrollment) return <div>Course not found</div>;
  return (
    <Layout>
      <main>
        <Breadcrumps items={breadcrumbsData} />
        {/* Course Header */}
        <CourseHeader
          title={enrollment.title || "Course Title"}
          categories={enrollment.categories || []}
          endDate={enrollment.endDate || "Anytime"}
          status={enrollment.status.map((s) => ({
            label: s.label,
            dotColorClass: "bg-gray-300",
          }))}
        />
        <div className="flex gap-2">
          {/* Course Content */}
          <section className="w-5/7">
            <div className="bg-gray-200 aspect-video rounded-xl"></div>
            <ModuleContent {...modulesData} />
          </section>

          {/* Course Menu */}
          <section className="w-2/7">
            <AccordionMenu sections={ListModuleData} />
          </section>
        </div>
      </main>
    </Layout>
  );
}
