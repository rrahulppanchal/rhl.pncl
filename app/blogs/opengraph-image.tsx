import { renderOG, OG_SIZE } from '@/lib/og-template';

export const runtime = 'nodejs';
export const alt = 'Blog — Notes on AI, Backend, DevOps & Engineering by Rahul Panchal';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOG({
    filename: 'blog.md — rhl.pncl',
    command: './blog.sh --feed=latest',
    heading: 'Blog',
    subheading: 'Notes on AI, Backend & DevOps',
    tagline:
      'Articles on Node.js, NestJS, system design, AI integration with LangChain & RAG, and full-stack engineering best practices.',
    tags: ['AI', 'Automation', 'NestJS', 'LangChain', 'RAG', 'DevOps'],
  });
}
