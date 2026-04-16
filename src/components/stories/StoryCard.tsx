import React from 'react'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { Post } from '@/app/types/wordpress'

interface StoryCardProps {
    story: Post;
    isFeatured?: boolean;
}

export default function StoryCard({ story, isFeatured }: StoryCardProps) {
    if (isFeatured) {
        return (
            <div className="group grid overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)] lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[360px] overflow-hidden">
                    {story.featuredImage?.node?.sourceUrl && (
                        <img 
                            src={story.featuredImage.node.sourceUrl} 
                            alt={story.title} 
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" 
                        />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.08),rgba(5,10,18,0.42)_100%)]" />
                    <div className="absolute left-5 top-5">
                        <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm border-slate-200/70 bg-white/94 text-slate-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#4C64CC]" />
                            Bàu Trắng
                        </span>
                    </div>
                </div>
                <div className="flex flex-col justify-between p-6 md:p-8">
                    <div>
                        <h2 className="max-w-[16ch] text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.04] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                            {story.title}
                        </h2>
                        <div 
                            className="mt-4 text-[15px] leading-7 text-slate-600 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: story.excerpt || '' }}
                        />
                        <div className="mt-6 border-t border-slate-100 pt-5">
                            <Quote className="h-5 w-5 text-[#2C4ACE]" />
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                "Camp này không cố làm quá nhiều thứ. Nó chỉ làm đúng những thứ mình cần trước race, và làm rất gọn."
                            </p>
                            <div className="mt-4 text-sm font-semibold text-slate-950">Lê Thành Tùng</div>
                        </div>
                    </div>
                    <Link 
                        href={`/stories/${story.slug}`}
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2C4ACE] transition-all duration-300 group-hover:gap-3"
                    >
                        Đọc câu chuyện
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <Link 
            href={`/stories/${story.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
        >
            <div className="relative aspect-[1.08/1] overflow-hidden">
                {story.featuredImage?.node?.sourceUrl && (
                    <img 
                        src={story.featuredImage.node.sourceUrl} 
                        alt={story.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" 
                    />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.08),rgba(5,10,18,0.44)_100%)]" />
                <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm border-slate-200/70 bg-white/94 text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4C64CC]" />
                        Bàu Trắng
                    </span>
                </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#eef2ff] px-3 py-2 text-xs font-semibold text-[#2C4ACE]">Bàu Trắng</span>
                    <span className="rounded-full bg-[#eef2ff] px-3 py-2 text-xs font-semibold text-[#2C4ACE]">Race simulation</span>
                </div>
                <h3 className="mt-5 text-[28px] leading-[1.04] tracking-tight text-slate-950 font-bold">
                    {story.title}
                </h3>
                <div 
                    className="mt-4 text-sm leading-7 text-slate-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: story.excerpt || '' }}
                />
                <div className="mt-auto pt-5">
                    <p className="text-sm leading-7 text-slate-500 italic">
                        "Camp này không cố làm quá nhiều thứ. Nó chỉ làm đúng những thứ mình cần trước race, và làm rất gọn."
                    </p>
                    <div className="mt-3 text-sm font-semibold text-slate-950">Lê Thành Tùng</div>
                </div>
            </div>
        </Link>
    )
}
