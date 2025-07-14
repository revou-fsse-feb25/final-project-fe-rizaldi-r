import { ItfModule, ItfProgressDashboard, ItfSection } from "@/types/types";

export const courseCategoriesData = {
  statuses: [
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
    id: "nextjs-intro-101",
    imageSrc: "https://placehold.co/200x150/E0E0E0/FFFFFF?text=Course+Image",
    imageAlt: "Intro to NextJS Course",
    title: "Intro to NextJS",
    categories: ["Frontend", "Next.js", "React"],
    startDate: "July 15, 2025",
    endDate: "Anytime",
    description:
      "This course provides a comprehensive introduction to Next.js, covering fundamental concepts, data fetching strategies like SSG and SSR, and dynamic routing.",
    lecturer: {
      name: "Jane Doe",
      title: "Frontend Developer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JD",
    },
    status: [{ label: "Required" }],
  },
  {
    id: "backend-api-201",
    imageSrc: "https://placehold.co/200x150/D1D5DB/FFFFFF?text=Backend+API",
    imageAlt: "Backend API Development",
    title: "Backend API Development with Node.js",
    categories: ["Backend", "Node.js", "Express"],
    startDate: "September 1, 2025",
    endDate: "August 30, 2025",
    description:
      "Learn to build robust and scalable RESTful APIs using Node.js and the Express framework. This course covers database integration, authentication, and deployment.",
    lecturer: {
      name: "John Smith",
      title: "Lead Backend Dev",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JS",
    },
    status: [{ label: "Enrolled" }],
  },
  {
    id: "data-science-301",
    imageSrc: "https://placehold.co/200x150/C0C0C0/FFFFFF?text=Data+Science",
    imageAlt: "Introduction to Data Science",
    title: "Introduction to Data Science with Python",
    categories: ["Data Science", "Python", "Machine Learning"],
    startDate: "October 10, 2025",
    endDate: "December 10, 2025",
    description:
      "An introductory course to the world of data science using Python. Explore data manipulation, analysis, visualization, and basic machine learning concepts.",
    lecturer: {
      name: "Alice Wonderland",
      title: "Data Scientist",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=AW",
    },
    status: [],
  },
  {
    id: "mobile-dev-401",
    imageSrc: "https://placehold.co/200x150/B0B0B0/FFFFFF?text=Mobile+Dev",
    imageAlt: "Mobile App Development",
    title: "Mobile App Development with React Native",
    categories: ["Mobile", "React Native", "Frontend"],
    startDate: "November 5, 2025",
    endDate: "February 5, 2026",
    description:
      "Master cross-platform mobile app development using React Native. This course covers UI components, navigation, state management, and native device features.",
    lecturer: {
      name: "Bob The Builder",
      title: "Mobile Developer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=BB",
    },
    status: [{ label: "Required" }],
  },
];

export const enrollmentData = [
  {
    id: "enroll-nextjs-intro-101", // enrollment ID
    status: [{ label: "Required" }],
    progressPercentage: 30,
    modulesCompleted: 5,
    totalModules: 12,
  },
  {
    id: "enroll-backend-api-201",
    status: [{ label: "Enrolled" }],
    progressPercentage: 75,
    modulesCompleted: 9,
    totalModules: 12,
  },
];

