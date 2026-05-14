import { renderOG, OG_SIZE } from '@/lib/og-template';

export const runtime = 'nodejs';
export const alt = 'Services — AI Tools, Agents, Automation & Full-Stack Apps by Rahul Panchal';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOG({
    filename: 'services.md — rhl.pncl',
    command: './services.sh --listing',
    heading: 'How I Can Help',
    subheading: 'AI · Automation · Cloud',
    tagline:
      'AI tools, autonomous agents, automation pipelines, and production web apps — from MVPs to enterprise systems. Independent senior engineer, accountable to outcomes.',
    tags: ['AI Agents', 'n8n', 'LangChain', 'NestJS', 'Cloud', 'DevOps'],
  });
}
