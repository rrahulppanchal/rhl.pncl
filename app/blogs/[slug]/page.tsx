import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readDB } from '@/lib/db';
import { Sidebar } from '@/components/sidebar';
import { SITE_URL } from '@/lib/site';
import type { Blog } from '@/types/blog';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const db = readDB();
  return db.blogs
    .filter(b => b.published)
    .map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const db = readDB();
  const blog = db.blogs.find(b => b.slug === slug);
  if (!blog) return {};

  const url = `${SITE_URL}/blogs/${blog.slug}`;
  const isoDate = new Date(blog.date);
  const publishedTime = isNaN(isoDate.getTime()) ? undefined : isoDate.toISOString();

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.tags,
    alternates: { canonical: `/blogs/${blog.slug}` },
    openGraph: {
      type: 'article',
      url,
      title: blog.title,
      description: blog.description,
      siteName: 'Rahul Panchal',
      publishedTime,
      authors: ['Rahul Panchal'],
      tags: blog.tags,
      section: blog.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      creator: '@rrahulppanchal',
    },
  };
}

// Very minimal markdown renderer (no extra dependencies)
function renderMarkdown(content: string): React.ReactNode[] {
  const blocks = content.split(/\n\n+/);

  return blocks.map((block, i) => {
    // Fenced code block
    if (block.startsWith('```')) {
      const lines = block.split('\n');
      const code = lines.slice(1, lines.length - 1).join('\n');
      return (
        <pre key={i} className="bg-card border border-border p-4 overflow-x-auto my-6 text-xs font-mono text-foreground leading-relaxed">
          <code>{code}</code>
        </pre>
      );
    }

    // Headings
    if (block.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-foreground font-mono mt-8 mb-3">{block.slice(4)}</h3>;
    if (block.startsWith('## '))  return <h2 key={i} className="text-xl font-bold text-foreground font-mono mt-10 mb-4 glow-text">{block.slice(3)}</h2>;
    if (block.startsWith('# '))   return <h1 key={i} className="text-2xl font-bold text-foreground font-mono mt-10 mb-4">{block.slice(2)}</h1>;

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

// Handle **bold** and `inline code` inline
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

const categoryColors: Record<string, string> = {
  'Web Development': 'text-primary border-primary/30 bg-primary/5',
  'AI/ML':          'text-purple-400 border-purple-400/30 bg-purple-400/5',
  'Database':       'text-blue-400 border-blue-400/30 bg-blue-400/5',
  'TypeScript':     'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',
  'DevOps':         'text-orange-400 border-orange-400/30 bg-orange-400/5',
  'React':          'text-sky-400 border-sky-400/30 bg-sky-400/5',
  'Backend':        'text-amber-400 border-amber-400/30 bg-amber-400/5',
  'Testing':        'text-rose-400 border-rose-400/30 bg-rose-400/5',
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const db = readDB();
  const blog = db.blogs.find(b => b.slug === slug && b.published) as Blog | undefined;

  if (!blog) notFound();

  // Adjacent posts for prev/next navigation
  const published = db.blogs.filter(b => b.published);
  const idx = published.findIndex(b => b.slug === slug);
  const prev = published[idx + 1] ?? null;
  const next = published[idx - 1] ?? null;

  const url = `${SITE_URL}/blogs/${blog.slug}`;
  const isoDate = new Date(blog.date);
  const datePublished = isNaN(isoDate.getTime()) ? undefined : isoDate.toISOString();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: blog.title,
    description: blog.description,
    keywords: blog.tags.join(', '),
    articleSection: blog.category,
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: 'Rahul Panchal',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Rahul Panchal',
      url: SITE_URL,
    },
    url,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE_URL}/blogs` },
      { '@type': 'ListItem', position: 3, name: blog.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-8 lg:px-16 pt-20 pb-20 lg:py-20 max-w-3xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-10">
            <Link href="/blogs" className="hover:text-primary transition-colors">blogs</Link>
            <span className="text-muted-foreground/30">/</span>
            <span className="text-foreground truncate">{blog.slug}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs px-2 py-0.5 border font-mono ${categoryColors[blog.category] ?? 'text-primary border-primary/30'}`}>
                {blog.category}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-mono leading-tight mb-4 glow-text">
              {blog.title}
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {blog.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono pb-6 border-b border-border">
              <span>{blog.date}</span>
              <span className="text-muted-foreground/30">•</span>
              <span>{blog.readTime} read</span>
              <span className="text-muted-foreground/30">•</span>
              <span className="text-primary">Rahul Panchal</span>
            </div>
          </header>

          {/* Content */}
          <article className="mb-16">
            {renderMarkdown(blog.content)}
          </article>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 pt-6 border-t border-border">
              {blog.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 border border-border text-muted-foreground font-mono hover:border-primary hover:text-primary transition-colors cursor">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Prev / Next navigation */}
          <nav className="grid grid-cols-2 gap-4 border-t border-border pt-8">
            {prev ? (
              <Link href={`/blogs/${prev.slug}`} className="group p-4 border border-border hover:border-primary transition-all">
                <p className="text-xs text-muted-foreground font-mono mb-2">← previous</p>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">{prev.title}</p>
              </Link>
            ) : <div />}

            {next ? (
              <Link href={`/blogs/${next.slug}`} className="group p-4 border border-border hover:border-primary transition-all text-right ml-auto w-full">
                <p className="text-xs text-muted-foreground font-mono mb-2">next →</p>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">{next.title}</p>
              </Link>
            ) : <div />}
          </nav>

        </main>
      </div>
    </div>
  );
}
