import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';
import { HomeContactForm } from '@/components/home-contact-form';
import { readDB, readProjectsDB } from '@/lib/db';
import { SITE_URL } from '@/lib/site';

const skillGroups = [
  {
    name: 'Generative AI and automation',
    items: ['Python', 'FastAPI', 'RAG', 'OpenAI API', 'Gemini API', 'LangChain', 'LangGraph', 'AI agents', 'n8n'],
  },
  {
    name: 'Frontend and mobile',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Native', 'Redux', 'TanStack Query', 'Tailwind CSS'],
  },
  {
    name: 'Backend and data',
    items: ['Node.js', 'NestJS', 'Express.js', 'REST APIs', 'PostgreSQL', 'Prisma', 'MongoDB', 'Redis', 'Java', 'Spring Boot'],
  },
  {
    name: 'Cloud and delivery',
    items: ['AWS EC2', 'S3', 'Lambda', 'RDS', 'CloudFront', 'Docker', 'CI/CD', 'GitHub', 'JWT/OAuth'],
  },
  {
    name: 'Team delivery',
    items: ['Technical leadership', 'Sprint planning', 'Estimation', 'Jira', 'Client communication', 'Mentoring'],
  },
];

const skills = skillGroups.flatMap(g => g.items);

const experiences = [
  {
    role: 'Contract Full-Stack Developer',
    company: 'Klego',
    location: 'Remote',
    period: 'June 2026 — Present',
    desc: 'I lead development of an AI application builder that turns natural-language requirements into Next.js applications using autonomous coding agents. My work spans architecture, frontend and backend development, model integrations, infrastructure, and deployment.',
    bullets: [
      'Build across React, Next.js, TypeScript, NestJS, PostgreSQL, and Prisma',
      'Integrate OpenAI and Gemini into the application-building workflow',
      'Implement Docker-isolated execution and real-time application previews',
      'Build immutable versioning, GitHub synchronization, JWT/OAuth authentication, and encrypted integrations',
      'Own delivery through AWS deployment',
    ],
  },
  {
    role: 'Senior Software Developer / Team Lead',
    company: 'Codzgarage Infotech Pvt Ltd',
    location: 'Ahmedabad, India',
    period: 'March 2023 — May 2026',
    desc: 'I worked as a hands-on senior developer and led a team of 7–8. I combined application architecture and development with sprint planning, estimates, Jira coordination, and regular client updates.',
    bullets: [
      'Architected and built applications with NestJS, Node.js, and TypeScript',
      'Integrated OpenAI and Gemini into enterprise workflows using LangChain and RAG',
      'Designed and managed AWS infrastructure, including serverless functions and auto-scaling',
      'Mentored junior developers on NestJS patterns and clean code',
      'Helped turn client requirements into scoped development work and coordinated delivery with the team',
    ],
  },
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'May 2021 — February 2023',
    desc: 'I developed custom MERN applications and worked on migrations from PHP and legacy systems to modular Node.js backends. I also built n8n workflows and custom scripts to connect third-party APIs with PostgreSQL databases.',
    bullets: [] as string[],
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
  'Case Studies':   'text-emerald-400 border-emerald-400/30',
};

