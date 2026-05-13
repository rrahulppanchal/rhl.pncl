import type { Metadata } from 'next';
import { readDB } from '@/lib/db';
import { Sidebar } from '@/components/sidebar';
import { BlogsList } from '@/components/blogs-list';

export const metadata: Metadata = {
  title: 'Blog — Web Dev, System Design & AI Notes',
  description:
    'Articles on Node.js, NestJS, system design, AI integration with LangChain & RAG, and full-stack engineering best practices by Rahul Panchal.',
  alternates: { canonical: '/blogs' },
  openGraph: {
    type: 'website',
    url: '/blogs',
    title: 'Blog — Rahul Panchal',
    description:
      'Articles on Node.js, NestJS, system design, AI integration with LangChain & RAG, and full-stack engineering best practices.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Rahul Panchal',
    description:
      'Articles on Node.js, NestJS, system design, AI integration, and full-stack engineering best practices.',
  },
};

export default function BlogsPage() {
  const db = readDB();
  const blogs = db.blogs.filter(b => b.published);
  const categories = Array.from(new Set(blogs.map(b => b.category)));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-8 lg:px-16 pt-20 pb-20 lg:py-20 max-w-4xl">

          {/* Header */}
          <section className="mb-12">
            <p className="text-muted-foreground text-sm mb-4 font-mono">
              <span className="text-primary">{'>'}</span> Thoughts and Insights
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono glow-text glitch-hover">
              Blog
              <span className="terminal-cursor" />
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Articles on web development, system design, AI integration, and engineering best practices.
            </p>
          </section>

          {/* Interactive list — client component */}
          <BlogsList blogs={blogs} categories={categories} />

        </main>
      </div>
    </div>
  );
}
