import { ImageResponse } from 'next/og';
import { readProjectsDB } from '@/lib/db';

export const runtime = 'nodejs';
export const alt = 'Rahul Panchal — Project';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: Promise<{ slug: string }> };

export default async function OG({ params }: Props) {
  const { slug } = await params;
  const db = readProjectsDB();
  const project = db.projects.find(p => p.slug === slug);

  const name = project?.name ?? 'Project';
  const description = project?.description ?? '';
  const year = project?.year ?? '';
  const status = project?.status ?? '';
  const tech = (project?.tech ?? []).slice(0, 6);

  const bg = '#000000';
  const fg = '#DCFCE7';
  const dim = '#86EFAC';
  const primary = '#00FF41';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: bg,
          color: fg,
          fontFamily: 'monospace',
          padding: '64px 80px',
          position: 'relative',
        }}
      >
        {/* Top chrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ef4444' }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#facc15' }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, background: primary }} />
          <span style={{ color: dim, fontSize: 20, marginLeft: 20 }}>case_study.md — rhl.pncl</span>
        </div>

        {/* Meta strip */}
        <div style={{ display: 'flex', gap: 18, color: dim, fontSize: 22, marginBottom: 28 }}>
          <span style={{ color: primary }}>▮</span>
          <span>Project</span>
          {year && <span>·</span>}
          {year && <span>{year}</span>}
          {status && <span>·</span>}
          {status && <span style={{ color: primary }}>{status}</span>}
        </div>

        {/* Name */}
        <div
          style={{
            display: 'flex',
            color: primary,
            fontSize: name.length > 50 ? 60 : name.length > 30 ? 76 : 92,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 24,
            letterSpacing: '-1px',
          }}
        >
          {name}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              display: 'flex',
              color: fg,
              fontSize: 26,
              lineHeight: 1.4,
              marginBottom: 28,
              maxWidth: 1000,
            }}
          >
            {description.length > 200 ? description.slice(0, 197) + '…' : description}
          </div>
        )}

        {/* Tech stack */}
        {tech.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {tech.map(t => (
              <span
                key={t}
                style={{
                  color: dim,
                  fontSize: 20,
                  padding: '6px 14px',
                  border: `1px solid ${dim}`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Bottom strip */}
        <div
          style={{
            position: 'absolute',
            left: 80,
            right: 80,
            bottom: 60,
            display: 'flex',
            justifyContent: 'space-between',
            color: dim,
            fontSize: 22,
            borderTop: `1px solid ${dim}`,
            paddingTop: 24,
          }}
        >
          <span>
            <span style={{ color: primary }}>▮</span> Rahul Panchal
          </span>
          <span>rhl.pncl</span>
        </div>

        {/* Corner accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 40,
            height: 40,
            background: primary,
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
