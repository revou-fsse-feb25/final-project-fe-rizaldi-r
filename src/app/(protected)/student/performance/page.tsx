import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import ModulePerformance from "@/components/student/performance/ModulePerformance";
import { courseCategoriesData, coursePerformanceListData } from "@/utils/MockData";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function performancePage() {
  return (
    <Layout>
      <main className="flex flex-col gap-7 my-13">
        <Header element="h1" size="32px" className="opacity-90 ml-2">
          My Performance
        </Header>

        <CourseFilterSection
          courseCategoriesData={{ ...courseCategoriesData }}
          courseStatusExcluded={courseStatusExcluded}
        />

        <section>
          {coursePerformanceListData.map((studentPerformanceData, index) => (
            <ModulePerformance {...studentPerformanceData} key={index}/>
          ))}
        </section>
      </main>
    </Layout>
  );
}
