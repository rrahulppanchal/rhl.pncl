import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-lg w-full">

        {/* Terminal window chrome */}
        <div className="border border-border">
          <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
            <span className="text-xs text-muted-foreground font-mono ml-3">404.sh</span>
          </div>

          <div className="p-8 font-mono">
            {/* Error output */}
            <div className="space-y-2 mb-8 text-sm">
              <p className="text-muted-foreground/60">
                <span className="text-primary">$</span> curl -I {'{requested_path}'}
              </p>
              <p className="text-destructive/80">
                HTTP/1.1 404 Not Found
              </p>
              <p className="text-muted-foreground/60">
                Content-Type: text/html
              </p>
              <p className="text-muted-foreground/60 mb-4">
                {'{'} "error": "route not found" {'}'}
              </p>
            </div>

            {/* Big 404 */}
            <div className="mb-8">
              <p className="text-[80px] lg:text-[100px] font-bold leading-none text-primary/20 select-none glow-text">
                404
              </p>
              <h1 className="text-2xl font-bold text-foreground mt-2 glow-text">
                Page not found
                <span className="terminal-cursor" />
              </h1>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                The route you requested doesn't exist or has been moved. Check the URL or navigate back to a known page.
              </p>
            </div>

            {/* Suggestions */}
            <div className="border border-border p-4 mb-8 bg-card/30">
              <p className="text-xs text-muted-foreground/60 mb-3">
                <span className="text-primary">{'>'}</span> available_routes
              </p>
              <div className="space-y-2">
                {[
                  { path: '/',         label: 'home' },
                  { path: '/projects', label: 'projects' },
                  { path: '/blogs',    label: 'blogs' },
                  { path: '/contact',  label: 'contact' },
                ].map(({ path, label }) => (
                  <Link
                    key={path}
                    href={path}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <span className="text-primary/40 group-hover:text-primary transition-colors">→</span>
                    <span className="font-mono">{path}</span>
                    <span className="text-muted-foreground/40 text-xs">{`/* ${label} */`}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Action */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-mono hover:opacity-90 transition-opacity group"
            >
              cd ~
              <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
