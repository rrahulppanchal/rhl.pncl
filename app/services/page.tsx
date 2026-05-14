import type { Metadata } from 'next';
import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';
import { SITE_URL } from '@/lib/site';
import { WHATSAPP_URL } from '@/lib/use-external-redirect';

export const metadata: Metadata = {
  title: 'Services — AI Tools, Agents, Automation & Full-Stack Apps',
  description:
    'I build AI tools, autonomous agents, n8n + custom automation, and modern web apps for startups and enterprises. From rapid MVP to production-grade SaaS — engagement models and direct contact.',
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    url: '/services',
    title: 'Services — Rahul Panchal',
    description:
      'AI tools, autonomous agents, automation pipelines, and web apps — built for startups and enterprises.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — Rahul Panchal',
    description:
      'AI tools, autonomous agents, automation pipelines, and web apps — built for startups and enterprises.',
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
    title: 'AI Tools & Agents',
    tag: 'LLM · LangChain · LangGraph · CrewAI',
    desc:
      'From a simple chatbot widget to autonomous multi-step agents that read your docs, query your APIs, and act on behalf of users. Built with RAG, vector stores, and the right model for the job (GPT-4o, Claude, Gemini, open-source).',
    bullets: [
      'Custom chatbots with RAG over your knowledge base',
      'Autonomous agents (LangGraph / CrewAI) for research, support, ops',
      'Internal copilots that integrate with your stack',
      'AI-powered search, summarization, classification',
      'Voice and multilingual support',
    ],
  },
  {
    num: '02',
    title: 'Automation & Workflows',
    tag: 'n8n · BullMQ · custom pipelines',
    desc:
      'Replace manual ops with reliable automation. n8n for visual workflows where the team can see and tweak, or hand-coded Node/Python pipelines when you need fine control and high throughput.',
    bullets: [
      'n8n setup, self-hosting, queue mode, and version-controlled workflows',
      'Custom job pipelines with BullMQ + Redis on Node.js',
      'Third-party API integrations and webhook plumbing',
      'AI-augmented automation (LLM in the loop where it matters)',
      'Migration off Zapier / Make to self-hosted alternatives',
    ],
  },
  {
    num: '03',
    title: 'Full-Stack Web Apps',
    tag: 'Next.js · React · NestJS · Node',
    desc:
      'Production-grade SaaS, dashboards, admin tools, and customer-facing portals. End-to-end ownership: design, backend, frontend, deployment, observability.',
    bullets: [
      'Multi-tenant SaaS with auth, billing, and admin',
      'Internal dashboards, CRMs, ops tooling',
      'Marketing sites with CMS-driven content',
      'Mobile-responsive, accessible, fast',
      'TypeScript end-to-end, typed contracts (tRPC, OpenAPI)',
    ],
  },
  {
    num: '04',
    title: 'Backend APIs & Microservices',
    tag: 'NestJS · FastAPI · PostgreSQL · Redis',
    desc:
      'REST and GraphQL APIs, microservices, event-driven backends. PostgreSQL by default, Redis for queues and cache, Docker for portability, AWS / Vercel / Railway for deployment.',
    bullets: [
      'NestJS / Node.js REST and GraphQL APIs',
      'Python FastAPI services for AI / data workloads',
      'Event-driven architectures with message queues',
      'Auth (OAuth2, JWT, sessions) and RBAC',
      'Observability: logs, metrics, traces, alerts',
    ],
  },
  {
    num: '05',
    title: 'Cloud Infrastructure & DevOps',
    tag: 'AWS · Docker · CI/CD · Terraform',
    desc:
      'Deploy and operate the systems I build — or take over what you already have. AWS-first, with Docker as the unit of deploy and GitHub Actions for CI/CD.',
    bullets: [
      'AWS architecture (ECS, RDS, S3, CloudFront, KMS)',
      'Docker + docker-compose for local and prod parity',
      'CI/CD pipelines (GitHub Actions, GitLab CI)',
      'Database design, migrations, backups, PITR',
      'Cost optimization and performance audits',
    ],
  },
  {
    num: '06',
    title: 'Migrations & Modernization',
    tag: 'Legacy → Modern · Refactor · Rescue',
    desc:
      'Stuck on a legacy stack? PHP monolith melting under load? Spreadsheet-driven ops? I migrate to modern, maintainable systems without freezing the business.',
    bullets: [
      'Legacy PHP / monolith → Node / NestJS / microservices',
      'Spreadsheet workflows → web + mobile SaaS',
      'Desktop-only tools → multi-tenant cloud platforms',
      'Failing or under-tested codebases → stable, covered, documented',
      'Phased rollouts with feature flags and parallel runs',
    ],
  },
];

