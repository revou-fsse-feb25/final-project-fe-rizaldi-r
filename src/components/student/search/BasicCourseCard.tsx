"use client";

import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import { CourseDetails } from "@/types/course-interface";
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
  title,
  imageSrc,
  imageAlt,
  description,
  instructorId,
  allowedPrograms,
  allowedBatchYears,
  isMemberOnly,
  isLocked,
  sections,
  instructor,
  categories,
}: CourseDetails) {
  const instructorUser = instructor.user;
  const instructorFullName = `${instructorUser.firstName} ${instructorUser.lastName}`;

  const firstSection = sections?.[0];
  const firstModule = firstSection?.modules[0];
  const firstModuleId = firstModule?.id || "module-not-found";

  return (
    <section className="bg-white border border-slate-300 rounded-lg overflow-hidden w-full max-w-sm mx-auto">
      {/* Course Image Section */}
      <Link
        href={`/student/my-courses/${id}/${firstModuleId}`}
        className="w-full h-fit bg-slate-200 flex items-center justify-center relative"
      >
        {/* Image */}
        {/* TODO: default image */}
        {imageSrc ? (
          <img
            src={imageSrc || ""}
            alt={imageAlt || ""}
            className="w-full h-38 object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/400x200/E0E0E0/FFFFFF?text=Image+Error";
              e.currentTarget.alt = "Image failed to load";
            }}
          />
        ) : (
          // Placeholder SVG if no image is provided
          <img
            src="https://placehold.co/400x200/E0E0E0/FFFFFF?text=No Image"
            className="w-full h-38 object-cover"
          />
        )}

        {/* Status Tags */}
        {/* <div className="absolute bottom-3 right-3 flex gap-2">
          {status.map((s, index) => (
            <Label key={index} dotColorClass={s.dotColorClass}>
              {s.label}
            </Label>
          ))}
        </div> */}
      </Link>

      {/* Course Details Section */}
      <div className="flex flex-col gap-4 p-4 pt-6">
        <Link href={`/student/my-courses/${id}`}>
          <Header element="h2" size="18">
            {title}
          </Header>
        </Link>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Label key={index}>{category.category.name}</Label>
          ))}
        </div>

        {/* Lecturer Info */}
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">Lecturer</p>
          <div className="flex items-center space-x-3">
            {instructorUser.avatarSrc ? (
              <img
                src={instructorUser.avatarSrc}
                alt={`${instructorUser.firstName}'s avatar`}
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
              <p className="text-sm font-medium text-slate-900">{instructorFullName}</p>
              <p className="text-xs text-slate-500">{instructor.userTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
