import { Container } from "@/components/home/Shared";
import { getCoaches } from "@/lib/wordpress";
import { notFound } from "next/navigation";

export default async function CoachDetailPage({ params }: { params: { id: string } }) {
    const coaches = await getCoaches();
    const coach = coaches?.find((c: any) => c.slug === params.id || c.title?.toLowerCase().replace(/\s+/g, '-') === params.id);

    if (!coach) {
        notFound();
    }

    return (
        <main className="min-h-screen py-32">
            <Container>
                <h1 className="text-4xl font-black mb-8">{coach.title}</h1>
                <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: coach.content }}
                />
            </Container>
        </main>
    );
}
