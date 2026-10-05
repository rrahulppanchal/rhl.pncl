import type { Metadata } from 'next';
import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';
import { SITE_URL } from '@/lib/site';

const TITLE = 'AI & Full-Stack Development Services | Rahul Panchal';
const DESCRIPTION =
  'Generative AI applications, Python/FastAPI APIs, RAG, full-stack products, React Native apps, and AWS delivery from Rahul Panchal.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    url: '/services',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

type Service = {
  num: string;
  title: string;
  tag: string;
  desc: string;
  bullets: string[];
};

const services: Service[] = [
  {
    num: '01',
    title: 'Generative AI applications',
    tag: 'Python · FastAPI · OpenAI · Gemini · RAG',
    desc:
      'I build application features around language models, including document-based RAG and AI-assisted workflows. My work includes the backend APIs and user-facing product that make those features usable.',
    bullets: [
      'Document-based retrieval-augmented generation',
      'OpenAI and Gemini API integrations',
      'Python and FastAPI backend services',
      'AI agents and application workflows',
    ],
  },
  {
    num: '02',
    title: 'AI application builders',
    tag: 'React · Next.js · NestJS · Docker',
    desc:
      'I work on the systems that turn a prompt into an application people can inspect and use. My experience includes coding-agent integrations, isolated execution, live previews, versioning, and publishing workflows.',
    bullets: [
      'Natural-language application-building workflows',
      'Docker-isolated execution and live previews',
      'Application versioning and GitHub synchronization',
      'Generation and publishing features',
    ],
  },
  {
    num: '03',
    title: 'Full-stack web products',
    tag: 'React · Next.js · TypeScript · NestJS',
    desc:
      'I build web applications across the interface, API layer, and database. My experience includes business tools, CRM systems, dashboards, and customer-facing products.',
    bullets: [
      'React and Next.js interfaces',
      'Node.js and NestJS backends',
      'PostgreSQL, Prisma, and MongoDB',
      'Authentication and third-party API integrations',
    ],
  },
  {
    num: '04',
    title: 'Mobile applications',
    tag: 'React Native · NestJS · Android · iOS',
    desc:
      'I build React Native applications with the backend services they need. For Solviser, I owned both the mobile app and the NestJS backend and delivered the app on Google Play and the Apple App Store.',
    bullets: [
      'Cross-platform mobile application development',
      'Mobile-to-backend API integration',
      'NestJS backend development',
      'Android and iOS release delivery',
    ],
  },
  {
    num: '05',
    title: 'Workflow automation and integrations',
    tag: 'n8n · Node.js · Python · REST APIs',
    desc:
      'I connect applications and automate repeatable data flows. My work includes n8n workflows, custom scripts, and integrations between third-party APIs and application databases.',
    bullets: [
      'n8n workflow development',
      'Third-party API integrations',
      'Database synchronization',
      'AI-assisted business workflows',
    ],
  },
  {
    num: '06',
    title: 'Backend modernization and cloud delivery',
    tag: 'Node.js · NestJS · AWS · Docker',
    desc:
      'I help move legacy and manual workflows into maintainable applications. I also work on the infrastructure and deployment needed to operate the product.',
    bullets: [
      'PHP and legacy-system migrations to Node.js',
      'Spreadsheet-based workflows converted into web applications',
      'Backend API and database development',
      'AWS infrastructure, Docker, and CI/CD',
    ],
  },
];

const proofOfWork = [
  {
    name: 'Klego',
    desc: 'AI application builder with OpenAI and Gemini integrations, Docker-isolated previews, versioning, GitHub synchronization, and AWS delivery.',
    label: 'Read the Klego case study',
    href: '/blogs/building-klego-ai-app-builder',
  },
  {
    name: 'Raccog',
    desc: 'Website and app platform with Python/FastAPI APIs, document-based RAG, persistent generation jobs, sandboxed previews, and publishing.',
    label: 'Read the Raccog case study',
    href: '/blogs/building-raccog-ai-platform',
  },
  {
    name: 'Solviser',
    desc: 'React Native application and NestJS backend built end to end by one developer, with releases on Android and iOS.',
    label: 'Read the Solviser case study',
    href: '/blogs/building-solviser-mobile-app',
  },
];

const engagementModels = [
  {
    name: 'Senior engineering role',
    blurb: 'Join a product team as a hands-on full-stack or Generative AI engineer, with experience taking technical ownership and supporting other developers.',
  },
  {
    name: 'Contract product development',
    blurb: 'Work on an AI product, web application, or mobile application with an agreed scope and delivery responsibilities.',
  },
  {
    name: 'AI feature development',
    blurb: 'Add a focused capability to an existing product, such as document-based RAG, model API integrations, or an AI-assisted workflow.',
  },
  {
    name: 'Backend and integration work',
    blurb: 'Build or extend APIs, connect systems, improve an existing backend, or help move a legacy workflow into a modern application.',
  },
];

const process = [
  { step: '01', title: 'Understand the product', desc: 'Start with the users, the workflow, the existing system, and the problem the work needs to solve.' },
  { step: '02', title: 'Define the scope',       desc: 'Agree on the deliverables, dependencies, milestones, and how the result will be reviewed.' },
  { step: '03', title: 'Build and review',       desc: 'Work through the implementation with progress updates and working software to review along the way.' },
  { step: '04', title: 'Release and hand over',  desc: 'Prepare deployment and the information needed to understand and maintain the delivered work. Agree separately on any ongoing support.' },
];

