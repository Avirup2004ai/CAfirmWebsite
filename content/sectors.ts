export interface Sector {
    slug: string;
    title: string;
    icon: string;
    description: string;
    keyServices: string[];
    challenges: string[];
}

export const sectors: Sector[] = [
    {
        slug: "manufacturing",
        title: "Manufacturing & Industrial",
        icon: "Factory",
        description:
            "From cost management to compliance, we help manufacturers navigate complex regulatory environments and optimize financial operations for sustainable growth.",
        keyServices: ["statutory-audit", "gst-advisory", "tax-audit", "business-valuation"],
        challenges: ["GST compliance across states", "Transfer pricing for MNC subsidiaries", "Cost audit requirements", "Export-import regulations"],
    },
    {
        slug: "information-technology",
        title: "Information Technology & SaaS",
        icon: "Monitor",
        description:
            "We support IT companies and SaaS startups with specialized services from inception through IPO, including transfer pricing, ESOP taxation, and international structuring.",
        keyServices: ["transfer-pricing", "company-incorporation", "income-tax-planning", "dtaa-advisory"],
        challenges: ["Cross-border revenue recognition", "ESOP taxation complexity", "Angel tax provisions", "International payment structures"],
    },
    {
        slug: "real-estate",
        title: "Real Estate & Construction",
        icon: "Building",
        description:
            "Comprehensive services for builders, developers, and real estate funds covering project-level accounting, RERA compliance, and tax optimization strategies.",
        keyServices: ["statutory-audit", "gst-advisory", "business-valuation", "income-tax-planning"],
        challenges: ["RERA compliance", "Project completion method accounting", "Joint development agreements", "Land acquisition tax implications"],
    },
    {
        slug: "healthcare",
        title: "Healthcare & Pharmaceuticals",
        icon: "Heart",
        description:
            "Tailored financial and compliance services for hospitals, clinics, pharma companies, and medical device manufacturers navigating stringent regulatory requirements.",
        keyServices: ["statutory-audit", "internal-audit", "gst-advisory", "business-valuation"],
        challenges: ["Drug pricing regulations", "Clinical trial accounting", "Multi-location compliance", "Healthcare trust taxation"],
    },
    {
        slug: "banking-financial",
        title: "Banking & Financial Services",
        icon: "Landmark",
        description:
            "Specialized audit, compliance, and advisory services for banks, NBFCs, insurance companies, and fintech platforms operating under stringent RBI and SEBI regulations.",
        keyServices: ["statutory-audit", "internal-audit", "risk-advisory", "fema-advisory"],
        challenges: ["RBI regulatory compliance", "NPA classification & provisioning", "ALM management", "Cyber security frameworks"],
    },
    {
        slug: "education",
        title: "Education & Non-Profit",
        icon: "GraduationCap",
        description:
            "We serve educational institutions, charitable trusts, and NGOs with specialized compliance, FCRA advisory, and tax exemption services.",
        keyServices: ["statutory-audit", "income-tax-planning", "annual-compliance", "risk-advisory"],
        challenges: ["Section 12A/80G compliance", "FCRA regulations", "Endowment fund management", "UGC/AICTE reporting"],
    },
    {
        slug: "ecommerce-retail",
        title: "E-Commerce & Retail",
        icon: "ShoppingCart",
        description:
            "End-to-end compliance and advisory for e-commerce operators, marketplace sellers, D2C brands, and retail chains across India.",
        keyServices: ["gst-advisory", "income-tax-planning", "company-incorporation", "transfer-pricing"],
        challenges: ["TCS under GST for e-commerce", "Multi-state GST compliance", "Inventory valuation", "Marketplace commission structures"],
    },
    {
        slug: "startups",
        title: "Startups & Emerging Businesses",
        icon: "Rocket",
        description:
            "From day-zero incorporation to Series A and beyond, we provide startup-friendly CA services covering DPIIT recognition, angel tax, ESOP structuring, and investor reporting.",
        keyServices: ["company-incorporation", "income-tax-planning", "business-valuation", "fema-advisory"],
        challenges: ["Angel tax (Section 56(2)(viib))", "ESOP pool creation & taxation", "Convertible note structures", "Investor due diligence readiness"],
    },
];
