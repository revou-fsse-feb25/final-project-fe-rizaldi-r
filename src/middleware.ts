import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@/types/jwtPayload";

const staticFileExtensions = [".ico", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".xml"];

const routeConfig = {
  public: [],
  authPages: ["/login", "/signup"],
  protected: ["/student"],
  adminOnly: ["/instructor"],
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // --- Check Authentication Status ---
  // TODO: use config so it can be dynamic
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const userRole = token?.role as UserRole;

  // --- Handle Auth Pages (Redirect from auth pages if Authenticated) ---
  const isAuthPage = routeConfig.authPages.some(
    (routePath) => path === routePath || path.startsWith(`${routePath}/`)
  );
  if (isAuthPage && userRole === UserRole.INSTRUCTOR) {
    const redirectPath = "/instructor/my-courses";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  } else if (isAuthPage && userRole === UserRole.STUDENT) {
    const redirectPath = "/student/my-courses";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // --- Handle Protected Routes (Require Authentication) ---
  const isProtected = routeConfig.protected.some(
    (routePath) => path === routePath || path.startsWith(`${routePath}/`)
  );
  if (isProtected && !isAuthenticated) {
    const accountUrl = new URL("/login", request.url);
    accountUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(accountUrl);
  }

  // --- Handle Redirect Instructor to Instructor home page---
  if (isProtected && userRole === UserRole.INSTRUCTOR) {
    return NextResponse.redirect(new URL("/instructor/my-courses", request.url));
  }

  // --- Handle Instructor-Only Routes (Require Instructor Role) ---
  const isAdminRoute = routeConfig.adminOnly.some(
    (routePath) => path === routePath || path.startsWith(`${routePath}/`)
  );
  if (isAdminRoute) {
    if (!isAuthenticated || userRole !== UserRole.INSTRUCTOR)
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
