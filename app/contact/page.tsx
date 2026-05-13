import type { Metadata } from 'next';
import { Sidebar } from '@/components/sidebar';
import { ContactForm } from '@/components/contact-form';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact — Hire Rahul Panchal for Node.js, NestJS & AI Work',
  description:
    'Get in touch with Rahul Panchal for senior engineering roles, freelance projects, and AI/LLM integration work. Email, phone, GitHub, LinkedIn.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: 'Contact — Rahul Panchal',
    description:
      'Available for senior engineering roles, freelance projects, and AI/LLM integration work.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Rahul Panchal',
    description:
      'Available for senior engineering roles, freelance projects, and AI/LLM integration work.',
  },
};

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="0" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 2.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactMethods = [
  { label: 'Email',    value: 'rhl.pncl@gmail.com',    Icon: MailIcon,     link: 'mailto:rhl.pncl@gmail.com' },
  { label: 'Phone',    value: '+91 63927 58956',       Icon: PhoneIcon,    link: 'tel:+916392758956' },
  { label: 'GitHub',   value: 'rrahulppanchal',        Icon: GitHubIcon,   link: 'https://github.com/rrahulppanchal' },
  { label: 'LinkedIn', value: 'rrahulppanchal',        Icon: LinkedInIcon, link: 'https://in.linkedin.com/in/rrahulppanchal' },
];

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Rahul Panchal',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: 'Rahul Panchal',
      email: 'rhl.pncl@gmail.com',
      telephone: '+91-63927-58956',
      sameAs: [
        'https://github.com/rrahulppanchal',
        'https://in.linkedin.com/in/rrahulppanchal',
      ],
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-8 lg:px-16 pt-20 pb-20 lg:py-20 max-w-5xl">
          <section className="mb-16">
            <p className="text-muted-foreground text-sm mb-4 font-mono">
              <span className="text-primary">{'>'}</span> Get in Touch
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono glow-text glitch-hover">
              Contact
              <span className="terminal-cursor" />
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Available for senior engineering roles, freelance projects, and AI/LLM integration work. Let's talk — I'm always open to interesting challenges and new opportunities.
            </p>
          </section>

          <div className="flex flex-col lg:flex-row gap-12">
            <ContactForm />

            <aside className="lg:w-72 space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 border border-dashed border-border p-5 hover:border-primary hover:bg-card/50 hover:shadow-sm transition-all group"
                >
                  <span className="text-muted-foreground group-hover:text-primary transition-colors mt-0.5 shrink-0">
                    <method.Icon />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-mono mb-1 group-hover:text-primary transition-colors">
                      {method.label}
                    </p>
                    <p className="text-sm text-foreground font-mono break-all">{method.value}</p>
                  </div>
                </a>
              ))}

              <div className="border-t border-border pt-6 mt-6">
                <p className="text-xs text-muted-foreground font-mono mb-3">
                  <span className="text-primary">//</span> response_time
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Typically responds within{' '}
                  <span className="text-primary font-mono">24–48h</span>{' '}
                  on weekdays. Urgent? Reach out directly on LinkedIn or GitHub.
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
