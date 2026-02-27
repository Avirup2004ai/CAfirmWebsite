import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { calculators } from "@/content/knowledge";
import { Calculator } from "lucide-react";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
    title: "Calculators",
    description: "Free financial calculators: GST, HRA Exemption, Simple Interest, and EMI calculators.",
    alternates: { canonical: `${siteConfig.url}/knowledge/calculators` },
};

export default function CalculatorsPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Financial Calculators</h1>
                    <p className="mx-auto mt-4 mb-8 max-w-2xl text-neutral-600">Free tools to help you compute taxes, exemptions, and interest.</p>

                    <div className="max-w-xl mx-auto hidden md:block">
                        <SearchBar />
                    </div>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {calculators.map((c) => (
                        <Link key={c.slug} href={`/knowledge/calculators/${c.slug}`} className="card group hover:border-primary-200 text-center">
                            <Calculator size={32} className="mx-auto mb-3 text-primary-500" />
                            <h2 className="text-lg font-semibold text-neutral-800 font-heading">{c.title}</h2>
                            <p className="mt-2 text-sm text-neutral-600">{c.description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
