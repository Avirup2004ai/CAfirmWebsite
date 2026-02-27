"use client";

import { useState, useRef } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Toast from "@/components/Toast";
import { CallButton, WhatsAppButton } from "@/components/CTAButtons";
import { analytics } from "@/lib/analytics";
import { siteConfig } from "@/content/site";
import { sanitize, isValidEmail, isValidPhone, canSubmit, isBot, checkLength } from "@/lib/security";
import { Phone, Mail, MapPin, Send, Clock, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [rateLimited, setRateLimited] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const validate = (data: Record<string, string>): Record<string, string> => {
        const errs: Record<string, string> = {};
        if (!data.name || data.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
        if (!data.email || !isValidEmail(data.email)) errs.email = "Please enter a valid email.";
        if (data.phone && !isValidPhone(data.phone)) errs.phone = "Please enter a valid Indian phone number.";
        if (!data.subject || data.subject.trim().length < 3) errs.subject = "Subject must be at least 3 characters.";
        if (!data.message || data.message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
        if (!checkLength(data.message || "", 5000)) errs.message = "Message is too long (max 5000 characters).";
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        if (isBot(formRef.current)) return;
        if (!canSubmit("contact", 3, 60000)) { setRateLimited(true); return; }

        const fd = new FormData(formRef.current);
        const data = {
            name: sanitize((fd.get("name") as string) || ""),
            email: sanitize((fd.get("email") as string) || ""),
            phone: sanitize((fd.get("phone") as string) || ""),
            subject: sanitize((fd.get("subject") as string) || ""),
            message: sanitize((fd.get("message") as string) || ""),
        };

        const errs = validate(data);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setSubmitting(true);
        await new Promise((r) => setTimeout(r, 800));
        analytics.formSubmit("contact");
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
            <Breadcrumbs items={[{ label: "Contact Us" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 font-heading">Contact Us</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-neutral-600">Get in touch with our team. We&apos;re here to help.</p>
                    <div className="mt-6 flex flex-wrap gap-3 justify-center">
                        <CallButton />
                        <WhatsAppButton />
                    </div>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="section-container">
                    <h2 className="text-2xl font-bold text-neutral-900 font-heading text-center">Our Offices</h2>
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {siteConfig.addresses.map((addr) => (
                            <div key={addr.id} className="card">
                                <h3 className="text-lg font-semibold text-neutral-800 font-heading">{addr.label}</h3>
                                <div className="mt-4 space-y-3">
                                    <p className="flex items-start gap-2 text-sm text-neutral-600"><MapPin size={16} className="mt-0.5 shrink-0 text-primary-500" /> {addr.line1}, {addr.line2}</p>
                                    <a href={`tel:${addr.phone}`} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-500 transition-colors"><Phone size={16} className="text-primary-500" /> {addr.phone}</a>
                                    <a href={`mailto:${addr.email}`} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-500 transition-colors"><Mail size={16} className="text-primary-500" /> {addr.email}</a>
                                    <p className="flex items-center gap-2 text-sm text-neutral-500"><Clock size={16} className="text-neutral-400" /> Mon–Sat, 10 AM – 6 PM</p>
                                </div>
                                <div className="mt-4 aspect-[16/9] overflow-hidden rounded-lg bg-neutral-100">
                                    <iframe
                                        src={addr.mapEmbed}
                                        width="100%" height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map – ${addr.city}`}
                                        sandbox="allow-scripts allow-same-origin"
                                        className="h-full w-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-neutral-50">
                <div className="section-container max-w-2xl">
                    <h2 className="text-2xl font-bold text-neutral-900 font-heading text-center">Send Us a Message</h2>
                    {submitted ? (
                        <div className="mt-8 card text-center py-12 animate-fadeIn">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"><Send size={28} /></div>
                            <h3 className="text-2xl font-bold text-neutral-900 font-heading">Thank You!</h3>
                            <p className="mt-3 text-neutral-600">We&apos;ve received your message and will get back to you shortly.</p>
                            <button onClick={() => { setSubmitted(false); setErrors({}); }} className="btn-primary mt-6">Send Another</button>
                        </div>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 card space-y-5" noValidate>
                            {/* Honeypot */}
                            <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                            </div>

                            {rateLimited && (
                                <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                                    <AlertCircle size={16} className="shrink-0" /> Too many submissions. Please wait a moment.
                                </div>
                            )}

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="c-name" className="mb-1 block text-sm font-medium text-neutral-700">Name *</label>
                                    <input id="c-name" name="name" type="text" required maxLength={100} className={inputClass("name")} />
                                    {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="c-email" className="mb-1 block text-sm font-medium text-neutral-700">Email *</label>
                                    <input id="c-email" name="email" type="email" required maxLength={200} className={inputClass("email")} />
                                    {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="c-phone" className="mb-1 block text-sm font-medium text-neutral-700">Phone</label>
                                <input id="c-phone" name="phone" type="tel" maxLength={15} className={inputClass("phone")} />
                                {errors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
                            </div>
                            <div>
                                <label htmlFor="c-subject" className="mb-1 block text-sm font-medium text-neutral-700">Subject *</label>
                                <input id="c-subject" name="subject" type="text" required maxLength={200} className={inputClass("subject")} />
                                {errors.subject && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.subject}</p>}
                            </div>
                            <div>
                                <label htmlFor="c-message" className="mb-1 block text-sm font-medium text-neutral-700">Message *</label>
                                <textarea id="c-message" name="message" rows={5} required maxLength={5000} className={`${inputClass("message")} resize-none`} />
                                {errors.message && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
                            </div>
                            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                                {submitting ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            <Toast message="Message sent successfully!" show={submitted} onClose={() => { }} />
        </>
    );
}
