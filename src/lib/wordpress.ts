export const WP_URL = 'https://sub.gopeaks.coach/wp-json/wp/v2';

export function stripHtml(html: string) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
}

type AcfImage = {
  ID?: number;
  url?: string;
  source_url?: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: Record<string, string>;
};

type BannerItem = {
  image?: AcfImage | string | number;
  title_banner?: string;
  sub_title?: string;
  banner_description?: string;
};

export interface WPCamp {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  acf: {
    banner_camp?: Array<{
      banner_start?: BannerItem[];
      banner_end?: BannerItem[];
    }>;
    location?: string;
    tag_camps?: Array<{
      name_tag?: string;
    }>;
    time_camp?: Array<{
      time_start?: string;
      time_end?: string;
    }>;
    duration?: string;
    max_people?: string | number;
    timeline_camp?: Array<{
      day_title?: string;
      day_heading?: string;
      sections_content_date?: Array<{
        section_name?: string;
        activities?: Array<{
          time?: string;
          title?: string;
          description?: string;
          type?: string;
        }>;
      }>;
    }>;
    participation_fee?: Array<{
      package_name?: string;
      badge?: string;
      price_package?: string;
      short_desc?: string;
      long_desc?: string;
      is_featured?: boolean;
    }>;
    service_camp?: Array<{
      title_service?: string;
      status_service?: boolean;
      content_service?: Array<{
        list_service?: string;
      }> | false | null;
      
    }>;
    camp_food?: AcfImage[];
    experience_camp?: Array<{
      title_service?: string;
      content_service?: string;
    }>;
    go_camp?: AcfImage[];
    location_camps?: Array<{
      title?: string;
      description?: string;
      map_camps?: string;
    }>;
    near_point_camp?: {
      title?: string;
      description?: string;
      info_near_point?: Array<{
        name?: string;
        distance?: string;
      }>;
    };
    check_loc_camps?: Array<{
      description_check_loc?: string;
      info_check_loc?: Array<{
        col_content?: string;
      }>;
      more_check_loc?: Array<{
        image_holtel?: AcfImage | string | number;
        detail_room?: string;
        name_holtel?: string;
        description_holtel?: string;
        tag_holtel?: string;
      }>;
    }>;
    moment_camps?: Array<{
      description?: string;
      image_moment?: AcfImage[];
    }>;
    coach?: Array<{
      ID?: number;
      post_title?: string;
      post_name?: string;
      post_status?: string;
    }> | string;
    faq_camps?: Array<{
      question?: string;
      answer?: string;
    }>;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

async function fetchWithCache<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    clearTimeout(id);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export function formatWPCampDate(timeCamp: any): string {
  if (!timeCamp) return 'Đang cập nhật';
  if (typeof timeCamp === 'string') return timeCamp;

  if (Array.isArray(timeCamp) && timeCamp.length > 0) {
    timeCamp = timeCamp[0];
  }

  const startStr = timeCamp.time_start || timeCamp.start || timeCamp.bTDU;
  const endStr = timeCamp.time_end || timeCamp.end;

  if (!startStr) return 'Đang cập nhật';

  const parseDateStr = (dStr: string) => {
    // Format YYYYMMDD (VD: 20260424)
    if (/^\d{8}$/.test(dStr)) {
      return {
        day: dStr.substring(6, 8),
        month: dStr.substring(4, 6),
        year: dStr.substring(0, 4),
      };
    }
    // Format d/m/Y hoặc Y-m-d
    const parts = dStr.split(/[-/.]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) return { year: parts[0], month: parts[1], day: parts[2] };
      return { day: parts[0], month: parts[1], year: parts[2] };
    }
    return null;
  };

  const start = parseDateStr(startStr);
  if (!start) return startStr;

  const end = endStr ? parseDateStr(endStr) : null;

  if (!end) return `${start.day}.${start.month}.${start.year}`;

  // Cùng tháng cùng năm: 24-26.04.2026
  if (start.month === end.month && start.year === end.year) {
    return `${start.day}-${end.day}.${start.month}.${start.year}`;
  }

