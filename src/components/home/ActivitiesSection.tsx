import React from 'react'
import Image from 'next/image'

import img1 from '@/imports/image-1.png'
import img2 from '@/imports/image-2.png'
import img3 from '@/imports/image-3.png'
import img4 from '@/imports/image-4.png'

const activities = [
    {
        title: "Tập luyện bám sát thực tế",
        desc: "Các buổi tập được thiết kế mô phỏng địa hình và điều kiện thi đấu thực tế, giúp bạn làm quen với áp lực.",
        image: img1
    },
    {
        title: "Kỹ thuật chuyên sâu",
        desc: "Chỉnh sửa tư thế chạy, kỹ thuật bơi biển và chuyển tiếp nhanh (T1, T2) cùng đội ngũ HLV chuyên nghiệp.",
        image: img2
    },
    {
        title: "Dinh dưỡng & Phục hồi",
        desc: "Chuẩn bị năng lượng đúng cách trước, trong và sau race. Hướng dẫn phục hồi cơ bắp tối ưu.",
        image: img3
    },
    {
        title: "Chiến thuật Race",
        desc: "Phân bổ sức mạnh (Pacing strategy), tâm lý thi đấu và xử lý các tình huống phát sinh trên đường đua.",
        image: img4
    }
]

export default function ActivitiesSection() {
    return (
        <section className="bg-slate-50 py-20 md:py-32">
            <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
                <div className="mb-16 max-w-2xl">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2C4ACE]">Hoạt động</p>
                    <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                        Nội dung huấn luyện
                    </h2>
                    <p className="mt-6 text-lg text-slate-600">
                        Chúng tôi tập trung vào những giá trị thực chiến nhất để bạn sẵn sàng phá vỡ giới hạn bản thân.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {activities.map((act, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-[32px] bg-white p-4 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                                <Image 
                                    src={act.image} 
                                    alt={act.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                            </div>
                            <div className="mt-6 px-2 pb-4">
                                <h3 className="text-xl font-bold text-slate-950">{act.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {act.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
