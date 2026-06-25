import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const path = url.pathname;
  
  const isAdminSubdomain = hostname.includes("adminahh");
  const isDashboardRoute = path.startsWith('/admin');

  // Protect Admin Dashboard
  if ((isAdminSubdomain || isDashboardRoute) && !path.startsWith('/admin/login')) {
    const adminToken = request.cookies.get('admin_token');
    if (!adminToken || adminToken.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Subdomain rewriting (from former proxy.ts)
  if (isAdminSubdomain) {
    if (!path.startsWith("/api") && !path.includes(".")) {
      return NextResponse.rewrite(new URL(`/admin${path === "/" ? "" : path}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
