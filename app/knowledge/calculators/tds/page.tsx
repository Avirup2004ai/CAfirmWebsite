"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AITooltip from "@/components/AITooltip";
import ResultSummary from "@/components/ResultSummary";
import { BarChart } from "@/components/CalculatorChart";

const TDS_SECTIONS = [
    { section: "192", desc: "Salary", rate: "As per slab" },
    { section: "194A", desc: "Interest (other than securities)", rate: "10" },
    { section: "194B", desc: "Lottery / Game Show winnings", rate: "30" },
    { section: "194C", desc: "Contractor – Individual/HUF", rate: "1" },
    { section: "194C", desc: "Contractor – Others", rate: "2" },
    { section: "194H", desc: "Commission / Brokerage", rate: "5" },
    { section: "194I(a)", desc: "Rent – Plant/Machinery", rate: "2" },
    { section: "194I(b)", desc: "Rent – Land/Building/Furniture", rate: "10" },
    { section: "194J(a)", desc: "Technical Services", rate: "2" },
    { section: "194J(b)", desc: "Professional Services", rate: "10" },
    { section: "194N", desc: "Cash Withdrawal > ₹1Cr", rate: "2" },
    { section: "194Q", desc: "Purchase of Goods > ₹50L", rate: "0.1" },
    { section: "195", desc: "Payment to Non-Resident", rate: "20" },
];

export default function TDSCalculatorPage() {
    const [amount, setAmount] = useState("");
    const [selectedIdx, setSelectedIdx] = useState(1);

    const paymentAmount = parseFloat(amount) || 0;
    const tdsRate = parseFloat(TDS_SECTIONS[selectedIdx].rate) || 0;
    const tdsAmount = (paymentAmount * tdsRate) / 100;
    const netPayable = paymentAmount - tdsAmount;
    const selected = TDS_SECTIONS[selectedIdx];

    const hasResult = paymentAmount > 0 && tdsRate > 0;

    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators", href: "/knowledge/calculators" }, { label: "TDS Calculator" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">TDS Calculator India</h1>
                    <p className="mt-3 text-neutral-600">Calculate TDS deduction amount and net payable for various payment sections.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-2xl">
                    <div className="card">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Payment Type (Section) <AITooltip text="Select the TDS section applicable to your payment type. Each section has a prescribed TDS rate." />
                                </label>
                                <select value={selectedIdx} onChange={(e) => setSelectedIdx(parseInt(e.target.value))} className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none">
                                    {TDS_SECTIONS.map((s, i) => (
                                        <option key={i} value={i}>Sec {s.section} – {s.desc} ({s.rate}%)</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-neutral-700">
                                    Payment Amount (₹) <AITooltip text="The gross payment amount before TDS deduction." />
                                </label>
                                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 500000" className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
                            </div>
                        </div>

                        {hasResult && (
                            <>
                                <ResultSummary
                                    title={`TDS under Section ${selected.section}`}
                                    rows={[
                                        { label: "Gross Payment", value: `₹${paymentAmount.toLocaleString("en-IN")}` },
                                        { label: `TDS Rate (Sec ${selected.section})`, value: `${tdsRate}%` },
                                        { label: "TDS Amount", value: `₹${tdsAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, color: "red" },
                                        { label: "---", value: "" },
                                        { label: "Net Payable After TDS", value: `₹${netPayable.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, highlight: true, color: "green" },
                                    ]}
                                />
                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-neutral-700 mb-3">📊 Before vs After TDS</h3>
                                    <BarChart data={[
                                        { label: "Gross Payment", value: paymentAmount, color: "#3b82f6" },
                                        { label: "TDS Deducted", value: tdsAmount, color: "#ef4444" },
                                        { label: "Net Payable", value: netPayable, color: "#10b981" },
                                    ]} />
                                </div>
                            </>
                        )}
                    </div>

                    {/* TDS Rate Reference Table */}
                    <div className="mt-8 overflow-x-auto">
                        <h2 className="text-xl font-bold text-neutral-900 font-heading mb-4">TDS Rate Chart FY 2025-26</h2>
                        <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
                            <thead className="bg-primary-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-neutral-700">Section</th>
                                    <th className="px-3 py-2 text-left text-neutral-700">Payment Type</th>
                                    <th className="px-3 py-2 text-right text-neutral-700">Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TDS_SECTIONS.map((s, i) => (
                                    <tr key={i} className={`border-t border-neutral-100 ${i === selectedIdx ? "bg-primary-50/50" : ""}`}>
                                        <td className="px-3 py-2 font-medium">{s.section}</td>
                                        <td className="px-3 py-2 text-neutral-600">{s.desc}</td>
                                        <td className="px-3 py-2 text-right font-medium">{s.rate}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 prose prose-sm max-w-none">
                        <h2 className="text-xl font-bold text-neutral-900 font-heading">About TDS Calculator</h2>
                        <p className="text-neutral-600">Tax Deducted at Source (TDS) is a mechanism in the Indian tax system where the payer deducts tax at the time of making specific payments like salary, rent, interest, professional fees, and contractor payments. The deductor is required to deposit the TDS with the government and issue a TDS certificate (Form 16/16A) to the deductee.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
