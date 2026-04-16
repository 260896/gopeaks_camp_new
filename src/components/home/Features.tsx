import React from 'react'
import { Container } from './Shared'

const features = [
    {
        title: 'Huấn Luyện Chuyên Nghiệp',
        description: 'Đội ngũ HLV giàu kinh nghiệm, đạt các chứng chỉ quốc tế và thành tích cao trong các giải đấu chuyên nghiệp.',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        )
    },
    {
        title: 'Lộ Trình Cá Nhân Hóa',
        description: 'Giáo án được thiết kế riêng biệt dựa trên thể trạng, mục tiêu và lịch trình sinh hoạt của từng học viên.',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
        )
    },
    {
        title: 'Cộng Đồng Nhiệt Huyết',
        description: 'Kết nối cùng những người có cùng đam mê, chia sẻ kinh nghiệm và cùng nhau bứt phá những giới hạn mới.',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        )
    }
]

export default function Features() {
    return (
        <section className="py-24 bg-muted/30">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-muted hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
