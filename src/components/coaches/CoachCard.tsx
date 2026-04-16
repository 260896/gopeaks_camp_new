import React from 'react';
import Link from 'next/link';
import type { Coach } from '@/app/types/wordpress';

export default function CoachCard({ coach }: { coach: Coach }) {
    return (
        <div className="group bg-white rounded-[40px] overflow-hidden border border-muted hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
            {/* Portrait Image */}
            <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                    src={coach.featuredImage?.node?.sourceUrl || 'https://via.placeholder.com/600x800'} 
                    alt={coach.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col">
                <span className="text-accent text-xs font-black uppercase tracking-widest mb-2 block">
                    {coach.acfFields?.role || 'Huấn luyện viên'}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-black text-primary mb-4">
                    {coach.title}
                </h3>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                    {(coach.acfFields?.specialty || 'Triathlon · Marathon').split('·').map((s, i) => (
                        <span key={i} className="text-muted-foreground font-bold text-sm flex items-center gap-2">
                            {i > 0 && <span className="w-1 h-1 bg-accent rounded-full" />}
                            {s.trim()}
                        </span>
                    ))}
                </div>

                <div className="bg-muted px-6 py-4 rounded-2xl italic text-primary/70 mb-8 relative">
                    <span className="absolute -top-3 left-4 text-4xl text-accent/30 font-serif">"</span>
                    <p className="line-clamp-3">
                        {coach.acfFields?.quote || 'Động lực giúp bạn bắt đầu, kỷ luật giúp bạn tiếp tục hành trình chinh phục những đỉnh cao mới.'}
                    </p>
                    <span className="absolute -bottom-8 right-4 text-4xl text-accent/30 font-serif">"</span>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10 pt-4 border-t border-muted">
                    <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Kinh nghiệm</p>
                        <p className="text-2xl font-black text-primary">{coach.acfFields?.experience || '10+'} năm</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Học viên</p>
                        <p className="text-2xl font-black text-primary">{coach.acfFields?.athletes || '100+'}+</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 btn-primary py-4">Xem hồ sơ đầy đủ</button>
                    <button className="flex-1 py-4 border-2 border-primary/10 rounded-full font-bold text-primary hover:bg-primary hover:text-white transition-all">
                        Liên hệ coach
                    </button>
                </div>
            </div>
        </div>
    );
}
