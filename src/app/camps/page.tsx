import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/home/Shared'
import CampsHero from '@/components/camps/CampsHero'
import CampsTimeline from '@/components/camps/CampsTimeline'
import CampCardHorizontal from '@/components/camps/CampCardHorizontal'
import { fetchWPCamps, mapWPCampToUpcomingCamp, getPageBySlug } from '@/lib/wordpress'

export const metadata = {
    title: "Camp sắp tới | Lịch camp và race week của Gopeaks",
    description: "Xem lịch camp sắp tới của Gopeaks theo mốc thời gian rõ ràng, trạng thái đăng ký và thông tin đủ để bạn quyết định nhanh hơn.",
};

export default async function CampsPage() {
    const rawCamps = await fetchWPCamps();
    const camps = Array.isArray(rawCamps) ? rawCamps.map(mapWPCampToUpcomingCamp) : [];
    const pageData = await getPageBySlug('camps');

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#f4f7ff] text-slate-950">
            {/* Hero Section */}
            <CampsHero 
                title={pageData?.title}
                description={pageData?.content?.replace(/<[^>]*>?/gm, '').slice(0, 200)} // Basic strip tags
                image={pageData?.featuredImage?.node?.sourceUrl}
            />

            {/* Timeline Section */}
            <CampsTimeline />

            {/* Camps List Section */}
            <section className="bg-white py-10 text-slate-950 md:py-12">
                <Container>
                    <div className="space-y-5">
                        {camps?.map((camp: any, i: number) => (
                            <CampCardHorizontal 
                                key={camp.slug} 
                                camp={camp} 
                                isFeatured={i === 0} 
                            />
                        ))}
                    </div>
                </Container>
            </section>

            {/* Bottom Contact Section */}
            <section className="bg-white py-10 text-slate-950 md:py-12">
                <Container>
                    <div className="rounded-[30px] border border-white/40 bg-white/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Chưa chắc camp nào hợp nhất</p>
                        <h3 className="mt-4 max-w-[24ch] text-[clamp(1.72rem,3.7vw,2.85rem)] leading-[1.08] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                            Liên hệ để được tư vấn kỳ camp phù hợp: theo race mục tiêu, thời gian và ngân sách.
                        </h3>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link 
                                href="/apply" 
                                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                                style={{ 
                                    background: 'linear-gradient(135deg, rgb(91, 116, 214) 0%, rgb(44, 74, 206) 58%, rgb(22, 46, 151) 100%)', 
                                    boxShadow: 'rgba(44, 74, 206, 0.22) 0px 10px 24px' 
                                }}
                            >
                                Nhận tư vấn
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link 
                                href="/camps" 
                                className="inline-flex min-h-[52px] items-center justify-center rounded-full border px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 border-slate-200 bg-white/90 text-slate-700 hover:border-slate-300 hover:bg-white"
                            >
                                Xem camps
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}
