import { fetchWPCampBySlug, fetchWPCamps, mapWPCampToUpcomingCamp, stripHtml } from '@/lib/wordpress';
import { normalizeSEO, replaceWPDomain } from '@/lib/seo';
import { Container } from '@/components/home/Shared';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CampHero from '@/components/camps/CampHero';
import CampOverview from '@/components/camps/CampOverview';
import CampTimelineDetail from '@/components/camps/CampTimelineDetail';
import CampPricing from '@/components/camps/CampPricing';
import CampInclusions from '@/components/camps/CampInclusions';
import CampFinalCTA from '@/components/camps/CampFinalCTA';
import CoachCardDetailed from '@/components/coaches/CoachCardDetailed';
import CampExperience from '@/components/camps/CampExperience';
import CampImagesGallery from '@/components/camps/CampImagesGallery';
import CampFAQ from '@/components/camps/CampFAQ';
import CampLocation from '@/components/camps/CampLocation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const rawCamp = await fetchWPCampBySlug(slug);
    if (!rawCamp) return { title: 'Camp Not Found' };

    const imageUrl = rawCamp._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
    const acf = rawCamp.acf || {};

    const seoData = normalizeSEO({
        title: acf.rank_math_title || rawCamp.title.rendered,
        description: stripHtml(acf.rank_math_description || rawCamp.excerpt?.rendered || ''),
        canonical: acf.rank_math_canonical_url || `https://gopeaks.camp/camps/${slug}`,
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
            title: seoData.ogTitle || seoData.title,
            description: seoData.ogDescription || seoData.description,
            images: seoData.ogImage ? [seoData.ogImage] : [],
        }
    };
}

export async function generateStaticParams() {
    const rawCamps = await fetchWPCamps();
    return rawCamps?.map((camp: any) => ({
        slug: camp.slug,
    })) || [];
}

export default async function CampDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;  // phải await params trước
    const rawCamp = await fetchWPCampBySlug(slug);
    
    if (!rawCamp) {
        notFound();
    }

    const camp = mapWPCampToUpcomingCamp(rawCamp);
    const { acfRaw: acfFields } = camp;

    // Use mapped data where possible, fallback to acfFields if needed
    const title = camp.title;
    // const slug = camp.slug;

    // Map New ACF Banner Data
   const bannerStart = acfFields?.banner_camp?.[0]?.banner_start?.[0];
   const bannerEnd = acfFields?.banner_camp?.[0]?.banner_end?.[0];
   const bannerStartImage = typeof bannerStart?.image === 'object' && bannerStart?.image !== null
  ? (bannerStart.image as any)?.url || (bannerStart.image as any)?.source_url
  : undefined;

const bannerEndImage = typeof bannerEnd?.image === 'object' && bannerEnd?.image !== null
  ? (bannerEnd.image as any)?.url || (bannerEnd.image as any)?.source_url
  : undefined;
    // Filter coaches from mapped data
    const coaches = camp.coaches || [];

    // Schema JSON-LD
    const jsonLd = acfFields?.rank_math_json_ld ? replaceWPDomain(typeof acfFields.rank_math_json_ld === 'string' ? acfFields.rank_math_json_ld : JSON.stringify(acfFields.rank_math_json_ld)) : null;

    return (
        <main className="min-h-screen bg-white">
            {/* Schema.org JSON-LD Inject */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: jsonLd }}
                />
            )}
            <CampHero 
                title={bannerStart?.title_banner || title} 
                description={bannerStart?.banner_description || ''} 
                image={bannerStartImage || camp.image}
                slug={slug} 
            />

            {/* Breadcrumb */}
            <div className="bg-[#f4f7ff] pt-4 pb-2">
                <Container>
                    <div className="flex items-center gap-2 text-[13px] text-slate-500">
                        <Link href="/camps" className="hover:text-[#2C4ACE]">Tất cả camps</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-slate-400 truncate">{title}</span>
                    </div>
                </Container>
            </div>

            <CampOverview camp={{ title, slug, acfFields, overview: camp.overview }} />

            <CampExperience experiences={acfFields?.experienceCamp} />

            {/* Food Section */}
            <CampImagesGallery 
                images={
                    (acfFields?.camp_food || acfFields?.campFood || [])?.map((item: any) => 
                        item?.link_image || item?.linkImage || item
                    )
                } 
                title="Ẩm thực trong resort" 
                subtitle="Resort Dining"
                description="Một vài khung hình bữa ăn và cách resort phục vụ để bạn dễ mường tượng nhịp nghỉ thực tế."
                id="am-thuc"
            />

            <CampTimelineDetail itinerary={camp.programDays} />

            <CampPricing packages={camp.pricingOptions} slug={slug} />

            <CampInclusions services={acfFields?.service_camp} />

            <CampLocation  vTriVaBND={acfFields?.location_camps} nearPointCamp={acfFields?.near_point_camp} checkLocCamps={acfFields?.check_loc_camps} slug={slug} />

            {/* Rest Section */}
            <CampImagesGallery 
                images={
                    (acfFields?.go_camp || acfFields?.goCamp || [])?.map((item: any) => 
                        item?.link_image || item?.linkImage || item
                    )
                } 
                title="Không gian nghỉ" 
                subtitle="Stay & Relax"
                description="Phòng nghỉ tiêu chuẩn cao cấp, yên tĩnh và đầy đủ tiện nghi giúp cơ thể phục hồi tốt nhất."
                id="nghi-ngoi"
            />

            {/* Coaches Section */}
            {coaches && coaches.length > 0 && (
                <section id="coach-dong-hanh" className="scroll-mt-[148px] md:scroll-mt-[164px] bg-[#f4f7ff] py-10 text-slate-950 md:py-12">
                    <Container>
                        <div className="mb-6 md:mb-8">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Coaches</p>
                            <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold">Coach đồng hành trong camp này.</h2>
                            <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-slate-600">Những người sẽ trực tiếp hỗ trợ chuyên môn cho bạn.</p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2">
                            {coaches.map((coach: any, i: number) => (
    <CoachCardDetailed key={coach.slug || coach.name || i} coach={{ title: coach.name, slug: coach.slug }} />
))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Moments Section */}
            <CampImagesGallery 
                images={
                    (acfFields?.moment_camps || acfFields?.momentCamps || [])?.map((item: any) => 
                        item?.link_image || item?.linkImage || item
                    )
                } 
                title="Khoảnh khắc khó quên" 
                subtitle="Memories"
                description={acfFields?.mo_ta_moment || acfFields?.moTaMoment || "Ghi lại những nỗ lực và niềm vui cùng đồng đội."}
                id="khoanh-khac"
            />

            <CampFAQ faqs={acfFields?.faqCamps} />

            <CampFinalCTA 
                title={bannerEnd?.title_banner || "Giữ chỗ sớm để hoàn thiện block peak."} 
                description={bannerEnd?.banner_description || "Camp diễn ra với nhịp ở gọn và đủ hỗ trợ để athlete tập trung vào block training trước race week."} 
                slug={slug}
                image={bannerEndImage || camp.image}
            />
        </main>
    );
}