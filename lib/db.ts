import fs from 'fs';
import path from 'path';
import type { DB } from '@/types/blog';
import type { ProjectsDB } from '@/types/project';

const BLOGS_PATH    = path.join(process.cwd(), 'data', 'blogs.json');
const PROJECTS_PATH = path.join(process.cwd(), 'data', 'projects.json');

// ── Blogs ─────────────────────────────────────────────────────────────────────

export function readDB(): DB {
  try {
    const db = JSON.parse(fs.readFileSync(BLOGS_PATH, 'utf-8')) as DB;
    // newest first by date (invalid dates sink to the bottom)
    db.blogs.sort((a, b) => {
      const ta = new Date(a.date).getTime();
      const tb = new Date(b.date).getTime();
      const na = isNaN(ta) ? -Infinity : ta;
      const nb = isNaN(tb) ? -Infinity : tb;
      return nb - na;
    });
    return db;
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
    const db = JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf-8')) as ProjectsDB;
    // newest first by year (invalid years sink to the bottom)
    db.projects.sort((a, b) => {
      const ya = Number(a.year);
      const yb = Number(b.year);
      const na = isNaN(ya) ? -Infinity : ya;
      const nb = isNaN(yb) ? -Infinity : yb;
      return nb - na;
    });
    return db;
  } catch {
    return { projects: [] };
  }
}

export function writeProjectsDB(data: ProjectsDB): void {
  fs.writeFileSync(PROJECTS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
