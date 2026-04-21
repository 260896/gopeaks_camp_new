import { getAllCamps, getRecentPosts, mapWPCampToUpcomingCamp, getPageBySlug, stripHtml } from "@/lib/wordpress";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import FeaturedCamps from "@/components/home/FeaturedCamps";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import Stories from "@/components/home/Stories";
import InclusionSection from "@/components/home/InclusionSection";
import BottomCTA from "@/components/home/BottomCTA";
import { Metadata } from "next";
import { normalizeSEO, replaceWPDomain } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home');
  
  const acf = (page as any)?.acf || {};
  const imageUrl = page?.featuredImage?.node?.sourceUrl || '';

  const seoData = normalizeSEO({
    title: acf.rank_math_title || page?.title || "GoPeaks - Đỉnh Cao Huấn Luyện & Trải Nghiệm Camp",
    description: stripHtml(acf.rank_math_description || (page as any)?.excerpt || "Hệ thống huấn luyện thể thao chuyên nghiệp cho runner và trail runner."),
    canonical: acf.rank_math_canonical_url || "https://gopeaks.camp",
    ogTitle: acf.rank_math_og_title,
    ogDescription: acf.rank_math_og_description,
    ogImage: acf.rank_math_og_image || imageUrl,
    robots: acf.rank_math_robots,
  });

  return {
    title: seoData.title,
    description: seoData.description,
    alternates: { canonical: seoData.canonical },
    robots: seoData.robots,
    openGraph: {
      title: seoData.ogTitle || seoData.title,
      description: seoData.ogDescription || seoData.description,
      images: seoData.ogImage ? [{ url: seoData.ogImage }] : [],
      url: seoData.canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: seoData.ogImage ? [seoData.ogImage] : [],
    }
  };
}

export default async function HomePage() {
  const [rawCamps, posts, page] = await Promise.all([
    getAllCamps(),
    getRecentPosts(1), // Main story
    getPageBySlug('home')
  ]);

  const camps = Array.isArray(rawCamps) ? rawCamps.map(mapWPCampToUpcomingCamp) : [];
  
  // Schema JSON-LD
  const jsonLd = (page as any)?.acfFields?.rank_math_json_ld ? replaceWPDomain(typeof (page as any).acfFields.rank_math_json_ld === 'string' ? (page as any).acfFields.rank_math_json_ld : JSON.stringify((page as any).acfFields.rank_math_json_ld)) : null;

  return (
    <main className="min-h-screen bg-[#f4f7ff]">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <Hero />
      <Partners />
      <FeaturedCamps camps={camps?.slice(0, 2) || []} />
      <ActivitiesSection />
      <Stories posts={posts || []} />
      <InclusionSection />
      <BottomCTA />
    </main>
  );
}
