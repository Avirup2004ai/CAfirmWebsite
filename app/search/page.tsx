"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calculator, Briefcase, BookOpen, FileText, ArrowRight, ExternalLink } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { searchDocuments } from "@/lib/searchEngine";
import type { SearchDocument, SearchDocumentType } from "@/lib/searchData";

const TypeIcon = ({ type, className = "" }: { type: SearchDocumentType; className?: string }) => {
    switch (type) {
        case "Calculator": return <Calculator className={`w-5 h-5 text-blue-500 ${className}`} />;
        case "Service": return <Briefcase className={`w-5 h-5 text-purple-500 ${className}`} />;
        case "Knowledge": return <BookOpen className={`w-5 h-5 text-orange-500 ${className}`} />;
        case "Blog": return <FileText className={`w-5 h-5 text-green-500 ${className}`} />;
        default: return <Search className={`w-5 h-5 text-neutral-400 ${className}`} />;
    }
};

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [results, setResults] = useState<SearchDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<SearchDocumentType | "All">("All");

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            if (query.trim()) {
                const res = await searchDocuments(query, 50); // Get up to 50 results
                setResults(res);
            } else {
                setResults([]);
            }
            setIsLoading(false);
        };
        fetchResults();
    }, [query]);

    const filteredResults = filter === "All" ? results : results.filter(r => r.type === filter);

    // Group counts for filters
    const counts = results.reduce((acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + 1;
        acc["All"] = (acc["All"] || 0) + 1;
        return acc;
    }, { All: 0 } as Record<string, number>);

    return (
        <>
            <Breadcrumbs items={[{ label: "Search Results" }]} />

            <section className="section-padding bg-neutral-50/50 min-h-[60vh]">
                <div className="section-container max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-neutral-900 font-heading mb-2">
                            {query ? `Search results for "${query}"` : "Search"}
                        </h1>
                        <p className="text-neutral-600">
                            {isLoading ? "Searching..." : `Found ${results.length} results`}
                        </p>
                    </div>

                    {!isLoading && results.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {(["All", "Calculator", "Service", "Knowledge", "Blog", "Page"] as const).map(type => {
                                const count = counts[type] || 0;
                                if (type !== "All" && count === 0) return null;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => setFilter(type)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${filter === type
                                                ? "bg-primary-500 text-white border-primary-500"
                                                : "bg-white text-neutral-600 border-neutral-200 hover:border-primary-200 hover:bg-primary-50"
                                            }`}
                                    >
                                        {type} <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${filter === type ? "bg-primary-600" : "bg-neutral-100 text-neutral-500"}`}>{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                            </div>
                        ) : filteredResults.length > 0 ? (
                            filteredResults.map((doc, idx) => (
                                <motion.div
                                    key={doc.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                >
                                    <Link href={doc.url} className="group block bg-white border border-neutral-200 rounded-xl p-5 hover:border-primary-200 hover:shadow-md transition-all">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-neutral-50 rounded-lg group-hover:bg-primary-50 transition-colors">
                                                <TypeIcon type={doc.type} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h2 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors truncate">
                                                        {doc.title}
                                                    </h2>
                                                    <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                                                        {doc.type}
                                                    </span>
                                                </div>
                                                <p className="text-neutral-600 text-sm mb-3">
                                                    {doc.description}
                                                </p>
                                                <div className="flex items-center text-xs font-semibold text-primary-600">
                                                    Read more <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : query ? (
                            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 border-dashed">
                                <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-neutral-900 mb-2">No results found</h3>
                                <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                                    We couldn&apos;t find anything matching &quot;{query}&quot;. Try adjusting your search terms or exploring our popular categories.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <Link href="/knowledge/calculators" className="btn-outline text-sm">Browse Calculators</Link>
                                    <Link href="/services" className="btn-primary flex items-center gap-2 text-sm">
                                        Explore Services <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 border-dashed">
                                <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-neutral-900 mb-2">Search our website</h3>
                                <p className="text-neutral-500 max-w-md mx-auto">
                                    Use the search bar in the header or type above to find calculators, services, and knowledge articles.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-20 flex justify-center"><div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>}>
            <SearchResults />
        </Suspense>
    );
}
