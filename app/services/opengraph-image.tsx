import { renderOG, OG_SIZE } from '@/lib/og-template';

export const runtime = 'nodejs';
export const alt = 'AI & Full-Stack Development Services by Rahul Panchal';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOG({
    filename: 'services.md — rhl.pncl',
    command: './services.sh --listing',
    heading: 'What I can build',
    subheading: 'AI · Full stack · Mobile',
    tagline:
      'Generative AI applications, Python/FastAPI APIs, RAG, full-stack products, React Native apps, and AWS delivery.',
    tags: ['Python', 'FastAPI', 'RAG', 'Next.js', 'NestJS', 'React Native'],
  });
}
