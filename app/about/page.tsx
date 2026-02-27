import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Briefcase, Building2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
    title: "About Us",
    description: `Learn about ${siteConfig.name}, a leading CA firm with ${siteConfig.stats.yearsExperience}+ years of expertise in audit, taxation, and advisory services.`,
    alternates: { canonical: `${siteConfig.url}/about` },
};

const sections = [
    { href: "/about/firm", title: "About Our Firm", desc: "Our story, mission, values, and the team behind our success.", icon: Building2 },
    { href: "/about/partners", title: "Our Partners", desc: "Meet the experienced professionals leading our practice.", icon: Users },
    { href: "/about/sectors", title: "Sectors We Serve", desc: "Deep expertise across India's key industries.", icon: Briefcase },
];

export default function AboutPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">About {siteConfig.shortName}</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
                        With {siteConfig.stats.yearsExperience}+ years of excellence, we are one of Eastern India&apos;s most trusted chartered accountancy firms serving {siteConfig.stats.clients}+ clients.
                    </p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container grid gap-6 md:grid-cols-3">
                    {sections.map((s) => (
                        <Link key={s.href} href={s.href} className="card group flex flex-col items-center text-center hover:border-primary-200">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                <s.icon size={28} />
                            </div>
                            <h2 className="text-lg font-semibold text-neutral-800 font-heading">{s.title}</h2>
                            <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
                            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-500 group-hover:gap-2 transition-all">
                                Learn more <ArrowRight size={14} />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
