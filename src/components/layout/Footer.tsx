import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import logoDark from '@/imports/Gopeaks_Logo_Light.svg';

export default function Footer() {
    return (
        <footer className="overflow-hidden bg-white text-slate-950">
            <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid gap-10 md:grid-cols-12 md:gap-12">
                    {/* Brand Section */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3">
                            <Image src={logoDark} alt="Gopeaks" className="h-16 w-auto" priority loading="eager" />
                            <div>
                                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">Training Camp</div>
                                <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#2C4ACE]">Race-cation Việt Nam</div>
                            </div>
                        </div>
                        <p className="mt-6 max-w-sm text-[14px] leading-7 text-slate-600">
                            Chúng tôi xây dựng các kỳ tập huấn tập trung vào hiệu quả thực tế, hỗ trợ vận động viên tối ưu từ khâu nghỉ ngơi đến kiến thức thể thao và chiến thuật thi đấu.
                        </p>
                        <div className="mt-6 space-y-3 text-[14px] text-slate-600">
                            <a href="mailto:hello@gopeaks.coach" className="flex items-center gap-2 transition-colors hover:text-[#162E97]">
                                <Mail className="h-4 w-4 text-[#2C4ACE]" />
                                hello@gopeaks.coach
                            </a>
                            <a href="tel:0866036099" className="flex items-center gap-2 transition-colors hover:text-[#162E97]">
                                <Phone className="h-4 w-4 text-[#2C4ACE]" />
                                0866 036 099
                            </a>
                            <a href="https://zalo.me/1039145260048202954" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-[#162E97]">
                                <MessageCircle className="h-4 w-4 text-[#2C4ACE]" />
                                Gopeaks Mini App
                            </a>
                            <div className="flex items-center gap-3 pt-1">
                                <a href="https://www.facebook.com/gopeaks.vn" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#eef2ff] text-[#1877F2] transition-all hover:-translate-y-0.5 hover:bg-[#1877F2] hover:text-white">
                                    <svg viewBox="-337 273 123.5 256" aria-hidden="true" className="h-4 w-4"><path d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z" fill="currentColor"></path></svg>
                                </a>
                                <a href="https://www.instagram.com/gopeaks.vn/" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#fff1f7] text-[#DD2A7B] transition-all hover:-translate-y-0.5 hover:bg-[#DD2A7B] hover:text-white">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4"><rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></rect><circle cx="12" cy="12" r="3.65" fill="none" stroke="currentColor" strokeWidth="1.8"></circle><circle cx="17.1" cy="6.95" r="1.1" fill="currentColor"></circle></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 text-primary font-bold">
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Khám phá</h4>
                        <ul className="mt-5 space-y-3">
                            <li><Link className="text-[14px] text-slate-600 transition-all hover:translate-x-0.5 hover:text-[#162E97]" href="/camps">Camps</Link></li>
                            <li><Link className="text-[14px] text-slate-600 transition-all hover:translate-x-0.5 hover:text-[#162E97]" href="/coaches">Huấn luyện viên</Link></li>
                            <li><Link className="text-[14px] text-slate-600 transition-all hover:translate-x-0.5 hover:text-[#162E97]" href="/stories">Câu chuyện</Link></li>
                            <li><Link className="text-[14px] text-slate-600 transition-all hover:translate-x-0.5 hover:text-[#162E97]" href="/apply">Đăng ký camp</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Hỗ trợ</h4>
                        <ul className="mt-5 space-y-3">
                            <li><Link className="text-[14px] text-slate-600 transition-all hover:translate-x-0.5 hover:text-[#162E97]" href="/faq">FAQ</Link></li>
                            <li><Link className="text-[14px] text-slate-600 transition-all hover:translate-x-0.5 hover:text-[#162E97]" href="/lien-he">Liên hệ</Link></li>
                        </ul>
                    </div>

                    {/* Showroom */}
                    <div className="md:col-span-3">
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Showroom</h4>
                        <div className="mt-5 divide-y divide-slate-200 text-[14px] text-slate-600">
                            <div className="pb-4">
                                <a href="#" target="_blank" rel="noopener noreferrer" className="block rounded-2xl transition-colors hover:text-[#162E97]">
                                    <div className="flex items-center gap-2 font-semibold text-slate-950">
                                        <MapPin className="h-4 w-4 text-[#2C4ACE]" />
                                        Gopeaks Phú Mỹ Hưng
                                    </div>
                                    <p className="mt-2 leading-7 text-slate-600">1048 Nguyễn Văn Linh, Q7, TP.HCM.</p>
                                </a>
                            </div>
                            <div className="pt-4">
                                <a href="#" target="_blank" rel="noopener noreferrer" className="block rounded-2xl transition-colors hover:text-[#162E97]">
                                    <div className="flex items-center gap-2 font-semibold text-slate-950">
                                        <MapPin className="h-4 w-4 text-[#2C4ACE]" />
                                        Gopeaks Thủ Thiêm
                                    </div>
                                    <p className="mt-2 leading-7 text-slate-600">Tầng 1, Lake View 2, 21 Tố Hữu, Thủ Thiêm, Quận 2, TP.HCM.</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-500">
                        <span>© 2026 GoPeaks. Đã đăng ký bản quyền.</span>
                    </div>
                    <div className="flex flex-wrap gap-5 text-[12px] text-slate-500">
                        <Link className="transition-colors hover:text-[#162E97]" href="/lien-he">Liên hệ</Link>
                    </div>
                </div>
            </div>

            {/* Float Button */}
            <button
                type="button"
                className="fixed bottom-4 right-4 z-[80] inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 md:bottom-6 md:right-6 md:px-5"
                style={{ background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', boxShadow: 'rgba(44, 74, 206, 0.24) 0px 18px 40px' }}
            >
                <MessageCircle className="h-4 w-4" />
                Hỗ trợ nhanh
            </button>
        </footer>
    )
}
