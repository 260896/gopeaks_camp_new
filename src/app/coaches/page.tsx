import React from 'react'
import Link from 'next/image'
import { Container } from '@/components/home/Shared'
import CoachesHero from '@/components/coaches/CoachesHero'
import CoachCardDetailed from '@/components/coaches/CoachCardDetailed'
import CoachesGallery from '@/components/coaches/CoachesGallery'
import { getCoaches } from '@/lib/wordpress'
import LinkCTA from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
    title: "Huấn luyện viên training camp | Đội ngũ coach Gopeaks",
    description: "Gặp đội ngũ coach đang đồng hành cùng các training camp Gopeaks, từ triathlon và open water đến pacing, race rehearsal và race week support.",
};

export default async function CoachesPage() {
    const coaches = await getCoaches();

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#f4f7ff] text-slate-950">
            {/* Hero Section */}
            <CoachesHero />

            {/* Introduction Section */}
            <section className="bg-white py-12 text-slate-950 md:py-14">
                <Container>
                    <div className="w-full">
                        <div className="mb-6 md:mb-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-[780px]">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Đội ngũ</p>
                                    <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                                        Năng lực huấn luyện đa dạng và chuyên sâu.
                                    </h2>
                                    <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-slate-600">
                                        Mỗi huấn luyện viên mang đến một góc nhìn chuyên môn, cùng tạo nên hệ thống phát triển toàn diện cho vận động viên.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Coaches Grid */}
                        <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
                            {coaches?.map((coach: any, i: number) => (
                                <CoachCardDetailed key={coach.slug} coach={coach} index={i} />
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Gallery Section */}
            <CoachesGallery />

            {/* Bottom CTA Section */}
            <section className="bg-white py-10 md:py-12">
                <Container>
                    <div className="border-t border-slate-200 pt-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Chọn camp trước</p>
                        <h3 className="mt-4 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] leading-[1.02] tracking-tight text-slate-950 font-bold">
                            Xem chi tiết các kỳ camp để tìm lộ trình phù hợp với bạn nhất.
                        </h3>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <LinkCTA 
                                href="/camps" 
                                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                                style={{ 
                                    background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', 
                                    boxShadow: 'rgba(44, 74, 206, 0.24) 0px 16px 34px' 
                                }}
                            >
                                Xem camp đang mở
                                <ArrowRight className="h-4 w-4" />
                            </LinkCTA>
                            <LinkCTA 
                                href="/apply" 
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                            >
                                Nhận tư vấn
                                <ArrowRight className="h-4 w-4" />
                            </LinkCTA>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}
