type Props = {
  pageName: string;
  /** Optional override of boot lines. Each rendered with staggered fade-in. */
  bootLines?: string[];
};

const DEFAULT_LINES = [
  '$ system.boot --verbose',
  '> initializing kernel modules.......OK',
  '> mounting /home/portfolio..........OK',
  '> loading shaders & assets..........OK',
  '> establishing uplink to mainframe..OK',
  '> verifying integrity...............OK',
];

export function TerminalLoader({ pageName, bootLines = DEFAULT_LINES }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-2xl border border-border bg-card/30 corner-cut shadow-md">
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
          <span className="text-xs text-muted-foreground font-mono ml-3">
            boot.sh — {pageName.toLowerCase()}
          </span>
          <span className="ml-auto text-[10px] text-muted-foreground/50 font-mono">PID 0x{Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0')}</span>
        </div>

        {/* Body */}
        <div className="p-6 font-mono text-sm space-y-1.5 scanline">
          {bootLines.map((line, i) => (
            <p
              key={i}
              className="text-muted-foreground opacity-0"
              style={{
                animation: `fadeInUp 0.35s ease forwards, type-in 0.4s steps(40) forwards`,
                animationDelay: `${i * 0.18}s, ${i * 0.18}s`,
              }}
            >
              <span className="text-primary/60">[{String(i + 1).padStart(2, '0')}]</span>{' '}
              {line.replace(/OK$/, '')}
              {line.endsWith('OK') && <span className="text-primary ml-1">OK</span>}
            </p>
          ))}

          {/* Final activating line */}
          <p
            className="opacity-0 mt-5 text-base"
            style={{
              animation: 'fadeInUp 0.4s ease forwards',
              animationDelay: `${bootLines.length * 0.18 + 0.1}s`,
            }}
          >
            <span className="text-primary/60">{'>'}</span>{' '}
            <span className="text-primary glow-text font-bold uppercase tracking-widest">
              [{pageName}]
            </span>{' '}
            <span className="text-foreground">activating</span>
            <span className="text-primary animate-[blink_1s_step-end_infinite]">....</span>
            <span className="terminal-cursor" />
          </p>

          {/* Indeterminate progress bar */}
          <div className="mt-6 relative h-1 bg-border overflow-hidden">
            <div
              className="absolute top-0 h-full bg-primary shadow-md"
              style={{ animation: 'loader-bar 1.4s ease-in-out infinite' }}
            />
          </div>

          {/* Status footer */}
          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground/60">
            <span>
              <span className="w-1.5 h-1.5 bg-primary inline-block animate-pulse mr-2 align-middle" />
              connection: secure
            </span>
            <span>
              tx/rx: {Math.floor(Math.random() * 999)}kb/s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
