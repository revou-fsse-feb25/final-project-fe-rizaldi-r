import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import CoursePerformance from "@/components/lecturer/student-performance/CoursePerformance";
import {
  courseEnrollmentDataList,
  courseCategoriesLecturerData,
  coursePerformanceDataList,
} from "@/utils/MockData";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function studentPerformancePage() {
  // TODO: find lecturer id then find all the course they teach
    // then find match student enrollment that enrolled with the sam e course
  return (
    <Layout>
      <Header element="h1" size="24" className="opacity-90 ml-2">
        Students Performance
      </Header>

      <CourseFilterSection
        courseCategoriesData={{ ...courseCategoriesLecturerData }}
        courseStatusExcluded={courseStatusExcluded}
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
