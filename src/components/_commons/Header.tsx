import React from "react";

type HeaderSize = "32px" | "24px" | "20px" | "18px" | "14px";
type HeaderElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  size?: HeaderSize;
  element: HeaderElementType;
}

export default function Header({ children, className, size = "24px", element = "h1" }: HeaderProps) {
  // only recalculated when size prop changes
  const fontSizeClass = React.useMemo(() => {
    switch (size) {
      case "32px":
        return "text-[32px]";
      case "24px":
        return "text-2xl";
      case "20px":
        return "text-xl";
      case "18px":
        return "text-lg";
      case "14px":
        return "text-md";
      default:
        return "text-2xl";
    }
  }, [size]);

  const Element = element || "h1";

  return <Element className={`${fontSizeClass} font-bold ${className}`}>{children}</Element>;
}
