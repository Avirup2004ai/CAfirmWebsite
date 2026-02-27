export interface JobListing {
    slug: string;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
}

export const jobListings: JobListing[] = [
    {
        slug: "senior-audit-associate",
        title: "Senior Audit Associate",
        department: "Audit & Assurance",
        location: "Kolkata",
        type: "Full-time",
        experience: "3–5 years",
        description:
            "We are looking for an experienced audit professional to join our growing Audit & Assurance team. You will lead audit engagements for mid-to-large clients across manufacturing, IT, and financial services sectors.",
        responsibilities: [
            "Lead and execute statutory audit engagements",
            "Prepare audit planning memoranda and risk assessments",
            "Supervise and mentor junior audit staff",
            "Review financial statements for compliance with Ind AS",
            "Coordinate with clients and manage engagement timelines",
            "Prepare management letters and audit reports",
        ],
        requirements: [
            "Qualified CA (ACA/FCA)",
            "3–5 years post-qualification experience in statutory audit",
            "Strong knowledge of Indian Accounting Standards (Ind AS)",
            "Proficiency in audit tools and MS Excel",
            "Excellent communication and leadership skills",
            "DISA certification preferred",
        ],
        benefits: [
            "Competitive salary with performance bonuses",
            "Health insurance for self and family",
            "Professional development support (CPE, conferences)",
            "Flexible work arrangements",
            "Clear career progression path to Manager/Partner",
        ],
    },
    {
        slug: "gst-tax-consultant",
        title: "GST & Tax Consultant",
        department: "Taxation",
        location: "Kolkata / Puri",
        type: "Full-time",
        experience: "2–4 years",
        description:
            "Join our Taxation team to provide expert GST and direct tax advisory services to a diverse client portfolio. You will handle complex GST compliance, return filing, and advisory matters.",
        responsibilities: [
            "Handle GST registration, return filing, and compliance",
            "Prepare and review GSTR-1, GSTR-3B, and GSTR-9",
            "Assist with income tax planning and ITR filing",
            "Handle GST refund applications and ITC optimization",
            "Respond to tax notices and represent before authorities",
            "Stay updated on tax law changes and advise clients",
        ],
        requirements: [
            "CA Inter or Qualified CA",
            "2–4 years experience in GST and direct taxation",
            "Hands-on experience with GST portal and e-filing",
            "Knowledge of Tally and accounting software",
            "Strong analytical and problem-solving skills",
            "Good written and verbal communication",
        ],
        benefits: [
            "Competitive compensation package",
            "Performance-based incentives",
            "Learning opportunities across tax domains",
            "Work-life balance focused culture",
            "Medical insurance coverage",
        ],
    },
    {
        slug: "articled-assistant",
        title: "Articled Assistant / Intern",
        department: "Multi-disciplinary",
        location: "Kolkata",
        type: "Articleship (3 years)",
        experience: "CA Student (IPCC/Inter cleared)",
        description:
            "Complete your CA articleship with hands-on exposure to audit, taxation, GST, company law, and advisory services. Work directly with experienced partners and gain practical knowledge across multiple domains.",
        responsibilities: [
            "Assist in statutory and internal audit engagements",
            "Support tax computation and return filing",
            "Help with GST compliance and reconciliation",
            "Prepare working papers and documentation",
            "Research on tax and regulatory matters",
            "Participate in client meetings and presentations",
        ],
        requirements: [
            "CA Intermediate / IPCC cleared",
            "Registered with ICAI for articleship",
            "Strong academic record",
            "Proficiency in MS Office and accounting software",
            "Eagerness to learn and take initiative",
            "Good communication skills",
        ],
        benefits: [
            "Stipend as per ICAI norms (and above)",
            "Diverse exposure across service lines",
            "Direct mentorship from qualified CAs",
            "Study leave for CA Final preparation",
            "Post-qualification absorption opportunity",
        ],
    },
];
