"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";

export default function AITooltip({ text }: { text: string }) {
    const [open, setOpen] = useState(false);

    return (
        <span className="relative inline-flex ml-1 align-middle">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="text-neutral-400 hover:text-primary-500 transition-colors"
                aria-label="Help"
            >
                <HelpCircle size={14} />
            </button>
            {open && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg bg-neutral-800 px-3 py-2 text-xs text-white shadow-lg z-50 leading-relaxed animate-[fadeIn_0.15s_ease-out]">
                    {text}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800" />
                </span>
            )}
        </span>
    );
}
