"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AITooltip from "@/components/AITooltip";
import ResultSummary from "@/components/ResultSummary";
import { BarChart } from "@/components/CalculatorChart";

export default function CapitalGainsCalculatorPage() {
    const [purchasePrice, setPurchasePrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [holdingMonths, setHoldingMonths] = useState("");
    const [assetType, setAssetType] = useState<"equity" | "debt" | "property">("equity");

    const purchase = parseFloat(purchasePrice) || 0;
    const sale = parseFloat(salePrice) || 0;
    const months = parseFloat(holdingMonths) || 0;
    const gain = sale - purchase;

    // Holding period thresholds for LTCG
    const ltcgThresholds: Record<string, number> = { equity: 12, debt: 36, property: 24 };
    const isLTCG = months >= ltcgThresholds[assetType];
    const gainType = isLTCG ? "Long Term (LTCG)" : "Short Term (STCG)";

    // Tax rates (FY 2025-26 post July 2024 budget)
    let taxRate = 0;
    let exemptionLimit = 0;
    if (assetType === "equity") {
        if (isLTCG) { taxRate = 12.5; exemptionLimit = 125000; }
        else { taxRate = 20; }
    } else if (assetType === "debt") {
        taxRate = isLTCG ? 20 : 30; // Debt LTCG at slab (using 30% as high bracket), STCG at slab
    } else {
        taxRate = isLTCG ? 12.5 : 30; // Property LTCG 12.5% (post-budget), STCG at slab
    }

    const taxableGain = Math.max(gain - exemptionLimit, 0);
    const tax = (taxableGain * taxRate) / 100;
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const netGain = gain - totalTax;

    const hasResult = sale > 0 && purchase > 0;

    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators", href: "/knowledge/calculators" }, { label: "Capital Gains Calculator" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">Capital Gains Tax Calculator India</h1>
                    <p className="mt-3 text-neutral-600">Calculate LTCG/STCG tax on equity, debt, and property investments.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-2xl">
                    <div className="card">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Asset Type <AITooltip text="Equity: listed shares/equity MFs. Debt: bonds/debt MFs. Property: real estate. Each has different LTCG holding periods and tax rates." />
                                </label>
                                <select value={assetType} onChange={(e) => setAssetType(e.target.value as typeof assetType)} className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none">
                                    <option value="equity">Equity (Shares / Equity Mutual Funds)</option>
                                    <option value="debt">Debt (Bonds / Debt Mutual Funds)</option>
                                    <option value="property">Property (Real Estate)</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">Purchase Price (₹)</label>
                                    <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="e.g. 100000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">Sale Price (₹)</label>
                                    <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="e.g. 200000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Holding Period (Months) <AITooltip text={`LTCG threshold: Equity = 12 months, Property = 24 months, Debt = 36 months.`} />
                                </label>
                                <input type="number" value={holdingMonths} onChange={(e) => setHoldingMonths(e.target.value)} placeholder="e.g. 18" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                        </div>

                        {hasResult && (
                            <>
                                <div className={`mt-4 text-center py-2 px-3 rounded-lg text-xs font-semibold ${isLTCG ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}>
                                    {gainType} — Holding: {months} months (threshold: {ltcgThresholds[assetType]} months for {assetType})
                                </div>
                                <ResultSummary
                                    title="Capital Gains Computation"
                                    rows={[
                                        { label: "Capital Gain", value: `₹${gain.toLocaleString("en-IN")}`, color: gain >= 0 ? "green" : "red" },
                                        ...(exemptionLimit > 0 ? [{ label: `Exemption (₹${exemptionLimit.toLocaleString("en-IN")})`, value: `−₹${Math.min(exemptionLimit, gain).toLocaleString("en-IN")}`, color: "green" as const }] : []),
                                        { label: "Taxable Gain", value: `₹${taxableGain.toLocaleString("en-IN")}` },
                                        { label: `Tax Rate (${gainType})`, value: `${taxRate}%` },
                                        { label: "---", value: "" },
                                        { label: "Tax + Cess", value: `₹${Math.round(totalTax).toLocaleString("en-IN")}`, highlight: true, color: "red" },
                                        { label: "Net Gain After Tax", value: `₹${Math.round(netGain).toLocaleString("en-IN")}`, highlight: true, color: "green" },
                                    ]}
                                />
                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-neutral-700 mb-3">📊 Gain vs Tax</h3>
                                    <BarChart data={[
                                        { label: "Total Gain", value: Math.max(gain, 0), color: "#3b82f6" },
                                        { label: "Tax Payable", value: Math.round(totalTax), color: "#ef4444" },
                                        { label: "Net Gain", value: Math.max(Math.round(netGain), 0), color: "#10b981" },
                                    ]} />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-8 prose prose-sm max-w-none">
                        <h2 className="text-xl font-bold text-neutral-900 font-heading">Capital Gains Tax Rules in India</h2>
                        <p className="text-neutral-600">Capital gains tax in India depends on the type of asset and holding period. Post Union Budget 2024, listed equity LTCG (held &gt;12 months) is taxed at 12.5% above ₹1.25 lakh exemption. STCG on equity is 20%. Property LTCG (held &gt;24 months) is 12.5% without indexation. Debt LTCG (held &gt;36 months) is taxed at slab rates since 2023.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
