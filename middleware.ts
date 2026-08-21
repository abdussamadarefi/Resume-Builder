import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminDashboard = pathname.startsWith('/admin/dashboard');
  const isAdminApi =
    pathname.startsWith('/api/admin') &&
    !pathname.startsWith('/api/admin/auth');

  if (isAdminDashboard || isAdminApi) {
    const token = req.cookies.get('rf_admin_token')?.value;
    const session = token ? await verifyAdminSession(token) : null;

    if (!session) {
      if (isAdminApi) {
        return NextResponse.json(
          { error: 'Unauthorized: Admin session required' },
          { status: 401 }
        );
      }

      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/api/admin/:path*',
  ],
};
