export type ProjectStatus = 'Completed' | 'In Progress' | 'Planning' | 'Concept';

/** featured: top project cards · other: "Other work" list · unlisted: page only, not shown in the index */
export type ProjectSection = 'featured' | 'other' | 'unlisted';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  content: string;
  tech: string[];
  year: string;
  link: string;
  github: string;
  status: ProjectStatus;
  featured: boolean;
  published: boolean;
  // Optional presentation fields
  subtitle?: string;
  role?: string;
  /** Overrides the status badge text, e.g. "Ongoing • June 2026 – Present" */
  statusLabel?: string;
  /** Path of the long-form case study (a /blogs route) */
  caseStudy?: string;
  caseStudyLabel?: string;
  /** Extra outbound links, e.g. store listings */
  links?: ProjectLink[];
  section?: ProjectSection;
  /** Lower sorts first; projects without an order fall back to year */
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProjectsDB {
  projects: Project[];
}
