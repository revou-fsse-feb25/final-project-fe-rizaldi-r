import React from "react";

type HeaderSize = "32" | "24" | "20" | "18" | "14";
type HeaderElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type FontWeight = "normal" | "medium" | "semibold" | "bold";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  size?: HeaderSize;
  element: HeaderElementType;
  fontWeight?: FontWeight;
}

export default function Header({
  children,
  className,
  size = "24",
  element = "h1",
  fontWeight = "semibold",
}: HeaderProps) {
  // only recalculated when size prop changes
  const fontSizeClass = React.useMemo(() => {
    switch (size) {
      case "32":
        return "text-[32px]";
      case "24":
        return "text-2xl";
      case "20":
        return "text-xl";
      case "18":
        return "text-lg";
      case "14":
        return "text-md";
      default:
        return "text-2xl";
    }
  }, [size]);

  const fontWeightClass = React.useMemo(() => {
    switch (fontWeight) {
      case "normal":
        return "font-normal";
      case "medium":
        return "font-medium";
      case "semibold":
        return "font-semibold";
      case "bold":
        return "font-bold";
      default:
        return "font-semibold";
    }
  }, [fontWeight]);

  const Element = element || "h1";

  return <Element className={`${fontSizeClass} ${fontWeightClass} ${className}`}>{children}</Element>;
}
