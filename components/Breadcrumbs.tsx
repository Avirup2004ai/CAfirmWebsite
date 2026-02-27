import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { buildJsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { siteConfig } from "@/content/site";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    const schemaItems = [
        { name: "Home", url: siteConfig.url },
        ...items.map((item) => ({
            name: item.label,
            url: item.href ? `${siteConfig.url}${item.href}` : siteConfig.url,
        })),
    ];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(breadcrumbSchema(schemaItems)) }} />
            <nav aria-label="Breadcrumb" className="section-container py-3">
                <ol className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
                    <li>
                        <Link href="/" className="flex items-center gap-1 hover:text-primary-500 transition-colors">
                            <Home size={14} /> Home
                        </Link>
                    </li>
                    {items.map((item, i) => (
                        <li key={i} className="flex items-center gap-1">
                            <ChevronRight size={14} className="text-neutral-300" />
                            {item.href && i < items.length - 1 ? (
                                <Link href={item.href} className="hover:text-primary-500 transition-colors">{item.label}</Link>
                            ) : (
                                <span className="text-neutral-700 font-medium">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
