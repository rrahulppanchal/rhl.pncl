'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import type { Project, ProjectStatus } from '@/types/project';

const STATUSES: ProjectStatus[] = ['Completed', 'In Progress', 'Planning', 'Concept'];

const statusStyles: Record<string, string> = {
  'Completed':   'text-primary border-primary/40 bg-primary/5',
  'In Progress': 'text-amber-400 border-amber-400/40 bg-amber-400/5',
  'Planning':    'text-blue-400 border-blue-400/40 bg-blue-400/5',
  'Concept':     'text-muted-foreground border-border',
};

const inputClass = 'w-full bg-input border border-border text-foreground px-4 py-3 focus:border-l-2 focus:border-primary focus:outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/40';
const labelClass = 'block text-xs text-muted-foreground font-mono mb-2';

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Project | null>(null);
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setForm)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return (
    <div className="min-h-screen bg-background flex items-center justify-center font-mono text-muted-foreground">
      Project not found. <Link href="/admin/dashboard" className="text-primary ml-2 hover:underline">← Back</Link>
    </div>
  );

  if (!form) return (
    <div className="min-h-screen bg-background flex items-center justify-center font-mono text-muted-foreground">
      <span className="text-primary animate-[blink_1s_step-end_infinite]">▋</span>&nbsp;Loading...
    </div>
  );

  const set = <K extends keyof Project>(key: K, value: Project[K]) =>
    setForm(prev => prev ? { ...prev, [key]: value } : prev);

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.tech.includes(t)) set('tech', [...form.tech, t]);
    setTechInput('');
  };
  const removeTech = (t: string) => set('tech', form.tech.filter(x => x !== t));

  const handleSave = async (overrides?: Partial<Project>) => {
    setSaving(true);
    await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, ...overrides }),
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
            <span className="text-foreground truncate max-w-[180px]">{form.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {form.published ? (
              <button disabled={saving} onClick={() => handleSave({ published: false })} className="px-4 py-2 text-xs font-mono border border-border text-muted-foreground hover:border-amber-400/50 hover:text-amber-400 transition-all disabled:opacity-50">
                Unpublish
              </button>
            ) : (
              <button disabled={saving} onClick={() => handleSave({ published: true })} className="px-4 py-2 text-xs font-mono border border-primary/30 text-primary hover:bg-primary/5 transition-all disabled:opacity-50">
                Publish
              </button>
            )}
            <button disabled={saving} onClick={() => handleSave()} className="px-4 py-2 text-xs font-mono bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
              {saving ? 'Saving...' : 'Save →'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold font-mono glow-text">
            <span className="text-primary">//</span> Edit Project
          </h1>
          <span className={`text-xs px-2.5 py-1 border font-mono ${statusStyles[form.status] ?? statusStyles['Concept']}`}>
            {form.status}
          </span>
          <span className={`text-xs px-2.5 py-1 border font-mono ml-auto ${form.published ? 'text-primary border-primary/40 bg-primary/5' : 'text-muted-foreground border-border'}`}>
            {form.published ? '● live' : '○ draft'}
          </span>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className={labelClass}>{'/* '}name{' */'}</label>
            <input type="text" value={form.name} onChange={e => set('name', e.target.value)} className={`${inputClass} text-lg`} />
          </div>

          {/* Slug */}
          <div>
            <label className={labelClass}>{'/* '}slug{' */'}</label>
            <input type="text" value={form.slug} onChange={e => set('slug', e.target.value)} className={inputClass} />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>{'/* '}description{' */'}</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{'/* '}year{' */'}</label>
              <input type="text" value={form.year} onChange={e => set('year', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{'/* '}status{' */'}</label>
              <select value={form.status} onChange={e => set('status', e.target.value as ProjectStatus)} className={inputClass} style={{ appearance: 'none' }}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{'/* '}live_link{' */'}</label>
              <input type="url" value={form.link} onChange={e => set('link', e.target.value)} placeholder="https://..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{'/* '}github_link{' */'}</label>
              <input type="url" value={form.github} onChange={e => set('github', e.target.value)} placeholder="https://github.com/..." className={inputClass} />
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
              rows={22}
              className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-col sm:flex-row gap-6 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
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
        </div>
      </main>
    </div>
  );
}
