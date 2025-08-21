"use client";

import Header from "@/components/_commons/Header";
import { courseCategoriesData, enrolledCourseData } from "@/utils/mock-data";
import EnrollmentCard from "@/components/student/my-courses/EnrollmentCard";
import Layout from "@/components/_commons/layout/Layout";
import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchCategoryList, fetchEnrollmentWithCourseList } from "@/services/api";
import { Enrollment } from "@/types/enrollment-interface";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function MyCoursesPage() {
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

  // fetch enrollments + courses
  const {
    data: EnrollmentDataList,
    isLoading: isLoadingProductList,
    error: errorProductList,
  } = useFetchData<Enrollment[], [string | null]>(fetchEnrollmentWithCourseList, token, categoryId);

  return (
    <Layout>
      <Header element="h1" className="opacity-90 ml-2">
        My Courses
      </Header>

      <CourseFilterSection
        courseCategoriesData={CategoryDataList}
        onEachButtonClicked={onCategoryChange}
        activeCategoryId={categoryId}
        // courseStatusExcluded={courseStatusExcluded}
      />

      {/* Enrollment Card List */}
      <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {EnrollmentDataList?.map((enrollment) => (
          <EnrollmentCard
            {...enrollment}
            key={enrollment.courseId}
            // status={enrollment.status.map((s) => ({
            //   label: s.label,
            //   dotColorClass: "bg-slate-300",
            // }))}
          />
        ))}
      </section>
    </Layout>
  );
}
