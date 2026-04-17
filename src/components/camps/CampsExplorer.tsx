'use client'

import React, { useState, useMemo } from 'react'
import { Container } from '@/components/home/Shared'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import CampsTimeline from './CampsTimeline'
import CampsListWrapper from './CampsListWrapper'
import CampCardHorizontal from './CampCardHorizontal'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface CampsExplorerProps {
    camps: any[];
}

const MONTHS = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

export default function CampsExplorer({ camps }: CampsExplorerProps) {
    const [mounted, setMounted] = useState(false);
    const [view, setView] = useState('all');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 3, 1)); // Default to April 2026 for consistent SSR

    React.useEffect(() => {
        setMounted(true);
        setSelectedDate(new Date()); // Update to real current date on client
    }, []);

    const currentMonthIndex = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

    const nextMonth = () => {
        const next = new Date(selectedDate);
        next.setMonth(selectedDate.getMonth() + 1);
        setSelectedDate(next);
    };

    const prevMonth = () => {
        const prev = new Date(selectedDate);
        prev.setMonth(selectedDate.getMonth() - 1);
        setSelectedDate(prev);
    };

    const handleMonthSelect = (val: string) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(parseInt(val));
        setSelectedDate(newDate);
    };

    const monthCamps = useMemo(() => {
        return camps.filter(camp => {
            if (!camp.startTimestamp) return false;
            const campDate = new Date(camp.startTimestamp);
            return campDate.getMonth() === currentMonthIndex && 
                   campDate.getFullYear() === currentYear;
        });
    }, [camps, currentMonthIndex, currentYear]);

    if (!mounted) return <div className="min-h-[600px] bg-[#f8fbff]" />;

    return (
        <div className="w-full">
            <div className="bg-[#f8fbff] border-b border-slate-100 py-6">
                <Container>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <Tabs defaultValue="all" value={view} onValueChange={setView} className="w-full max-w-[400px]">
                            <TabsList className="grid w-full grid-cols-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm h-12">
                                <TabsTrigger 
                                    value="month" 
                                    className="rounded-full data-[state=active]:bg-[#2C4ACE] data-[state=active]:text-white transition-all font-semibold"
                                >
                                    Theo tháng
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="all" 
                                    className="rounded-full data-[state=active]:bg-[#2C4ACE] data-[state=active]:text-white transition-all font-semibold"
                                >
                                    Tất cả
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        {view === 'month' && (
                            <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="flex items-center gap-8">
                                    <button 
                                        onClick={prevMonth}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all hover:bg-slate-50 hover:text-[#2C4ACE]"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    
                                    <div className="text-center min-w-[120px]">
                                        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
                                            {MONTHS[currentMonthIndex]}
                                        </h2>
                                        <p className="text-[12px] font-bold text-[#2C4ACE] tracking-[0.2em]">{currentYear}</p>
                                    </div>

                                    <button 
                                        onClick={nextMonth}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all hover:bg-slate-50 hover:text-[#2C4ACE]"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>

                                <Select value={currentMonthIndex.toString()} onValueChange={handleMonthSelect}>
                                    <SelectTrigger className="w-[180px] rounded-full border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
                                        <SelectValue placeholder="Chọn tháng" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-slate-200">
                                        {MONTHS.map((month, i) => (
                                            <SelectItem key={i} value={i.toString()} className="rounded-lg">
                                                {month}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                </Container>
            </div>

            {view === 'all' ? (
                <>
                    <CampsTimeline />
                    <CampsListWrapper camps={camps} />
                </>
            ) : (
                <section className="bg-white py-12 min-h-[400px]">
                    <Container>
                        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                            {monthCamps.length > 0 ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                                        <div className="bg-[#eef3ff] p-2 rounded-lg text-[#2C4ACE]">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            {monthCamps.length} camp diễn ra trong {MONTHS[currentMonthIndex]}
                                        </h3>
                                    </div>
                                    <div className="space-y-5">
                                        {monthCamps.map((camp, i) => (
                                            <CampCardHorizontal 
                                                key={camp.slug} 
                                                camp={camp} 
                                                isFeatured={i === 0} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                        <Calendar className="h-8 w-8 text-slate-200" />
                                    </div>
                                    <p className="text-slate-500 font-medium tracking-tight">Không có kỳ camp nào được lên lịch trong tháng này.</p>
                                    <button 
                                        onClick={() => setView('all')}
                                        className="mt-4 text-sm font-bold text-[#2C4ACE] hover:underline"
                                    >
                                        Xem tất cả lịch trình
                                    </button>
                                </div>
                            )}
                        </div>
                    </Container>
                </section>
            )}
        </div>
    );
}
