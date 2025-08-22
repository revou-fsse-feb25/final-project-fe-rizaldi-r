import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumps({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-slate-500 text-base">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-slate-700 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`${isLast ? "font-semibold text-slate-500" : ""}`}>
                  {item.label}
                </span>
              )}
              {!isLast && <img src={"/chevron-right.svg"} className="opacity-80"/>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
