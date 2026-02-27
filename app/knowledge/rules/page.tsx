import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { rules } from "@/content/knowledge";
import { ScrollText } from "lucide-react";

export const metadata: Metadata = {
    title: "Rules & Regulations",
    description: "Rules under Income Tax Act, Companies Act, GST Act, and Transfer Pricing regulations.",
    alternates: { canonical: `${siteConfig.url}/knowledge/rules` },
};

export default function RulesPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Rules" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Rules & Regulations</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-neutral-600">Procedural rules and regulations under key Indian legislation.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-4xl space-y-6">
                    {rules.map((r) => (
                        <div key={r.slug} id={r.slug} className="card scroll-mt-20">
                            <div className="flex items-start gap-3">
                                <ScrollText size={20} className="mt-0.5 text-primary-500 shrink-0" />
                                <div>
                                    <h2 className="text-lg font-semibold text-neutral-800 font-heading">{r.title}</h2>
                                    <p className="mt-1 text-sm text-neutral-500">{r.description}</p>
                                    {r.content && <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{r.content}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
