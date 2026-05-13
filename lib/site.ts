// Single source for site URL. Set NEXT_PUBLIC_SITE_URL in .env.local.
// Trailing slash stripped so callers can do `${SITE_URL}/path`.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rahul.raccog.com'
).replace(/\/$/, '');

export const SITE_NAME = 'Rahul Panchal';
