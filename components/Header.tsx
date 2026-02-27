"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ChevronDown, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";
import { serviceCategories } from "@/content/services";
import { analytics } from "@/lib/analytics";
import { fadeInDown } from "@/lib/motion";
import SearchBar from "./SearchBar";

const knowledgeLinks = [
    { href: "/knowledge/calculators", label: "Calculators" },
    { href: "/knowledge/bulletins", label: "Bulletins" },
    { href: "/knowledge/utilities", label: "Utilities" },
    { href: "/knowledge/links", label: "Useful Links" },
    { href: "/knowledge/acts", label: "Acts" },
    { href: "/knowledge/rules", label: "Rules" },
    { href: "/knowledge/forms", label: "Forms" },
];

const aboutLinks = [
    { href: "/about/firm", label: "About Us" },
    { href: "/about/partners", label: "Our Partners" },
    { href: "/about/sectors", label: "Sectors" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const reduceMotion = useReducedMotion();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (key: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveDropdown(key);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
    };

    useEffect(() => {
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, []);

    const dropdownVariants = reduceMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
        : fadeInDown;

    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
            {/* Top bar */}
            <div className="hidden border-b border-neutral-100 bg-primary-800 text-xs text-white lg:block">
                <div className="section-container flex items-center justify-between py-1.5">
                    <span>Chartered Accountants | Trusted Advisors since {siteConfig.foundedYear}</span>
                    <div className="flex items-center gap-4">
                        <a href={`tel:${siteConfig.phones[0]}`} className="flex items-center gap-1 hover:text-accent-400 transition-colors" onClick={() => analytics.clickCall(siteConfig.phones[0])}>
                            <Phone size={12} /> {siteConfig.phones[0]}
                        </a>
                        <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent-400 transition-colors" onClick={() => analytics.clickWhatsApp(siteConfig.whatsapp)}>
                            <MessageCircle size={12} /> WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {/* Main nav */}
            <nav className="section-container flex items-center justify-between py-3" aria-label="Main navigation">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary-700 font-heading">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 text-sm font-bold text-white">SA</span>
                    <span className="hidden sm:inline">{siteConfig.shortName}</span>
                </Link>

                {/* Mobile Search - Visible only on small screens, placed between logo and hamburger */}
                <div className="flex-1 px-2 md:px-4 lg:hidden max-w-sm">
                    <SearchBar className="block" />
                </div>

                {/* Desktop navigation */}
                <ul className="hidden items-center gap-1 lg:flex">
                    <li><Link href="/" className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors rounded-md hover:bg-primary-50">Home</Link></li>
                    {/* About dropdown */}
                    <li className="relative" onMouseEnter={() => handleMouseEnter("about")} onMouseLeave={handleMouseLeave}>
                        <Link href="/about" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors rounded-md hover:bg-primary-50">
                            About <ChevronDown size={14} className={`transition-transform ${activeDropdown === "about" ? "rotate-180" : ""}`} />
                        </Link>
                        <AnimatePresence>
                            {activeDropdown === "about" && (
                                <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute left-0 top-full mt-1 w-52 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                                    {aboutLinks.map((link) => (
                                        <Link key={link.href} href={link.href} className="block rounded-lg px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                                            {link.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                    {/* Services dropdown */}
                    <li className="relative" onMouseEnter={() => handleMouseEnter("services")} onMouseLeave={handleMouseLeave}>
                        <Link href="/services" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors rounded-md hover:bg-primary-50">
                            Services <ChevronDown size={14} className={`transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`} />
                        </Link>
                        <AnimatePresence>
                            {activeDropdown === "services" && (
                                <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                                    {serviceCategories.map((cat) => (
                                        <Link key={cat.slug} href={`/services/${cat.slug}`} className="block rounded-lg px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                                            {cat.title}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                    {/* Knowledge dropdown */}
                    <li className="relative" onMouseEnter={() => handleMouseEnter("knowledge")} onMouseLeave={handleMouseLeave}>
                        <Link href="/knowledge" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors rounded-md hover:bg-primary-50">
                            Knowledge <ChevronDown size={14} className={`transition-transform ${activeDropdown === "knowledge" ? "rotate-180" : ""}`} />
                        </Link>
                        <AnimatePresence>
                            {activeDropdown === "knowledge" && (
                                <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute left-0 top-full mt-1 w-52 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                                    {knowledgeLinks.map((link) => (
                                        <Link key={link.href} href={link.href} className="block rounded-lg px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                                            {link.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                    {/* <li><Link href="/query" className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors rounded-md hover:bg-primary-50">Query</Link></li> */}
                    <li><Link href="/careers" className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors rounded-md hover:bg-primary-50">Careers</Link></li>
                    {/* <li><Link href="/admin" className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors rounded-md hover:bg-primary-50">Admin</Link></li> */}
                    <li className="hidden lg:block w-64"><SearchBar className="hidden lg:block" /></li>
                    <li><Link href="/contact" className="btn-primary text-xs !px-4 !py-2">Contact Us</Link></li>
                </ul>

                {/* Mobile toggle */}
                <button className="lg:hidden p-2 text-neutral-700" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden border-t border-neutral-200 bg-white lg:hidden">
                        <div className="section-container space-y-1 py-4 max-h-[70vh] overflow-y-auto">
                            <Link href="/" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>Home</Link>
                            <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">About</p>
                            {aboutLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="block rounded-lg px-6 py-2 text-sm text-neutral-600 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>{link.label}</Link>
                            ))}
                            <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">Services</p>
                            {serviceCategories.map((cat) => (
                                <Link key={cat.slug} href={`/services/${cat.slug}`} className="block rounded-lg px-6 py-2 text-sm text-neutral-600 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>{cat.title}</Link>
                            ))}
                            <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">Knowledge Bank</p>
                            {knowledgeLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="block rounded-lg px-6 py-2 text-sm text-neutral-600 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>{link.label}</Link>
                            ))}
                            {/* <Link href="/query" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>Query</Link> */}
                            <Link href="/careers" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>Careers</Link>
                            {/* <Link href="/admin" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-primary-50" onClick={() => setMobileOpen(false)}>Admin</Link> */}
                            <Link href="/contact" className="block rounded-lg mt-2 btn-primary text-center" onClick={() => setMobileOpen(false)}>Contact Us</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
