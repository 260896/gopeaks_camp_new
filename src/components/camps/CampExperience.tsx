import React from 'react'
import { Container } from '@/components/home/Shared'
import { Activity, BookOpen, Building2, ShieldCheck, Check } from 'lucide-react'

interface CampExperienceProps {
    experiences: any[];
}

export default function CampExperience({ experiences }: CampExperienceProps) {
    if (!experiences || experiences.length === 0) return null;

    const icons = [Activity, BookOpen, Building2, ShieldCheck];

    return (
        <section className="bg-white py-10 text-slate-950 md:py-12">
            <Container>
                <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-[780px]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Trải nghiệm trong camp</p>
                            <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>Những gì bạn sẽ có.</h2>
                            <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-slate-600">Từ buổi tập đến không gian nghỉ ngơi — tất cả được thiết kế để bạn có block tập tốt nhất.</p>
                        </div>
                    </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                    {experiences.map((exp: any, i: number) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <div key={i} className="animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ transitionDelay: `${i * 70}ms` }}>
                                <div className="group h-full rounded-[28px] border border-white/40 bg-white/60 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_16px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/80 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_16px_48px_rgba(15,23,42,0.08)]">
                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef2ff] text-[#2C4ACE] transition-colors duration-300 group-hover:bg-[#2C4ACE] group-hover:text-white">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl tracking-tight text-slate-950 font-bold">{exp.title_camp_experience || exp.highlight || exp.text}</h3>
                                    <div className="mt-5 space-y-3">
                                        <div className="text-sm leading-7 text-slate-600 prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: exp.content_camp_experience || exp.description || '' }} />
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
