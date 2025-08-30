"use client";

import Button from "@/components/_commons/Button";
import { SearchBy } from "@/types/course-interface";
import { ArrowUpDown, Search, SearchIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

interface SearchInputProps {
  onSearchSubmit: (searchQuery: string, searchBy: SearchBy) => void;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  type,
  name,
  className,
  placeholder,
  onSearchSubmit,
}: SearchInputProps) {
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.TITLE);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearchDropdown = () => {
    setIsSearchDropdownOpen(!isSearchDropdownOpen);
  };

  const handleSearchOptionSelect = (option: SearchBy) => {
    setSearchBy(option);
    setIsSearchDropdownOpen(false);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit(searchQuery, searchBy);
  };

  const searchPlaceholder =
    searchBy === SearchBy.TITLE
      ? "Course"
      : searchBy === SearchBy.INSTRUCTOR_NAME
      ? "Instructor"
      : "Student";

  return (
    <form onSubmit={handleFormSubmit} className={`flex w-full gap-2 ${className}`}>
      {/* Search input field */}
      <div className="flex items-center gap-2 bg-slate-100 border border-slate-300 rounded-md py-1 pr-1 pl-4 w-full">
        <Search className="text-gray-400 min-w-4"/>
        <input
          type="text"
          name="search"
          placeholder={`Search by ${searchPlaceholder} Name...`}
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="w-full bg-transparent focus:outline-none placeholder:text-gray-400"
        />

        {/* Search dropdown button */}
        <div className="relative">
          <Button
            onClick={toggleSearchDropdown}
            isFilled={true}
            className="text-slate-500 border border-slate-300"
            fontWeight="font-medium"
          >
            Search by {searchPlaceholder}
          </Button>
          {isSearchDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-300 rounded-md z-10">
              <button
                onClick={() => handleSearchOptionSelect(SearchBy.TITLE)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Course Name
              </button>
              <button
                onClick={() => handleSearchOptionSelect(SearchBy.INSTRUCTOR_NAME)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Instructor Name
              </button>
              <button
                onClick={() => handleSearchOptionSelect(SearchBy.STUDENT_NAME)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Student Name
              </button>
            </div>
          )}
        </div>

        {/* Search submit button */}
        <Button
          type="submit"
          isFilled={true}
          padding="small"
          fontWeight="font-normal"
          className="bg-blue-600 text-white rounded-sm"
        >
          <span className="flex items-center gap-1">
            <SearchIcon className="inline" size={16} />
            Search
          </span>
        </Button>
      </div>
    </form>
  );
}
