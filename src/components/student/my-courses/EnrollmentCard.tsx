"use client";

import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import ProgressBar from "@/components/_commons/ProgressDisplay";
import UserDetail from "@/components/_commons/UserDetail";
import Link from "next/link";

interface HorizontalCourseCardProps {
  courseId: string;
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
  endDate: string; // e.g., "Anytime", "July 15, 2025"
  progressPercentage: number; // 0-100
  modulesCompleted: number;
  totalModules: number;
}

export default function EnrollmentCard({
  courseId,
  imageSrc,
  imageAlt,
  status,
  title,
  categories,
  endDate,
  progressPercentage,
  modulesCompleted,
  totalModules,
  lecturer,
}: HorizontalCourseCardProps) {
  return (
    <section className="flex flex-col sm:flex-row w-full bg-white border border-slate-300 rounded-md p-3">
      {/* Course Image Section */}
      <Link href={`/student/my-courses/${courseId}`} className="relative w-3/7">
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
        <Link href={`/student/my-courses/${courseId}`}>
          <Header element="h2" size="18" className="text-slate-900 leading-tight">
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
        <p className="text-sm text-slate-600">
          <span className="font-medium">Due date:</span> {endDate}
        </p>

        {/* Progress Bar */}
        <ProgressBar
          progressPercentage={progressPercentage}
          countCompleted={modulesCompleted}
          countTotal={totalModules}
          countLabel="module completed"
        />
      </div>

      {/* Lecturer Info */}
      <div className="w-fit ml-auto mt-3">
        <p className="text-sm font-medium text-slate-600 mb-1">Lecturer</p>
        <UserDetail
          username={lecturer.name}
          userTitle={lecturer.title}
          userAvatarSrc={lecturer.avatarSrc}
        />
      </div>
    </section>
  );
}
