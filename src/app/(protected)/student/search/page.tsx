import Button from "@/components/_commons/Button";
import Header from "@/components/_commons/Header";
import Navbar from "@/components/_commons/navbar/Navbar";
import SearchInput from "@/components/_commons/SearchInput";
import BasicCourseCard from "@/components/student/search/BasicCourseCard";
import { courseCategoriesData, courseData } from "@/utils/MockData";

export default function searchPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-8 my-13">
        <Header size="32px">Discover Courses</Header>

        {/* Search */}
        <section className="flex justify-between gap-4">
          <SearchInput
            type="text"
            name="search"
            placeholder="Search for..."
            className="w-full"
          />
          <Button iconLink="/filter.svg" isDisabled={true}>
            Add Filter
          </Button>
          <Button iconLink="/arrows-sort.svg">Sort By</Button>
        </section>

        {/* Categories */}
        {/* TODO: overflow */}
        <section className="flex flex-wrap items-center gap-2">
          {courseCategoriesData.courseStatuses.map((status) => (
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
          ))}
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

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courseData.map((course) => (
            <BasicCourseCard
              key={course.id}
              courseId={course.id}
              imageSrc={course.imageSrc}
              imageAlt={course.imageAlt}
              status={course.status.map((s) => ({
                label: s.label,
                dotColorClass: "bg-gray-300",
              }))}
              title={course.title}
              categories={course.categories}
              lecturer={{
                name: course.lecturer.name,
                title: course.lecturer.title,
                avatarSrc: course.lecturer.avatarSrc,
              }}
            />
          ))}
        </section>
      </main>
    </>
  );
}