export default function Page() {
  const blogsDB = readDB();
  const projectsDB = readProjectsDB();

  const featuredBlogs = blogsDB.blogs
    .filter(b => b.featured && b.published)
    .slice(0, 3);

  const featuredProjects = projectsDB.projects
    .filter(p => p.featured && p.published)
    .slice(0, 3);

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rahul Panchal',
    url: SITE_URL,
    image: `${SITE_URL}/apple-icon.png`,
    jobTitle: 'Full Stack & Generative AI Engineer',
    description:
      'Senior full-stack developer with 5+ years of experience across web, mobile, and backend engineering. Recent work includes an AI application builder, Python and FastAPI services, document-based RAG, and integrations with OpenAI and Gemini.',
    worksFor: {
      '@type': 'Organization',
      name: 'Klego',
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
      'https://linkedin.com/in/rrahulppanchal',
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
                Remote opportunities
              </span>
              <span className="text-muted-foreground/30 font-mono">·</span>
              <span className="text-xs font-mono text-muted-foreground">Ahmedabad, India</span>
            </div>

            {/* Name */}
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-4 leading-[1.05] font-mono glow-text glitch-hover tracking-tight">
              Rahul Panchal
            </h1>

            {/* Role lines */}
            <div className="mb-8 space-y-1 font-mono">
              <p className="text-2xl lg:text-3xl text-foreground/90 font-semibold leading-tight">
                Full Stack &amp; Generative AI Engineer
              </p>
              <p className="text-xl lg:text-2xl text-primary font-semibold leading-tight flex items-center gap-3">
                <span>I build AI-powered products from backend to launch.</span>
                <span className="terminal-cursor inline-block" style={{ verticalAlign: 'middle' }} />
              </p>
            </div>

            {/* Tagline */}
            <div className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8 space-y-4">
              <p>
                I&apos;m a senior full-stack developer with 5+ years of experience across web, mobile, and backend engineering. My recent work includes an AI application builder, Python and FastAPI services, document-based RAG, and integrations with OpenAI and Gemini.
              </p>
              <p className="text-foreground/80">
                At Klego, I work across the architecture and delivery of an AI application builder. I&apos;m also the solo founder of Raccog and built the Solviser mobile app and NestJS backend as its sole developer.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-mono text-sm font-semibold hover:opacity-90 transition-opacity group"
              >
                View my projects
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-3 font-mono text-sm hover:border-primary hover:text-primary transition-colors group"
              >
                <span>Discuss a role or project</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary px-2 py-3 font-mono text-sm transition-colors"
              >
                How I can help →
              </Link>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-px bg-border/60 border border-border/60">
              {[
                { v: '5+',            l: 'Years in software development' },
                { v: '7–8',           l: 'People in the team I led' },
                { v: 'Android + iOS', l: 'Solviser released on both stores' },
              ].map((s) => (
                <div key={s.l} className="bg-background px-4 py-4 flex flex-col">
                  <span className="text-xl lg:text-3xl font-bold text-primary font-mono glow-text leading-none">{s.v}</span>
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
            <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl mb-10">
              <p>
                I build applications across the frontend, backend, and infrastructure. My work combines React and Next.js interfaces with Node.js, NestJS, and Python services, with responsibility that continues through deployment.
              </p>
              <p>
                My current focus is Generative AI engineering. At Klego, I work on an application builder that turns natural-language requirements into Next.js applications. For Raccog, I developed Python APIs with FastAPI and document-based retrieval-augmented generation, alongside the platform&apos;s generation, preview, and publishing features.
              </p>
              <p>
                I also bring team-lead experience. At Codzgarage, I led a team of 7–8, planned sprints, prepared estimates, coordinated work in Jira, and handled client updates while continuing to build software.
              </p>
              <p>
                That range matters when a product needs more than one specialist handoff. I can work through an API design, build the interface that uses it, and follow the feature through to release. Solviser is an example: I built its React Native application and NestJS backend end to end and delivered the app on Android and iOS.
              </p>
            </div>
            <div className="space-y-6">
              {skillGroups.map((group) => (
                <div key={group.name}>
                  <p className="text-xs text-muted-foreground/80 font-mono mb-3">
                    <span className="text-primary">//</span> {group.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 border border-border text-primary text-xs font-mono hover:border-primary hover:bg-primary/5 hover:shadow-sm transition-all cursor"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
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
                      {job.bullets.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {job.bullets.map((b) => (
                            <li key={b} className="text-sm text-muted-foreground flex gap-2.5 leading-relaxed">
                              <span className="text-primary shrink-0 mt-1.5 text-[8px]">▹</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
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
                <h3 className="text-foreground font-semibold text-sm">Bachelor of Science in Mathematics</h3>
                <span className="text-xs px-2 py-0.5 border border-border text-muted-foreground font-mono">
                  Bundelkhand University, Jhansi
                </span>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mb-24 scroll-mt-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground font-mono glitch-hover">
                <span className="text-primary">03.</span> Selected projects
              </h2>
              <Link href="/projects" className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors">
                View all projects →
              </Link>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-8">
              AI application builders, document-based RAG, and a mobile product delivered on both major app stores. These projects show the parts I owned and the systems I built.
            </p>
            <div className="space-y-4">
              {featuredProjects.length === 0 ? (
                <p className="text-sm text-muted-foreground font-mono">
                  <span className="text-primary">{'>'}</span> No featured projects yet.
                </p>
              ) : (
                featuredProjects.map((project, i) => (
                  <Link
                    key={project.id}
                    href={project.caseStudy ?? `/projects/${project.slug}`}
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
                    {(project.subtitle || project.role) && (
                      <p className="text-xs font-mono mb-2 pl-9">
                        {project.subtitle && <span className="text-foreground/80">{project.subtitle}</span>}
                        {project.subtitle && project.role && <span className="text-muted-foreground/40"> · </span>}
                        {project.role && <span className="text-primary/80">{project.role}</span>}
                      </p>
                    )}
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground font-mono glitch-hover">
                  <span className="text-primary">04.</span> How I built these products
                </h2>
                <Link href="/blogs" className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors shrink-0 ml-4">
                  Read all articles →
                </Link>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-8">
                First-person case studies on the architecture, delivery scope, and engineering work behind Klego, Raccog, and Solviser.
              </p>
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
              <span className="text-primary">{featuredBlogs.length > 0 ? '05' : '04'}.</span> Let&apos;s talk about your next product
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl text-sm leading-relaxed">
              Looking for a senior engineer to build an AI feature, own a full-stack product, or join your team? Tell me about the work, the current stack, and the role you need filled.
            </p>

            <HomeContactForm />
          </section>

        </main>
      </div>
    </div>
  );
}
