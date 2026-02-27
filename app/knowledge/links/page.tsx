import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { usefulLinks } from "@/content/knowledge";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
    title: "Useful Links",
    description: "Quick links to Income Tax, GST, MCA, RBI, ICAI, and other government portals.",
    alternates: { canonical: `${siteConfig.url}/knowledge/links` },
};

export default function LinksPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Useful Links" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Useful Links</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-neutral-600">Quick access to important government portals and regulatory websites.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-3xl space-y-4">
                    {usefulLinks.map((link) => (
                        <a key={link.slug} href={link.externalUrl} target="_blank" rel="noopener noreferrer" className="card group flex items-center justify-between hover:border-primary-200">
                            <div>
                                <h2 className="text-base font-semibold text-neutral-800">{link.title}</h2>
                                <p className="mt-1 text-sm text-neutral-600">{link.description}</p>
                            </div>
                            <ExternalLink size={18} className="shrink-0 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}
