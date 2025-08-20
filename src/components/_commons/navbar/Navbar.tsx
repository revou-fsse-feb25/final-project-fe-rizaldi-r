"use client";

import { signOut, useSession } from "next-auth/react";
import NavbarTabButton from "./NavbarTabButton";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { UserRole } from "@/types/jwtPayload";
import Link from "next/link";

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
    href: "/instructor/search",
    iconLink: "/search.svg",
  },
  {
    id: TabNames.MY_COURSES,
    label: "My Courses",
    href: "/instructor/my-courses",
    iconLink: "/folder-open.svg",
  },
  {
    id: TabNames.STUDENT_PERFORMANCE,
    label: "Students Performance",
    href: "/instructor/student-performance",
    iconLink: "/speedometer.svg",
  },
];

export default function Navbar() {
  // State to manage the visibility of the profile dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Ref to the dropdown container to handle clicks outside
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    // Add event listener to the document body
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
          {session?.user.role === UserRole.INSTRUCTOR ? (
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

          {session?.user.role === UserRole.STUDENT ? (
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
          <img src="/bell.svg" alt="Notification icon" className="opacity-10" />
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="rounded-full border-1 border-slate-300 hover:border-blue-600 transition-colors cursor-pointer"
            >
              <img src="/user-thumb.png" alt="User icon" width={44} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 w-48 bg-white rounded-md shadow-sm py-1 z-50 ring-1 ring-slate-300 ring-opacity-5 focus:outline-none">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-slate-500 hover:bg-gray-100 cursor-pointer"
                >
                  User Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-sm text-slate-500 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="h-[1px] bg-(image:--gradient-border)"></div>
    </>
  );
}
