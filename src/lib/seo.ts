const WP_DOMAIN = "https://sub.gopeaks.coach";
const FRONT_DOMAIN = "https://gopeaks.camp";

export function replaceWPDomain(str: string): string {
  if (!str) return str;
  return str.replaceAll(WP_DOMAIN, FRONT_DOMAIN);
}

export interface ParsedRankMathSEO {
  title: string;
  description: string;
  robots: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  schema: string | null; // raw JSON-LD string
}

/**
 * Parse the raw <head> HTML string returned by the RankMath API.
 * All sub.gopeaks.coach domain refs are replaced with gopeaks.camp.
 */
export function parseRankMathHead(head: string): ParsedRankMathSEO {
  const attr = (regex: RegExp, group = 1): string => {
    const m = head.match(regex);
    return m ? replaceWPDomain(m[group].trim()) : "";
  };

  // Meta content: handles both attribute orders (name/property before or after content)
  const metaName = (name: string) =>
    attr(new RegExp(`<meta\\s[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["']`, "i")) ||
    attr(new RegExp(`<meta\\s[^>]*content=["']([^"']+)["'][^>]*name=["']${name}["']`, "i"));

  const metaProp = (prop: string) =>
    attr(new RegExp(`<meta\\s[^>]*property=["']${prop}["'][^>]*content=["']([^"']+)["']`, "i")) ||
    attr(new RegExp(`<meta\\s[^>]*content=["']([^"']+)["'][^>]*property=["']${prop}["']`, "i"));

  // Extract JSON-LD schema script
  const schemaMatch = head.match(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
  );
  const rawSchema = schemaMatch ? schemaMatch[1].trim() : null;
  const schema = rawSchema ? replaceWPDomain(rawSchema) : null;

  // Canonical
  const canonicalMatch = head.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i) ||
    head.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const canonical = canonicalMatch ? replaceWPDomain(canonicalMatch[1]) : "";

  return {
    title: metaName("title") || metaProp("og:title"),
    description: metaName("description"),
    robots: metaName("robots") || "index, follow",
    canonical,
    ogTitle: metaProp("og:title"),
    ogDescription: metaProp("og:description"),
    ogImage: metaProp("og:image"),
    ogUrl: metaProp("og:url"),
    ogType: metaProp("og:type"),
    twitterCard: metaName("twitter:card"),
    twitterTitle: metaName("twitter:title"),
    twitterDescription: metaName("twitter:description"),
    twitterImage: metaName("twitter:image"),
    schema,
  };
}

export function normalizeSEO(seo: {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  schema?: string | null;
  robots?: string;
}) {
  const replace = (str?: string) => {
    if (!str) return str;
    return str.replaceAll(WP_DOMAIN, FRONT_DOMAIN);
  };

  return {
    title: seo?.title,
    description: seo?.description,
    canonical: replace(seo?.canonical),
    ogImage: replace(seo?.ogImage) || "https://gopeaks.camp/favicon.png",
    ogTitle: seo?.ogTitle,
    ogDescription: seo?.ogDescription,
    schema: replace(seo?.schema ?? undefined),
    robots: seo?.robots || "index, follow",
  };
}