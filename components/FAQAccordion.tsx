"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { buildJsonLd, faqSchema } from "@/lib/jsonld";

interface FAQ {
    question: string;
    answer: string;
}

export default function FAQAccordion({ faqs, showSchema = true }: { faqs: FAQ[]; showSchema?: boolean }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const reduceMotion = useReducedMotion();

    return (
        <div>
            {showSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(faqSchema(faqs)) }} />
            )}
            <div className="space-y-3">
                {faqs.map((faq, i) => (
                    <div key={i} className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
                            aria-expanded={openIndex === i}
                        >
                            <span>{faq.question}</span>
                            <ChevronDown
                                size={18}
                                className={`shrink-0 text-neutral-400 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                            />
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                    animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                                    exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden"
                                >
                                    <p className="px-5 pb-4 text-sm leading-relaxed text-neutral-600">{faq.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
