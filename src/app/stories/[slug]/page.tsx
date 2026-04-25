import { getPostBySlug, getRecentPosts, getRankMathSEO } from "@/lib/wordpress";
import { replaceWPDomain } from "@/lib/seo";
import { Container } from "@/components/home/Shared";
import ContentRender from "@/components/wp-content/ContentRender";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Quote, ArrowRight } from "lucide-react";
import { Metadata } from 'next';
import Image from 'next/image';

const FRONT_DOMAIN = 'https://gopeaks.camp';
const WP_URL = 'https://sub.gopeaks.coach';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const [post, seo] = await Promise.all([
        getPostBySlug(slug),
        getRankMathSEO(`${WP_URL}/${slug}/`),
    ]);
    if (!post) return { title: 'Story Not Found' };

    const imageUrl = post.featuredImage?.node?.sourceUrl || null;

    const title = seo?.title || post.title;
    const description = seo?.description || post.excerpt?.replace(/<[^>]*>/g, '') || '';
    const canonical = seo?.canonical || `${FRONT_DOMAIN}/stories/${slug}`;
    const ogImage = seo?.ogImage || imageUrl || `${FRONT_DOMAIN}/favicon.png`;

    return {
        title,
        description,
        alternates: { canonical },
        robots: seo?.robots || 'index, follow',
        openGraph: {
            title: seo?.ogTitle || title,
            description: seo?.ogDescription || description,
            images: ogImage ? [{ url: ogImage }] : [],
            type: 'article',
            url: canonical,
        },
        twitter: {
            card: 'summary_large_image',
            title: seo?.twitterTitle || title,
            description: seo?.twitterDescription || description,
            images: seo?.twitterImage ? [seo.twitterImage] : ogImage ? [ogImage] : [],
        },
    };
}

