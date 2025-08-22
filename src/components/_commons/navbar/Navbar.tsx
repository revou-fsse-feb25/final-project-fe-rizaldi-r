"use client";

import { signOut, useSession } from "next-auth/react";
import NavbarTabButton from "./NavbarTabButton";
import { usePathname } from "next/navigation";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { UserRole } from "@/types/jwtPayload";
import Link from "next/link";
import { UserPen, Menu } from "lucide-react";

enum TabNames {
  USERS,
  COURSES,
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
  iconLink?: string;
  iconComponent?: ReactElement<any, any>;
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

const tabsAdmin: TabConfig[] = [
  {
    id: TabNames.MY_COURSES,
    label: "Courses",
    href: "/admin/courses",
    iconLink: "/folder-open.svg",
  },
  {
    id: TabNames.STUDENT_PERFORMANCE,
    label: "User List",
    href: "/admin/user-list",
    iconComponent: <UserPen className="inline mr-2" />,
  },
];

export default function Navbar() {
  // State to manage the visibility of the profile dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const tabs = [...tabsStudent, ...tabsLecturer, ...tabsAdmin];

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
      <nav className="w-full flex justify-between items-center h-15 lg:p-0">
        <div className="flex flex-row gap-4">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden">
            <Menu size={24} className="text-slate-400" />
          </button>

          {/* Logo */}
          <Link href={"/"}>
            <h1 className="font-bold text-2xl text-slate-500">Campjam</h1>
          </Link>
        </div>

        {/* Tab Buttons for large screens */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium h-full">
          {session?.user.role === UserRole.STUDENT &&
            tabsStudent.map((tab) => (
              <NavbarTabButton
                key={tab.id}
                iconLink={tab.iconLink}
                href={tab.href}
                isActive={activeTab === tab.id}
              >
                {tab.label}
              </NavbarTabButton>
            ))}
          {session?.user.role === UserRole.INSTRUCTOR &&
            tabsLecturer.map((tab) => (
              <NavbarTabButton
                key={tab.id}
                iconLink={tab.iconLink}
                href={tab.href}
                isActive={activeTab === tab.id}
              >
                {tab.label}
              </NavbarTabButton>
            ))}
          {session?.user.role === UserRole.ADMIN &&
            tabsAdmin.map((tab) => (
              <NavbarTabButton
                key={tab.id}
                iconLink={tab.iconLink}
                href={tab.href}
                isActive={activeTab === tab.id}
              >
                {tab.iconComponent}
                {tab.label}
              </NavbarTabButton>
            ))}
        </div>

        {/* Profile and Mobile Menu Button */}
        <div className="flex gap-4 items-center">
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

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 w-full bg-white z-40 p-8 border-1 border-slate-300">
          <div className="flex flex-col gap-8 w-3/4 m-auto">
            {session?.user.role === UserRole.STUDENT &&
              tabsStudent.map((tab) => (
                <NavbarTabButton
                  key={tab.id}
                  iconLink={tab.iconLink}
                  href={tab.href}
                  isActive={activeTab === tab.id}
                  isRemoveLine={true}
                >
                  {tab.label}
                </NavbarTabButton>
              ))}
            {session?.user.role === UserRole.INSTRUCTOR &&
              tabsLecturer.map((tab) => (
                <NavbarTabButton
                  key={tab.id}
                  iconLink={tab.iconLink}
                  href={tab.href}
                  isActive={activeTab === tab.id}
                  isRemoveLine={true}
                >
                  {tab.label}
                </NavbarTabButton>
              ))}
            {session?.user.role === UserRole.ADMIN &&
              tabsAdmin.map((tab) => (
                <NavbarTabButton
                  key={tab.id}
                  iconLink={tab.iconLink}
                  href={tab.href}
                  isActive={activeTab === tab.id}
                  isRemoveLine={true}
                >
                  {tab.iconComponent}
                  {tab.label}
                </NavbarTabButton>
              ))}
          </div>
        </div>
      )}
      <div className="h-[1px] bg-(image:--gradient-border)"></div>
    </>
  );
}
