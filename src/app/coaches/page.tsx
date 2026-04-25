import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/home/Shared'
import CoachesHero from '@/components/coaches/CoachesHero'
import CoachCardDetailed from '@/components/coaches/CoachCardDetailed'
import CoachesGallery from '@/components/coaches/CoachesGallery'
import { getCoaches } from '@/lib/wordpress'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

const FRONT_DOMAIN = 'https://gopeaks.camp';

export const metadata: Metadata = {
    title: 'Huấn luyện viên training camp | Đội ngũ coach Gopeaks',
    description: 'Gặp đội ngũ coach đang đồng hành cùng các training camp Gopeaks, từ triathlon và open water đến pacing, race rehearsal và race week support.',
    alternates: { canonical: `${FRONT_DOMAIN}/coaches` },
    robots: 'index, follow',
    openGraph: {
        title: 'Huấn luyện viên training camp | Đội ngũ coach Gopeaks',
        description: 'Gặp đội ngũ coach đang đồng hành cùng các training camp Gopeaks, từ triathlon và open water đến pacing, race rehearsal và race week support.',
        url: `${FRONT_DOMAIN}/coaches`,
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Huấn luyện viên training camp | Đội ngũ coach Gopeaks',
    },
};

export default async function CoachesPage() {
    const coaches = await getCoaches();

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
            {/* Hero Section */}
            <CoachesHero />

            {/* Introduction Section */}
            <section className="bg-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -mr-64 -mt-64" />
                <Container>
                    <div className="w-full relative">
                        <div className="mb-12 md:mb-16">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-[840px]">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c4ace]/10 text-[#2c4ace] text-[10px] font-bold uppercase tracking-wider mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#2c4ace]" />
                                        Đội ngũ vận hành
                                    </div>
                                    <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-slate-950 font-black" style={{ textWrap: 'balance' }}>
                                        Năng lực huấn luyện <span className="text-[#2c4ace]">đa dạng</span> và chuyên sâu.
                                    </h2>
                                    <p className="mt-6 max-w-[48rem] text-lg leading-8 text-slate-600/90 font-medium">
                                        Mỗi huấn luyện viên mang đến một góc nhìn chuyên môn độc đáo, từ kỹ thuật bơi open water đến chiến thuật đạp xe và dinh dưỡng thi đấu, cùng tạo nên hệ thống phát triển toàn diện cho vận động viên.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Coaches Grid */}
                        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
                            {coaches?.map((coach: any, i: number) => (
                                <CoachCardDetailed key={coach.slug} coach={coach} />
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Gallery Section */}
            <CoachesGallery />

            {/* Stats/Trust Section */}
            <section className="bg-slate-950 py-20 text-white">
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-4xl md:text-5xl font-black text-[#2c4ace] mb-2">10+</p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Huấn luyện viên</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-black text-[#2c4ace] mb-2">500+</p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Học viên tin chọn</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-black text-[#2c4ace] mb-2">50+</p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Chứng chỉ quốc tế</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-black text-[#2c4ace] mb-2">100%</p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tâm huyết đồng hành</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Bottom CTA Section */}
            <section className="bg-white py-20 md:py-32 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-50/50 to-transparent" />
                <Container>
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#2c4ace] mb-6">Chọn kỳ camp của bạn</p>
                        <h3 className="text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] tracking-tighter text-slate-950 font-black mb-10">
                            Khởi đầu hành trình chinh phục kỳ tích cá nhân.
                        </h3>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/camps"
                                className="group relative inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-lg font-black text-white transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))',
                                    boxShadow: 'rgba(44, 74, 206, 0.3) 0px 20px 40px'
                                }}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Xem các kỳ camp đang mở
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                            <Link
                                href="/apply"
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-10 py-5 text-lg font-bold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300"
                            >
                                Nhận tư vấn lộ trình
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}
