import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoPeaks - Đỉnh Cao Huấn Luyện & Trải Nghiệm Camp",
  description: "Hệ thống huấn luyện thể thao chuyên nghiệp cho runner và trail runner.",
  icons: {
    icon: "/favicon.png",
  },
};

import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <Suspense fallback={<div className="h-[72px] bg-white border-b border-slate-100" />}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}

