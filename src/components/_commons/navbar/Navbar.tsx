"use client";

// import Link from "next/link";
import NavbarTabButton from "./NavbarTabButton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

enum TabNames {
  MY_COURSES,
  SEARCH,
  ASSIGNMENTS,
  PERFORMANCE,
};

export default function Navbar() {
  const pathname = usePathname();
  
  // Determine the active tab based on the current pathname
  const getActiveTabFromPath = (path: string) => {
    if (path === "/" || path.includes("/my-courses")) return TabNames.MY_COURSES;
    else if (path.includes("/search")) return TabNames.SEARCH;
    else if (path.includes("/assignments")) return TabNames.ASSIGNMENTS;
    else if (path.includes("/performance")) return TabNames.PERFORMANCE;
    return TabNames.MY_COURSES;
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromPath(pathname));

  useEffect(() => {
    setActiveTab(getActiveTabFromPath(pathname));
  }, [pathname]);

  return (
    <>
      <nav className="flex justify-between items-center h-15">
        {/* Logo */}
        <h1 className="font-bold text-2xl text-gray-500">Campjam</h1>

        {/* Tab Buttons */}
        <div className="flex items-center gap-10 text-base font-medium h-full">
          <NavbarTabButton
            iconLink="/search.svg"
            href="/student/search"
            isActive={activeTab === TabNames.SEARCH}
          >
            Search
          </NavbarTabButton>
          <NavbarTabButton
            iconLink="/folder-open.svg"
            href="/"
            isActive={activeTab === TabNames.MY_COURSES}
          >
            My Courses
          </NavbarTabButton>
          <NavbarTabButton
            iconLink="/book.svg"
            href="/student/assignments"
            isActive={activeTab === TabNames.ASSIGNMENTS}
          >
            Assignments
          </NavbarTabButton>
          <NavbarTabButton
            iconLink="/speedometer.svg"
            href="/student/performance"
            isActive={activeTab === TabNames.PERFORMANCE}
          >
            Performance
          </NavbarTabButton>
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
