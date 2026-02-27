import { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { serviceCategories } from "@/content/services";

export const metadata: Metadata = {
    title: "Our Services",
    description: `Explore the comprehensive services offered by ${siteConfig.name} including audit, taxation, GST, corporate law, and advisory.`,
    alternates: { canonical: `${siteConfig.url}/services` },
};

const iconMap: Record<string, React.ReactNode> = {
    Shield: <Shield size={28} />, Receipt: <Shield size={28} />, Building2: <Shield size={28} />, Lightbulb: <Shield size={28} />, Plane: <Shield size={28} />,
};

export default function ServicesPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Services" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Our Services</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">Comprehensive chartered accountancy services tailored to your business needs.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {serviceCategories.map((cat) => (
                        <Link key={cat.slug} href={`/services/${cat.slug}`} className="card group flex flex-col">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                {iconMap[cat.icon] || <Shield size={28} />}
                            </div>
                            <h2 className="text-xl font-bold text-neutral-800 font-heading">{cat.title}</h2>
                            <p className="mt-2 flex-1 text-sm text-neutral-600">{cat.description}</p>
                            <div className="mt-4 space-y-1">
                                {cat.services.slice(0, 3).map((s) => (
                                    <p key={s.slug} className="text-xs text-neutral-500">• {s.title}</p>
                                ))}
                            </div>
                            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-500 group-hover:gap-2 transition-all">
                                Explore <ArrowRight size={14} />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
