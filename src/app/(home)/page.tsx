import { getAllCamps, getRecentPosts, mapWPCampToUpcomingCamp } from "@/lib/wordpress";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import FeaturedCamps from "@/components/home/FeaturedCamps";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import Stories from "@/components/home/Stories";
import InclusionSection from "@/components/home/InclusionSection";
import BottomCTA from "@/components/home/BottomCTA";

export default async function HomePage() {
  const [rawCamps, posts] = await Promise.all([
    getAllCamps(),
    getRecentPosts(1), // Main story
  ]);

  const camps = Array.isArray(rawCamps) ? rawCamps.map(mapWPCampToUpcomingCamp) : [];

  return (
    <main className="min-h-screen bg-[#f4f7ff]">
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
