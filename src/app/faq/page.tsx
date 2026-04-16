'use client';

import React, { useState } from 'react';

const faqData = [
    {
        question: "Cần chuẩn bị gì trước khi tham gia Camp?",
        answer: "Bạn cần chuẩn bị trang phục chạy bộ phù hợp, giày chuyên dụng (trail hoặc road tùy loại camp), bình nước cá nhân, và các vật dụng vệ sinh cá nhân. Danh sách chi tiết (Gear list) sẽ được chúng tôi gửi qua email 1 tuần trước khi camp bắt đầu."
    },
    {
        question: "Tôi là người mới bắt đầu có tham gia được không?",
        answer: "Hoàn toàn được! GoPeaks có các chương trình được thiết kế riêng cho từng cấp độ. Trong mỗi kỳ camp, chúng tôi đều chia thành các nhóm nhỏ (Sub-groups) có pacer và HLV đi cùng để đảm bảo mọi người đều hoàn thành bài tập một cách an toàn."
    },
    {
        question: "Chính sách hoàn hủy và dời lịch như thế nào?",
        answer: "Chúng tôi hỗ trợ bảo lưu 100% học phí hoặc hoàn phí 70% nếu bạn thông báo trước 15 ngày. Các trường hợp báo muộn hơn sẽ được xem xét tùy theo tình hình thực tế về chi phí đã đặt cọc cho bên dịch vụ lưu trú."
    },
    {
        question: "Chi phí Camp đã bao gồm những gì?",
        answer: "Thông thường, chi phí đã bao gồm: Xe đưa đón, khách sạn/homestay, các bữa ăn chính, bảo hiểm du lịch, đội ngũ HLV & Pacer, nước uống và dinh dưỡng bổ trợ trong lúc tập luyện."
    },
    {
        question: "Tôi có được tư vấn giáo án sau khi kết thúc Camp không?",
        answer: "Có, sau mỗi kỳ Camp, các HLV sẽ có buổi nhận xét và định hướng giáo án cho bạn dựa trên kết quả tập luyện thực tế trong những ngày diễn ra Camp."
    }
];

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div 
            className={`group transition-all duration-300 rounded-[32px] overflow-hidden mb-4 ${
                isOpen ? 'bg-white shadow-xl shadow-primary/5 border-2 border-primary/10' : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
            }`}
        >
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
            >
                <span className={`text-xl font-bold transition-colors ${isOpen ? 'text-primary' : 'text-primary/70'}`}>
                    {question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isOpen ? 'bg-primary text-white rotate-180' : 'bg-white text-primary group-hover:bg-primary group-hover:text-white'
                }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-8 pb-8 text-lg text-muted-foreground leading-relaxed">
                    <div className="pt-4 border-t border-muted">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-48 pb-32 bg-primary overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop" 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary" />
                </div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
                        GIẢI ĐÁP CÁC <br/>
                        <span className="text-accent italic">THẮC MẮC THƯỜNG GẶP</span>
                    </h1>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="mb-16 text-center">
                        <span className="text-accent font-black uppercase tracking-[0.2em] mb-4 block">FAQ</span>
                        <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">
                            Thông tin trực diện và đầy đủ.
                        </h2>
                    </div>

                    <div className="space-y-2">
                        {faqData.map((item, index) => (
                            <AccordionItem 
                                key={index} 
                                question={item.question} 
                                answer={item.answer} 
                            />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-20 p-12 bg-muted/30 rounded-[48px] text-center border-2 border-dashed border-muted">
                        <h3 className="text-2xl font-black text-primary mb-4">Cần hỏi theo trường hợp riêng?</h3>
                        <p className="text-muted-foreground mb-8">
                            Đừng ngần ngại liên hệ trực tiếp với chúng tôi qua Zalo hoặc Hotline để được hỗ trợ 24/7.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="btn-primary px-10 py-4">Nhắn tin Zalo</button>
                            <button className="bg-white border-2 border-primary/10 text-primary font-bold px-10 py-4 rounded-full hover:bg-primary hover:text-white transition-all">
                                Xem Camp đang mở
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
