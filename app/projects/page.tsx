import type { Metadata } from 'next';
import Link from 'next/link';
import { readProjectsDB } from '@/lib/db';
import { Sidebar } from '@/components/sidebar';
import type { Project, ProjectStatus } from '@/types/project';

export const metadata: Metadata = {
  title: 'Projects — AI, Full-Stack & Cloud Case Studies',
  description:
    'Selected projects by Rahul Panchal across full-stack development, AI/LLM integration, and cloud infrastructure. Tech stacks, status, and case studies.',
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: '/projects',
    title: 'Projects — Rahul Panchal',
    description:
      'Selected projects across full-stack development, AI/LLM integration, and cloud infrastructure.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — Rahul Panchal',
    description:
      'Selected projects across full-stack development, AI/LLM integration, and cloud infrastructure.',
  },
};

const statusStyles: Record<ProjectStatus, { badge: string; dot: string }> = {
  'Completed':   { badge: 'text-primary border-primary/40 bg-primary/5',           dot: 'bg-primary' },
  'In Progress': { badge: 'text-amber-400 border-amber-400/40 bg-amber-400/5',      dot: 'bg-amber-400' },
  'Planning':    { badge: 'text-blue-400 border-blue-400/40 bg-blue-400/5',         dot: 'bg-blue-400' },
  'Concept':     { badge: 'text-muted-foreground border-border bg-muted/10',        dot: 'bg-muted-foreground' },
};

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ProjectsPage() {
  const db = readProjectsDB();
  const projects: Project[] = db.projects.filter(p => p.published);

  const completed  = projects.filter(p => p.status === 'Completed').length;
  const inProgress = projects.filter(p => p.status === 'In Progress').length;
  const techSet    = new Set(projects.flatMap(p => p.tech));

  const stats = [
    { label: 'Projects',    value: `${projects.length}+` },
    { label: 'Completed',   value: String(completed) },
    { label: 'In Progress', value: String(inProgress) },
    { label: 'Technologies', value: `${techSet.size}+` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-8 lg:px-16 pt-20 pb-20 lg:py-20 max-w-4xl">

          {/* Header */}
          <section className="mb-16">
            <p className="text-muted-foreground text-sm mb-4 font-mono">
              <span className="text-primary">{'>'}</span> Featured Work
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono glow-text glitch-hover">
              Projects
              <span className="terminal-cursor" />
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              A collection of projects spanning full-stack development, AI/ML, and cloud infrastructure. Each represents a unique challenge and learning opportunity.
            </p>
          </section>

          {/* Projects list */}
          {projects.length === 0 ? (
            <div className="border border-border p-12 text-center mb-16">
              <p className="text-muted-foreground font-mono text-sm">
                <span className="text-primary">{'>'}</span> No projects published yet. Check back soon.
              </p>
            </div>
          ) : (
            <section className="mb-20 space-y-6">
              {projects.map((project, idx) => {
                const s = statusStyles[project.status];
                const hasLiveLink   = project.link   && project.link   !== '#';
                const hasGithubLink = project.github && project.github !== '#';

                return (
                  <div
                    key={project.id}
                    className="border border-border p-8 hover:border-primary hover:shadow-md transition-all group corner-cut"
                  >
                    {/* Card header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-primary/40 font-mono shrink-0">
                            _{String(idx + 1).padStart(2, '0')}
                          </span>
                          <Link href={`/projects/${project.slug}`}>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors hover:underline underline-offset-4">
                            {project.name}
                          </h3>
                          </Link>
                          {project.featured && (
                            <span className="text-[10px] px-1.5 py-0.5 border border-primary/30 text-primary/60 font-mono shrink-0">
                              featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                      </div>

                      {/* Status + year */}
                      <div className="flex flex-col items-end gap-2 ml-6 shrink-0">
                        <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 border font-mono ${s.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {project.status}
                        </span>
                        <span className="text-xs text-muted-foreground/60 font-mono">{project.year}</span>
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map(tech => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 border border-border text-muted-foreground font-mono hover:border-primary/50 hover:text-primary hover:shadow-xs transition-all cursor"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action links */}
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono hover:text-primary transition-colors"
                      >
                        Case Study →
                      </Link>
                      {hasLiveLink && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary text-sm font-mono group/link hover:opacity-80 transition-opacity"
                        >
                          View Project
                          <span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 inline-block">
                            <ExternalIcon />
                          </span>
                        </a>
                      )}
                      {hasGithubLink && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted-foreground text-xs font-mono hover:text-primary transition-colors"
                        >
                          <GitHubIcon />
                          Source
                        </a>
                      )}
                      {!hasLiveLink && !hasGithubLink && (
                        <span className="text-muted-foreground/40 text-xs font-mono">
                          {'/* '}coming soon{' */'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* Stats */}
          <section className="border-t border-border pt-16">
            <h3 className="text-sm font-bold text-muted-foreground mb-8 font-mono uppercase tracking-widest">
              <span className="text-primary">//</span> Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {stats.map(stat => (
                <div key={stat.label} className="bg-background p-6 text-center group hover:bg-card transition-colors">
                  <p className="text-3xl font-bold text-primary mb-1 font-mono">{stat.value}</p>
                  <div className="w-8 h-px bg-primary/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
