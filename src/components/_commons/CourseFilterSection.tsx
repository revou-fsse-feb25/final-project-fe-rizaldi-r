import { ArrowDownNarrowWide } from "lucide-react";
import Button from "./Button";
import SearchInput from "./SearchInput";
import { useState } from "react";
import { SearchBy, SearchData, SortBy, SortOption, SortOrder } from "@/types/course-interface";

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
  activeCategoryId: string | null;
  onEachButtonClicked: (newCategoryId: string | null) => void;
  onEachSortButtonClicked: (newSortOption: SortOption | null) => void;
  onSearchFieldSubmitted: (newSortOption: SearchData | null) => void;
}

export default function CourseFilterSection({
  courseCategoriesData,
  courseStatusExcluded = [],
  onEachButtonClicked,
  onEachSortButtonClicked,
  onSearchFieldSubmitted,
  activeCategoryId,
}: CourseFilterSectionProps) {
  // Manage the sort by dropdown
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };
  const handleSortSelection = (sortBy: SortBy, sortOrder: SortOrder) => {
    onEachSortButtonClicked({ sortBy, sortOrder });
    setIsSortDropdownOpen(false);
  };

  // Handle search submission from the SearchInput component
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.TITLE);
  const handleSearchSubmit = (newQuery: string, newSearchBy: SearchBy) => {
    setSearchQuery(newQuery);
    setSearchBy(newSearchBy);
    onSearchFieldSubmitted({ searchQuery: newQuery, searchBy: newSearchBy });
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Search Section */}
      <section className="flex flex-wrap sm:flex-nowrap gap-4 justify-between items-center">
        <SearchInput
          type="text"
          name="search"
          className="w-full"
          onSearchSubmit={handleSearchSubmit}
        />
        <div className="flex items-center gap-4">
          {/* <Button
            // iconLink="/filter.svg"
            isDisabled={true}
            padding="medium"
            isFilled={true}
            className="bg-slate-200"
          >
            Add Filter
          </Button> */}
          <div className="relative">
            <Button
              onClick={toggleSortDropdown}
              padding="medium"
              isFilled={true}
              className="bg-slate-100 text-slate-500"
            >
              <ArrowDownNarrowWide size={18} className="inline mr-2" />
              Sort By
            </Button>
            {isSortDropdownOpen && (
              <div className="absolute top-10 right-0 mt-2 w-48 bg-white border border-slate-300 rounded-md z-10">
                <button
                  onClick={() => handleSortSelection(SortBy.CREATED_AT, SortOrder.DESC)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Most Recent
                </button>
                <button
                  onClick={() => handleSortSelection(SortBy.CREATED_AT, SortOrder.ASC)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Oldest
                </button>
                <button
                  onClick={() => handleSortSelection(SortBy.TITLE, SortOrder.ASC)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Alphabetical
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Button Section*/}
      {/* TODO: overflow */}
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
