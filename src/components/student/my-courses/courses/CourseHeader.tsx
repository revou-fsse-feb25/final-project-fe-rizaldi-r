"use client";

import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import { useRouter } from "next/navigation";

interface CourseHeaderProps {
  title: string;
  status: {
    label: string;
    dotColorClass: string;
  }[];
  categories: string[];
  endDate: string;
  onBackClick?: () => void;
}

export default function CourseHeader({
  title,
  status,
  categories,
  endDate,
  onBackClick,
}: CourseHeaderProps) {
  const router = useRouter();

  const handleDefaultBackClick = () => {
    router.back();
  };

  return (
    <section className="flex items-start gap-4">
      {/* Back Button */}
      <button
        onClick={onBackClick ? onBackClick : handleDefaultBackClick}
        className="rounded-sm border-2 border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-gray-300 p-1 my-1.5"
        aria-label="Go back"
      >
        <img src="/chevron-back.svg" />
      </button>

      <div className="flex flex-col gap-1">
        <div className="flex items-center flex-wrap gap-x-4">
          {/* Course Title */}
          <Header element="h1" size="32px" className="inline">{title}</Header>

          {/* Status and Categories */}
          <span className="flex flex-wrap items-center gap-2">
            {status.map((s, index) => (
              <Label key={index} dotColorClass={s.dotColorClass}>
                {s.label}
              </Label>
            ))}
            {categories?.map((category, index) => (
              <Label key={index}>{category}</Label>
            ))}
          </span>
        </div>

        {/* End Date */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">End date:</span> {endDate}
        </div>
      </div>
    </section>
  );
}
