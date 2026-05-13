'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

type Pos = { x: number; y: number };

const ROUTES = [
  { path: '/',         label: 'home',     desc: 'intro & overview',    shortcut: 'g h' },
  { path: '/services', label: 'services', desc: 'hire me · what i build', shortcut: 'g s' },
  { path: '/projects', label: 'projects', desc: 'selected work',       shortcut: 'g p' },
  { path: '/blogs',    label: 'blogs',    desc: 'thoughts & articles', shortcut: 'g b' },
  { path: '/contact',  label: 'contact',  desc: 'get in touch',        shortcut: 'g c' },
] as const;

const MENU_W = 280;
const MENU_H = 320;

export function CustomContextMenu() {
  const pathname = usePathname();
  const router   = useRouter();
  const menuRef  = useRef<HTMLDivElement>(null);
  const [pos, setPos]         = useState<Pos | null>(null);
  const [focused, setFocused] = useState(0);

  const isAdmin = pathname.startsWith('/admin');

  const close = useCallback(() => setPos(null), []);

  useEffect(() => {
    if (isAdmin) return;

    const onContext = (e: MouseEvent) => {
      // Shift = escape hatch → native menu
      if (e.shiftKey) return;
      e.preventDefault();

      const x = Math.min(e.clientX, window.innerWidth  - MENU_W - 8);
      const y = Math.min(e.clientY, window.innerHeight - MENU_H - 8);
      setPos({ x: Math.max(8, x), y: Math.max(8, y) });
      setFocused(0);
    };

    document.addEventListener('contextmenu', onContext);
    return () => document.removeEventListener('contextmenu', onContext);
  }, [isAdmin]);

  useEffect(() => {
    if (!pos) return;

    const onClick   = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) close();
    };
    const onScroll  = () => close();
    const onResize  = () => close();
    const onKey     = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocused(i => (i + 1) % ROUTES.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocused(i => (i - 1 + ROUTES.length) % ROUTES.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        router.push(ROUTES[focused].path);
        close();
      }
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKey);
    };
  }, [pos, focused, router, close]);

  if (isAdmin || !pos) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Site navigation context menu"
      style={{ top: pos.y, left: pos.x, width: MENU_W }}
      className="fixed z-[110] border border-primary/40 bg-background/95 backdrop-blur-sm font-mono text-sm popup-enter"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 border-b border-border bg-card"
        style={{ boxShadow: 'inset 0 -1px 0 hsl(135.2941 100% 50% / 0.10)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">nav.menu</span>
        <span className="ml-auto text-[10px] text-muted-foreground/50">shift+rmb → browser</span>
      </div>

      <ul className="py-1">
        {ROUTES.map((r, i) => {
          const isCurrent = pathname === r.path;
          const isFocus   = i === focused;
          return (
            <li key={r.path} role="none">
              <Link
                role="menuitem"
                href={r.path}
                onMouseEnter={() => setFocused(i)}
                onClick={close}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors outline-none ${
                  isFocus
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                }`}
              >
                <span className={`text-[10px] w-5 ${isCurrent ? 'text-primary' : 'text-muted-foreground/40'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1">
                  <span className="block text-sm">{r.label}</span>
                  <span className={`block text-[10px] truncate ${isFocus ? 'text-primary/60' : 'text-muted-foreground/40'}`}>
                    {r.desc}
                  </span>
                </span>
                {isCurrent ? (
                  <span className="text-[10px] text-primary/60">◀ active</span>
                ) : (
                  <span className="text-[10px] text-muted-foreground/30">{r.shortcut}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="px-3 py-2 border-t border-border text-[10px] text-muted-foreground/50 flex items-center justify-between">
        <span><span className="text-primary">↑↓</span> nav · <span className="text-primary">↵</span> open</span>
        <span><span className="text-primary">esc</span> close</span>
      </div>
    </div>
  );
}
