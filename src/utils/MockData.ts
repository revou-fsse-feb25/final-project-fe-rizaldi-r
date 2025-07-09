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
    id: "course-1", //course Id
    imageSrc: "https://placehold.co/400x200/E0E0E0/FFFFFF?text=Intro+to+NextJS",
    imageAlt: "Intro to NextJS Course",
    status: [{ label: "Required" }, { label: "Enrolled" }],
    title: "Intro to NextJS",
    categories: ["Frontend", "Javascript"],
    endDate: "Anytime",
    // lecturer_id
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
    endDate: "Anytime",
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
    endDate: "Anytime",
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
    endDate: "July 15, 2025",
    lecturer: {
      name: "Alice Johnson",
      title: "Backend Developer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=AJ",
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
export const enrollmentData = [
  {
    id: "nextjs-intro-101", // enrollment ID
    // courseId: "course-1", // needs course id in db
    imageSrc: "https://placehold.co/200x150/E0E0E0/FFFFFF?text=Course+Image",
    imageAlt: "Intro to NextJS Course",
    status: [{ label: "Required"}],
    title: "Intro to NextJS",
    categories: ["Frontend", "Javascript"],
    dueDate: "Anytime",
    lecturer: {
      name: "Jane Doe",
      title: "Frontend Developer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JD",
    },
    // studentId: "student-1", // needs student id in db

    // added fields
    progressPercentage: 30,
    modulesCompleted: 5,
    totalModules: 12,
  },
  {
    id: "backend-api-201",
    imageSrc: "https://placehold.co/200x150/D1D5DB/FFFFFF?text=Backend+API",
    imageAlt: "Backend API Development",
    status: [{ label: "Enrolled" }],
    title: "Backend API Development with Node.js",
    categories: ["Backend", "Node.js", "Express"],
    dueDate: "August 30, 2025",
    lecturer: {
      name: "John Smith",
      title: "Lead Backend Dev",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JS",
    },
    // added fields
    progressPercentage: 75,
    modulesCompleted: 9,
    totalModules: 12,
  },
];
