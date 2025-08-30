"use client";

import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import StudentCoursePerformance from "@/components/student/performance/StudentCoursePerformance";
import { useFetchData } from "@/hooks/useFetchApi";
import { fetchCategoryList, fetchEnrollmentsByStudent } from "@/services/api";
import { SearchData, SortOption } from "@/types/course-interface";
import { Enrollment, EnrollmentOptions } from "@/types/enrollment-interface";
import { useSession } from "next-auth/react";
import { useState } from "react";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function performancePage() {
  // Handle category change
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const onCategoryChange = (newCategoryId: string | null) => {
    setCategoryId(newCategoryId);
  };

  // Handle sorting
  const [sortOption, setsortOption] = useState<SortOption | null>(null);
  const onSortOptionChange = (newSortOption: SortOption | null) => {
    setsortOption(newSortOption);
  };

  // Handle searching
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const onSearchDataChange = (newSearchData: SearchData | null) => {
    setSearchData(newSearchData);
  };

  // fetch categories
  const { data: session } = useSession();
  const token = session?.accessToken;
  const {
    data: CategoryDataList,
    isLoading: isLoadingCategoryList,
    error: errorCategoryList,
  } = useFetchData(fetchCategoryList, token);

  // Find the current module data based on the URL parameter
  const {
    data: enrollments,
    isLoading: isLoadingEnrollments,
    error: errorEnrollments,
  } = useFetchData<Enrollment[], [EnrollmentOptions]>(fetchEnrollmentsByStudent, token, {
    includeCourse: true,
    includeSubmissions: true,
    includeAllProgress: true,
    categoryId,
    searchData,
    sortOption,
  });

  return (
    <Layout>
      <Header element="h1" size="24" className="opacity-90 ml-2">
        My Performance
      </Header>

      <CourseFilterSection
        courseCategoriesData={CategoryDataList || []}
        onEachButtonClicked={onCategoryChange}
        onEachSortButtonClicked={onSortOptionChange}
        activeCategoryId={categoryId}
        onSearchFieldSubmitted={onSearchDataChange}
      />

      <section>
        {enrollments?.map((enrollment, index) => (
          <StudentCoursePerformance {...enrollment} key={enrollment.id} />
        ))}
      </section>
    </Layout>
  );
}