const engagementModels = [
  {
    name: 'Fixed-Scope Project',
    blurb: 'Defined deliverable, agreed timeline, fixed price. Best for MVPs, AI pilots, and well-scoped features.',
  },
  {
    name: 'Hourly / Time & Materials',
    blurb: 'For ongoing work, R&D, or anything where scope evolves. Transparent weekly reporting.',
  },
  {
    name: 'Monthly Retainer',
    blurb: 'Reserved capacity each month for product, maintenance, and on-call. Fastest response, lowest friction.',
  },
  {
    name: 'Advisory / Code Review',
    blurb: 'A second pair of eyes on architecture, AI integrations, or hiring decisions. Hourly or per-engagement.',
  },
];

const process = [
  { step: '01', title: 'Discovery',  desc: '30-min call. What you want to build, what success looks like, where the risks are.' },
  { step: '02', title: 'Proposal',   desc: 'Scope, milestones, timeline, and price — usually within 48h. No surprise invoices.' },
  { step: '03', title: 'Build',      desc: 'Weekly demos, async updates, working software you can poke at. No theatre.' },
  { step: '04', title: 'Ship & Support', desc: 'Deployment, handover, docs. Optional retainer for what comes next.' },
];

export default function ServicesPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Rahul Panchal — Software Engineering Services',
    url: `${SITE_URL}/services`,
    image: `${SITE_URL}/apple-icon.png`,
    description: metadata.description as string,
    provider: {
      '@type': 'Person',
      name: 'Rahul Panchal',
      url: SITE_URL,
      jobTitle: 'Senior Software Engineer · Independent Automation Consultant',
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
              How I Can Help
              <span className="terminal-cursor" />
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              I build <span className="text-primary font-mono">AI tools</span>,{' '}
              <span className="text-primary font-mono">autonomous agents</span>,{' '}
              <span className="text-primary font-mono">automation pipelines</span>, and{' '}
              <span className="text-primary font-mono">production web apps</span> — from quick MVPs to enterprise-grade systems. Independent senior engineer — hands-on, end-to-end, accountable to outcomes.
            </p>
          </section>

          {/* Quick CTA strip */}
          <section className="mb-20 border border-primary/30 bg-primary/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-primary mb-1">
                <span className="w-1.5 h-1.5 bg-primary inline-block animate-pulse mr-2 align-middle" />
                available for work — 2 slots open
              </p>
              <p className="text-sm text-muted-foreground">
                Have a project in mind? Let's talk before scope creep eats your roadmap.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs hover:opacity-90 transition-opacity group/btn inline-flex items-center gap-2 whitespace-nowrap"
              >
                Start a project
                <span className="transition-transform group-hover/btn:translate-x-1 inline-block">→</span>
              </Link>
              <a
                href={WHATSAPP_URL}
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-primary/50 text-primary font-mono text-xs hover:bg-primary/10 transition-all inline-flex items-center gap-2 whitespace-nowrap"
              >
                WhatsApp →
              </a>
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

          {/* Engagement Models */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">02.</span> How We Can Work Together
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
            <p className="text-xs text-muted-foreground/60 font-mono mt-4">
              <span className="text-primary">//</span> not sure which fits? mention it in the message — I'll suggest the right one.
            </p>
          </section>

          {/* Process */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">03.</span> Process
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
              <span className="text-primary">04.</span> Who I Work Best With
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
              {[
                { name: 'Startup founders',     desc: 'Need a senior engineer to ship the first version or rebuild the second.' },
                { name: 'Growing SaaS teams',   desc: 'Need extra capacity on AI features, automation, or platform work.' },
                { name: 'Enterprises',          desc: 'Need a specialist for AI integration, legacy migration, or platform rescue.' },
              ].map((g) => (
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
              <h3 className="text-2xl font-bold text-foreground mb-3 font-mono">Let's build something.</h3>
              <p className="text-muted-foreground mb-6 max-w-xl text-sm leading-relaxed">
                The fastest path is a short message describing what you want to build and when you'd like it done. I'll reply within 24–48h with a plan or honest follow-up questions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-primary text-primary-foreground font-mono text-sm hover:opacity-90 transition-opacity group/btn inline-flex items-center gap-2"
                >
                  Send a message
                  <span className="transition-transform group-hover/btn:translate-x-1 inline-block">→</span>
                </Link>
                <a
                  href={WHATSAPP_URL}
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-primary/50 text-primary font-mono text-sm hover:bg-primary/10 transition-all inline-flex items-center gap-2"
                >
                  WhatsApp me →
                </a>
                <a
                  href="mailto:rhl.pncl@gmail.com?subject=Project%20inquiry"
                  className="px-6 py-3 border border-border text-foreground/80 font-mono text-sm hover:border-primary hover:text-primary transition-all inline-flex items-center gap-2"
                >
                  Email →
                </a>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
