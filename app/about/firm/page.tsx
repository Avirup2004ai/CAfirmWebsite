import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { Target, Eye, Heart, CheckCircle, Building2, Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "About Our Firm",
    description: `${siteConfig.name} is a premier CA firm founded in ${siteConfig.foundedYear}. Learn about our history, mission, values, and commitment to excellence.`,
    alternates: { canonical: `${siteConfig.url}/about/firm` },
};

const timeline = [
    { year: "2005", title: "Founded", desc: "Firm established in Kolkata by CA Suresh Agarwal with a vision for professional excellence." },
    { year: "2010", title: "Expansion", desc: "Grew to 15 professionals serving 200+ clients across audit and taxation." },
    { year: "2015", title: "Puri Office", desc: "Opened branch in Puri, Odisha, extending services to Eastern India." },
    { year: "2017", title: "GST Era", desc: "Became one of the first firms to offer comprehensive GST migration services." },
    { year: "2020", title: "Digital Leap", desc: "Adopted digital-first audit and compliance processes during the pandemic." },
    { year: "2025", title: "Today", desc: "35+ member team, 1,500+ clients, 5,000+ engagements across 5 service verticals." },
];

const values = [
    { icon: CheckCircle, title: "Integrity", desc: "Unwavering commitment to ethical conduct and transparency in every engagement." },
    { icon: Target, title: "Excellence", desc: "Setting the highest standards in audit quality, tax advisory, and client service." },
    { icon: Heart, title: "Client-First", desc: "Your business goals are our priority, and we tailor every solution accordingly." },
    { icon: Eye, title: "Proactive", desc: "Anticipating changes and guiding clients ahead of compliance deadlines." },
];

export default function AboutFirmPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "About Us" }]} />

            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">About {siteConfig.name}</h1>
                    <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                        Founded in {siteConfig.foundedYear} in Kolkata, {siteConfig.name} has grown into one of Eastern India&apos;s most reputable Chartered Accountancy firms. With a team of {siteConfig.stats.teamMembers}+ professionals, we provide comprehensive services spanning statutory audit, taxation, GST compliance, company law, business advisory, and international taxation.
                    </p>
                    <p className="mt-4 text-neutral-600 leading-relaxed">
                        Our multi-disciplinary approach — combining CA, CS, CMA, and legal expertise — enables us to offer holistic solutions that address every aspect of our clients&apos; financial and regulatory needs. We serve {siteConfig.stats.clients}+ clients across manufacturing, IT, real estate, healthcare, banking, and emerging sectors.
                    </p>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-padding bg-white">
                <div className="section-container max-w-4xl">
                    <h2 className="text-2xl font-bold text-neutral-900 font-heading">Our Journey</h2>
                    <div className="mt-8 space-y-0">
                        {timeline.map((item, i) => (
                            <div key={item.year} className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">{item.year}</div>
                                    {i < timeline.length - 1 && <div className="h-full w-0.5 bg-primary-200" />}
                                </div>
                                <div className="pb-8">
                                    <h3 className="text-base font-semibold text-neutral-800">{item.title}</h3>
                                    <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-neutral-50">
                <div className="section-container max-w-4xl">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="card bg-primary-50 border-primary-200">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white"><Target size={20} /></div>
                            <h2 className="text-xl font-bold text-primary-800 font-heading">Our Mission</h2>
                            <p className="mt-3 text-sm text-primary-700 leading-relaxed">To provide exceptional professional services that empower our clients to achieve financial excellence, regulatory compliance, and sustainable growth — delivered with integrity, innovation, and a client-first mindset.</p>
                        </div>
                        <div className="card bg-accent-50 border-accent-200">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 text-white"><Eye size={20} /></div>
                            <h2 className="text-xl font-bold text-neutral-800 font-heading">Our Vision</h2>
                            <p className="mt-3 text-sm text-neutral-700 leading-relaxed">To be recognized as Eastern India&apos;s most trusted and innovative chartered accountancy firm, setting benchmarks in quality, technology adoption, and client satisfaction across every service vertical.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-white">
                <div className="section-container max-w-4xl">
                    <h2 className="text-2xl font-bold text-neutral-900 font-heading">Our Core Values</h2>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        {values.map((v) => (
                            <div key={v.title} className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500"><v.icon size={20} /></div>
                                <div>
                                    <h3 className="font-semibold text-neutral-800">{v.title}</h3>
                                    <p className="mt-1 text-sm text-neutral-600">{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliance & Ethics */}
            <section className="section-padding bg-neutral-50">
                <div className="section-container max-w-4xl">
                    <h2 className="text-2xl font-bold text-neutral-900 font-heading">Compliance & Ethics</h2>
                    <p className="mt-4 text-neutral-600 leading-relaxed">
                        We adhere to the standards and guidelines set by the Institute of Chartered Accountants of India (ICAI), including Standards on Auditing (SAs), Accounting Standards (AS/Ind AS), and the Code of Ethics. All our partners maintain their CPE credits and are committed to continuous professional development.
                    </p>
                    <p className="mt-3 text-neutral-600 leading-relaxed">
                        Our firm maintains robust quality control procedures including engagement-level reviews, independence checks, and periodic peer reviews as mandated by ICAI. We carry professional indemnity insurance and have a documented ethics and anti-bribery policy.
                    </p>
                </div>
            </section>

            {/* Offices */}
            <section className="section-padding bg-white">
                <div className="section-container max-w-4xl">
                    <h2 className="text-2xl font-bold text-neutral-900 font-heading">Our Offices</h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        {siteConfig.addresses.map((addr) => (
                            <div key={addr.id} className="card flex items-start gap-4">
                                <Building2 size={24} className="shrink-0 text-primary-500" />
                                <div>
                                    <h3 className="font-semibold text-neutral-800">{addr.label}</h3>
                                    <p className="mt-1 text-sm text-neutral-600">{addr.line1}<br />{addr.line2}</p>
                                    <p className="mt-2 text-sm text-neutral-600">📞 {addr.phone}</p>
                                    <p className="text-sm text-neutral-600">✉️ {addr.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
                        <Calendar size={16} /> Working Hours: Mon–Sat, 10:00 AM – 6:00 PM
                    </div>
                </div>
            </section>
        </>
    );
}
