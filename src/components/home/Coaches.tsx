import React from 'react'
import Link from 'next/link'
import { Container, SectionTitle } from './Shared'
import type { Coach } from '@/app/types/wordpress'

export default function Coaches({ coaches }: { coaches: Coach[] }) {
    return (
        <section className="py-24 bg-muted/30">
            <Container>
                <SectionTitle 
                    overline="ĐỘI NGŨ"
                    title="Huấn Luyện Viên" 
                    subtitle="Những chuyên gia hàng đầu, luôn sẵn sàng đồng hành cùng bạn trên mọi cung đường."
                    centered
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coaches?.map((coach) => (
                        <div key={coach.title} className="group flex flex-col items-center bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-accent/20">
                            <div className="relative w-48 h-48 mb-6 rounded-2xl overflow-hidden ring-4 ring-muted group-hover:ring-accent/50 transition-all duration-300">
                                <img 
                                    src={coach.featuredImage?.node?.sourceUrl || 'https://via.placeholder.com/300x300'} 
                                    alt={coach.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-1">{coach.title}</h3>
                            <p className="text-accent font-semibold text-sm mb-4 uppercase tracking-wider">
                                {coach.acfFields?.role || 'Huấn luyện viên'}
                            </p>
                            <p className="text-muted-foreground text-center text-sm line-clamp-3 mb-6">
                                {coach.acfFields?.specialty || 'Chuyên gia chạy bộ địa hình & sức bền.'}
                            </p>
                            
                            <div className="mt-auto grid grid-cols-2 w-full gap-4 pt-4 border-t border-muted">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-primary">{coach.acfFields?.experience || '5+'}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase">Năm EXP</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-primary">{coach.acfFields?.athletes || '100+'}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase">Học viên</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-16 text-center">
                    <Link href="/coaches" className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors gap-2">
                        Tìm hiểu thêm về đội ngũ của chúng tôi
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                </div>
            </Container>
        </section>
    )
}
