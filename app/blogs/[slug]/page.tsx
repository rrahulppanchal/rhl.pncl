import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readDB } from '@/lib/db';
import { Sidebar } from '@/components/sidebar';
import { SITE_URL } from '@/lib/site';
import { renderMarkdown } from '@/lib/markdown';
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

  const description = blog.seoDescription ?? blog.description;

  return {
    title: blog.seoTitle ? { absolute: blog.seoTitle } : blog.title,
    description,
    keywords: blog.tags,
    alternates: { canonical: `/blogs/${blog.slug}` },
    openGraph: {
      type: 'article',
      url,
      title: blog.seoTitle ?? blog.title,
      description,
      siteName: 'Rahul Panchal',
      publishedTime,
      authors: ['Rahul Panchal'],
      tags: blog.tags,
      section: blog.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.seoTitle ?? blog.title,
      description,
      creator: '@rrahulppanchal',
    },
  };
}

const categoryColors: Record<string, string> = {
  'Case Studies':   'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
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
      { '@type': 'ListItem', position: 2, name: 'Writing', item: `${SITE_URL}/blogs` },
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
