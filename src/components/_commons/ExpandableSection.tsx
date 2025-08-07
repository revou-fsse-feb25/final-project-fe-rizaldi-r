"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

type IconRotation = "90" | "180" | "-90";

export default function ExpandableSection({
  headerComponent,
  isInitialExpanded = true,
  iconStrokeWidth = 1,
  iconRotation = "-90",
  children,
}: {
  headerComponent: React.ReactNode;
  isInitialExpanded?: boolean;
  iconStrokeWidth?: number;
  iconRotation?: IconRotation;
  children: React.ReactNode;
}) {
  const getIconRotation = (rotationDegree: IconRotation) => {
    switch (rotationDegree) {
      case "90":
        return "rotate-90";
      case "180":
        return "rotate-180";
      case "-90":
        return "-rotate-90";
      default:
        return "-rotate-90";
    }
  };

  const [isExpanded, setIsExpanded] = useState(isInitialExpanded);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <button onClick={handleToggle} className="flex flex-row cursor-pointer">
        <ChevronDown
          strokeWidth={iconStrokeWidth}
          className={`inline mr-2 ${!isExpanded ? getIconRotation(iconRotation) : ""}`}
        />
        {headerComponent}
      </button>

      {/* Expanded content */}
      {isExpanded && <>{children}</>}
    </>
  );
}
