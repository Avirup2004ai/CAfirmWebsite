import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <section className="section-padding bg-white">
            <div className="section-container max-w-lg text-center">
                <div className="py-16">
                    <p className="text-8xl font-bold text-primary-100 font-heading">404</p>
                    <h1 className="mt-4 text-2xl font-bold text-neutral-900 font-heading">Page Not Found</h1>
                    <p className="mt-3 text-neutral-600">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Link href="/" className="btn-primary"><Home size={18} /> Go Home</Link>
                        <Link href="/services" className="btn-secondary"><Search size={18} /> Browse Services</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
