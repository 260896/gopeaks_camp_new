import React from 'react'
import { MapPin, ArrowRight } from 'lucide-react'
import { Container } from '@/components/home/Shared'

interface CampLocationProps {
  vTriVaBND?: any;
  nearPointCamp?: any;
  checkLocCamps?: any[];
  slug?: string;
}

const getEmbedUrl = (value?: string) => {
  if (!value) return '';
  if (value.startsWith('http') && !value.includes('<iframe')) return value;
  const match = value.match(/src="([^"]+)"/);
  return match ? match[1] : '';
};

export default function CampLocation({ vTriVaBND, nearPointCamp, checkLocCamps, slug }: CampLocationProps) {
  const locationData = Array.isArray(vTriVaBND) ? vTriVaBND[0] : vTriVaBND;
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
                {nearPoints?.info_near_point?.map((point: any, i: number) => (
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

          {/* Đặt chỗ Section */}
          {checkLocCamps && checkLocCamps.length > 0 && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-75">
              <div className="rounded-[30px] border border-[#d6e2fb] bg-white/80 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#cbd9fb] bg-[#f4f7ff] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2C4ACE]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2C4ACE]"></span>
                  Đặt chỗ cùng team Gopeaks
                </div>
                
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {checkLocCamps[0]?.description_check_loc || 'Gopeaks dùng phần này như một điểm chốt nhanh cho athlete muốn ở gần đồi cát, đi sớm tiện hơn và giữ nhịp nghỉ nhẹ đầu trong suốt cuối tuần.'}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Địa điểm', value: checkLocCamps[0]?.info_check_loc?.[0]?.col_content || 'Bình Thuận' },
                    { label: 'Di chuyển ra khu race', value: checkLocCamps[0]?.info_check_loc?.[1]?.col_content || '15-20 phút' },
                    { label: 'Phù hợp', value: checkLocCamps[0]?.info_check_loc?.[2]?.col_content || 'Cặp đôi / gia đình / nhóm nhỏ' }
                  ].map((item, i) => (
                    <div key={i} className="rounded-[22px] border border-[#e2eafb] bg-[#f8fbff] p-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</div>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  {checkLocCamps[0]?.more_check_loc?.map((room: any, i: number) => {
                    const imageUrl = room.image_holtel?.url || room.image_holtel?.source_url || (typeof room.image_holtel === 'string' ? room.image_holtel : '');
                    const tags = typeof room.tag_holtel === 'string' ? room.tag_holtel.split(',').map((t: string) => t.trim()) : [];

                    return (
                      <div key={i} className="overflow-hidden rounded-[28px] border border-[#dbe6fb] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.04)] transition-all duration-300 hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)]">
                        <div className="grid gap-0 lg:grid-cols-[minmax(280px,0.95fr)_minmax(0,1fr)]">
                          <div className="relative min-h-[260px] overflow-hidden bg-[#eef3ff]">
                            <img 
                              src={imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000'} 
                              alt={room.name_holtel} 
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
                            />
                          </div>
                          <div className="flex flex-col p-5 md:p-7">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                              {room.detail_room || 'Tiêu chuẩn nghỉ ngơi'}
                            </p>
                            <h4 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1] tracking-tight text-slate-950 font-bold">
                              {room.name_holtel}
                            </h4>
                            <p className="mt-4 max-w-[44ch] text-[15px] leading-8 text-slate-600">
                              {room.description_holtel}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2.5">
                              {tags.map((tag: string, i: number) => (
                                <span key={i} className="rounded-full bg-[#f5f1e7] px-3 py-1.5 text-[12px] font-semibold text-slate-600">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="mt-6 border-t border-[#e7edf8] pt-6">
                              <a 
                                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5" 
                                href={`/apply?camp=${slug}&intent=stay`}
                                style={{ 
                                  background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', 
                                  boxShadow: 'rgba(44, 74, 206, 0.18) 0px 18px 40px' 
                                }}
                              >
                                Nhận tư vấn phòng
                                <ArrowRight className="h-4 w-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a 
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5" 
                    href={`/apply?camp=${slug}&intent=stay`}
                    style={{ 
                      background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', 
                      boxShadow: 'rgba(44, 74, 206, 0.22) 0px 18px 40px' 
                    }}
                  >
                    Đặt chỗ lưu trú
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a 
                    className="inline-flex items-center justify-center rounded-full border border-[#d8e3f8] bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:border-[#2C4ACE] hover:text-[#2C4ACE]" 
                    href={`/apply?camp=${slug}`}
                  >
                    Nhận tư vấn camp
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}