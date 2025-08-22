import Link from "next/link";

export default function NavbarTabButton({
  children,
  href = "/",
  isActive = false,
  iconLink,
  isRemoveLine = false,
}: {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
  iconLink?: string;
  isRemoveLine?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex gap-2 h-full ${
        isActive
          ? `${isRemoveLine ? "" : "border-b-2 border-b-blue-600"} text-blue-600 font-bold`
          : "text-slate-500"
      }`}
    >
      {iconLink && (
        <img
          src={iconLink}
          alt=""
          width={24}
          className={isActive ? "filter-[var(--filter-blue)]" : "opacity-70"}
        />
      )}
      <span className="m-auto">{children}</span>
    </Link>
  );
}
