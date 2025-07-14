import Button from "@/components/_commons/Button";
import Header from "@/components/_commons/Header";
import SearchInput from "@/components/_commons/SearchInput";
import { courseCategoriesData, enrolledCourseData } from "@/utils/MockData";
import EnrollmentCard from "@/components/student/my-courses/EnrollmentCard";
import Layout from "@/components/_commons/layout/Layout";
import CourseFilterSection from "@/components/_commons/CourseFilterSection";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function MyCoursesPage() {
  return (
    <Layout>
      <main className="flex flex-col gap-6.5 my-13">
        <Header element="h1" size="32px" className="opacity-90 ml-2">
          My Courses
        </Header>

        <CourseFilterSection
          courseCategoriesData={{ ...courseCategoriesData }}
          courseStatusExcluded={courseStatusExcluded}
        />

        {/* Enrollment Card List */}
        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {enrolledCourseData.map((courseData) => (
            <EnrollmentCard
              {...courseData}
              key={courseData.courseId}
              status={courseData.status.map((s) => ({
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
