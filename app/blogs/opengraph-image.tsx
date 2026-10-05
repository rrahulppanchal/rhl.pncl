import { renderOG, OG_SIZE } from '@/lib/og-template';

export const runtime = 'nodejs';
export const alt = 'Engineering Case Studies & Writing by Rahul Panchal';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOG({
    filename: 'blog.md — rhl.pncl',
    command: './blog.sh --feed=latest',
    heading: 'Writing',
    subheading: 'Project stories & engineering notes',
    tagline:
      'First-person case studies on Klego, Raccog, and Solviser, covering Generative AI, Python APIs, application builders, and mobile product delivery.',
    tags: ['Case Studies', 'Generative AI', 'Python', 'RAG', 'React Native'],
  });
}
