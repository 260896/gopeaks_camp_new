import { Metadata } from 'next';
import { getRankMathSEO } from '@/lib/wordpress';

export async function generateSEOMetadata(
  pageUrl: string,
  fallback?: {
    title?: string;
    description?: string;
    image?: string;
  }
): Promise<Metadata> {
  const seo = await getRankMathSEO(pageUrl);

  return {
    title: seo?.title || fallback?.title || 'Gopeaks',
    description: seo?.description || fallback?.description || '',
    alternates: {
      canonical: seo?.canonical || pageUrl,
    },
    openGraph: {
      title: seo?.ogTitle || seo?.title || fallback?.title || 'Gopeaks',
      description: seo?.ogDescription || seo?.description || fallback?.description || '',
      images: seo?.ogImage
        ? [{ url: seo.ogImage }]
        : fallback?.image
        ? [{ url: fallback.image }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.ogTitle || seo?.title || fallback?.title || '',
      description: seo?.ogDescription || seo?.description || fallback?.description || '',
      images: seo?.ogImage ? [seo.ogImage] : [],
    },
  };
}