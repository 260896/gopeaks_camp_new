import React from 'react';
import { Container } from '@/components/home/Shared';

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Container className="py-12 md:py-24">
                <div className="grid gap-12 lg:grid-cols-[480px,1fr]">
                    <div className="aspect-[3/4] bg-slate-100 rounded-[28px] animate-pulse" />
                    <div className="space-y-8">
                        <div className="h-4 bg-slate-200 rounded-full w-32 animate-pulse" />
                        <div className="h-16 bg-slate-200 rounded-2xl w-3/4 animate-pulse" />
                        <div className="space-y-4">
                            <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse" />
                            <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse" />
                            <div className="h-4 bg-slate-100 rounded-full w-2/3 animate-pulse" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
