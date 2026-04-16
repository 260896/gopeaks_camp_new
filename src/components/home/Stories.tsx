import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import storyImage from '@/imports/image-8.png'

export default function Stories() {
    return (
        <section className="bg-white py-20 md:py-32">
            <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    <div className="order-2 lg:order-1">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[40px] shadow-2xl">
                            <Image 
                                src={storyImage} 
                                alt="Gopeaks Success Story" 
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                fill
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-8 pt-20">
                                <div className="text-sm font-bold uppercase tracking-widest text-accent">Câu chuyện truyền cảm hứng</div>
                                <h3 className="mt-2 text-2xl font-bold text-white">Vượt qua giới hạn tại Ironman Da Nang</h3>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2C4ACE]">Success Stories</p>
                        <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
                            Thành công của <br />
                            <span className="italic text-slate-400">từng cá nhân.</span>
                        </h2>
                        <p className="mt-8 text-xl leading-relaxed text-slate-600">
                            Không chỉ là tập luyện, Gopeaks là nơi những giấc mơ Ironman trở thành hiện thực. Hãy nghe những vận động viên của chúng tôi kể về hành trình thay đổi bản thân.
                        </p>
                        
                        <div className="mt-12">
                            <Link 
                                href="/blog"
                                className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-8 py-4 text-sm font-bold text-slate-900 transition-all hover:bg-slate-200"
                            >
                                Đọc thêm các câu chuyện
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
