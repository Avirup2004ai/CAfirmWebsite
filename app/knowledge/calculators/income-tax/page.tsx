"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AITooltip from "@/components/AITooltip";
import ResultSummary from "@/components/ResultSummary";
import { BarChart } from "@/components/CalculatorChart";

// FY 2025-26 slabs
const OLD_SLABS = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 },
];
const NEW_SLABS = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400000, max: 800000, rate: 5 },
    { min: 800000, max: 1200000, rate: 10 },
    { min: 1200000, max: 1600000, rate: 15 },
    { min: 1600000, max: 2000000, rate: 20 },
    { min: 2000000, max: 2400000, rate: 25 },
    { min: 2400000, max: Infinity, rate: 30 },
];

function calcTax(income: number, slabs: typeof OLD_SLABS) {
    let tax = 0;
    for (const slab of slabs) {
        if (income <= slab.min) break;
        const taxableInSlab = Math.min(income, slab.max) - slab.min;
        tax += (taxableInSlab * slab.rate) / 100;
    }
    return tax;
}

function calcSurcharge(tax: number, income: number) {
    if (income > 50000000) return tax * 0.25;
    if (income > 20000000) return tax * 0.25;
    if (income > 10000000) return tax * 0.15;
    if (income > 5000000) return tax * 0.10;
    return 0;
}

