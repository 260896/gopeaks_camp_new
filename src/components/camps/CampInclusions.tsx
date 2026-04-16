import React from 'react'
import { Container } from '@/components/home/Shared'
import { ShieldCheck, Check, X } from 'lucide-react'

interface CampInclusionsProps {
    services: any[];
}

export default function CampInclusions({ services }: CampInclusionsProps) {
    if (!services || services.length === 0) return null;

    // Separate provided vs not provided services if indicated, or just list them all
    const provided = services.filter((s: any) => s.status !== 'not-included');
    const notIncluded = services.filter((s: any) => s.status === 'not-included');

    return (
        <section id="bao-gom" className="scroll-mt-[148px] md:scroll-mt-[164px] bg-white py-10 text-slate-950 md:py-12">
            <Container>
                <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-[780px]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Dịch vụ bao gồm</p>
                            <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>Những gì đã có trong camp.</h2>
                            <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-slate-600">Rõ ràng để bạn không phải đoán.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">
                    <div className="animate-in fade-in slide-in-from-left-6 duration-700">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2C4ACE] text-white">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <h3 className="text-3xl leading-[1.02] tracking-tight text-slate-950 font-bold">Những phần đã nằm sẵn trong trải nghiệm</h3>
                        <ul className="mt-6 divide-y divide-slate-200">
                            {provided.length > 0 ? provided.map((s: any, i: number) => (
                                <li key={i} className="flex items-start gap-3 py-3 text-sm leading-7 text-slate-600">
                                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#2C4ACE]" />
                                    {s.item || s.text || s.service_name}
                                </li>
                            )) : (
                                services.map((s: any, i: number) => (
                                    <li key={i} className="flex items-start gap-3 py-3 text-sm leading-7 text-slate-600">
                                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#2C4ACE]" />
                                        {s.item || s.text || s.service_name}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="animate-in fade-in slide-in-from-right-6 duration-700">
                        <div className="rounded-[24px] border border-[#cfe9da] bg-[linear-gradient(180deg,#f8fffb_0%,#f1fbf6_100%)] p-6 shadow-[0_10px_28px_rgba(42,112,78,0.05)]">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#bedfcf] bg-white/76 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2f7a57]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#53b181]"></span>
                                Cần tự chuẩn bị thêm
                            </div>
                            <h3 className="mt-4 text-2xl leading-[1.04] tracking-tight text-[#235b42] font-bold">Những phần chưa bao gồm</h3>
                            <p className="mt-2 text-sm leading-7 text-[#4e7b63]">Xem như checklist gọn để bạn chuẩn bị chuyến đi chủ động hơn.</p>
                            <ul className="mt-5 divide-y divide-[#d7eadf]">
                                {notIncluded.length > 0 ? notIncluded.map((s: any, i: number) => (
                                    <li key={i} className="flex items-start gap-3 py-3 text-sm leading-7 text-[#456a56]">
                                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e7f7ef]">
                                            <X className="h-3.5 w-3.5 text-[#4ea173]" />
                                        </div>
                                        {s.item || s.text || s.service_name}
                                    </li>
                                )) : (
                                    <>
                                        <li className="flex items-start gap-3 py-3 text-sm leading-7 text-[#456a56]">
                                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e7f7ef]">
                                                <X className="h-3.5 w-3.5 text-[#4ea173]" />
                                            </div>
                                            Phí đăng ký giải chính thức
                                        </li>
                                        <li className="flex items-start gap-3 py-3 text-sm leading-7 text-[#456a56]">
                                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e7f7ef]">
                                                <X className="h-3.5 w-3.5 text-[#4ea173]" />
                                            </div>
                                            Chi phí di chuyển cá nhân
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
