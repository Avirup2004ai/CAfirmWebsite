import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { utilities } from "@/content/knowledge";
import { Wrench } from "lucide-react";

export const metadata: Metadata = {
    title: "Utilities & References",
    description: "TDS rate charts, compliance calendars, HSN code finder, and income tax slab rates.",
    alternates: { canonical: `${siteConfig.url}/knowledge/utilities` },
};

export default function UtilitiesPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Utilities" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Utilities & References</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-neutral-600">Quick reference tools and charts for tax professionals and businesses.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-4xl space-y-6">
                    {utilities.map((u) => (
                        <div key={u.slug} id={u.slug} className="card scroll-mt-20">
                            <div className="flex items-start gap-3">
                                <Wrench size={20} className="mt-0.5 text-primary-500 shrink-0" />
                                <div>
                                    <h2 className="text-lg font-semibold text-neutral-800 font-heading">{u.title}</h2>
                                    <p className="mt-1 text-sm text-neutral-600">{u.description}</p>
                                    {u.content && <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{u.content}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
