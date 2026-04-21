import React from 'react'
import Link from 'next/link'

interface CoachCardDetailedProps {
    coach: any;
}

export default function CoachCardDetailed({ coach }: CoachCardDetailedProps) {
    const title = coach.title || coach.name;
    const slug = coach.slug;
    const imageUrl = coach.featuredImage?.node?.sourceUrl || "https://res.cloudinary.com/dxai5ztql/image/upload/q_auto/f_auto/v1775199371/vi_b1lh4n.webp";

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Link 
                href={`/coaches/${slug}`} 
                className="group grid h-full overflow-hidden rounded-[28px] border border-white/40 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/70 hover:bg-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_20px_56px_rgba(15,23,42,0.1)] md:grid-cols-[220px_minmax(0,1fr)]"
            >
                <div className="relative min-h-[250px] h-full overflow-hidden bg-slate-950">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" 
                    />
                </div>
                <div className="grid h-full grid-rows-[auto_1fr_auto] p-6 md:p-8">
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Coach phụ trách</p>
                        <h3 className="mt-3 min-h-[3.6rem] text-[28px] leading-[1.02] tracking-tight text-slate-950 font-bold">{title}</h3>
                    </div>
                    <div className="min-w-0 pt-3">
                        <p className="max-w-[34ch] text-sm leading-7 text-slate-600 font-medium">
                            {coach.acfFields?.position || coach.description || 'Chuyên gia huấn luyện tại Gopeaks'}
                        </p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-start gap-2 border-t border-slate-200 pt-5">
                        {coach.acfFields?.certifications?.slice(0, 2).map((cert: any, idx: number) => (
                            <span key={idx} className="rounded-full border border-slate-200 bg-[#f6f8fc] px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                {cert.title}
                            </span>
                        ))}
                        {(!coach.acfFields?.certifications || coach.acfFields?.certifications.length === 0) && (
                            <span className="rounded-full border border-slate-200 bg-[#f6f8fc] px-4 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                {coach.acfFields?.expertise || 'Triathlon · Ironman'}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    )
}
