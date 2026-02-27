"use client";

import { motion } from "framer-motion";

type SandyLoaderProps = {
    label?: string;
    size?: number; // px
};

export function SandyLoader({ label = "Loading…", size = 150 }: SandyLoaderProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label={label}
            className="flex flex-col items-center justify-center gap-4"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ width: size, height: size }}
                className="relative overflow-hidden rounded-full"
            >
                <video
                    src="/websiteLoadinganimation.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-[1.2]" // Scale slightly to remove potential edge pixels
                />
            </motion.div>
            {label && <div className="text-sm font-medium text-slate-600 animate-pulse">{label}</div>}
        </div>
    );
}
