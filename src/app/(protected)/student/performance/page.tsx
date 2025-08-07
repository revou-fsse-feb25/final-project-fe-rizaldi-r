import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import StudentCoursePerformance from "@/components/student/performance/StudentCoursePerformance";
import { courseCategoriesData, enrollmentDataList } from "@/utils/MockData";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function performancePage() {
  return (
    <Layout>
      <Header element="h1" size="24" className="opacity-90 ml-2">
        My Performance
      </Header>

      <CourseFilterSection
        courseCategoriesData={{ ...courseCategoriesData }}
        courseStatusExcluded={courseStatusExcluded}
      />

      <section>
        {enrollmentDataList.map((studentPerformanceData, index) => (
          <StudentCoursePerformance {...studentPerformanceData} key={index} />
        ))}
      </section>
    </Layout>
  );
}
