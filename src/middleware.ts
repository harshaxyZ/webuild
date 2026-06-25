import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip the login page and API routes — they must be accessible
  if (path.startsWith('/admin/login') || path.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Protect /admin dashboard
  if (path.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_token');
    if (!adminToken || adminToken.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
  ],
};