  // Khác tháng: 24.04-02.05.2026
  return `${start.day}.${start.month}-${end.day}.${end.month}.${end.year}`;
}

export function getStartDateTimestamp(timeCamp: any): number {
  if (!timeCamp) return Infinity;
  if (Array.isArray(timeCamp) && timeCamp.length > 0) {
    timeCamp = timeCamp[0];
  }

  const startStr = timeCamp.time_start || timeCamp.start || timeCamp.bTDU;
  if (!startStr) return Infinity;

  const parseDateStr = (dStr: string) => {
    if (/^\d{8}$/.test(dStr)) {
      return {
        day: dStr.substring(6, 8),
        month: dStr.substring(4, 6),
        year: dStr.substring(0, 4),
      };
    }
    const parts = dStr.split(/[-/.]/);  
    if (parts.length === 3) {
      if (parts[0].length === 4) return { year: parts[0], month: parts[1], day: parts[2] };
      return { day: parts[0], month: parts[1], year: parts[2] };
    }
    return null;
  };

  const parsed = parseDateStr(startStr);
  if (!parsed) return Infinity;

  return new Date(`${parsed.year}-${parsed.month}-${parsed.day}`).getTime();
}

export function getEndDateTimestamp(timeCamp: any): number {
  if (!timeCamp) return Infinity;
  if (Array.isArray(timeCamp) && timeCamp.length > 0) {
    timeCamp = timeCamp[0];
  }

  const endStr = timeCamp.time_end || timeCamp.end;
  if (!endStr) return Infinity;

  const parseDateStr = (dStr: string) => {
    if (/^\d{8}$/.test(dStr)) {
      return {
        day: dStr.substring(6, 8),
        month: dStr.substring(4, 6),
        year: dStr.substring(0, 4),
      };
    }
    const parts = dStr.split(/[-/.]/);  
    if (parts.length === 3) {
      if (parts[0].length === 4) return { year: parts[0], month: parts[1], day: parts[2] };
      return { day: parts[0], month: parts[1], year: parts[2] };
    }
    return null;
  };

  const parsed = parseDateStr(endStr);
  if (!parsed) return Infinity;

  return new Date(`${parsed.year}-${parsed.month}-${parsed.day}`).getTime();
}

export function getCampStatus(timeCamp: any): 'upcoming' | 'active' | 'past' {
  const now = new Date().getTime();
  const startTimestamp = getStartDateTimestamp(timeCamp);
  const endTimestamp = getEndDateTimestamp(timeCamp);

  if (now < startTimestamp) return 'upcoming';
  if (now > endTimestamp) return 'past';
  return 'active';
}

export async function fetchWPCamps(): Promise<WPCamp[]> {
  const url = `${WP_URL}/camp?_embed&per_page=100`;
  try {
    return await fetchWithCache(url);
  } catch (err) {
    console.error('Failed to fetch camps from WordPress:', err);
    return [];
  }
}

export const getAllCamps = fetchWPCamps;

export async function fetchWPCampBySlug(slug: string): Promise<WPCamp | null> {
  const url = `${WP_URL}/camp?slug=${slug}&_embed`;
  try {
    const data: WPCamp[] = await fetchWithCache(url);
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error(`Failed to fetch camp ${slug}:`, err);
    return null;
  }
}

export const getCampBySlug = fetchWPCampBySlug;

export function mapWPCampToUpcomingCamp(wpCamp: WPCamp) {
  const acf = wpCamp.acf || {};

  // Image
  let imageUrl = '';
  if (!imageUrl && wpCamp._embedded?.['wp:featuredmedia']?.[0]) {
    imageUrl = wpCamp._embedded['wp:featuredmedia'][0].source_url;
  }
  const finalImageUrl = imageUrl || '/placeholder-camp.png';

  // Coaches
  let coaches: any[] = [];
  if (Array.isArray(acf.coach)) {
    coaches = acf.coach.map((c: any) => {
      if (typeof c === 'string') return { name: c };
      return {
        name: c.post_title || c.title?.rendered || c.name || '',
        slug: c.post_name || '',
        featuredImage: {
          node: { sourceUrl: c._embedded?.['wp:featuredmedia']?.[0]?.source_url || '' },
        },
      };
    });
  }

  // Pricing
  const pricingOptions = Array.isArray(acf.participation_fee)
    ? acf.participation_fee.map((i) => ({
        name: i.package_name || 'Gói Camp',
        title: i.package_name || 'Trọn gói',
        price: i.price_package || 'Liên hệ',
        note: i.short_desc || '',
        summary: i.long_desc || '',
        featured: !!(i.is_featured || i.badge?.toLowerCase().includes('phổ biến')),
      }))
    : [];

  // Timeline
  const programDays = Array.isArray(acf.timeline_camp)
    ? acf.timeline_camp.map((day, index) => {
        if (day.sections_content_date && Array.isArray(day.sections_content_date)) {
          return {
            id: `day-${index + 1}`,
            label: day.day_title || 'Day',
            subtitle: day.day_heading || '',
            date: '',
            summary: '',
            periods: day.sections_content_date.map((sec) => ({
              label: sec.section_name || '',
              entries: Array.isArray(sec.activities)
                ? sec.activities.map((it) => ({
                    time: it.time || '',
                    title: it.title || '',
                    description: it.description || '',
                    block: it.type?.toUpperCase() || 'LOGISTICS',
                  }))
                : [],
            })),
          };
        }
        return {
          id: `day-${index + 1}`,
          label: day.day_title || '',
          subtitle: day.day_heading || '',
          date: '',
          summary: '',
          periods: [],
        };
      })
    : [];

  return {
    id: wpCamp.slug || String(wpCamp.id),
    title: wpCamp.title.rendered || 'Đang cập nhật',
    slug: wpCamp.slug,
    destinationName: acf.location || 'Đang cập nhật',
    date: formatWPCampDate(acf.time_camp),
    duration: acf.duration || 'Đang cập nhật',
    priceFrom: acf.participation_fee?.[0]?.price_package || 'Liên hệ',
    seatsTotal: Number(acf.max_people) || 0,
    seatsLeft: 0,
    image: finalImageUrl,
    featuredImage: { node: { sourceUrl: finalImageUrl } },
    coaches,
    highlights: [],
    overview: wpCamp.content?.rendered || '',
    excerpt: (wpCamp.content?.rendered || '').substring(0, 200).replace(/<[^>]*>?/gm, ''),
    description: (wpCamp.excerpt?.rendered || wpCamp.content?.rendered || '').replace(/<[^>]*>?/gm, '').substring(0, 200),
    startTimestamp: getStartDateTimestamp(acf.time_camp),
    endTimestamp: getEndDateTimestamp(acf.time_camp),
    pricingOptions,
    programDays,
    acfRaw: acf,
    acfFields: acf,
  };
}

export async function getPageBySlug(slug: string) {
  const url = `${WP_URL}/pages?slug=${slug}&_embed`;
  try {
    const pages = await fetchWithCache<any[]>(url);
    if (pages.length > 0) {
      const page = pages[0];
      return {
        title: page.title.rendered,
        slug: page.slug,
        content: page.content.rendered,
        featuredImage: {
          node: { sourceUrl: page._embedded?.['wp:featuredmedia']?.[0]?.source_url || '' },
        },
        acfFields: page.acf || {},
      };
    }
    return null;
  } catch (err) {
    console.error(`Failed to fetch page ${slug}:`, err);
    return null;
  }
}

export async function getPageById(id: number | string) {
  const url = `${WP_URL}/pages/${id}?_embed`;
  try {
    const page = await fetchWithCache<any>(url);
    return {
      title: page.title.rendered,
      slug: page.slug,
      content: page.content.rendered,
      featuredImage: {
        node: { sourceUrl: page._embedded?.['wp:featuredmedia']?.[0]?.source_url || '' },
      },
      acfFields: page.acf || {},
    };
  } catch (err) {
    console.error(`Failed to fetch page ${id}:`, err);
    return null;
  }
}

export async function fetchWPStories(): Promise<any[]> {
  const url = `${WP_URL}/posts?categories=14&_embed&per_page=100`;
  try {
    const posts = await fetchWithCache<any[]>(url);
    return posts.map((post) => ({
      title: post.title.rendered,
      slug: post.slug,
      date: post.date,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      featuredImage: {
        node: { sourceUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '' },
      },
      acfFields: post.acf || {},
    }));
  } catch (err) {
    console.error('Failed to fetch stories from WordPress:', err);
    return [];
  }
}

export async function getRecentPosts(count: number = 10) {
  const url = `${WP_URL}/posts?_embed&per_page=${count}`;
  try {
    const posts = await fetchWithCache<any[]>(url);
    return posts.map((post) => ({
      title: post.title.rendered,
      slug: post.slug,
      date: post.date,
      excerpt: post.excerpt.rendered,
      featuredImage: {
        node: { sourceUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '' },
      },
      acfFields: post.acf || {},
    }));
  } catch (err) {
    console.error('Failed to fetch recent posts:', err);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  const url = `${WP_URL}/posts?slug=${slug}&_embed`;
  try {
    const posts = await fetchWithCache<any[]>(url);
    if (posts.length > 0) {
      const post = posts[0];
      return {
        title: post.title.rendered,
        slug: post.slug,
        date: post.date,
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        featuredImage: {
          node: { sourceUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '' },
        },
        acfFields: post.acf || {},
      };
    }
    return null;
  } catch (err) {
    console.error(`Failed to fetch post ${slug}:`, err);
    return null;
  }
}

export async function getCoaches() {
  const url = `${WP_URL}/coach?_embed&per_page=100`;
  try {
    const coaches = await fetchWithCache<any[]>(url);
    return coaches.map((coach) => ({
      title: coach.title.rendered,
      slug: coach.slug,
      content: coach.content.rendered,
      featuredImage: {
        node: { sourceUrl: coach._embedded?.['wp:featuredmedia']?.[0]?.source_url || '' },
      },
      acfFields: coach.acf,
    }));
  } catch (err) {
    console.error('Failed to fetch coaches:', err);
    return [];
  }
}

export async function getCoachBySlug(slug: string) {
  const url = `${WP_URL}/coach?slug=${slug}&_embed`;
  try {
    const coaches = await fetchWithCache<any[]>(url);
    if (coaches.length > 0) {
      const coach = coaches[0];
      return {
        title: coach.title.rendered,
        slug: coach.slug,
        content: coach.content.rendered,
        featuredImage: {
          node: { sourceUrl: coach._embedded?.['wp:featuredmedia']?.[0]?.source_url || '' },
        },
        acfFields: coach.acf,
      };
    }
    return null;
  } catch (err) {
    console.error(`Failed to fetch coach ${slug}:`, err);
    return null;
  }
}
const WP_BASE_URL = 'https://sub.gopeaks.coach';

export async function getRankMathSEO(pageUrl: string) {
  try {
    const apiUrl = `${WP_BASE_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(pageUrl)}`;
    const data = await fetchWithCache<{ head: string; success: boolean }>(apiUrl);
    if (!data.success) return null;

    const head = data.head;

    // Parse các thẻ cần thiết
    const titleMatch = head.match(/<title>([^<]+)<\/title>/);
    const descMatch = head.match(/name="description"\s+content="([^"]+)"/);
    const ogTitleMatch = head.match(/property="og:title"\s+content="([^"]+)"/);
    const ogDescMatch = head.match(/property="og:description"\s+content="([^"]+)"/);
    const ogImageMatch = head.match(/property="og:image"\s+content="([^"]+)"/);
    const canonicalMatch = head.match(/rel="canonical"\s+href="([^"]+)"/);

    return {
      title: titleMatch?.[1] || '',
      description: descMatch?.[1] || '',
      ogTitle: ogTitleMatch?.[1] || '',
      ogDescription: ogDescMatch?.[1] || '',
      ogImage: ogImageMatch?.[1] || '',
      canonical: canonicalMatch?.[1] || '',
      rawHead: head,
    };
  } catch (err) {
    console.error('Failed to fetch RankMath SEO:', err);
    return null;
  }
}