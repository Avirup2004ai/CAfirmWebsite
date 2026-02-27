"use client";

import { useRef, useEffect, useState } from "react";
import { Printer } from "lucide-react";

interface ResultRow {
    label: string;
    value: string;
    highlight?: boolean;
    color?: "green" | "red" | "blue" | "primary";
}

export default function ResultSummary({ title, rows, id }: { title: string; rows: ResultRow[]; id?: string }) {
    return (
        <div id={id} className="mt-6 rounded-xl bg-primary-50 p-5 print:bg-white print:border print:border-neutral-200">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-primary-700">{title}</h2>
                <button onClick={() => window.print()} className="flex items-center gap-1 text-xs text-neutral-400 hover:text-primary-600 transition-colors print:hidden" aria-label="Print results">
                    <Printer size={13} /> Print
                </button>
            </div>
            <div className="space-y-2 text-sm">
                {rows.map((row, i) => {
                    const colorClass = row.color === "green" ? "text-green-700" : row.color === "red" ? "text-red-700" : row.color === "blue" ? "text-blue-700" : row.color === "primary" ? "text-primary-700" : "text-neutral-800";
                    return row.label === "---" ? (
                        <hr key={i} className="border-primary-200" />
                    ) : (
                        <div key={i} className={`flex justify-between ${row.highlight ? "font-semibold text-base" : ""}`}>
                            <span className={row.highlight ? colorClass : "text-neutral-600"}>{row.label}</span>
                            <AnimatedValue value={row.value} className={row.highlight ? `font-bold ${colorClass}` : "font-medium"} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function AnimatedValue({ value, className = "" }: { value: string; className?: string }) {
    const [display, setDisplay] = useState(value);
    const prev = useRef(value);

    useEffect(() => {
        if (prev.current !== value) {
            setDisplay(value);
            prev.current = value;
        }
    }, [value]);

    return <span className={`${className} transition-all duration-300`}>{display}</span>;
}
