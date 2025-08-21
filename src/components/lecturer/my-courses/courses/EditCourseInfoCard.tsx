import Header from "@/components/_commons/Header";
import UserDetail from "@/components/_commons/UserDetail";

interface CourseInfoCardProps {
  instructorName: string;
  instructorTitle: string;
  instructorAvatarSrc?: string;
  courseDescription: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

export default function EditCourseInfoCard({
  instructorName,
  instructorTitle,
  instructorAvatarSrc,
  courseDescription,
  startDate,
  endDate,
}: CourseInfoCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-white py-6 px-7 rounded-lg max-w-sm border border-slate-300">
      {/* Lecturer */}
      <div>
        <Header element="h3" size="14" className="mb-2">
          Lecturer
        </Header>
        <UserDetail
          username={instructorName}
          userTitle={instructorTitle}
          userAvatarSrc={instructorAvatarSrc}
        />
      </div>

      {/* Course Description */}
      <div>
        <Header element="h3" size="14" className="my-1">
          Course Description
        </Header>
        <p className="text-slate-700 leading-relaxed">
          {courseDescription || "No description available."}
        </p>
      </div>

      {/* Course Details */}
      <div>
        <Header element="h3" size="14" className="my-1">
          Course Details
        </Header>
        <div className="text-slate-700 text-sm">
          <p className="mb-0.5">
            Start date: {startDate ? new Date(startDate).toDateString() : "Anytime"}
          </p>
          <p>End date: {endDate ? new Date(endDate).toDateString() : "Anytime"}</p>
        </div>
      </div>
    </div>
  );
}
