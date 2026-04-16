import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/home/Shared'
import StoriesHero from '@/components/stories/StoriesHero'
import StoryCard from '@/components/stories/StoryCard'
import { getRecentPosts } from '@/lib/wordpress'

export const metadata = {
    title: "Câu chuyện từ camp | Những chuyến đi đã thật sự diễn ra",
    description: "Những câu chuyện, hình ảnh và cảm nhận thật từ các athlete đã đi camp cùng Gopeaks tại Bàu Trắng, Phú Quốc và Đà Nẵng.",
};

export default async function StoriesPage() {
    // Fetch all stories (posts in WordPress)
    const stories = await getRecentPosts(10);

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#f4f7ff] text-slate-950">
            {/* Hero Section */}
            <StoriesHero />

            <section className="bg-white py-12 text-slate-950 md:py-14">
                <Container>
                    {/* Featured Story */}
                    <div className="mb-6 md:mb-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-[780px]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Nổi bật</p>
                                <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                                    Câu chuyện thực tế về những ngày ở camp.
                                </h2>
                            </div>
                        </div>
                    </div>

                    {stories && stories.length > 0 && (
                        <StoryCard story={stories[0]} isFeatured={true} />
                    )}

                    {/* All Stories Grid */}
                    <div className="mt-10">
                        <div className="mb-6 md:mb-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-[780px]">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Tất cả</p>
                                    <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                                        Đọc thêm những chuyến đi khác.
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {stories?.slice(1).map((story: any) => (
                                <StoryCard key={story.slug} story={story} />
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="mt-10 border-t border-slate-200 pt-8 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Sẵn sàng cho chuyến tiếp theo</p>
                        <h3 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-[1.02] tracking-tight text-slate-950 font-bold">
                            Chọn một kỳ camp đang mở để bắt đầu câu chuyện của chính bạn.
                        </h3>
                        <Link 
                            href="/camps" 
                            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                            style={{ 
                                background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', 
                                boxShadow: 'rgba(44, 74, 206, 0.24) 0px 16px 34px' 
                            }}
                        >
                            Xem camp sắp mở
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </Container>
            </section>
        </main>
    )
}