const audiences = [
  { name: 'Founders building a product',         desc: "Hands-on engineering across an early product's interface, backend, and deployment." },
  { name: 'Product teams adding AI',             desc: 'Practical experience with model APIs, document-based RAG, and the application systems around them.' },
  { name: 'Teams extending an existing platform', desc: 'Backend development, integrations, workflow automation, and legacy modernization.' },
];

export default function ServicesPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Rahul Panchal — AI & Full-Stack Development Services',
    url: `${SITE_URL}/services`,
    image: `${SITE_URL}/apple-icon.png`,
    description: DESCRIPTION,
    provider: {
      '@type': 'Person',
      name: 'Rahul Panchal',
      url: SITE_URL,
      jobTitle: 'Full Stack & Generative AI Engineer',
    },
    areaServed: 'Worldwide',
    serviceType: services.map(s => s.title),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-8 lg:px-16 pt-20 pb-20 lg:py-20 max-w-4xl">

          {/* Hero */}
          <section className="mb-16">
            <p className="text-muted-foreground text-sm mb-4 font-mono">
              <span className="text-primary">$</span> ./services.sh --listing
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono glow-text glitch-hover">
              What I can build
              <span className="terminal-cursor" />
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              I help teams build AI-powered applications, backend services, and web and mobile products. I work hands-on across the interface, APIs, data, and deployment, with experience leading a development team as well as delivering products independently.
            </p>
          </section>

          {/* Quick CTA strip */}
          <section className="mb-20 border border-primary/30 bg-primary/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-primary mb-1">
                <span className="w-1.5 h-1.5 bg-primary inline-block animate-pulse mr-2 align-middle" />
                Open to remote engineering roles and contract projects
              </p>
              <p className="text-sm text-muted-foreground">
                Tell me what you&apos;re building, what already exists, and where you need help.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs hover:opacity-90 transition-opacity group/btn inline-flex items-center gap-2 whitespace-nowrap"
              >
                Discuss your project
                <span className="transition-transform group-hover/btn:translate-x-1 inline-block">→</span>
              </Link>
              <Link
                href="/projects"
                className="px-3 py-2.5 text-primary font-mono text-xs hover:opacity-80 transition-opacity inline-flex items-center gap-2 whitespace-nowrap"
              >
                See my work →
              </Link>
            </div>
          </section>

          {/* Services */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">01.</span> What I Build
            </h2>
            <div className="space-y-4">
              {services.map((s) => (
                <article
                  key={s.num}
                  className="border border-border p-6 hover:border-primary hover:shadow-md transition-all group corner-cut"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-xs text-primary/50 font-mono shrink-0 mt-1">_{s.num}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors font-mono mb-1">
                        {s.title}
                      </h3>
                      <p className="text-xs text-muted-foreground/70 font-mono mb-3">
                        {'/* '}{s.tag}{' */'}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                      <ul className="space-y-1.5">
                        {s.bullets.map((b) => (
                          <li key={b} className="text-sm text-muted-foreground flex gap-2.5 leading-relaxed">
                            <span className="text-primary shrink-0 mt-1.5 text-[8px]">▹</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Proof of work */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">02.</span> Work behind these services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {proofOfWork.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  className="border border-border p-5 corner-cut hover:border-primary hover:shadow-md transition-all group flex flex-col"
                >
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors font-mono mb-2">
                    {p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{p.desc}</p>
                  <span className="text-xs text-primary font-mono">
                    {p.label} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Engagement Models */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">03.</span> How I can work with your team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {engagementModels.map((m) => (
                <div key={m.name} className="border border-border p-5 hover:border-primary/60 transition-all">
                  <h3 className="text-sm font-bold text-foreground font-mono mb-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary inline-block" />
                    {m.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{m.blurb}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">04.</span> A clear path from requirements to release
            </h2>
            <div className="relative">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
              <div className="space-y-8 pl-8">
                {process.map((p) => (
                  <div key={p.step} className="relative group">
                    <div className="absolute -left-8 top-1.5 w-3 h-3 border border-primary bg-background group-hover:bg-primary transition-colors" />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-primary/60 font-mono">{p.step}</span>
                        <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors font-mono">
                          {p.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Who I Work With */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">05.</span> Where I can help
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
              {audiences.map((g) => (
                <div key={g.name} className="bg-background p-6">
                  <p className="text-sm font-mono text-primary mb-2">{g.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="border border-border">
            <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
              <span className="text-xs text-muted-foreground font-mono ml-3">start.sh</span>
            </div>
            <div className="p-8">
              <p className="text-xs text-muted-foreground font-mono mb-3">
                <span className="text-primary">$</span> ./start.sh --reach-out
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-3 font-mono">Have a role or project in mind?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl text-sm leading-relaxed">
                Share the product, the current stack, and the work you need owned. That gives us a useful starting point for the conversation.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-primary text-primary-foreground font-mono text-sm hover:opacity-90 transition-opacity group/btn inline-flex items-center gap-2"
                >
                  Get in touch
                  <span className="transition-transform group-hover/btn:translate-x-1 inline-block">→</span>
                </Link>
                <a
                  href="mailto:rhl.pncl@gmail.com"
                  className="px-6 py-3 border border-border text-foreground/80 font-mono text-sm hover:border-primary hover:text-primary transition-all inline-flex items-center gap-2"
                >
                  Email Rahul →
                </a>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
