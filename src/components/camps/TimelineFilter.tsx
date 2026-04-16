'use client';

import React from 'react';

const months = [
    { id: 1, label: 'Tháng 1' },
    { id: 2, label: 'Tháng 2' },
    { id: 3, label: 'Tháng 3' },
    { id: 4, label: 'Tháng 4' },
    { id: 5, label: 'Tháng 5' },
    { id: 6, label: 'Tháng 6' },
    { id: 7, label: 'Tháng 7' },
    { id: 8, label: 'Tháng 8' },
    { id: 9, label: 'Tháng 9' },
    { id: 10, label: 'Tháng 10' },
    { id: 11, label: 'Tháng 11' },
    { id: 12, label: 'Tháng 12' },
];

export default function TimelineFilter() {
    const [activeMonth, setActiveMonth] = React.useState(new Date().getMonth() + 1);

    return (
        <div className="w-full bg-white/50 backdrop-blur-sm border-y border-muted py-6 overflow-x-auto no-scrollbar">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between min-w-[800px]">
                {months.map((month) => (
                    <button
                        key={month.id}
                        onClick={() => setActiveMonth(month.id)}
                        className={`flex flex-col items-center gap-3 transition-all group ${
                            activeMonth === month.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'
                        }`}
                    >
                        <div className={`w-3 h-3 rounded-full transition-all ${
                            activeMonth === month.id ? 'bg-accent scale-125' : 'bg-primary group-hover:bg-accent'
                        }`} />
                        <span className={`text-sm font-bold uppercase tracking-tighter ${
                            activeMonth === month.id ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                            T{month.id}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
