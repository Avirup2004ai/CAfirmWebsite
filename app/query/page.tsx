"use client";

import { useState, useRef } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Toast from "@/components/Toast";
import { analytics } from "@/lib/analytics";
import { sanitize, isValidEmail, isValidPhone, canSubmit, isBot, checkLength } from "@/lib/security";
import { Send, AlertCircle, Loader2 } from "lucide-react";

export default function QueryPage() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formStarted, setFormStarted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [rateLimited, setRateLimited] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleFocus = () => {
        if (!formStarted) { setFormStarted(true); analytics.formStart("query"); }
    };

    const validate = (data: Record<string, string>): Record<string, string> => {
        const errs: Record<string, string> = {};
        if (!data.name || data.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
        if (!checkLength(data.name || "", 100)) errs.name = "Name is too long (max 100 characters).";
        if (!data.email || !isValidEmail(data.email)) errs.email = "Please enter a valid email address.";
        if (data.phone && !isValidPhone(data.phone)) errs.phone = "Please enter a valid Indian phone number.";
        if (!data.category) errs.category = "Please select a category.";
        if (!data.message || data.message.trim().length < 10) errs.message = "Query must be at least 10 characters.";
        if (!checkLength(data.message || "", 5000)) errs.message = "Query is too long (max 5000 characters).";
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        // Bot detection
        if (isBot(formRef.current)) return;

        // Rate limiting
        if (!canSubmit("query", 3, 60000)) {
            setRateLimited(true);
            return;
        }

        const fd = new FormData(formRef.current);
        const data = {
            name: sanitize((fd.get("name") as string) || ""),
            email: sanitize((fd.get("email") as string) || ""),
            phone: sanitize((fd.get("phone") as string) || ""),
            category: sanitize((fd.get("category") as string) || ""),
            message: sanitize((fd.get("message") as string) || ""),
        };

        const errs = validate(data);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setSubmitting(true);
        // Simulate network delay for realistic UX
        await new Promise((r) => setTimeout(r, 800));
        analytics.formSubmit("query");
        setSubmitting(false);
        setSubmitted(true);
    };

    const inputClass = (field: string) =>
        `w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors duration-200 ${errors[field]
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        }`;

    return (
        <>
            <Breadcrumbs items={[{ label: "Ask a Query" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Ask a Query</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-neutral-600">Have a tax or compliance question? Our experts will respond within 24 hours.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-2xl">
                    {submitted ? (
                        <div className="card text-center py-12 animate-fadeIn">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"><Send size={28} /></div>
                            <h2 className="text-2xl font-bold text-neutral-900 font-heading">Query Submitted!</h2>
                            <p className="mt-3 text-neutral-600">Thank you for your query. Our team will respond within 24 working hours.</p>
                            <button onClick={() => { setSubmitted(false); setErrors({}); }} className="btn-primary mt-6">Submit Another Query</button>
                        </div>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit} className="card space-y-5" noValidate>
                            {/* Honeypot – hidden from humans */}
                            <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                            </div>

                            {rateLimited && (
                                <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                                    <AlertCircle size={16} className="shrink-0" /> Too many submissions. Please wait a moment before trying again.
                                </div>
                            )}

                            <div>
                                <label htmlFor="name" className="mb-1 block text-sm font-medium text-neutral-700">Full Name *</label>
                                <input id="name" name="name" type="text" required maxLength={100} onFocus={handleFocus} className={inputClass("name")} placeholder="Your full name" />
                                {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-700">Email *</label>
                                <input id="email" name="email" type="email" required maxLength={200} className={inputClass("email")} placeholder="you@example.com" />
                                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-neutral-700">Phone</label>
                                <input id="phone" name="phone" type="tel" maxLength={15} className={inputClass("phone")} placeholder="+91 98765 43210" />
                                {errors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
                            </div>
                            <div>
                                <label htmlFor="category" className="mb-1 block text-sm font-medium text-neutral-700">Category *</label>
                                <select id="category" name="category" required className={inputClass("category")}>
                                    <option value="">Select a category</option>
                                    <option value="income-tax">Income Tax</option>
                                    <option value="gst">GST</option>
                                    <option value="audit">Audit</option>
                                    <option value="company-law">Company Law</option>
                                    <option value="fema">FEMA</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.category && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.category}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="mb-1 block text-sm font-medium text-neutral-700">Your Query *</label>
                                <textarea id="message" name="message" rows={5} required maxLength={5000} className={`${inputClass("message")} resize-none`} placeholder="Describe your query in detail..." />
                                {errors.message && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
                            </div>
                            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                                {submitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : <><Send size={18} /> Submit Query</>}
                            </button>
                        </form>
                    )}
                </div>
            </section>
            <Toast message="Query submitted successfully!" show={submitted} onClose={() => { }} />
        </>
    );
}
