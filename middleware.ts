import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for route protection
 * Protects /checkout (authenticated users) and /admin (admin users only)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated via cookie
  const authToken = request.cookies.get('revoshop_auth_token');

  // Parse auth token (format: "id:role")
  let isAuthenticated = false;
  let userRole: string | null = null;

  if (authToken) {
    const parts = authToken.value.split(':');
    if (parts.length === 2) {
      isAuthenticated = true;
      userRole = parts[1];
    }
  }

  // Admin routes - require admin role
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== 'admin') {
      // Non-admin user trying to access admin - redirect to home
      const homeUrl = new URL('/', request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  // Checkout route - requires authentication
  if (pathname.startsWith('/checkout')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

/**
 * Configure which routes the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