//  enrollment and course data
export const enrolledCourseData = [
  {
    id: "enroll-nextjs-intro-101", // enrollment ID
    courseId: "nextjs-intro-101",
    imageSrc: "https://placehold.co/200x150/E0E0E0/FFFFFF?text=Course+Image",
    imageAlt: "Intro to NextJS Course",
    title: "Intro to NextJS",
    categories: ["Frontend", "Next.js", "React"],
    startDate: "July 15, 2025",
    endDate: "Anytime",
    description:
      "This course provides a comprehensive introduction to Next.js, covering fundamental concepts, data fetching strategies like SSG and SSR, and dynamic routing.",
    lecturer: {
      name: "Jane Doe",
      title: "Frontend Developer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JD",
    },
    status: [{ label: "Required" }],
    progressPercentage: 30,
    modulesCompleted: 5,
    totalModules: 12,
  },
  {
    id: "enroll-backend-api-201",
    courseId: "backend-api-201",
    imageSrc: "https://placehold.co/200x150/D1D5DB/FFFFFF?text=Backend+API",
    imageAlt: "Backend API Development",
    title: "Backend API Development with Node.js",
    categories: ["Backend", "Node.js", "Express"],
    startDate: "September 1, 2025",
    endDate: "August 30, 2025",
    description:
      "Learn to build robust and scalable RESTful APIs using Node.js and the Express framework. This course covers database integration, authentication, and deployment.",
    lecturer: {
      name: "John Smith",
      title: "Lead Backend Dev",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JS",
    },
    status: [{ label: "Enrolled" }],
    progressPercentage: 75,
    modulesCompleted: 9,
    totalModules: 12,
  },
];

export const ModuleListData: ItfSection[] = [
  {
    id: "section-1",
    title: "1. Section",
    modules: [
      { id: "module-1-1", label: "Introduction", completed: true },
      { id: "module-1-2", label: "Basic stuff", completed: true },
      { id: "module-1-3", label: "Basic stuff 2", completed: false },
      { id: "module-1-4", label: "Basic stuff 3", completed: false },
    ],
    isExpanded: true,
  },
  {
    id: "section-2",
    title: "2. Section",
    modules: [
      { id: "module-2-1", label: "Introduction", completed: false },
      { id: "module-2-2", label: "Basic stuff", completed: false },
      { id: "module-2-3", label: "Assignment", completed: false, type: "assignment" },
      { id: "module-2-4", label: "Basic stuff 2", completed: false },
      { id: "module-2-5", label: "Basic stuff 3", completed: false },
    ],
    isExpanded: true,
  },
];

export const modulesData: ItfModule[] = [
  {
    id: "module-1-1",
    type: "Lecture", // "Lecture" or "Assignment"
    embedVideoLink: "https://www.youtube.com/embed/d2yNsZd5PMs?si=y8JU5lbEHe3-DFEp",
    title: "Introduction",
    description:
      "This module dives deep into one of Next.js's most powerful features: intelligent data fetching. You'll learn how Next.js optimizes the process of bringing data into your applications, offering various strategies to suit different needs.",
    subdescription: [
      {
        header: "Static Site Generation (SSG)",
        type: "description", // "description" or "list"
        description:
          "We'll explore Static Site Generation (SSG), understanding when and why to pre-render pages at build time for lightning-fast performance. You'll master the getStaticProps function and learn how to implement dynamic routes with getStaticPaths.",
      },
      {
        header: "Key Concepts",
        type: "list",
        description:
          "Next.js Data Fetching\nServer-Side Rendering (SSR)\nClient-Side Rendering (CSR)\nNext.js Data Fetching\nServer-Side Rendering (SSR)\nClient-Side Rendering (CSR)",
      },
    ],
    links: [
      {
        label: "Lecture slide",
        href: "https://www.google.com/?udm=14",
      },
    ],
  },
  {
    id: "module-2-3",
    type: "Assignment",
    title: "Advanced Data Fetching Patterns",
    description:
      "Building on the basics, this module explores more advanced data fetching patterns in Next.js, including incremental static regeneration (ISR) and client-side data fetching with SWR or React Query. You'll learn to choose the right strategy for complex application requirements.",
    subdescription: [
      {
        header: "Incremental Static Regeneration (ISR)",
        type: "description",
        description:
          "Discover how ISR allows you to update static content without rebuilding your entire site, providing a balance between static performance and dynamic content. We'll cover the `revalidate` option in `getStaticProps`.",
      },
      {
        header: "Client-Side Data Fetching",
        type: "list",
        description: "SWR\nReact Query\nData Revalidation\nError Handling\nLoading States",
      },
    ],
    links: [
      {
        label: "Assignment Details",
        href: "https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating",
      },
      {
        label: "SWR Documentation",
        href: "https://swr.vercel.app/",
      },
    ],
    submissionData: {
      submissionTitle: "Code Submission",
      submissions: [
        {
          label: "Type your explaination for the solution here",
          isTextfield: true,
        },
        {
          label: "Submit your repository link here",
          isTextfield: false,
        },
      ],
    },
  },
];

