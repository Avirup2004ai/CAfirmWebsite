"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) return <>{children}</>;

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            {children}
        </motion.div>
    );
}
