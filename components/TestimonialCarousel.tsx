"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    { name: "Rajesh Kumar", company: "TechVentures Pvt. Ltd.", role: "CEO", text: "SAMPN & Associates have been our trusted CA partners for over 8 years. Their proactive approach to tax planning has saved us significantly and their audit quality is exceptional." },
    { name: "Priya Sharma", company: "Greenfield Exports", role: "Director", text: "The GST transition was seamless thanks to the SAMPN team. Their deep knowledge of indirect taxation and commitment to timely compliance gives us complete peace of mind." },
    { name: "Amit Das", company: "Eastern Pharma Group", role: "CFO", text: "From statutory audits to transfer pricing documentation, they handle everything with professionalism. Their risk advisory insights have been invaluable for our compliance framework." },
    { name: "Sneha Patil", company: "InnoStart Technologies", role: "Co-Founder", text: "As a startup, we needed a CA firm that understood our pace. SAMPN helped us with incorporation, DPIIT recognition, and investor-ready financials – all within tight timelines." },
    { name: "Vikram Ghosh", company: "Kolkata Realty Group", role: "Managing Partner", text: "Their expertise in real estate taxation and RERA compliance has been instrumental in our project financing. A truly reliable and knowledgeable firm." },
];

export default function TestimonialCarousel() {
    const [index, setIndex] = useState(0);
    const reduceMotion = useReducedMotion();

    const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
    const prev = useCallback(() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length), []);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const t = testimonials[index];

    return (
        <div className="relative mx-auto max-w-3xl text-center">
            <Quote size={40} className="mx-auto mb-6 text-primary-200" />
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                >
                    <p className="text-lg leading-relaxed text-neutral-700 italic">&ldquo;{t.text}&rdquo;</p>
                    <div className="mt-6">
                        <p className="font-semibold text-neutral-800">{t.name}</p>
                        <p className="text-sm text-neutral-500">{t.role}, {t.company}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-center gap-4">
                <button onClick={prev} className="rounded-full border border-neutral-200 p-2 text-neutral-500 hover:bg-primary-50 hover:text-primary-500 transition-colors" aria-label="Previous testimonial">
                    <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                        <button key={i} onClick={() => setIndex(i)} className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-primary-500" : "w-2 bg-neutral-300"}`} aria-label={`Go to testimonial ${i + 1}`} />
                    ))}
                </div>
                <button onClick={next} className="rounded-full border border-neutral-200 p-2 text-neutral-500 hover:bg-primary-50 hover:text-primary-500 transition-colors" aria-label="Next testimonial">
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
