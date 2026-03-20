import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readProjectsDB } from '@/lib/db';
import { Sidebar } from '@/components/sidebar';
import type { Project } from '@/types/project';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const db = readProjectsDB();
  return db.projects
    .filter(p => p.published)
    .map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const db = readProjectsDB();
  const project = db.projects.find(p => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Rahul Panchal`, description: project.description };
}

// Minimal markdown renderer (no dependencies)
function renderMarkdown(content: string): React.ReactNode[] {
  const blocks = content.split(/\n\n+/);

  return blocks.map((block, i) => {
    // Fenced code block
    if (block.startsWith('```')) {
      const lines = block.split('\n');
      const lang = lines[0].slice(3).trim();
      const code = lines.slice(1, lines.length - 1).join('\n');
      return (
        <pre key={i} className="bg-card border border-border p-4 overflow-x-auto my-6 text-xs font-mono text-foreground leading-relaxed relative">
          {lang && (
            <span className="absolute top-2 right-3 text-[10px] text-muted-foreground/50 font-mono uppercase">{lang}</span>
          )}
          <code>{code}</code>
        </pre>
      );
    }

    // Headings
    if (block.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-foreground font-mono mt-8 mb-3">{inlineFormat(block.slice(4))}</h3>;
    if (block.startsWith('## '))  return <h2 key={i} className="text-xl font-bold text-foreground font-mono mt-10 mb-4 glow-text">{inlineFormat(block.slice(3))}</h2>;
    if (block.startsWith('# '))   return <h1 key={i} className="text-2xl font-bold text-foreground font-mono mt-10 mb-4">{inlineFormat(block.slice(2))}</h1>;

    // Unordered list
    if (block.split('\n').every(l => l.startsWith('- ') || l.trim() === '')) {
      const items = block.split('\n').filter(l => l.startsWith('- '));
      return (
        <ul key={i} className="space-y-2 my-4 pl-4">
          {items.map((item, j) => (
            <li key={j} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
              <span className="text-primary shrink-0 mt-1">▹</span>
              <span>{inlineFormat(item.slice(2))}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Paragraph
    return (
      <p key={i} className="text-muted-foreground leading-relaxed my-4 text-sm">
        {inlineFormat(block)}
      </p>
    );
  });
}

function inlineFormat(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="px-1.5 py-0.5 bg-card border border-border text-primary font-mono text-xs">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

const statusStyles: Record<string, { badge: string; dot: string }> = {
  'Completed':   { badge: 'text-primary border-primary/40 bg-primary/5',        dot: 'bg-primary' },
  'In Progress': { badge: 'text-amber-400 border-amber-400/40 bg-amber-400/5',  dot: 'bg-amber-400' },
  'Planning':    { badge: 'text-blue-400 border-blue-400/40 bg-blue-400/5',     dot: 'bg-blue-400' },
  'Concept':     { badge: 'text-muted-foreground border-border bg-muted/10',    dot: 'bg-muted-foreground' },
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const db = readProjectsDB();
  const project = db.projects.find(p => p.slug === slug && p.published) as Project | undefined;

  if (!project) notFound();

  const s = statusStyles[project.status] ?? statusStyles['Concept'];

  // Adjacent projects for prev/next
  const published = db.projects.filter(p => p.published);
  const idx = published.findIndex(p => p.slug === slug);
  const prev = published[idx + 1] ?? null;
  const next = published[idx - 1] ?? null;

  const hasLiveLink   = project.link   && project.link   !== '#';
  const hasGithubLink = project.github && project.github !== '#';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-8 lg:px-16 pt-20 pb-20 lg:py-20 max-w-3xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-10">
            <Link href="/projects" className="hover:text-primary transition-colors">projects</Link>
            <span className="text-muted-foreground/30">/</span>
            <span className="text-foreground truncate">{project.slug}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 border font-mono ${s.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                {project.status}
              </span>
              <span className="text-xs text-muted-foreground/60 font-mono">{project.year}</span>
              {project.featured && (
                <span className="text-[10px] px-1.5 py-0.5 border border-primary/30 text-primary/60 font-mono">
                  featured
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-mono leading-tight mb-4 glow-text">
              {project.name}
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-border">
              {project.tech.map(tech => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 border border-border text-muted-foreground font-mono hover:border-primary/50 hover:text-primary transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            {(hasLiveLink || hasGithubLink) && (
              <div className="flex items-center gap-4 mb-6">
                {hasLiveLink && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary text-sm font-mono hover:opacity-80 transition-opacity"
                  >
                    View Live
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
                {hasGithubLink && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground text-xs font-mono hover:text-primary transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    Source
                  </a>
                )}
              </div>
            )}
          </header>

          {/* Content */}
          {project.content && (
            <article className="mb-16">
              {renderMarkdown(project.content)}
            </article>
          )}

          {/* Prev / Next navigation */}
          <nav className="grid grid-cols-2 gap-4 border-t border-border pt-8">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group p-4 border border-border hover:border-primary transition-all">
                <p className="text-xs text-muted-foreground font-mono mb-2">← previous</p>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">{prev.name}</p>
              </Link>
            ) : <div />}

            {next ? (
              <Link href={`/projects/${next.slug}`} className="group p-4 border border-border hover:border-primary transition-all text-right ml-auto w-full">
                <p className="text-xs text-muted-foreground font-mono mb-2">next →</p>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">{next.name}</p>
              </Link>
            ) : <div />}
          </nav>

        </main>
      </div>
    </div>
  );
}
