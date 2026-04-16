import { getPostBySlug, getRecentPosts } from "@/lib/wordpress";
import { Container } from "@/components/home/Shared";
import ContentRender from "@/components/wp-content/ContentRender";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Quote, ArrowRight } from "lucide-react";

export default async function StoryDetail({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    const recentPosts = await getRecentPosts(3);

    if (!post) {
        notFound();
    }

    const { title, content, featuredImage, acfFields } = post;

    return (
        <main className="min-h-screen bg-white text-slate-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#050b14] pt-28 text-white">
                <div className="absolute inset-0">
                    {featuredImage?.node?.sourceUrl && (
                        <img 
                            src={featuredImage.node.sourceUrl} 
                            alt={title} 
                            className="h-full w-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.22)_0%,rgba(5,10,18,0.44)_36%,rgba(5,10,18,0.92)_100%)]" />
                </div>
                
                <Container className="relative z-10 pb-14 md:pb-16">
                    <Link 
                        href="/stories"
                        className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white/76 backdrop-blur-sm transition-all hover:bg-white/12 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại stories
                    </Link>
                    
                    <div className="mt-10 max-w-4xl">
                        <h1 className="max-w-[20ch] text-[clamp(2.5rem,5.2vw,5.2rem)] leading-[1.02] tracking-tight text-white font-bold" style={{ textWrap: 'balance' }}>
                            {title}
                        </h1>
                        <div 
                            className="mt-5 max-w-2xl text-[16px] leading-7 text-white/64 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                        />
                        
                        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                { value: acfFields?.duration || '3', unit: 'ngày', label: 'Thời lượng' },
                                { value: acfFields?.size || '24', unit: 'VĐV', label: 'Quy mô tối đa' },
                                { value: acfFields?.touchpoints || '4', unit: '', label: 'Touchpoints chính' },
                                { value: acfFields?.vibe || '1', unit: '', label: 'Race vibe rất thật' },
                            ].map((item, i) => (
                                <div key={i} className="rounded-[24px] border border-white/8 bg-white/[0.04] p-5">
                                    <div className="text-[32px] leading-none tracking-tight text-white font-bold">
                                        {item.value}
                                        {item.unit && <span className="ml-1 text-base text-white/44 font-normal">{item.unit}</span>}
                                    </div>
                                    <div className="mt-3 text-sm text-white/48">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Article Content */}
            <section className="bg-white py-12 text-slate-950 md:py-14">
                <Container>
                    <article className="w-full">
                        <div className="max-w-[820px] mx-auto prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#2C4ACE] prose-img:rounded-[32px] prose-img:shadow-2xl">
                             <ContentRender content={content} />
                        </div>
                    </article>
                </Container>
            </section>

            {/* Side Details Section */}
            <section className="bg-[#f2f5fa] py-12 text-slate-950 md:py-14">
                <Container>
                    <div className="w-full">
                        <div className="mb-6 md:mb-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-[780px]">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Bên lề chuyến đi</p>
                                    <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                                        Những chi tiết nhỏ nhưng thường là thứ ở lại lâu nhất.
                                    </h2>
                                    <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-slate-600">
                                        Không chỉ có buổi tập. Cả bữa ăn, chỗ nghỉ và những khoảng chậm giữa lịch trình cũng làm nên cảm giác của chuyến đi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                { id: '01', title: 'BBQ tối thứ Bảy', desc: 'Một bữa ăn cộng đồng đủ vui để kết nối cả nhóm trước race day.' },
                                { id: '02', title: 'Bữa sáng nhẹ trước thi', desc: 'Gọn, dễ tiêu và đúng tinh thần chuẩn bị cho buổi mô phỏng.' },
                                { id: '03', title: 'Tiếp nước trong race', desc: 'Support không phô trương nhưng đủ để athlete yên tâm.' },
                            ].map((item, i) => (
                                <div key={i} className="group rounded-[20px] border border-slate-200/60 bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{item.id}</div>
                                    <h3 className="mt-4 text-[24px] leading-[1.08] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Reflections Section */}
            <section className="bg-white py-12 text-slate-950 md:py-14">
                <Container>
                    <div className="w-full">
                        <div className="mb-6 md:mb-8">
                            <div className="max-w-[780px]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Athlete reflections</p>
                                <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                                    Cảm nhận từ người đã trực tiếp tham gia.
                                </h2>
                                <p className="mt-4 max-w-[44rem] text-[14px] leading-7 text-slate-600">
                                    Ngắn gọn, đúng bối cảnh và không cần nói quá.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 md:auto-rows-fr">
                            {[
                                { quote: 'Điều mình thích nhất là mọi thứ rất gọn, không rối và đủ thật để cảm nhận race day.', author: 'Lê Thành Tùng', role: 'Half-distance athlete' },
                                { quote: 'Open water practice và phần transition giúp mình tự tin hơn rất nhiều so với tự tập một mình.', author: 'Nguyễn Khánh Linh', role: 'First-time triathlete' },
                            ].map((item, i) => (
                                <div key={i} className="group flex h-full flex-col rounded-[20px] border border-slate-200/60 bg-[#f8faff] p-6 transition-all duration-400 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                                    <Quote className="h-5 w-5 text-[#2C4ACE]" />
                                    <p className="mt-4 text-sm leading-8 text-slate-600 italic">"{item.quote}"</p>
                                    <div className="mt-auto pt-5 text-sm font-semibold text-slate-950">{item.author}</div>
                                    <div className="mt-1 text-sm text-slate-500">{item.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Related Stories */}
            <section className="bg-[#eef4ff] py-12 text-slate-950 md:py-14">
                <Container>
                    <div className="w-full">
                        <div className="mb-6 md:mb-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-[780px]">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Bài liên quan</p>
                                    <h2 className="mt-3 text-[clamp(1.72rem,3.5vw,2.95rem)] leading-[1.1] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                                        Đọc thêm một vài chuyến đi khác.
                                    </h2>
                                </div>
                                <Link 
                                    href="/stories"
                                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3 text-slate-700 hover:text-[#2C4ACE]"
                                >
                                    Xem tất cả stories
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                        
                        <div className="grid gap-5 md:grid-cols-2">
                            {recentPosts?.filter(p => p.slug !== params.slug).slice(0, 2).map((story, i) => (
                                <Link 
                                    key={story.slug}
                                    href={`/stories/${story.slug}`}
                                    className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
                                >
                                    <div className="relative aspect-[1.15/1] overflow-hidden">
                                        <img 
                                            src={story.featuredImage?.node?.sourceUrl} 
                                            alt={story.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                                        />
                                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.08),rgba(5,10,18,0.56)_100%)]" />
                                        <div className="absolute left-5 top-5">
                                            <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm border-white/22 bg-white/10 text-white/76">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#59E7F3]"></span>
                                                Story
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-[30px] leading-[1.04] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>{story.title}</h3>
                                        <div 
                                            className="mt-4 text-sm leading-7 text-slate-600 line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: story.excerpt || '' }}
                                        />
                                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2C4ACE] transition-all duration-300 group-hover:gap-3">
                                            Đọc tiếp
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Bottom CTA */}
            <section className="bg-white py-12 text-slate-950 md:py-14">
                <Container>
                    <div className="border-t border-slate-200 pt-8 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Đến lượt bạn</p>
                        <h3 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-[1.02] tracking-tight text-slate-950 font-bold" style={{ textWrap: 'balance' }}>
                            Câu chuyện tiếp theo hoàn toàn có thể là chuyến đi của bạn.
                        </h3>
                        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link 
                                href="/camps" 
                                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 text-white"
                                style={{ 
                                    background: 'linear-gradient(135deg, rgb(91, 116, 214) 0%, rgb(44, 74, 206) 58%, rgb(22, 46, 151) 100%)', 
                                    boxShadow: 'rgba(44, 74, 206, 0.22) 0px 10px 24px' 
                                }}
                            >
                                Xem camp sắp mở
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link 
                                href="/apply"
                                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                            >
                                Đăng ký tư vấn
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
