'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Blog } from '@/types/blog';
import type { Project } from '@/types/project';

// ── Icons ─────────────────────────────────────────────────────────────────────

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function LogOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// ── Status badge helper ───────────────────────────────────────────────────────

const statusStyles: Record<string, string> = {
  'Completed':   'text-primary border-primary/40 bg-primary/5',
  'In Progress': 'text-amber-400 border-amber-400/40 bg-amber-400/5',
  'Planning':    'text-blue-400 border-blue-400/40 bg-blue-400/5',
  'Concept':     'text-muted-foreground border-border',
};

// ── Component ─────────────────────────────────────────────────────────────────

type Tab = 'blogs' | 'projects';

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('blogs');

  // blogs state
  const [blogs, setBlogs]           = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [confirmDeleteBlog, setConfirmDeleteBlog] = useState<string | null>(null);
  const [deletingBlog, setDeletingBlog]           = useState<string | null>(null);

  // projects state
  const [projects, setProjects]             = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [confirmDeleteProject, setConfirmDeleteProject] = useState<string | null>(null);
  const [deletingProject, setDeletingProject]           = useState<string | null>(null);

  // fetch
  useEffect(() => {
    fetch('/api/blogs?all=true').then(r => r.json()).then(d => { setBlogs(d); setBlogsLoading(false); });
    fetch('/api/projects?all=true').then(r => r.json()).then(d => { setProjects(d); setProjectsLoading(false); });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  // blogs
  const handleDeleteBlog = async (id: string) => {
    setDeletingBlog(id);
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    setBlogs(prev => prev.filter(b => b.id !== id));
    setConfirmDeleteBlog(null);
    setDeletingBlog(null);
  };
  const toggleBlogPublish = async (blog: Blog) => {
    await fetch(`/api/blogs/${blog.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !blog.published }) });
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, published: !b.published } : b));
  };

  // projects
  const handleDeleteProject = async (id: string) => {
    setDeletingProject(id);
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects(prev => prev.filter(p => p.id !== id));
    setConfirmDeleteProject(null);
    setDeletingProject(null);
  };
  const toggleProjectPublish = async (project: Project) => {
    await fetch(`/api/projects/${project.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !project.published }) });
    setProjects(prev => prev.map(p => p.id === project.id ? { ...p, published: !p.published } : p));
  };

  // derived stats
  const blogPub = blogs.filter(b => b.published).length;
  const projPub = projects.filter(p => p.published).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-border px-6 py-4 bg-sidebar sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold font-mono hover:text-primary transition-colors">
              <span className="text-primary">&lt;</span>Rahul<span className="text-primary">/&gt;</span>
            </Link>
            <span className="text-muted-foreground/40 font-mono text-xs hidden sm:block">/ admin dashboard</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary font-mono transition-colors border border-border hover:border-primary px-3 py-1.5"
          >
            <LogOutIcon /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Page header */}
        <div className="mb-10">
          <p className="text-xs text-muted-foreground font-mono mb-2">
            <span className="text-primary">{'>'}</span> Content Management
          </p>
          <h1 className="text-3xl font-bold font-mono glow-text">Dashboard</h1>
        </div>

        {/* Combined stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border mb-10">
          {[
            { label: 'Total Blogs',    value: blogs.length },
            { label: 'Published Blogs', value: blogPub },
            { label: 'Total Projects', value: projects.length },
            { label: 'Published Projects', value: projPub },
          ].map(s => (
            <div key={s.label} className="bg-background px-6 py-5 hover:bg-card/30 transition-colors">
              <p className="text-2xl font-bold font-mono text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-px mb-0 border-b border-border">
          {(['blogs', 'projects'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-sm font-mono transition-all border-b-2 -mb-px ${
                tab === t
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-primary/60 mr-1">{t === 'blogs' ? '01' : '02'}</span> {t}
            </button>
          ))}

          {/* Tab-contextual New button */}
          <Link
            href={tab === 'blogs' ? '/admin/dashboard/new' : '/admin/dashboard/projects/new'}
            className="ml-auto flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs font-mono hover:opacity-90 transition-opacity mb-1"
          >
            <PlusIcon />
            New {tab === 'blogs' ? 'Post' : 'Project'}
          </Link>
        </div>

        {/* ── Blogs Tab ── */}
        {tab === 'blogs' && (
          <div className="border border-t-0 border-border">
            <div className="grid grid-cols-[1fr_120px_100px_130px] gap-4 px-6 py-3 border-b border-border bg-card/30">
              {['Title', 'Category', 'Status', 'Actions'].map(h => (
                <p key={h} className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {blogsLoading ? (
              <div className="px-6 py-12 text-center text-muted-foreground font-mono text-sm">
                <span className="text-primary animate-[blink_1s_step-end_infinite]">▋</span> Loading...
              </div>
            ) : blogs.length === 0 ? (
              <div className="px-6 py-12 text-center text-muted-foreground font-mono text-sm">
                No posts yet.{' '}
                <Link href="/admin/dashboard/new" className="text-primary hover:underline">Create the first one →</Link>
              </div>
            ) : (
              blogs.map((blog, idx) => (
                <div
                  key={blog.id}
                  className={`grid grid-cols-[1fr_120px_100px_130px] gap-4 px-6 py-4 items-center hover:bg-card/20 transition-colors ${idx < blogs.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{blog.title}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">{blog.date} · {blog.readTime} read</p>
                  </div>
                  <p className="text-xs text-primary font-mono truncate">{blog.category}</p>
                  <button
                    onClick={() => toggleBlogPublish(blog)}
                    className={`text-xs px-2.5 py-1 border font-mono transition-all w-fit ${
                      blog.published ? 'text-primary border-primary/40 bg-primary/5 hover:bg-primary/10' : 'text-muted-foreground border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {blog.published ? '● live' : '○ draft'}
                  </button>
                  <div className="flex items-center gap-2">
                    <Link href={`/blogs/${blog.slug}`} target="_blank" className="p-1.5 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors" title="View"><EyeIcon /></Link>
                    <Link href={`/admin/dashboard/edit/${blog.id}`} className="p-1.5 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors" title="Edit"><EditIcon /></Link>
                    {confirmDeleteBlog === blog.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDeleteBlog(blog.id)} disabled={deletingBlog === blog.id} className="px-2 py-1 bg-destructive/80 text-destructive-foreground text-xs font-mono hover:bg-destructive transition-colors disabled:opacity-50">
                          {deletingBlog === blog.id ? '...' : 'Yes'}
                        </button>
                        <button onClick={() => setConfirmDeleteBlog(null)} className="px-2 py-1 border border-border text-muted-foreground text-xs font-mono hover:border-primary hover:text-primary transition-colors">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDeleteBlog(blog.id)} className="p-1.5 border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors" title="Delete"><TrashIcon /></button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Projects Tab ── */}
        {tab === 'projects' && (
          <div className="border border-t-0 border-border">
            <div className="grid grid-cols-[1fr_110px_110px_130px] gap-4 px-6 py-3 border-b border-border bg-card/30">
              {['Name', 'Status', 'Visibility', 'Actions'].map(h => (
                <p key={h} className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{h}</p>
              ))}
            </div>

            {projectsLoading ? (
              <div className="px-6 py-12 text-center text-muted-foreground font-mono text-sm">
                <span className="text-primary animate-[blink_1s_step-end_infinite]">▋</span> Loading...
              </div>
            ) : projects.length === 0 ? (
              <div className="px-6 py-12 text-center text-muted-foreground font-mono text-sm">
                No projects yet.{' '}
                <Link href="/admin/dashboard/projects/new" className="text-primary hover:underline">Create the first one →</Link>
              </div>
            ) : (
              projects.map((project, idx) => (
                <div
                  key={project.id}
                  className={`grid grid-cols-[1fr_110px_110px_130px] gap-4 px-6 py-4 items-center hover:bg-card/20 transition-colors ${idx < projects.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{project.name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">
                      {project.year} · {project.tech.slice(0, 2).join(', ')}{project.tech.length > 2 ? '…' : ''}
                    </p>
                  </div>
                  {/* Status badge */}
                  <span className={`text-xs px-2.5 py-1 border font-mono w-fit ${statusStyles[project.status] ?? statusStyles['Concept']}`}>
                    {project.status}
                  </span>
                  {/* Publish toggle */}
                  <button
                    onClick={() => toggleProjectPublish(project)}
                    className={`text-xs px-2.5 py-1 border font-mono transition-all w-fit ${
                      project.published ? 'text-primary border-primary/40 bg-primary/5 hover:bg-primary/10' : 'text-muted-foreground border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {project.published ? '● live' : '○ draft'}
                  </button>
                  <div className="flex items-center gap-2">
                    <Link href={`/projects/${project.slug}`} target="_blank" className="p-1.5 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors" title="View on site"><EyeIcon /></Link>
                    <Link href={`/admin/dashboard/projects/edit/${project.id}`} className="p-1.5 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors" title="Edit"><EditIcon /></Link>
                    {confirmDeleteProject === project.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDeleteProject(project.id)} disabled={deletingProject === project.id} className="px-2 py-1 bg-destructive/80 text-destructive-foreground text-xs font-mono hover:bg-destructive transition-colors disabled:opacity-50">
                          {deletingProject === project.id ? '...' : 'Yes'}
                        </button>
                        <button onClick={() => setConfirmDeleteProject(null)} className="px-2 py-1 border border-border text-muted-foreground text-xs font-mono hover:border-primary hover:text-primary transition-colors">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDeleteProject(project.id)} className="p-1.5 border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors" title="Delete"><TrashIcon /></button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
