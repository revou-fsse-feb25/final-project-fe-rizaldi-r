"use client";

import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import StudentCoursePerformance from "@/components/student/performance/StudentCoursePerformance";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchCategoryList, fetchEnrollmentsWithSubmissionAndProgressByStudent } from "@/services/api";
import { Enrollment } from "@/types/enrollment-interface";
import { useSession } from "next-auth/react";
import { useState } from "react";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function performancePage() {
  // Handle category change
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const onCategoryChange = (newCategoryId: string | null) => {
    setCategoryId(newCategoryId);
  };

  // fetch categories
  const { data: session } = useSession();
  const token = session?.accessToken;
  const {
    data: CategoryDataList,
    isLoading: isLoadingCategoryList,
    error: errorCategoryList,
  } = useFetchData(fetchCategoryList, token);

  // TODO: handle category change
  // Find the current module data based on the URL parameter
  const {
    data: enrollments,
    isLoading: isLoadingEnrollments,
    error: errorEnrollments,
  } = useFetchData<Enrollment[], [null, boolean]>(
    fetchEnrollmentsWithSubmissionAndProgressByStudent,
    token,
    null,
    true
  );

  return (
    <Layout>
      <Header element="h1" size="24" className="opacity-90 ml-2">
        My Performance
      </Header>

      <CourseFilterSection
        courseCategoriesData={CategoryDataList}
        onEachButtonClicked={onCategoryChange}
        activeCategoryId={categoryId}
      />

      <section>
        {enrollments?.map((enrollment, index) => (
          <StudentCoursePerformance {...enrollment} key={enrollment.id} />
        ))}
      </section>
    </Layout>
  );
}
