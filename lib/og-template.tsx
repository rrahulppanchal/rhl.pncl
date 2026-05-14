import { ImageResponse } from 'next/og';

type Args = {
  filename: string;
  command: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  tagline?: string;
  tags?: string[];
  rightFooter?: string;
};

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOG({
  filename,
  command,
  eyebrow,
  heading,
  subheading,
  tagline,
  tags,
  rightFooter,
}: Args) {
  const bg = '#000000';
  const fg = '#DCFCE7';
  const dim = '#86EFAC';
  const primary = '#00FF41';

  const headingSize =
    heading.length > 70 ? 56 : heading.length > 45 ? 72 : heading.length > 25 ? 92 : 110;

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
          <span style={{ color: dim, fontSize: 20, marginLeft: 20 }}>{filename}</span>
        </div>

        {/* Command */}
        <div style={{ display: 'flex', color: dim, fontSize: 24, marginBottom: eyebrow ? 16 : 28 }}>
          <span style={{ color: primary }}>$</span>
          <span style={{ marginLeft: 14 }}>{command}</span>
        </div>

        {/* Eyebrow */}
        {eyebrow && (
          <div style={{ display: 'flex', color: dim, fontSize: 22, marginBottom: 24 }}>
            <span style={{ color: primary }}>#</span>
            <span style={{ marginLeft: 12 }}>{eyebrow}</span>
          </div>
        )}

        {/* Heading */}
        <div
          style={{
            display: 'flex',
            color: primary,
            fontSize: headingSize,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 18,
            letterSpacing: '-1px',
          }}
        >
          {heading}
        </div>

        {/* Subheading */}
        {subheading && (
          <div
            style={{
              display: 'flex',
              color: fg,
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 22,
            }}
          >
            {subheading}
          </div>
        )}

        {/* Tagline */}
        {tagline && (
          <div
            style={{
              display: 'flex',
              color: dim,
              fontSize: 24,
              lineHeight: 1.4,
              marginBottom: 24,
              maxWidth: 1000,
            }}
          >
            {tagline.length > 220 ? tagline.slice(0, 217) + '…' : tagline}
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {tags.slice(0, 6).map(t => (
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
          <span>{rightFooter ?? 'rhl.pncl'}</span>
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
    { ...OG_SIZE },
  );
}
