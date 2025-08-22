"use client";

import Header from "@/components/_commons/Header";
import Label from "@/components/_commons/Label";
import ProgressBar from "@/components/_commons/ProgressDisplay";
import UserDetail from "@/components/_commons/UserDetail";
import { CourseDetails } from "@/types/course-interface";
import { Enrollment } from "@/types/enrollment-interface";
import { SessionItf, UserRole } from "@/types/jwtPayload";
import { transformDate } from "@/utils/transform-date";
import { Session } from "inspector/promises";
import Link from "next/link";

export default function InstructorCourseCard({
  id,
  title,
  imageSrc,
  imageAlt,
  description,
  startDate,
  endDate,
  isMemberOnly,
  isLocked,
  instructorId,
  allowedPrograms,
  allowedBatchYears,
  instructor,
  categories,
  sections,
  session,
}: CourseDetails & { session: SessionItf | null}) {
  const firstSection = sections?.[0];
  const firstModule = firstSection?.modules[0];
  const firstModuleId = firstModule?.id || "module-not-found";

  const userRole = session?.user.role;
  const redirectLink =
    userRole === UserRole.INSTRUCTOR
      ? `/instructor/my-courses/${id}/${firstModuleId}`
      : `/admin/courses/${id}/${firstModuleId}`;

  return (
    <section className="flex flex-col sm:flex-row w-full bg-white border border-slate-300 rounded-md p-3">
      {/* Course Image Section */}
      <Link href={redirectLink} className="relative sm:w-3/7">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt || ""}
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
      <div className="flex flex-col gap-3 sm:w-3/7 m-4 my-2">
        <Link href={redirectLink}>
          <Header element="h2" size="18" className="text-slate-900 leading-tight">
            {title}
          </Header>
        </Link>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Label key={index}>{category.category.name}</Label>
          ))}
        </div>

        {/* Due Date */}
        <p className="text-sm text-slate-600">
          <span className="font-medium">Due date:</span>{" "}
          {endDate ? transformDate(endDate) : "Anytime"}
        </p>
      </div>

      {/* Lecturer Info */}
      {/* <div className="w-fit ml-auto mt-3">
        <p className="text-sm font-medium text-slate-600 mb-1">Lecturer</p>
        <UserDetail
          username={instructorFullName}
          userTitle={instructor.userTitle}
          // userAvatarSrc={instructorUser.avatarSrc}
        />
      </div> */}
    </section>
  );
}
