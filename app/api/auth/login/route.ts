import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'rahul0550';
const ADMIN_TOKEN = 'rahul-portfolio-admin-2026';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('admin-token', ADMIN_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
