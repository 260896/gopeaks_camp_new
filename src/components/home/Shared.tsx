import React from 'react'

export const Container = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
    </div>
)

export const SectionTitle = ({ 
    title, 
    subtitle, 
    overline,
    centered = false,
    light = false 
}: { 
    title: string, 
    subtitle?: string, 
    overline?: string,
    centered?: boolean,
    light?: boolean
}) => (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${light ? 'text-white' : 'text-foreground'}`}>
        {overline && (
            <span className="text-accent font-black uppercase tracking-[0.2em] mb-4 block text-sm">
                {overline}
            </span>
        )}
        <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">
            {title}
        </h2>

        {subtitle && (
            <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-muted-foreground'}`}>
                {subtitle}
            </p>
        )}
        <div className={`mt-4 h-1.5 w-20 rounded-full bg-accent ${centered ? 'mx-auto' : ''}`}></div>
    </div>
)
