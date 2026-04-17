"use client";

import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

interface CampImagesGalleryProps {
    images: any[];
    title: string;
    subtitle?: string;
    description?: string;
    id?: string;
}

export default function CampImagesGallery({ images, title, subtitle, description, id }: CampImagesGalleryProps) {
    if (!images || images.length === 0) return null;

    return (
        <section id={id} className="scroll-mt-[120px] bg-white py-6 text-slate-950">
            <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <article className="rounded-[28px] border border-[#dde7fb] bg-white/80 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
                        <div className="flex flex-col gap-5 border-b border-[#e6eefc] pb-5">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                                <div className="max-w-[52ch]">
                                    {subtitle && (
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#2C4ACE] mb-2">{subtitle}</p>
                                    )}
                                    <h3 className="text-[clamp(1.35rem,2.7vw,2rem)] leading-[1.12] tracking-tight text-slate-950 font-bold">
                                        {title}
                                    </h3>
                                    {description && (
                                        <p className="mt-3 text-sm leading-7 text-slate-600">
                                            {description}
                                        </p>
                                    )}
                                </div>
                                <div className="hidden md:flex gap-2 mb-1">
                                    {/* These will be controlled by the Carousel context if placed inside <Carousel /> */}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="w-full"
                            >
                                <div className="relative group/carousel">
                                    <CarouselContent className="-ml-3 md:-ml-4">
                                        {images.map((img: any, i: number) => {
                                            // Try all possible ways ACF/WP can return an image URL
                                            const url = img?.url || 
                                                      img?.source_url || 
                                                      img?.sizes?.large || 
                                                      img?.sizes?.medium_large ||
                                                      img?.guid?.rendered || 
                                                      (typeof img === 'string' ? img : '');
                                            
                                            const alt = img?.alt || img?.title || `${title} image ${i + 1}`;
                                            
                                            // Domain fix if needed
                                            const finalUrl = (url && url.startsWith('/')) 
                                                ? `https://sub.gopeaks.coach${url}` 
                                                : url;

                                            if (!finalUrl) {
                                                console.log(`Gallery image ${i} in ${title} has no URL:`, img);
                                                return null;
                                            }

                                            return (
                                                <CarouselItem 
                                                    key={i} 
                                                    className="basis-[84%] pl-3 sm:basis-[52%] md:basis-[42%] md:pl-4 xl:basis-[32%]"
                                                >
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <button 
                                                                type="button" 
                                                                className="group relative block w-full overflow-hidden rounded-[24px] border border-[#dfe7f8] bg-[#f4f7ff] text-left shadow-[0_14px_34px_rgba(15,23,42,0.05)] focus:outline-none"
                                                            >
                                                                <div className="relative aspect-[1.06/0.88] w-full overflow-hidden">
                                                                    <img
                                                                        src={finalUrl}
                                                                        alt={alt}
                                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                                                    />
                                                                </div>
                                                            </button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent shadow-none [&>button]:text-white z-[100]">
                                                            <div className="relative h-[80vh] w-full">
                                                                <img
                                                                    src={finalUrl}
                                                                    alt={alt}
                                                                    className="h-full w-full object-contain"
                                                                />
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </CarouselItem>
                                            );
                                        })}
                                    </CarouselContent>
                                    
                                    <div className="absolute top-1/2 -left-4 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden xl:block">
                                        <CarouselPrevious className="relative left-0 translate-y-0 border-none bg-white/80 backdrop-blur-md shadow-lg hover:bg-white" />
                                    </div>
                                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden xl:block">
                                        <CarouselNext className="relative right-0 translate-y-0 border-none bg-white/80 backdrop-blur-md shadow-lg hover:bg-white" />
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
