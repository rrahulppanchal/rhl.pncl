'use client';

import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useExternalRedirect, WHATSAPP_URL } from '@/lib/use-external-redirect';

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.59 5.385l.999 1.456-1.045 3.821 3.945-1.036zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    </svg>
  );
}

const navItems = [
  {
    path: '/',
    label: 'home',
    num: '01',
    desc: 'intro & overview',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    path: '/services',
    label: 'services',
    num: '02',
    desc: 'hire me · what i build',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    path: '/projects',
    label: 'projects',
    num: '03',
    desc: 'selected work',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <rect x="2" y="3" width="20" height="14" rx="0" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    path: '/blogs',
    label: 'blogs',
    num: '04',
    desc: 'thoughts & articles',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    path: '/contact',
    label: 'contact',
    num: '05',
    desc: 'get in touch',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="15" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XSocialIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { redirect, overlay } = useExternalRedirect();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {overlay}

      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 border border-border bg-background text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen z-50 lg:z-auto
          w-[21.6rem] lg:w-[19.2rem] flex flex-col
          border-r border-border bg-sidebar
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-primary/40 to-transparent" />
        </div>

        <div className="flex flex-col flex-1 min-h-0">

          {/* ── Profile Block ───────────────────────────────── */}
          <div className="px-6 pt-8 pb-6 border-b border-border/60">
            {/* Avatar monogram */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative shrink-0">
                <div className="w-12 h-12 border border-primary/50 bg-primary/5 flex items-center justify-center font-mono font-bold text-primary text-lg select-none">
                  RP
                </div>
                {/* Ping indicator */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-3 w-3 bg-primary" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href="/"
                  className="block text-base font-bold text-foreground font-mono hover:text-primary transition-colors leading-tight mb-1"
                >
                  Rahul Panchal
                </Link>
                <p className="text-[11px] text-muted-foreground font-mono leading-snug">
                  Senior Software Engineer
                </p>
                <p className="text-[10px] text-primary/80 font-mono leading-snug mt-0.5">
                  Automation Consultant
                </p>
              </div>
            </div>

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/25 bg-primary/5 text-xs font-mono text-primary/80">
              <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full shrink-0" />
              available for work
            </div>
          </div>

          {/* ── Navigation ──────────────────────────────────── */}
          <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-5">
            {/* Label */}
            <p className="px-3 mb-3 text-[11px] text-muted-foreground/80 font-mono uppercase tracking-widest">
              Navigation
            </p>

            <div className="space-y-0.5">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`
                      group relative flex items-center gap-3 px-3 py-3 text-sm font-mono
                      transition-all duration-200 overflow-hidden
                      ${active
                        ? 'text-primary bg-primary/8'
                        : 'text-foreground/80 hover:text-foreground hover:bg-white/3'
                      }
                    `}
                  >
                    {/* Active left bar */}
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-200 ${
                        active ? 'bg-primary' : 'bg-transparent group-hover:bg-border'
                      }`}
                    />

                    {/* Number */}
                    <span className={`text-[11px] font-mono shrink-0 transition-colors w-5 ${
                      active ? 'text-primary' : 'text-muted-foreground/70 group-hover:text-muted-foreground'
                    }`}>
                      {item.num}
                    </span>

                    {/* Icon */}
                    <span className={`shrink-0 transition-colors ${
                      active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      {item.icon}
                    </span>

                    {/* Label + sub-label */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`transition-colors ${active ? 'text-primary' : ''}`}>
                          {item.label}
                        </span>
                        {active && (
                          <span className="text-[10px] text-primary/70 font-mono">◀</span>
                        )}
                      </div>
                      <p className={`text-[11px] mt-0.5 transition-colors truncate ${
                        active ? 'text-primary/70' : 'text-muted-foreground/70 group-hover:text-muted-foreground'
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* ── Tech Stack Marquee ──────────────────────────── */}
          <div className="px-6 py-4 border-t border-border/60">
            <p className="text-[11px] text-muted-foreground/80 font-mono uppercase tracking-widest mb-3">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['NestJS', 'Node', 'Next.js', 'Python', 'FastAPI', 'LangChain', 'LangGraph', 'CrewAI', 'AWS', 'PostgreSQL', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 border border-border text-foreground/80 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ── Social + Footer ─────────────────────────────── */}
          <div className="px-6 py-5 border-t border-border/60">
            {/* Social row */}
            <div className="grid grid-cols-5 gap-1.5 mb-4">
              {[
                { href: 'https://github.com/rrahulppanchal',         label: 'GitHub',   Icon: GitHubIcon   },
                { href: 'https://in.linkedin.com/in/rrahulppanchal', label: 'LinkedIn', Icon: LinkedInIcon },
                { href: 'https://x.com/rrahulppanchal',              label: 'X',        Icon: XSocialIcon  },
                { href: WHATSAPP_URL,                                label: 'WhatsApp', Icon: WhatsAppIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  rel="noopener"
                  title={label}
                  aria-label={label}
                  onClick={redirect(href, label)}
                  className="group relative flex items-center justify-center h-11 border border-border/70 text-foreground/80 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-200 hover:shadow-md"
                >
                  <Icon />
                  <span className="absolute -bottom-px left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}

              {/* Email link (mailto — bypasses loader) */}
              <a
                href="mailto:rhl.pncl@gmail.com"
                title="Email"
                aria-label="Email"
                className="group relative flex items-center justify-center h-11 border border-border/70 text-foreground/80 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-200 hover:shadow-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square">
                  <rect x="2" y="4" width="20" height="16" />
                  <path d="m22 7-10 7L2 7" />
                </svg>
                <span className="absolute -bottom-px left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            {/* Footer text */}
            <div className="space-y-1.5">
              <p className="text-[12px] text-muted-foreground font-mono">
                © {new Date().getFullYear()} Rahul Panchal
              </p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary animate-pulse inline-block rounded-full" />
                <p className="text-[12px] text-foreground/80 font-mono">online · India</p>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}
