import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import KnowledgeCard from "@/components/KnowledgeCard";
import { siteConfig } from "@/content/site";
import { bulletins } from "@/content/knowledge";

export const metadata: Metadata = {
    title: "Bulletins & Updates",
    description: "Latest tax updates, budget highlights, GST changes, and compliance alerts.",
    alternates: { canonical: `${siteConfig.url}/knowledge/bulletins` },
};

export default function BulletinsPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Bulletins" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Bulletins & Updates</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-neutral-600">Stay informed with the latest tax, GST, and regulatory updates.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {bulletins.map((b) => (
                        <KnowledgeCard key={b.slug} title={b.title} description={b.description} href={`/knowledge/bulletins/${b.slug}`} category={b.category} date={b.date} />
                    ))}
                </div>
            </section>
        </>
    );
}
