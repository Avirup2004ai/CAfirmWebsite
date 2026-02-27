"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AITooltip from "@/components/AITooltip";
import ResultSummary from "@/components/ResultSummary";
import { PieChart } from "@/components/CalculatorChart";

export default function GSTCalculatorPage() {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("18");
    const [type, setType] = useState<"exclusive" | "inclusive">("exclusive");
    const [supplyType, setSupplyType] = useState<"intra" | "inter">("intra");

    const numAmount = parseFloat(amount) || 0;
    const numRate = parseFloat(rate);
    let baseAmount: number, gstAmount: number, totalAmount: number;

    if (type === "exclusive") {
        baseAmount = numAmount;
        gstAmount = (numAmount * numRate) / 100;
        totalAmount = numAmount + gstAmount;
    } else {
        totalAmount = numAmount;
        baseAmount = (numAmount * 100) / (100 + numRate);
        gstAmount = totalAmount - baseAmount;
    }

    const isInter = supplyType === "inter";
    const hasResult = numAmount > 0;

    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators", href: "/knowledge/calculators" }, { label: "GST Calculator" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">GST Calculator India</h1>
                    <p className="mt-3 text-neutral-600">Calculate GST amount, CGST, SGST/UTGST, or IGST — with reverse calculation support.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-2xl">
                    <div className="card">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Amount (₹) <AITooltip text="Enter the base price (exclusive) or the final price (inclusive) depending on the type selected below." />
                                </label>
                                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    GST Rate <AITooltip text="Standard GST rates in India: 5% (essentials), 12% (standard), 18% (most goods/services), 28% (luxury/sin goods)." />
                                </label>
                                <select value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none">
                                    <option value="5">5%</option>
                                    <option value="12">12%</option>
                                    <option value="18">18%</option>
                                    <option value="28">28%</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">Calculation Type</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 text-sm"><input type="radio" checked={type === "exclusive"} onChange={() => setType("exclusive")} className="text-primary-500" /> GST Exclusive (add GST)</label>
                                    <label className="flex items-center gap-2 text-sm"><input type="radio" checked={type === "inclusive"} onChange={() => setType("inclusive")} className="text-primary-500" /> GST Inclusive (extract GST)</label>
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Supply Type <AITooltip text="Intra-state: supply within same state → CGST + SGST. Inter-state: supply between states → IGST at full rate." />
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 text-sm"><input type="radio" checked={!isInter} onChange={() => setSupplyType("intra")} className="text-primary-500" /> Intra-State (CGST + SGST)</label>
                                    <label className="flex items-center gap-2 text-sm"><input type="radio" checked={isInter} onChange={() => setSupplyType("inter")} className="text-primary-500" /> Inter-State (IGST)</label>
                                </div>
                            </div>
                        </div>

                        {hasResult && (
                            <>
                                <ResultSummary
                                    title="GST Computation"
                                    rows={[
                                        { label: "Base Amount", value: `₹${baseAmount.toFixed(2)}` },
                                        ...(isInter
                                            ? [{ label: `IGST (${numRate}%)`, value: `₹${gstAmount.toFixed(2)}`, color: "blue" as const }]
                                            : [
                                                { label: `CGST (${numRate / 2}%)`, value: `₹${(gstAmount / 2).toFixed(2)}`, color: "blue" as const },
                                                { label: `SGST (${numRate / 2}%)`, value: `₹${(gstAmount / 2).toFixed(2)}`, color: "blue" as const },
                                            ]),
                                        { label: `Total GST (${numRate}%)`, value: `₹${gstAmount.toFixed(2)}`, color: "primary" },
                                        { label: "---", value: "" },
                                        { label: "Total Amount", value: `₹${totalAmount.toFixed(2)}`, highlight: true, color: "primary" },
                                    ]}
                                />
                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-neutral-700 mb-3">📊 Tax Breakdown</h3>
                                    <PieChart
                                        size={180}
                                        data={
                                            isInter
                                                ? [
                                                    { label: "Base Amount", value: baseAmount, color: "#3b82f6" },
                                                    { label: "IGST", value: gstAmount, color: "#ef4444" },
                                                ]
                                                : [
                                                    { label: "Base Amount", value: baseAmount, color: "#3b82f6" },
                                                    { label: "CGST", value: gstAmount / 2, color: "#ef4444" },
                                                    { label: "SGST", value: gstAmount / 2, color: "#f97316" },
                                                ]
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mt-8 prose prose-sm max-w-none">
                        <h2 className="text-xl font-bold text-neutral-900 font-heading">About GST Calculator</h2>
                        <p className="text-neutral-600">The Goods and Services Tax (GST) is India&apos;s comprehensive indirect tax on the supply of goods and services. This calculator helps you quickly compute the GST amount for any base price at standard GST rates (5%, 12%, 18%, 28%). CGST (Central GST) and SGST (State GST) are split equally from the total GST for intra-state supplies. For inter-state supplies, IGST applies at the full rate.</p>
                        <p className="text-neutral-600">Use the &ldquo;GST Inclusive&rdquo; mode to reverse-calculate the base price and GST component from a final price that already includes GST — useful for billing reconciliation and input tax credit verification.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
