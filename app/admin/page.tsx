import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/content/site";
import { Lock, Settings } from "lucide-react";

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin panel placeholder for authorized staff access.",
    alternates: { canonical: `${siteConfig.url}/admin` },
    robots: { index: false, follow: false },
};

export default function AdminPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: "Admin" }]} />
            <section className="section-padding bg-white">
                <div className="section-container max-w-lg text-center">
                    <div className="card py-16">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50">
                            <Lock size={36} className="text-primary-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-neutral-900 font-heading">Admin Panel</h1>
                        <p className="mt-3 text-neutral-600">This area is reserved for authorized staff members.</p>
                        <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4">
                            <div className="flex items-center justify-center gap-2 text-amber-700">
                                <Settings size={18} /> <span className="text-sm font-medium">Coming Soon</span>
                            </div>
                            <p className="mt-2 text-sm text-amber-600">The admin dashboard is currently under development. Contact IT support for access.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
