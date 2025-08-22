"use client";

import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import { CreateCourseFormForAdmin } from "@/components/admin/courses/CreateCourseFormForAdmin";
import { CreateCourseForm } from "@/components/lecturer/my-courses/CreateCourseForm";
import InstructorCourseCard from "@/components/lecturer/my-courses/InstructorCourseCard";
import { useFetchData } from "@/hooks/useFetchData";
import {
  fetchCategoryList,
  fetchCourseByInstructor,
  fetchCoursesList,
  fetchInstructorList,
} from "@/services/api";
import { CourseDetails } from "@/types/course-interface";
import { UserInfo } from "@/types/user-interface";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CoursesPage() {
  // Handle category change
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const onCategoryChange = (newCategoryId: string | null) => {
    setCategoryId(newCategoryId);
  };

  const { data: session } = useSession();
  const token = session?.accessToken;

  // fetch categories
  const {
    data: CategoryDataList,
    isLoading: isLoadingCategoryList,
    error: errorCategoryList,
  } = useFetchData(fetchCategoryList, token);

  // fetch courses
  const {
    data: courses,
    isLoading: isLoadingCourses,
    error: errorCourses,
    refetch: refetchCourses,
  } = useFetchData<CourseDetails[], [string, boolean]>(
    fetchCoursesList,
    token,
    categoryId || "",
    true
  );

  // fetch instructors
  const {
    data: UserInstructors,
    isLoading: isLoadingUserInstructors,
    error: errorUserInstructors,
  } = useFetchData<UserInfo[], []>(fetchInstructorList, token);

  return (
    <Layout>
      <Header element="h1" className="opacity-90 ml-2">
        My Courses
      </Header>

      <CourseFilterSection
        courseCategoriesData={CategoryDataList}
        onEachButtonClicked={onCategoryChange}
        activeCategoryId={categoryId}
      />

      <section className="w-3/5">
        <CreateCourseFormForAdmin
          refetchCourses={refetchCourses}
          token={token}
          courseCategories={CategoryDataList}
          userInstructors={UserInstructors}
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
