import { renderOG, OG_SIZE } from '@/lib/og-template';

export const runtime = 'nodejs';
export const alt = 'Contact Rahul Panchal — Senior Software Engineer & Automation Consultant';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOG({
    filename: 'contact.md — rhl.pncl',
    command: './contact.sh --open=secure',
    heading: "Let's build something",
    subheading: 'AI · Automation · Engineering partnerships',
    tagline:
      'Typically respond within 24–48h on weekdays. Reach out via email, WhatsApp, or LinkedIn for project discussions, advisory, or full-stack engagements.',
    tags: ['Email', 'WhatsApp', 'LinkedIn'],
  });
}
