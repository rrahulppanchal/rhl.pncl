export interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  /** Full <title> override (rendered without the site-name template) */
  seoTitle?: string;
  seoDescription?: string;
}

export interface DB {
  blogs: Blog[];
}
