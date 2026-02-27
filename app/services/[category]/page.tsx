import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import { siteConfig } from "@/content/site";
import { serviceCategories } from "@/content/services";

export async function generateStaticParams() {
    return serviceCategories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params;
    const cat = serviceCategories.find((c) => c.slug === category);
    if (!cat) return {};
    return {
        title: cat.title,
        description: cat.description,
        alternates: { canonical: `${siteConfig.url}/services/${cat.slug}` },
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const cat = serviceCategories.find((c) => c.slug === category);
    if (!cat) notFound();

    return (
        <>
            <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: cat.title }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">{cat.title}</h1>
                    <p className="mt-4 text-lg text-neutral-600">{cat.description}</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-4xl">
                    <h2 className="text-2xl font-bold text-neutral-900 font-heading">Our {cat.title} Services</h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        {cat.services.map((svc) => (
                            <Link key={svc.slug} href={`/services/${cat.slug}/${svc.slug}`} className="card group hover:border-primary-200">
                                <h3 className="text-lg font-semibold text-neutral-800 font-heading">{svc.title}</h3>
                                <p className="mt-2 text-sm text-neutral-600">{svc.shortDescription}</p>
                                <span className="mt-3 inline-block text-sm font-medium text-primary-500 group-hover:underline">Learn more →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            {cat.faqs.length > 0 && (
                <section className="section-padding bg-neutral-50">
                    <div className="section-container max-w-3xl">
                        <h2 className="mb-6 text-2xl font-bold text-neutral-900 font-heading">Frequently Asked Questions</h2>
                        <FAQAccordion faqs={cat.faqs} />
                    </div>
                </section>
            )}
        </>
    );
}
