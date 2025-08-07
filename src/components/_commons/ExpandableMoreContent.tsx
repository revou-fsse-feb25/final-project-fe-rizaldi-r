"use client";

import Button from "@/components/_commons/Button";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

type IconRotation = "90" | "180" | "-90";

export default function ExpandableMoreContent({
  isInitialExpanded = true,
  iconRotation = "180",
  children,
}: {
  isInitialExpanded?: boolean;
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
        return "rotate-180";
    }
  };

  const [isExpanded, setIsExpanded] = useState(isInitialExpanded);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  let labelText = isExpanded ? "View Less" : "View More";

  return (
    <>
      {/* Expanded content */}
      {isExpanded && <>{children}</>}

      <Button onClick={handleToggle} className="text-blue-600">
        <ChevronDown
          strokeWidth={2}
          className={`inline mr-2 ${isExpanded ? getIconRotation(iconRotation) : ""}`}
        />
        {labelText}
      </Button>
    </>
  );
}
