import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { acts } from "@/content/knowledge";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
    title: "Acts",
    description: "Summaries of key legislation: Income Tax Act, Companies Act, GST Act, FEMA, and more.",
    alternates: { canonical: `${siteConfig.url}/knowledge/acts` },
};

export default function ActsPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Acts" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Acts & Legislation</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-neutral-600">Key legislation governing taxation, corporate law, and foreign exchange in India.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-4xl space-y-6">
                    {acts.map((a) => (
                        <div key={a.slug} id={a.slug} className="card scroll-mt-20">
                            <div className="flex items-start gap-3">
                                <BookOpen size={20} className="mt-0.5 text-primary-500 shrink-0" />
                                <div>
                                    <h2 className="text-lg font-semibold text-neutral-800 font-heading">{a.title}</h2>
                                    <p className="mt-1 text-sm text-neutral-500">{a.description}</p>
                                    {a.content && <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{a.content}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
