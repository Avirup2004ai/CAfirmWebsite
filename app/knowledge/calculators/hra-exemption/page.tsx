"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AITooltip from "@/components/AITooltip";
import ResultSummary from "@/components/ResultSummary";
import { BarChart } from "@/components/CalculatorChart";

export default function HRACalculatorPage() {
    const [basicSalary, setBasicSalary] = useState("");
    const [hraReceived, setHraReceived] = useState("");
    const [rentPaid, setRentPaid] = useState("");
    const [isMetro, setIsMetro] = useState(true);

    const basic = parseFloat(basicSalary) || 0;
    const hra = parseFloat(hraReceived) || 0;
    const rent = parseFloat(rentPaid) || 0;
    const metroPercent = isMetro ? 50 : 40;

    const option1 = hra;
    const option2 = (basic * metroPercent) / 100;
    const option3 = Math.max(rent - basic * 0.1, 0);
    const exempt = Math.min(option1, option2, option3);
    const taxable = Math.max(hra - exempt, 0);

    const hasResult = basic > 0;

    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators", href: "/knowledge/calculators" }, { label: "HRA Exemption" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">HRA Exemption Calculator India</h1>
                    <p className="mt-3 text-neutral-600">Calculate your House Rent Allowance exemption under Section 10(13A) of the Income Tax Act.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-2xl">
                    <div className="card">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Basic Salary (Annual ₹) <AITooltip text="Your annual basic salary component, excluding DA, HRA, and other allowances." />
                                </label>
                                <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} placeholder="e.g. 600000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    HRA Received (Annual ₹) <AITooltip text="The actual HRA component you receive as part of your salary." />
                                </label>
                                <input type="number" value={hraReceived} onChange={(e) => setHraReceived(e.target.value)} placeholder="e.g. 240000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Rent Paid (Annual ₹) <AITooltip text="Total rent paid during the year. You need rent receipts as proof for claiming HRA exemption." />
                                </label>
                                <input type="number" value={rentPaid} onChange={(e) => setRentPaid(e.target.value)} placeholder="e.g. 180000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    City <AITooltip text="Metro cities (Delhi, Mumbai, Chennai, Kolkata) get 50% of basic. Non-metro cities get 40%." />
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 text-sm"><input type="radio" checked={isMetro} onChange={() => setIsMetro(true)} /> Metro (50%)</label>
                                    <label className="flex items-center gap-2 text-sm"><input type="radio" checked={!isMetro} onChange={() => setIsMetro(false)} /> Non-Metro (40%)</label>
                                </div>
                            </div>
                        </div>
                        {hasResult && (
                            <>
                                <ResultSummary
                                    title="HRA Exemption Calculation"
                                    rows={[
                                        { label: "1. Actual HRA received", value: `₹${option1.toLocaleString("en-IN")}` },
                                        { label: `2. ${metroPercent}% of Basic Salary`, value: `₹${option2.toLocaleString("en-IN")}` },
                                        { label: "3. Rent paid − 10% of Basic", value: `₹${option3.toLocaleString("en-IN")}` },
                                        { label: "---", value: "" },
                                        { label: "HRA Exempt (Minimum of above)", value: `₹${exempt.toLocaleString("en-IN")}`, highlight: true, color: "green" },
                                        { label: "HRA Taxable", value: `₹${taxable.toLocaleString("en-IN")}`, highlight: true, color: "red" },
                                    ]}
                                />
                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-neutral-700 mb-3">📊 Comparison of 3 Methods</h3>
                                    <BarChart data={[
                                        { label: "Actual HRA", value: option1, color: "#3b82f6" },
                                        { label: `${metroPercent}% Basic`, value: option2, color: "#6366f1" },
                                        { label: "Rent−10% Basic", value: option3, color: "#8b5cf6" },
                                    ]} />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-8 prose prose-sm max-w-none">
                        <h2 className="text-xl font-bold text-neutral-900 font-heading">About HRA Exemption</h2>
                        <p className="text-neutral-600">Under Section 10(13A) of the Income Tax Act, salaried individuals receiving HRA can claim exemption. The exempt amount is the <strong>minimum</strong> of: (a) actual HRA received, (b) 50% of basic salary for metro cities or 40% for non-metro cities, and (c) actual rent paid minus 10% of basic salary. This exemption is only available under the Old Tax Regime.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
