import Button from "./Button";
import SearchInput from "./SearchInput";

interface CategoryItem {
  id: string;
  name: string;
}

interface CourseCategoriesData {
  statuses: CategoryItem[];
  categories: CategoryItem[];
}

interface CourseFilterSectionProps {
  courseCategoriesData: CourseCategoriesData;
  courseStatusExcluded?: string[];
}

export default function CourseFilterSection({
  courseCategoriesData,
  courseStatusExcluded = [],
}: CourseFilterSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      {/* Search Section */}
      <section className="flex justify-between items-center">
        <SearchInput type="text" name="search" placeholder="Search for..." className="w-full" />
        <div className="flex items-center gap-8 px-8">
          <Button iconLink="/filter.svg" isDisabled={true} padding="medium">
            Add Filter
          </Button>
          {/* <div className="w-[2px] h-6 bg-gray-200 mx-2"></div> */}
          <Button iconLink="/arrows-sort.svg" padding="medium">
            Sort By
          </Button>
        </div>
      </section>

      {/* Categories Button Section*/}
      {/* TODO: overflow */}
      {/* TODO: change card based on categories  */}
      <section className="flex flex-wrap items-center gap-2 mb-3">
        {/* All Categories */}
        <Button
          isRound={true}
          borderColorClass="border-gray-200"
          fontWeight="font-medium"
          className="text-gray-600 px-6 bg-[#EBEEF1]"
        >
          All
        </Button>

        {/* Categories */}
        {courseCategoriesData.statuses.map((status) => {
          if (courseStatusExcluded.includes(status.name)) return;
          return (
            <Button
              key={status.id}
              isRound={true}
              borderColorClass="border-gray-200"
              fontWeight="font-medium"
              className="text-gray-600 px-6 bg-[#EBEEF1]"
            >
              {status.name}
            </Button>
          );
        })}
        <div className="w-[2px] h-6 bg-gray-200 mx-2"></div>
        {courseCategoriesData.categories.map((category) => (
          <Button
            key={category.id}
            isRound={true}
            borderColorClass="border-gray-200"
            fontWeight="font-medium"
            className="text-gray-600 px-6 bg-[#EBEEF1]"
          >
            {category.name}
          </Button>
        ))}

        {/* Others */}
        <Button
          isRound={true}
          borderColorClass="border-gray-200"
          fontWeight="font-medium"
          className="text-gray-600 px-6 bg-[#EBEEF1]"
        >
          ...
        </Button>
      </section>
    </section>
  );
}
