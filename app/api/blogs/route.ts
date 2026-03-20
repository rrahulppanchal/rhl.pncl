import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import type { Blog } from '@/types/blog';

// GET /api/blogs — return all blogs (published only for public, all for admin)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === 'true';

  const db = readDB();
  const blogs = all ? db.blogs : db.blogs.filter(b => b.published);

  return NextResponse.json(blogs);
}

// POST /api/blogs — create a new blog post
export async function POST(request: NextRequest) {
  const body = await request.json() as Omit<Blog, 'id'>;

  const db = readDB();
  const newBlog: Blog = {
    ...body,
    id: String(Date.now()),
    date: body.date || new Date().toISOString().split('T')[0],
  };

  db.blogs.unshift(newBlog);
  writeDB(db);

  return NextResponse.json(newBlog, { status: 201 });
}
