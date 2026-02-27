import { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { bulletins } from "@/content/knowledge";
import { blogPosts } from "@/content/blog";
import { buildJsonLd, articleSchema } from "@/lib/jsonld";
import { Calendar, User, Clock } from "lucide-react";

const allItems = [...bulletins, ...blogPosts.map((p) => ({ slug: p.slug, title: p.title, description: p.excerpt, content: p.content, date: p.date, category: p.category }))];

export async function generateStaticParams() {
    return allItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const item = allItems.find((i) => i.slug === slug);
    if (!item) return {};
    return { title: item.title, description: item.description, alternates: { canonical: `${siteConfig.url}/knowledge/bulletins/${slug}` } };
}

export default async function BulletinDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = allItems.find((i) => i.slug === slug);
    if (!item) notFound();

    const blog = blogPosts.find((p) => p.slug === slug);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(articleSchema({ title: item.title, description: item.description, author: blog?.author || siteConfig.name, datePublished: item.date || "2025-01-01", url: `${siteConfig.url}/knowledge/bulletins/${slug}` })) }} />
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Bulletins", href: "/knowledge/bulletins" }, { label: item.title }]} />
            <article className="section-padding bg-white">
                <div className="section-container max-w-3xl">
                    {item.category && <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600">{item.category}</span>}
                    <h1 className="mt-3 text-3xl font-bold text-neutral-900 font-heading">{item.title}</h1>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                        {item.date && <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>}
                        {blog && <span className="flex items-center gap-1"><User size={14} /> {blog.author}</span>}
                        {blog && <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime}</span>}
                    </div>
                    <div className="mt-8 text-neutral-700 leading-relaxed space-y-4">
                        {item.content?.split("\n").filter(Boolean).map((para, i) => (
                            <p key={i}>{para}</p>
                        )) || <p>{item.description}</p>}
                    </div>
                </div>
            </article>
        </>
    );
}
