import React from 'react'
import { Container } from './Shared'
import Link from 'next/link'

export default function About() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-[4/5] rounded-[40px] overflow-hidden relative z-10">
                            <img 
                                src="https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2085&auto=format&fit=crop" 
                                alt="GoPeaks Community" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative background shapes */}
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/20 rounded-full blur-[80px] z-0" />
                        <div className="absolute top-1/2 -right-10 translate-y-[-50%] w-32 h-64 bg-primary/5 rounded-full z-0" />
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2">
                        <span className="text-accent font-black uppercase tracking-[0.2em] mb-4 block">VỀ CHÚNG TÔI</span>
                        <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-8">
                            Nơi những bước chân <br/> viết nên câu chuyện.
                        </h2>
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                GoPeaks không chỉ là một trung tâm huấn luyện, mà là một cộng đồng dành cho những tâm hồn đam mê xê dịch và khát khao chinh phục những giới hạn của bản thân.
                            </p>
                            <p>
                                Chúng tôi tin rằng mỗi bước chạy trên địa hình, mỗi dải mồ hôi rơi trên đường chạy là một minh chứng cho sự kiên trì và bản lĩnh. GoPeaks đồng hành cùng bạn để biến những mục tiêu xa vời trở thành hiện thực.
                            </p>
                        </div>
                        <div className="mt-12 flex flex-col sm:flex-row gap-6 items-center">
                            <Link href="/about" className="btn-primary px-10 py-4 w-full sm:w-auto text-center">
                                Tìm hiểu thêm
                            </Link>
                            <div className="flex items-center gap-4">
                                <span className="text-primary font-bold">Follow us:</span>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-primary hover:bg-accent hover:text-white transition-all">FB</a>
                                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-primary hover:bg-accent hover:text-white transition-all">IG</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
