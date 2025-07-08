import Button from "@/components/_commons/Button";
import Header from "@/components/_commons/Header";
import SearchInput from "@/components/_commons/SearchInput";
import { courseCategoriesData, enrollmentData } from "@/utils/MockData";
import HorizontalCourseCard from "@/components/student/my-courses/HorizontalCourseCard";
import Layout from "@/components/_commons/layout/Layout";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function MyCoursesPage() {
  return (
    <Layout>
      <main className="flex flex-col gap-8 my-13">
        <Header size="32px">My Courses</Header>

        {/* Search */}
        <section className="flex justify-between gap-4">
          <SearchInput type="text" name="search" placeholder="Search for..." className="w-full" />
          <Button iconLink="/filter.svg" isDisabled={true}>
            Add Filter
          </Button>
          <Button iconLink="/arrows-sort.svg">Sort By</Button>
        </section>

        {/* Categories */}
        {/* TODO: overflow */}
        {/* TODO: change card based on categories  */}
        <section className="flex flex-wrap items-center gap-2">
          {courseCategoriesData.courseStatuses.map((status) => {
            if (courseStatusExcluded.includes(status.name)) return;
            return (
              <Button
                key={status.id}
                isRound={true}
                bgColorClass="bg-[#EBEEF1]"
                borderColorClass="border-gray-200"
                fontWeight="font-medium"
                className="text-gray-500 px-7"
              >
                {status.name}
              </Button>
            );
          })}
          <div className="w-[2px] h-8 bg-gray-200 mx-3"></div>
          {courseCategoriesData.categories.map((category) => (
            <Button
              key={category.id}
              isRound={true}
              bgColorClass="bg-[#EBEEF1]"
              borderColorClass="border-gray-200"
              fontWeight="font-medium"
              className="text-gray-500 px-7"
            >
              {category.name}
            </Button>
          ))}
        </section>

        {/* Course Card List */}
        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {enrollmentData.map((course) => (
            <HorizontalCourseCard
              {...course}
              key={course.enrollmentId}
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
