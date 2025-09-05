import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@/types/jwtPayload";

const staticFileExtensions = [".ico", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".xml"];

const routeConfig = {
  public: [],
  authPages: ["/login", "/signup", "/login-image.jpg"],
  protected: ["/student"],
  instructorPath: ["/instructor"],
  adminPath: ["/admin"],
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // --- Check Authentication Status ---
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const userRole = token?.role as UserRole;

  const isAuthPage = routeConfig.authPages.some(
    (routePath) => path === routePath || path.startsWith(`${routePath}/`)
  );

  // --- Handle Protected Routes (Require Authentication) ---
  if (!isAuthenticated && !isAuthPage) {
    const accountUrl = new URL("/login", request.url);
    accountUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(accountUrl);
  }

  // --- Handle Redirect Student to Student home page---
  if (isAuthPage && userRole === UserRole.STUDENT) {
    const redirectPath = "/student/search";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // --- Handle Redirect Instructor to Instructor home page---
  if (isAuthPage && userRole === UserRole.INSTRUCTOR) {
    return NextResponse.redirect(new URL("/instructor/my-courses", request.url));
  }

  // --- Handle Redirect admin to admin home page---
  if (isAuthPage && userRole === UserRole.ADMIN) {
    return NextResponse.redirect(new URL("/admin/courses", request.url));
  }

  const isAdminRoute = routeConfig.adminPath.some(
    (routePath) => path === routePath || path.startsWith(`${routePath}/`)
  );
  const isInstructorRoute = routeConfig.instructorPath.some(
    (routePath) => path === routePath || path.startsWith(`${routePath}/`)
  );
  const isProtected = routeConfig.protected.some(
    (routePath) => path === routePath || path.startsWith(`${routePath}/`)
  );

  // --- Handle Student-Only Routes (Require Student Role) ---
  if (isProtected) {
    if (!isAuthenticated || userRole !== UserRole.STUDENT)
      return NextResponse.redirect(new URL("/", request.url));
  }

  // --- Handle Instructor-Only Routes (Require Instructor Role) ---
  if (isInstructorRoute) {
    if (!isAuthenticated || userRole !== UserRole.INSTRUCTOR)
      return NextResponse.redirect(new URL("/", request.url));
  }

  // --- Handle Admin-Only Routes (Require Admin Role) ---
  if (isAdminRoute) {
    if (!isAuthenticated || userRole !== UserRole.ADMIN)
      return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except static assets
    "/((?!api/auth|_next/static|_next/image|static|public|favicon.ico).*)",
  ],
};
