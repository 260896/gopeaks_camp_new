import React from 'react'
import { Container } from '@/components/home/Shared'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface CampFinalCTAProps {
    title: string;
    description: string;
    slug: string;
    image: string;
}

export default function CampFinalCTA({ title, description, slug, image }: CampFinalCTAProps) {
    return (
        <section className="relative overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-0">
                <img 
                    src={image || "https://res.cloudinary.com/dxai5ztql/image/upload/q_auto/f_auto/v1775734798/DSC01598_n5h2vk.jpg"} 
                    alt={title} 
                    className="h-full w-full object-cover" 
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,18,0.86)_0%,rgba(7,10,18,0.56)_44%,rgba(7,10,18,0.24)_100%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,18,0.16)_0%,rgba(7,10,18,0.34)_54%,rgba(7,10,18,0.84)_100%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(4,237,247,0.12),transparent_22%),radial-gradient(circle_at_22%_78%,rgba(44,74,206,0.18),transparent_28%)]"></div>
            </div>
            
            <Container className="relative z-10 py-14 md:py-16 lg:py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="max-w-3xl">
                    <h2 
                        className="max-w-[18ch] text-[36px] leading-[1] tracking-[-0.03em] text-white md:text-[54px] lg:text-[72px] font-bold" 
                        style={{ textWrap: 'balance' }}
                    >
                        {title}
                    </h2>
                    <p className="mt-5 max-w-[56ch] text-base leading-8 text-white/74 md:text-lg">
                        {description}
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link 
                            href={`/apply?camp=${slug}`}
                            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                            style={{ 
                                background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', 
                                boxShadow: 'rgba(44, 74, 206, 0.28) 0px 18px 40px' 
                            }}
                        >
                            Đăng ký ngay
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link 
                            href="/lien-he"
                            className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/14 hover:text-white"
                        >
                            Nhận tư vấn nhanh
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}
