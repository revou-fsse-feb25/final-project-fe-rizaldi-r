import React from "react";

type HeaderSize = "32px" | "24px" | "20px" | "18px";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  size?: HeaderSize;
}

export default function Header({ children, className, size = "24px" }: HeaderProps) {
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
      default:
        return "text-2xl";
    }
  }, [size]);

  return <h1 className={`${fontSizeClass} font-bold ${className}`}>{children}</h1>;
}
