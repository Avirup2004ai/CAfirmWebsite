export interface KnowledgeItem {
    slug: string;
    title: string;
    description: string;
    date?: string;
    category?: string;
    downloadUrl?: string;
    externalUrl?: string;
    content?: string;
}

export const calculators: KnowledgeItem[] = [
    { slug: "gst-calculator", title: "GST Calculator", description: "Calculate GST amount, CGST, SGST/IGST, and total price for all GST rates." },
    { slug: "hra-exemption", title: "HRA Exemption Calculator", description: "Estimate your House Rent Allowance exemption under Section 10(13A) of the Income Tax Act." },
    { slug: "simple-interest", title: "SI / CI / EMI Calculator", description: "Calculate simple interest, compound interest, and estimated EMI for loans." },
    { slug: "sip", title: "SIP Calculator", description: "Project your mutual fund SIP returns with year-wise corpus growth visualization." },
    { slug: "income-tax", title: "Income Tax Calculator", description: "Calculate income tax under both Old and New regimes with slab-wise breakdown for FY 2025-26." },
    { slug: "corporate-tax", title: "Corporate Tax Calculator", description: "Compute corporate/MSME tax liability with surcharge, cess, and effective tax rate." },
    { slug: "tds", title: "TDS Calculator", description: "Calculate TDS deduction amount and net payable for various payment sections." },
    { slug: "capital-gains", title: "Capital Gains Calculator", description: "Compute LTCG/STCG tax on equity, debt, and property with holding period analysis." },
    { slug: "fd-rd", title: "FD/RD Tax Impact Calculator", description: "Compare pre-tax and post-tax returns on Fixed Deposits and Recurring Deposits." },
    { slug: "basic", title: "Basic Calculator", description: "Standard arithmetic calculator with history log and keyboard support." },
];

export const bulletins: KnowledgeItem[] = [
    { slug: "budget-2025-highlights", title: "Union Budget 2025–26 Highlights", description: "Key takeaways from the Union Budget including tax changes, GST updates, and compliance amendments.", date: "2025-02-01", category: "Budget", content: "The Union Budget 2025-26 introduces several key changes affecting businesses and individuals. Major highlights include revised income tax slabs under the new regime, changes to capital gains taxation, enhanced deductions for startups, GST rate rationalization proposals, and increased digital compliance requirements." },
    { slug: "gst-annual-return-guide", title: "GSTR-9 Annual Return Filing Guide", description: "Step-by-step guide for filing GSTR-9 and GSTR-9C for FY 2024-25.", date: "2025-01-15", category: "GST", content: "This comprehensive guide covers the preparation, reconciliation, and filing of GSTR-9 (Annual Return) and GSTR-9C (Reconciliation Statement). Key areas include turnover reconciliation, ITC reconciliation, HSN-wise summary preparation, and common errors to avoid during filing." },
    { slug: "new-tax-regime-analysis", title: "New vs Old Tax Regime: Detailed Analysis", description: "Comparative analysis of the new and old income tax regimes with break-even calculations.", date: "2025-03-01", category: "Income Tax", content: "This analysis provides a detailed comparison between the old and new income tax regimes introduced under Section 115BAC. It includes break-even analysis for different salary levels, impact of deductions, and recommendations for optimal regime selection." },
    { slug: "msme-registration-update", title: "MSME Registration & Udyam Portal Updates", description: "Latest changes to MSME classification and Udyam registration process.", date: "2024-12-10", category: "Compliance", content: "Updated guide on MSME classification criteria, Udyam registration portal changes, benefits available to registered MSMEs, and the impact of recent amendments on existing enterprises." },
    { slug: "corporate-tax-rates-2025", title: "Corporate Tax Rates FY 2025-26", description: "Complete guide to applicable corporate tax rates including surcharge and cess.", date: "2025-04-01", category: "Income Tax", content: "A comprehensive reference for all corporate tax rates applicable for FY 2025-26, including rates for domestic companies, foreign companies, Section 115BAA/115BAB companies, and the impact of surcharge and health & education cess." },
];

