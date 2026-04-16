'use client';

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Camp } from '@/app/types/wordpress'

export default function FeaturedCamps({ camps }: { camps: Camp[] }) {
    return (
        <section className="bg-white py-10 text-slate-950 md:py-14">
            <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
                <div className="mb-6 md:mb-8">
                    <div className="flex flex-col gap-3 md:gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-[800px]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Camp nổi bật</p>
                            <h2 className="mt-2 text-[clamp(1.82rem,7.8vw,3rem)] leading-[1.06] tracking-tight text-slate-950 font-bold">
                                Camp đang mở.
                            </h2>
                        </div>
                        <Link 
                            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3 text-slate-700" 
                            href="/camps"
                        >
                            Xem tất cả camp
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible md:pb-0 md:snap-none">
                    {camps?.map((camp, i) => (
                        <Link 
                            key={camp.slug}
                            className="group relative min-h-[360px] min-w-[78vw] snap-start overflow-hidden rounded-[28px] bg-slate-100 text-left md:min-h-[420px] md:min-w-0 xl:min-h-[460px]" 
                            href={`/camps/${camp.slug}`}
                        >
                            <img 
                                src={camp.featuredImage?.node?.sourceUrl || 'https://via.placeholder.com/600x800'} 
                                alt={camp.title} 
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" 
                                loading="lazy"
                            />
                            <div className="absolute inset-0 transition-all duration-500 bg-black/8" />
                            <div 
                                className="absolute inset-0" 
                                style={{ background: 'linear-gradient(180deg, rgba(7,11,24,0.08) 0%, rgba(7,11,24,0.14) 30%, rgba(7,11,24,0.82) 100%)' }} 
                            />
                            <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-6">
                                <div className="max-w-[420px]">
                                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                                        {camp.acfFields?.location || 'VIETNAM'}
                                    </p>
                                    <h3 
                                        className="tracking-tight transition-all duration-500 text-[30px] leading-[1.04] md:text-[34px] font-bold text-white mb-2" 
                                    >
                                        {camp.title}
                                    </h3>
                                    <p className="mt-3 max-w-[52ch] text-[14px] leading-7 text-white/80 line-clamp-3">
                                        {camp.excerpt?.replace(/<[^>]*>?/gm, '') || 'Khám phá kỳ camp chuẩn bị tối ưu cho những giải đấu quan trọng của bạn.'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
