import React from 'react'
import { Container } from '@/components/home/Shared'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface CampPricingProps {
    packages: any[];
    slug: string;
}

export default function CampPricing({ packages, slug }: CampPricingProps) {
    if (!packages || packages.length === 0) return null;

    return (
        <section id="chi-phi" className="scroll-mt-[148px] md:scroll-mt-[164px] bg-[#eef4ff] py-10 text-slate-950 md:py-12">
            <Container>
                <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-[780px]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Chi phí & gói đăng ký</p>
                            <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>Chi phí của camp.</h2>
                            <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-slate-600">Gói chính được đặt rõ để bạn chọn nhanh hơn.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {packages.map((pkg, i) => (
                        <div key={i} className="animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ transitionDelay: `${i * 100}ms` }}>
                            <Link 
                                href={`/apply?camp=${slug}&pricing=${i}`}
                                className={`group flex h-full w-full flex-col rounded-[30px] border p-6 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
                                    pkg.featured 
                                    ? 'border-[#5d78ff]/40 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_24px_64px_rgba(44,74,206,0.16)] ring-1 ring-[#5d78ff]/20' 
                                    : 'border-white/40 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_16px_rgba(15,23,42,0.04)] hover:border-white/60 hover:bg-white/80 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_16px_48px_rgba(15,23,42,0.08)]'
                                }`}
                            >
                                <div className="grid h-full flex-1 grid-rows-[auto_auto_auto_1fr_auto]">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="max-w-[16ch]">
                                            <p className="min-h-[18px] text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Lựa chọn {String.fromCharCode(65 + i)}</p>
                                            <h3 className="mt-3 text-[22px] leading-[1.1] tracking-tight md:text-[24px] font-bold text-slate-950">{pkg.title}</h3>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start pt-5 mb-4 border-t border-slate-100">
                                        <div className="text-[28px] leading-none tracking-tight md:text-[30px] font-bold text-[#2C4ACE]">
                                            {pkg.price}
                                        </div>
                                    </div>

                                    <div className="flex items-start pt-3 mb-4">
                                        <p className="text-[13px] leading-6 text-slate-500 font-medium">
                                            {pkg.note}
                                        </p>
                                    </div>

                                    <div className="flex items-start pt-4 mb-8">
                                        <p className="text-[14px] leading-7 text-slate-600 [text-wrap:pretty]">
                                            {pkg.summary}
                                        </p>
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex items-center justify-center gap-2 rounded-full border border-[#2C4ACE]/20 bg-[#2C4ACE]/[0.06] px-5 py-3 text-sm font-semibold backdrop-blur-sm transition-all duration-300 group-hover:border-[#2C4ACE]/40 group-hover:bg-[#2C4ACE]/10 text-[#2C4ACE]">
                                            Đăng ký camp
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    
                    {/* Special People traveling with section fallback */}
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ transitionDelay: `${packages.length * 100}ms` }}>
                        <div className="h-full">
                            <Link 
                                href={`/apply?camp=${slug}`}
                                className="group flex h-full w-full flex-col rounded-[30px] border border-white/40 bg-white/70 p-6 text-left text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_16px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/80 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_16px_48px_rgba(15,23,42,0.08)]"
                            >
                                <div className="grid h-full flex-1 grid-rows-[auto_auto_auto_1fr_auto]">
                                    <div>
                                        <div className="min-h-[18px]" aria-hidden="true"></div>
                                        <h3 className="mt-3 text-[22px] leading-[1.1] tracking-tight md:text-[24px] font-bold"><span className="block whitespace-nowrap">Người thân</span><span className="block whitespace-nowrap">đi cùng</span></h3>
                                    </div>
                                    <div className="flex items-start pt-5 mb-4 border-t border-slate-100">
                                        <div className="text-[28px] leading-none tracking-tight md:text-[30px] font-bold text-[#2C4ACE]">Theo tư vấn</div>
                                    </div>
                                    <div className="flex items-start pt-3 mb-4">
                                        <p className="text-[13px] leading-6 text-slate-500 font-medium">Di chuyển tự túc, bao gồm ăn ở</p>
                                    </div>
                                    <div className="flex items-start pt-4 mb-8">
                                        <p className="text-[14px] leading-7 text-slate-600 [text-wrap:pretty]">Phù hợp cho người thân hoặc support crew đi cùng athlete tại Bàu Trắng, cần chỗ ở gọn gàng và muốn chốt phần ăn ở rõ ràng ngay từ đầu.</p>
                                    </div>
                                    <div className="pt-2">
                                        <div className="flex items-center justify-center gap-2 rounded-full border border-[#2C4ACE]/20 bg-[#2C4ACE]/[0.06] px-5 py-3 text-sm font-semibold backdrop-blur-sm transition-all duration-300 group-hover:border-[#2C4ACE]/40 group-hover:bg-[#2C4ACE]/10 text-[#2C4ACE]">
                                            Đăng ký camp
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
