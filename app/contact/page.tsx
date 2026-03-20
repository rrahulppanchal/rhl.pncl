'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsLoading(false);
    setFormData({ name: '', email: '', subject: '', type: 'general', message: '' });
    
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactMethods = [
    {
      label: 'Email',
      value: 'rahul@example.com',
      icon: '✉',
      link: 'mailto:rahul@example.com',
    },
    {
      label: 'GitHub',
      value: 'github.com/rrahulppanchal',
      icon: '⚙',
      link: 'https://github.com/rrahulppanchal',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/rrahulppanchal',
      icon: '🔗',
      link: 'https://in.linkedin.com/in/rrahulppanchal',
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
              <span className="text-primary">{'>'}</span> Get in Touch
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono">
              Contact
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Interested in collaborating or have a project in mind? Let's talk. I'm always open to new opportunities and interesting ideas.
            </p>
          </section>

          {/* Contact Methods */}
          <section className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, idx) => (
              <a
                key={idx}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border p-6 hover:border-primary hover:bg-card/50 transition-all group"
              >
                <p className="text-2xl mb-3">{method.icon}</p>
                <h3 className="text-sm font-mono text-muted-foreground mb-2 group-hover:text-primary transition-colors">
                  {method.label}
                </h3>
                <p className="text-sm text-foreground font-mono break-all">{method.value}</p>
              </a>
            ))}
          </section>

          {/* Contact Form */}
          <section className="mb-20 border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-mono">
              <span className="text-primary">/</span>/Send a Message
            </h2>

            {submitted && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary/50 text-primary text-sm font-mono">
                <span className="text-lg mr-2">✓</span>
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-widest">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-input border border-border text-foreground px-4 py-3 focus:border-primary focus:outline-none transition-colors text-sm placeholder:text-muted-foreground"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-input border border-border text-foreground px-4 py-3 focus:border-primary focus:outline-none transition-colors text-sm placeholder:text-muted-foreground"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-widest">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="w-full bg-input border border-border text-foreground px-4 py-3 focus:border-primary focus:outline-none transition-colors text-sm placeholder:text-muted-foreground"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-widest">
                  Inquiry Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-input border border-border text-foreground px-4 py-3 focus:border-primary focus:outline-none transition-colors text-sm"
                >
                  <option value="general">General Inquiry</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="project">Project Discussion</option>
                  <option value="freelance">Freelance Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me more about your inquiry..."
                  className="w-full bg-input border border-border text-foreground px-4 py-3 focus:border-primary focus:outline-none transition-colors text-sm resize-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-3 font-mono text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </section>

          {/* Response Time */}
          <section className="border-t border-border pt-12">
            <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">
              <span className="text-primary">//</span> Response Time
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              I typically respond to inquiries within 24-48 hours on weekdays. For urgent matters, feel free to reach out on LinkedIn or GitHub directly.
            </p>
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
