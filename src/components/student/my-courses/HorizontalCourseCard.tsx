"use client";

import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import Link from "next/link";

interface HorizontalCourseCardProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  status: {
    label: string;
    dotColorClass: string;
  }[];
  title: string;
  categories: string[];
  lecturer: {
    name: string;
    title: string;
    avatarSrc?: string;
  };
  dueDate: string; // e.g., "Anytime", "July 15, 2025"
  progressPercentage: number; // 0-100
  modulesCompleted: number;
  totalModules: number;
}

export default function HorizontalCourseCard({
  id,
  imageSrc,
  imageAlt,
  status,
  title,
  categories,
  dueDate,
  progressPercentage,
  modulesCompleted,
  totalModules,
  lecturer,
}: HorizontalCourseCardProps) {
  return (
    <div className="flex flex-col sm:flex-row w-full bg-white border border-gray-300 rounded-md p-3">
      {/* Course Image Section */}
      <Link href={`/student/courses/${id}`} className="relative w-3/7">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/200x150/E0E0E0/FFFFFF?text=Image+Error";
            e.currentTarget.alt = "Image failed to load";
          }}
        />
        {/* Status Tag */}
        <div className="absolute bottom-3 left-3">
          {status.map((s, index) => (
            <Label key={index} dotColorClass={s.dotColorClass}>
              {s.label}
            </Label>
          ))}
        </div>
      </Link>

      {/* Course Details Section */}
      <div className="flex flex-col gap-3 w-3/7 m-4 my-2">
        <Link href={`/student/course/${id}`}>
          <Header size="20px" className="text-gray-900 leading-tight">
            {title}
          </Header>
        </Link>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Label key={index}>{category}</Label>
          ))}
        </div>

        {/* Due Date */}
        <p className="text-sm text-gray-600">
          <span className="font-medium">Due date:</span> {dueDate}
        </p>

        {/* Progress Bar */}
        <div className="">
          <p className="text-sm">Progress: {progressPercentage}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 my-1.5">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {modulesCompleted}/{totalModules} module completed
          </p>
        </div>
      </div>

      {/* Lecturer Info */}
      <div className="w-fit ml-auto mt-3">
        <p className="text-sm font-medium text-gray-600 mb-1">Lecturer</p>
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
  );
}
