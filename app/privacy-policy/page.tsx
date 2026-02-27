import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: `Privacy Policy of ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
    alternates: { canonical: `${siteConfig.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
            <section className="section-padding bg-white">
                <div className="section-container max-w-3xl prose prose-neutral">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">Privacy Policy</h1>
                    <p className="text-sm text-neutral-500">Last updated: January 1, 2025</p>

                    <h2 className="font-heading">1. Information We Collect</h2>
                    <p>We may collect personal information including your name, email address, phone number, and other details you voluntarily provide through our contact forms, query submissions, and career applications.</p>

                    <h2 className="font-heading">2. How We Use Your Information</h2>
                    <p>We use collected information to respond to your inquiries, provide our professional services, send updates about relevant regulatory changes, and improve our website experience.</p>

                    <h2 className="font-heading">3. Data Protection</h2>
                    <p>We implement appropriate security measures to protect your personal data. We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law.</p>

                    <h2 className="font-heading">4. Cookies</h2>
                    <p>Our website may use cookies for analytics purposes (Google Analytics) and to enhance user experience. You can choose to disable cookies through your browser settings.</p>

                    <h2 className="font-heading">5. Third-Party Links</h2>
                    <p>Our website may contain links to third-party websites such as government portals and regulatory bodies. We are not responsible for their privacy practices.</p>

                    <h2 className="font-heading">6. Your Rights</h2>
                    <p>You have the right to access, correct, or delete your personal data. Contact us at <a href={`mailto:${siteConfig.emails[0]}`}>{siteConfig.emails[0]}</a> for any privacy-related requests.</p>

                    <h2 className="font-heading">7. Changes to This Policy</h2>
                    <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>

                    <h2 className="font-heading">8. Contact Us</h2>
                    <p>For questions about this Privacy Policy, contact us at:</p>
                    <p>{siteConfig.name}<br />{siteConfig.addresses[0].line1}, {siteConfig.addresses[0].line2}<br />Email: {siteConfig.emails[0]}<br />Phone: {siteConfig.phones[0]}</p>
                </div>
            </section>
        </>
    );
}
