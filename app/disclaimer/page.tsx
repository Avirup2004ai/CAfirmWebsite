import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
    title: "Disclaimer",
    description: `Professional services disclaimer for ${siteConfig.name}. Important terms regarding our services.`,
    alternates: { canonical: `${siteConfig.url}/disclaimer` },
};

export default function DisclaimerPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Disclaimer" }]} />
            <section className="section-padding bg-white">
                <div className="section-container max-w-3xl prose prose-neutral">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">Disclaimer</h1>
                    <p className="text-sm text-neutral-500">Last updated: January 1, 2025</p>

                    <h2 className="font-heading">1. Professional Services Disclaimer</h2>
                    <p>The information contained on this website is for general informational purposes only. While we strive to keep the information up to date and accurate, {siteConfig.name} makes no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of the information.</p>

                    <h2 className="font-heading">2. No Professional Advice</h2>
                    <p>The content of this website does not constitute professional advice. Specific advice should be sought from qualified chartered accountants before making decisions based on information found on this site. Tax laws and regulations change frequently, and the information here may not reflect the most recent changes.</p>

                    <h2 className="font-heading">3. Limitation of Liability</h2>
                    <p>In no event shall {siteConfig.name}, its partners, or employees be liable for any loss or damage arising from the use of information on this website, including but not limited to direct, indirect, incidental, or consequential damages.</p>

                    <h2 className="font-heading">4. Calculator Disclaimers</h2>
                    <p>The calculators provided on this website are for estimation purposes only. Results should not be considered as professional tax advice. Actual tax computations may vary based on individual circumstances and applicable provisions.</p>

                    <h2 className="font-heading">5. External Links</h2>
                    <p>This website may contain links to external websites. We do not endorse or control such external sites and are not responsible for their content or availability.</p>

                    <h2 className="font-heading">6. Intellectual Property</h2>
                    <p>All content on this website, including text, graphics, logos, and images, is the property of {siteConfig.name} and is protected by applicable intellectual property laws.</p>

                    <h2 className="font-heading">7. Governing Law</h2>
                    <p>This disclaimer shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Kolkata, West Bengal.</p>
                </div>
            </section>
        </>
    );
}
