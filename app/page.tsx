import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';
import { HomeContactForm } from '@/components/home-contact-form';
import { readDB, readProjectsDB } from '@/lib/db';
import { SITE_URL } from '@/lib/site';

const skills = [
  'NestJS', 'Node.js', 'TypeScript', 'React.js',
  'Next.js', 'Python', 'FastAPI', 'PostgreSQL',
  'MongoDB', 'AWS', 'Docker', 'Kubernetes',
  'Terraform', 'Serverless', 'CI/CD', 'GitHub Actions',
  'Cloud Infrastructure', 'Cloud Engineering', 'Infrastructure as Code', 'DevOps',
  'System Design', 'Distributed Systems', 'Event-Driven Architecture', 'Microservices',
  'API Design', 'Observability', 'Performance Engineering', 'Scalability',
  'LangChain', 'LangGraph', 'CrewAI', 'LlamaIndex',
  'RAG', 'OpenAI API', 'Anthropic Claude', 'Hugging Face',
  'pgvector', 'AI Agents', 'Redis', 'n8n',
];

const experiences = [
  {
    role: 'Independent Automation Engineer',
    company: 'Self-Employed',
    location: 'Remote · India',
    period: 'May 2026 — Present',
    desc: 'Partnering directly with businesses to design and ship automation systems — AI agents, workflow pipelines, and integrations that cut operational costs, eliminate repetitive work, and free teams to focus on growth. End-to-end ownership from discovery to production.',
  },
  {
    role: 'Senior Software Engineer',
    company: 'Codzgarage Infotech Pvt Ltd',
    location: 'Ahmedabad, Gujarat',
    period: 'Mar 2023 — May 2026',
    desc: 'Lead developer architecting end-to-end web applications with NestJS and Node.js. Spearheaded AI integration using Gemini and OpenAI with LangChain & RAG pipelines. Designed AWS infrastructure and mentored junior developers in NestJS design patterns.',
  },
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'May 2020 — Feb 2023',
    desc: 'Developed bespoke MERN stack applications for clients, migrating legacy PHP/monolithic systems to modular Node.js architectures. Built business automation pipelines using n8n and custom scripts to sync third-party APIs with PostgreSQL databases.',
  },
];

const categoryColors: Record<string, string> = {
  'Web Development': 'text-primary border-primary/30',
  'AI/ML':          'text-purple-400 border-purple-400/30',
  'Database':       'text-blue-400 border-blue-400/30',
  'TypeScript':     'text-cyan-400 border-cyan-400/30',
  'DevOps':         'text-orange-400 border-orange-400/30',
  'React':          'text-sky-400 border-sky-400/30',
  'Backend':        'text-amber-400 border-amber-400/30',
  'Testing':        'text-rose-400 border-rose-400/30',
};

