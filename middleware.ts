import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /admin routes (but NOT /admin/login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    const authCookie = request.cookies.get('admin_auth');
    
    if (!authCookie || authCookie.value !== process.env.ADMIN_AUTH_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect admin API routes (but NOT auth routes)
  if (request.nextUrl.pathname.startsWith('/api/admin') &&
      !request.nextUrl.pathname.startsWith('/api/admin/auth')) {
    const authHeader = request.headers.get('authorization');
    const adminToken = process.env.ADMIN_AUTH_TOKEN;
    
    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};