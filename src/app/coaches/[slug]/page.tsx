import React from 'react';
import { Container } from '@/components/home/Shared';
import { getCoachBySlug, getCoaches, stripHtml } from '@/lib/wordpress';
import { normalizeSEO, replaceWPDomain } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ArrowLeft, ShieldCheck, MessageCircle } from 'lucide-react';
import { Metadata } from 'next';
import CoachCardDetailed from '@/components/coaches/CoachCardDetailed';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const coach = await getCoachBySlug(slug);
    if (!coach) return { title: 'Coach Not Found' };

    const acf = coach.acfFields || {};
    const imageUrl = coach.featuredImage?.node?.sourceUrl || '';

    const seoData = normalizeSEO({
        title: acf.rank_math_title || coach.title,
        description: stripHtml(acf.rank_math_description || coach.acfFields?.position || coach.content || ''),
        canonical: acf.rank_math_canonical_url || `https://gopeaks.camp/coaches/${slug}`,
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

export default async function CoachPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [coach, allCoaches] = await Promise.all([
        getCoachBySlug(slug),
        getCoaches()
    ]);

    if (!coach) {
        notFound();
    }

    const { title, content, featuredImage, acfFields } = coach;
    const imageUrl = featuredImage?.node?.sourceUrl || '';
    const position = acfFields?.position || 'Huấn luyện viên tại Gopeaks';
    const certifications = acfFields?.certifications || [];
    const quote = acfFields?.quote || '';
    
    // Lọc các coach khác
    const otherCoaches = allCoaches?.filter((c: any) => c.slug !== slug).slice(0, 3) || [];

    // Schema JSON-LD
    const jsonLd = acfFields?.rank_math_json_ld ? replaceWPDomain(typeof acfFields.rank_math_json_ld === 'string' ? acfFields.rank_math_json_ld : JSON.stringify(acfFields.rank_math_json_ld)) : null;

    return (
        <main className="min-h-screen overflow-x-hidden bg-white text-slate-950">
            {/* Schema.org JSON-LD Inject */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: jsonLd }}
                />
            )}
            {/* Breadcrumb Section */}
            <div className="border-b border-slate-100 bg-white py-3">
                <Container>
                    <Link href="/coaches" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-400 transition hover:text-slate-700">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Coaches
                    </Link>
                </Container>
            </div>

            {/* Main Content Section */}
            <section className="bg-white">
                <Container className="py-12">
                    <div className="grid gap-10 xl:gap-14 lg:grid-cols-[480px_minmax(0,1fr)] lg:items-start">
                        {/* Left: Sticky Image */}
                        <div className="lg:sticky lg:top-24">
                            <div className="animate-in fade-in zoom-in-95 duration-1000">
                                <div className="overflow-hidden rounded-[28px] bg-slate-100 shadow-[0_8px_40px_rgba(15,23,42,0.12)]">
                                    <Image 
                                        src={imageUrl} 
                                        alt={title} 
                                        width={480}
                                        height={640}
                                        className="h-full w-full object-cover object-top"
                                        style={{ aspectRatio: '3/4' }}
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="min-w-0">
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                <div>
                                    <span className="inline-block rounded-full bg-[#eef2ff] px-3.5 py-1.5 text-[11px] font-semibold text-[#2C4ACE]">
                                        {position}
                                    </span>
                                    <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-slate-950">
                                        {title}
                                    </h1>
                                    <p className="mt-1 text-[14px] text-slate-400">Triathlon · Đạp xe · Data-driven coaching</p>
                                </div>
                                {quote && (
                                    <blockquote className="mt-6 border-l-[3px] border-[#2C4ACE] pl-4 text-[15px] italic leading-7 text-slate-600">
                                        "{quote}"
                                    </blockquote>
                                )}
                            </div>

                            {/* Bio Content */}
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                                <div className="mt-8 border-t border-slate-100 pt-7">
                                    <h2 className="text-[18px] font-bold text-slate-950">Chuyên môn và cách đồng hành</h2>
                                    <div 
                                        className="prose prose-slate max-w-none mt-3 text-[15px] leading-8 text-slate-600 prose-p:mt-3 prose-strong:text-slate-700"
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    />
                                </div>
                            </div>

                            {/* Certifications Section */}
                            {certifications.length > 0 && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                                    <div className="mt-8 border-t border-slate-100 pt-7">
                                        <h2 className="text-[18px] font-bold text-slate-950">Chứng chỉ và nền tảng chuyên môn</h2>
                                        <div className="mt-4 flex flex-wrap gap-2.5">
                                            {certifications.map((cert: any, idx: number) => (
                                                <div key={idx} className="flex items-center gap-2 rounded-[10px] border border-[#c7d2fe] bg-[#eef2ff] px-3.5 py-2.5">
                                                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#2C4ACE]" />
                                                    <span className="text-[12px] font-semibold text-[#2C4ACE]">{cert.title}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Certificate Carousel (Static Preview in this case) */}
                                        <div className="mt-6 w-full overflow-hidden rounded-[18px] border border-slate-200 bg-[#f8faff] p-3 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
                                            <div className="flex items-start justify-between gap-4 px-1 pb-2.5">
                                                <div>
                                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Xem chứng chỉ</p>
                                                    <p className="mt-1 text-[13px] font-semibold text-slate-900">{certifications[0]?.title}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-[#2C4ACE]/30 hover:text-[#2C4ACE]">
                                                        <ChevronLeft className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-[#2C4ACE]/30 hover:text-[#2C4ACE]">
                                                        <ChevronLeft className="h-3.5 w-3.5 rotate-180" />
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Scrollable Certificates */}
                                            <div className="flex gap-4 overflow-x-auto no-scrollbar pt-2">
                                                {certifications.map((cert: any, idx: number) => cert.image && (
                                                    <div key={idx} className="min-w-full shrink-0">
                                                        <div className="group relative block w-full overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                                                            <img 
                                                                src={cert.image.url || cert.image} 
                                                                alt={cert.title} 
                                                                className="h-full w-full object-contain bg-white mx-auto"
                                                                style={{ aspectRatio: '16/6.4', maxHeight: '360px' }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Contact CTA */}
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                                <div className="mt-8 border-t border-slate-100 pt-7">
                                    <a 
                                        href="https://zalo.me/1039145260048202954" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                                        style={{ 
                                            background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', 
                                            boxShadow: 'rgba(44, 74, 206, 0.28) 0px 14px 32px' 
                                        }}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Nhận tư vấn với coach
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Other Coaches Section */}
            <section className="border-t border-slate-100 bg-[#f4f7ff] py-10 md:py-12">
                <Container>
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <h2 className="text-[clamp(1.4rem,2.8vw,2rem)] font-bold leading-[1.1] tracking-tight text-slate-950">Các coach khác</h2>
                    </div>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {otherCoaches.map((other: any, i: number) => (
                            <div key={i} className="animate-in fade-in zoom-in-95 duration-1000" style={{ animationDelay: `${i * 100}ms` }}>
                                <Link 
                                    href={`/coaches/${other.slug}`} 
                                    className="group relative block overflow-hidden rounded-[20px] bg-slate-100 shadow-sm transition-all duration-400 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="relative" style={{ aspectRatio: '3/4' }}>
                                        <Image 
                                            src={other.featuredImage?.node?.sourceUrl || "https://res.cloudinary.com/dxai5ztql/image/upload/q_auto/f_auto/v1775199371/vi_b1lh4n.webp"} 
                                            alt={other.title} 
                                            fill
                                            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                                        />
                                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,26,0)_45%,rgba(6,11,26,0.80)_100%)]" />
                                        <div className="absolute bottom-0 left-0 right-0 p-5">
                                            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/52">
                                                {other.acfFields?.position || 'Huấn luyện viên Gopeaks'}
                                            </p>
                                            <p className="mt-1 text-[20px] font-bold leading-[1.1] tracking-tight text-white">{other.title}</p>
                                            <p className="mt-1.5 text-[12px] text-white/68">
                                                {other.acfFields?.expertise || 'Triathlon · Bơi lội · Open water'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </main>
    );
}
