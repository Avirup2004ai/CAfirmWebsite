"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface BannerSlide {
    title: string;
    subtitle: string;
    highlight: string;
    cta: { label: string; href: string };
    gradient: string;
}

const defaultSlides: BannerSlide[] = [
    {
        title: "Your Trusted Partner for",
        highlight: "Financial Excellence",
        subtitle: "Comprehensive audit, taxation, GST, company law, and advisory services for businesses across India.",
        cta: { label: "Explore Services", href: "/services" },
        gradient: "from-primary-50 via-white to-accent-50",
    },
    {
        title: "Expert",
        highlight: "GST & Tax Advisory",
        subtitle: "Navigate India's complex tax landscape with confidence. 5,000+ successful engagements and counting.",
        cta: { label: "Tax Services", href: "/services/taxation" },
        gradient: "from-blue-50 via-white to-primary-50",
    },
    {
        title: "Comprehensive",
        highlight: "Audit & Assurance",
        subtitle: "Statutory audit, internal audit, and tax audit by experienced CAs with deep industry expertise.",
        cta: { label: "Audit Services", href: "/services/audit-assurance" },
        gradient: "from-primary-50 via-white to-blue-50",
    },
    {
        title: "Trusted",
        highlight: "Corporate Advisory",
        subtitle: "Company law compliance, FEMA advisory, business valuations, and M&A support across India.",
        cta: { label: "Advisory Services", href: "/services/corporate-law" },
        gradient: "from-accent-50 via-white to-primary-50",
    },
];

export default function HeroBanner({ slides = defaultSlides }: { slides?: BannerSlide[] }) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const reduceMotion = useReducedMotion();

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goTo = useCallback((index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    }, [current]);

    // Auto-play every 5 seconds
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const variants = reduceMotion
        ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
        : {
            enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
        };

    const slide = slides[current];

    return (
        <section className="relative overflow-hidden" aria-label="Featured banners">
            <div className={`min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] bg-gradient-to-br ${slide.gradient} transition-colors duration-700`}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,64,175,0.06)_0%,_transparent_60%)]" />

                <div className="section-container relative flex flex-col items-center justify-center py-20 text-center lg:py-28">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center"
                        >
                            <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold text-primary-700">
                                Chartered Accountants | Trusted Advisors
                            </span>
                            <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight text-neutral-900 font-heading sm:text-4xl lg:text-5xl xl:text-6xl">
                                {slide.title}{" "}
                                <span className="gradient-text">{slide.highlight}</span>
                            </h2>
                            <p className="mx-auto mt-5 max-w-2xl text-base text-neutral-600 leading-relaxed sm:text-lg">
                                {slide.subtitle}
                            </p>
                            <div className="mt-8">
                                <Link href={slide.cta.href} className="btn-primary">
                                    {slide.cta.label} <ChevronRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation arrows */}
                <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-600 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg sm:left-6"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-600 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg sm:right-6"
                    aria-label="Next slide"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary-500" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
