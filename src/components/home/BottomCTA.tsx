import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import bgImage from '@/imports/image.png'

export default function BottomCTA() {
    return (
        <section className="relative overflow-hidden bg-[#222E97] py-20 md:py-32">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={bgImage} 
                    alt="Background" 
                    fill 
                    className="object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#222E97] via-[#222E97]/80 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white">Sẵn sàng cho Race tiếp theo?</span>
                        </div>
                        <h2 className="mt-8 text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl">
                            Đừng để mục tiêu <br />
                            chỉ là <span className="italic text-accent">kế hoạch.</span>
                        </h2>
                        <p className="mt-8 text-lg text-white/70">
                            Tham gia cộng đồng Gopeaks và chuẩn bị cho những thử thách Ironman thú vị nhất. Đội ngũ huấn luyện viên của chúng tôi luôn sẵn sàng đồng hành cùng bạn.
                        </p>
                        
                        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                            <Link 
                                href="/apply" 
                                className="inline-flex items-center justify-center rounded-full px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-1"
                                style={{ 
                                    background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', 
                                    boxShadow: 'rgba(44, 74, 206, 0.45) 0px 12px 48px' 
                                }}
                            >
                                Nhận tư vấn ngay
                            </Link>
                            <Link 
                                href="/camps" 
                                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-10 py-5 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#222E97]"
                            >
                                Xem lịch Camp 2026
                            </Link>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative aspect-square overflow-hidden rounded-[40px] border border-white/10 p-4 backdrop-blur-sm">
                            <Image 
                                src={bgImage} 
                                alt="Gopeaks Camp" 
                                className="h-full w-full rounded-[32px] object-cover" 
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white p-6 shadow-2xl">
                            <div className="text-3xl font-black text-[#222E97]">100%</div>
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Finisher Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
