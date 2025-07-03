import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center">
            {/* Logo */}
            <h1>CamperLMS</h1>

            {/* Tab Buttons */}
            <div className="flex gap-10">
                <Link href={"/student/search"} className="">
                    Search
                </Link>
                <Link href={"/"} className="">
                    My Courses
                </Link>
                <Link href={"/student/assignments"} className="">
                    Assignments
                </Link>
                <Link href={"/student/performance"} className="">
                    Performance
                </Link>
            </div>

            <div className="flex gap-4">
                <img src="/user-thumb.png" alt="User icon" />
                <img src="/bell.svg" alt="Notification icon" />
            </div>
        </nav>
    );
}
