"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, Award } from "lucide-react";
import { hoverLift, staggerItem } from "@/lib/motion";
import type { Partner } from "@/content/partners";

export default function PartnerCard({ partner }: { partner: Partner }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div variants={staggerItem} whileHover={reduceMotion ? undefined : hoverLift} className="card group text-center">
            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-primary-50">
                <Image src={partner.photo} alt={partner.name} width={96} height={96} className="h-full w-full object-cover" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 font-heading">{partner.name}</h3>
            <p className="text-sm font-medium text-primary-500">{partner.designation}</p>
            <p className="mt-1 text-xs text-neutral-500">{partner.qualifications.join(" | ")}</p>
            <div className="mt-3 flex items-center justify-center gap-1 text-xs text-neutral-500">
                <Award size={14} className="text-accent-500" /> {partner.yearsExperience} years experience
            </div>
            <p className="mt-3 text-sm text-neutral-600 line-clamp-3">{partner.shortBio}</p>
            <div className="mt-4 flex items-center justify-center gap-2">
                <a href={`mailto:${partner.email}`} aria-label={`Email ${partner.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors">
                    <Mail size={14} />
                </a>
                <a href={partner.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${partner.name} LinkedIn`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors">
                    <Linkedin size={14} />
                </a>
            </div>
            <Link href={`/about/partners#${partner.slug}`} className="mt-3 inline-block text-sm font-medium text-primary-500 hover:underline">
                View Profile →
            </Link>
        </motion.div>
    );
}
