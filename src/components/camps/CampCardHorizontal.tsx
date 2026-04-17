'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react'


interface CampCardHorizontalProps {
    camp: any;
    isFeatured?: boolean;
}

export default function CampCardHorizontal({ camp, isFeatured }: CampCardHorizontalProps) {
    const {
        title,
        slug,
        destinationName,
        date,
        duration,
        priceFrom,
        seatsTotal,
        seatsLeft,
        image,
        description,
        excerpt,
        overview,
        startTimestamp,
        endTimestamp,
    } = camp;
    const campDescription = description || excerpt || overview?.replace(/<[^>]*>?/gm, '').substring(0, 200) || '';
    
    const isSoldOut = seatsLeft === 0;

    // Calculate status on client side
    const status = useMemo(() => {
        const now = new Date().getTime();
        if (now < (startTimestamp || Infinity)) return 'upcoming';
        if (now > (endTimestamp || Infinity)) return 'past';
        return 'active';
    }, [startTimestamp, endTimestamp]);

    const isPast = status === 'past';

    // Status display
    const statusConfig = {
        upcoming: { label: 'Sắp diễn ra', bgColor: '#EFF6FF', textColor: '#1E40AF', borderColor: '#BFDBFE' },
        active: { label: 'Đang diễn ra', bgColor: '#FFFBEB', textColor: '#B45309', borderColor: '#FEE3C3' },
        past: { label: 'Đã diễn ra', bgColor: '#F3F4F6', textColor: '#6B7280', borderColor: '#E5E7EB' },
    };
    const currentStatus = statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <Link 
                href={isPast ? '#' : `/camps/${slug}`}
                onClick={(e) => isPast && e.preventDefault()}
                className={`group grid overflow-hidden rounded-[28px] border transition-all duration-300 ${isPast ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'} lg:grid-cols-[280px_minmax(0,1fr)_260px] ${
                    isFeatured 
                    ? 'border-[#5d78ff]/30 bg-white shadow-[0_20px_48px_rgba(44,74,206,0.12)] ring-1 ring-[#5d78ff]/10' 
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl'
                }`}
            >
                {/* Image Section */}
                <div className="relative aspect-[1.5/1] overflow-hidden bg-slate-100 lg:aspect-auto">
                    <img 
                        src={image || "/placeholder-camp.png"} 
                        alt={title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute left-4 top-4 flex flex-col gap-2">
                        {isFeatured && (
                            <span className="rounded-full bg-[#2C4ACE] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                Liên hệ Gopeaks
                            </span>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-6 lg:p-8">
                    <div className="flex flex-wrap gap-2 mb-3 items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2C4ACE]">
                            <MapPin className="h-3 w-3" />
                            {destinationName}
                        </span>
                        <span 
                            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                            style={{ 
                                backgroundColor: currentStatus.bgColor, 
                                color: currentStatus.textColor,
                                border: `1px solid ${currentStatus.borderColor}`
                            }}
                        >
                            {currentStatus.label}
                        </span>
                    </div>
                    
                    <h3 className="text-2xl leading-[1.15] tracking-tight text-slate-950 font-bold md:text-3xl">
                        {title}
                    </h3>
                    {campDescription && (
                        <p className="mt-4 text-slate-600">{campDescription}</p>
                    )}

                    <div className="mt-auto pt-6 text-sm text-slate-500 grid-cols-2 grid gap-4">
                        <div className='space-y-3 border boxshadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_16px_rgba(15,23,42,0.06)] rounded-lg border-slate-200 bg-white/80 p-4'>
                            <p>Địa điểm</p>
                            <span className="font-medium text-slate-700">{destinationName}</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <span className="font-medium text-slate-700">{date}</span>
                            </div>
                        </div>
                        <div className='space-y-3 border boxshadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_16px_rgba(15,23,42,0.06)] rounded-lg border-slate-200 bg-white/80 p-4'>
                            <p>Thời lượng</p>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <span className="font-medium text-slate-700">{duration}</span>
                            </div>
                        </div>
                        
                    </div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col border-t border-slate-100 bg-[#f9fbff]/50 p-6 lg:border-l lg:border-t-0 lg:p-8">
                    <div className="mt-auto mb-auto space-y-3">
                        <button className="inline-flex items-center rounded-full px-6 py-3.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 flex justify-center" style={{ background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', boxShadow: 'rgba(44, 74, 206, 0.18) 0px 12px 28px', width: '100%'}}>
                            Xem chi tiết
                        </button>
                        <button className='inline-flex min-h-[52px] items-center flex justify-center rounded-full border px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 border-slate-200 bg-white/90 text-slate-700 hover:border-slate-300 hover:bg-white' style={{ width: '100%' }}>
                            Nhận tư vấn
                        </button>
                        <div className="flex items-center gap-2 justify-center">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span className="font-medium text-slate-700">{seatsTotal} người / camp</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
