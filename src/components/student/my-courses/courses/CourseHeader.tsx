"use client";

import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import { CourseCategory } from "@/types/course-interface";
import { useRouter } from "next/navigation";

interface CourseHeaderProps {
  title: string;
  // status?: {
  //   label: string;
  //   dotColorClass: string;
  // }[];
  categories: CourseCategory[];
  endDate: Date | null;
  onBackClick?: () => void;
}

export default function CourseHeader({
  title,
  // status,
  categories,
  endDate,
  onBackClick,
}: CourseHeaderProps) {
  const router = useRouter();

  const handleDefaultBackClick = () => {
    router.back();
  };

  return (
    <section id="overview" className="flex items-start gap-4">
      {/* Back Button */}
      <button
        onClick={onBackClick ? onBackClick : handleDefaultBackClick}
        className="rounded-sm border-2 border-slate-300 text-slate-700 cursor-pointer hover:bg-slate-200 transition-colors duration-200 focus:outline-none focus:ring-slate-300 p-1 my-1.5"
        aria-label="Go back"
      >
        <img src="/chevron-back.svg" />
      </button>

      <div className="flex flex-col gap-1">
        <div className="flex items-center flex-wrap gap-x-4">
          {/* Course Title */}
          <Header element="h1" size="32" className="inline">
            {title}
          </Header>

          {/* Status and Categories */}
          <span className="flex flex-wrap items-center gap-2">
            {/* {status.map((s, index) => (
              <Label key={index} dotColorClass={s.dotColorClass}>
                {s.label}
              </Label>
            ))} */}
            {categories?.map((category, index) => (
              <Label key={index}>{category.category.name}</Label>
            ))}
          </span>
        </div>

        {/* End Date */}
        {endDate && (
          <div className="text-sm text-slate-600">
            <span className="font-medium">End date:</span>{" "}
            {new Date(endDate).toDateString()}
          </div>
        )}
      </div>
    </section>
  );
}
