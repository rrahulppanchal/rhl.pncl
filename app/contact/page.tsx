import type { Metadata } from 'next';
import { Sidebar } from '@/components/sidebar';
import { ContactForm } from '@/components/contact-form';
import { ContactMethods } from '@/components/contact-methods';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact — Hire Rahul for AI & Engineering Work',
  description:
    'Get in touch with Rahul Panchal for senior engineering roles, freelance projects, and AI/LLM integration work. Email, phone, GitHub, LinkedIn, WhatsApp.',
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
        'https://wa.me/916392758956',
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
            <ContactMethods />
          </div>
        </main>
      </div>
    </div>
  );
}
