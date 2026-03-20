import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import type { Blog } from '@/types/blog';

type Params = { params: Promise<{ id: string }> };

// GET /api/blogs/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const db = readDB();
  const blog = db.blogs.find(b => b.id === id || b.slug === id);

  if (!blog) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(blog);
}

// PUT /api/blogs/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json() as Partial<Blog>;

  const db = readDB();
  const idx = db.blogs.findIndex(b => b.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  db.blogs[idx] = { ...db.blogs[idx], ...body };
  writeDB(db);

  return NextResponse.json(db.blogs[idx]);
}

// DELETE /api/blogs/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const db = readDB();
  const idx = db.blogs.findIndex(b => b.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const [deleted] = db.blogs.splice(idx, 1);
  writeDB(db);

  return NextResponse.json(deleted);
}
