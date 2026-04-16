'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

import logoLight from '@/imports/Gopeaks_Logo_Dark.svg';
import logoDark from '@/imports/Gopeaks_Logo_Light.svg';

const navItems = [
    { label: 'Camps', href: '/camps' },
    { label: 'Huấn luyện viên', href: '/coaches' },
    { label: 'Câu chuyện', href: '/stories' },
    { label: 'FAQ', href: '/faq' },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isHome = pathname === '/';
    const isTransparent = isHome && !scrolled && !isMobileMenuOpen;

    const navSurface = useMemo(() => {
        if (isTransparent) {
            return {
                background: 'transparent',
                backdropFilter: 'none',
                borderBottom: 'none',
            };
        }

        return {
            background: 'rgba(255, 255, 255, 0.84)',
            backdropFilter: 'blur(18px) saturate(180%)',
            borderBottom: '1px solid rgba(148, 163, 184, 0.18)',
        };
    }, [isTransparent]);

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <div ref={navRef} className="fixed inset-x-0 top-0 z-[100]">
            <nav className="transition-all duration-500" style={navSurface}>
                <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 grid h-[64px] grid-cols-[1fr_auto] items-center gap-3 md:h-[72px] lg:grid-cols-[auto_1fr_auto] lg:gap-6">
                    {/* Logo & Ecosystem */}
                    <div className="flex min-w-0 items-center gap-2">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={isTransparent ? logoLight : logoDark}
                                alt="Gopeaks"
                                className="h-11 w-auto md:h-14" priority loading="eager"
                            />
                        </Link>
                        <div className="relative hidden sm:block">
                            <button
                                type="button"
                                className="flex items-center gap-1 rounded-full border px-3 py-1.5 transition-shadow duration-300"
                                style={{
                                    borderColor: isTransparent ? 'rgba(255,255,255,0.2)' : 'rgba(44, 74, 206, 0.12)',
                                    background: isTransparent ? 'rgba(255,255,255,0.05)' : 'rgba(44, 74, 206, 0.043)'
                                }}
                            >
                                <span
                                    className="text-[10px] font-bold uppercase tracking-[0.14em]"
                                    style={{ color: isTransparent ? 'white' : 'rgb(44, 74, 206)' }}
                                >
                                    Training Camp
                                </span>
                                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isTransparent ? 'text-white/60' : 'text-slate-400'}`} />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden items-center justify-center gap-1 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300"
                                style={{
                                    color: isActive(item.href) ? 'rgb(44, 74, 206)' : (isTransparent ? 'rgba(255,255,255,0.8)' : 'rgba(30, 41, 59, 0.72)'),
                                    background: isActive(item.href) ? (isTransparent ? 'rgba(255,255,255,0.1)' : 'rgba(44, 74, 206, 0.05)') : 'transparent'
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden items-center justify-end gap-3 lg:flex">
                        <Link
                            href="/lien-he"
                            className="rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300"
                            style={{ color: isTransparent ? 'white' : 'rgba(30, 41, 59, 0.72)' }}
                        >
                            Liên hệ
                        </Link>
                        <Link
                            href="/apply"
                            className="inline-flex items-center rounded-full px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                            style={{
                                background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))',
                                boxShadow: 'rgba(44, 74, 206, 0.18) 0px 12px 28px'
                            }}
                        >
                            Nhận tư vấn
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full border lg:hidden md:h-11 md:w-11"
                        style={{
                            borderColor: isTransparent ? 'rgba(255,255,255,0.2)' : 'rgba(148, 163, 184, 0.22)',
                            background: isTransparent ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.92)',
                            color: isTransparent ? 'white' : 'rgb(22, 46, 151)'
                        }}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`overflow-hidden border-b border-slate-200 bg-white backdrop-blur-xl transition-all duration-300 lg:hidden ${isMobileMenuOpen ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-5 pt-2">
                    <div className="space-y-1.5">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block rounded-[20px] px-4 py-4 text-[15px] transition-all duration-200 ${isActive(item.href) ? 'bg-primary/5 font-bold text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-5 grid gap-3">
                        <Link
                            href="/apply"
                            className="inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold text-white"
                            style={{
                                background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))',
                                boxShadow: 'rgba(44, 74, 206, 0.18) 0px 12px 28px'
                            }}
                        >
                            Nhận tư vấn
                        </Link>
                        <Link className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700" href="/lien-he">
                            Liên hệ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
