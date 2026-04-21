import React from 'react';
import { Container } from '@/components/home/Shared';
import { getPageById, stripHtml } from '@/lib/wordpress';
import { normalizeSEO, replaceWPDomain } from '@/lib/seo';
import { Metadata } from 'next';
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageById(875);
    if (!page) return { title: 'FAQ | Gopeaks' };

    const acf = page.acfFields || {};
    
    const seoData = normalizeSEO({
        title: acf.rank_math_title || "FAQ training camp | Giải đáp nhanh trước khi chốt camp",
        description: stripHtml(acf.rank_math_description || "Những câu hỏi thường gặp nhất về training camp Gopeaks: lịch camp, trình độ phù hợp, lưu trú, người đi cùng và cách đăng ký."),
        canonical: acf.rank_math_canonical_url || "https://gopeaks.camp/faq",
        ogTitle: acf.rank_math_og_title,
        ogDescription: acf.rank_math_og_description,
        ogImage: acf.rank_math_og_image,
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

export default async function FAQPage() {
    const page = await getPageById(875);
    const faqs = page?.acfFields?.faq_camps || [];
    
    // Schema JSON-LD
    const jsonLd = page?.acfFields?.rank_math_json_ld ? replaceWPDomain(typeof page.acfFields.rank_math_json_ld === 'string' ? page.acfFields.rank_math_json_ld : JSON.stringify(page.acfFields.rank_math_json_ld)) : null;

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#f4f7ff] text-slate-950">
            {/* Schema.org JSON-LD Inject */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: jsonLd }}
                />
            )}
            {/* Hero Section */}
            <section className="relative flex flex-col justify-end overflow-hidden text-white min-h-[56svh] pt-24">
                <div className="absolute inset-0">
                    <Image 
                        src="https://res.cloudinary.com/dxai5ztql/image/upload/q_auto/f_auto/v1775719328/IMG_0753_3_nkefol.jpg" 
                        alt="FAQ Hero" 
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,22,0.14)_0%,rgba(5,10,22,0.24)_28%,rgba(5,10,22,0.52)_58%,rgba(5,10,22,0.92)_100%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(4,237,247,0.08),transparent_22%)]"></div>
                </div>
                <Container className="relative z-10 pb-12 lg:pb-16">
                    <div className="max-w-[980px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <h1 className="tracking-tight text-white max-w-[20ch] text-[clamp(2.15rem,4.4vw,3.95rem)] leading-[1.08] font-bold" style={{ textWrap: 'balance' }}>
                            Giải đáp các thắc mắc thường gặp.
                        </h1>
                        <p className="mt-4 max-w-[44rem] text-[15px] leading-7 text-white/80 md:text-[16px] md:leading-7">
                            Tổng hợp thông tin về trình độ vđv, cách thức đăng ký và tổ chức để bạn chuẩn bị tốt nhất cho kỳ camp.
                        </p>
                    </div>
                </Container>
            </section>

            {/* FAQ List Section */}
            <section className="bg-white py-12 text-slate-950 md:py-14">
                <Container>
                    <div className="mx-auto max-w-4xl">
                        {/* Section Header */}
                        <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-[780px]">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">FAQ</p>
                                    <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                                        Thông tin trực diện và đầy đủ.
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Items */}
                        <div className="space-y-2">
                            {faqs.map((faq: any, i: number) => (
                                <div 
                                    key={i} 
                                    className="animate-in fade-in slide-in-from-bottom-4 duration-1000"
                                    style={{ animationDelay: `${i * 30}ms` }}
                                >
                                    <details className="group rounded-[16px] border backdrop-blur-xl transition-all duration-300 border-white/40 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_12px_rgba(15,23,42,0.03)] hover:border-white/60 hover:bg-white/70 open:border-[#2C4ACE]/20 open:bg-white/80 open:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_24px_rgba(44,74,206,0.08)]">
                                        <summary className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left list-none">
                                            <span className="text-[15px] leading-7 text-slate-950 font-semibold">
                                                {faq.question}
                                            </span>
                                            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-180 text-slate-400 group-open:text-[#2C4ACE]" />
                                        </summary>
                                        <div className="px-5 pb-4">
                                            <div 
                                                className="text-sm leading-7 text-slate-600 prose prose-slate max-w-none"
                                                dangerouslySetInnerHTML={{ __html: faq.anwer || faq.answer }}
                                            />
                                        </div>
                                    </details>
                                </div>
                            ))}
                        </div>

                        {/* Bottom CTA Area */}
                        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                            <div className="border-t border-slate-200 pt-8">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Cần hỏi theo trường hợp riêng</p>
                                <h3 className="mt-4 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] leading-[1.02] tracking-tight text-slate-950 font-bold">
                                    Liên hệ để được tư vấn lộ trình riêng theo mục tiêu, và nhu cầu cá nhân của bạn.
                                </h3>
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <Link 
                                        href="/apply"
                                        className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-transparent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                                        style={{ 
                                            background: 'linear-gradient(135deg, rgb(44, 74, 206) 0%, rgb(44, 74, 206) 58%, rgb(22, 46, 151) 100%)', 
                                            boxShadow: 'rgba(44, 74, 206, 0.22) 0px 10px 24px' 
                                        }}
                                    >
                                        Đăng ký tư vấn
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link 
                                        href="/camps"
                                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        Xem camp đang mở
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
