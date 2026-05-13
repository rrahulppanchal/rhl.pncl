'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TerminalLoader } from './terminal-loader';

const STATIC: Record<string, string> = {
  '/':         'HOME',
  '/services': 'SERVICES',
  '/blogs':    'BLOGS',
  '/projects': 'PROJECTS',
  '/contact':  'CONTACT',
};

function resolveName(path: string): string {
  if (STATIC[path]) return STATIC[path];
  if (path.startsWith('/admin'))       return 'ADMIN';
  if (path.startsWith('/blogs/'))      return 'BLOG POST';
  if (path.startsWith('/projects/'))   return 'PROJECT';
  return 'PAGE';
}

const SHOW_MS = 2500;
const FADE_MS = 350;

export function RouteLoaderOverlay() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [active, setActive]   = useState(!isAdmin);
  const [exiting, setExiting] = useState(false);
  const [name, setName]       = useState(() => resolveName(pathname));

  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      setActive(false);
      return;
    }
    setName(resolveName(pathname));
    setActive(true);
    setExiting(false);

    const startExit = window.setTimeout(() => setExiting(true), SHOW_MS - FADE_MS);
    const unmount   = window.setTimeout(() => setActive(false), SHOW_MS);

    return () => {
      window.clearTimeout(startExit);
      window.clearTimeout(unmount);
    };
  }, [pathname]);

  if (!active) return null;

  return (
    <div
      aria-hidden={exiting}
      className={`fixed inset-0 z-[100] bg-background transition-opacity ease-out ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <TerminalLoader pageName={name} />
    </div>
  );
}
