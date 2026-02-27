import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { forms } from "@/content/knowledge";
import { Download } from "lucide-react";
import { analytics } from "@/lib/analytics";

export const metadata: Metadata = {
    title: "Forms & Downloads",
    description: "Download ITR forms, GST forms, tax audit reports, and other compliance templates.",
    alternates: { canonical: `${siteConfig.url}/knowledge/forms` },
};

export default function FormsPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Forms" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Forms & Downloads</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-neutral-600">Commonly used tax and compliance forms for download.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-3xl">
                    <div className="space-y-3">
                        {forms.map((f) => (
                            <div key={f.slug} className="card flex items-center justify-between">
                                <div>
                                    <h2 className="text-base font-semibold text-neutral-800">{f.title}</h2>
                                    <p className="mt-1 text-sm text-neutral-600">{f.description}</p>
                                </div>
                                <button className="btn-secondary !py-2 !px-4 text-xs shrink-0" aria-label={`Download ${f.title}`}>
                                    <Download size={14} /> Download
                                </button>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-sm text-neutral-500 text-center">
                        * Download links are placeholders. Replace with actual form PDFs when available.
                    </p>
                </div>
            </section>
        </>
    );
}
