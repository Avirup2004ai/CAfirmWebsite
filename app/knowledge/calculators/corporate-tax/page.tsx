"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AITooltip from "@/components/AITooltip";
import ResultSummary from "@/components/ResultSummary";
import { BarChart } from "@/components/CalculatorChart";

export default function CorporateTaxCalculatorPage() {
    const [revenue, setRevenue] = useState("");
    const [deductions, setDeductions] = useState("");
    const [companyType, setCompanyType] = useState<"normal" | "115BAA" | "115BAB" | "msme">("115BAA");

    const totalRevenue = parseFloat(revenue) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    const taxableIncome = Math.max(totalRevenue - totalDeductions, 0);

    const rates: Record<string, { rate: number; surchargeThresholds: [number, number][]; label: string }> = {
        normal: { rate: 30, surchargeThresholds: [[10000000, 7], [100000000, 12]], label: "Normal (30%)" },
        "115BAA": { rate: 22, surchargeThresholds: [[0, 10]], label: "Section 115BAA (22%)" },
        "115BAB": { rate: 15, surchargeThresholds: [[0, 10]], label: "Section 115BAB (15%) – New Mfg" },
        msme: { rate: 25, surchargeThresholds: [[10000000, 7], [100000000, 12]], label: "MSME / Turnover < ₹400Cr (25%)" },
    };

    const config = rates[companyType];
    const baseTax = (taxableIncome * config.rate) / 100;

    let surchargeRate = 0;
    for (const [threshold, rate] of config.surchargeThresholds) {
        if (taxableIncome > threshold) surchargeRate = rate;
    }
    const surcharge = (baseTax * surchargeRate) / 100;
    const cess = (baseTax + surcharge) * 0.04;
    const totalTax = baseTax + surcharge + cess;
    const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;
    const netIncome = taxableIncome - totalTax;

    const hasResult = totalRevenue > 0;

    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators", href: "/knowledge/calculators" }, { label: "Corporate Tax Calculator" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">Corporate Tax Calculator India</h1>
                    <p className="mt-3 text-neutral-600">Calculate corporate tax liability with surcharge, cess, and effective tax rate for FY 2025-26.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-2xl">
                    <div className="card">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Company Type <AITooltip text="Section 115BAA (22%) is for companies opting out of exemptions. 115BAB (15%) is for new manufacturing companies. MSME rate (25%) applies for turnover up to ₹400Cr." />
                                </label>
                                <select value={companyType} onChange={(e) => setCompanyType(e.target.value as typeof companyType)} className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none">
                                    {Object.entries(rates).map(([key, val]) => (
                                        <option key={key} value={key}>{val.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Total Income / Revenue (₹) <AITooltip text="Gross total income of the company before deductions." />
                                </label>
                                <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="e.g. 50000000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Allowed Deductions / Expenses (₹) <AITooltip text="Business expenses, depreciation, and deductions allowed under the Income Tax Act." />
                                </label>
                                <input type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} placeholder="e.g. 20000000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                        </div>

                        {hasResult && (
                            <>
                                <ResultSummary
                                    title="Corporate Tax Computation"
                                    rows={[
                                        { label: "Taxable Income", value: `₹${taxableIncome.toLocaleString("en-IN")}` },
                                        { label: `Base Tax (${config.rate}%)`, value: `₹${Math.round(baseTax).toLocaleString("en-IN")}` },
                                        { label: `Surcharge (${surchargeRate}%)`, value: `₹${Math.round(surcharge).toLocaleString("en-IN")}` },
                                        { label: "Health & Education Cess (4%)", value: `₹${Math.round(cess).toLocaleString("en-IN")}` },
                                        { label: "---", value: "" },
                                        { label: "Total Tax Payable", value: `₹${Math.round(totalTax).toLocaleString("en-IN")}`, highlight: true, color: "red" },
                                        { label: `Effective Tax Rate`, value: `${effectiveRate.toFixed(2)}%`, color: "blue" },
                                        { label: "Net Income After Tax", value: `₹${Math.round(netIncome).toLocaleString("en-IN")}`, highlight: true, color: "green" },
                                    ]}
                                />
                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-neutral-700 mb-3">📊 Tax vs Net Income</h3>
                                    <BarChart data={[
                                        { label: "Total Tax", value: Math.round(totalTax), color: "#ef4444" },
                                        { label: "Net Income", value: Math.round(netIncome), color: "#10b981" },
                                    ]} />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-8 prose prose-sm max-w-none">
                        <h2 className="text-xl font-bold text-neutral-900 font-heading">About Corporate Tax in India</h2>
                        <p className="text-neutral-600">Indian corporate tax rates vary based on company type and applicable regime. Companies under Section 115BAA pay a flat 22% (effective ~25.17% with surcharge & cess) by forgoing exemptions. New manufacturing companies under Section 115BAB pay 15% (effective ~17.16%). MSMEs with turnover up to ₹400 crore pay 25%.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
