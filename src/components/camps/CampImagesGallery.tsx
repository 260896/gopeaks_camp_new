import React from 'react'
import { Container } from '@/components/home/Shared'

interface CampImagesGalleryProps {
    images: any[];
}

export default function CampImagesGallery({ images }: CampImagesGalleryProps) {
    if (!images || images.length === 0) return null;

    // We can show up to 6 images in a nice grid
    const displayImages = images.slice(0, 6);

    return (
        <section id="hinh-anh" className="scroll-mt-[148px] md:scroll-mt-[164px] bg-white py-10 md:py-16">
            <Container>
                <div className="mb-6 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-[780px]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Hình ảnh thực tế</p>
                            <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>Lưu trữ từ các camp trước.</h2>
                            <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-slate-600">Những khoảnh khắc chân thực nhất của team Gopeaks.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                    {displayImages.map((img: any, i: number) => {
                        const url = img.image?.node?.sourceUrl || img.url || img;
                        const isLarge = i === 0;
                        return (
                            <div 
                                key={i} 
                                className={`group relative overflow-hidden rounded-[24px] bg-slate-100 transition-all duration-700 hover:shadow-2xl ${
                                    isLarge ? 'col-span-2 row-span-2 aspect-[1.1/1]' : 'aspect-square'
                                } animate-in fade-in zoom-in-95 duration-700`}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <img 
                                    src={url} 
                                    alt={`Camp gallery ${i + 1}`} 
                                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    )
}
