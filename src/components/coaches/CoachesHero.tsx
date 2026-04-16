import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/home/Shared'

import heroBg from '@/imports/image-10.png'

export default function CoachesHero() {
    return (
        <section className="relative flex flex-col justify-end overflow-hidden text-white min-h-[56svh] pt-24">
            <div className="absolute inset-0">
                <Image 
                    src={heroBg} 
                    alt="Coaches Background" 
                    fill 
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,22,0.14)_0%,rgba(5,10,22,0.24)_28%,rgba(5,10,22,0.52)_58%,rgba(5,10,22,0.92)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(4,237,247,0.08),transparent_22%)]" />
            </div>
            
            <Container className="relative z-10 pb-12 lg:pb-16">
                <div className="max-w-[980px]">
                    <h1 className="tracking-tight text-white max-w-[20ch] text-[clamp(2.15rem,4.4vw,3.95rem)] leading-[1.08] font-bold" style={{ textWrap: 'balance' }}>
                        Đội ngũ huấn luyện viên chuyên môn cao.
                    </h1>
                    <p className="mt-4 max-w-[44rem] text-[15px] leading-7 text-white/80 md:text-[16px] md:leading-7">
                        Các huấn luyện viên phối hợp nền tảng kiến thức khoa học vững chắc cùng kinh nghiệm giảng dạy để xây dựng lộ trình tập luyện tối ưu cho từng vận động viên.
                    </p>
                </div>
            </Container>
        </section>
    )
}
