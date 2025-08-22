"use client";

import ConfirmationModal from "@/components/_commons/ConfirmationModal";
import Header from "@/components/_commons/Header";
import SmallSpinner from "@/components/_commons/icons/SmallSpinner";
import Label from "@/components/_commons/Label";
import { deleteCourse } from "@/services/api";
import { CourseCategory } from "@/types/course-interface";
import { UserRole } from "@/types/jwtPayload";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CourseHeaderProps {
  courseId: string;
  title: string;
  categories: CourseCategory[];
  endDate: Date | null;
  onBackClick?: () => void;
}

export default function EditCourseHeader({
  courseId,
  title,
  categories,
  endDate,
  onBackClick,
}: CourseHeaderProps) {
  const router = useRouter();
  const handleDefaultBackClick = () => {
    router.back();
  };

  const { data: session } = useSession();
  const token = session?.accessToken;
  const userRole = session?.user.role;

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteCourse = async () => {
    try {
      const response = await deleteCourse(token || "", courseId);
      setIsDeleting(true);
      const redirectLink =
        userRole === UserRole.INSTRUCTOR ? `/instructor/my-courses` : `/admin/courses`;
      router.push(redirectLink);
    } catch (error) {
      setIsDeleting(false);
      console.error("Failed to delete section:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="flex items-start gap-4" id="overview">
      {/* Back Button */}
      <button
        onClick={onBackClick ? onBackClick : handleDefaultBackClick}
        className="rounded-sm border-2 border-slate-300 text-slate-700 cursor-pointer hover:bg-slate-200 transition-colors duration-200 focus:outline-none focus:ring-slate-300 p-1 my-1.5"
        aria-label="Go back"
      >
        <img src="/chevron-back.svg" className="min-w-8 sm:w-fit"/>
      </button>

      <div className="flex flex-col gap-1">
        <div className="flex items-center flex-wrap gap-x-4">
          {/* Course Title */}
          <Header element="h1" size="32" className="inline">
            {title}
          </Header>

          {/* Status and Categories */}
          <span className="flex flex-wrap items-center gap-2">
            {categories?.map((category, index) => (
              <Label key={index}>{category.category.name}</Label>
            ))}
          </span>
        </div>

        {/* End Date */}
        {endDate && (
          <div className="text-sm text-slate-600">
            <span className="font-medium">End date:</span> {new Date(endDate).toDateString()}
          </div>
        )}
      </div>

      {/* delete course */}
      <div className="ml-auto">
        {isConfirmingDelete && (
          <ConfirmationModal
            message="Are you sure you want to delete this course?"
            onConfirm={handleDeleteCourse}
            onCancel={() => setIsConfirmingDelete(false)}
            isDeleting={isDeleting}
          />
        )}
        <button
          onClick={() => setIsConfirmingDelete(true)}
          className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
        >
          Delete Course
        </button>
      </div>
    </section>
  );
}
