import type { Metadata } from 'next';
import Link from 'next/link';
import { readProjectsDB } from '@/lib/db';
import { Sidebar } from '@/components/sidebar';
import type { Project, ProjectStatus } from '@/types/project';

const TITLE = 'AI, Web & Mobile Projects | Rahul Panchal';
const DESCRIPTION =
  'Explore Klego, Raccog, and Solviser: AI application builders, document-based RAG, and mobile delivery with clear roles and implementation scope.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: '/projects',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
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
  const published: Project[] = db.projects.filter(p => p.published);
  const projects  = published.filter(p => (p.section ?? 'featured') === 'featured');
  const otherWork = published.filter(p => p.section === 'other');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-8 lg:px-16 pt-20 pb-20 lg:py-20 max-w-4xl">

          {/* Header */}
          <section className="mb-16">
            <p className="text-muted-foreground text-sm mb-4 font-mono">
              <span className="text-primary">{'>'}</span> Selected projects
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono glow-text glitch-hover">
              Projects
              <span className="terminal-cursor" />
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              My recent work covers AI application generation, document-based RAG, and mobile product delivery. Each case study explains the product, my role, and the engineering work I owned.
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
                const detailHref    = project.caseStudy ?? `/projects/${project.slug}`;
                const extraLinks    = project.links ?? [];
                const hasLiveLink   = project.link   && project.link   !== '#' && extraLinks.length === 0;
                const hasGithubLink = project.github && project.github !== '#';

                return (
                  <div
                    key={project.id}
                    className="border border-border p-8 hover:border-primary hover:shadow-md transition-all group corner-cut"
                  >
                    {/* Card header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs text-primary/40 font-mono shrink-0">
                            _{String(idx + 1).padStart(2, '0')}
                          </span>
                          <Link href={detailHref}>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors hover:underline underline-offset-4">
                              {project.name}
                            </h3>
                          </Link>
                        </div>
                        {(project.subtitle || project.role) && (
                          <p className="text-xs font-mono mb-3 pl-9">
                            {project.subtitle && <span className="text-foreground/80">{project.subtitle}</span>}
                            {project.subtitle && project.role && <span className="text-muted-foreground/40"> · </span>}
                            {project.role && <span className="text-primary/80">{project.role}</span>}
                          </p>
                        )}
                      </div>

                      {/* Status */}
                      <div className="flex flex-col sm:items-end gap-2 sm:ml-6 shrink-0">
                        <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 border font-mono ${s.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {project.statusLabel ?? project.status}
                        </span>
                        {project.year && !project.statusLabel && (
                          <span className="text-xs text-muted-foreground/60 font-mono">{project.year}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

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
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                      <Link
                        href={detailHref}
                        className="flex items-center gap-1.5 text-primary text-sm font-mono hover:opacity-80 transition-opacity group/cs"
                      >
                        {project.caseStudy ? 'Read case study' : 'Case Study'}
                        <span className="transition-transform group-hover/cs:translate-x-1 inline-block">→</span>
                      </Link>
                      {extraLinks.map(l => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted-foreground text-xs font-mono hover:text-primary transition-colors"
                        >
                          {l.label}
                          <ExternalIcon />
                        </a>
                      ))}
                      {hasLiveLink && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted-foreground text-xs font-mono hover:text-primary transition-colors"
                        >
                          View Project
                          <ExternalIcon />
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
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* Other work */}
          {otherWork.length > 0 && (
            <section className="mb-20">
              <h2 className="text-sm font-bold text-muted-foreground mb-6 font-mono uppercase tracking-widest">
                <span className="text-primary">//</span> Other work
              </h2>
              <div className="space-y-4">
                {otherWork.map(project => (
                  <div key={project.id} className="border border-border p-6">
                    <h3 className="text-base font-semibold text-foreground mb-2">{project.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                    <p className="text-xs text-muted-foreground/70 font-mono">{project.tech.join(' • ')}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Closing CTA */}
          <section className="border-t border-border pt-16">
            <h3 className="text-xl font-bold text-foreground mb-3 font-mono">
              Want to discuss the engineering behind a project?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              Get in touch about the architecture, delivery scope, or a similar product you&apos;re building.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-mono text-sm font-semibold hover:opacity-90 transition-opacity group/btn"
            >
              Contact me
              <span className="transition-transform group-hover/btn:translate-x-1 inline-block">→</span>
            </Link>
          </section>

        </main>
      </div>
    </div>
  );
}
