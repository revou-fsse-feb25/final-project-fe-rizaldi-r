"use client";

import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import { CreateCourseForm } from "@/components/instructor/my-courses/CreateCourseForm";
import InstructorCourseCard from "@/components/instructor/my-courses/InstructorCourseCard";
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

export default function myCoursesPage() {
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
    refetch: refetchCourses,
  } = useFetchData<CourseDetails[], [FetchCoursesOptions]>(fetchCourses, token, {
    // includeCategories: true,
    // includeSections: true,
    instructorUsername,
    categoryId,
    searchData,
    sortOption,
  });

  return (
    <Layout>
      <Header element="h1" className="opacity-90 ml-2">
        My Courses
      </Header>

      <CourseFilterSection
        courseCategoriesData={CategoryDataList || []}
        onEachButtonClicked={onCategoryChange}
        onEachSortButtonClicked={onSortOptionChange}
        activeCategoryId={categoryId}
        onSearchFieldSubmitted={onSearchDataChange}
      />

      <section className="w-3/5">
        <CreateCourseForm
          refetchCourses={refetchCourses}
          token={token || ""}
          courseCategories={CategoryDataList}
        />
      </section>

      {/* Enrollment Card List */}
      <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {courses?.map((course) => (
          <InstructorCourseCard {...course} key={course.id} session={session} />
        ))}
      </section>
    </Layout>
  );
}
