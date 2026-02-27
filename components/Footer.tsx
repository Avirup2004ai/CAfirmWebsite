import Link from "next/link";
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";

const XIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

import { siteConfig } from "@/content/site";
import { serviceCategories } from "@/content/services";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary-800 text-white">
            <div className="section-container py-16">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 text-lg font-bold font-heading">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500 text-xs font-bold text-white">SA</span>
                            {siteConfig.shortName}
                        </Link>
                        <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{siteConfig.description}</p>
                        <div className="mt-4 flex gap-3">
                            {[
                                { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
                                { icon: XIcon, href: siteConfig.social.twitter, label: "X" },
                                { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
                                { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
                            ].map((social) => (
                                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-neutral-300 transition-colors hover:bg-accent-500 hover:text-white">
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-400">Services</h3>
                        <ul className="space-y-2">
                            {serviceCategories.map((cat) => (
                                <li key={cat.slug}>
                                    <Link href={`/services/${cat.slug}`} className="text-sm text-neutral-300 hover:text-white transition-colors">{cat.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-400">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                { href: "/about/firm", label: "About Us" },
                                { href: "/about/partners", label: "Our Partners" },
                                { href: "/knowledge", label: "Knowledge Bank" },
                                // { href: "/query", label: "Ask a Query" },
                                { href: "/careers", label: "Careers" },
                                { href: "/contact", label: "Contact Us" },
                                // { href: "/privacy-policy", label: "Privacy Policy" },
                                // { href: "/disclaimer", label: "Disclaimer" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-neutral-300 hover:text-white transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-400">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-neutral-300">
                                <MapPin size={16} className="mt-0.5 shrink-0 text-accent-400" />
                                <span>{siteConfig.addresses[0].line1}, {siteConfig.addresses[0].line2}</span>
                            </li>
                            <li>
                                <a href={`tel:${siteConfig.phones[0]}`} className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors">
                                    <Phone size={16} className="text-accent-400" /> {siteConfig.phones[0]}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${siteConfig.emails[0]}`} className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors">
                                    <Mail size={16} className="text-accent-400" /> {siteConfig.emails[0]}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="section-container flex flex-col items-center justify-between gap-2 py-4 text-xs text-neutral-400 sm:flex-row">
                    <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
                        <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
