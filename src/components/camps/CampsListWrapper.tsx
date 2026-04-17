'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Container } from '@/components/home/Shared'
import CampCardHorizontal from '@/components/camps/CampCardHorizontal'

interface CampsListWrapperProps {
    camps: any[];
}

export default function CampsListWrapper({ camps }: CampsListWrapperProps) {
    // 1. Trạng thái để kiểm tra xem component đã mount (chạy trên trình duyệt) chưa
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 2. Sử dụng useMemo để tính toán việc sắp xếp, chỉ chạy lại khi 'camps' thay đổi
    // và chỉ thực hiện logic thời gian thực khi đã mount
    const sortedCamps = useMemo(() => {
        if (!mounted) return camps; // Trả về mảng gốc khi đang render ở Server

        const now = new Date().getTime();
        
        return [...camps].sort((a: any, b: any) => {
            const aStatus = now < a.startTimestamp ? 'upcoming' : now > a.endTimestamp ? 'past' : 'active';
            const bStatus = now < b.startTimestamp ? 'upcoming' : now > b.endTimestamp ? 'past' : 'active';
            
            // Logic đưa các trại đã kết thúc (past) xuống dưới cùng
            if (aStatus === 'past' && bStatus !== 'past') return 1;
            if (aStatus !== 'past' && bStatus === 'past') return -1;
            
            // Sắp xếp theo ngày bắt đầu cho các trại cùng trạng thái
            return (a.startTimestamp || Infinity) - (b.startTimestamp || Infinity);
        });
    }, [camps, mounted]);

    // 3. Nếu chưa mounted, bạn có thể render một khung trống hoặc placeholder 
    // để tránh hiện tượng nhảy nội dung (layout shift)
    if (!mounted) {
        return (
            <section className="bg-white py-10 text-slate-950 md:py-12">
                <Container>
                    <div className="space-y-5 opacity-0">
                        {camps.map((camp) => (
                            <div key={camp.slug} className="h-40 w-full bg-slate-100 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="bg-white py-10 text-slate-950 md:py-12">
            <Container>
                <div className="space-y-5">
                    {sortedCamps.length > 0 ? (
                        sortedCamps.map((camp: any, i: number) => (
                            <CampCardHorizontal 
                                key={camp.slug} 
                                camp={camp} 
                                isFeatured={i === 0} 
                            />
                        ))
                    ) : (
                        <p className="text-center text-slate-500">Không có dữ liệu trại hè.</p>
                    )}
                </div>
            </Container>
        </section>
    )
}