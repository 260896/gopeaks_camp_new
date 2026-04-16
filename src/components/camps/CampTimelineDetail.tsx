'use client'

import React, { useState } from 'react'
import { Container } from '@/components/home/Shared'

interface CampTimelineDetailProps {
    itinerary: any[];
}

export default function CampTimelineDetail({ itinerary }: CampTimelineDetailProps) {
    const [activeDay, setActiveDay] = useState(0);

    if (!itinerary || itinerary.length === 0) return null;

    const currentDay = itinerary[activeDay];

    return (
        <section id="lich-trinh" className="scroll-mt-[148px] md:scroll-mt-[164px] bg-[#f2f5fa] py-10 text-slate-950 md:py-12">
            <Container>
                <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-[780px]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Lịch trình chi tiết</p>
                            <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>Timeline theo từng ngày.</h2>
                            <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-slate-600">Lịch trình thống nhất giúp bạn dễ dàng theo dõi các hoạt động quan trọng trong suốt kỳ camp</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[30px] border border-[#dde5f6] bg-white p-5 shadow-[0_16px_44px_rgba(15,23,42,0.05)] md:p-7 lg:p-8">
                    {/* Day Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#d8e1f4] bg-[#f8faff] p-1 sm:mx-auto sm:w-fit">
                        {itinerary.map((day, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActiveDay(i)}
                                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                                    activeDay === i 
                                    ? 'bg-[#213fb7] text-white shadow-[0_12px_28px_rgba(33,63,183,0.24)]' 
                                    : 'text-slate-500 hover:text-[#213fb7]'
                                }`}
                            >
                                Day {i + 1}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="border-b border-[#e7edf8] pb-6 text-center">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#213fb7]">Lịch của ngày</p>
                            <h3 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.1] tracking-tight text-slate-950 font-bold">
                                {currentDay.date || currentDay.label || `Ngày ${activeDay + 1}`}
                            </h3>
                            {currentDay.subtitle && <p className="mt-2 text-sm text-slate-500 font-medium">{currentDay.subtitle}</p>}
                            <p className="mt-4 text-xs font-medium text-slate-400 md:hidden italic">Chọn số ngày ở trên để xem chi tiết</p>
                        </div>

                        <div className="mt-8 space-y-8">
                            {currentDay.periods && currentDay.periods.length > 0 ? (
                                currentDay.periods.map((period: any, pIdx: number) => (
                                    <div key={pIdx} className="rounded-[28px] border border-[#e3e9f5] bg-[#fbfcff] px-4 py-4 md:px-6 md:py-5 lg:px-7 shadow-sm">
                                        <div className="border-b border-[#e6edf8] pb-4 mb-2">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#213fb7]">{period.label}</p>
                                        </div>
                                        <div className="relative space-y-0">
                                            {period.entries && period.entries.map((entry: any, eIdx: number) => (
                                                <div 
                                                    key={eIdx} 
                                                    className={`grid gap-4 px-1 py-5 md:grid-cols-[132px_26px_minmax(0,1fr)] md:items-start md:px-0 lg:grid-cols-[148px_30px_minmax(0,1fr)] ${eIdx !== 0 ? 'border-t border-[#e9eef8]' : ''}`}
                                                >
                                                    <div className="md:pr-1">
                                                        <div className="inline-flex min-h-[40px] w-full items-center justify-center rounded-full border border-[#cad6f6] bg-white px-4 text-center text-[12px] font-bold tracking-[0.01em] text-[#213fb7]">
                                                            {entry.time}
                                                        </div>
                                                    </div>
                                                    <div className="relative hidden md:block">
                                                        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#d9e1f3]"></div>
                                                        <div className="absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#213fb7] ring-4 ring-white"></div>
                                                    </div>
                                                    <div className="min-w-0 pt-0.5">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] border-slate-200 bg-slate-100 text-slate-600">
                                                                {entry.block || 'ACTIVITY'}
                                                            </span>
                                                        </div>
                                                        <h4 className="mt-2 text-[17px] leading-7 text-slate-950 font-bold">{entry.title}</h4>
                                                        <p className="mt-1.5 text-sm leading-7 text-slate-600">{entry.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-slate-400">Đang cập nhật lịch trình chi tiết...</div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
