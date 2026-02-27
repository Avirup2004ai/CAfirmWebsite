"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { hoverLift, staggerItem } from "@/lib/motion";

export default function KnowledgeCard({
    title,
    description,
    href,
    category,
    date,
}: {
    title: string;
    description: string;
    href: string;
    category?: string;
    date?: string;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div variants={staggerItem} whileHover={reduceMotion ? undefined : hoverLift}>
            <Link href={href} className="card group flex h-full flex-col">
                <div className="mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-primary-500" />
                    {category && (
                        <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-600">{category}</span>
                    )}
                </div>
                <h3 className="mb-2 text-base font-semibold text-neutral-800 font-heading">{title}</h3>
                <p className="mb-3 flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-2">{description}</p>
                <div className="flex items-center justify-between">
                    {date && <span className="text-xs text-neutral-400">{new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>}
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 group-hover:gap-2 transition-all">
                        Read more <ArrowRight size={14} />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
