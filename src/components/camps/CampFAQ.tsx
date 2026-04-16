'use client'

import React, { useState } from 'react'
import { Container } from '@/components/home/Shared'
import { ChevronDown } from 'lucide-react'

interface CampFAQProps {
    faqs: any[];
}

export default function CampFAQ({ faqs }: CampFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section id="faq" className="scroll-mt-[148px] md:scroll-mt-[164px] bg-[#f2f5fa] py-10 text-slate-950 md:py-16">
            <Container>
                <div className="mb-6 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-[780px]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">FAQ</p>
                            <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>Câu hỏi thường gặp trước khi đăng ký.</h2>
                            <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-slate-600">Tập trung vào level, logistics và cách giữ chỗ.</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl space-y-3">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ transitionDelay: `${i * 30}ms` }}>
                                <div className={`rounded-[20px] border backdrop-blur-xl transition-all duration-300 ${
                                    isOpen 
                                    ? 'border-[#2C4ACE]/20 bg-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_12px_32px_rgba(44,74,206,0.08)]' 
                                    : 'border-white/40 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_12px_rgba(15,23,42,0.03)] hover:border-white/60 hover:bg-white/70 shadow-sm'
                                }`}>
                                    <button 
                                        type="button" 
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                    >
                                        <span className={`text-[16px] leading-7 font-bold ${isOpen ? 'text-slate-950' : 'text-slate-700'}`}>
                                            {faq.question || faq.title_faq || 'Câu hỏi đang cập nhật'}
                                        </span>
                                        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#2C4ACE]' : 'text-slate-400'}`} />
                                    </button>
                                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-template-rows-[1fr]' : 'grid-template-rows-[0fr]'}`}>
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 pt-1">
                                                <div 
                                                    className="text-[14px] leading-7 text-slate-600 prose prose-slate prose-sm max-w-none" 
                                                    dangerouslySetInnerHTML={{ __html: faq.answer || faq.content_faq || '' }} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    )
}
