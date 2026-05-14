import { renderOG, OG_SIZE } from '@/lib/og-template';

export const runtime = 'nodejs';
export const alt = 'Projects — Selected work by Rahul Panchal';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOG({
    filename: 'projects.md — rhl.pncl',
    command: './projects.sh --scan=all',
    heading: 'Projects',
    subheading: 'Selected work · case studies',
    tagline:
      'AI agents, automation pipelines, SaaS platforms, and cloud-native systems shipped for clients across India and the US.',
    tags: ['AI Agents', 'Automation', 'SaaS', 'AWS', 'NestJS', 'Python'],
  });
}
