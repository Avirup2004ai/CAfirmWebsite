"use client";

import { useState, useRef } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Toast from "@/components/Toast";
import { analytics } from "@/lib/analytics";
import { sanitize, isValidEmail, isValidPhone, canSubmit, isBot } from "@/lib/security";
import { jobListings } from "@/content/careers";
import { MapPin, Clock, Briefcase, Send, ChevronDown, ChevronUp, AlertCircle, Loader2 } from "lucide-react";

export default function CareersPage() {
    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [expandedJob, setExpandedJob] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [rateLimited, setRateLimited] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        if (isBot(formRef.current)) return;
        if (!canSubmit("careers", 3, 60000)) { setRateLimited(true); return; }

        const fd = new FormData(formRef.current);
        const data = {
            name: sanitize((fd.get("name") as string) || ""),
            email: sanitize((fd.get("email") as string) || ""),
            phone: sanitize((fd.get("phone") as string) || ""),
        };

        const errs: Record<string, string> = {};
        if (!data.name || data.name.trim().length < 2) errs.name = "Name is required.";
        if (!data.email || !isValidEmail(data.email)) errs.email = "Valid email required.";
        if (!data.phone || !isValidPhone(data.phone)) errs.phone = "Valid phone required.";
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setSubmitting(true);
        await new Promise((r) => setTimeout(r, 800));
        analytics.formSubmit("careers");
        setSubmitting(false);
        setSubmitted(true);
        setSelectedJob(null);
    };

    const inputClass = (field: string) =>
        `w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors duration-200 ${errors[field]
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        }`;

    return (
        <>
            <Breadcrumbs items={[{ label: "Careers" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Careers</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-neutral-600">Join our growing team and build a rewarding career in chartered accountancy.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="section-container max-w-4xl">
                    <h2 className="text-2xl font-bold text-neutral-900 font-heading">Open Positions</h2>
                    <div className="mt-6 space-y-4">
                        {jobListings.map((job) => (
                            <div key={job.slug} className="card">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-neutral-800 font-heading">{job.title}</h3>
                                        <div className="mt-2 flex flex-wrap gap-3 text-sm text-neutral-500">
                                            <span className="flex items-center gap-1"><Briefcase size={14} /> {job.department}</span>
                                            <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                            <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                        </div>
                                        <p className="mt-2 text-sm text-neutral-600">{job.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setExpandedJob(expandedJob === job.slug ? null : job.slug)} className="btn-secondary !py-2 !px-3 text-xs">
                                            Details {expandedJob === job.slug ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                        </button>
                                        <button onClick={() => { setSelectedJob(job.slug); setErrors({}); setRateLimited(false); }} className="btn-primary !py-2 !px-4 text-xs">Apply</button>
                                    </div>
                                </div>
                                {expandedJob === job.slug && (
                                    <div className="mt-4 border-t border-neutral-200 pt-4 space-y-4 animate-fadeIn">
                                        <div><h4 className="text-sm font-semibold text-neutral-700">Responsibilities</h4><ul className="mt-1 space-y-1">{job.responsibilities.map((r) => <li key={r} className="text-sm text-neutral-600">• {r}</li>)}</ul></div>
                                        <div><h4 className="text-sm font-semibold text-neutral-700">Requirements</h4><ul className="mt-1 space-y-1">{job.requirements.map((r) => <li key={r} className="text-sm text-neutral-600">• {r}</li>)}</ul></div>
                                        <div><h4 className="text-sm font-semibold text-neutral-700">Benefits</h4><ul className="mt-1 space-y-1">{job.benefits.map((b) => <li key={b} className="text-sm text-neutral-600">• {b}</li>)}</ul></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {selectedJob && !submitted && (
                <section className="section-padding bg-neutral-50" id="apply">
                    <div className="section-container max-w-2xl">
                        <h2 className="text-2xl font-bold text-neutral-900 font-heading">Apply for: {jobListings.find((j) => j.slug === selectedJob)?.title}</h2>
                        <form ref={formRef} onSubmit={handleSubmit} className="mt-6 card space-y-5" noValidate>
                            {/* Honeypot */}
                            <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                            </div>

                            {rateLimited && (
                                <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                                    <AlertCircle size={16} className="shrink-0" /> Too many submissions. Please wait a moment.
                                </div>
                            )}

                            <div>
                                <label htmlFor="apply-name" className="mb-1 block text-sm font-medium text-neutral-700">Full Name *</label>
                                <input id="apply-name" name="name" type="text" required maxLength={100} className={inputClass("name")} />
                                {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="apply-email" className="mb-1 block text-sm font-medium text-neutral-700">Email *</label>
                                <input id="apply-email" name="email" type="email" required maxLength={200} className={inputClass("email")} />
                                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="apply-phone" className="mb-1 block text-sm font-medium text-neutral-700">Phone *</label>
                                <input id="apply-phone" name="phone" type="tel" required maxLength={15} className={inputClass("phone")} />
                                {errors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
                            </div>
                            <div>
                                <label htmlFor="apply-message" className="mb-1 block text-sm font-medium text-neutral-700">Why should we hire you?</label>
                                <textarea id="apply-message" name="coverletter" rows={4} maxLength={3000} className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none resize-none" />
                            </div>
                            <div>
                                <label htmlFor="apply-resume" className="mb-1 block text-sm font-medium text-neutral-700">Resume</label>
                                <input id="apply-resume" type="file" accept=".pdf,.doc,.docx" className="w-full text-sm text-neutral-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-600 hover:file:bg-primary-100" />
                                <p className="mt-1 text-xs text-neutral-400">PDF or DOC, max 5MB (frontend placeholder)</p>
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" disabled={submitting} className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                                    {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><Send size={16} /> Submit Application</>}
                                </button>
                                <button type="button" onClick={() => setSelectedJob(null)} className="btn-secondary">Cancel</button>
                            </div>
                        </form>
                    </div>
                </section>
            )}

            {submitted && (
                <section className="section-padding bg-neutral-50">
                    <div className="section-container max-w-2xl text-center">
                        <div className="card py-12 animate-fadeIn">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"><Send size={28} /></div>
                            <h2 className="text-2xl font-bold text-neutral-900 font-heading">Application Submitted!</h2>
                            <p className="mt-3 text-neutral-600">Thank you for your interest. We will review your application and get back to you.</p>
                            <button onClick={() => setSubmitted(false)} className="btn-primary mt-6">Browse More Positions</button>
                        </div>
                    </div>
                </section>
            )}

            <Toast message="Application submitted successfully!" show={submitted} onClose={() => { }} />
        </>
    );
}
