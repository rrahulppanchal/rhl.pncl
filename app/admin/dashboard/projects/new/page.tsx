'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Project, ProjectStatus } from '@/types/project';

const STATUSES: ProjectStatus[] = ['Completed', 'In Progress', 'Planning', 'Concept'];

const inputClass = 'w-full bg-input border border-border text-foreground px-4 py-3 focus:border-l-2 focus:border-primary focus:outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/40';
const labelClass = 'block text-xs text-muted-foreground font-mono mb-2';

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [form, setForm] = useState<Omit<Project, 'id'>>({
    slug: '',
    name: '',
    description: '',
    content: '',
    tech: [],
    year: String(new Date().getFullYear()),
    link: '',
    github: '',
    status: 'Planning',
    featured: false,
    published: false,
  });

  const set = <K extends keyof typeof form>(key: K, value: typeof form[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleNameChange = (v: string) => {
    set('name', v);
    set('slug', slugify(v) as typeof form['slug']);
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.tech.includes(t)) set('tech', [...form.tech, t]);
    setTechInput('');
  };
  const removeTech = (t: string) => set('tech', form.tech.filter(x => x !== t));

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, published: publish }),
    });
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 bg-sidebar sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm font-mono">
            <Link href="/admin/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              ← Dashboard
            </Link>
            <span className="text-muted-foreground/30">/</span>
            <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" onClick={() => router.push('/admin/dashboard')}>
              projects
            </span>
            <span className="text-muted-foreground/30">/</span>
            <span className="text-foreground">New Project</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={saving}
              onClick={() => handleSave(false)}
              className="px-4 py-2 text-xs font-mono border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              disabled={saving}
              onClick={() => handleSave(true)}
              className="px-4 py-2 text-xs font-mono bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Publish →'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold font-mono mb-8 glow-text">
          <span className="text-primary">//</span> New Project
        </h1>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className={labelClass}>{'/* '}name{' */'}</label>
            <input
              type="text"
              value={form.name}
              onChange={e => handleNameChange(e.target.value)}
              required
              placeholder="Project name"
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
              placeholder="project-url-slug"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>{'/* '}description{' */'}</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
              placeholder="Short description shown on the projects page..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{'/* '}year{' */'}</label>
              <input
                type="text"
                value={form.year}
                onChange={e => set('year', e.target.value)}
                placeholder="2026"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{'/* '}status{' */'}</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value as ProjectStatus)}
                className={inputClass}
                style={{ appearance: 'none' }}
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{'/* '}live_link{' */'}</label>
              <input
                type="url"
                value={form.link}
                onChange={e => set('link', e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{'/* '}github_link{' */'}</label>
              <input
                type="url"
                value={form.github}
                onChange={e => set('github', e.target.value)}
                placeholder="https://github.com/..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <label className={labelClass}>{'/* '}tech_stack{' */'}</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tech.map(t => (
                <span key={t} className="flex items-center gap-1 text-xs px-2 py-1 border border-primary/30 text-primary font-mono">
                  {t}
                  <button type="button" onClick={() => removeTech(t)} className="hover:text-destructive ml-1">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                placeholder="Add technology and press Enter"
                className={`${inputClass} flex-1`}
              />
              <button type="button" onClick={addTech} className="px-4 border border-border text-muted-foreground hover:border-primary hover:text-primary text-sm font-mono transition-colors">
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
              rows={20}
              placeholder="## Overview&#10;&#10;Describe your project in detail using markdown...&#10;&#10;## Key Features&#10;&#10;- Feature one&#10;- Feature two"
              className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <button
                type="button"
                onClick={() => set('featured', !form.featured)}
                className={`w-10 h-5 border transition-colors relative ${form.featured ? 'bg-primary border-primary' : 'bg-input border-border'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-background transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                {'/* '}featured on homepage{' */'}
              </span>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}
