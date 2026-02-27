"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

export default function Toast({ message, show, onClose }: { message: string; show: boolean; onClose: () => void }) {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        setVisible(show);
        if (show) {
            const timer = setTimeout(() => { setVisible(false); onClose(); }, 4000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl bg-primary-700 px-5 py-3.5 text-sm text-white shadow-2xl"
                >
                    <CheckCircle size={20} className="text-green-400" />
                    {message}
                    <button onClick={() => { setVisible(false); onClose(); }} className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-colors" aria-label="Close">
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
