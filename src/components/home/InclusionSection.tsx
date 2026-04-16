import React from 'react'
import { ShieldCheck } from 'lucide-react'

const inclusions = [
    { title: 'Nơi lưu trú', description: 'Tại nơi tập luyện, tối đa thời gian nghỉ ngơi.' },
    { title: 'Dinh dưỡng', description: 'Toàn bộ các bữa ăn sáng trưa tối tươi ngon.' },
    { title: 'Workshop', description: 'Kiến thức và lời khuyên từ các chuyên gia hàng đầu.' },
    { title: 'Set up route tập luyện', description: 'Đường bơi có phao, đạp chạy theo map.' },
    { title: 'Hậu cần', description: 'Thuyền hỗ trợ an toàn dưới nước, trạm nước và dinh dưỡng trên đường đạp chạy.' }
]

export default function InclusionSection() {
    return (
        <section className="relative overflow-hidden bg-[#eef4ff] py-10 text-slate-950 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_14%,rgba(4,237,247,0.08),transparent_24%)]"></div>
            <div className="relative mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
                <div className="mb-6 md:mb-8">
                    <div className="flex flex-col gap-3 md:gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-[800px]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Bao gồm</p>
                            <h2 className="mt-2 text-[clamp(1.82rem,7.8vw,3rem)] leading-[1.06] tracking-tight text-slate-950 font-bold">
                                Chi phí trọn gói bao gồm
                            </h2>
                            <p className="mt-3 max-w-xl text-[14px] leading-6 text-slate-600">
                                Mọi công tác chuẩn bị được hoàn tất trước khi bạn bắt đầu kỳ camp.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {inclusions.map((item, i) => (
                        <div key={i} className="group flex h-full min-h-[180px] flex-col rounded-[20px] border border-white/40 bg-white/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_16px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/80 hover:shadow-[0_16px_48px_rgba(15,23,42,0.08)] md:min-h-[196px] md:p-6">
                            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#eef2ff] text-[#2C4ACE] transition-colors duration-300 group-hover:bg-[#2C4ACE] group-hover:text-white">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <h3 className="mt-3 min-h-[3.2rem] max-w-[18ch] text-[19px] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 md:mt-4 md:text-[21px]">
                                {item.title}
                            </h3>
                            <p className="mt-3 max-w-[34ch] text-[13px] leading-6 text-slate-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
