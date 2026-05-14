'use client';

import { useEffect, useState } from 'react';

type Theme = 'terminal' | 'light' | 'dark';
const STORAGE_KEY = 'rhl.theme';

function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === 'terminal') {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = t;
  }
  try {
    localStorage.setItem(STORAGE_KEY, t);
  } catch {
    /* ignore */
  }
}

const OPTIONS: { value: Theme; label: string; hint: string }[] = [
  { value: 'terminal', label: 'term',  hint: 'matrix' },
  { value: 'light',    label: 'light', hint: 'normal'  },
  { value: 'dark',     label: 'dark',  hint: 'normal'  },
];

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('terminal');

  useEffect(() => {
    let stored: Theme = 'terminal';
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === 'light' || raw === 'dark' || raw === 'terminal') stored = raw;
    } catch {
      /* ignore */
    }
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const pick = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
  };

  return (
    <div className="px-6 py-4 border-t border-border/60">
      <p className="text-[11px] text-muted-foreground/80 font-mono uppercase tracking-widest mb-3">
        Theme
      </p>
      <div className="grid grid-cols-3 gap-1.5">
        {OPTIONS.map((o) => {
          const active = theme === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => pick(o.value)}
              aria-pressed={active}
              title={`${o.label} (${o.hint})`}
              className={`text-[11px] font-mono px-2 py-1.5 border transition-colors ${
                active
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
