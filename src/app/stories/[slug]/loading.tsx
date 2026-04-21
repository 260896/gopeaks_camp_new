import React from 'react';
import { Container } from '@/components/home/Shared';

export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            <div className="h-[70vh] bg-slate-900 animate-pulse" />
            <Container className="py-12 md:py-24">
                <div className="mx-auto max-w-4xl space-y-8">
                    <div className="h-8 bg-slate-100 rounded-full w-48 animate-pulse" />
                    <div className="h-12 bg-slate-100 rounded-2xl w-3/4 animate-pulse" />
                    <div className="space-y-4">
                        <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse" />
                        <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse" />
                        <div className="h-4 bg-slate-100 rounded-full w-2/3 animate-pulse" />
                    </div>
                </div>
            </Container>
        </div>
    );
}
