"use client";

import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { siteConfig } from "@/content/site";
import { analytics } from "@/lib/analytics";

/* export function BookConsultationButton({ className = "" }: { className?: string }) {
    return (
        <a
            href="/contact"
            className={`btn-primary ${className}`}
            onClick={() => analytics.clickBookConsultation()}
        >
            <CalendarCheck size={18} /> Book Consultation
        </a>
    );
} */

export function WhatsAppButton({ className = "" }: { className?: string }) {
    return (
        <a
            href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-accent ${className}`}
            onClick={() => analytics.clickWhatsApp(siteConfig.whatsapp)}
        >
            <MessageCircle size={18} /> WhatsApp Us
        </a>
    );
}

export function CallButton({ phone, className = "" }: { phone?: string; className?: string }) {
    const p = phone || siteConfig.phones[0];
    return (
        <a
            href={`tel:${p}`}
            className={`btn-secondary ${className}`}
            onClick={() => analytics.clickCall(p)}
        >
            <Phone size={18} /> Call Now
        </a>
    );
}

export function CTAGroup({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-wrap gap-3 ${className}`}>
            {/* <BookConsultationButton /> */}
            <WhatsAppButton />
        </div>
    );
}
