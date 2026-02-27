"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Calculator, Briefcase, BookOpen, FileText, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchDocuments } from "@/lib/searchEngine";
import type { SearchDocument, SearchDocumentType } from "@/lib/searchData";

const TypeIcon = ({ type, className = "" }: { type: SearchDocumentType; className?: string }) => {
    switch (type) {
        case "Calculator": return <Calculator className={`w-4 h-4 text-blue-500 ${className}`} />;
        case "Service": return <Briefcase className={`w-4 h-4 text-purple-500 ${className}`} />;
        case "Knowledge": return <BookOpen className={`w-4 h-4 text-orange-500 ${className}`} />;
        case "Blog": return <FileText className={`w-4 h-4 text-green-500 ${className}`} />;
        default: return <Search className={`w-4 h-4 text-neutral-400 ${className}`} />;
    }
};

export default function SearchBar({ className = "hidden md:block" }: { className?: string }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchDocument[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const res = await searchDocuments(query, 6);
                setResults(res);
                setIsOpen(true);
                setSelectedIndex(-1);
            } finally {
                setIsLoading(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = useCallback((url: string) => {
        setIsOpen(false);
        setQuery("");
        router.push(url);
    }, [router]);

    const handleSearchAll = useCallback(() => {
        setIsOpen(false);
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setQuery("");
        }
    }, [query, router]);

    // Handle Keyboard Navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIndex >= 0 && selectedIndex < results.length) {
                handleSelect(results[selectedIndex].url);
            } else if (query.trim()) {
                handleSearchAll();
            }
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    // Highlight matching text (basic implementation)
    const highlightMatch = (text: string, q: string) => {
        if (!q.trim()) return text;
        const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? <mark key={i} className="bg-yellow-200 text-neutral-900 rounded px-0.5">{part}</mark> : <span key={i}>{part}</span>
        );
    };

    return (
        <div className={`relative w-full max-w-md ${className}`} ref={containerRef}>
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search calculators, services, updates..."
                    className="w-full bg-neutral-100/80 border border-neutral-200 rounded-full pl-10 pr-10 py-2 text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    aria-label="Search website"
                />
                {query && (
                    <button
                        onClick={() => { setQuery(""); setIsOpen(false); inputRef.current?.focus(); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5 rounded-full hover:bg-neutral-200"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-12 left-0 right-0 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-100 overflow-hidden z-50 transform origin-top"
                    >
                        {isLoading ? (
                            <div className="p-4 text-center text-sm text-neutral-500 flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                                Searching...
                            </div>
                        ) : results.length > 0 ? (
                            <div className="py-2">
                                <div className="px-3 pb-2 mb-2 border-b border-neutral-100 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Top Results</span>
                                    <span className="text-xs text-neutral-400">Use ↑↓ keys</span>
                                </div>

                                <ul className="max-h-[350px] overflow-y-auto px-2 space-y-1">
                                    {results.map((doc, i) => (
                                        <li key={doc.id}>
                                            <button
                                                onClick={() => handleSelect(doc.url)}
                                                onMouseEnter={() => setSelectedIndex(i)}
                                                className={`w-full text-left flex items-start gap-3 p-2.5 rounded-lg transition-colors ${selectedIndex === i ? "bg-primary-50" : "hover:bg-neutral-50"
                                                    }`}
                                            >
                                                <div className={`mt-0.5 p-1.5 rounded-md ${selectedIndex === i ? "bg-white shadow-sm" : "bg-neutral-100"}`}>
                                                    <TypeIcon type={doc.type} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                                        <h4 className={`text-sm font-medium truncate ${selectedIndex === i ? "text-primary-700" : "text-neutral-900"}`}>
                                                            {highlightMatch(doc.title, query)}
                                                        </h4>
                                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                                                            {doc.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-neutral-500 line-clamp-1">
                                                        {highlightMatch(doc.description, query)}
                                                    </p>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="px-2 pt-2 mt-2 border-t border-neutral-100">
                                    <button
                                        onClick={handleSearchAll}
                                        className="w-full flex items-center justify-center gap-2 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 p-2 rounded-lg font-medium transition-colors"
                                    >
                                        View all results for &quot;{query}&quot;
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 text-center">
                                <Search className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                                <p className="text-sm font-medium text-neutral-900 mb-1">No results found</p>
                                <p className="text-xs text-neutral-500">We couldn&apos;t find anything matching &quot;{query}&quot;</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