export default function IncomeTaxCalculatorPage() {
    const [gross, setGross] = useState("");
    const [ded80C, setDed80C] = useState("");
    const [ded80D, setDed80D] = useState("");
    const [hra, setHra] = useState("");
    const [otherDed, setOtherDed] = useState("");
    const [stdDed, setStdDed] = useState("75000");

    const income = parseFloat(gross) || 0;
    const total80C = Math.min(parseFloat(ded80C) || 0, 150000);
    const total80D = Math.min(parseFloat(ded80D) || 0, 100000);
    const totalHRA = parseFloat(hra) || 0;
    const totalOther = parseFloat(otherDed) || 0;
    const totalStd = parseFloat(stdDed) || 75000;

    // Old regime
    const oldDeductions = total80C + total80D + totalHRA + totalOther + totalStd;
    const oldTaxableIncome = Math.max(income - oldDeductions, 0);
    const oldTax = calcTax(oldTaxableIncome, OLD_SLABS);
    const oldSurcharge = calcSurcharge(oldTax, oldTaxableIncome);
    const oldCess = (oldTax + oldSurcharge) * 0.04;
    const oldTotal = oldTax + oldSurcharge + oldCess;
    // Rebate u/s 87A for old regime (income up to 5L)
    const oldAfterRebate = oldTaxableIncome <= 500000 ? 0 : oldTotal;

    // New regime (only standard deduction of ₹75,000)
    const newTaxableIncome = Math.max(income - 75000, 0);
    const newTax = calcTax(newTaxableIncome, NEW_SLABS);
    const newSurcharge = calcSurcharge(newTax, newTaxableIncome);
    const newCess = (newTax + newSurcharge) * 0.04;
    const newTotal = newTax + newSurcharge + newCess;
    // Rebate u/s 87A for new regime (income up to ₹12L, marginal relief up to ₹12.75L)
    const newAfterRebate = newTaxableIncome <= 1200000 ? 0 : newTotal;

    const savings = newAfterRebate - oldAfterRebate;
    const betterRegime = oldAfterRebate <= newAfterRebate ? "Old Regime" : "New Regime";

    const hasResult = income > 0;

    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators", href: "/knowledge/calculators" }, { label: "Income Tax Calculator" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">Income Tax Calculator India FY 2025-26</h1>
                    <p className="mt-3 text-neutral-600">Compare your tax liability under Old and New regimes with slab-wise breakdown.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-2xl">
                    <div className="card">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Gross Annual Income (₹) <AITooltip text="Your total annual income including salary, house property income, capital gains, and other sources." />
                                </label>
                                <input type="number" value={gross} onChange={(e) => setGross(e.target.value)} placeholder="e.g. 1200000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pt-2">Deductions (Old Regime Only)</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        80C <AITooltip text="Investments in PPF, ELSS, NSC, life insurance, tuition fees, etc. Max ₹1.5 lakh." />
                                    </label>
                                    <input type="number" value={ded80C} onChange={(e) => setDed80C(e.target.value)} placeholder="Max 1,50,000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        80D <AITooltip text="Medical insurance premiums — ₹25K for self, ₹50K for senior citizen parents." />
                                    </label>
                                    <input type="number" value={ded80D} onChange={(e) => setDed80D(e.target.value)} placeholder="Max 1,00,000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        HRA Exemption <AITooltip text="HRA exemption under Section 10(13A). Use our HRA calculator to compute this." />
                                    </label>
                                    <input type="number" value={hra} onChange={(e) => setHra(e.target.value)} placeholder="₹" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        Other Deductions <AITooltip text="NPS (80CCD), home loan interest (24b), education loan (80E), donations (80G), etc." />
                                    </label>
                                    <input type="number" value={otherDed} onChange={(e) => setOtherDed(e.target.value)} placeholder="₹" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                                </div>
                            </div>
                        </div>

                        {hasResult && (
                            <div className="mt-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ResultSummary
                                        title="Old Regime"
                                        rows={[
                                            { label: "Gross Income", value: `₹${income.toLocaleString("en-IN")}` },
                                            { label: "Total Deductions", value: `₹${oldDeductions.toLocaleString("en-IN")}`, color: "green" },
                                            { label: "Taxable Income", value: `₹${oldTaxableIncome.toLocaleString("en-IN")}` },
                                            { label: "---", value: "" },
                                            { label: "Tax Payable", value: `₹${Math.round(oldAfterRebate).toLocaleString("en-IN")}`, highlight: true, color: "red" },
                                        ]}
                                    />
                                    <ResultSummary
                                        title="New Regime"
                                        rows={[
                                            { label: "Gross Income", value: `₹${income.toLocaleString("en-IN")}` },
                                            { label: "Standard Deduction", value: "₹75,000", color: "green" },
                                            { label: "Taxable Income", value: `₹${newTaxableIncome.toLocaleString("en-IN")}` },
                                            { label: "---", value: "" },
                                            { label: "Tax Payable", value: `₹${Math.round(newAfterRebate).toLocaleString("en-IN")}`, highlight: true, color: "red" },
                                        ]}
                                    />
                                </div>
                                <div className={`text-center py-3 px-4 rounded-lg text-sm font-semibold ${oldAfterRebate <= newAfterRebate ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}`}>
                                    ✅ {betterRegime} saves you ₹{Math.abs(Math.round(savings)).toLocaleString("en-IN")} more
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-sm font-semibold text-neutral-700 mb-3">📊 Tax Comparison</h3>
                                    <BarChart
                                        data={[
                                            { label: "Old Regime Tax", value: Math.round(oldAfterRebate), color: "#3b82f6" },
                                            { label: "New Regime Tax", value: Math.round(newAfterRebate), color: "#10b981" },
                                            { label: "Old Take-Home", value: Math.round(income - oldAfterRebate), color: "#6366f1" },
                                            { label: "New Take-Home", value: Math.round(income - newAfterRebate), color: "#14b8a6" },
                                        ]}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 prose prose-sm max-w-none">
                        <h2 className="text-xl font-bold text-neutral-900 font-heading">Income Tax Calculator – Old vs New Regime</h2>
                        <p className="text-neutral-600">This income tax calculator compares your tax liability under both the Old and New tax regimes for FY 2025-26 (AY 2026-27). The New regime under Section 115BAC offers lower slab rates but limits most deductions. The Old regime allows deductions under 80C, 80D, HRA, 24(b), and others.</p>
                        <p className="text-neutral-600">The calculator automatically applies the standard deduction (₹75,000 for new regime), computes surcharge for high-income earners, adds 4% Health & Education Cess, and applies rebate under Section 87A where applicable.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
