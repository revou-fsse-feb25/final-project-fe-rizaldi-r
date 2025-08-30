"use client";

import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import BasicCourseCard from "@/components/student/search/BasicCourseCard";
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

export default function searchPage() {
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

  // fetch courses
  const {
    data: CourseDataList,
    isLoading: isLoadingProductList,
    error: errorProductList,
  } = useFetchData<CourseDetails[], [FetchCoursesOptions]>(fetchCourses, token, {
    categoryId,
    searchData,
    sortOption,
  });

  return (
    <Layout>
      <Header element="h1" size="24" className="opacity-90 ml-2">
        Discover Courses
      </Header>

      <CourseFilterSection
        courseCategoriesData={CategoryDataList || []}
        onEachButtonClicked={onCategoryChange}
        onEachSortButtonClicked={onSortOptionChange}
        activeCategoryId={categoryId}
        onSearchFieldSubmitted={onSearchDataChange}
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CourseDataList?.map((course) => (
          <BasicCourseCard
            {...course}
            key={course.id}
            // status={course.status.map((s) => ({
            //   label: s.label,
            //   dotColorClass: "bg-slate-300",
            // }))}
          />
        ))}
      </section>
    </Layout>
  );
}
