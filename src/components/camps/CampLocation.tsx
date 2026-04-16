import React from 'react'
import { MapPin, ArrowRight } from 'lucide-react'
import { Container } from '@/components/home/Shared'

interface CampLocationProps {
  vTriVaBND?: Array<{
    title?: string;
    description?: string;
    map_camps?: string;
  }>;
  nearPointCamp?: {
    title?: string;
    description?: string;
    info_near_point?: Array<{
      name?: string;
      distance?: string;
    }>;
  };
  checkLocCamps?: any[];
}

const getEmbedUrl = (value?: string) => {
  if (!value) return '';
  if (value.startsWith('http') && !value.includes('<iframe')) return value;
  const match = value.match(/src="([^"]+)"/);
  return match ? match[1] : '';
};

export default function CampLocation({ vTriVaBND, nearPointCamp, checkLocCamps }: CampLocationProps) {
  const locationData = vTriVaBND;
  const nearPoints = nearPointCamp;

  return (
    <section id="vi-tri" className="scroll-mt-[148px] md:scroll-mt-[164px] bg-[#f2f5fa] py-10 md:py-16">
      <Container>
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid gap-5 xl:grid-cols-12">
            {/* Map Section */}
            <div className="xl:col-span-8 overflow-hidden rounded-[28px] border border-[#d6e2fb] bg-white shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
              <div className="grid gap-0 border-b border-[#e4ecfb] md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div className="px-5 py-5 md:px-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2C4ACE]">Vị trí và bản đồ</p>
                  <h3 className="mt-2 text-[22px] leading-tight text-slate-950 md:text-[26px] font-bold">
                    {locationData?.title || 'Đang cập nhật'}
                  </h3>
                  <p className="mt-2 max-w-[56ch] text-sm leading-6 text-slate-600">
                    {locationData?.description || ''}
                  </p>
                </div>
                <div className="hidden px-7 md:flex">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-[#2C4ACE]">
                    <MapPin className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="aspect-[1.32/0.84] min-h-[320px] w-full bg-[#edf3ff] md:min-h-[400px]">
                {locationData?.map_camps ? (
                  <iframe
                    title="Bản đồ"
                    src={getEmbedUrl(locationData.map_camps)}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400 text-sm">
                    Chưa có bản đồ
                  </div>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="xl:col-span-4 flex h-full flex-col rounded-[28px] border border-[#d6e2fb] bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.05)] md:p-8">
              <div className="border-b border-[#e8eefb] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2C4ACE]">Điểm gần đó</p>
                <h3 className="mt-3 text-[20px] leading-[1.3] text-slate-950 font-bold">
                  {nearPoints?.title || 'Di chuyển và định vị nhanh trước khi vào camp.'}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {nearPoints?.description || ''}
                </p>
              </div>
              <div className="mt-6 space-y-3">
                {nearPoints?.info_near_point?.map((point, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 rounded-[20px] border border-[#e2eafb] bg-[#f8fbff] px-4 py-4">
                    <span className="text-sm font-bold text-slate-900">{point.name}</span>
                    <span className="rounded-full border border-[#d9e4fb] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{point.distance}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-8">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationData?.title || '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))',
                    boxShadow: 'rgba(44, 74, 206, 0.22) 0px 18px 40px'
                  }}
                >
                  Mở Google Maps
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}