'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import user1 from '@/imports/image-1.png'
import user2 from '@/imports/image-2.png'
import user3 from '@/imports/image-3.png'
import user4 from '@/imports/image-4.png'

export default function Hero() {
    return (
        <section className="relative h-[100dvh] w-full items-center justify-center overflow-hidden bg-slate-950">
            {/* Video Background */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="h-full w-full object-cover opacity-60"
                >
                    <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/80" />
            </div>

            {/* Content Content Container */}
            <div className="relative z-10 mx-auto flex h-full w-full max-w-[1360px] flex-col justify-end px-4 pb-20 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                    {/* Badge / Info */}
                    <div className="mb-8 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Gopeaks Training Camp</span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Race-cation</span>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-[clamp(2.5rem,10vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
                        Let <span className="italic text-accent">the Race</span> <br /> 
                        Bring You Home.
                    </h1>

                    <p className="mt-8 max-w-xl text-lg text-white/70 leading-relaxed md:text-xl">
                        Nâng tầm trải nghiệm tập luyện và thi đoạn Iron Man cùng đội ngũ huấn luyện viên chuyên nghiệp tại các cung đường đẹp nhất Việt Nam.
                    </p>

                    {/* CTA Actions */}
                    <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Link 
                            href="/apply" 
                            className="inline-flex h-[60px] items-center justify-center rounded-full px-10 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-1"
                            style={{ 
                                background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', 
                                boxShadow: 'rgba(44, 74, 206, 0.35) 0px 12px 36px' 
                            }}
                        >
                            Đăng ký Camp 2026
                        </Link>
                        
                        <div className="flex items-center gap-4 px-2">
                            <div className="flex -space-x-3 overflow-hidden">
                                {[user1, user2, user3, user4].map((img, i) => (
                                    <div key={i} className="inline-block h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/10">
                                        <Image
                                            src={img}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-[13px] text-white/60">
                                <span className="block font-bold text-white">+500 Vận động viên</span>
                                Đã tham gia cùng chúng tôi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
