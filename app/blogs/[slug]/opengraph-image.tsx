import { ImageResponse } from 'next/og';
import { readDB } from '@/lib/db';

export const runtime = 'nodejs';
export const alt = 'Rahul Panchal — Blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: Promise<{ slug: string }> };

export default async function OG({ params }: Props) {
  const { slug } = await params;
  const db = readDB();
  const blog = db.blogs.find(b => b.slug === slug);

  const title = blog?.title ?? 'Blog post';
  const description = blog?.description ?? '';
  const category = blog?.category ?? 'Notes';
  const date = blog?.date ?? '';
  const readTime = blog?.readTime ?? '';
  const tags = (blog?.tags ?? []).slice(0, 5);

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
          <span style={{ color: dim, fontSize: 20, marginLeft: 20 }}>blog.md — rhl.pncl</span>
        </div>

        {/* Category + date */}
        <div style={{ display: 'flex', gap: 18, color: dim, fontSize: 22, marginBottom: 28 }}>
          <span style={{ color: primary }}>#</span>
          <span>{category}</span>
          {date && <span>·</span>}
          {date && <span>{date}</span>}
          {readTime && <span>·</span>}
          {readTime && <span>{readTime}</span>}
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            color: primary,
            fontSize: title.length > 70 ? 56 : title.length > 45 ? 68 : 80,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-1px',
          }}
        >
          {title}
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

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
            {tags.map(t => (
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
