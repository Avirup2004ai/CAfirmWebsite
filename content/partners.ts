export interface Partner {
    slug: string;
    name: string;
    designation: string;
    qualifications: string[];
    specializations: string[];
    memberships: string[];
    yearsExperience: number;
    photo: string;
    shortBio: string;
    longBio: string;
    keyProjects: { title: string; description: string }[];
    email: string;
    linkedin: string;
}

export const partners: Partner[] = [
    {
        slug: "suresh-agarwal",
        name: "CA Suresh Agarwal",
        designation: "Managing Partner",
        qualifications: ["FCA", "DISA (ICAI)", "B.Com (Hons)"],
        specializations: [
            "Statutory & Internal Audit",
            "Corporate Taxation",
            "Business Valuation",
            "FEMA & International Taxation",
        ],
        memberships: [
            "Fellow Member – ICAI",
            "Member – Kolkata Chapter of ICAI",
            "Member – Chamber of Tax Consultants",
        ],
        yearsExperience: 25,
        photo: "/assets/partner-1.svg",
        shortBio:
            "CA Suresh Agarwal is the founding partner with over 25 years of experience in audit, taxation, and corporate advisory.",
        longBio:
            "CA Suresh Agarwal founded S.A.M.P.N. & Associates in 2005 with a vision to provide world-class chartered accountancy services to businesses across Eastern India. With over 25 years of professional experience, he has led engagements for Fortune 500 companies, large PSUs, and high-growth startups alike. His expertise spans statutory audits, corporate restructuring, international taxation, and FEMA compliance. He is a regular speaker at ICAI seminars and has authored multiple articles on tax reform and GST implementation. Under his leadership, the firm has grown to serve over 1,500 clients across multiple sectors.",
        keyProjects: [
            {
                title: "Steel Corp Restructuring",
                description:
                    "Led the financial restructuring of a ₹500 crore steel manufacturing company including debt reorganization and tax optimization.",
            },
            {
                title: "Fintech Startup Audit",
                description:
                    "Managed the first statutory audit for a high-growth fintech platform processing ₹200 crore in annual transactions.",
            },
            {
                title: "Cross-Border M&A Advisory",
                description:
                    "Provided tax structuring advisory for a cross-border acquisition involving entities in India, Singapore, and the UAE.",
            },
        ],
        email: "suresh@sampnassociates.com",
        linkedin: "https://linkedin.com/in/sureshagarwal",
    },
    {
        slug: "anita-mishra",
        name: "CA Anita Mishra",
        designation: "Senior Partner",
        qualifications: ["ACA", "CS", "LL.B", "B.Com"],
        specializations: [
            "GST Advisory & Compliance",
            "Company Law & ROC Compliance",
            "Transfer Pricing",
            "Corporate Governance",
        ],
        memberships: [
            "Associate Member – ICAI",
            "Associate Member – ICSI",
            "Bar Council of West Bengal",
        ],
        yearsExperience: 18,
        photo: "/assets/partner-2.svg",
        shortBio:
            "CA Anita Mishra is a triple-qualified professional specializing in GST, corporate law, and governance advisory.",
        longBio:
            "CA Anita Mishra brings a unique multi-disciplinary perspective to the firm with her qualifications as a Chartered Accountant, Company Secretary, and practicing advocate. Over 18 years of professional experience, she has developed deep expertise in GST implementation and advisory, company law compliance, and corporate governance frameworks. She has successfully represented clients before various tribunals and appellate authorities. Her work in transfer pricing documentation for IT and pharmaceutical companies has been recognized by industry peers. She leads the firm's corporate compliance and governance practice.",
        keyProjects: [
            {
                title: "GST Migration – Manufacturing Group",
                description:
                    "Led the smooth GST transition for a group of 12 manufacturing entities across 5 states with zero disruption to operations.",
            },
            {
                title: "IPO Compliance Readiness",
                description:
                    "Prepared a mid-cap company for IPO readiness including governance restructuring, SEBI compliance, and prospectus review.",
            },
            {
                title: "Transfer Pricing Defense",
                description:
                    "Successfully defended a ₹50 crore transfer pricing adjustment for an IT company before the Dispute Resolution Panel.",
            },
        ],
        email: "anita@sampnassociates.com",
        linkedin: "https://linkedin.com/in/anitamishra",
    },
    {
        slug: "pradeep-nayak",
        name: "CA Pradeep Nayak",
        designation: "Partner",
        qualifications: ["ACA", "CMA", "MBA (Finance)", "B.Com (Hons)"],
        specializations: [
            "Risk Advisory & Internal Controls",
            "Business Valuation & Due Diligence",
            "Forensic Audit",
            "Financial Planning & Analysis",
        ],
        memberships: [
            "Associate Member – ICAI",
            "Associate Member – ICMAI",
            "CFE – Association of Certified Fraud Examiners",
        ],
        yearsExperience: 15,
        photo: "/assets/partner-3.svg",
        shortBio:
            "CA Pradeep Nayak specializes in risk management, forensic audit, and business advisory with 15 years of experience.",
        longBio:
            "CA Pradeep Nayak joined the firm in 2012 and brings specialized expertise in enterprise risk management, forensic accounting, and business valuations. With dual qualifications as a CA and CMA complemented by an MBA in Finance, he provides data-driven insights for complex business decisions. He has conducted forensic investigations for listed companies and has been appointed as an expert witness in fraud cases. His business valuation work spans industries including real estate, healthcare, education, and fintech. He heads the firm's risk advisory and valuation practice and is known for his analytical approach to problem-solving.",
        keyProjects: [
            {
                title: "Fraud Investigation – Banking Sector",
                description:
                    "Conducted a comprehensive forensic audit uncovering a ₹25 crore fraud in a cooperative bank, leading to successful prosecution.",
            },
            {
                title: "Healthcare Group Valuation",
                description:
                    "Performed fair market valuation of a multi-hospital healthcare chain for PE investment, facilitating a ₹100 crore fundraise.",
            },
            {
                title: "Enterprise Risk Framework – NBFC",
                description:
                    "Designed and implemented a complete enterprise risk management framework for a systemically important NBFC.",
            },
        ],
        email: "pradeep@sampnassociates.com",
        linkedin: "https://linkedin.com/in/pradeepnayak",
    },
];
