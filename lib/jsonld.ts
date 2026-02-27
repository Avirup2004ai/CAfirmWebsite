import { siteConfig } from "@/content/site";

function sanitizeJsonLd(json: string): string {
    return json.replace(/</g, "\\u003c");
}

export function buildJsonLd(data: Record<string, unknown>): string {
    return sanitizeJsonLd(JSON.stringify(data));
}

export function organizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/assets/logo.svg`,
        description: siteConfig.description,
        telephone: siteConfig.phones[0],
        email: siteConfig.emails[0],
        sameAs: Object.values(siteConfig.social),
        address: siteConfig.addresses.map((addr) => ({
            "@type": "PostalAddress",
            streetAddress: `${addr.line1}, ${addr.line2}`,
            addressLocality: addr.city,
            addressRegion: addr.state,
            addressCountry: addr.country,
        })),
    };
}

export function localBusinessSchema(officeId: string) {
    const office = siteConfig.addresses.find((a) => a.id === officeId);
    if (!office) return null;
    return {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        name: `${siteConfig.name} – ${office.city}`,
        url: siteConfig.url,
        telephone: office.phone,
        email: office.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: `${office.line1}, ${office.line2}`,
            addressLocality: office.city,
            addressRegion: office.state,
            addressCountry: office.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: office.lat, longitude: office.lng },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "18:00",
        },
    };
}

export function personSchema(person: {
    name: string;
    designation: string;
    email: string;
    qualifications: string[];
    url?: string;
    image?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: person.name,
        jobTitle: person.designation,
        email: person.email,
        worksFor: { "@type": "Organization", name: siteConfig.name },
        url: person.url || siteConfig.url,
        image: person.image ? `${siteConfig.url}${person.image}` : undefined,
        hasCredential: person.qualifications.map((q) => ({
            "@type": "EducationalOccupationalCredential",
            credentialCategory: q,
        })),
    };
}

export function serviceSchema(service: {
    name: string;
    description: string;
    url: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: service.name,
        name: service.name,
        description: service.description,
        url: service.url,
        provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        areaServed: { "@type": "Country", name: "India" },
    };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };
}

export function articleSchema(article: {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    url: string;
    image?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        author: { "@type": "Person", name: article.author },
        publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: `${siteConfig.url}/assets/logo.svg` } },
        datePublished: article.datePublished,
        url: article.url,
        image: article.image ? `${siteConfig.url}${article.image}` : undefined,
    };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
