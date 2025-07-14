"use client";

type FontWeight =
  | "font-light"
  | "font-normal"
  | "font-medium"
  | "font-semibold"
  | "font-bold"
  | "font-extrabold";
type ButtonPaddingSize = "small" | "medium" | "large";
type ButtonFontSize = "small" | "medium" | "large";

interface ButtonProps {
  children: React.ReactNode;
  iconLink?: string;
  iconSize?: number;
  type?: "button" | "submit" | "reset";
  borderColorClass?: string;
  fontSize?: ButtonFontSize;
  fontWeight?: FontWeight;
  padding?: ButtonPaddingSize;
  isFilled?: boolean;
  isRound?: boolean;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  iconLink,
  iconSize = 20,
  type = "button",
  borderColorClass,
  fontSize = "small",
  fontWeight = "font-bold",
  padding = "small",
  isFilled,
  isRound,
  isDisabled = false,
  className,
  onClick = () => {},
}: ButtonProps) {
  const getPaddingClasses = (size: ButtonPaddingSize) => {
    if (isFilled) {
      switch (size) {
        case "small":
          return "px-3 py-2";
        case "medium":
          return "px-5 py-3";
        case "large":
          return "px-6 py-4";
        default:
          return "px-3 py-4";
      }
    } else {
      switch (size) {
        case "small":
          return "px-0 py-2";
        case "medium":
          return "px-0 py-4";
        case "large":
          return "px-2 py-4";
        default:
          return "px-2 py-4";
      }
    }
  };
  const getFontSizeClasses = (size: ButtonFontSize) => {
    switch (size) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-base";
      case "large":
        return "text-xl";
      default:
        return "text-base";
    }
  };

  const paddingClasses = getPaddingClasses(padding);
  const fontSizeClasses = getFontSizeClasses(fontSize);
  const buttonClasses = `
    flex items-center justify-center gap-2
    ${paddingClasses}
    ${borderColorClass ? `border ${borderColorClass}` : ""}
    ${fontSizeClasses}
    ${fontWeight}
    ${isRound ? "rounded-full" : "rounded-sm"}
    ${isDisabled ? "opacity-30 cursor-not-allowed" : "opacity-90 cursor-pointer"}
    ${className}
    `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <button
      type={type}
      className={`flex gap-2 items-center ${buttonClasses}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {iconLink && (
        <img
          src={iconLink}
          width={iconSize}
          height={iconSize}
          alt="Button icon"
          className="flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/${iconSize}x${iconSize}/CCCCCC/000000?text=X`;
          }}
        />
      )}
      <span className="text-nowrap">{children}</span>
    </button>
  );
}
