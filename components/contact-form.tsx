'use client';

import { useEffect, useMemo, useState } from 'react';

const inputBase =
  'w-full bg-input border text-foreground px-4 py-3 focus:border-l-2 focus:border-primary focus:shadow-sm focus:outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/50';

const labelClass = 'block text-xs text-muted-foreground mb-2 font-mono';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldKey = 'name' | 'email' | 'subject' | 'message';
type Errors   = Partial<Record<FieldKey, string>>;
type Phase    = 'idle' | 'sending' | 'sent' | 'error';

const LINE_MS = 320;
const FIELD_ORDER: FieldKey[] = ['name', 'email', 'subject', 'message'];

type Line = { text: string; tone: 'muted' | 'ok' | 'fail' | 'final-ok' | 'final-fail' };

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'general',
    message: '',
  });
  const [errors, setErrors]     = useState<Errors>({});
  const [shakeKey, setShakeKey] = useState(0);
  const [phase, setPhase]       = useState<Phase>('idle');
  const [shown, setShown]       = useState(0);
  const [txCtx, setTxCtx]       = useState<{ email: string; type: string; bytes: number } | null>(null);
  const [errSnapshot, setErrSnapshot] = useState<Errors>({});

  const successLines: Line[] = useMemo(() => {
    if (!txCtx) return [];
    return [
      { text: `$ ./send.sh --to=rhl.pncl@gmail.com --from=${txCtx.email} --type=${txCtx.type}`, tone: 'muted' },
      { text: '> validating payload..................OK', tone: 'ok' },
      { text: '> sanitizing input....................OK', tone: 'ok' },
      { text: '> encrypting message (AES-256-GCM)....OK', tone: 'ok' },
      { text: '> opening secure channel..............OK', tone: 'ok' },
      { text: `> transmitting ${txCtx.bytes} bytes...........OK`, tone: 'ok' },
      { text: '> awaiting server ack.................OK', tone: 'ok' },
      { text: '✓ message delivered. response within 24–48h.', tone: 'final-ok' },
    ];
  }, [txCtx]);

  const errorLines: Line[] = useMemo(() => {
    const present = FIELD_ORDER.filter(k => errSnapshot[k]);
    if (present.length === 0) return [];
    const lines: Line[] = [{ text: '$ ./send.sh --validate', tone: 'muted' }];
    for (const k of present) {
      const padded = `> checking ${k}`.padEnd(36, '.');
      lines.push({ text: `${padded}FAIL`, tone: 'fail' });
      lines.push({ text: `  ✗ ${errSnapshot[k]}`, tone: 'fail' });
    }
    lines.push({
      text: `✗ aborted. ${present.length} error${present.length === 1 ? '' : 's'}. fix and retry.`,
      tone: 'final-fail',
    });
    return lines;
  }, [errSnapshot]);

  const activeLines: Line[] =
    phase === 'sending' || phase === 'sent' ? successLines :
    phase === 'error' ? errorLines : [];

  useEffect(() => {
    if (phase === 'sending' && successLines.length > 0) {
      setShown(0);
      const timers: number[] = [];
      successLines.forEach((_, i) => {
        timers.push(window.setTimeout(() => setShown(i + 1), i * LINE_MS));
      });
      timers.push(
        window.setTimeout(() => {
          setPhase('sent');
          setFormData({ name: '', email: '', subject: '', type: 'general', message: '' });
        }, successLines.length * LINE_MS + 200),
      );
      return () => timers.forEach(clearTimeout);
    }
    if (phase === 'error' && errorLines.length > 0) {
      setShown(0);
      const timers: number[] = [];
      errorLines.forEach((_, i) => {
        timers.push(window.setTimeout(() => setShown(i + 1), i * LINE_MS));
      });
      return () => timers.forEach(clearTimeout);
    }
  }, [phase, successLines, errorLines]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as FieldKey]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!formData.name.trim())                    e.name    = 'name is required';
    if (!formData.email.trim())                   e.email   = 'email is required';
    else if (!EMAIL_RE.test(formData.email))      e.email   = 'invalid email format';
    if (!formData.subject.trim())                 e.subject = 'subject is required';
    if (!formData.message.trim())                 e.message = 'message is required';
    else if (formData.message.trim().length < 10) e.message = 'message must be ≥ 10 chars';
    return e;
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setErrSnapshot(errs);
      setShakeKey(k => k + 1);
      setPhase('error');
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        const msg = json.error || `server returned ${res.status}`;
        setErrSnapshot({ message: msg });
        setShakeKey(k => k + 1);
        setPhase('error');
        return;
      }
      setTxCtx({
        email: formData.email,
        type: formData.type,
        bytes: new Blob([formData.message]).size,
      });
      setPhase('sending');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'network error';
      setErrSnapshot({ message: `network: ${msg}` });
      setShakeKey(k => k + 1);
      setPhase('error');
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setPhase('idle');
    setTxCtx(null);
    setErrSnapshot({});
    setShown(0);
  };

  const fieldCls = (k: FieldKey) =>
    `${inputBase} ${errors[k] ? 'border-destructive/70 focus:border-destructive' : 'border-border'}`;

  const isSuccessTerminal = phase === 'sending' || phase === 'sent';
  const isErrPhase        = phase === 'error';

  return (
    <section className="relative flex-1">
      {/* Error modal popup */}
      {isErrPhase && (
        <ErrorModal
          lines={activeLines}
          shown={shown}
          done={shown >= activeLines.length}
          onClose={reset}
        />
      )}

      <div
        key={shakeKey}
        className={`border border-border p-8 ${shakeKey > 0 && isErrPhase ? 'shake-on-error' : ''}`}
      >
        <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border">
          <span className="text-xs text-muted-foreground font-mono">
            <span className="text-primary">//</span> send_message.ts
          </span>
          {isSuccessTerminal && (
            <button
              type="button"
              onClick={reset}
              className="ml-auto text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              ← new message
            </button>
          )}
        </div>

        {isSuccessTerminal ? (
          /* ── Terminal success log ──────────────────────────────── */
          <div className="font-mono text-sm space-y-1.5 scanline min-h-[420px]">
            {activeLines.slice(0, shown).map((line, i) => (
              <TerminalLine key={i} line={line} />
            ))}
            {phase === 'sending' && shown < activeLines.length && (
              <p className="text-primary animate-pulse text-base">▋</p>
            )}
            {phase === 'sent' && (
              <div className="mt-6 pt-4 border-t border-border/60 text-[11px] text-muted-foreground/60 font-mono">
                <span className="text-primary">$</span> exit 0
                <span className="text-primary animate-[blink_1s_step-end_infinite]"> ▋</span>
              </div>
            )}
          </div>
        ) : (
          /* ── Form ─────────────────────────────────────────────── */
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label className={labelClass}>{'/* '}name{' */'}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                className={fieldCls('name')}
              />
              {errors.name && <InlineErr msg={errors.name} />}
            </div>

            <div>
              <label className={labelClass}>{'/* '}email{' */'}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                aria-invalid={!!errors.email}
                className={fieldCls('email')}
              />
              {errors.email && <InlineErr msg={errors.email} />}
            </div>

            <div>
              <label className={labelClass}>{'/* '}subject{' */'}</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                aria-invalid={!!errors.subject}
                className={fieldCls('subject')}
              />
              {errors.subject && <InlineErr msg={errors.subject} />}
            </div>

            <div>
              <label className={labelClass}>{'/* '}inquiry_type{' */'}</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`${inputBase} border-border`}
                style={{ appearance: 'none' }}
              >
                <option value="general">General Inquiry</option>
                <option value="collaboration">Collaboration</option>
                <option value="project">Project Discussion</option>
                <option value="freelance">Freelance Work</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>{'/* '}message{' */'}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell me more about your inquiry..."
                aria-invalid={!!errors.message}
                className={`${fieldCls('message')} resize-none`}
              />
              {errors.message && <InlineErr msg={errors.message} />}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground py-3 font-mono text-sm hover:opacity-90 transition-all group/btn flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span>
                  Transmitting<span className="animate-[blink_1s_step-end_infinite]">...</span>
                </span>
              ) : (
                <>
                  Send Message
                  <span className="transition-transform group-hover/btn:translate-x-1 inline-block">→</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
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

        <div className="p-6 font-mono text-sm space-y-1.5 min-h-[280px]">
          {lines.slice(0, shown).map((line, i) => (
            <ErrorLine key={i} line={line} />
          ))}
          {!done && (
            <p className="text-destructive animate-pulse text-base">▋</p>
          )}
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

function ErrorLine({ line }: { line: Line }) {
  const anim: React.CSSProperties = { animation: 'fadeInUp 0.25s ease forwards' };
  const redGlow: React.CSSProperties = {
    textShadow: '0 0 6px hsl(0 80% 55% / 0.65), 0 0 14px hsl(0 80% 55% / 0.35)',
  };

  if (line.tone === 'final-fail') {
    return (
      <p className="opacity-0 text-destructive mt-3 text-base font-semibold" style={{ ...anim, ...redGlow }}>
        {line.text}
      </p>
    );
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

function InlineErr({ msg }: { msg: string }) {
  return (
    <p className="mt-1 text-[10px] font-mono text-destructive/80">
      <span className="text-destructive/50">// </span>{msg}
    </p>
  );
}

function TerminalLine({ line }: { line: Line }) {
  const baseAnim: React.CSSProperties = { animation: 'fadeInUp 0.25s ease forwards' };

  if (line.tone === 'final-ok') {
    return <p className="opacity-0 text-primary glow-text mt-3 text-base" style={baseAnim}>{line.text}</p>;
  }
  if (line.tone === 'final-fail') {
    return <p className="opacity-0 text-destructive glow-text mt-3 text-base" style={baseAnim}>{line.text}</p>;
  }
  if (line.tone === 'fail') {
    if (line.text.endsWith('FAIL')) {
      const prefix = line.text.slice(0, -4);
      return (
        <p className="opacity-0 text-muted-foreground" style={baseAnim}>
          {prefix.replace(/\.{2,}$/, '')}
          <span className="text-muted-foreground/40">{prefix.match(/\.{2,}$/)?.[0] ?? ''}</span>
          <span className="text-destructive ml-1 font-bold">FAIL</span>
        </p>
      );
    }
    return <p className="opacity-0 text-destructive/90" style={baseAnim}>{line.text}</p>;
  }
  if (line.tone === 'ok') {
    const prefix = line.text.replace(/(\.{2,})OK$/, '');
    const dots   = line.text.match(/\.{2,}(?=OK$)/)?.[0] ?? '';
    return (
      <p className="opacity-0 text-muted-foreground" style={baseAnim}>
        {prefix}
        <span className="text-muted-foreground/40">{dots}</span>
        <span className="text-primary ml-1">OK</span>
      </p>
    );
  }
  return <p className="opacity-0 text-muted-foreground" style={baseAnim}>{line.text}</p>;
}
