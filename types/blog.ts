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
}

export interface DB {
  blogs: Blog[];
}