export default async function StoryDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post, recentPosts, seo] = await Promise.all([
        getPostBySlug(slug),
        getRecentPosts(3),
        getRankMathSEO(`${WP_URL}/${slug}/`),
    ]);

    if (!post) {
        notFound();
    }

    const { title, content, featuredImage, acfFields } = post;
    
    // Schema JSON-LD from RankMath (preferred) or ACF fallback
    const jsonLd = seo?.schema || (acfFields?.rank_math_json_ld ? replaceWPDomain(typeof acfFields.rank_math_json_ld === 'string' ? acfFields.rank_math_json_ld : JSON.stringify(acfFields.rank_math_json_ld)) : null);

    const stats = [
        { value: acfFields?.duration || '3', unit: 'ngày', label: 'Thời lượng' },
        { value: acfFields?.size || '24', unit: 'VĐV', label: 'Quy mô tối đa' },
        { value: acfFields?.touchpoints || '4', unit: '', label: 'Touchpoints chính' },
        { value: acfFields?.vibe || '1', unit: '', label: 'Race vibe rất thật' },
    ];

    const sideDetails = acfFields?.side_details || [
        { id: '01', title: 'BBQ tối thứ Bảy', desc: 'Một bữa ăn cộng đồng đủ vui để kết nối cả nhóm trước race day.' },
        { id: '02', title: 'Bữa sáng nhẹ trước thi', desc: 'Gọn, dễ tiêu và đúng tinh thần chuẩn bị cho buổi mô phỏng.' },
        { id: '03', title: 'Tiếp nước trong race', desc: 'Support không phô trương nhưng đủ để athlete yên tâm.' },
    ];

    const reflections = acfFields?.reflections || [
        { quote: 'Điều mình thích nhất là mọi thứ rất gọn, không rối và đủ thật để cảm nhận race day.', author: 'Lê Thành Tùng', role: 'Half-distance athlete' },
        { quote: 'Open water practice và phần transition giúp mình tự tin hơn rất nhiều so với tự tập một mình.', author: 'Nguyễn Khánh Linh', role: 'First-time triathlete' },
    ];

    return (
        <main className="min-h-screen bg-white text-slate-950">
            {/* Schema.org JSON-LD Inject */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: jsonLd }}
                />
            )}
            
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#050b14] pt-28 text-white min-h-[70vh] flex flex-col items-center justify-center">
                <div className="absolute inset-0">
                    {featuredImage?.node?.sourceUrl && (
                        <Image 
                            src={featuredImage.node.sourceUrl} 
                            alt={title} 
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.22)_0%,rgba(5,10,18,0.44)_36%,rgba(5,10,18,0.92)_100%)]" />
                </div>
                
                <Container className="relative z-10 pb-14 md:pb-20">
                    <Link 
                        href="/stories"
                        className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white/76 backdrop-blur-sm transition-all hover:bg-white/12 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại stories
                    </Link>
                    
                    <div className="mt-12 max-w-5xl">
                        <h1 className="max-w-[20ch] text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.02] tracking-tighter text-white font-black" style={{ textWrap: 'balance' }}>
                            {title}
                        </h1>
                        <div 
                            className="mt-6 max-w-2xl text-[18px] leading-8 text-white/70 font-medium line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                        />
                        
                        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((item, i) => (
                                <div key={i} className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md">
                                    <div className="text-[36px] leading-none tracking-tight text-white font-black">
                                        {item.value}
                                        {item.unit && <span className="ml-1 text-base text-white/40 font-normal">{item.unit}</span>}
                                    </div>
                                    <div className="mt-4 text-sm font-bold text-white/40 uppercase tracking-widest">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Article Content */}
            <section className="bg-white py-20 text-slate-950 md:py-32">
                <Container>
                    <article className="w-full">
                        <div className="max-w-[840px] mx-auto prose prose-slate prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-a:text-[#2C4ACE] prose-img:rounded-[40px] prose-img:shadow-2xl prose-p:leading-9">
                             <ContentRender content={content} />
                        </div>
                    </article>
                </Container>
            </section>

            {/* Side Details Section */}
            <section className="bg-[#f8fafc] py-20 text-slate-950 md:py-32 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -mr-64 -mt-64" />
                <Container>
                    <div className="w-full relative">
                        <div className="mb-12 md:mb-16">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-[840px]">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#2C4ACE] mb-4">Bên lề chuyến đi</p>
                                    <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-slate-950 font-black" style={{ textWrap: 'balance' }}>
                                        Những chi tiết nhỏ nhưng thường là thứ ở lại lâu nhất.
                                    </h2>
                                    <p className="mt-6 max-w-[48rem] text-lg leading-8 text-slate-600 font-medium">
                                        Không chỉ có buổi tập. Cả bữa ăn, chỗ nghỉ và những khoảng chậm giữa lịch trình cũng làm nên cảm giác của chuyến đi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {sideDetails.map((item: any, i: number) => (
                                <div key={i} className="group rounded-[32px] border border-slate-200/60 bg-white p-8 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
                                    <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#2C4ACE] mb-6">{item.id || `0${i+1}`}</div>
                                    <h3 className="text-[26px] leading-[1.1] tracking-tight text-slate-950 font-black">{item.title}</h3>
                                    <p className="mt-4 text-base leading-7 text-slate-600 font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Reflections Section */}
            <section className="bg-white py-20 text-slate-950 md:py-32">
                <Container>
                    <div className="w-full">
                        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#2C4ACE] mb-4">Athlete reflections</p>
                            <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-slate-950 font-black">
                                Cảm nhận từ người đã trực tiếp tham gia.
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {reflections.map((item: any, i: number) => (
                                <div key={i} className="group flex h-full flex-col rounded-[32px] border border-slate-200/60 bg-[#f8faff] p-10 transition-all duration-400 hover:-translate-y-1 hover:bg-white hover:shadow-[0_30px_60px_rgba(15,23,42,0.1)]">
                                    <Quote className="h-8 w-8 text-[#2C4ACE] opacity-50" />
                                    <p className="mt-6 text-xl leading-9 text-slate-700 font-medium italic">"{item.quote}"</p>
                                    <div className="mt-auto pt-10">
                                        <div className="text-lg font-black text-slate-950">{item.author}</div>
                                        <div className="mt-1 text-sm font-bold text-[#2C4ACE] uppercase tracking-wider">{item.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Related Stories */}
            <section className="bg-[#f0f4f9] py-20 text-slate-950 md:py-32">
                <Container>
                    <div className="w-full">
                        <div className="mb-12 md:mb-16">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-[780px]">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#2C4ACE] mb-4">Bài liên quan</p>
                                    <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-slate-950 font-black">
                                        Đọc thêm một vài chuyến đi khác.
                                    </h2>
                                </div>
                                <Link 
                                    href="/stories"
                                    className="group inline-flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-6 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-slate-900"
                                >
                                    Xem tất cả stories
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                        
                        <div className="grid gap-8 md:grid-cols-2">
                            {recentPosts?.filter(p => p.slug !== slug).slice(0, 2).map((story, i) => (
                                <Link 
                                    key={story.slug}
                                    href={`/stories/${story.slug}`}
                                    className="group flex flex-col lg:flex-row overflow-hidden rounded-[40px] border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(15,23,42,0.12)]"
                                >
                                    <div className="relative aspect-square lg:w-48 shrink-0 overflow-hidden">
                                        <Image 
                                            src={story.featuredImage?.node?.sourceUrl || "https://res.cloudinary.com/dxai5ztql/image/upload/q_auto/f_auto/v1775714724/IMG_0478_vrcofm.jpg"} 
                                            alt={story.title}
                                            fill
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-8 flex flex-col justify-center">
                                        <h3 className="text-2xl font-black text-slate-950 line-clamp-2 leading-tight">{story.title}</h3>
                                        <div className="mt-4 text-sm font-black text-[#2c4ace] flex items-center gap-2">
                                            Đọc tiếp
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Bottom CTA */}
            <section className="bg-white py-20 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />
                <Container>
                    <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#2C4ACE] mb-8">Đến lượt bạn</p>
                        <h3 className="text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.02] tracking-tighter text-slate-950 font-black mb-12">
                            Câu chuyện tiếp theo hoàn toàn có thể là chuyến đi của bạn.
                        </h3>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link 
                                href="/camps" 
                                className="group relative inline-flex items-center justify-center gap-3 rounded-2xl px-10 py-5 text-lg font-black text-white transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                style={{ 
                                    background: 'linear-gradient(135deg, rgb(44, 74, 206), rgb(22, 46, 151))', 
                                    boxShadow: 'rgba(44, 74, 206, 0.3) 0px 20px 40px' 
                                }}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Xem camp đang mở
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                            <Link 
                                href="/apply"
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-10 py-5 text-lg font-bold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300"
                            >
                                Nhận tư vấn lộ trình
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
