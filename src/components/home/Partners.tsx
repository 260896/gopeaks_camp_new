import React from 'react'

import ironmanVietnam from '@/imports/ironman-vietnam.png'
import ironmanDanang from '@/imports/ironman-danang.png'
import ironmanPhuquoc from '@/imports/ironman-phuquoc.png'
import logoSev from '@/imports/logo-sev-1.png'
import festivalLogo from '@/imports/event-vietnam-festrival-2025-organizer-logo_ptvhld.webp'
import trifactorLogo from '@/imports/Gopeaks_Logo-22_gqq9xg.webp'

import team24 from '@/imports/Gopeaks_Logo-24_kejnuh.webp'
import team25 from '@/imports/Gopeaks_Logo-25_fducjk.webp'
import team28 from '@/imports/Gopeaks_Logo-28_dowzys.webp'
import team26 from '@/imports/Gopeaks_Logo-26_h5xjvc.webp'
import team31 from '@/imports/Gopeaks_Logo-31_eh5duq.webp'
import team29 from '@/imports/Gopeaks_Logo-29_anjiuv.webp'
import team30 from '@/imports/Gopeaks_Logo-30_mfkpts.webp'
import anApplied from '@/imports/AN_Applied_Logo_June_2025_zy35jk.webp' 

const mainPartners = [
    { name: 'Ironman Vietnam', src: ironmanVietnam, scale: 0.6 },
    { name: 'Ironman Da Nang', src: ironmanDanang, scale: 0.6 },
    { name: 'Ironman Phu Quoc', src: ironmanPhuquoc, scale: 0.8 },
    { name: 'SunriseEvents', src: logoSev, scale: 0.82 },
    { name: 'FesTRIval', src: festivalLogo, scale: 0.86 },
    { name: 'TriFactor', src: trifactorLogo, scale: 1 },
]

const teamPartners = [
    { src: team24 },
    { src: team25 },
    { src: team28 },
    { src: team26 },
    { src: team31 },
    { src: team29, scale: 1.16 },
    { src: team30, scale: 1.16 },
    { src: anApplied },
]

export default function Partners() {
    return (
        <section className="bg-white py-10 text-slate-950 md:py-14">
            <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
                <div className="max-w-[760px]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-400">Sponsors</p>
                    <h2 className="mt-3 max-w-[11ch] text-[clamp(2rem,8vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-slate-950">
                        Đồng hành cùng Gopeaks.
                    </h2>
                </div>

                <div className="mt-10">
                    <div className="border border-slate-200 bg-white">
                        <div className="border-b border-slate-200 px-5 py-4 md:px-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-950">Main partners</p>
                        </div>
                        <div className="grid grid-cols-1 border-b border-slate-200 md:grid-cols-3">
                            {mainPartners.map((p, i) => (
                                <div key={i} className={`border-slate-200 ${i % 3 !== 0 ? 'md:border-l' : ''} ${i >= 3 ? 'border-t' : 'border-t md:border-t-0'}`}>
                                    <div className="relative flex items-center justify-center px-6 min-h-[220px] py-12 md:min-h-[260px]">
                                        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                                            <img 
                                                src={typeof p.src === 'string' ? p.src : (p.src as any).src} 
                                                alt={p.name} 
                                                className="relative h-auto w-full object-contain max-h-[108px] md:max-h-[132px]" 
                                                style={{ transform: `scale(${p.scale || 1})` }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-b border-slate-200 px-5 py-4 md:px-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-950">All team partners</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4">
                            {teamPartners.map((p, i) => (
                                <div key={i} className={`border-slate-200 ${i % 2 !== 0 ? 'border-l' : ''} ${i % 4 !== 0 ? 'md:border-l' : ''} ${i >= 2 ? 'border-t' : ''} ${i >= 4 ? 'md:border-t' : 'md:border-t-0'}`}>
                                    <div className="relative flex items-center justify-center px-6 min-h-[160px] py-8 md:min-h-[176px]">
                                        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                                            <img 
                                                src={typeof p.src === 'string' ? p.src : (p.src as any).src} 
                                                alt="" 
                                                className="relative h-auto w-full object-contain max-h-[58px] md:max-h-[68px]" 
                                                style={{ transform: `scale(${p.scale || 1})` }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-200 ">
                             <div className="flex min-h-[112px] items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 px-4 py-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 text-center">More partners soon</div>
                             <div className="flex min-h-[112px] items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 px-4 py-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 text-center">Brand collabs</div>
                             <div className="flex min-h-[112px] items-center justify-center px-4 py-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 text-center">Community support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
