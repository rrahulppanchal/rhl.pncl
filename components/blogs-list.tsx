'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import type { Blog } from '@/types/blog';
import { NewsletterForm } from './newsletter-form';

const POSTS_PER_PAGE = 5;

const categoryColors: Record<string, { pill: string; dot: string }> = {
  'Web Development': { pill: 'text-primary border-primary/30 bg-primary/5',         dot: 'bg-primary' },
  'AI/ML':           { pill: 'text-purple-400 border-purple-400/30 bg-purple-400/5', dot: 'bg-purple-400' },
  'Database':        { pill: 'text-blue-400 border-blue-400/30 bg-blue-400/5',       dot: 'bg-blue-400' },
  'TypeScript':      { pill: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',       dot: 'bg-cyan-400' },
  'DevOps':          { pill: 'text-orange-400 border-orange-400/30 bg-orange-400/5', dot: 'bg-orange-400' },
  'React':           { pill: 'text-sky-400 border-sky-400/30 bg-sky-400/5',          dot: 'bg-sky-400' },
  'Backend':         { pill: 'text-amber-400 border-amber-400/30 bg-amber-400/5',    dot: 'bg-amber-400' },
  'Testing':         { pill: 'text-rose-400 border-rose-400/30 bg-rose-400/5',       dot: 'bg-rose-400' },
};

function catColor(cat: string) {
  return categoryColors[cat] ?? { pill: 'text-primary border-primary/30 bg-primary/5', dot: 'bg-primary' };
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/** Build a compact page-number list like: 1 2 … 5 6 7 … 12 */
function buildPageRange(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '…')[] = [];

  const addRange = (from: number, to: number) => {
    for (let i = from; i <= to; i++) pages.push(i);
  };

  if (current <= 4) {
    addRange(1, 5);
    pages.push('…');
    pages.push(total);
  } else if (current >= total - 3) {
    pages.push(1);
    pages.push('…');
    addRange(total - 4, total);
  } else {
    pages.push(1);
    pages.push('…');
    addRange(current - 1, current + 1);
    pages.push('…');
    pages.push(total);
  }

  return pages;
}

interface BlogsListProps {
  blogs: Blog[];
  categories: string[];
}

export function BlogsList({ blogs, categories }: BlogsListProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const listTopRef = useRef<HTMLDivElement>(null);

  // Count per category (over all posts, not filtered)
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: blogs.length };
    categories.forEach(cat => { c[cat] = blogs.filter(b => b.category === cat).length; });
    return c;
  }, [blogs, categories]);

  // All filtered posts (before paging)
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return blogs.filter(b => {
      const matchesCat = activeCategory === 'All' || b.category === activeCategory;
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q)) ||
        b.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [blogs, activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);

  // Paginated slice
  const paginated = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    return filtered.slice(start, start + POSTS_PER_PAGE);
  }, [filtered, page]);

  const [featured, ...rest] = paginated;
  const isFirstPage = page === 1;
  const hasResults = filtered.length > 0;

  // Reset page + re-animate when filter/search changes
  const resetPaging = (newCat: string, newSearch: string) => {
    setPage(1);
    setAnimKey(k => k + 1);
    setActiveCategory(newCat);
    setSearch(newSearch);
  };

  const handleCategoryChange = (cat: string) => resetPaging(cat, search);
  const handleSearchChange   = (v: string)   => resetPaging(activeCategory, v);

  const goToPage = (p: number) => {
    setPage(p);
    setAnimKey(k => k + 1);
    // Smooth-scroll to top of list
    setTimeout(() => {
      listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Press "/" to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const pageRange = buildPageRange(page, totalPages);

  return (
    <div className="space-y-10">

      {/* ── Search ── */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <SearchIcon />
        </span>
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={e => handleSearchChange(e.target.value)}
          placeholder="Search articles... (press / to focus)"
          className="w-full bg-input border border-border text-foreground pl-10 pr-10 py-3 focus:border-primary focus:border-l-2 focus:outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/40"
        />
        {search ? (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            <CloseIcon />
          </button>
        ) : (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 text-xs font-mono pointer-events-none">
            /
          </span>
        )}
      </div>

      {/* ── Category Filters ── */}
      <div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono transition-all border ${
              activeCategory === 'All'
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'border-border text-muted-foreground hover:border-primary hover:text-foreground hover:bg-primary/5'
            }`}
          >
            All
            <span className={`text-[10px] px-1.5 py-0.5 ${
              activeCategory === 'All' ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
            }`}>
              {counts['All']}
            </span>
          </button>

          {categories.map(cat => {
            const isActive = activeCategory === cat;
            const { dot } = catColor(cat);
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-mono transition-all border ${
                  isActive
                    ? 'border-primary bg-primary/10 text-primary shadow-sm'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-primary/5'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                {cat}
                <span className={`text-[10px] px-1.5 py-0.5 ${
                  isActive ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground/60'
                }`}>
                  {counts[cat] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result count + clear */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
          <p className="text-xs font-mono text-muted-foreground">
            <span className="text-primary">{'>'}</span>{' '}
            {hasResults ? (
              <>
                showing{' '}
                <span className="text-foreground">
                  {(page - 1) * POSTS_PER_PAGE + 1}–{Math.min(page * POSTS_PER_PAGE, filtered.length)}
                </span>{' '}
                of <span className="text-foreground">{filtered.length}</span> posts
                {totalPages > 1 && (
                  <> · page <span className="text-foreground">{page}</span> of <span className="text-foreground">{totalPages}</span></>
                )}
              </>
            ) : (
              'no posts match your query'
            )}
            {activeCategory !== 'All' && <> in <span className="text-primary">{activeCategory}</span></>}
            {search && <> for <span className="text-primary">"{search}"</span></>}
          </p>

          {(activeCategory !== 'All' || search) && (
            <button
              onClick={() => resetPaging('All', '')}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <CloseIcon /> clear
            </button>
          )}
        </div>
      </div>

      {/* ── Posts ── */}
      <div ref={listTopRef} style={{ scrollMarginTop: '80px' }}>
        {!hasResults ? (
          <div className="border border-border p-12 text-center">
            <p className="text-muted-foreground font-mono text-sm mb-2">
              <span className="text-primary">$ </span>
              find . -name &quot;{search || activeCategory}&quot;
            </p>
            <p className="text-muted-foreground/50 text-xs font-mono">
              no results — try a different search or category
            </p>
            <button
              onClick={() => resetPaging('All', '')}
              className="mt-4 text-xs text-primary font-mono hover:underline"
            >
              → clear filters
            </button>
          </div>
        ) : (
          <div key={animKey}>
            {/* Featured — only first slot on every page gets the big card */}
            {featured && (
              <div className="mb-6">
                {isFirstPage && !search && activeCategory === 'All' && (
                  <p className="text-xs text-muted-foreground font-mono mb-3">
                    <span className="text-primary">{'>'}</span> featured
                  </p>
                )}
                <Link href={`/blogs/${featured.slug}`}>
                  <article
                    className="border border-primary/30 bg-card/20 p-8 hover:border-primary hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
                    style={{ animation: 'fadeInUp 0.35s ease forwards' }}
                  >
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(135.2941 100% 50% / 0.012) 2px, hsl(135.2941 100% 50% / 0.012) 4px)' }}
                    />
                    <div className="relative">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-xs px-2 py-0.5 border font-mono flex items-center gap-1.5 ${catColor(featured.category).pill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${catColor(featured.category).dot}`} />
                          {featured.category}
                        </span>
                        <span className="text-primary text-sm font-mono transition-transform group-hover:translate-x-1 inline-block">→</span>
                      </div>
                      <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 font-mono">
                        {featured.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-5 text-sm">{featured.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                        <span className="text-muted-foreground">{featured.date}</span>
                        <span className="text-muted-foreground/30">•</span>
                        <span className="text-muted-foreground">{featured.readTime} read</span>
                        <div className="flex gap-1.5 ml-auto">
                          {featured.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 border border-border text-muted-foreground/60">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {/* List posts */}
            {rest.length > 0 && (
              <div className="space-y-1">
                {rest.map((blog, idx) => (
                  <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                    <article
                      className="group relative border border-transparent hover:border-border/60 hover:bg-card/15 transition-all cursor-pointer overflow-hidden"
                      style={{ animation: `fadeInUp 0.35s ease ${(idx + 1) * 0.06}s forwards`, opacity: 0 }}
                    >
                      <div className="absolute bottom-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
                      <div className="px-5 py-4 flex items-start gap-5">
                        <span className="text-xs text-muted-foreground/30 font-mono pt-0.5 shrink-0 w-6 text-right">
                          {String((page - 1) * POSTS_PER_PAGE + idx + 2).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                              {blog.title}
                            </h3>
                            <span className="text-primary text-sm font-mono shrink-0 transition-transform group-hover:translate-x-1 inline-block mt-0.5">→</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5 line-clamp-2">{blog.description}</p>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className={`text-[10px] px-2 py-0.5 border font-mono flex items-center gap-1 ${catColor(blog.category).pill}`}>
                              <span className={`w-1 h-1 rounded-full ${catColor(blog.category).dot}`} />
                              {blog.category}
                            </span>
                            <span className="text-[10px] text-muted-foreground/50 font-mono">{blog.date}</span>
                            <span className="text-[10px] text-muted-foreground/50 font-mono">{blog.readTime} read</span>
                            <div className="hidden sm:flex gap-1 ml-auto">
                              {blog.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-primary/5 border border-primary/10 text-primary/60 font-mono">{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <nav aria-label="Blog pagination" className="pt-2">
          {/* Terminal chrome header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-card border border-b-0 border-border">
            <span className="text-[10px] text-muted-foreground font-mono">
              <span className="text-primary">//</span> paginate
            </span>
            <span className="ml-auto text-[10px] text-muted-foreground/40 font-mono">
              {POSTS_PER_PAGE} per page
            </span>
          </div>

          <div className="border border-border px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Prev */}
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="flex items-center gap-2 text-xs font-mono px-4 py-2 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-muted-foreground group"
            >
              <span className="transition-transform group-hover:-translate-x-1 inline-block">←</span>
              prev
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {pageRange.map((p, i) =>
                p === '…' ? (
                  <span key={`ellipsis-${i}`} className="w-8 text-center text-xs text-muted-foreground/40 font-mono">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    aria-current={p === page ? 'page' : undefined}
                    className={`w-9 h-9 text-xs font-mono transition-all border ${
                      p === page
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {String(p).padStart(2, '0')}
                  </button>
                )
              )}
            </div>

            {/* Next */}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="flex items-center gap-2 text-xs font-mono px-4 py-2 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-muted-foreground group"
            >
              next
              <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
            </button>
          </div>
        </nav>
      )}

      {/* ── Newsletter ── */}
      <NewsletterForm />

    </div>
  );
}
