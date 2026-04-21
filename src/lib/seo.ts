const WP_DOMAIN = "https://sub.gopeaks.coach";
const FRONT_DOMAIN = "https://gopeaks.camp";

export function normalizeSEO(seo: any) {
  const replace = (str?: string) => {
    if (!str) return str;
    // Replace both with and without trailing slash cases
    return str.replaceAll(WP_DOMAIN, FRONT_DOMAIN);
  };

  return {
    title: seo?.title,
    description: seo?.description,
    canonical: replace(seo?.canonical),
    ogImage: replace(seo?.ogImage) || "https://gopeaks.camp/favicon.png",
    ogTitle: seo?.ogTitle,
    ogDescription: seo?.ogDescription,
    schema: replace(seo?.schema),
    robots: seo?.robots || 'index, follow'
  };
}

export function replaceWPDomain(str: string) {
    if (!str) return str;
    return str.replaceAll(WP_DOMAIN, FRONT_DOMAIN);
}