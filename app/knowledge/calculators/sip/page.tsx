"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AITooltip from "@/components/AITooltip";
import ResultSummary from "@/components/ResultSummary";
import { LineChart } from "@/components/CalculatorChart";

export default function SIPCalculatorPage() {
    const [monthly, setMonthly] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");

    const P = parseFloat(monthly) || 0;
    const annualRate = parseFloat(rate) || 0;
    const n = (parseFloat(years) || 0) * 12;
    const r = annualRate / 12 / 100;

    const invested = P * n;
    const futureValue = r > 0 && n > 0 ? P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : invested;
    const returns = futureValue - invested;

    // Year-wise data for chart
    const chartData = [];
    const totalYears = parseFloat(years) || 0;
    for (let y = 1; y <= totalYears; y++) {
        const months = y * 12;
        const fv = r > 0 ? P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r) : P * months;
        chartData.push({ label: `Yr ${y}`, value: Math.round(fv) });
    }

    const hasResult = P > 0 && n > 0;

    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators", href: "/knowledge/calculators" }, { label: "SIP Calculator" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">SIP Calculator India</h1>
                    <p className="mt-3 text-neutral-600">Calculate your mutual fund SIP returns and project future corpus with year-wise growth.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-2xl">
                    <div className="card">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Monthly SIP Amount (₹) <AITooltip text="The fixed amount you invest every month in a mutual fund SIP." />
                                </label>
                                <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="e.g. 5000" min="100" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Expected Annual Return (%) <AITooltip text="The estimated annual return rate. Equity mutual funds in India have historically delivered 12-15% CAGR." />
                                </label>
                                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 12" min="1" max="50" step="0.5" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Investment Period (Years) <AITooltip text="The number of years you plan to continue investing. Longer tenure benefits from compounding." />
                                </label>
                                <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 10" min="1" max="40" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                        </div>

                        {hasResult && (
                            <>
                                <ResultSummary
                                    title="SIP Projection"
                                    rows={[
                                        { label: "Total Amount Invested", value: `₹${invested.toLocaleString("en-IN")}` },
                                        { label: "Estimated Returns", value: `₹${Math.round(returns).toLocaleString("en-IN")}`, color: "green" },
                                        { label: "---", value: "" },
                                        { label: "Future Corpus Value", value: `₹${Math.round(futureValue).toLocaleString("en-IN")}`, highlight: true, color: "primary" },
                                    ]}
                                />
                                {chartData.length > 1 && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-neutral-700 mb-3">📈 Year-wise Corpus Growth</h3>
                                        <LineChart data={chartData} color="#2563eb" />
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="mt-8 prose prose-sm max-w-none">
                        <h2 className="text-xl font-bold text-neutral-900 font-heading">About SIP Calculator</h2>
                        <p className="text-neutral-600">A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds. This SIP calculator uses the standard future value formula: <strong>FV = P × [((1 + r)^n − 1) / r] × (1 + r)</strong>, where P is the monthly amount, r is the periodic rate, and n is the total periods.</p>
                        <p className="text-neutral-600">SIP investing benefits from rupee cost averaging and the power of compounding. Starting early and staying invested for longer periods significantly amplifies wealth creation. Equity mutual funds in India have historically delivered 12–15% CAGR over 10+ year periods.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
