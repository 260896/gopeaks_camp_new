import React from 'react'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { Container } from '@/components/home/Shared'
import { fetchWPStories } from '@/lib/wordpress'
import Image from 'next/image'
import { Metadata } from 'next'

const FRONT_DOMAIN = 'https://gopeaks.camp';

export const metadata: Metadata = {
    title: 'Câu chuyện từ camp | Những chuyến đi đã thật sự diễn ra',
    description: 'Những câu chuyện, hình ảnh và cảm nhận thật từ các athlete đã đi camp cùng Gopeaks tại Bàu Trắng, Phú Quốc và Đà Nẵng.',
    alternates: { canonical: `${FRONT_DOMAIN}/stories` },
    robots: 'index, follow',
    openGraph: {
        title: 'Câu chuyện từ camp | Những chuyến đi đã thật sự diễn ra',
        description: 'Những câu chuyện, hình ảnh và cảm nhận thật từ các athlete đã đi camp cùng Gopeaks tại Bàu Trắng, Phú Quốc và Đà Nẵng.',
        url: `${FRONT_DOMAIN}/stories`,
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Câu chuyện từ camp | Những chuyến đi đã thật sự diễn ra',
    },
};

export default async function StoriesPage() {
    const stories = await fetchWPStories();

    // Giả sử story đầu tiên là featured
    const featuredStory = stories[0];
    const otherStories = stories.slice(1);

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#f4f7ff] text-slate-950">
            {/* Hero Section */}
            <section className="relative flex flex-col justify-end overflow-hidden text-white min-h-[56svh] pt-24">
                <div className="absolute inset-0">
                    <Image 
                        src="https://res.cloudinary.com/dxai5ztql/image/upload/q_auto/f_auto/v1775714724/IMG_0478_vrcofm.jpg" 
                        alt="Hero background" 
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,22,0.14)_0%,rgba(5,10,22,0.24)_28%,rgba(5,10,22,0.52)_58%,rgba(5,10,22,0.92)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(4,237,247,0.08),transparent_22%)]" />
                </div>
                <Container className="relative z-10 pb-12 lg:pb-16">
                    <div className="max-w-[980px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <h1 className="tracking-tight text-white max-w-[20ch] text-[clamp(2.15rem,4.4vw,3.95rem)] leading-[1.08] font-bold" style={{ textWrap: 'balance' }}>
                            Nhìn lại những hành trình đã qua.
                        </h1>
                        <p className="mt-4 max-w-[44rem] text-[15px] leading-7 text-white/80 md:text-[16px] md:leading-7">
                            Những khoảnh khắc chân thực được ghi lại tại mỗi kỳ tập huấn, nơi chúng ta cùng tập luyện và chia sẻ đam mê.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="bg-white py-12 text-slate-950 md:py-14">
                <Container>
                    {/* Featured Story Section Header */}
                    <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-[780px]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Nổi bật</p>
                                <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                                    Câu chuyện thực tế về những ngày ở camp.
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Featured Story Card */}
                    {featuredStory && (
                        <div className="animate-in fade-in zoom-in-95 duration-1000">
                            <Link 
                                href={`/stories/${featuredStory.slug}`}
                                className="group grid overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)] lg:grid-cols-[1.08fr_0.92fr] hover:shadow-[0_24px_70px_rgba(15,23,42,0.1)] transition-all duration-500"
                            >
                                <div className="relative min-h-[360px] overflow-hidden">
                                    <Image 
                                        src={featuredStory.featuredImage?.node?.sourceUrl || "https://res.cloudinary.com/dxai5ztql/image/upload/q_auto/f_auto/v1775714724/IMG_0478_vrcofm.jpg"} 
                                        alt={featuredStory.title}
                                        fill
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.08),rgba(5,10,18,0.42)_100%)]" />
                                    <div className="absolute left-5 top-5">
                                        <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm border-slate-200/70 bg-white/94 text-slate-500">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#4C64CC]"></span>
                                            {featuredStory.acfFields?.location_camp || "Camps"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between p-6 md:p-8">
                                    <div>
                                        <h2 className="max-w-[16ch] text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.04] tracking-tight text-slate-950 font-bold">
                                            {featuredStory.title}
                                        </h2>
                                        <div 
                                            className="mt-4 text-[15px] leading-7 text-slate-600 line-clamp-3"
                                            dangerouslySetInnerHTML={{ __html: featuredStory.excerpt }}
                                        />
                                        {featuredStory.acfFields?.featured_quote && (
                                            <div className="mt-6 border-t border-slate-100 pt-5">
                                                <Quote className="h-5 w-5 text-[#2c4ace]" />
                                                <p className="mt-3 text-sm leading-7 text-slate-600 italic">
                                                    "{featuredStory.acfFields.featured_quote}"
                                                </p>
                                                <div className="mt-4 text-sm font-semibold text-slate-950">
                                                    {featuredStory.acfFields.featured_author || "Athlete Gopeaks"}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3 text-[#2c4ace]">
                                        Đọc câu chuyện
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* All Stories Grid */}
                    <div className="mt-16">
                        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-[780px]">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Tất cả</p>
                                    <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                                        Đọc thêm những chuyến đi khác.
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                            {otherStories.map((story: any, i: number) => (
                                <div key={story.slug} className="animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: `${i * 100}ms` }}>
                                    <Link 
                                        href={`/stories/${story.slug}`}
                                        className="group flex h-full flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
                                    >
                                        <div className="relative aspect-[1.08/1] overflow-hidden">
                                            <Image 
                                                src={story.featuredImage?.node?.sourceUrl || "https://res.cloudinary.com/dxai5ztql/image/upload/q_auto/f_auto/v1775714724/IMG_0478_vrcofm.jpg"} 
                                                alt={story.title}
                                                fill
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                                            />
                                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.08),rgba(5,10,18,0.44)_100%)]" />
                                            <div className="absolute left-4 top-4">
                                                <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm border-slate-200/70 bg-white/94 text-slate-500">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#4C64CC]"></span>
                                                    {story.acfFields?.location_camp || "Story"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col p-6">
                                            <div className="flex flex-wrap gap-2">
                                                {(story.acfFields?.tags || []).slice(0, 2).map((tag: string, idx: number) => (
                                                    <span key={idx} className="rounded-full bg-[#eef2ff] px-3 py-2 text-xs font-semibold text-[#2C4ACE]">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {(!(story.acfFields?.tags) || story.acfFields.tags.length === 0) && (
                                                    <>
                                                        <span className="rounded-full bg-[#eef2ff] px-3 py-2 text-xs font-semibold text-[#2C4ACE]">Gopeaks</span>
                                                        <span className="rounded-full bg-[#eef2ff] px-3 py-2 text-xs font-semibold text-[#2C4ACE]">Story</span>
                                                    </>
                                                )}
                                            </div>
                                            <h3 className="mt-5 text-[28px] leading-[1.04] tracking-tight text-slate-950 font-bold line-clamp-2">
                                                {story.title}
                                            </h3>
                                            <div 
                                                className="mt-4 text-sm leading-7 text-slate-600 line-clamp-3"
                                                dangerouslySetInnerHTML={{ __html: story.excerpt }}
                                            />
                                            
                                            {story.acfFields?.featured_quote && (
                                                <div className="mt-auto pt-8">
                                                    <p className="text-sm leading-7 text-slate-500 italic">
                                                        "{story.acfFields.featured_quote}"
                                                    </p>
                                                    <div className="mt-3 text-sm font-semibold text-slate-950">
                                                        {story.acfFields.featured_author || "Athlete Gopeaks"}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="mt-20 border-t border-slate-200 pt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Sẵn sàng cho chuyến tiếp theo</p>
                        <h3 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-[1.02] tracking-tight text-slate-950 font-bold">
                            Chọn một kỳ camp đang mở để bắt đầu câu chuyện của chính bạn.
                        </h3>
                        <Link 
                            href="/camps" 
                            className="mt-8 inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                            style={{ 
                                background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', 
                                boxShadow: 'rgba(44, 74, 206, 0.24) 0px 16px 34px' 
                            }}
                        >
                            Xem camp sắp mở
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </Container>
            </section>
        </main>
    )
}
