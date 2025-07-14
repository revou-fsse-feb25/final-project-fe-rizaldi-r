import Header from "@/components/_commons/Header";
import UserDetail from "@/components/_commons/UserDetail";

interface CourseInfoCardProps {
  lecturerName: string;
  lecturerTitle: string;
  lecturerAvatarSrc?: string;
  courseDescription: string;
  startDate: string;
  endDate: string;
}

export default function CourseInfoCard({
  lecturerName,
  lecturerTitle,
  lecturerAvatarSrc,
  courseDescription,
  startDate,
  endDate,
}: CourseInfoCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-white py-6 px-7 rounded-lg max-w-sm border border-gray-300">
      {/* Lecturer */}
      <div>
        <Header element="h3" size="14px" className="mb-2">
          Lecturer
        </Header>
        <UserDetail
          userName={lecturerName}
          userTitle={lecturerTitle}
          userAvatarSrc={lecturerAvatarSrc}
        />
      </div>

      {/* Course Description */}
      <div>
        <Header element="h3" size="14px" className="my-1">
          Course Description
        </Header>
        <p className="text-gray-700 leading-relaxed">{courseDescription}</p>
      </div>

      {/* Course Details */}
      <div>
        <Header element="h3" size="14px" className="my-1">
          Course Details
        </Header>
        <div className="text-gray-700 text-sm">
          <p className="mb-0.5">Start date: {startDate}</p>
          <p>End date: {endDate}</p>
        </div>
      </div>
    </div>
  );
}
