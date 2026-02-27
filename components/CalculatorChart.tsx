"use client";

import { useEffect, useState, useRef } from "react";

/* ── Pie Chart ── */
export function PieChart({ data, size = 200 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
    const [animated, setAnimated] = useState(false);
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const total = data.reduce((s, d) => s + d.value, 0);
    if (total === 0) return null;
    const r = size / 2;
    const cx = r, cy = r;
    const radius = r - 10;
    let cumAngle = -90;

    const slices = data.map((d) => {
        const angle = (d.value / total) * 360;
        const startRad = (cumAngle * Math.PI) / 180;
        const endRad = ((cumAngle + angle) * Math.PI) / 180;
        const x1 = cx + radius * Math.cos(startRad);
        const y1 = cy + radius * Math.sin(startRad);
        const x2 = cx + radius * Math.cos(endRad);
        const y2 = cy + radius * Math.sin(endRad);
        const largeArc = angle > 180 ? 1 : 0;
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        cumAngle += angle;
        return { ...d, path, pct: ((d.value / total) * 100).toFixed(1) };
    });

    return (
        <div className="flex flex-col items-center gap-4">
            <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`transition-transform duration-700 ${animated ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} aria-label="Pie chart">
                {slices.map((s, i) => (
                    <path key={i} d={s.path} fill={s.color} className="transition-all duration-500" style={{ transitionDelay: `${i * 100}ms` }} opacity={animated ? 1 : 0}>
                        <title>{s.label}: ₹{s.value.toLocaleString("en-IN")} ({s.pct}%)</title>
                    </path>
                ))}
            </svg>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                {slices.map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-600">
                        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                        {s.label} ({s.pct}%)
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Bar Chart ── */
export function BarChart({ data, height = 200 }: { data: { label: string; value: number; color: string }[]; height?: number }) {
    const [animated, setAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const max = Math.max(...data.map((d) => d.value), 1);

    return (
        <div ref={ref} className="w-full" aria-label="Bar chart">
            <div className="flex items-end justify-center gap-3" style={{ height }}>
                {data.map((d, i) => {
                    const pct = (d.value / max) * 100;
                    return (
                        <div key={i} className="flex flex-col items-center gap-1 flex-1 max-w-[80px]">
                            <span className="text-xs font-medium text-neutral-700">₹{d.value >= 100000 ? `${(d.value / 100000).toFixed(1)}L` : d.value.toLocaleString("en-IN")}</span>
                            <div
                                className="w-full rounded-t-md transition-all duration-700 ease-out"
                                style={{ height: animated ? `${Math.max(pct, 4)}%` : "0%", backgroundColor: d.color, transitionDelay: `${i * 120}ms` }}
                            />
                            <span className="text-[10px] text-neutral-500 text-center leading-tight mt-1">{d.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ── Line Chart ── */
export function LineChart({ data, height = 200, color = "#2563eb" }: { data: { label: string; value: number }[]; height?: number; color?: string }) {
    const [animated, setAnimated] = useState(false);
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    if (data.length < 2) return null;
    const width = 400;
    const pad = 40;
    const chartW = width - pad * 2;
    const chartH = height - pad * 2;
    const max = Math.max(...data.map((d) => d.value), 1);
    const min = 0;
    const range = max - min || 1;

    const points = data.map((d, i) => ({
        x: pad + (i / (data.length - 1)) * chartW,
        y: pad + chartH - ((d.value - min) / range) * chartH,
        ...d,
    }));

    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaD = `${pathD} L ${points[points.length - 1].x} ${pad + chartH} L ${points[0].x} ${pad + chartH} Z`;
    const pathLength = points.reduce((sum, p, i) => {
        if (i === 0) return 0;
        return sum + Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y);
    }, 0);

    return (
        <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ maxHeight: height }} aria-label="Line chart">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
                const y = pad + chartH - pct * chartH;
                const val = min + pct * range;
                return (
                    <g key={pct}>
                        <line x1={pad} y1={y} x2={pad + chartW} y2={y} stroke="#e5e7eb" strokeWidth={1} />
                        <text x={pad - 5} y={y + 3} textAnchor="end" className="fill-neutral-400" fontSize={9}>
                            {val >= 100000 ? `${(val / 100000).toFixed(0)}L` : val >= 1000 ? `${(val / 1000).toFixed(0)}K` : val.toFixed(0)}
                        </text>
                    </g>
                );
            })}
            {/* X labels */}
            {points.filter((_, i) => data.length <= 10 || i % Math.ceil(data.length / 8) === 0 || i === data.length - 1).map((p, i) => (
                <text key={i} x={p.x} y={pad + chartH + 14} textAnchor="middle" className="fill-neutral-500" fontSize={9}>{p.label}</text>
            ))}
            {/* Area fill */}
            <path d={areaD} fill={color} opacity={animated ? 0.08 : 0} className="transition-opacity duration-1000" />
            {/* Line */}
            <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLength}
                strokeDashoffset={animated ? 0 : pathLength}
                style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
            />
            {/* Dots */}
            {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={3} fill="white" stroke={color} strokeWidth={2} opacity={animated ? 1 : 0} style={{ transition: `opacity 0.3s ${i * 100}ms` }}>
                    <title>{p.label}: ₹{p.value.toLocaleString("en-IN")}</title>
                </circle>
            ))}
        </svg>
    );
}
