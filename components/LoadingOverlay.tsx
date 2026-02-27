"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SandyLoader } from "./SandyLoader";

export function LoadingOverlay({ show }: { show: boolean }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                >
                    <SandyLoader label="Preparing your experience…" size={140} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
