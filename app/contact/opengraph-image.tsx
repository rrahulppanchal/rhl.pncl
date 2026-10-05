import { renderOG, OG_SIZE } from '@/lib/og-template';

export const runtime = 'nodejs';
export const alt = 'Contact Rahul Panchal — Full Stack & Generative AI Engineer';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOG({
    filename: 'contact.md — rhl.pncl',
    command: './contact.sh --open=secure',
    heading: "Let's talk",
    subheading: 'Roles · Contract projects · AI integration',
    tagline:
      'Open to remote senior full-stack and Generative AI engineering opportunities, as well as contract product development.',
    tags: ['Email', 'LinkedIn', 'GitHub'],
  });
}
