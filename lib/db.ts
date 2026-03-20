import fs from 'fs';
import path from 'path';
import type { DB } from '@/types/blog';
import type { ProjectsDB } from '@/types/project';

const BLOGS_PATH    = path.join(process.cwd(), 'data', 'blogs.json');
const PROJECTS_PATH = path.join(process.cwd(), 'data', 'projects.json');

// ── Blogs ─────────────────────────────────────────────────────────────────────

export function readDB(): DB {
  try {
    return JSON.parse(fs.readFileSync(BLOGS_PATH, 'utf-8')) as DB;
  } catch {
    return { blogs: [] };
  }
}

export function writeDB(data: DB): void {
  fs.writeFileSync(BLOGS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Projects ──────────────────────────────────────────────────────────────────

export function readProjectsDB(): ProjectsDB {
  try {
    return JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf-8')) as ProjectsDB;
  } catch {
    return { projects: [] };
  }
}

export function writeProjectsDB(data: ProjectsDB): void {
  fs.writeFileSync(PROJECTS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
