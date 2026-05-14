import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rahul Panchal — Senior Software Engineer & Automation Consultant';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  const bg = '#000000';
  const fg = '#DCFCE7';
  const dim = '#86EFAC';
  const dimSoft = 'rgba(134, 239, 172, 0.35)';
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
          padding: '56px 72px 48px',
          position: 'relative',
        }}
      >
        {/* Top chrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#ef4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#facc15' }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: primary }} />
          <span style={{ color: dim, fontSize: 20, marginLeft: 16 }}>boot.sh — portfolio</span>
        </div>

        {/* Command line */}
        <div style={{ display: 'flex', color: dim, fontSize: 22, marginBottom: 24 }}>
          <span style={{ color: primary }}>$</span>
          <span style={{ marginLeft: 12 }}>whoami --verbose</span>
        </div>

        {/* Name */}
        <div
          style={{
            display: 'flex',
            color: primary,
            fontSize: 108,
            fontWeight: 800,
            lineHeight: 1.0,
            marginBottom: 18,
            letterSpacing: '-2px',
          }}
        >
          Rahul Panchal
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 38,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 22,
          }}
        >
          <span style={{ color: fg }}>Senior Software Engineer</span>
          <span style={{ color: primary }}>&amp; Automation Consultant</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            color: dim,
            fontSize: 22,
            lineHeight: 1.4,
            maxWidth: 980,
          }}
        >
          AI agents · Automation · Cloud engineering · Node.js · NestJS · Python — partnering with businesses to cut costs and unlock growth.
        </div>

        {/* Flex spacer */}
        <div style={{ display: 'flex', flex: 1 }} />

        {/* Divider */}
        <div style={{ display: 'flex', height: 1, background: dimSoft, marginBottom: 18 }} />

        {/* Bottom: stats + brand */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: dim,
            fontSize: 18,
          }}
        >
          {/* Stats row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ color: primary, fontSize: 24, fontWeight: 700 }}>6+</span>
              <span>years</span>
            </div>
            <span style={{ color: dimSoft }}>·</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ color: primary, fontSize: 24, fontWeight: 700 }}>20+</span>
              <span>builds</span>
            </div>
            <span style={{ color: dimSoft }}>·</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ color: primary, fontSize: 24, fontWeight: 700 }}>~65%</span>
              <span>cost cut</span>
            </div>
          </div>

          {/* Brand pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                display: 'flex',
                width: 10,
                height: 10,
                background: primary,
                borderRadius: 5,
              }}
            />
            <span>India · available for work</span>
          </div>
        </div>

        {/* Corner accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 36,
            height: 36,
            background: primary,
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
