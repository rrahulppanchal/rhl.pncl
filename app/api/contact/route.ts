import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  type?: string;
  message?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(rows: Array<[string, string]>): string {
  const tr = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 14px;border:1px solid #d4d4d4;background:#f6f6f6;font-weight:600;color:#222;width:160px;vertical-align:top;">${escapeHtml(k)}</td>
          <td style="padding:10px 14px;border:1px solid #d4d4d4;color:#111;white-space:pre-wrap;word-break:break-word;">${escapeHtml(v)}</td>
        </tr>`,
    )
    .join('');
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#ffffff;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:#111;">
    <div style="max-width:640px;margin:0 auto;">
      <div style="border-left:4px solid #00b840;padding:6px 12px;margin-bottom:18px;background:#f4fff4;">
        <p style="margin:0;font-size:12px;color:#666;">// new contact submission</p>
        <h1 style="margin:4px 0 0;font-size:18px;color:#0a7a2c;">rahul-panchal.portfolio &gt; contact.sh</h1>
      </div>
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;font-size:13px;">
        ${tr}
      </table>
      <p style="font-size:11px;color:#888;margin-top:18px;">
        sent automatically from the portfolio contact form.
      </p>
    </div>
  </body>
</html>`;
}

function buildText(rows: Array<[string, string]>): string {
  const width = Math.max(...rows.map(([k]) => k.length));
  const sep = '─'.repeat(width + 50);
  const lines = rows.map(([k, v]) => `${k.padEnd(width)} │ ${v}`);
  return [
    '// new contact submission',
    'rahul-panchal.portfolio > contact.sh',
    sep,
    ...lines,
    sep,
    '',
    'sent automatically from the portfolio contact form.',
  ].join('\n');
}

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'invalid json payload' }, { status: 400 });
  }

  const name    = (body.name    ?? '').trim();
  const email   = (body.email   ?? '').trim();
  const subject = (body.subject ?? '').trim();
  const type    = (body.type    ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name)                      return NextResponse.json({ error: 'name is required' },    { status: 400 });
  if (!email || !EMAIL_RE.test(email))
                                  return NextResponse.json({ error: 'valid email required' }, { status: 400 });
  if (!message || message.length < 10)
                                  return NextResponse.json({ error: 'message must be ≥ 10 chars' }, { status: 400 });

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    CONTACT_TO,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    return NextResponse.json(
      { error: 'mail transport not configured' },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 465),
    secure: (SMTP_SECURE ?? 'true').toLowerCase() === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const ts = new Date();
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const rows: Array<[string, string]> = [
    ['Name',       name],
    ['Email',      email],
    ...(subject ? [['Subject', subject] as [string, string]] : []),
    ...(type    ? [['Type',    type]    as [string, string]] : []),
    ['Message',    message],
    ['Timestamp',  ts.toISOString()],
    ['IP',         ip],
    ['User-Agent', req.headers.get('user-agent') ?? 'unknown'],
  ];

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_TO ?? 'rhl.pncl@gmail.com',
      replyTo: `${name} <${email}>`,
      subject: `[Portfolio] ${subject || type || 'New message'} — ${name}`,
      text: buildText(rows),
      html: buildHtml(rows),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'mail send failed';
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
