import type { Metadata } from 'next';
import { Sidebar } from '@/components/sidebar';
import { ContactForm } from '@/components/contact-form';
import { ContactMethods } from '@/components/contact-methods';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Contact Rahul Panchal | Full Stack & GenAI Engineer';
const DESCRIPTION =
  'Contact Rahul Panchal about remote full-stack and Generative AI engineering roles, contract projects, backend development, and mobile applications.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
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
        'https://linkedin.com/in/rrahulppanchal',
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
              <span className="text-primary">{'>'}</span> Contact
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono glow-text glitch-hover">
              Let&apos;s talk
              <span className="terminal-cursor" />
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
              I&apos;m open to remote senior full-stack and Generative AI engineering opportunities, as well as contract product development. If you need someone to own the work across APIs, interfaces, AI integrations, and deployment, tell me about the role or project.
            </p>
            <p className="text-xs text-muted-foreground font-mono mb-3">
              <span className="text-primary">//</span> Helpful details to include
            </p>
            <ul className="space-y-1.5">
              {[
                'What the product does',
                'The work you need owned',
                'Your current technology stack',
                'Your preferred timeline',
              ].map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex gap-2.5 leading-relaxed">
                  <span className="text-primary shrink-0 mt-1.5 text-[8px]">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