export const utilities: KnowledgeItem[] = [
    { slug: "due-date-calendar", title: "Compliance Due Date Calendar 2025-26", description: "Month-wise compliance calendar for Income Tax, GST, TDS, ROC, and other statutory filings.", content: "A complete month-wise listing of all statutory due dates for FY 2025-26 including GST returns, TDS returns, advance tax installments, ROC filings, and ESI/PF returns." },
    { slug: "tds-rate-chart", title: "TDS Rate Chart FY 2025-26", description: "Complete TDS/TCS rate chart with sections, thresholds, and rates for residents and non-residents.", content: "Comprehensive TDS rate chart covering all sections from 192 to 206C, including threshold limits, rates for residents and non-residents, and applicable surcharge and cess." },
    { slug: "gst-hsn-code-finder", title: "GST HSN/SAC Code Quick Reference", description: "Commonly used HSN codes for goods and SAC codes for services with applicable GST rates.", content: "A quick reference guide listing commonly used HSN codes for goods and SAC codes for services, organized by category, with applicable GST rates and exemptions." },
    { slug: "income-tax-slab-chart", title: "Income Tax Slab Rates FY 2025-26", description: "Individual income tax slabs for old and new regime with surcharge details.", content: "Detailed income tax slab rates for individuals, HUFs, and senior citizens under both old and new tax regimes, including surcharge thresholds and marginal relief provisions." },
];

export const usefulLinks: KnowledgeItem[] = [
    { slug: "income-tax-portal", title: "Income Tax e-Filing Portal", description: "Official Income Tax Department e-filing portal for returns, refunds, and compliance.", externalUrl: "https://www.incometax.gov.in" },
    { slug: "gst-portal", title: "GST Portal", description: "Official Goods and Services Tax portal for registration, returns, and compliance.", externalUrl: "https://www.gst.gov.in" },
    { slug: "mca-portal", title: "MCA Portal (Ministry of Corporate Affairs)", description: "Company registration, ROC filings, and corporate information.", externalUrl: "https://www.mca.gov.in" },
    { slug: "rbi-website", title: "Reserve Bank of India", description: "Central bank regulations, circulars, and FEMA guidelines.", externalUrl: "https://www.rbi.org.in" },
    { slug: "icai-website", title: "ICAI – Institute of Chartered Accountants of India", description: "Professional standards, guidance notes, and CA resources.", externalUrl: "https://www.icai.org" },
    { slug: "traces-portal", title: "TRACES – TDS Reconciliation Portal", description: "Download Form 26AS, TDS certificates, and TDS compliance.", externalUrl: "https://www.tdscpc.gov.in" },
    { slug: "epfo-portal", title: "EPFO Portal", description: "EPF compliance, claims, and employer services.", externalUrl: "https://www.epfindia.gov.in" },
    { slug: "sebi-website", title: "SEBI – Securities Exchange Board of India", description: "Capital market regulations, circulars, and compliance requirements.", externalUrl: "https://www.sebi.gov.in" },
];

