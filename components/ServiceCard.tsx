"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { hoverLift, staggerItem } from "@/lib/motion";

export default function ServiceCard({
    title,
    description,
    href,
    icon,
}: {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div variants={staggerItem} whileHover={reduceMotion ? undefined : hoverLift}>
            <Link href={href} className="card group flex h-full flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                    {icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-800 font-heading">{title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-600">{description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={14} />
                </span>
            </Link>
        </motion.div>
    );
}
