"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AITooltip from "@/components/AITooltip";
import ResultSummary from "@/components/ResultSummary";
import { LineChart, BarChart } from "@/components/CalculatorChart";

export default function FDRDCalculatorPage() {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [taxBracket, setTaxBracket] = useState("30");
    const [type, setType] = useState<"fd" | "rd">("fd");

    const P = parseFloat(principal) || 0;
    const annualRate = parseFloat(rate) || 0;
    const years = parseFloat(tenure) || 0;
    const taxRate = parseFloat(taxBracket);

    let totalInterest = 0;
    let maturityAmount = 0;
    const chartData: { label: string; value: number }[] = [];

    if (type === "fd") {
        // FD: Compound interest quarterly
        maturityAmount = P * Math.pow(1 + annualRate / 400, years * 4);
        totalInterest = maturityAmount - P;
        for (let y = 1; y <= years; y++) {
            const val = P * Math.pow(1 + annualRate / 400, y * 4);
            chartData.push({ label: `Yr ${y}`, value: Math.round(val) });
        }
    } else {
        // RD: Monthly deposits
        const months = years * 12;
        const r = annualRate / 400; // quarterly rate
        // Approximate RD maturity: sum of each month's compound interest
        let total = 0;
        for (let m = 1; m <= months; m++) {
            const remainingQuarters = ((months - m + 1) / 3);
            total += P * Math.pow(1 + r, remainingQuarters);
        }
        maturityAmount = total;
        totalInterest = maturityAmount - (P * months);
        for (let y = 1; y <= years; y++) {
            const m = y * 12;
            let val = 0;
            for (let i = 1; i <= m; i++) {
                val += P * Math.pow(1 + r, ((m - i + 1) / 3));
            }
            chartData.push({ label: `Yr ${y}`, value: Math.round(val) });
        }
    }

    const taxOnInterest = (totalInterest * taxRate) / 100;
    const netInterest = totalInterest - taxOnInterest;
    const netMaturity = maturityAmount - taxOnInterest;
    const effectiveReturn = P > 0 && years > 0 ? ((netMaturity / (type === "fd" ? P : P * years * 12)) - 1) * 100 / years : 0;

    const hasResult = P > 0 && years > 0 && annualRate > 0;

    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators", href: "/knowledge/calculators" }, { label: "FD/RD Calculator" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">FD / RD Tax Impact Calculator India</h1>
                    <p className="mt-3 text-neutral-600">Compare pre-tax and post-tax returns on Fixed Deposits and Recurring Deposits.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-2xl">
                    <div className="card">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">Deposit Type</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 text-sm"><input type="radio" checked={type === "fd"} onChange={() => setType("fd")} className="text-primary-500" /> Fixed Deposit (FD)</label>
                                    <label className="flex items-center gap-2 text-sm"><input type="radio" checked={type === "rd"} onChange={() => setType("rd")} className="text-primary-500" /> Recurring Deposit (RD)</label>
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    {type === "fd" ? "Deposit Amount (₹)" : "Monthly Deposit (₹)"} <AITooltip text={type === "fd" ? "One-time lump sum amount deposited." : "Amount deposited every month."} />
                                </label>
                                <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g. 100000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        Interest Rate (% p.a.) <AITooltip text="Annual interest rate offered by the bank. FD rates typically range from 6-7.5% in India." />
                                    </label>
                                    <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 7" step="0.1" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">Tenure (Years)</label>
                                    <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="e.g. 5" min="1" max="20" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Your Tax Bracket <AITooltip text="Interest earned on FD/RD is fully taxable as 'Income from Other Sources' at your slab rate." />
                                </label>
                                <select value={taxBracket} onChange={(e) => setTaxBracket(e.target.value)} className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none">
                                    <option value="0">0% (No Tax)</option>
                                    <option value="5">5%</option>
                                    <option value="10">10%</option>
                                    <option value="15">15%</option>
                                    <option value="20">20%</option>
                                    <option value="30">30%</option>
                                </select>
                            </div>
                        </div>

                        {hasResult && (
                            <>
                                <ResultSummary
                                    title={`${type === "fd" ? "Fixed Deposit" : "Recurring Deposit"} Analysis`}
                                    rows={[
                                        { label: type === "fd" ? "Principal" : "Total Deposited", value: `₹${(type === "fd" ? P : P * years * 12).toLocaleString("en-IN", { maximumFractionDigits: 0 })}` },
                                        { label: "Gross Interest Earned", value: `₹${Math.round(totalInterest).toLocaleString("en-IN")}`, color: "blue" },
                                        { label: `Tax on Interest (${taxRate}%)`, value: `₹${Math.round(taxOnInterest).toLocaleString("en-IN")}`, color: "red" },
                                        { label: "Net Interest After Tax", value: `₹${Math.round(netInterest).toLocaleString("en-IN")}`, color: "green" },
                                        { label: "---", value: "" },
                                        { label: "Maturity Amount (Pre-Tax)", value: `₹${Math.round(maturityAmount).toLocaleString("en-IN")}` },
                                        { label: "Maturity Amount (Post-Tax)", value: `₹${Math.round(netMaturity).toLocaleString("en-IN")}`, highlight: true, color: "primary" },
                                    ]}
                                />
                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-neutral-700 mb-3">📊 Pre-Tax vs Post-Tax</h3>
                                    <BarChart data={[
                                        { label: "Gross Interest", value: Math.round(totalInterest), color: "#3b82f6" },
                                        { label: "Tax", value: Math.round(taxOnInterest), color: "#ef4444" },
                                        { label: "Net Interest", value: Math.round(netInterest), color: "#10b981" },
                                    ]} />
                                </div>
                                {chartData.length > 1 && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-neutral-700 mb-3">📈 Year-wise Growth</h3>
                                        <LineChart data={chartData} color="#6366f1" />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="mt-8 prose prose-sm max-w-none">
                        <h2 className="text-xl font-bold text-neutral-900 font-heading">FD/RD Tax Impact</h2>
                        <p className="text-neutral-600">Interest earned on Fixed Deposits and Recurring Deposits is fully taxable in India under &ldquo;Income from Other Sources&rdquo; at your applicable slab rate. Banks deduct TDS at 10% if interest exceeds ₹40,000 (₹50,000 for senior citizens) per year. The actual tax liability depends on your total income and applicable tax slab.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
