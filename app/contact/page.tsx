'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="0" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 2.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactMethods = [
  {
    label: 'Email',
    value: 'rhl.pncl@gmail.com',
    Icon: MailIcon,
    link: 'mailto:rhl.pncl@gmail.com',
  },
  {
    label: 'Phone',
    value: '+91 63927 58956',
    Icon: PhoneIcon,
    link: 'tel:+916392758956',
  },
  {
    label: 'GitHub',
    value: 'rrahulppanchal',
    Icon: GitHubIcon,
    link: 'https://github.com/rrahulppanchal',
  },
  {
    label: 'LinkedIn',
    value: 'rrahulppanchal',
    Icon: LinkedInIcon,
    link: 'https://in.linkedin.com/in/rrahulppanchal',
  },
];

const inputClass =
  'w-full bg-input border border-border text-foreground px-4 py-3 focus:border-l-2 focus:border-primary focus:shadow-sm focus:outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/50';

const labelClass = 'block text-xs text-muted-foreground mb-2 font-mono';

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsLoading(false);
    setFormData({ name: '', email: '', subject: '', type: 'general', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-8 lg:px-16 pt-20 pb-20 lg:py-20 max-w-5xl">
          {/* Header */}
          <section className="mb-16">
            <p className="text-muted-foreground text-sm mb-4 font-mono">
              <span className="text-primary">{'>'}</span> Get in Touch
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-mono glow-text glitch-hover">
              Contact
              <span className="terminal-cursor" />
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Available for senior engineering roles, freelance projects, and AI/LLM integration work. Let's talk — I'm always open to interesting challenges and new opportunities.
            </p>
          </section>

          {/* Two-column layout on large screens */}
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Contact Form — left column */}
            <section className="flex-1 border border-border p-8">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border">
                <span className="text-xs text-muted-foreground font-mono">
                  <span className="text-primary">//</span> send_message.ts
                </span>
              </div>

              {submitted && (
                <div className="mb-6 p-4 border border-primary/40 bg-primary/5 text-sm font-mono">
                  <span className="text-primary">$ </span>
                  <span className="text-foreground">Message sent. Response expected within 24–48h.</span>
                  <span className="text-primary animate-[blink_1s_step-end_infinite]"> ▋</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={labelClass}>
                    {'/* '}name{' */'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    {'/* '}email{' */'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    {'/* '}subject{' */'}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    {'/* '}inquiry_type{' */'}
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ appearance: 'none' }}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="project">Project Discussion</option>
                    <option value="freelance">Freelance Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    {'/* '}message{' */'}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me more about your inquiry..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground py-3 font-mono text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>
                      Sending
                      <span className="animate-[blink_1s_step-end_infinite]">...</span>
                    </span>
                  ) : (
                    <>
                      Send Message
                      <span className="transition-transform group-hover/btn:translate-x-1 inline-block">→</span>
                    </>
                  )}
                </button>
              </form>
            </section>

            {/* Right column — contact methods + response info */}
            <aside className="lg:w-72 space-y-4">
              {/* Contact Cards */}
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 border border-dashed border-border p-5 hover:border-primary hover:bg-card/50 hover:shadow-sm transition-all group"
                >
                  <span className="text-muted-foreground group-hover:text-primary transition-colors mt-0.5 shrink-0">
                    <method.Icon />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-mono mb-1 group-hover:text-primary transition-colors">
                      {method.label}
                    </p>
                    <p className="text-sm text-foreground font-mono break-all">{method.value}</p>
                  </div>
                </a>
              ))}

              {/* Response Time */}
              <div className="border-t border-border pt-6 mt-6">
                <p className="text-xs text-muted-foreground font-mono mb-3">
                  <span className="text-primary">//</span> response_time
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Typically responds within{' '}
                  <span className="text-primary font-mono">24–48h</span>{' '}
                  on weekdays. Urgent? Reach out directly on LinkedIn or GitHub.
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>

    </div>
  );
}
