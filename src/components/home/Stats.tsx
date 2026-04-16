import React from 'react'
import { Container } from './Shared'

const stats = [
    { label: 'Năm Kinh Nghiệm', value: '10+' },
    { label: 'Vận Động Viên', value: '500+' },
    { label: 'Dự Án Camp', value: '120+' },
    { label: 'Huy Chương', value: '2k+' },
]

export default function Stats() {
    return (
        <section className="py-20 bg-primary text-white overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
            
            <Container className="relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group">
                            <div className="text-5xl md:text-6xl font-black text-accent mb-2 transition-transform group-hover:scale-110 duration-300">
                                {stat.value}
                            </div>
                            <div className="text-white/60 font-medium uppercase tracking-widest text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
