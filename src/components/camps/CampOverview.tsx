import React from 'react'
import { Container } from '@/components/home/Shared'
import { MapPin, Calendar, Clock3, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { fetchWPCampBySlug, fetchWPCamps, mapWPCampToUpcomingCamp, formatWPCampDate } from '@/lib/wordpress';

interface CampOverviewProps {
    camp: any;
}

export default function CampOverview({ camp }: CampOverviewProps) {
    const { acfFields } = camp;
    
    const location = acfFields?.location || camp.destinationName || 'Bàu Trắng';
    // const dates = acfFields?.dates || camp.date || 'Đang cập nhật';
    const timeCamp = acfFields?.time_camp?.[0];
    const dates = formatWPCampDate(acfFields?.time_camp) || camp.date || 'Đang cập nhật';const duration = acfFields?.duration || camp.duration || 'Đang cập nhật';
    const maxPeople = acfFields?.maxPeople || camp.seatsTotal || '20';

    return (
        <section id="tong-quan" className="scroll-mt-[148px] md:scroll-mt-[164px] bg-[#f4f7ff] py-10 text-slate-950 md:py-12">
            <Container>
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                    <div className="animate-in fade-in slide-in-from-left-6 duration-700">
                        <div className="rounded-[24px] border border-[#d8e3f8] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f8ff_100%)] p-6 shadow-[0_10px_28px_rgba(44,74,206,0.05)] md:p-7">
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm border-slate-200/70 bg-white/94 text-slate-500">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#4C64CC]" />
                                    {location}
                                </span>
                                {acfFields?.targetRace && (
                                    <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 font-medium">{acfFields.targetRace}</span>
                                )}
                                {dates && (
                                    <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 font-medium">{dates}</span>
                                )}
                            </div>
                            <h2 className="mt-6 max-w-[22ch] text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                                {camp.title}
                            </h2>
                            
                            <div 
                                className="mt-5 max-w-[42rem] text-[15px] leading-7 text-slate-600 wp-content prose prose-slate prose-sm"
                                dangerouslySetInnerHTML={{ __html: camp.overview || '' }}
                            />
                            
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <Link 
                                    href={`/apply?camp=${camp.slug}`}
                                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                                    style={{ 
                                        background: 'linear-gradient(135deg, rgb(91, 116, 214) 0%, rgb(44, 74, 206) 58%, rgb(22, 46, 151) 100%)', 
                                        boxShadow: 'rgba(44, 74, 206, 0.22) 0px 10px 24px' 
                                    }}
                                >
                                    Đăng ký ngay
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <a href="#luu-tru" className="inline-flex items-center justify-center rounded-full border border-[#d5def2] bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-[#2C4ACE] hover:text-[#2C4ACE]">
                                    Xem mục lưu trú
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-28 animate-in fade-in slide-in-from-right-6 duration-700 delay-100">
                        <div className="divide-y divide-slate-200">
                            <div className="flex items-center gap-4 py-4">
                                <MapPin className="h-4 w-4 shrink-0 text-[#2C4ACE]" />
                                <div className="flex-1">
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Điểm đến</div>
                                    <div className="mt-0.5 text-sm text-slate-700 font-bold">{location}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 py-4">
                                <Calendar className="h-4 w-4 shrink-0 text-[#2C4ACE]" />
                                <div className="flex-1">
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Thời gian</div>
                                    <div className="mt-0.5 text-sm text-slate-700 font-bold">{dates}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 py-4">
                                <Clock3 className="h-4 w-4 shrink-0 text-[#2C4ACE]" />
                                <div className="flex-1">
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Thời lượng</div>
                                    <div className="mt-0.5 text-sm text-slate-700 font-bold">{duration}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 py-4">
                                <Users className="h-4 w-4 shrink-0 text-[#2C4ACE]" />
                                <div className="flex-1">
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Quy mô</div>
                                    <div className="mt-0.5 text-sm text-slate-700 font-bold">{maxPeople} người / camp</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6 border-t border-slate-200 pt-6">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Dành cho ai</div>
                            <p className="mt-3 text-[14px] leading-7 text-slate-600">
                                Vận động viên cần một lịch trình tập luyện tinh gọn và rõ ràng cho tuần thi đấu. Phù hợp cho những ai muốn tập trung tối đa vào chuyên môn và giảm bớt các lo lắng về khâu tổ chức, hậu cần.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
