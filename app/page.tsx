'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';

type FeaturedBlog = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
};

type FeaturedProject = {
  id: string;
  slug: string;
  name: string;
  description: string;
  tech: string[];
  status: string;
  featured: boolean;
  published: boolean;
};

const skills = [
  'NestJS', 'Node.js', 'TypeScript', 'React.js',
  'Next.js', 'PostgreSQL', 'MongoDB', 'AWS',
  'Docker', 'LangChain', 'RAG', 'OpenAI API',
  'LangGraph', 'Redis', 'Microservices', 'n8n',
];

const experiences = [
  {
    role: 'Senior Software Developer',
    company: 'Codzgarage Infotech Pvt Ltd',
    location: 'Ahmedabad, Gujarat',
    period: 'Mar 2023 — Present',
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


const inputClass =
  'w-full bg-input border border-border text-foreground px-4 py-3 focus:border-l-2 focus:border-primary focus:shadow-sm focus:outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/50';

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
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [featuredBlogs, setFeaturedBlogs] = useState<FeaturedBlog[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then(r => r.json())
      .then((blogs: (FeaturedBlog & { featured: boolean; published: boolean })[]) => {
        setFeaturedBlogs(blogs.filter(b => b.featured && b.published).slice(0, 3));
      })
      .catch(() => {});

    fetch('/api/projects')
      .then(r => r.json())
      .then((projects: FeaturedProject[]) => {
        setFeaturedProjects(projects.filter(p => p.featured && p.published).slice(0, 4));
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        {/* Main Content — top padding accounts for mobile hamburger button */}
        <main className="flex-1 px-8 lg:px-16 pt-20 pb-20 lg:py-20 max-w-3xl">

          {/* Hero Section */}
          <section className="mb-24 scanline">
            <p className="text-muted-foreground text-sm mb-6 font-mono flex items-center gap-2">
              <span className="text-primary animate-[blink_1s_step-end_infinite]">▋</span>
              <span>initializing portfolio...</span>
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono glow-text glitch-hover">
              Senior
              <br />
              Software Dev
              <span className="terminal-cursor" />
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              3+ years building scalable Node.js & NestJS systems, MERN stack applications, and AI-powered solutions using LangChain, RAG pipelines, and LLM APIs. Based in India.{' '}
              <span className="text-primary font-mono">Always shipping.</span>
            </p>
          </section>

          {/* About Section */}
          <section id="about" className="mb-24 scroll-mt-20">
            <h3 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">01.</span> About
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl mb-8">
              <p>
                Innovative Senior Software Developer with 3+ years of experience specializing in scalable Node.js and NestJS architectures. Expert in the MERN stack and cloud-native solutions on AWS.
              </p>
              <p>
                I bridge robust backend engineering with intelligent AI integration — building LLM-powered applications, RAG pipelines, and autonomous AI agents. Recognized for technical leadership, successfully migrating legacy systems to modern SaaS platforms and delivering 20+ production-ready enterprise solutions.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 border border-border text-primary text-xs font-mono hover:border-primary hover:bg-primary/5 hover:shadow-sm transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="mb-24 scroll-mt-20">
            <h3 className="text-2xl font-bold text-foreground mb-8 font-mono glitch-hover">
              <span className="text-primary">02.</span> Experience
            </h3>
            <div className="relative">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
              <div className="space-y-10 pl-8">
                {experiences.map((job, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-8 top-1.5 w-3 h-3 border border-primary bg-background group-hover:bg-primary transition-colors" />
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h4 className="text-foreground font-semibold group-hover:text-primary transition-colors">
                          {job.role}
                        </h4>
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
                <h4 className="text-foreground font-semibold text-sm">B.Sc. Mathematics</h4>
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
              <h3 className="text-2xl font-bold text-foreground font-mono glitch-hover">
                <span className="text-primary">03.</span> Projects
              </h3>
              <Link href="/projects" className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors">
                all projects →
              </Link>
            </div>
            <div className="space-y-4">
              {featuredProjects.length === 0 ? (
                // Skeleton placeholders while loading
                [0, 1, 2].map(i => (
                  <div key={i} className="border border-border p-6 corner-cut animate-pulse">
                    <div className="h-4 bg-border rounded w-1/3 mb-3" />
                    <div className="h-3 bg-border rounded w-1/2 mb-2" />
                    <div className="h-3 bg-border rounded w-3/4" />
                  </div>
                ))
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
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h4>
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
                <h3 className="text-2xl font-bold text-foreground font-mono glitch-hover">
                  <span className="text-primary">04.</span> Writing
                </h3>
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
                        <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1 pl-9 line-clamp-1">
                          {blog.title}
                        </h4>
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
            <h3 className="text-2xl font-bold text-foreground mb-3 font-mono glitch-hover">
              <span className="text-primary">{featuredBlogs.length > 0 ? '05' : '04'}.</span> Say Hello
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl text-sm leading-relaxed">
              Have a project in mind or want to discuss opportunities? Send me a message and I'll get back to you within{' '}
              <span className="text-primary font-mono">24–48h</span>.
            </p>

            <div className="border border-border">
              {/* Terminal header bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
                <span className="text-xs text-muted-foreground font-mono ml-3">contact.sh</span>
              </div>

              <div className="p-8">
                {sent && (
                  <div className="mb-6 p-4 border border-primary/40 bg-primary/5 text-sm font-mono">
                    <span className="text-primary">$ </span>
                    <span className="text-foreground">Message sent. I'll be in touch soon.</span>
                    <span className="text-primary animate-[blink_1s_step-end_infinite]"> ▋</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2 font-mono">
                        {'/* '}name{' */'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2 font-mono">
                        {'/* '}email{' */'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted-foreground mb-2 font-mono">
                      {'/* '}message{' */'}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-3 font-mono text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Sending<span className="animate-[blink_1s_step-end_infinite]">...</span></span>
                    ) : (
                      <>
                        Send Message
                        <span className="transition-transform group-hover/btn:translate-x-1 inline-block">→</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
