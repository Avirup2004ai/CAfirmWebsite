"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import { partners } from "@/content/partners";
import { Mail, Linkedin, Award, Briefcase, ChevronDown, User } from "lucide-react";

export default function PartnersPage() {
    const [expanded, setExpanded] = useState<string | null>(null);
    const reduceMotion = useReducedMotion();

    const toggle = (slug: string) => {
        setExpanded(expanded === slug ? null : slug);
    };

    return (
        <>
            <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Our Partners" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Our Partners</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
                        Experienced professionals leading our practice with deep domain expertise and unwavering commitment to client success.
                    </p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="section-container max-w-3xl">
                    <div className="space-y-3">
                        {partners.map((p) => {
                            const isOpen = expanded === p.slug;

                            return (
                                <div key={p.slug} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md">
                                    {/* Accordion Header – always visible */}
                                    <button
                                        onClick={() => toggle(p.slug)}
                                        className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-neutral-50"
                                        aria-expanded={isOpen}
                                        aria-controls={`partner-${p.slug}`}
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-50">
                                            <Image src={p.photo} alt={p.name} width={48} height={48} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-base font-semibold text-neutral-900 font-heading">{p.name}</h2>
                                            <p className="text-sm text-primary-500">{p.designation}</p>
                                            <p className="mt-0.5 text-xs text-neutral-400">{p.qualifications.join(" · ")}</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="hidden sm:flex items-center gap-1 rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-600">
                                                <Award size={12} /> {p.yearsExperience}+ yrs
                                            </span>
                                            <motion.div
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <ChevronDown size={20} className="text-neutral-400" />
                                            </motion.div>
                                        </div>
                                    </button>

                                    {/* Accordion Body – expandable */}
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                id={`partner-${p.slug}`}
                                                initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                                animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                                                exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="border-t border-neutral-100 px-6 py-6">
                                                    <div className="flex flex-col gap-6 md:flex-row">
                                                        {/* Photo + Contact */}
                                                        <div className="flex flex-col items-center md:w-48 md:shrink-0">
                                                            <div className="h-28 w-28 overflow-hidden rounded-2xl bg-primary-50 shadow-md">
                                                                <Image src={p.photo} alt={p.name} width={112} height={112} className="h-full w-full object-cover" />
                                                            </div>
                                                            <div className="mt-4 flex gap-2">
                                                                <a
                                                                    href={`mailto:${p.email}`}
                                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-200"
                                                                    aria-label={`Email ${p.name}`}
                                                                >
                                                                    <Mail size={16} />
                                                                </a>
                                                                <a
                                                                    href={p.linkedin}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-200"
                                                                    aria-label={`${p.name} LinkedIn`}
                                                                >
                                                                    <Linkedin size={16} />
                                                                </a>
                                                            </div>
                                                        </div>

                                                        {/* Details */}
                                                        <div className="flex-1 space-y-5">
                                                            {/* Specializations */}
                                                            <div>
                                                                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Specializations</h3>
                                                                <div className="mt-2 flex flex-wrap gap-2">
                                                                    {p.specializations.map((s) => (
                                                                        <span key={s} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">{s}</span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Memberships */}
                                                            <div>
                                                                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Memberships</h3>
                                                                <ul className="mt-2 space-y-1">
                                                                    {p.memberships.map((m) => (
                                                                        <li key={m} className="text-sm text-neutral-600">• {m}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* Biography */}
                                                            <div>
                                                                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Biography</h3>
                                                                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{p.longBio}</p>
                                                            </div>

                                                            {/* Key Projects */}
                                                            {p.keyProjects.length > 0 && (
                                                                <div>
                                                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Key Projects</h3>
                                                                    <div className="mt-3 space-y-3">
                                                                        {p.keyProjects.map((proj) => (
                                                                            <div key={proj.title} className="rounded-lg bg-neutral-50 p-4">
                                                                                <div className="flex items-start gap-2">
                                                                                    <Briefcase size={16} className="mt-0.5 shrink-0 text-primary-500" />
                                                                                    <div>
                                                                                        <h4 className="text-sm font-semibold text-neutral-800">{proj.title}</h4>
                                                                                        <p className="mt-1 text-xs text-neutral-600">{proj.description}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
