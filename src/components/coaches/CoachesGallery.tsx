import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/home/Shared'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import img1 from '@/imports/image-5.png'
import img2 from '@/imports/image-6.png'
import img3 from '@/imports/image-7.png'
import img4 from '@/imports/image-8.png'
import img5 from '@/imports/image-9.png'
import img6 from '@/imports/image-2.png'

const gallery = [
    { src: img1, location: 'Bàu Trắng', title: 'Bike session ven biển' },
    { src: img2, location: 'Bàu Trắng', title: 'Race rehearsal thực chiến' },
    { src: img3, location: 'Phú Quốc', title: 'Morning ride Phú Quốc' },
    { src: img4, location: 'Đà Nẵng', title: 'Open water swim session' },
    { src: img5, location: 'Bàu Trắng', title: 'Sunrise run transition drill' },
    { src: img6, location: 'Phú Quốc', title: 'Pacing & power debriefing' },
]

export default function CoachesGallery() {
    return (
        <section className="relative overflow-hidden bg-[#f4f7ff] pb-12 pt-10 md:pb-14 md:pt-12">
            <Container>
                <div className="space-y-5">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2C4ACE]">Trong huấn luyện</p>
                            <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.06] tracking-tight text-slate-950 font-bold">
                                Coach và athlete trên thực địa.
                            </h2>
                        </div>
                        <div className="hidden items-center gap-2 md:flex">
                            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-[#2C4ACE]/30 hover:text-[#2C4ACE] hover:shadow-md">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-[#2C4ACE]/30 hover:text-[#2C4ACE] hover:shadow-md">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-x-auto pb-4 no-scrollbar">
                        <div className="flex gap-4">
                            {gallery.map((item, i) => (
                                <div key={i} className="min-w-[280px] md:min-w-[400px] shrink-0">
                                    <div className="group relative block h-[300px] overflow-hidden rounded-[20px] bg-slate-100 shadow-[0_8px_32px_rgba(15,23,42,0.1)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(15,23,42,0.16)] md:h-[360px] xl:h-[380px]">
                                        <Image 
                                            src={item.src} 
                                            alt={item.title} 
                                            fill
                                            className="pointer-events-none object-cover transition-transform duration-700 group-hover:scale-[1.05]" 
                                        />
                                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(6,11,26,0.76)_100%)]" />
                                        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:bg-white/20">
                                            <ArrowRight className="h-3.5 w-3.5 text-white" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/52">{item.location}</p>
                                            <p className="mt-1.5 text-[15px] font-semibold leading-snug text-white">{item.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
