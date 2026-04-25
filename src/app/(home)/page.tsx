import { getAllCamps, getRecentPosts, mapWPCampToUpcomingCamp, stripHtml, getRankMathSEO } from "@/lib/wordpress";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import FeaturedCamps from "@/components/home/FeaturedCamps";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import Stories from "@/components/home/Stories";
import InclusionSection from "@/components/home/InclusionSection";
import BottomCTA from "@/components/home/BottomCTA";
import { Metadata } from "next";

const FRONT_DOMAIN = "https://gopeaks.camp";
const WP_URL = "https://sub.gopeaks.coach";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getRankMathSEO(`${WP_URL}/`);

  const title = seo?.title || "GoPeaks - Đỉnh Cao Huấn Luyện & Trải Nghiệm Camp";
  const description = seo?.description || "Hệ thống huấn luyện thể thao chuyên nghiệp cho runner và trail runner.";
  const canonical = seo?.canonical || FRONT_DOMAIN;
  const ogImage = seo?.ogImage || `${FRONT_DOMAIN}/favicon.png`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: seo?.robots || "index, follow",
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: ogImage ? [{ url: ogImage }] : [],
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
      images: seo?.twitterImage ? [seo.twitterImage] : ogImage ? [ogImage] : [],
    },
  };
}

export default async function HomePage() {
  const [rawCamps, posts, seo] = await Promise.all([
    getAllCamps(),
    getRecentPosts(1),
    getRankMathSEO(`${WP_URL}/`),
  ]);

  const camps = Array.isArray(rawCamps) ? rawCamps.map(mapWPCampToUpcomingCamp) : [];

  return (
    <main className="min-h-screen bg-[#f4f7ff]">
      {/* Schema.org JSON-LD from RankMath */}
      {seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.schema }}
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