export const studentPerformanceListData: ItfProgressDashboard[] = [
  {
    enrollmentId: "enroll-nextjs-intro-101",
    courseTitle: "Intro to NextJS",
    tags: ["Frontend", "Next.js", "React"],
    dueDate: "November 15, 2025",
    moduleProgressDataList: [
      {
        progressLabel: "Overall Progress",
        progressPercentage: 75,
        countLabel: "module completed",
        countCompleted: 9,
        countTotal: 12,
      },
      {
        progressLabel: "Lecture Completed",
        progressPercentage: 80,
        countLabel: "lecture completed",
        countCompleted: 16,
        countTotal: 20,
      },
      {
        progressLabel: "Assignment Completed",
        progressPercentage: 70,
        countLabel: "assignment completed",
        countCompleted: 7,
        countTotal: 10,
      },
    ],
    assignmentOverallScoresData: {
      progressLabel: "Overall Scores",
      progressPercentage: 85,
      countLabel: "scores achieved",
      countCompleted: 170,
      countTotal: 200,
    },
    assignmentScoreDataList: [
      {
        assignmentTitle: "Assignment 1: Create Something",
        scorePercentage: 70,
        scoreAchieved: 70,
        scoreTotal: 100,
        feedback:
          "This module dives deep into one of Next.js's most powerful features: intelligent data fetching. You'll learn how Next.js optimizes the process of bringing data into your applications, offering various strategies to suit different needs.",
      },
      {
        assignmentTitle: "Assignment 1: Create Something",
        scorePercentage: 70,
        scoreAchieved: 70,
        scoreTotal: 100,
        feedback:
          "This module dives deep into one of Next.js's most powerful features: intelligent data fetching. You'll learn how Next.js optimizes the process of bringing data into your applications, offering various strategies to suit different needs.",
      },
    ],
    lecturerData: {
      userName: "Jane Doe",
      userTitle: "Frontend Developer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JD",
    },
  },
   {
    enrollmentId: "enroll-nextjs-intro-101",
    courseTitle: "Intro to NextJS",
    tags: ["Frontend", "Next.js", "React"],
    dueDate: "November 15, 2025",
    moduleProgressDataList: [
      {
        progressLabel: "Overall Progress",
        progressPercentage: 75,
        countLabel: "module completed",
        countCompleted: 9,
        countTotal: 12,
      },
      {
        progressLabel: "Lecture Completed",
        progressPercentage: 80,
        countLabel: "lecture completed",
        countCompleted: 16,
        countTotal: 20,
      },
      {
        progressLabel: "Assignment Completed",
        progressPercentage: 70,
        countLabel: "assignment completed",
        countCompleted: 7,
        countTotal: 10,
      },
    ],
    assignmentOverallScoresData: {
      progressLabel: "Overall Scores",
      progressPercentage: 85,
      countLabel: "scores achieved",
      countCompleted: 170,
      countTotal: 200,
    },
    assignmentScoreDataList: [
      {
        assignmentTitle: "Assignment 1: Create Something",
        scorePercentage: 70,
        scoreAchieved: 70,
        scoreTotal: 100,
        feedback:
          "This module dives deep into one of Next.js's most powerful features: intelligent data fetching. You'll learn how Next.js optimizes the process of bringing data into your applications, offering various strategies to suit different needs.",
      },
      {
        assignmentTitle: "Assignment 1: Create Something",
        scorePercentage: 70,
        scoreAchieved: 70,
        scoreTotal: 100,
        feedback:
          "This module dives deep into one of Next.js's most powerful features: intelligent data fetching. You'll learn how Next.js optimizes the process of bringing data into your applications, offering various strategies to suit different needs.",
      },
    ],
    lecturerData: {
      userName: "Jane Doe",
      userTitle: "Frontend Developer",
      avatarSrc: "https://placehold.co/32x32/F2F4F8/C1C7CD?text=JD",
    },
  },
];
