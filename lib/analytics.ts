type EventParams = Record<string, string | number | boolean>;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export function trackEvent(name: string, params?: EventParams): void {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", name, params);
    }
}

// Pre-defined event helpers
export const analytics = {
    clickCall: (phone: string) => trackEvent("click_call", { phone }),
    clickWhatsApp: (phone: string) => trackEvent("click_whatsapp", { phone }),
    clickBookConsultation: () => trackEvent("click_book_consultation"),
    formStart: (formName: string) => trackEvent("form_start", { form_name: formName }),
    formSubmit: (formName: string) => trackEvent("form_submit", { form_name: formName }),
    knowledgeDownload: (item: string) => trackEvent("knowledge_download", { item }),
    serviceCTA: (service: string) => trackEvent("service_cta_click", { service }),
    pageView: (path: string) => trackEvent("page_view", { page_path: path }),
};
