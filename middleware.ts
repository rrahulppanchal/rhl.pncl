import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_TOKEN = 'rahul-portfolio-admin-2026';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('admin-token')?.value;
    if (token !== ADMIN_TOKEN) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
