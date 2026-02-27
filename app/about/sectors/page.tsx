import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { sectors } from "@/content/sectors";
import { serviceCategories } from "@/content/services";

export const metadata: Metadata = {
    title: "Sectors We Serve",
    description: `${siteConfig.name} serves clients across manufacturing, IT, healthcare, banking, real estate, and more.`,
    alternates: { canonical: `${siteConfig.url}/about/sectors` },
};

function findServiceTitle(slug: string): string {
    for (const cat of serviceCategories) {
        for (const svc of cat.services) {
            if (svc.slug === slug) return svc.title;
        }
    }
    return slug;
}

function findServiceHref(slug: string): string {
    for (const cat of serviceCategories) {
        for (const svc of cat.services) {
            if (svc.slug === slug) return `/services/${cat.slug}/${svc.slug}`;
        }
    }
    return "/services";
}

export default function SectorsPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Sectors" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Industries We Serve</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">Deep sector expertise delivering tailored solutions for India&apos;s diverse business landscape.</p>
                </div>
            </section>

            {sectors.map((s) => (
                <section key={s.slug} id={s.slug} className="section-padding even:bg-neutral-50 odd:bg-white scroll-mt-20">
                    <div className="section-container max-w-4xl">
                        <h2 className="text-2xl font-bold text-neutral-900 font-heading">{s.title}</h2>
                        <p className="mt-3 text-neutral-600 leading-relaxed">{s.description}</p>

                        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-neutral-400">Key Services</h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {s.keyServices.map((slug) => (
                                <Link key={slug} href={findServiceHref(slug)} className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors">
                                    {findServiceTitle(slug)}
                                </Link>
                            ))}
                        </div>

                        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-neutral-400">Key Challenges</h3>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {s.challenges.map((c) => (
                                <li key={c} className="flex items-start gap-2 text-sm text-neutral-600">
                                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            ))}
        </>
    );
}
