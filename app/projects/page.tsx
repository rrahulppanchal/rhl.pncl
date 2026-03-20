import { Sidebar } from '@/components/sidebar';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: 'CRM System',
      description: 'Enterprise customer relationship management platform with advanced analytics, user management, and pipeline tracking.',
      tech: ['TypeScript', 'React', 'PostgreSQL', 'Node.js', 'AWS'],
      year: '2024',
      link: '#',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'AI Chatbot',
      description: 'Intelligent conversation system with context awareness, multi-language support, and seamless integration capabilities.',
      tech: ['LLM API', 'Next.js', 'Vector DB', 'Python', 'FastAPI'],
      year: '2026',
      link: '#',
      status: 'In Progress',
    },
    {
      id: 3,
      name: 'Digital Agriculture Platform',
      description: 'IoT-based platform for crop management, yield prediction, resource optimization, and farmer analytics.',
      tech: ['Node.js', 'IoT', 'ML Models', 'React', 'MongoDB'],
      year: '2026',
      link: '#',
      status: 'In Progress',
    },
    {
      id: 4,
      name: 'Email Agent',
      description: 'AI-powered email composition, optimization, and delivery system with template management.',
      tech: ['AI SDK', 'Workflow', 'Cloud Functions', 'TypeScript'],
      year: '2026',
      link: '#',
      status: 'Planning',
    },
    {
      id: 5,
      name: 'Portfolio Platform',
      description: 'Minimalist portfolio builder for developers with technical theme support and custom domain integration.',
      tech: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
      year: '2026',
      link: '#',
      status: 'Concept',
    },
    {
      id: 6,
      name: 'Code Analytics Dashboard',
      description: 'Real-time analytics dashboard for GitHub repositories with insights on code quality and contributions.',
      tech: ['React', 'D3.js', 'GitHub API', 'TypeScript', 'PostgreSQL'],
      year: '2025',
      link: '#',
      status: 'Planning',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-8 lg:px-16 py-16 lg:py-20 max-w-4xl">
          {/* Header */}
          <section className="mb-16">
            <p className="text-muted-foreground text-sm mb-4 font-mono">
              <span className="text-primary">{'>'}</span> Featured Work
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              A collection of projects spanning full-stack development, AI/ML, and cloud infrastructure. Each represents a unique challenge and learning opportunity.
            </p>
          </section>

          {/* Projects Grid */}
          <section className="mb-20">
            <div className="space-y-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-border p-8 hover:border-primary/50 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded font-mono">
                        {project.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 border border-border text-muted-foreground font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href={project.link}
                    className="text-primary hover:text-accent transition-colors text-sm font-mono inline-flex items-center gap-2"
                  >
                    View Project <span>→</span>
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="border-t border-border pt-16">
            <h3 className="text-xl font-bold text-foreground mb-8 font-mono">
              <span className="text-primary">//</span> Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Projects', value: '6+' },
                { label: 'Completed', value: '2' },
                { label: 'In Progress', value: '2' },
                { label: 'Technologies', value: '15+' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-8 lg:px-16 bg-background/50 backdrop-blur-sm">
        <div className="flex justify-between items-center text-xs text-muted-foreground font-mono max-w-7xl mx-auto">
          <p>Crafted by Rahul Panchal</p>
          <p>© 2026</p>
        </div>
      </footer>
    </div>
  );
}
