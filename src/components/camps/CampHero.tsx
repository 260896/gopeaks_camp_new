import React from 'react'
import { Container } from '@/components/home/Shared'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface CampHeroProps {
    title: string;
    description: string;
    image: string;
    slug: string;
}

export default function CampHero({ title, description, image, slug }: CampHeroProps) {
    return (
        <section className="relative flex flex-col justify-end overflow-hidden text-white min-h-[56svh] pt-24">
            <div className="absolute inset-0">
                <img 
                    src={image || "https://res.cloudinary.com/dxai5ztql/image/upload/q_auto/f_auto/v1775714746/IMG_0497_p5rhvi.jpg"} 
                    alt={title} 
                    className="h-full w-full object-cover" 
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,22,0.14)_0%,rgba(5,10,22,0.24)_28%,rgba(5,10,22,0.52)_58%,rgba(5,10,22,0.92)_100%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(4,237,247,0.08),transparent_22%)]"></div>
            </div>
            
            <Container className="relative z-10 pb-12 lg:pb-16">
                <div className="max-w-[1100px] animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <h1 
                        className="tracking-tight text-white max-w-[25ch] text-[clamp(2.15rem,5.2vw,4.4rem)] leading-[1.08] font-bold" 
                        style={{ textWrap: 'balance' }}
                    >
                        {title}
                    </h1>
                    <p className="mt-4 max-w-[44rem] text-[15px] leading-7 text-white/80 md:text-[17px] md:leading-7">
                        {description}
                    </p>
                    <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                        <Link 
                            href={`/apply?camp=${slug}`}
                            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-transparent px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
                            style={{ 
                                background: 'linear-gradient(135deg, rgb(91, 116, 214) 0%, rgb(44, 74, 206) 58%, rgb(22, 46, 151) 100%)', 
                                color: 'rgb(255, 255, 255)', 
                                boxShadow: 'rgba(44, 74, 206, 0.22) 0px 10px 24px' 
                            }}
                        >
                            Đăng ký camp
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link 
                            href="/camps"
                            className="inline-flex min-h-[52px] items-center justify-center rounded-full border px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 border-white/20 bg-black/12 text-white hover:border-white/35 hover:bg-black/20 w-full sm:w-auto backdrop-blur-md"
                        >
                            Xem camps khác
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}
