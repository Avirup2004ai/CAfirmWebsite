import { serviceCategories } from "@/content/services";
import { calculators, bulletins, acts, rules, forms, utilities } from "@/content/knowledge";
import { blogPosts } from "@/content/blog";

export type SearchDocumentType = "Calculator" | "Service" | "Knowledge" | "Blog" | "Page";

export interface SearchDocument {
    id: string;
    type: SearchDocumentType;
    title: string;
    description: string;
    url: string;
    keywords: string[];
}

// Compile all content into a single search index
export const searchIndex: SearchDocument[] = [
    // 1. Pages
    {
        id: "page_home",
        type: "Page",
        title: "Home",
        description: "S.A.M.P.N. & Associates Chartered Accountants",
        url: "/",
        keywords: ["home", "sampn", "ca firm", "kolkata", "puri"],
    },
    {
        id: "page_about",
        type: "Page",
        title: "About Us",
        description: "Learn about our firm, partners, and the sectors we serve.",
        url: "/about",
        keywords: ["about us", "firm profile", "partners", "history"],
    },
    {
        id: "page_services",
        type: "Page",
        title: "Our Services",
        description: "Explore our audit, taxation, and advisory services.",
        url: "/services",
        keywords: ["services", "audit", "tax", "advisory", "compliance"],
    },
    {
        id: "page_knowledge",
        type: "Page",
        title: "Knowledge Bank",
        description: "Resources, calculators, bulletins, and updates.",
        url: "/knowledge",
        keywords: ["knowledge bank", "resources", "updates", "tax rules"],
    },
    {
        id: "page_calculators",
        type: "Page",
        title: "Financial Calculators Hub",
        description: "Suite of financial and tax calculators for India.",
        url: "/knowledge/calculators",
        keywords: ["calculators", "financial tools", "tax calculators", "emi", "sip"],
    },
    {
        id: "page_contact",
        type: "Page",
        title: "Contact Us",
        description: "Get in touch with our team in Kolkata and Puri.",
        url: "/contact",
        keywords: ["contact", "address", "phone", "email", "location", "reach us"],
    },

    // 2. Calculators
    ...calculators.map((item): SearchDocument => ({
        id: `calc_${item.slug}`,
        type: "Calculator",
        title: item.title,
        description: item.description,
        url: `/knowledge/calculators/${item.slug}`,
        keywords: [item.title.toLowerCase(), ...(item.title.split(" "))],
    })),

    // 3. Services
    ...serviceCategories.flatMap(cat =>
        cat.services.map((svc): SearchDocument => ({
            id: `service_${svc.slug}`,
            type: "Service",
            title: svc.title,
            description: svc.shortDescription,
            url: `/services/${cat.slug}/${svc.slug}`,
            keywords: svc.keywords || [svc.title.toLowerCase(), cat.title.toLowerCase()],
        }))
    ),

    // 4. Knowledge Items
    ...[
        ...bulletins.map(b => ({ ...b, section: "bulletins" })),
        ...utilities.map(u => ({ ...u, section: "utilities" })),
        ...acts.map(a => ({ ...a, section: "acts" })),
        ...rules.map(r => ({ ...r, section: "rules" })),
        ...forms.map(f => ({ ...f, section: "forms" })),
    ].map((item): SearchDocument => ({
        id: `know_${item.slug}`,
        type: "Knowledge",
        title: item.title,
        description: item.description,
        url: `/knowledge/${item.section}/${item.slug}`,
        keywords: [item.title.toLowerCase(), item.section],
    })),

    // 5. Blog Posts
    ...blogPosts.map((post): SearchDocument => ({
        id: `blog_${post.slug}`,
        type: "Blog",
        title: post.title,
        description: post.excerpt,
        url: `/knowledge/bulletins/${post.slug}`, // They render in bulletins route
        keywords: post.keywords || [post.category.toLowerCase()],
    })),
];

export const synonyms: Record<string, string> = {
    "itr": "income tax",
    "gst": "goods and services tax",
    "roi": "return on investment",
    "hr": "hra exemption",
    "rent": "hra exemption",
    "ppf": "80c",
    "elss": "80c",
    "fd": "fixed deposit",
    "rd": "recurring deposit",
    "ltcg": "capital gains",
    "stcg": "capital gains",
    "home loan": "emi",
    "car loan": "emi",
    "mutual fund": "sip",
    "mf": "sip",
};
