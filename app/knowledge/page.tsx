import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { Calculator, FileText, Wrench, Link2, BookOpen, ScrollText, Download } from "lucide-react";

export const metadata: Metadata = {
    title: "Knowledge Bank",
    description: `Access calculators, bulletins, utilities, acts, rules, and forms from ${siteConfig.name}'s Knowledge Bank.`,
    alternates: { canonical: `${siteConfig.url}/knowledge` },
};

const sections = [
    { href: "/knowledge/calculators", title: "Calculators", desc: "GST, HRA, EMI, and more financial calculators.", icon: Calculator, color: "bg-blue-50 text-blue-600" },
    { href: "/knowledge/bulletins", title: "Bulletins", desc: "Latest tax updates, budget highlights, and compliance alerts.", icon: FileText, color: "bg-green-50 text-green-600" },
    { href: "/knowledge/utilities", title: "Utilities", desc: "TDS rates, compliance calendars, and quick reference charts.", icon: Wrench, color: "bg-purple-50 text-purple-600" },
    { href: "/knowledge/links", title: "Useful Links", desc: "Quick links to government portals and regulatory authorities.", icon: Link2, color: "bg-orange-50 text-orange-600" },
    { href: "/knowledge/acts", title: "Acts", desc: "Summaries of key legislation governing tax and corporate law.", icon: BookOpen, color: "bg-red-50 text-red-600" },
    { href: "/knowledge/rules", title: "Rules", desc: "Rules and regulations under major acts.", icon: ScrollText, color: "bg-teal-50 text-teal-600" },
    { href: "/knowledge/forms", title: "Forms", desc: "Download ITR forms, GST forms, and compliance templates.", icon: Download, color: "bg-amber-50 text-amber-600" },
];

export default function KnowledgePage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Knowledge Bank</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">Your go-to resource for financial tools, regulatory updates, and compliance guides.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sections.map((s) => (
                        <Link key={s.href} href={s.href} className="card group flex flex-col items-center text-center hover:border-primary-200">
                            <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${s.color} transition-transform group-hover:scale-110`}>
                                <s.icon size={26} />
                            </div>
                            <h2 className="text-lg font-semibold text-neutral-800 font-heading">{s.title}</h2>
                            <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
