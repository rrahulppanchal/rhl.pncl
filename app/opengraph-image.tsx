import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rahul Panchal — Senior Software Engineer & Automation Consultant';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 56 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ef4444' }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#facc15' }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, background: primary }} />
          <span style={{ color: dim, fontSize: 22, marginLeft: 20 }}>boot.sh — portfolio</span>
        </div>

        {/* Command line */}
        <div style={{ display: 'flex', color: dim, fontSize: 28, marginBottom: 28 }}>
          <span style={{ color: primary }}>$</span>
          <span style={{ marginLeft: 16 }}>whoami --verbose</span>
        </div>

        {/* Name */}
        <div
          style={{
            display: 'flex',
            color: primary,
            fontSize: 110,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 16,
            letterSpacing: '-1px',
          }}
        >
          Rahul Panchal
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: fg,
            fontSize: 44,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 28,
          }}
        >
          <span>Senior Software Engineer</span>
          <span style={{ color: primary }}>&amp; Automation Consultant</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            color: dim,
            fontSize: 26,
            lineHeight: 1.4,
            maxWidth: 980,
          }}
        >
          AI agents · Automation · Cloud engineering · Node.js · NestJS · Python — partnering with businesses to cut costs and unlock growth.
        </div>

        {/* Stat strip */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            marginTop: 32,
            color: dim,
            fontSize: 22,
          }}
        >
          <span><span style={{ color: primary, fontWeight: 700 }}>6+</span> years</span>
          <span style={{ color: dim }}>·</span>
          <span><span style={{ color: primary, fontWeight: 700 }}>20+</span> production builds</span>
          <span style={{ color: dim }}>·</span>
          <span><span style={{ color: primary, fontWeight: 700 }}>~65%</span> ops cost cut</span>
        </div>

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
            <span style={{ color: primary }}>▮</span> rhl.pncl
          </span>
          <span>India · available for work</span>
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
