'use client'

import React, { useMemo } from 'react'
import { Container } from '@/components/home/Shared'
import { ShieldCheck, Check, X } from 'lucide-react'

export default function CampInclusions({ services = [] }: { services?: any[] }) {
    // 1. Lọc dữ liệu an toàn
    const { provided, notIncluded } = useMemo(() => {
        // services phải là mảng mới filter được
        const safeServices = Array.isArray(services) ? services : [];
        return {
            provided: safeServices.filter(s => s.status_service === true),
            notIncluded: safeServices.filter(s => s.status_service === false)
        }
    }, [services]);

    return (
        <section id="bao-gom" className="scroll-mt-[148px] md:scroll-mt-[164px] bg-white py-10 md:py-20">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                    
                    {/* CỘT TRÁI: ĐÃ BAO GỒM */}
                    <div>
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2C4ACE] text-white">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div className="space-y-10">
                            {provided.map((s, i) => (
                                <div key={i}>
                                <h3 className="text-2xl font-bold text-slate-950 mb-4">{s.title_service}</h3>
                                <ul className="space-y-3">
                                    {Array.isArray(s.content_service) && s.content_service.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[15px] text-slate-600">
                                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#2C4ACE]" />
                                        <span>{item.list_service}</span>
                                    </li>
                                    ))}
                                </ul>
                                </div>
                            ))}
                            </div>
                    </div>

                    <div className="rounded-[32px] border border-[#cfe9da] bg-[linear-gradient(180deg,#f8fffb_0%,#f1fbf6_100%)] p-8 md:p-10">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#bedfcf] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2f7a57] mb-8">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#53b181]"></span>
                            Cần tự chuẩn bị thêm
                        </div>
                        <div className="space-y-10">
                            {notIncluded.map((s, i) => (
                                <div key={i}>
                                <h3 className="text-2xl font-bold text-[#235b42] mb-4">{s.title_service}</h3>
                                <ul className="space-y-3">
                                    {Array.isArray(s.content_service) && s.content_service.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[15px] text-[#456a56]">
                                        <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e7f7ef]">
                                        <X className="h-2.5 w-2.5 text-[#4ea173] stroke-[3px]" />
                                        </div>
                                        <span>{item.list_service}</span>
                                    </li>
                                    ))}
                                </ul>
                                </div>
                            ))}
                            </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}