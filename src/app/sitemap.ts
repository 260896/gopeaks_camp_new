import { MetadataRoute } from 'next';

const FRONT_DOMAIN = 'https://gopeaks.camp';
const WP_API = 'https://sub.gopeaks.coach/wp-json/wp/v2';

// Revalidate every 12 hours
export const revalidate = 43200;

async function wpFetch<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 43200 } });
    if (!res.ok) return [] as unknown as T;
    return res.json();
  } catch {
    return [] as unknown as T;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ──────────────────────────────────────────────
  // 1. Fetch all dynamic content from WordPress
  // ──────────────────────────────────────────────
  const [camps, coaches, stories] = await Promise.all([
    wpFetch<Array<{ slug: string; modified: string }>>(
      `${WP_API}/camp?per_page=100&_fields=slug,modified`
    ),
    wpFetch<Array<{ slug: string; modified: string }>>(
      `${WP_API}/coach?per_page=100&_fields=slug,modified`
    ),
    wpFetch<Array<{ slug: string; modified: string }>>(
      `${WP_API}/posts?categories=14&per_page=100&_fields=slug,modified`
    ),
  ]);

  const now = new Date().toISOString();

  // ──────────────────────────────────────────────
  // 2. Static pages
  // ──────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${FRONT_DOMAIN}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${FRONT_DOMAIN}/camps`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${FRONT_DOMAIN}/coaches`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${FRONT_DOMAIN}/stories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${FRONT_DOMAIN}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // ──────────────────────────────────────────────
  // 3. Camp detail pages
  // ──────────────────────────────────────────────
  const campPages: MetadataRoute.Sitemap = Array.isArray(camps)
    ? camps.map((camp) => ({
        url: `${FRONT_DOMAIN}/camps/${camp.slug}`,
        lastModified: camp.modified ? new Date(camp.modified).toISOString() : now,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      }))
    : [];

  // ──────────────────────────────────────────────
  // 4. Coach profile pages
  // ──────────────────────────────────────────────
  const coachPages: MetadataRoute.Sitemap = Array.isArray(coaches)
    ? coaches.map((coach) => ({
        url: `${FRONT_DOMAIN}/coaches/${coach.slug}`,
        lastModified: coach.modified ? new Date(coach.modified).toISOString() : now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    : [];

  // ──────────────────────────────────────────────
  // 5. Story / blog post pages
  // ──────────────────────────────────────────────
  const storyPages: MetadataRoute.Sitemap = Array.isArray(stories)
    ? stories.map((story) => ({
        url: `${FRONT_DOMAIN}/stories/${story.slug}`,
        lastModified: story.modified ? new Date(story.modified).toISOString() : now,
        changeFrequency: 'monthly' as const,
        priority: 0.65,
      }))
    : [];

  return [
    ...staticPages,
    ...campPages,
    ...coachPages,
    ...storyPages,
  ];
}
