import { NextRequest, NextResponse } from 'next/server';
import { readProjectsDB, writeProjectsDB } from '@/lib/db';
import type { Project } from '@/types/project';

// GET /api/projects
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === 'true';

  const db = readProjectsDB();
  const projects = all ? db.projects : db.projects.filter(p => p.published);

  return NextResponse.json(projects);
}

// POST /api/projects
export async function POST(request: NextRequest) {
  const body = await request.json() as Omit<Project, 'id'>;

  const db = readProjectsDB();
  const newProject: Project = {
    ...body,
    id: String(Date.now()),
  };

  db.projects.unshift(newProject);
  writeProjectsDB(db);

  return NextResponse.json(newProject, { status: 201 });
}
