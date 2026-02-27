import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import { CTAGroup } from "@/components/CTAButtons";
import { siteConfig } from "@/content/site";
import { serviceCategories } from "@/content/services";
import { buildJsonLd, serviceSchema } from "@/lib/jsonld";
import { CheckCircle, FileText, Users, ListChecks, ClipboardList } from "lucide-react";

export async function generateStaticParams() {
    const paths: { category: string; service: string }[] = [];
    for (const cat of serviceCategories) {
        for (const svc of cat.services) {
            paths.push({ category: cat.slug, service: svc.slug });
        }
    }
    return paths;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; service: string }> }): Promise<Metadata> {
    const { category, service } = await params;
    const cat = serviceCategories.find((c) => c.slug === category);
    const svc = cat?.services.find((s) => s.slug === service);
    if (!svc) return {};
    return {
        title: svc.title,
        description: svc.shortDescription,
        keywords: svc.keywords,
        alternates: { canonical: `${siteConfig.url}/services/${category}/${service}` },
        openGraph: { title: svc.title, description: svc.description, url: `${siteConfig.url}/services/${category}/${service}` },
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ category: string; service: string }> }) {
    const { category, service } = await params;
    const cat = serviceCategories.find((c) => c.slug === category);
    const svc = cat?.services.find((s) => s.slug === service);
    if (!cat || !svc) notFound();

    const relatedServices = svc.relatedServices
        .map((slug) => {
            for (const c of serviceCategories) {
                const found = c.services.find((s) => s.slug === slug);
                if (found) return { ...found, categorySlug: c.slug };
            }
            return null;
        })
        .filter(Boolean);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(serviceSchema({ name: svc.title, description: svc.description, url: `${siteConfig.url}/services/${category}/${service}` })) }} />
            <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: cat.title, href: `/services/${cat.slug}` }, { label: svc.title }]} />

            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading sm:text-4xl">{svc.title}</h1>
                    <p className="mt-4 text-lg text-neutral-600 leading-relaxed">{svc.description}</p>
                    <div className="mt-6"><CTAGroup /></div>
                </div>
            </section>

            {/* Who is it for */}
            <section className="section-padding bg-white">
                <div className="section-container max-w-4xl">
                    <div className="flex items-center gap-2 mb-4"><Users size={20} className="text-primary-500" /><h2 className="text-xl font-bold text-neutral-900 font-heading">Who Is It For?</h2></div>
                    <ul className="grid gap-2 sm:grid-cols-2">
                        {svc.whoIsItFor.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-neutral-700"><CheckCircle size={16} className="text-green-500 shrink-0" /> {item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Deliverables */}
            <section className="section-padding bg-neutral-50">
                <div className="section-container max-w-4xl">
                    <div className="flex items-center gap-2 mb-4"><ClipboardList size={20} className="text-primary-500" /><h2 className="text-xl font-bold text-neutral-900 font-heading">Deliverables</h2></div>
                    <ul className="grid gap-2 sm:grid-cols-2">
                        {svc.deliverables.map((d) => (
                            <li key={d} className="flex items-center gap-2 text-sm text-neutral-700"><CheckCircle size={16} className="text-primary-500 shrink-0" /> {d}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Process */}
            <section className="section-padding bg-white">
                <div className="section-container max-w-4xl">
                    <div className="flex items-center gap-2 mb-4"><ListChecks size={20} className="text-primary-500" /><h2 className="text-xl font-bold text-neutral-900 font-heading">Our Process</h2></div>
                    <div className="space-y-0">
                        {svc.processSteps.map((step, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">{i + 1}</div>
                                    {i < svc.processSteps.length - 1 && <div className="h-full w-0.5 bg-primary-200" />}
                                </div>
                                <p className="pb-6 text-sm text-neutral-700">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents Required */}
            <section className="section-padding bg-neutral-50">
                <div className="section-container max-w-4xl">
                    <div className="flex items-center gap-2 mb-4"><FileText size={20} className="text-primary-500" /><h2 className="text-xl font-bold text-neutral-900 font-heading">Documents Required</h2></div>
                    <ul className="grid gap-2 sm:grid-cols-2">
                        {svc.documentsRequired.map((doc) => (
                            <li key={doc} className="flex items-center gap-2 text-sm text-neutral-700"><FileText size={14} className="text-neutral-400 shrink-0" /> {doc}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* FAQs */}
            <section className="section-padding bg-white">
                <div className="section-container max-w-3xl">
                    <h2 className="mb-6 text-xl font-bold text-neutral-900 font-heading">People Also Ask</h2>
                    <FAQAccordion faqs={svc.faqs} />
                </div>
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
                <section className="section-padding bg-neutral-50">
                    <div className="section-container max-w-4xl">
                        <h2 className="mb-6 text-xl font-bold text-neutral-900 font-heading">Related Services</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {relatedServices.map((rs) => rs && (
                                <Link key={rs.slug} href={`/services/${rs.categorySlug}/${rs.slug}`} className="card group hover:border-primary-200">
                                    <h3 className="font-semibold text-neutral-800">{rs.title}</h3>
                                    <p className="mt-1 text-sm text-neutral-600">{rs.shortDescription}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Block */}
            <section className="bg-primary-700 text-white">
                <div className="section-container flex flex-col items-center gap-4 py-12 text-center">
                    <h2 className="text-2xl font-bold font-heading">Need help with {svc.title}?</h2>
                    <p className="max-w-lg text-primary-200">Our experts are ready to assist. Book a free consultation today.</p>
                    <CTAGroup />
                </div>
            </section>
        </>
    );
}
