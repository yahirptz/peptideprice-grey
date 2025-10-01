import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow login page and auth routes
  if (path === '/admin/login' || path.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }

  // Check admin pages
  if (path.startsWith('/admin')) {
    const authCookie = request.cookies.get('admin_auth');
    
    console.log('🔐 Checking auth for:', path);
    console.log('Cookie exists?', !!authCookie);
    console.log('Cookie value:', authCookie?.value);
    console.log('Expected value:', process.env.ADMIN_AUTH_TOKEN);
    
    if (!authCookie) {
      console.log('❌ No cookie found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (authCookie.value !== process.env.ADMIN_AUTH_TOKEN) {
      console.log('❌ Cookie value mismatch, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    console.log('✅ Cookie valid, allowing access');
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};