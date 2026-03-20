'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden lg:flex w-64 border-r border-border flex-col p-12 sticky top-0 h-screen bg-background">
      <Link href="/" className="text-2xl font-bold text-foreground mb-16 font-mono hover:text-primary transition-colors">
        <span className="text-primary">&lt;</span>
        <span>Rahul</span>
        <span className="text-primary">/&gt;</span>
      </Link>
      
      <nav className="space-y-2 flex-1">
        {[
          { path: '/', label: 'home' },
          { path: '/projects', label: 'projects' },
          { path: '/blogs', label: 'blogs' },
          { path: '/contact', label: 'contact' },
        ].map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block text-sm transition-colors pb-2 border-b ${
              isActive(item.path)
                ? 'border-primary text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-primary">// </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="flex gap-6">
        <a href="https://github.com/rrahulppanchal" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-xs">
          github
        </a>
        <a href="https://in.linkedin.com/in/rrahulppanchal" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-xs">
          linkedin
        </a>
      </div>
    </aside>
  );
}
