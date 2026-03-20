'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Terminal chrome */}
        <div className="border border-border">
          <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
            <span className="text-xs text-muted-foreground font-mono ml-3">auth.sh — admin</span>
          </div>

          <div className="p-8">
            {/* Logo */}
            <div className="mb-8 text-center">
              <p className="text-2xl font-bold font-mono glow-text">
                <span className="text-primary">&lt;</span>
                Rahul
                <span className="text-primary">/&gt;</span>
              </p>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                admin access required
              </p>
            </div>

            {/* Terminal prompt line */}
            <p className="text-xs font-mono text-muted-foreground mb-6">
              <span className="text-primary">$</span> sudo login --portal admin
            </p>

            {error && (
              <div className="mb-5 p-3 border border-destructive/40 bg-destructive/5 text-destructive text-xs font-mono">
                <span className="text-destructive">✗ </span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-muted-foreground font-mono mb-2">
                  {'/* '}username{' */'}
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                  required
                  placeholder="username"
                  autoComplete="username"
                  className="w-full bg-input border border-border text-foreground px-4 py-3 focus:border-l-2 focus:border-primary focus:outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/40"
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground font-mono mb-2">
                  {'/* '}password{' */'}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-input border border-border text-foreground px-4 py-3 focus:border-l-2 focus:border-primary focus:outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/40"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 font-mono text-sm hover:opacity-90 transition-all disabled:opacity-50 group flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span>Authenticating<span className="animate-[blink_1s_step-end_infinite]">...</span></span>
                ) : (
                  <>
                    Login
                    <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground/40 font-mono mt-4">
          restricted area • unauthorised access prohibited
        </p>
      </div>
    </div>
  );
}
