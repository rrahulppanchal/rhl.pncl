'use client';

import { useEffect, useMemo, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINE_MS = 320;

type Phase = 'idle' | 'sending' | 'sent' | 'error';
type Line = { text: string; tone: 'muted' | 'ok' | 'fail' | 'final-ok' | 'final-fail' };

export function NewsletterForm() {
  const [email, setEmail]             = useState('');
  const [errorMsg, setErrorMsg]       = useState<string | null>(null);
  const [shakeKey, setShakeKey]       = useState(0);
  const [phase, setPhase]             = useState<Phase>('idle');
  const [shown, setShown]             = useState(0);
  const [submitting, setSubmitting]   = useState(false);
  const [committedEmail, setCommittedEmail] = useState<string | null>(null);
  const [fetchResult, setFetchResult] = useState<'pending' | 'ok' | { err: string }>('pending');
  const [animDone, setAnimDone]       = useState(false);

  const successLines: Line[] = useMemo(() => {
    if (!committedEmail) return [];
    return [
      { text: `$ ./subscribe.sh --email=${committedEmail} --topic=all --frequency=weekly`, tone: 'muted' },
      { text: '> validating email................OK', tone: 'ok' },
      { text: '> opening secure channel..........OK', tone: 'ok' },
      { text: '> adding to mailing list..........OK', tone: 'ok' },
      { text: '> sending confirmation............OK', tone: 'ok' },
      { text: '✓ subscribed. welcome aboard.', tone: 'final-ok' },
    ];
  }, [committedEmail]);

  const errorLines: Line[] = useMemo(() => {
    if (!errorMsg) return [];
    return [
      { text: '$ ./subscribe.sh --validate', tone: 'muted' },
      { text: '> checking email..................FAIL', tone: 'fail' },
      { text: `  ✗ ${errorMsg}`, tone: 'fail' },
      { text: '✗ aborted. fix and retry.', tone: 'final-fail' },
    ];
  }, [errorMsg]);

  useEffect(() => {
    const lines =
      phase === 'sending' ? successLines :
      phase === 'error'   ? errorLines : [];
    if (lines.length === 0) return;
    setShown(0);
    if (phase === 'sending') setAnimDone(false);
    const timers: number[] = [];
    lines.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), i * LINE_MS));
    });
    if (phase === 'sending') {
      timers.push(
        window.setTimeout(() => setAnimDone(true), lines.length * LINE_MS + 200),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [phase, successLines, errorLines]);

  useEffect(() => {
    if (phase !== 'sending' || !animDone || fetchResult === 'pending') return;
    if (fetchResult === 'ok') {
      setPhase('sent');
      setEmail('');
    } else {
      setErrorMsg(fetchResult.err);
      setPhase('error');
    }
  }, [phase, animDone, fetchResult]);

  const reset = () => {
    setPhase('idle');
    setShown(0);
    setErrorMsg(null);
    setCommittedEmail(null);
    setFetchResult('pending');
    setAnimDone(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const value = email.trim();
    if (!value) {
      setErrorMsg('email is required');
      setShakeKey(k => k + 1);
      setPhase('error');
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setErrorMsg('invalid email format');
      setShakeKey(k => k + 1);
      setPhase('error');
      return;
    }

    setSubmitting(true);
    setCommittedEmail(value);
    setFetchResult('pending');
    setAnimDone(false);
    setPhase('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscription',
          email: value,
          subject: 'Newsletter signup',
          type: 'newsletter',
          message: `New newsletter subscriber: ${value}. Topic: all. Frequency: weekly.`,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setFetchResult({ err: json.error || `server returned ${res.status}` });
      } else {
        setFetchResult('ok');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'network error';
      setFetchResult({ err: `network: ${msg}` });
    } finally {
      setSubmitting(false);
    }
  };

  const isSuccessTerminal = phase === 'sending' || phase === 'sent';
  const isErrPhase        = phase === 'error';

  return (
    <section className="relative border border-border overflow-hidden mt-6">
      {isErrPhase && (
        <ErrorModal
          lines={errorLines}
          shown={shown}
          done={shown >= errorLines.length}
          onClose={reset}
        />
      )}
      {isSuccessTerminal && (
        <SuccessModal
          lines={successLines}
          shown={shown}
          phase={phase}
          onClose={reset}
        />
      )}

      <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
        <span className="text-xs text-muted-foreground font-mono ml-3">newsletter.sh</span>
        <span className="ml-auto text-[10px] text-muted-foreground/40 font-mono">~/portfolio</span>
      </div>

      <div
        key={shakeKey}
        className={`p-8 bg-card/10 ${shakeKey > 0 && isErrPhase ? 'shake-on-error' : ''}`}
      >
        <p className="text-xs text-muted-foreground font-mono mb-4">
          <span className="text-primary">$</span> subscribe --topic all --frequency weekly
        </p>
        <h3 className="text-xl font-bold text-foreground mb-2 font-mono">Stay in the loop</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-lg">
          Get the latest articles directly in your inbox. No spam, just quality content about web development and engineering.
        </p>
        <form onSubmit={handleSubmit} noValidate autoComplete="off" className="flex flex-col sm:flex-row gap-3 max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            autoComplete="off"
            aria-invalid={!!errorMsg}
            className="flex-1 bg-input border border-border text-foreground px-4 py-2.5 focus:border-primary focus:border-l-2 focus:outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/40"
          />
          <button
            type="submit"
            disabled={submitting || phase === 'sending'}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-mono text-sm hover:opacity-90 transition-opacity whitespace-nowrap group/btn flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Subscribe
            <span className="transition-transform group-hover/btn:translate-x-1 inline-block">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}

function SuccessModal({
  lines,
  shown,
  phase,
  onClose,
}: {
  lines: Line[];
  shown: number;
  phase: Phase;
  onClose: () => void;
}) {
  const isSending = phase === 'sending';
  const isSent    = phase === 'sent';
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm popup-enter">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label="Subscription progress"
        className="w-full max-w-lg border border-primary/60 bg-background"
        style={{
          boxShadow:
            '0 0 0 1px hsl(135.2941 100% 50% / 0.20), 0 0 30px hsl(135.2941 100% 50% / 0.35), 0 0 60px hsl(135.2941 100% 50% / 0.15)',
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/40 bg-primary/10">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-primary ml-3">newsletter.sh</span>
          {isSent && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="ml-auto text-primary/70 hover:text-primary font-mono text-xs leading-none"
            >
              ✕
            </button>
          )}
        </div>

        <div className="p-6 font-mono text-sm space-y-1.5 min-h-[260px] scanline">
          {lines.slice(0, shown).map((line, i) => (
            <TerminalLine key={i} line={line} />
          ))}
          {isSending && (
            <p className="text-primary animate-pulse text-base">▋</p>
          )}
          {isSent && (
            <div className="mt-6 pt-4 border-t border-primary/30 text-[11px] text-muted-foreground/70 font-mono flex items-center justify-between">
              <span>
                <span className="text-primary">$</span> exit 0
                <span className="text-primary animate-[blink_1s_step-end_infinite]"> ▋</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-[10px] font-mono text-primary hover:bg-primary/10 border border-primary/60 px-3 py-1.5 transition-colors"
              >
                ← subscribe another
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ErrorModal({
  lines,
  shown,
  done,
  onClose,
}: {
  lines: Line[];
  shown: number;
  done: boolean;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm popup-enter">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label="Validation errors"
        className="w-full max-w-lg border border-destructive/70 bg-background"
        style={{
          boxShadow:
            '0 0 0 1px hsl(0 80% 50% / 0.25), 0 0 30px hsl(0 80% 50% / 0.35), 0 0 60px hsl(0 80% 50% / 0.15)',
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-destructive/50 bg-destructive/10">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/30" />
          <span className="text-xs font-mono text-destructive ml-3">validate.sh</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto text-destructive/70 hover:text-destructive font-mono text-xs leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-6 font-mono text-sm space-y-1.5 min-h-[200px]">
          {lines.slice(0, shown).map((line, i) => (
            <ErrorLine key={i} line={line} />
          ))}
          {!done && <p className="text-destructive animate-pulse text-base">▋</p>}
          {done && (
            <div className="mt-6 pt-4 border-t border-destructive/30 text-[11px] text-destructive/70 font-mono flex items-center justify-between">
              <span>
                <span className="text-destructive">$</span> exit 1
                <span className="text-destructive animate-[blink_1s_step-end_infinite]"> ▋</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-[10px] font-mono text-destructive hover:bg-destructive/10 border border-destructive/60 px-3 py-1.5 transition-colors"
              >
                ← fix and retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TerminalLine({ line }: { line: Line }) {
  const anim: React.CSSProperties = { animation: 'fadeInUp 0.25s ease forwards' };
  if (line.tone === 'final-ok') {
    return <p className="opacity-0 text-primary glow-text mt-3 text-base" style={anim}>{line.text}</p>;
  }
  if (line.tone === 'ok') {
    const prefix = line.text.replace(/(\.{2,})OK$/, '');
    const dots   = line.text.match(/\.{2,}(?=OK$)/)?.[0] ?? '';
    return (
      <p className="opacity-0 text-muted-foreground" style={anim}>
        {prefix}
        <span className="text-muted-foreground/40">{dots}</span>
        <span className="text-primary ml-1">OK</span>
      </p>
    );
  }
  return <p className="opacity-0 text-muted-foreground" style={anim}>{line.text}</p>;
}

function ErrorLine({ line }: { line: Line }) {
  const anim: React.CSSProperties = { animation: 'fadeInUp 0.25s ease forwards' };
  const redGlow: React.CSSProperties = {
    textShadow: '0 0 6px hsl(0 80% 55% / 0.65), 0 0 14px hsl(0 80% 55% / 0.35)',
  };

  if (line.tone === 'final-fail') {
    return <p className="opacity-0 text-destructive mt-3 text-base font-semibold" style={{ ...anim, ...redGlow }}>{line.text}</p>;
  }
  if (line.tone === 'fail') {
    if (line.text.endsWith('FAIL')) {
      const prefix = line.text.slice(0, -4);
      const noDots = prefix.replace(/\.{2,}$/, '');
      const dots   = prefix.match(/\.{2,}$/)?.[0] ?? '';
      return (
        <p className="opacity-0 text-destructive/60" style={anim}>
          {noDots}
          <span className="text-destructive/30">{dots}</span>
          <span className="text-destructive ml-1 font-bold" style={redGlow}>FAIL</span>
        </p>
      );
    }
    return <p className="opacity-0 text-destructive/90" style={anim}>{line.text}</p>;
  }
  return <p className="opacity-0 text-destructive/50" style={anim}>{line.text}</p>;
}
