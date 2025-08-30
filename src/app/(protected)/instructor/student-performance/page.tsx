"use client";

import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import CoursePerformance from "@/components/instructor/student-performance/CoursePerformance";
import { useFetchData } from "@/hooks/useFetchApi";
import { fetchCategoryList, fetchCourses } from "@/services/api";
import {
  CourseDetails,
  FetchCoursesOptions,
  SearchData,
  SortOption,
} from "@/types/course-interface";
import { useSession } from "next-auth/react";
import { useState } from "react";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function studentPerformancePage() {
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

  const { data: session } = useSession();
  const token = session?.accessToken;
  const instructorUsername = session?.user.name;

  // fetch categories
  const {
    data: CategoryDataList,
    isLoading: isLoadingCategoryList,
    error: errorCategoryList,
  } = useFetchData(fetchCategoryList, token);

  // fetch courses by instructor
  const {
    data: courses,
    isLoading: isLoadingCourses,
    error: errorCourses,
  } = useFetchData<CourseDetails[], [FetchCoursesOptions]>(fetchCourses, token, {
    instructorUsername,
    categoryId,
    searchData,
    sortOption,
  });

  // then find match student enrollment that enrolled with the sam e course

  return (
    <Layout>
      <Header element="h1" size="24" className="opacity-90 ml-2">
        Students Performance
      </Header>

      <CourseFilterSection
        courseCategoriesData={CategoryDataList || []}
        onEachButtonClicked={onCategoryChange}
        onEachSortButtonClicked={onSortOptionChange}
        activeCategoryId={categoryId}
        onSearchFieldSubmitted={onSearchDataChange}
      />

      <section>
        {courses?.map((course) => (
          // TODO: feed the searchData to filter enrollment by student name
          <CoursePerformance {...{ ...course, token }} key={course.id} />
        ))}
      </section>
    </Layout>
  );
}
