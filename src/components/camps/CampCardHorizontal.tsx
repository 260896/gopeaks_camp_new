'use client'

import React from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react'
import CampLocation from '@/components/camps/CampLocation';

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
        image
    } = camp;

    const isSoldOut = seatsLeft === 0;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <Link 
                href={`/camps/${slug}`}
                className={`group grid overflow-hidden rounded-[28px] border transition-all duration-300 hover:-translate-y-1 lg:grid-cols-[280px_minmax(0,1fr)_260px] ${
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
                                Phổ biến nhất
                            </span>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-6 lg:p-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2C4ACE]">
                            <MapPin className="h-3 w-3" />
                            {destinationName}
                        </span>
                    </div>
                    
                    <h3 className="text-2xl leading-[1.15] tracking-tight text-slate-950 font-bold md:text-3xl lg:max-w-[18ch]">
                        {title}
                    </h3>

                    <div className="mt-auto pt-6 flex flex-wrap gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="font-medium text-slate-700">{date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span className="font-medium text-slate-700">{seatsTotal} người / camp</span>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col border-t border-slate-100 bg-[#f9fbff]/50 p-6 lg:border-l lg:border-t-0 lg:p-8">
                    <div className="mb-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Chi phí từ</p>
                        <div className="mt-1 text-2xl font-bold tracking-tight text-[#2C4ACE]">{priceFrom}</div>
                    </div>
                    
                    <div className="mt-auto space-y-3">
                        <div className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                            isSoldOut 
                            ? 'bg-slate-200 text-slate-500 pointer-events-none' 
                            : 'bg-[#2C4ACE] text-white hover:bg-[#1e3aa8] shadow-[0_8px_20px_rgba(44,74,206,0.22)]'
                        }`}>
                            {isSoldOut ? 'Đã hết chỗ' : 'Đăng ký ngay'}
                            {!isSoldOut && <ArrowRight className="h-4 w-4" />}
                        </div>
                        <div className="flex items-center justify-center text-xs font-medium text-slate-500 transition-colors group-hover:text-[#2C4ACE]">
                            Xem chi tiết lịch trình
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
