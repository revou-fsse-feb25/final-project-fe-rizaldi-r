"use client";

import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import ProgressBar from "@/components/_commons/ProgressDisplay";
import UserDetail from "@/components/_commons/UserDetail";
import { Enrollment } from "@/types/enrollment-interface";
import Link from "next/link";

export default function EnrollmentCard({
  id,
  studentId,
  courseId,
  status,
  instructor,
  moduleProgress,
  course,
}: Enrollment) {
  const instructorUser = instructor.user;
  const instructorFullName = `${instructorUser.firstName} ${instructorUser.lastName}`;

  const firstSection = course?.sections?.[0];
  const firstModule = firstSection?.modules[0];
  const firstModuleId = firstModule?.id || "module-not-found";

  return (
    <section className="flex flex-col sm:flex-row w-full bg-white border border-slate-300 rounded-md p-3">
      {/* Course Image Section */}
      <Link href={`/student/my-courses/${courseId}/${firstModuleId}`} className="relative sm:w-3/7">
        {course.imageSrc ? (
          <img
            src={course.imageSrc}
            alt={course.imageAlt || ""}
            className="h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/200x150/E0E0E0/FFFFFF?text=Image+Error";
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
        {/* Status Tag */}
        {/* <div className="absolute bottom-3 left-3">
          {status.map((s, index) => (
            <Label key={index} dotColorClass={s.dotColorClass}>
              {s.label}
            </Label>
          ))}
        </div> */}
      </Link>

      {/* Course Details Section */}
      <div className="flex flex-col gap-3 sm:w-3/7 mx-2 sm:m-4 my-2">
        <Link href={`/student/my-courses/${courseId}/${firstModuleId}`}>
          <Header element="h2" size="18" className="text-slate-900 leading-tight">
            {course.title}
          </Header>
        </Link>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {course.categories.map((category, index) => (
            <Label key={index}>{category.category.name}</Label>
          ))}
        </div>

        {/* Due Date */}
        <p className="text-sm text-slate-600">
          {/* <span className="font-medium">Due date:</span> {course.endDate} */}
        </p>

        {/* Progress Bar */}
        <ProgressBar
          progressPercentage={moduleProgress.progressPercentage || 0}
          moduleCompleted={moduleProgress.moduleCompleted || 0}
          moduleTotal={moduleProgress.moduleTotal || 0}
          moduleLabel="module completed"
        />
      </div>

      {/* Lecturer Info */}
      <div className="w-fit sm:ml-auto mt-3 mx-2">
        <p className="text-sm font-medium text-slate-600 mb-1">Lecturer</p>
        <UserDetail
          username={instructorFullName}
          userTitle={instructor.userTitle}
          // userAvatarSrc={instructorUser.avatarSrc}
        />
      </div>
    </section>
  );
}
