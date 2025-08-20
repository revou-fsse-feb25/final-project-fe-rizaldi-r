"use client"

import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import CoursePerformance from "@/components/lecturer/student-performance/CoursePerformance";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchCategoryList } from "@/services/api";
import {
  courseEnrollmentDataList,
  courseCategoriesLecturerData,
  coursePerformanceDataList,
} from "@/utils/mock-data";
import { useSession } from "next-auth/react";
import { useState } from "react";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function studentPerformancePage() {
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

  // TODO: find lecturer id then find all the course they teach
  // then find match student enrollment that enrolled with the sam e course
  return (
    <Layout>
      <Header element="h1" size="24" className="opacity-90 ml-2">
        Students Performance
      </Header>

      <CourseFilterSection
        courseCategoriesData={CategoryDataList}
        onEachButtonClicked={onCategoryChange}
        activeCategoryId={categoryId}
      />

      <section>
        {coursePerformanceDataList.map((coursePerformanceData, index) => (
          <CoursePerformance
            {...{ ...coursePerformanceData, courseEnrollmentDataList }}
            key={index}
          />
        ))}
      </section>
    </Layout>
  );
}
