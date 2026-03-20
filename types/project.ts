export type ProjectStatus = 'Completed' | 'In Progress' | 'Planning' | 'Concept';

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
}

export interface ProjectsDB {
  projects: Project[];
}
