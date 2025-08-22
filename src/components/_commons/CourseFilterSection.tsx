import { ArrowDownNarrowWide, ArrowUpDown } from "lucide-react";
import Button from "./Button";
import SearchInput from "./SearchInput";

// interface CategoryItem {
//   id: string;
//   name: string;
// }

// interface CourseCategoriesData {
//   statuses: CategoryItem[];
//   categories: CategoryItem[];
// }

interface Category {
  id: string;
  name: string;
  programs: string[];
  createdAt: string;
  updatedAt: string;
}

interface CourseFilterSectionProps {
  courseCategoriesData: Category[];
  courseStatusExcluded?: string[];
  onEachButtonClicked: (newCategoryId: string | null) => void;
  activeCategoryId: string | null;
}

export default function CourseFilterSection({
  courseCategoriesData,
  courseStatusExcluded = [],
  onEachButtonClicked,
  activeCategoryId,
}: CourseFilterSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      {/* Search Section */}
      <section className="flex flex-wrap sm:flex-nowrap gap-4 justify-between items-center">
        <SearchInput type="text" name="search" placeholder="Search for..." className="w-full" />
        <div className="flex items-center gap-4 sm:px-4">
          <Button
            // iconLink="/filter.svg"
            isDisabled={true}
            padding="medium"
            isFilled={true}
            className="bg-slate-200"
          >
            Add Filter
          </Button>
          <Button
            // iconLink="/arrows-sort.svg"
            padding="medium"
            isFilled={true}
            className="bg-slate-100 text-slate-500"
          >
            <ArrowDownNarrowWide size={18} className="inline mr-2" />
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
          roundSize="full"
          fontWeight="font-medium"
          onClick={() => onEachButtonClicked(null)}
          className={`px-6 border-1 ${
            activeCategoryId === null
              ? "bg-blue-100 text-blue-600 border-blue-400"
              : "text-slate-600 bg-[#EBEEF1] border-slate-200"
          }`}
        >
          All
        </Button>

        {/* Categories */}
        {/* {courseCategoriesData.statuses.map((status) => {
          if (courseStatusExcluded.includes(status.name)) return;
          return (
            <Button
              key={status.id}
              roundSize = "full"
              borderColorClass="border-slate-200"
              fontWeight="font-medium"
              className="text-slate-600 px-6 bg-[#EBEEF1]"
            >
              {status.name}
            </Button>
          );
        })} */}
        <div className="w-[2px] h-6 bg-slate-200 mx-2"></div>
        {courseCategoriesData?.map((category) => (
          <Button
            key={category.id}
            onClick={() => onEachButtonClicked(category.id)}
            roundSize="full"
            fontWeight="font-medium"
            className={`px-6 border-1 ${
              activeCategoryId === category.id
                ? "bg-blue-100 text-blue-600 border-blue-400"
                : "text-slate-600 bg-[#EBEEF1] border-slate-200"
            }`}
          >
            {category.name}
          </Button>
        ))}

        {/* Others */}
        <Button
          roundSize="full"
          fontWeight="font-medium"
          className="text-slate-600 px-6 bg-[#EBEEF1]"
        >
          ...
        </Button>
      </section>
    </section>
  );
}
