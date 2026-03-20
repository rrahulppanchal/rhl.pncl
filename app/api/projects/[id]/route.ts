import { NextRequest, NextResponse } from 'next/server';
import { readProjectsDB, writeProjectsDB } from '@/lib/db';
import type { Project } from '@/types/project';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const db = readProjectsDB();
  const project = db.projects.find(p => p.id === id);

  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json() as Partial<Project>;

  const db = readProjectsDB();
  const idx = db.projects.findIndex(p => p.id === id);

  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  db.projects[idx] = { ...db.projects[idx], ...body };
  writeProjectsDB(db);

  return NextResponse.json(db.projects[idx]);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const db = readProjectsDB();
  const idx = db.projects.findIndex(p => p.id === id);

  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const [deleted] = db.projects.splice(idx, 1);
  writeProjectsDB(db);

  return NextResponse.json(deleted);
}
