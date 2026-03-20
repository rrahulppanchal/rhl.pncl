import { Sidebar } from '@/components/sidebar';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 px-8 lg:px-16 py-16 lg:py-20 max-w-3xl">
          {/* Hero Section */}
          <section className="mb-24">
            <p className="text-muted-foreground text-sm mb-4 font-mono">
              <span className="text-primary">{'>'}</span> Welcome to my portfolio
            </p>
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance font-mono">
              Full-Stack Engineer
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Building intelligent systems and elegant digital experiences. TypeScript, React, Next.js, and cloud infrastructure. Based in India. Always shipping.
            </p>
          </section>

          {/* About Section */}
          <section id="about" className="mb-24 scroll-mt-20">
            <h3 className="text-2xl font-bold text-foreground mb-6 font-mono">
              <span className="text-primary">01.</span> About
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                I'm a full-stack engineer with a focus on building robust, scalable systems. I specialize in modern web technologies including TypeScript, React, Next.js, and cloud platforms. My expertise spans from frontend architecture to backend optimization.
              </p>
              <p>
                Currently developing AI-powered applications, CRM systems, and digital agriculture platforms. I believe in writing clean, maintainable code and designing systems with performance and user experience in mind.
              </p>
              <p className="text-sm font-mono text-primary">
                {'<'} Skills: TypeScript • React • Next.js • Node.js • PostgreSQL • AWS • Docker {'>'}
              </p>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="mb-24 scroll-mt-20">
            <h3 className="text-2xl font-bold text-foreground mb-6 font-mono">
              <span className="text-primary">02.</span> Experience
            </h3>
            <div className="space-y-8">
              {[
                { role: 'Full-Stack Developer', company: 'Various Projects', period: '2024 - Present', desc: 'Building AI chatbots, CRM platforms, and agricultural tech solutions using modern stack.' },
                { role: 'Web Developer', company: 'Multiple Clients', period: '2023 - 2024', desc: 'Developed responsive web applications and engineered backend services.' },
                { role: 'Open Source Contributor', company: 'GitHub', period: '2022 - Present', desc: '53+ public repositories focusing on developer tools and utilities.' },
              ].map((job, i) => (
                <div key={i} className="border-l-2 border-primary pl-6 py-2">
                  <h4 className="text-foreground font-semibold">{job.role}</h4>
                  <p className="text-sm text-primary mb-1">{job.company}</p>
                  <p className="text-xs text-muted-foreground mb-2">{job.period}</p>
                  <p className="text-sm text-muted-foreground">{job.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mb-24 scroll-mt-20">
            <h3 className="text-2xl font-bold text-foreground mb-6 font-mono">
              <span className="text-primary">03.</span> Projects
            </h3>
            <div className="space-y-6">
              {[
                { name: 'CRM System', tech: 'TypeScript • React • PostgreSQL', desc: 'Enterprise customer relationship management platform with advanced analytics.' },
                { name: 'AI Chatbot', tech: 'LLM • Next.js • Vector DB', desc: 'Intelligent conversation system with context awareness and multi-language support.' },
                { name: 'Digital Agriculture', tech: 'Node.js • IoT • ML', desc: 'Platform for crop management, yield prediction, and resource optimization.' },
                { name: 'Email Agent', tech: 'AI SDK • Workflow • Cloud Functions', desc: 'AI-powered email composition and optimization tool.' },
              ].map((project, i) => (
                <div key={i} className="border border-border p-6 hover:border-primary/50 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h4>
                    <span className="text-xs text-primary font-mono">{'>'}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">{project.tech}</p>
                  <p className="text-sm text-muted-foreground">{project.desc}</p>
                </div>
              ))}
            </div>
          </section>


        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-8 lg:px-16 bg-background/50 backdrop-blur-sm">
        <div className="flex justify-between items-center text-xs text-muted-foreground font-mono">
          <p>Crafted by Rahul Panchal</p>
          <p>© 2026</p>
        </div>
      </footer>
    </div>
  );
}
