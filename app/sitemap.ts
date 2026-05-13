import type { MetadataRoute } from 'next';
import { readDB, readProjectsDB } from '@/lib/db';
import { SITE_URL } from '@/lib/site';

function parseDate(value: string): Date {
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,         lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/blogs`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/contact`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
  ];

  const blogEntries: MetadataRoute.Sitemap = readDB()
    .blogs.filter(b => b.published)
    .map(b => ({
      url: `${SITE_URL}/blogs/${b.slug}`,
      lastModified: parseDate(b.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const projectEntries: MetadataRoute.Sitemap = readProjectsDB()
    .projects.filter(p => p.published)
    .map(p => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: parseDate(p.year),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [...staticEntries, ...blogEntries, ...projectEntries];
}
