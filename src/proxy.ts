import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // The requested path (e.g. /dashboard)
  const path = url.pathname;

  // Check if it's the admin subdomain
  const isAdminSubdomain = hostname.includes("adminahh");

  // If it's the admin subdomain, rewrite to the (admin) internal folder
  if (isAdminSubdomain) {
    // Avoid rewriting paths that are already meant for static assets or API
    if (!path.startsWith("/api") && !path.includes(".")) {
      return NextResponse.rewrite(new URL(`/admin${path === "/" ? "" : path}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
