export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    keywords: string[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: "gst-compliance-checklist-2025",
        title: "GST Compliance Checklist for FY 2025–26",
        excerpt: "A comprehensive checklist covering all monthly, quarterly, and annual GST compliance requirements for businesses.",
        content: "Staying GST compliant is crucial for businesses operating in India. This checklist covers GSTR-1 (monthly/quarterly outward supplies), GSTR-3B (monthly summary returns), GSTR-9 (annual return), GSTR-9C (reconciliation statement), ITC reconciliation, e-invoicing requirements, and e-way bill compliance. Key considerations include timely filing to avoid late fees, proper HSN/SAC code classification, reconciliation of GSTR-2B with purchase records, and maintaining proper documentation for ITC claims. Businesses should also track changes in GST rates and compliance requirements through government notifications.",
        author: "CA Anita Mishra",
        date: "2025-04-15",
        category: "GST",
        readTime: "8 min read",
        image: "/assets/placeholder-1.svg",
        keywords: ["GST compliance", "GSTR-1", "GSTR-3B", "annual return"],
    },
    {
        slug: "startup-tax-benefits-india",
        title: "Tax Benefits Available to Startups in India (Updated 2025)",
        excerpt: "Explore the tax exemptions, deductions, and incentives available to DPIIT-recognized startups under Indian tax law.",
        content: "India offers several tax benefits to eligible startups recognized by DPIIT. Section 80-IAC provides a 3-year tax holiday for startups incorporated before April 2025 with turnover up to ₹100 crore. Angel tax exemptions under Section 56(2)(viib) are available with proper DPIIT recognition and Form 2 filing. Capital gains exemptions under Section 54GB allow reinvestment of long-term capital gains from sale of residential property into eligible startups. Additionally, carry forward of losses is permitted for 7 years even if shareholding changes, subject to conditions. Startups should also explore GST benefits, ESOP taxation deferral under Section 17(2)(vi), and state-specific incentive schemes.",
        author: "CA Suresh Agarwal",
        date: "2025-03-20",
        category: "Taxation",
        readTime: "10 min read",
        image: "/assets/placeholder-2.svg",
        keywords: ["startup tax benefits", "DPIIT recognition", "angel tax", "Section 80-IAC"],
    },
    {
        slug: "internal-audit-best-practices",
        title: "Internal Audit Best Practices for Mid-Size Companies",
        excerpt: "Learn how to implement an effective internal audit function that adds value beyond compliance checking.",
        content: "An effective internal audit function goes beyond checking compliance boxes. It serves as a strategic tool for risk management, operational improvement, and governance strengthening. Best practices include establishing a risk-based audit plan aligned with organizational objectives, maintaining independence by reporting to the audit committee, using data analytics for continuous monitoring, focusing on root cause analysis rather than just symptom identification, and building a collaborative relationship with management while maintaining professional skepticism. Key areas to focus on include revenue assurance, procurement fraud, IT general controls, financial reporting controls, and regulatory compliance. Regular follow-up on previous audit findings and tracking implementation of recommendations is essential for sustained improvement.",
        author: "CA Pradeep Nayak",
        date: "2025-02-28",
        category: "Audit",
        readTime: "7 min read",
        image: "/assets/placeholder-3.svg",
        keywords: ["internal audit", "best practices", "risk management", "governance"],
    },
    {
        slug: "fema-compliance-foreign-investment",
        title: "FEMA Compliance Guide for Foreign Investment in India",
        excerpt: "Navigate the regulatory framework for foreign direct investment, ensuring compliance with FEMA and RBI regulations.",
        content: "Foreign investment in India is governed by FEMA, 1999 and regulated through RBI master directions. The automatic route allows FDI without prior government approval in most sectors, subject to sectoral caps. Key compliance requirements include filing FC-GPR within 30 days of allotment of shares, annual return on foreign liabilities and assets (FLA), pricing guidelines based on DCF valuation for unlisted companies, and downstream investment reporting. Common areas of non-compliance include delayed reporting, incorrect pricing, and non-adherence to sectoral conditions. Companies with foreign investment should maintain a compliance calendar, conduct periodic FEMA audits, and ensure proper documentation of all cross-border transactions.",
        author: "CA Suresh Agarwal",
        date: "2025-01-12",
        category: "International",
        readTime: "12 min read",
        image: "/assets/placeholder-4.svg",
        keywords: ["FEMA compliance", "FDI India", "foreign investment", "RBI regulations"],
    },
    {
        slug: "digital-transformation-accounting",
        title: "Digital Transformation in Accounting: Trends for 2025",
        excerpt: "How AI, automation, and cloud accounting are reshaping the chartered accountancy profession.",
        content: "The accounting profession is undergoing a fundamental transformation driven by technology. Cloud-based accounting platforms like Tally Prime, Zoho Books, and QuickBooks are enabling real-time collaboration and automated data entry. Artificial intelligence is being used for anomaly detection in audit, automated tax computation, and predictive analytics for financial planning. Robotic Process Automation (RPA) is streamlining repetitive tasks like data extraction, reconciliation, and return filing. E-invoicing, digital signatures, and blockchain-based audit trails are becoming standard. For CA firms, this means evolving from compliance-focused services to advisory-driven practices, investing in technology infrastructure, and upskilling teams in data analytics and cybersecurity.",
        author: "CA Anita Mishra",
        date: "2024-12-05",
        category: "Technology",
        readTime: "6 min read",
        image: "/assets/placeholder-5.svg",
        keywords: ["digital transformation", "AI in accounting", "cloud accounting", "automation"],
    },
    {
        slug: "business-valuation-methods",
        title: "Understanding Business Valuation Methods: A Practical Guide",
        excerpt: "A deep dive into DCF, comparable company analysis, and asset-based valuation methods for Indian businesses.",
        content: "Business valuation is both an art and a science, requiring deep domain knowledge and analytical rigor. The three primary approaches are the Income Approach (DCF being the most common), Market Approach (comparable company and comparable transaction analysis), and Asset Approach (net asset value). The choice of method depends on the purpose of valuation, nature of business, availability of data, and regulatory requirements. For startups and tech companies, DCF with appropriate risk adjustments is preferred. For mature businesses with stable earnings, earnings multiples provide reliable estimates. For asset-heavy businesses like real estate, the NAV method is appropriate. Indian regulations under the Companies Act and Income Tax Act prescribe specific valuation requirements for share issues, mergers, and related party transactions.",
        author: "CA Pradeep Nayak",
        date: "2024-11-18",
        category: "Advisory",
        readTime: "9 min read",
        image: "/assets/placeholder-6.svg",
        keywords: ["business valuation", "DCF method", "comparable company analysis", "share valuation"],
    },
];
