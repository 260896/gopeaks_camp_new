import React from 'react';
import { Container } from '@/components/home/Shared';

export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            <div className="h-[60vh] bg-slate-100 animate-pulse" />
            <Container className="py-12 md:py-24">
                <div className="grid gap-12 lg:grid-cols-[1fr,380px]">
                    <div className="space-y-8">
                        <div className="h-12 bg-slate-100 rounded-2xl w-3/4 animate-pulse" />
                        <div className="space-y-4">
                            <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse" />
                            <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse" />
                            <div className="h-4 bg-slate-100 rounded-full w-2/3 animate-pulse" />
                        </div>
                    </div>
                    <div className="h-96 bg-slate-50 rounded-[32px] animate-pulse" />
                </div>
            </Container>
        </div>
    );
}
