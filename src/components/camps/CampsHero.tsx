import React from 'react'
import { Container } from '@/components/home/Shared'

interface CampsHeroProps {
    title?: string;
    description?: string;
    image?: string;
}

export default function CampsHero({ title, description, image }: CampsHeroProps) {
    return (
        <section className="relative flex flex-col justify-end overflow-hidden text-white min-h-[52svh] pt-24">
            <div className="absolute inset-0">
                <img 
                    src={image || "https://res.cloudinary.com/dxai5ztql/image/upload/q_auto/f_auto/v1775734798/DSC01598_n5h2vk.jpg"} 
                    alt={title || "Training Camps"} 
                    className="h-full w-full object-cover" 
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,22,0.14)_0%,rgba(5,10,22,0.24)_28%,rgba(5,10,22,0.52)_58%,rgba(5,10,22,0.92)_100%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(4,237,247,0.08),transparent_22%)]"></div>
            </div>
            
            <Container className="relative z-10 pb-12 lg:pb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="max-w-[840px]">
                    <h1 
                        className="tracking-tight text-white max-w-[20ch] text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1.04] font-bold" 
                        style={{ textWrap: 'balance' }}
                    >
                        {title || "Lịch camp sắp tới."}
                    </h1>
                    <p className="mt-5 max-w-[42rem] text-sm leading-7 text-white/80 md:text-base md:leading-8">
                        {description || "Xem lịch camp sắp tới của Gopeaks theo mốc thời gian rõ ràng, trạng thái đăng ký và thông tin đủ để bạn quyết định nhanh hơn."}
                    </p>
                </div>
            </Container>
        </section>
    )
}
