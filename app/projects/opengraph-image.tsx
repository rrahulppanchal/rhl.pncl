import { renderOG, OG_SIZE } from '@/lib/og-template';

export const runtime = 'nodejs';
export const alt = 'AI, Web & Mobile Projects by Rahul Panchal';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOG({
    filename: 'projects.md — rhl.pncl',
    command: './projects.sh --scan=all',
    heading: 'Projects',
    subheading: 'Klego · Raccog · Solviser',
    tagline:
      'AI application builders, document-based RAG, and mobile delivery with clear roles and implementation scope.',
    tags: ['Generative AI', 'RAG', 'Next.js', 'NestJS', 'React Native', 'AWS'],
  });
}
