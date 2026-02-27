export interface Service {
    slug: string;
    title: string;
    shortDescription: string;
    description: string;
    icon: string;
    whoIsItFor: string[];
    deliverables: string[];
    processSteps: string[];
    documentsRequired: string[];
    faqs: { question: string; answer: string }[];
    keywords: string[];
    relatedServices: string[];
}

export interface ServiceCategory {
    slug: string;
    title: string;
    description: string;
    icon: string;
    services: Service[];
    faqs: { question: string; answer: string }[];
}

export const serviceCategories: ServiceCategory[] = [
    {
        slug: "audit-assurance",
        title: "Audit & Assurance",
        description:
            "Comprehensive audit and assurance services to ensure regulatory compliance, enhance credibility, and provide stakeholders with reliable financial information.",
        icon: "Shield",
        faqs: [
            { question: "What is a statutory audit?", answer: "A statutory audit is a legally required review of the accuracy of a company's financial statements and records, mandated under the Companies Act, 2013." },
            { question: "How often should a company undergo an audit?", answer: "Companies are required to undergo annual statutory audits. However, internal audits and special audits may be conducted more frequently based on business needs." },
            { question: "What is the difference between internal and external audit?", answer: "Internal audits are conducted by the organization's own staff to evaluate risk management and internal controls. External audits are performed by independent auditors to provide an unbiased opinion on financial statements." },
        ],
        services: [
            {
                slug: "statutory-audit",
                title: "Statutory Audit",
                shortDescription: "Mandatory annual audit as per the Companies Act, 2013.",
                description:
                    "Our statutory audit services ensure your company meets all regulatory requirements under the Companies Act, 2013. We conduct thorough examinations of financial records, internal controls, and compliance frameworks to provide an independent and reliable audit opinion.",
                icon: "FileCheck",
                whoIsItFor: ["Private & Public Limited Companies", "LLPs with turnover above ₹40 lakhs", "NGOs & Trusts", "Banks & Financial Institutions"],
                deliverables: ["Audit Report with opinion", "Management Letter", "Internal Control observations", "Compliance checklist"],
                processSteps: ["Engagement planning & risk assessment", "Understanding internal controls", "Substantive testing of transactions", "Analytical review of financials", "Draft report & management discussion", "Final audit report issuance"],
                documentsRequired: ["Trial Balance & Financial Statements", "Bank statements", "Tax returns (ITR, GST)", "Board resolutions & minutes", "Contracts & agreements"],
                faqs: [
                    { question: "How long does a statutory audit take?", answer: "Typically 2–4 weeks depending on the size and complexity of the organization." },
                    { question: "What happens if a company fails to get audited?", answer: "Non-compliance can result in penalties, fines, and legal consequences under the Companies Act." },
                    { question: "Can the same auditor audit a company indefinitely?", answer: "No, auditor rotation is mandated for listed companies every 5 consecutive years for individuals and 10 years for firms." },
                    { question: "What are CARO requirements?", answer: "Companies (Auditor's Report) Order requires auditors to report on specific matters like fixed assets, inventory, loans, and more." },
                    { question: "Do small companies need statutory audits?", answer: "Yes, all companies registered under the Companies Act must undergo statutory audit regardless of size." },
                ],
                keywords: ["statutory audit", "companies act audit", "annual audit", "financial audit India"],
                relatedServices: ["internal-audit", "tax-audit"],
            },
            {
                slug: "internal-audit",
                title: "Internal Audit",
                shortDescription: "Systematic evaluation of internal controls, processes, and risk management.",
                description:
                    "Our internal audit services help organizations strengthen governance, improve operational efficiency, and manage risks effectively. We evaluate the adequacy of internal controls and recommend improvements.",
                icon: "ClipboardCheck",
                whoIsItFor: ["Mid to large enterprises", "Companies preparing for external audit", "Organizations strengthening governance", "Public sector entities"],
                deliverables: ["Internal Audit Report", "Risk Assessment Matrix", "Process improvement recommendations", "Compliance gap analysis"],
                processSteps: ["Scoping & planning", "Risk assessment", "Control testing", "Findings documentation", "Report presentation to management", "Follow-up review"],
                documentsRequired: ["Organization chart", "Policy & procedure manuals", "Previous audit reports", "Financial records", "Process flowcharts"],
                faqs: [
                    { question: "Is internal audit mandatory?", answer: "It is mandatory for listed companies and prescribed classes of companies under Section 138 of the Companies Act." },
                    { question: "How is internal audit different from statutory audit?", answer: "Internal audit focuses on operational efficiency and risk management, while statutory audit focuses on financial statement accuracy." },
                    { question: "How often should internal audits be conducted?", answer: "Quarterly or semi-annually is recommended, though the frequency depends on business complexity and risk profile." },
                    { question: "Who conducts internal audits?", answer: "A chartered accountant or a cost accountant, either in-practice or employed as an internal auditor." },
                    { question: "What are the key benefits of internal audit?", answer: "Improved controls, fraud detection, operational efficiency, risk mitigation, and regulatory compliance." },
                ],
                keywords: ["internal audit", "risk management audit", "internal controls", "governance audit"],
                relatedServices: ["statutory-audit", "risk-advisory"],
            },
            {
                slug: "tax-audit",
                title: "Tax Audit",
                shortDescription: "Tax audit under Section 44AB of the Income Tax Act.",
                description:
                    "We conduct tax audits as required under Section 44AB of the Income Tax Act for businesses and professionals whose turnover or gross receipts exceed prescribed limits. Our audits ensure accurate tax reporting and compliance.",
                icon: "Calculator",
                whoIsItFor: ["Businesses with turnover > ₹1 crore", "Professionals with receipts > ₹50 lakhs", "Persons opting out of presumptive taxation", "Entities claiming specific deductions"],
                deliverables: ["Form 3CA/3CB", "Form 3CD with detailed annexures", "Tax audit report", "Observation letter"],
                processSteps: ["Collection & verification of books", "Verification of TDS/TCS compliance", "Analysis of tax provisions", "Preparation of Form 3CD", "Review & certification", "Filing of tax audit report"],
                documentsRequired: ["Books of account", "Bank statements", "TDS certificates", "GST returns", "ITR of previous years", "Fixed asset register"],
                faqs: [
                    { question: "What is the due date for tax audit?", answer: "September 30 of the assessment year (may be extended by government notifications)." },
                    { question: "Is tax audit applicable to individuals?", answer: "Yes, if the individual's business turnover exceeds ₹1 crore or professional receipts exceed ₹50 lakhs." },
                    { question: "What is Form 3CD?", answer: "It's a statement of particulars required to be furnished under Section 44AB, containing detailed disclosures about the auditee." },
                    { question: "Penalty for not getting tax audit done?", answer: "A penalty of 0.5% of turnover or ₹1.5 lakhs, whichever is lower, under Section 271B." },
                    { question: "Can the same CA do statutory and tax audit?", answer: "Yes, the same chartered accountant can conduct both audits for a company." },
                ],
                keywords: ["tax audit", "section 44AB", "form 3CD", "income tax audit"],
                relatedServices: ["statutory-audit", "income-tax-planning"],
            },
        ],
    },
    {
        slug: "taxation",
        title: "Taxation",
        description:
            "Expert taxation services covering direct and indirect taxes, structured to minimize liabilities, ensure compliance, and optimize your tax position.",
        icon: "Receipt",
        faqs: [
            { question: "What are direct and indirect taxes?", answer: "Direct taxes are levied on income/profits (Income Tax, Corporate Tax). Indirect taxes are levied on goods/services (GST, Customs Duty)." },
            { question: "When should I start tax planning?", answer: "Tax planning should ideally begin at the start of the financial year to maximize savings through eligible deductions and exemptions." },
        ],
        services: [
            {
                slug: "income-tax-planning",
                title: "Income Tax Planning & Filing",
                shortDescription: "Strategic tax planning and timely filing for individuals and businesses.",
                description:
                    "Our income tax services cover end-to-end tax planning, computation, and filing for individuals, HUFs, partnerships, and companies. We optimize your tax position while ensuring full compliance.",
                icon: "TrendingDown",
                whoIsItFor: ["Salaried individuals", "Business owners", "HUFs & partnerships", "Companies", "NRIs"],
                deliverables: ["Tax computation sheet", "ITR filing & acknowledgment", "Tax planning advisory report", "Advance tax schedule"],
                processSteps: ["Income assessment & categorization", "Deduction & exemption analysis", "Tax computation", "Return preparation", "E-filing & verification", "Refund tracking"],
                documentsRequired: ["Form 16/16A", "Bank interest certificates", "Investment proofs", "Rental income details", "Capital gains statements", "Previous ITRs"],
                faqs: [
                    { question: "What is the last date for filing ITR?", answer: "July 31 for individuals and non-audit cases; October 31 for audit cases." },
                    { question: "Which ITR form should I use?", answer: "It depends on your income sources – ITR-1 for salaried, ITR-3 for business income, ITR-4 for presumptive income, etc." },
                    { question: "Can I revise my income tax return?", answer: "Yes, a revised return can be filed before December 31 of the assessment year." },
                    { question: "What deductions are available under Section 80C?", answer: "Up to ₹1.5 lakhs for investments in PPF, ELSS, life insurance premiums, tuition fees, and more." },
                    { question: "Is tax planning legal?", answer: "Absolutely. Tax planning involves using legal provisions to minimize tax liability, unlike tax evasion which is illegal." },
                ],
                keywords: ["income tax planning", "ITR filing", "tax saving", "section 80C"],
                relatedServices: ["tax-audit", "gst-advisory"],
            },
            {
                slug: "gst-advisory",
                title: "GST Advisory & Compliance",
                shortDescription: "Complete GST registration, filing, refund, and advisory services.",
                description:
                    "We provide comprehensive GST services including registration, monthly/quarterly return filing, annual return filing, refund claims, and strategic advisory to optimize your GST position.",
                icon: "FileSpreadsheet",
                whoIsItFor: ["Businesses registered under GST", "E-commerce operators", "Export/import businesses", "Service providers", "New businesses requiring registration"],
                deliverables: ["GST registration certificate", "Monthly/quarterly return filing", "Annual return (GSTR-9)", "GST audit report (GSTR-9C)", "Refund application"],
                processSteps: ["GST health check", "Return preparation & reconciliation", "ITC optimization", "Filing & compliance calendar", "Refund processing", "Advisory & updates"],
                documentsRequired: ["Sales & purchase invoices", "Bank statements", "E-way bills", "Previous returns", "HSN/SAC codes list"],
                faqs: [
                    { question: "Who needs to register for GST?", answer: "Businesses with aggregate turnover exceeding ₹40 lakhs (₹20 lakhs for services) must register. Certain categories require mandatory registration." },
                    { question: "What is Input Tax Credit?", answer: "ITC is the credit a business receives for GST paid on purchases, which can be used to offset GST liability on sales." },
                    { question: "What are the GST return filing deadlines?", answer: "GSTR-1 by 11th, GSTR-3B by 20th of the following month. GSTR-9 annually by December 31." },
                    { question: "Can GST registration be cancelled?", answer: "Yes, voluntarily or by the tax department if conditions are not met. There's a revocation process available." },
                    { question: "What is the GST composition scheme?", answer: "A scheme for small taxpayers with turnover up to ₹1.5 crores to pay tax at a fixed rate with simplified compliance." },
                ],
                keywords: ["GST advisory", "GST filing", "GST registration", "input tax credit", "GST refund"],
                relatedServices: ["income-tax-planning", "transfer-pricing"],
            },
            {
                slug: "transfer-pricing",
                title: "Transfer Pricing",
                shortDescription: "Transfer pricing documentation, compliance, and advisory.",
                description:
                    "Our transfer pricing team helps multinational enterprises comply with Indian transfer pricing regulations, prepare documentation, and defend their pricing arrangements before tax authorities.",
                icon: "ArrowLeftRight",
                whoIsItFor: ["Multinational corporations", "Companies with international transactions", "Entities with specified domestic transactions", "Companies under TP audit"],
                deliverables: ["TP study report", "Master File", "Country-by-Country Report", "TP documentation", "Benchmarking analysis"],
                processSteps: ["Transaction identification", "Functional analysis", "Comparability analysis", "Method selection", "Benchmarking", "Documentation & filing"],
                documentsRequired: ["International transaction details", "Intercompany agreements", "Financial statements", "Group structure", "Functional profiles"],
                faqs: [
                    { question: "What is transfer pricing?", answer: "Transfer pricing refers to the pricing of transactions between related parties/associated enterprises, regulated to ensure arm's length pricing." },
                    { question: "When is TP documentation required?", answer: "For international transactions exceeding ₹1 crore or specified domestic transactions exceeding ₹20 crores." },
                    { question: "What is the arm's length principle?", answer: "It requires that transactions between related parties be priced as if they were between unrelated parties in comparable circumstances." },
                    { question: "What is Form 3CEB?", answer: "A report from a CA certifying international and specified domestic transactions, to be filed before the due date of ITR." },
                    { question: "What are the penalties for TP non-compliance?", answer: "Penalties include 2% of international transaction value for documentation failure and 100-300% of tax on adjustments." },
                ],
                keywords: ["transfer pricing India", "TP documentation", "arm's length pricing", "form 3CEB"],
                relatedServices: ["income-tax-planning", "international-taxation"],
            },
        ],
    },
    {
        slug: "corporate-law",
        title: "Corporate & Company Law",
        description:
            "Complete corporate law services covering company formation, compliance, FEMA advisory, and corporate restructuring under the Companies Act, 2013.",
        icon: "Building2",
        faqs: [
            { question: "What type of company should I form?", answer: "It depends on factors like number of owners, liability preference, compliance requirements, and growth plans. Private limited is most common for startups." },
            { question: "What is annual compliance for companies?", answer: "Annual compliance includes filing annual returns, financial statements, conducting AGM, maintaining statutory registers, and board meeting requirements." },
        ],
        services: [
            {
                slug: "company-incorporation",
                title: "Company Incorporation & Startup Registration",
                shortDescription: "End-to-end company formation and startup registration services.",
                description:
                    "We handle the complete incorporation process from name reservation to certificate of incorporation, including DPIIT startup recognition, MSME registration, and initial compliance setup.",
                icon: "Rocket",
                whoIsItFor: ["Entrepreneurs & startups", "Foreign companies entering India", "Professionals forming LLPs", "Partnership to company conversions"],
                deliverables: ["Certificate of Incorporation", "PAN & TAN", "GST registration", "DPIIT Startup Recognition", "MOA & AOA drafting"],
                processSteps: ["Business structure advisory", "Name reservation (SPICe+)", "Document drafting (MOA/AOA)", "Filing with ROC", "PAN/TAN/GST registration", "Post-incorporation compliance setup"],
                documentsRequired: ["ID proofs of directors", "Address proofs", "Registered office proof", "NOC from owner", "Digital signatures"],
                faqs: [
                    { question: "How long does company incorporation take?", answer: "Typically 7–15 working days from filing to certificate receipt." },
                    { question: "What is the minimum capital required?", answer: "There is no minimum paid-up capital requirement for private limited companies since the Companies Amendment Act, 2015." },
                    { question: "Can a single person form a company?", answer: "Yes, One Person Company (OPC) can be formed with a single member and director under Section 2(62)." },
                    { question: "What is SPICe+ form?", answer: "Simplified Proforma for Incorporating Company Electronically Plus – an integrated form for incorporation plus multiple registrations." },
                    { question: "Is a registered office address mandatory?", answer: "Yes, every company must have a registered office within 30 days of incorporation." },
                ],
                keywords: ["company incorporation", "startup registration", "private limited company", "LLP formation"],
                relatedServices: ["annual-compliance", "fema-advisory"],
            },
            {
                slug: "annual-compliance",
                title: "Annual ROC Compliance",
                shortDescription: "Timely filing of annual returns and financial statements with ROC.",
                description:
                    "We manage your entire annual compliance calendar including preparation and filing of annual returns, financial statements, board meetings, and other periodic filings with the Registrar of Companies.",
                icon: "CalendarCheck",
                whoIsItFor: ["Private limited companies", "Public limited companies", "OPCs", "Section 8 companies", "LLPs"],
                deliverables: ["Annual return (Form MGT-7)", "Financial statements (Form AOC-4)", "Board meeting minutes", "Statutory registers maintenance", "Compliance calendar"],
                processSteps: ["Compliance assessment", "Document collection", "Return preparation", "Director approval", "Filing with ROC", "Acknowledgment collection"],
                documentsRequired: ["Financial statements", "Board resolutions", "Directors' report", "Auditor's report", "Shareholding details"],
                faqs: [
                    { question: "What is the deadline for annual return filing?", answer: "Within 60 days of the AGM for Form MGT-7 and within 30 days of AGM for Form AOC-4." },
                    { question: "What happens if annual returns are not filed?", answer: "Penalties of ₹100 per day of delay, plus the company and directors can face prosecution." },
                    { question: "How many board meetings are required?", answer: "Minimum 4 board meetings per year with not more than 120 days gap between two meetings." },
                    { question: "What is Form MGT-7?", answer: "Annual return containing company details, shareholding pattern, directors' information, and compliance status." },
                    { question: "Can compliance be done after the deadline?", answer: "Yes, with belated filing and additional fees/penalties as prescribed under the Act." },
                ],
                keywords: ["annual ROC compliance", "company annual return", "form MGT-7", "AOC-4 filing"],
                relatedServices: ["company-incorporation", "secretarial-services"],
            },
            {
                slug: "fema-advisory",
                title: "FEMA Advisory & Compliance",
                shortDescription: "Foreign exchange regulation advisory and RBI compliance services.",
                description:
                    "Expert advisory on Foreign Exchange Management Act provisions, RBI compliance, FDI reporting, overseas direct investments, and external commercial borrowings compliance.",
                icon: "Globe",
                whoIsItFor: ["Companies with foreign investment", "Indian companies investing abroad", "NRIs with Indian investments", "Companies with ECB", "Startups with foreign funding"],
                deliverables: ["FEMA compliance report", "FDI reporting (FC-GPR, FC-TRS)", "ODI filings", "ECB compliance", "RBI filings & approvals"],
                processSteps: ["FEMA applicability assessment", "Transaction structuring", "Documentation preparation", "RBI filings", "Annual compliance", "Advisory updates"],
                documentsRequired: ["Foreign investment details", "Shareholder agreements", "Valuation reports", "Board resolutions", "RBI correspondence"],
                faqs: [
                    { question: "What is FEMA?", answer: "Foreign Exchange Management Act, 1999 – the law governing foreign exchange transactions in India, replacing the earlier FERA." },
                    { question: "Is FDI reporting mandatory?", answer: "Yes, all FDI transactions must be reported to RBI within prescribed timelines through AD banks." },
                    { question: "What is an Authorized Dealer bank?", answer: "A bank authorized by RBI to deal in foreign exchange and through which most FEMA filings are routed." },
                    { question: "Can NRIs invest in Indian companies?", answer: "Yes, NRIs can invest through FDI route, portfolio investment scheme, or under automatic route depending on the sector." },
                    { question: "What are ECBs?", answer: "External Commercial Borrowings – loans raised by Indian companies from non-resident lenders, subject to RBI regulations." },
                ],
                keywords: ["FEMA advisory", "FDI compliance", "RBI filing", "foreign exchange India"],
                relatedServices: ["company-incorporation", "transfer-pricing"],
            },
        ],
    },
    {
        slug: "advisory",
        title: "Business Advisory",
        description:
            "Strategic advisory services covering business valuation, risk management, financial planning, and management consulting to help businesses grow sustainably.",
        icon: "Lightbulb",
        faqs: [
            { question: "What is business advisory?", answer: "Business advisory involves expert guidance on strategic decisions, financial planning, risk management, and growth optimization for organizations." },
            { question: "Do small businesses need advisory services?", answer: "Absolutely. Advisory services help SMEs with tax planning, funding strategies, compliance, and scaling operations efficiently." },
        ],
        services: [
            {
                slug: "business-valuation",
                title: "Business Valuation",
                shortDescription: "Fair market valuation of businesses, shares, and intangible assets.",
                description:
                    "We provide comprehensive business valuation services using multiple methodologies to determine fair market value for M&A transactions, fundraising, dispute resolution, and regulatory compliance.",
                icon: "BarChart3",
                whoIsItFor: ["Companies undergoing M&A", "Startups raising funding", "Shareholders in disputes", "Companies with ESOP plans", "Regulatory compliance requirements"],
                deliverables: ["Valuation report", "Fair market value certificate", "Methodology documentation", "Sensitivity analysis", "Comparable company analysis"],
                processSteps: ["Purpose & scope definition", "Information gathering", "Industry & market analysis", "Methodology selection", "Valuation computation", "Report preparation & review"],
                documentsRequired: ["Financial statements (3-5 years)", "Business plan", "Industry reports", "Shareholder agreements", "Asset details"],
                faqs: [
                    { question: "What methods are used for business valuation?", answer: "Common methods include DCF (Discounted Cash Flow), comparable company analysis, net asset value, and earnings multiple methods." },
                    { question: "When is a business valuation required?", answer: "For M&A, fundraising, share transfers, ESOP issuance, tax compliance, and dispute resolution." },
                    { question: "How long does a valuation take?", answer: "Typically 2-4 weeks depending on the complexity and availability of information." },
                    { question: "Who can issue a valuation report?", answer: "A registered valuer under the Companies Act, 2013, or a merchant banker registered with SEBI." },
                    { question: "What is the difference between book value and fair market value?", answer: "Book value is based on accounting records (historical cost), while fair market value reflects what a willing buyer would pay to a willing seller." },
                ],
                keywords: ["business valuation", "company valuation India", "fair market value", "share valuation"],
                relatedServices: ["risk-advisory", "company-incorporation"],
            },
            {
                slug: "risk-advisory",
                title: "Risk Advisory & Management",
                shortDescription: "Enterprise risk assessment, mitigation, and internal control advisory.",
                description:
                    "Our risk advisory services help organizations identify, assess, and mitigate business risks through comprehensive risk frameworks, internal control reviews, and forensic audit capabilities.",
                icon: "ShieldAlert",
                whoIsItFor: ["Large enterprises", "Listed companies", "Banks & NBFCs", "Companies with complex operations", "Entities facing regulatory scrutiny"],
                deliverables: ["Enterprise Risk Assessment report", "Risk mitigation framework", "Internal control recommendations", "Forensic audit report", "Compliance roadmap"],
                processSteps: ["Risk universe identification", "Risk assessment & prioritization", "Control evaluation", "Gap analysis", "Mitigation strategy", "Monitoring framework design"],
                documentsRequired: ["Organization structure", "Process documentation", "Previous audit findings", "Regulatory correspondence", "Financial records"],
                faqs: [
                    { question: "What is enterprise risk management (ERM)?", answer: "ERM is a holistic approach to identifying, assessing, and managing risks across an organization to protect and create value." },
                    { question: "Is risk advisory different from internal audit?", answer: "While related, risk advisory focuses proactively on risk identification and mitigation strategy, whereas internal audit evaluates existing controls." },
                    { question: "What types of risks do you assess?", answer: "Financial, operational, compliance, strategic, reputational, cyber, and fraud risks." },
                    { question: "How often should risk assessments be updated?", answer: "At least annually, or when significant business changes occur." },
                    { question: "What is a forensic audit?", answer: "An examination of financial records to detect fraud, embezzlement, or financial irregularities, often used in legal proceedings." },
                ],
                keywords: ["risk advisory", "enterprise risk management", "internal controls", "forensic audit"],
                relatedServices: ["internal-audit", "business-valuation"],
            },
            {
                slug: "secretarial-services",
                title: "Secretarial & Governance Services",
                shortDescription: "Company secretarial support and corporate governance advisory.",
                description:
                    "We provide comprehensive company secretarial services including board meeting support, statutory compliance, governance advisory, and SEBI/stock exchange compliance for listed entities.",
                icon: "ScrollText",
                whoIsItFor: ["Listed companies", "Public companies", "Companies with active boards", "Entities requiring governance improvement", "Companies pursuing listing"],
                deliverables: ["Board meeting calendar & agenda", "Minutes of meetings", "Statutory register maintenance", "Governance framework", "SEBI compliance reports"],
                processSteps: ["Governance assessment", "Compliance calendar setup", "Meeting coordination", "Minutes drafting", "Filing & reporting", "Governance advisory"],
                documentsRequired: ["Board composition details", "Previous meeting minutes", "Statutory registers", "Regulatory correspondence", "Shareholding data"],
                faqs: [
                    { question: "What are secretarial services?", answer: "Services that help companies comply with corporate law requirements regarding meetings, filings, registers, and governance standards." },
                    { question: "Is a company secretary mandatory?", answer: "Every listed company and companies with paid-up capital of ₹5 crore or more must appoint a whole-time company secretary." },
                    { question: "What is secretarial audit?", answer: "An audit of compliance with corporate laws and secretarial standards, mandatory for listed and certain public companies." },
                    { question: "How many board meetings are needed annually?", answer: "Minimum 4 per year, with not more than 120 days between consecutive meetings." },
                    { question: "What are secretarial standards?", answer: "Standards issued by ICSI governing the conduct of board meetings (SS-1) and general meetings (SS-2)." },
                ],
                keywords: ["secretarial services", "corporate governance", "company secretary", "board compliance"],
                relatedServices: ["annual-compliance", "risk-advisory"],
            },
        ],
    },
    {
        slug: "international-taxation",
        title: "International Taxation",
        description:
            "Cross-border tax planning, DTAA advisory, tax treaty interpretation, and international compliance services for globally operating businesses.",
        icon: "Plane",
        faqs: [
            { question: "What is international taxation?", answer: "International taxation deals with tax laws applicable to cross-border transactions, including income earned in multiple countries and double taxation relief." },
            { question: "What is a DTAA?", answer: "Double Taxation Avoidance Agreement – a bilateral treaty between two countries to prevent the same income from being taxed in both jurisdictions." },
        ],
        services: [
            {
                slug: "dtaa-advisory",
                title: "DTAA & Tax Treaty Advisory",
                shortDescription: "Tax treaty interpretation and double taxation relief advisory.",
                description:
                    "We advise on the application of Double Taxation Avoidance Agreements, tax treaty benefits, withholding tax optimization, and cross-border transaction structuring to minimize overall tax burden.",
                icon: "Scale",
                whoIsItFor: ["MNCs operating in India", "Indian companies with foreign operations", "NRIs", "Foreign investors", "Tech companies with cross-border services"],
                deliverables: ["DTAA benefit analysis", "Tax treaty position paper", "Withholding tax optimization", "Cross-border structure advisory", "Competent authority assistance"],
                processSteps: ["Transaction analysis", "Treaty applicability check", "Benefit quantification", "Documentation preparation", "Implementation support", "Ongoing monitoring"],
                documentsRequired: ["Cross-border transaction details", "Entity structures", "Tax residency certificates", "Existing agreements", "Previous tax positions"],
                faqs: [
                    { question: "How many DTAAs does India have?", answer: "India has DTAAs with over 90 countries, each with specific provisions for different types of income." },
                    { question: "What is a Tax Residency Certificate?", answer: "A certificate issued by the tax authority of a country confirming the tax residency of an entity, required to claim DTAA benefits." },
                    { question: "Can a company choose between DTAA and domestic law?", answer: "Yes, taxpayers can apply provisions more beneficial to them – either under DTAA or domestic law." },
                    { question: "What is the concept of Permanent Establishment?", answer: "A fixed place of business in another country that triggers tax liability in that country under most tax treaties." },
                    { question: "What is GAAR?", answer: "General Anti-Avoidance Rules – provisions that allow tax authorities to deny treaty benefits if arrangements are primarily designed for tax avoidance." },
                ],
                keywords: ["DTAA advisory", "tax treaty India", "double taxation", "cross-border taxation"],
                relatedServices: ["transfer-pricing", "income-tax-planning"],
            },
            {
                slug: "expatriate-taxation",
                title: "Expatriate Taxation",
                shortDescription: "Tax planning and compliance for expatriates and NRIs.",
                description:
                    "Comprehensive tax advisory for expatriates working in India and Indians working abroad, covering residential status determination, tax equalization, and compliance in multiple jurisdictions.",
                icon: "Users",
                whoIsItFor: ["Foreign nationals working in India", "Indians on overseas assignments", "NRIs with Indian income", "Companies with expat employees", "Returning NRIs"],
                deliverables: ["Residential status certificate", "Tax computation in multiple jurisdictions", "Tax equalization analysis", "FEMA compliance report", "DTAA benefit optimization"],
                processSteps: ["Residential status determination", "Income mapping across jurisdictions", "DTAA applicability analysis", "Tax computation & optimization", "Return filing in relevant jurisdictions", "Advisory on financial planning"],
                documentsRequired: ["Passport & visa details", "Employment contract", "Salary & compensation details", "Days-in-India computation", "Foreign tax returns/credits"],
                faqs: [
                    { question: "Who is an NRI for tax purposes?", answer: "An individual who stays in India for less than 182 days (or 60 days for certain categories) during a financial year." },
                    { question: "What is tax equalization?", answer: "A policy by employers ensuring expatriates pay the same amount of tax as they would in their home country." },
                    { question: "Does India tax global income of NRIs?", answer: "No, NRIs are taxed only on income that accrues or is received in India." },
                    { question: "What is RNOR status?", answer: "Resident but Not Ordinarily Resident – a transitional status with certain tax benefits for individuals becoming resident in India." },
                    { question: "Are foreign assets of NRIs taxable in India?", answer: "No, but residents and RNOR must disclose foreign assets in their Indian tax return (Schedule FA)." },
                ],
                keywords: ["expatriate taxation", "NRI tax India", "expat tax planning", "residential status"],
                relatedServices: ["dtaa-advisory", "fema-advisory"],
            },
        ],
    },
];
