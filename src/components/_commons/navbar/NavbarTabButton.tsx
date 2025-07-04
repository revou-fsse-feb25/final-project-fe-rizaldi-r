import Link from "next/link";

export default function NavbarTabButton({
  children,
  href = "/",
  isActive = false,
  iconLink,
}: {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
  iconLink?: string;
}) {
  return (
    <Link
      href={href}
      className={`flex gap-2 h-full ${isActive ? "border-b-2 border-b-gray-800" : "text-gray-500"}`}
    >
      {iconLink && (
        <img
          src={iconLink}
          alt=""
          width={24}
          className={isActive ? "" : "opacity-70"}
        />
      )}
      <span className="m-auto">{children}</span>
    </Link>
  );
}
