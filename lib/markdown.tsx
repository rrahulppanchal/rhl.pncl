import Link from 'next/link';

// Minimal markdown renderer (no dependencies) shared by blog and project pages.
// Supports: fenced code, #/##/### headings, "- " lists, paragraphs,
// and inline `code`, **bold** and [label](url) links.
export function renderMarkdown(content: string): React.ReactNode[] {
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

const LINK_RE = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

export function inlineFormat(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)\s]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const link = part.match(LINK_RE);
    if (link) {
      const [, label, href] = link;
      const cls = 'text-primary underline underline-offset-4 hover:opacity-80 transition-opacity break-words';
      return href.startsWith('/') ? (
        <Link key={i} href={href} className={cls}>{label}</Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="px-1.5 py-0.5 bg-card border border-border text-primary font-mono text-xs">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