export const acts: KnowledgeItem[] = [
    { slug: "income-tax-act-1961", title: "Income Tax Act, 1961", description: "The principal direct tax legislation governing income tax in India.", content: "The Income Tax Act, 1961 is the primary legislation for levying, administering, and collecting income tax in India. Key chapters cover heads of income, deductions, tax rates, assessment procedures, appeals, and penalties. Major amendments include the introduction of Section 115BAC (new tax regime), changes to capital gains provisions, and enhanced TDS requirements." },
    { slug: "companies-act-2013", title: "Companies Act, 2013", description: "Governs incorporation, management, and winding up of companies in India.", content: "The Companies Act, 2013 replaced the Companies Act, 1956 and provides the legal framework for company formation, management, and dissolution in India. It covers company types, director duties, accounts and audit requirements, corporate social responsibility, and winding up procedures." },
    { slug: "gst-act-2017", title: "Goods & Services Tax Act, 2017", description: "Central GST Act governing indirect tax on supply of goods and services.", content: "The Central Goods and Services Tax Act, 2017 (CGST Act) along with corresponding SGST/IGST Acts provides the legal framework for GST in India. It covers registration, supply, time and place of supply, input tax credit, returns, assessment, and offences." },
    { slug: "fema-1999", title: "Foreign Exchange Management Act, 1999", description: "Regulates foreign exchange transactions and promotes orderly forex market.", content: "FEMA, 1999 provides the regulatory framework for facilitating external trade and payments and for promoting the orderly development of the foreign exchange market in India. It covers current and capital account transactions, authorized persons, and enforcement." },
    { slug: "indian-partnership-act-1932", title: "Indian Partnership Act, 1932", description: "Governs the formation, operation, and dissolution of partnerships.", content: "The Indian Partnership Act, 1932 defines and regulates the formation, duties, and dissolution of partnerships in India. It covers partner relations, rights, duties, property, and the process of dissolution and winding up." },
];

export const rules: KnowledgeItem[] = [
    { slug: "income-tax-rules-1962", title: "Income Tax Rules, 1962", description: "Rules prescribed under the Income Tax Act for implementation of tax provisions.", content: "The Income Tax Rules, 1962 provide detailed procedural guidelines for implementation of the Income Tax Act. They prescribe forms, methods of computation, depreciation rates, and procedural requirements for various provisions of the Act." },
    { slug: "companies-rules-2014", title: "Companies (Various) Rules, 2014", description: "Rules under the Companies Act covering incorporation, meetings, accounts, and more.", content: "Multiple sets of rules under the Companies Act, 2013 governance specific areas including Company Incorporation Rules, Company Management Rules, Company Accounts Rules, and Company Audit Rules." },
    { slug: "gst-rules-2017", title: "Central GST Rules, 2017", description: "Rules for registration, invoicing, returns, and refunds under GST.", content: "The CGST Rules, 2017 provide detailed procedures for GST compliance including registration, invoice requirements, input tax credit, returns, assessments, refunds, and advance ruling." },
    { slug: "transfer-pricing-rules", title: "Transfer Pricing Rules", description: "Rules 10A to 10THD under Income Tax Rules for transfer pricing compliance.", content: "Rules 10A through 10THD of the Income Tax Rules prescribe the methods, procedures, and documentation requirements for determining arm's length price in international and specified domestic transactions." },
];

export const forms: KnowledgeItem[] = [
    { slug: "itr-1-sahaj", title: "ITR-1 (Sahaj)", description: "For resident individuals with salary, one house property, and other income.", downloadUrl: "#" },
    { slug: "itr-2", title: "ITR-2", description: "For individuals and HUFs not having business income.", downloadUrl: "#" },
    { slug: "itr-3", title: "ITR-3", description: "For individuals and HUFs having business or professional income.", downloadUrl: "#" },
    { slug: "itr-4-sugam", title: "ITR-4 (Sugam)", description: "For individuals, HUFs, and firms with presumptive income.", downloadUrl: "#" },
    { slug: "itr-6", title: "ITR-6", description: "For companies other than those claiming Section 11 exemption.", downloadUrl: "#" },
    { slug: "form-3ca-3cd", title: "Form 3CA/3CD", description: "Tax Audit Report and Statement of Particulars under Section 44AB.", downloadUrl: "#" },
    { slug: "form-15ca-15cb", title: "Form 15CA/15CB", description: "For furnishing information and CA certificate for foreign remittances.", downloadUrl: "#" },
    { slug: "gstr-1", title: "GSTR-1", description: "Monthly/quarterly return for outward supplies of goods/services.", downloadUrl: "#" },
    { slug: "gstr-3b", title: "GSTR-3B", description: "Monthly summary return for payment of GST.", downloadUrl: "#" },
    { slug: "gstr-9", title: "GSTR-9", description: "Annual return under GST for regular taxpayers.", downloadUrl: "#" },
];
