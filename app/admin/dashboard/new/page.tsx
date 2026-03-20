'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Blog } from '@/types/blog';

const CATEGORIES = ['Web Development', 'AI/ML', 'Database', 'TypeScript', 'DevOps', 'React', 'Backend', 'Testing', 'Other'];

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const inputClass = 'w-full bg-input border border-border text-foreground px-4 py-3 focus:border-l-2 focus:border-primary focus:outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/40';
const labelClass = 'block text-xs text-muted-foreground font-mono mb-2';

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Omit<Blog, 'id'>>({
    slug: '',
    title: '',
    description: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min',
    category: 'Web Development',
    tags: [],
    published: false,
    featured: false,
  });
  const [tagInput, setTagInput] = useState('');

  const set = (key: keyof typeof form, value: unknown) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleTitleChange = (v: string) => {
    set('title', v);
    set('slug', slugify(v));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      set('tags', [...form.tags, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => set('tags', form.tags.filter(t => t !== tag));

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setSaving(true);

    await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, published: publish }),
    });

    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-border px-6 py-4 bg-sidebar sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm font-mono">
            <Link href="/admin/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              ← Dashboard
            </Link>
            <span className="text-muted-foreground/30">/</span>
            <span className="text-foreground">New Post</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              form="post-form"
              type="submit"
              name="action"
              value="draft"
              disabled={saving}
              onClick={e => handleSubmit(e, false)}
              className="px-4 py-2 text-xs font-mono border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              form="post-form"
              type="submit"
              name="action"
              value="publish"
              disabled={saving}
              onClick={e => handleSubmit(e, true)}
              className="px-4 py-2 text-xs font-mono bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Publish →'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold font-mono mb-8 glow-text">
          <span className="text-primary">//</span> New Post
        </h1>

        <form id="post-form" onSubmit={e => e.preventDefault()} className="space-y-6">
          {/* Title */}
          <div>
            <label className={labelClass}>{'/* '}title{' */'}</label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              required
              placeholder="Post title"
              className={`${inputClass} text-lg`}
            />
          </div>

          {/* Slug */}
          <div>
            <label className={labelClass}>{'/* '}slug{' */'}</label>
            <input
              type="text"
              value={form.slug}
              onChange={e => set('slug', e.target.value)}
              required
              placeholder="post-url-slug"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>{'/* '}description{' */'}</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              required
              rows={2}
              placeholder="Short summary shown in listings..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>{'/* '}date{' */'}</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{'/* '}read_time{' */'}</label>
              <input
                type="text"
                value={form.readTime}
                onChange={e => set('readTime', e.target.value)}
                placeholder="10 min"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{'/* '}category{' */'}</label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className={inputClass}
                style={{ appearance: 'none' }}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className={labelClass}>{'/* '}tags{' */'}</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {form.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs px-2 py-1 border border-primary/30 text-primary font-mono">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive ml-1">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                placeholder="Add tag and press Enter"
                className={`${inputClass} flex-1`}
              />
              <button type="button" onClick={addTag} className="px-4 border border-border text-muted-foreground hover:border-primary hover:text-primary text-sm font-mono transition-colors">
                Add
              </button>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className={labelClass}>
              {'/* '}content — markdown supported{' */'}
            </label>
            <textarea
              value={form.content}
              onChange={e => set('content', e.target.value)}
              required
              rows={20}
              placeholder="## Introduction&#10;&#10;Write your blog post here using markdown...&#10;&#10;## Section&#10;&#10;Content..."
              className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
            />
          </div>

          {/* Featured toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <button
                type="button"
                onClick={() => set('featured', !form.featured)}
                className={`w-10 h-5 border transition-colors relative shrink-0 ${form.featured ? 'bg-primary border-primary' : 'bg-input border-border'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-background transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                {'/* '}featured on homepage{' */'}
              </span>
            </label>
          </div>
        </form>
      </main>
    </div>
  );
}
