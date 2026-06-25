import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;

  // Only protect /admin (the dashboard itself), NOT /admin/login
  if (path === '/admin' || (path.startsWith('/admin') && !path.startsWith('/admin/login'))) {
    const adminToken = request.cookies.get('admin_token');
    if (!adminToken || adminToken.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
