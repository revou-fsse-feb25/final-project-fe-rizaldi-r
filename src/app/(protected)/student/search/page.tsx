import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import BasicCourseCard from "@/components/student/search/BasicCourseCard";
import { courseCategoriesData, courseData } from "@/utils/MockData";

export default function searchPage() {
  return (
    <Layout>
      <main className="flex flex-col gap-7 my-13">
        <Header element="h1" size="32px" className="opacity-90 ml-2">
          Discover Courses
        </Header>

        <CourseFilterSection
          courseCategoriesData={{ ...courseCategoriesData }}
        />

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courseData.map((course) => (
            <BasicCourseCard
              {...course}
              key={course.id}
              status={course.status.map((s) => ({
                label: s.label,
                dotColorClass: "bg-gray-300",
              }))}
            />
          ))}
        </section>
      </main>
    </Layout>
  );
}
