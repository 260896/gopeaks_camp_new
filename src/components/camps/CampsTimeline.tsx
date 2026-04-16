import React from 'react'
import { Container } from '@/components/home/Shared'

const events = [
    { name: 'Vietnam FesTRIval', date: '29.03', left: '20.8333%', top: '24px', height: '132px', color: '#2C4ACE', active: false },
    { name: 'IRONMAN 70.3/140.6 Đà Nẵng', date: '10.05', left: '37.5%', top: '70px', height: '86px', color: '#2C4ACE', active: true },
    { name: 'TriFactor Vietnam', date: '14-16.08', left: '62.5%', top: '116px', height: '40px', color: '#93a3e8', active: false },
    { name: 'IRONMAN 70.3 Phú Quốc', date: '15.11', left: '87.5%', top: '24px', height: '132px', color: '#93a3e8', active: false },
]

export default function CampsTimeline() {
    return (
        <section className="border-b border-slate-100 bg-[#f8fbff] py-8">
            <Container>
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="relative">
                        <div className="rounded-[40px] border border-[#d8e3f8] bg-white p-4 shadow-[0_24px_70px_rgba(44,74,206,0.06)] sm:p-6 md:p-8">
                            <div className="flex flex-col items-center justify-center pb-6 text-center">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#2C4ACE]/20 bg-primary/[0.03] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2C4ACE]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#2C4ACE] animate-pulse"></span>
                                    Lịch thi đấu & camp 2026
                                </span>
                                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Tiến độ mùa giải.</h2>
                            </div>
                            
                            <div className="relative overflow-x-auto overflow-y-hidden pb-4">
                                <div className="relative h-[280px] min-w-[1000px] overflow-hidden">
                                    {/* Months Grid */}
                                    <div className="absolute inset-0 flex">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <div key={i} className="flex h-full flex-1 flex-col items-center border-r border-slate-100/60 last:border-r-0">
                                                <div className="mt-auto pb-4">
                                                    <div className={`text-[11px] font-bold tracking-wider ${i === 3 ? 'text-[#2C4ACE]' : 'text-slate-300'}`}>
                                                        THÁNG {i + 1}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Progress Track */}
                                    <div className="absolute left-0 right-0 h-[6px] rounded-full bg-slate-100 px-1" style={{ top: '210px' }}>
                                        <div className="h-full rounded-full bg-[linear-gradient(90deg,#60a5fa_0%,#2C4ACE_100%)] shadow-[0_0_12px_rgba(44,74,206,0.3)]" style={{ width: '29.1667%' }} />
                                    </div>

                                    {/* Current Time Indicator */}
                                    <div className="absolute -translate-x-1/2" style={{ left: '29.1667%', top: '201px' }}>
                                        <div className="relative flex h-6 w-6 items-center justify-center">
                                            <div className="absolute inset-0 rounded-full bg-[#2C4ACE]/20 animate-ping" />
                                            <div className="h-4 w-4 rounded-full border-2 border-white bg-[#2C4ACE] shadow-lg" />
                                        </div>
                                        <div className="mt-6 text-center">
                                            <span className="rounded-full bg-[#2C4ACE] px-2 py-0.5 text-[9px] font-bold text-white whitespace-nowrap">NOW</span>
                                        </div>
                                    </div>

                                    {/* Event Markers */}
                                    {events.map((ev, i) => (
                                        <div key={i}>
                                            {/* Line */}
                                            <div className="absolute -translate-x-1/2 bg-[linear-gradient(180deg,#cad7f2_0%,rgba(202,215,242,0)_100%)]" style={{ left: ev.left, top: ev.top, width: '1px', height: ev.height }} />
                                            
                                            {/* Dot */}
                                            <div className="absolute -translate-x-1/2" style={{ left: ev.left, top: '208px' }}>
                                                <div className={`h-2.5 w-2.5 rounded-full ring-4 ring-white shadow-md ${ev.active ? 'bg-[#2C4ACE]' : 'bg-slate-300'}`} />
                                            </div>

                                            {/* Content Card */}
                                            <div 
                                                className="group absolute -translate-x-1/2 flex flex-col items-center" 
                                                style={{ left: ev.left, top: `calc(${ev.top} - 10px)`, transform: 'translate(-50%, -100%)' }}
                                            >
                                                <div className={`rounded-2xl border px-4 py-3 shadow-sm transition-all duration-500 group-hover:-translate-y-1 ${
                                                    ev.active 
                                                    ? 'border-[#2C4ACE]/20 bg-[#2C4ACE] text-white shadow-[0_12px_32px_rgba(44,74,206,0.2)]' 
                                                    : 'border-slate-100 bg-white text-slate-900 group-hover:border-[#2C4ACE]/30'
                                                }`}>
                                                    <div className="text-[12px] font-bold leading-tight whitespace-nowrap">{ev.name}</div>
                                                    <div className={`mt-1.5 text-[10px] font-bold opacity-70 ${ev.active ? 'text-white' : 'text-[#2C4ACE]'}`}>{ev.date}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
