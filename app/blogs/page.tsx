import { Sidebar } from '@/components/sidebar';

export default function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: 'Building Scalable Web Applications with Next.js',
      description: 'Deep dive into Next.js 16 features, server components, and best practices for building performant applications.',
      date: '2026-03-15',
      readTime: '12 min read',
      category: 'Web Development',
      tags: ['Next.js', 'TypeScript', 'Performance'],
    },
    {
      id: 2,
      title: 'Understanding AI Chatbots and LLM Integration',
      description: 'Comprehensive guide to implementing AI chatbots using LLMs, vector databases, and proper prompt engineering.',
      date: '2026-03-10',
      readTime: '15 min read',
      category: 'AI/ML',
      tags: ['AI', 'LLM', 'Integration'],
    },
    {
      id: 3,
      title: 'PostgreSQL Optimization Techniques',
      description: 'Best practices for optimizing PostgreSQL queries, indexing strategies, and database architecture.',
      date: '2026-03-05',
      readTime: '10 min read',
      category: 'Database',
      tags: ['PostgreSQL', 'Performance', 'Database Design'],
    },
    {
      id: 4,
      title: 'TypeScript Type System Mastery',
      description: 'Advanced TypeScript concepts including generics, conditional types, and utility types for production code.',
      date: '2026-02-28',
      readTime: '14 min read',
      category: 'TypeScript',
      tags: ['TypeScript', 'Type System', 'Advanced'],
    },
    {
      id: 5,
      title: 'Docker and Containerization Best Practices',
      description: 'Guide to containerizing applications, optimizing Docker images, and orchestrating with Docker Compose.',
      date: '2026-02-20',
      readTime: '11 min read',
      category: 'DevOps',
      tags: ['Docker', 'DevOps', 'Containers'],
    },
    {
      id: 6,
      title: 'React Hooks: From Basics to Advanced Patterns',
      description: 'Mastering React hooks including custom hooks, context, and state management patterns for modern React.',
      date: '2026-02-15',
      readTime: '13 min read',
      category: 'React',
      tags: ['React', 'Hooks', 'State Management'],
    },
    {
      id: 7,
      title: 'API Design Principles for Modern Applications',
      description: 'RESTful and GraphQL API design patterns, authentication, rate limiting, and best practices.',
      date: '2026-02-10',
      readTime: '12 min read',
      category: 'Backend',
      tags: ['API', 'REST', 'Design'],
    },
    {
      id: 8,
      title: 'Testing Strategies for Full-Stack Applications',
      description: 'Unit testing, integration testing, E2E testing strategies and tools for comprehensive test coverage.',
      date: '2026-02-05',
      readTime: '9 min read',
      category: 'Testing',
      tags: ['Testing', 'Quality', 'Jest'],
    },
  ];

  const categories = Array.from(new Set(blogs.map(b => b.category)));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-8 lg:px-16 py-16 lg:py-20 max-w-4xl">
          {/* Header */}
          <section className="mb-16">
            <p className="text-muted-foreground text-sm mb-4 font-mono">
              <span className="text-primary">{'>'}</span> Thoughts and Insights
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Articles on web development, system design, AI integration, and engineering best practices.
            </p>
          </section>

          {/* Category Filter */}
          <section className="mb-12">
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-mono hover:opacity-90 transition-opacity">
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 border border-border text-muted-foreground text-sm font-mono hover:border-primary hover:text-foreground transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Blog Posts */}
          <section className="space-y-8 mb-20">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="border-l-2 border-primary pl-6 py-4 hover:pl-8 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {blog.description}
                    </p>
                  </div>
                  <span className="text-xs text-primary font-mono whitespace-nowrap ml-4">→</span>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 mb-3 text-xs text-muted-foreground font-mono">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                  <span>•</span>
                  <span className="text-primary">{blog.category}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-primary/5 text-primary border border-primary/20 rounded font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>

          {/* Newsletter Section */}
          <section className="border border-border p-8 bg-card/30 rounded">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-mono">
              <span className="text-primary">{'<'}</span> Subscribe to Updates
              <span className="text-primary">{'>'}</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Get the latest articles directly in your inbox. No spam, just quality content about web development and engineering.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your email"
                className="flex-1 bg-input border border-border text-foreground px-4 py-2 focus:border-primary focus:outline-none transition-colors text-sm font-mono"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground font-mono text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
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
