"use client";

import { useSession } from "next-auth/react";
import NavbarTabButton from "./NavbarTabButton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserRole } from "@/types/jwtPayload";

enum TabNames {
  MY_COURSES,
  SEARCH,
  ASSIGNMENTS,
  PERFORMANCE,
  STUDENT_PERFORMANCE,
}

interface TabConfig {
  id: TabNames;
  label: string;
  href: string;
  iconLink: string;
}

// Array containing the configuration for all tabs
const tabsStudent: TabConfig[] = [
  {
    id: TabNames.SEARCH,
    label: "Search",
    href: "/student/search",
    iconLink: "/search.svg",
  },
  {
    id: TabNames.MY_COURSES,
    label: "My Courses",
    href: "/student/my-courses",
    iconLink: "/folder-open.svg",
  },
  // {
  //   id: TabNames.ASSIGNMENTS,
  //   label: "Assignments",
  //   href: "/student/assignments",
  //   iconLink: "/book.svg",
  // },
  {
    id: TabNames.PERFORMANCE,
    label: "Performance",
    href: "/student/performance",
    iconLink: "/speedometer.svg",
  },
];

const tabsLecturer: TabConfig[] = [
  {
    id: TabNames.SEARCH,
    label: "Search",
    href: "/lecturer/search",
    iconLink: "/search.svg",
  },
  {
    id: TabNames.MY_COURSES,
    label: "My Courses",
    href: "/lecturer/my-courses",
    iconLink: "/folder-open.svg",
  },
  {
    id: TabNames.STUDENT_PERFORMANCE,
    label: "Students Performance",
    href: "/lecturer/student-performance",
    iconLink: "/speedometer.svg",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const { data: session } = useSession();
  const tabs = [...tabsStudent, ...tabsLecturer];

  // determine the active tab based on the current pathname
  const getActiveTabFromPath = (path: string): TabNames => {
    for (const tab of tabs) {
      // handling for the root path
      if (tab.href === "/" && path === "/") {
        return tab.id;
      } else if (tab.href !== "/" && path.includes(tab.href)) {
        return tab.id;
      }
    }
    // default tab
    return TabNames.MY_COURSES;
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath(pathname));

  useEffect(() => {
    setActiveTab(getActiveTabFromPath(pathname));
  }, [pathname]);

  return (
    <>
      <nav className="w-full flex justify-between items-center h-15">
        {/* Logo */}
        <h1 className="font-bold text-2xl text-slate-500">Campjam</h1>

        {/* Tab Buttons */}
        <div className="flex items-center gap-10 text-sm font-medium h-full">
          {session?.user.role === UserRole.ADMIN ? (
            tabsLecturer.map((tab) => (
              <NavbarTabButton
                key={tab.id}
                iconLink={tab.iconLink}
                href={tab.href}
                isActive={activeTab === tab.id}
              >
                {tab.label}
              </NavbarTabButton>
            ))
          ) : (
            <></>
          )}

          {session?.user.role === UserRole.CUSTOMER ? (
            tabsStudent.map((tab) => (
              <NavbarTabButton
                key={tab.id}
                iconLink={tab.iconLink}
                href={tab.href}
                isActive={activeTab === tab.id}
              >
                {tab.label}
              </NavbarTabButton>
            ))
          ) : (
            <></>
          )}
        </div>

        {/* Profile */}
        <div className="flex gap-4">
          <img src="/user-thumb.png" alt="User icon" width={48} />
          <img src="/bell.svg" alt="Notification icon" />
        </div>
      </nav>
      <div className="h-[1px] bg-(image:--gradient-border)"></div>
    </>
  );
}
