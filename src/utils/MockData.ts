export const courseCategoriesData = {
  courseStatuses: [
    { id: "enrolled", name: "Enrolled" },
    { id: "not-enrolled", name: "Not Enrolled" },
    { id: "not-started", name: "Not Started" },
  ],
  categories: [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "project-management", name: "Project Management" },
    { id: "javascript", name: "Javascript" },
    { id: "typescript", name: "Typescript" },
  ],
};

export const courseData = [
  {
    id: "course-1", //course ID
    imageSrc: "https://placehold.co/400x200/E0E0E0/FFFFFF?text=Intro+to+NextJS",
    imageAlt: "Intro to NextJS Course",
    status: [{ label: "Required" }, { label: "Enrolled" }],
    title: "Intro to NextJS",
    categories: ["Frontend", "Javascript"],
    lecturer: {
      name: "Jane Doe",
      title: "Frontend Developer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JD",
    },
  },
  {
    id: "course-2",
    imageSrc: "https://placehold.co/400x200/E0E0E0/FFFFFF?text=Advanced+NextJS",
    imageAlt: "Advanced NextJS Course",
    status: [{ label: "Required" }, { label: "Enrolled" }],
    title: "Advanced NextJS",
    categories: ["Frontend", "Javascript"],
    lecturer: {
      name: "Jane Doe",
      title: "Frontend Developer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JD",
    },
  },
  {
    id: "course-3",
    imageSrc: "https://placehold.co/400x200/F2F4F8/FFFFFF?text=React+Basics",
    imageAlt: "React Basics Course",
    status: [{ label: "Not Started" }],
    title: "React Basics",
    categories: ["Frontend", "UI/UX"],
    lecturer: {
      name: "John Smith",
      title: "Software Engineer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JS",
    },
  },
  {
    id: "course-4",
    imageSrc: "https://placehold.co/400x200/F3F4F6/FFFFFF?text=Node.js+API",
    imageAlt: "Node.js API Development Course",
    status: [{ label: "Enrolled" }],
    title: "Node.js API Development",
    categories: ["Backend", "Javascript"],
    lecturer: {
      name: "Alice Johnson",
      title: "Backend Developer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=AJ",
    },
  },
  {
    id: "course-5",
    imageSrc: "https://placehold.co/400x200/E0E0E0/FFFFFF?text=Data+Structures",
    imageAlt: "Data Structures and Algorithms",
    status: [{ label: "Required" }, { label: "Completed" }],
    title: "Data Structures & Algorithms",
    categories: ["Computer Science", "Algorithms"],
    lecturer: {
      name: "Bob Williams",
      title: "Algorithm Specialist",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=BW",
    },
  },
];

// ### Relationship Data (Junction Tables/Linking Tables):
// **5. Student Course Enrollment Data:** (links Student (from User table) and Course data)
// * **Enrollment ID (Primary Key):** Unique identifier for an enrollment.
// * **Student ID (Foreign Key):** Links to the `User` table (users with 'Student' role).
// * **Course ID (Foreign Key):** Links to the `Course` table.
// * **Enrollment Date:** Date the student enrolled in the course.
// * **Completion Status:** (e.g., 'Not Started', 'In Progress', 'Completed')
// * **Last Accessed Date:** Timestamp of the last time the student accessed the course.
export const enrollmentData = {
  id: "nextjs-intro-101", // enrollment ID
  imageSrc: "https://placehold.co/200x150/E0E0E0/FFFFFF?text=Course+Image",
  imageAlt: "Intro to NextJS Course",
  status: [{ label: "Required", dotColorClass: "bg-gray-500" }],
  title: "Intro to NextJS",
  categories: ["Frontend", "Javascript"],
  lecturer: {
    name: "Jane Doe",
    title: "Frontend Developer",
    avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JD",
  },
  // added fields
  dueDate: "Anytime",
  progressPercentage: 30,
  modulesCompleted: 5,
  totalModules: 12,
};