export default function Page() {
  const blogsDB = readDB();
  const projectsDB = readProjectsDB();

  const featuredBlogs = blogsDB.blogs
    .filter(b => b.featured && b.published)
    .slice(0, 3);

  const featuredProjects = projectsDB.projects
    .filter(p => p.featured && p.published)
    .slice(0, 4);

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rahul Panchal',
    url: SITE_URL,
    image: `${SITE_URL}/apple-icon.png`,
    jobTitle: 'Senior Software Engineer · Independent Automation Consultant',
    description:
      '6+ years building scalable Node.js & NestJS systems, MERN apps, and Python-powered AI agents with LangChain, LangGraph, CrewAI, RAG pipelines, and LLM APIs. Now partnering with businesses to ship automation that cuts costs, kills repetitive work, and unlocks growth. 20+ production builds, ~65% average ops cost reduction.',
    worksFor: {
      '@type': 'Organization',
      name: 'Self-Employed',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    knowsAbout: skills,
    sameAs: [
      'https://github.com/rrahulppanchal',
      'https://in.linkedin.com/in/rrahulppanchal',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Bundelkhand University, Jhansi',
    },
    email: 'mailto:rhl.pncl@gmail.com',
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="flex min-h-screen">
        <Sidebar />

        {/* Main Content — top padding accounts for mobile hamburger button */}
        <main className="flex-1 px-8 lg:px-16 pt-20 pb-20 lg:py-20 max-w-3xl">

          {/* Hero Section */}
          <section className="mb-24 scanline">
            {/* Top strip: command prompt + status pill */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <p className="text-muted-foreground text-xs font-mono flex items-center gap-2">
                <span className="text-primary animate-[blink_1s_step-end_infinite]">▋</span>
                <span>./portfolio --boot</span>
              </p>
              <span className="text-muted-foreground/30 font-mono">·</span>
              <span className="inline-flex items-center gap-2 text-xs font-mono text-primary/80 border border-primary/25 bg-primary/5 px-3 py-1">
                <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full" />
                available for work
              </span>
              <span className="text-muted-foreground/30 font-mono">·</span>
              <span className="text-xs font-mono text-muted-foreground">India · Remote</span>
            </div>

            {/* Name */}
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-4 leading-[1.05] font-mono glow-text glitch-hover tracking-tight">
              Rahul Panchal
            </h1>

            {/* Role lines */}
            <div className="mb-8 space-y-1 font-mono">
              <p className="text-2xl lg:text-3xl text-foreground/90 font-semibold leading-tight">
                Senior Software Engineer
              </p>
              <p className="text-2xl lg:text-3xl text-primary font-semibold leading-tight flex items-center gap-3">
                <span>&amp; Automation Consultant</span>
                <span className="terminal-cursor inline-block" style={{ verticalAlign: 'middle' }} />
              </p>
            </div>

            {/* Tagline */}
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
              6+ years building scalable Node.js &amp; NestJS systems, MERN apps, and Python-powered AI agents with LangChain, LangGraph, CrewAI, RAG pipelines, and LLM APIs.
              <br />
              <span className="text-foreground/80">
                Now partnering with businesses to ship automation that cuts costs, kills repetitive work, and unlocks growth.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-mono text-sm font-semibold hover:opacity-90 transition-opacity group"
              >
                Start a project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-3 font-mono text-sm hover:border-primary hover:text-primary transition-colors group"
              >
                <span className="text-primary">$</span>
                <span>view work</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary px-2 py-3 font-mono text-sm transition-colors"
              >
                services →
              </Link>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-px bg-border/60 border border-border/60">
              {[
                { v: '6+',   l: 'years shipping' },
                { v: '20+',  l: 'production builds' },
                { v: '~65%', l: 'avg ops cost cut' },
              ].map((s) => (
                <div key={s.l} className="bg-background px-4 py-4 flex flex-col">
                  <span className="text-2xl lg:text-3xl font-bold text-primary font-mono glow-text leading-none">{s.v}</span>
                  <span className="text-[11px] text-muted-foreground font-mono mt-2 uppercase tracking-wider">{s.l}</span>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="mb-24 scroll-mt-20">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">01.</span> About
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl mb-8">
              <p>
                Innovative Senior Software Engineer with 6+ years of experience specializing in scalable Node.js and NestJS architectures, distributed systems, and event-driven microservices. Expert in the MERN stack, Python AI services, and cloud-native engineering on AWS — designing resilient cloud infrastructure with Kubernetes, Terraform, serverless functions, and full CI/CD pipelines. Now operating independently as an automation consultant — partnering directly with businesses to ship systems that cut operational costs and eliminate the repetitive work that drains teams.
              </p>
              <p>
                I bridge robust backend engineering with intelligent AI integration and production-grade cloud engineering — building LLM-powered applications, RAG pipelines, and autonomous AI agents in Python with LangGraph, CrewAI, and LlamaIndex on top of observable, infrastructure-as-code-driven deployments. Recognized for technical leadership, successfully migrating legacy systems to modern SaaS platforms and delivering 20+ production-ready enterprise solutions. Focused now on translating that engineering depth — system design, scalability, performance, observability — into measurable business outcomes: faster workflows, lower headcount strain, more time for the work that actually moves revenue.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 border border-border text-primary text-xs font-mono hover:border-primary hover:bg-primary/5 hover:shadow-sm transition-all cursor"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="mb-24 scroll-mt-20">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">02.</span> Experience
            </h2>
            <div className="relative">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
              <div className="space-y-10 pl-8">
                {experiences.map((job, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-8 top-1.5 w-3 h-3 border border-primary bg-background group-hover:bg-primary transition-colors" />
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors">
                          {job.role}
                        </h3>
                        <span className="text-xs px-2 py-0.5 border border-primary/30 text-primary font-mono">
                          {job.company}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground/60 mb-2 font-mono">
                        {'/* '}{job.period} · {job.location}{' */'}
                      </p>
                      <p className="text-sm text-muted-foreground">{job.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mt-12 border-t border-border pt-8">
              <p className="text-xs text-muted-foreground/60 font-mono mb-4">
                <span className="text-primary">//</span> education
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-foreground font-semibold text-sm">B.Sc. Mathematics</h3>
                <span className="text-xs px-2 py-0.5 border border-border text-muted-foreground font-mono">
                  Bundelkhand University, Jhansi
                </span>
                <span className="text-xs text-muted-foreground/50 font-mono">/* 2018 – 2021 */</span>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mb-24 scroll-mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground font-mono glitch-hover">
                <span className="text-primary">03.</span> Projects
              </h2>
              <Link href="/projects" className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors">
                all projects →
              </Link>
            </div>
            <div className="space-y-4">
              {featuredProjects.length === 0 ? (
                <p className="text-sm text-muted-foreground font-mono">
                  <span className="text-primary">{'>'}</span> No featured projects yet.
                </p>
              ) : (
                featuredProjects.map((project, i) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="block border border-border p-6 hover:border-primary hover:shadow-md transition-all group corner-cut"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-primary/40 font-mono">
                          [{String(i + 1).padStart(2, '0')}]
                        </span>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                      </div>
                      <span className="text-primary text-sm font-mono transition-transform group-hover:translate-x-1 inline-block shrink-0 ml-4">→</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 font-mono pl-9">
                      {project.tech.join(' • ')}
                    </p>
                    <p className="text-sm text-muted-foreground pl-9">{project.description}</p>
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* Featured Writing Section */}
          {featuredBlogs.length > 0 && (
            <section id="writing" className="mb-24 scroll-mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground font-mono glitch-hover">
                  <span className="text-primary">04.</span> Writing
                </h2>
                <Link href="/blogs" className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors">
                  all posts →
                </Link>
              </div>
              <div className="space-y-4">
                {featuredBlogs.map((blog, i) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.slug}`}
                    className="block border border-border p-6 hover:border-primary hover:shadow-md transition-all group corner-cut"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-primary/40 font-mono shrink-0">
                            [{String(i + 1).padStart(2, '0')}]
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 border font-mono ${categoryColors[blog.category] ?? 'text-primary border-primary/30'}`}>
                            {blog.category}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1 pl-9 line-clamp-1">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-muted-foreground pl-9 line-clamp-2">{blog.description}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs text-muted-foreground/60 font-mono mb-1">{blog.date}</p>
                        <p className="text-xs text-muted-foreground/40 font-mono">{blog.readTime}</p>
                        <span className="text-primary text-sm font-mono mt-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Quick Contact Section */}
          <section id="contact" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-foreground mb-3 font-mono glitch-hover">
              <span className="text-primary">{featuredBlogs.length > 0 ? '05' : '04'}.</span> Say Hello
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl text-sm leading-relaxed">
              Have a project in mind or want to discuss opportunities? Send me a message and I'll get back to you within{' '}
              <span className="text-primary font-mono">24–48h</span>.
            </p>

            <HomeContactForm />
          </section>

        </main>
      </div>
    </div>
  );
}
