"use client";

import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  status: {
    label: string; // e.g., "Required", "Enrolled"
    dotColorClass: string; //dot color, e.g., "bg-red-500", "bg-green-500"
  }[];
  title: string;
  categories: string[];
  lecturer: {
    name: string;
    title: string;
    avatarSrc?: string;
  };
}

export default function BasicCourseCard({
  id,
  imageSrc,
  imageAlt,
  status,
  title,
  categories,
  lecturer,
}: CourseCardProps) {
  return (
    <section className="bg-white border border-gray-300 rounded-lg overflow-hidden w-full max-w-sm mx-auto">
      {/* Course Image Section */}
      <Link
        href={`/student/my-courses/${id}`}
        className="w-full h-fit bg-gray-200 flex items-center justify-center relative"
      >
        {/* Image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-55 object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x200/E0E0E0/FFFFFF?text=Image+Error";
            e.currentTarget.alt = "Image failed to load";
          }}
        />

        {/* Status Tags */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          {status.map((s, index) => (
            <Label key={index} dotColorClass={s.dotColorClass}>
              {s.label}
            </Label>
          ))}
        </div>
      </Link>

      {/* Course Details Section */}
      <div className="flex flex-col gap-4 p-4 pt-6">
        <Link href={`/student/my-courses/${id}`}>
          <Header element="h2" size="20px">{title}</Header>
        </Link>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Label key={index}>{category}</Label>
          ))}
        </div>

        {/* Lecturer Info */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Lecturer</p>
          <div className="flex items-center space-x-3">
            {lecturer.avatarSrc ? (
              <img
                src={lecturer.avatarSrc}
                alt={`${lecturer.name}'s avatar`}
                className="w-10 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/32x32/D1D5DB/4B5563?text=U";
                  e.currentTarget.alt = "Lecturer avatar";
                }}
              />
            ) : (
              // Placeholder SVG if no image is provided
              <img src="/user-thumb.png" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">{lecturer.name}</p>
              <p className="text-xs text-gray-500">{lecturer.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
