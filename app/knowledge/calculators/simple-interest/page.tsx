"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AITooltip from "@/components/AITooltip";
import ResultSummary from "@/components/ResultSummary";
import { LineChart, BarChart } from "@/components/CalculatorChart";

export default function SimpleInterestPage() {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");

    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(years) || 0;

    const si = (p * r * t) / 100;
    const totalSI = p + si;
    const ci = p * Math.pow(1 + r / 100, t) - p;
    const totalCI = p + ci;
    const monthlyRate = r / 12 / 100;
    const months = t * 12;
    const emi = months > 0 && monthlyRate > 0 ? (p * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1) : 0;

    // Year-wise chart data
    const chartData = [];
    for (let y = 1; y <= t; y++) {
        chartData.push({ label: `Yr ${y}`, value: Math.round(p * Math.pow(1 + r / 100, y)) });
    }

    const hasResult = p > 0 && t > 0;

    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators", href: "/knowledge/calculators" }, { label: "SI / CI / EMI Calculator" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">Simple Interest / Compound Interest / EMI Calculator</h1>
                    <p className="mt-3 text-neutral-600">Calculate simple interest, compound interest, and estimated EMI for loans in one place.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-2xl">
                    <div className="card">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Principal Amount (₹) <AITooltip text="The initial amount of money you are investing or borrowing." />
                                </label>
                                <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g. 100000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Rate of Interest (% p.a.) <AITooltip text="The annual interest rate. E.g., bank FDs offer 6-7%, home loans are 8-9%." />
                                </label>
                                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 8" step="0.1" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Time Period (Years) <AITooltip text="Duration of the investment or loan in years." />
                                </label>
                                <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 5" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                        </div>

                        {hasResult && (
                            <div className="mt-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ResultSummary
                                        title="Simple Interest"
                                        rows={[
                                            { label: "Interest Earned", value: `₹${si.toFixed(2)}`, color: "blue" },
                                            { label: "Total Amount", value: `₹${totalSI.toFixed(2)}`, highlight: true, color: "primary" },
                                        ]}
                                    />
                                    <ResultSummary
                                        title="Compound Interest"
                                        rows={[
                                            { label: "Interest Earned", value: `₹${ci.toFixed(2)}`, color: "green" },
                                            { label: "Total Amount", value: `₹${totalCI.toFixed(2)}`, highlight: true, color: "primary" },
                                        ]}
                                    />
                                </div>
                                {emi > 0 && (
                                    <ResultSummary
                                        title="EMI (Equal Monthly Installment)"
                                        rows={[
                                            { label: "Monthly EMI", value: `₹${emi.toFixed(2)}`, highlight: true, color: "primary" },
                                            { label: "Total Payment", value: `₹${(emi * months).toFixed(2)}` },
                                            { label: "Total Interest", value: `₹${(emi * months - p).toFixed(2)}`, color: "red" },
                                        ]}
                                    />
                                )}
                                <div>
                                    <h3 className="text-sm font-semibold text-neutral-700 mb-3">📊 SI vs CI Comparison</h3>
                                    <BarChart data={[
                                        { label: "SI Interest", value: Math.round(si), color: "#3b82f6" },
                                        { label: "CI Interest", value: Math.round(ci), color: "#10b981" },
                                        { label: "SI Total", value: Math.round(totalSI), color: "#6366f1" },
                                        { label: "CI Total", value: Math.round(totalCI), color: "#14b8a6" },
                                    ]} />
                                </div>
                                {chartData.length > 1 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-neutral-700 mb-3">📈 CI Growth Over Time</h3>
                                        <LineChart data={chartData} color="#10b981" />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
