import { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { serviceCategories } from "@/content/services";
import { bulletins } from "@/content/knowledge";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = siteConfig.url;

    const staticRoutes = [
        "", "/about", "/about/firm", "/about/partners", "/about/sectors",
        "/services", "/knowledge", "/knowledge/calculators", "/knowledge/calculators/gst-calculator",
        "/knowledge/calculators/hra-exemption", "/knowledge/calculators/simple-interest",
        "/knowledge/calculators/sip", "/knowledge/calculators/income-tax",
        "/knowledge/calculators/corporate-tax", "/knowledge/calculators/tds",
        "/knowledge/calculators/capital-gains", "/knowledge/calculators/fd-rd",
        "/knowledge/calculators/basic",
        "/knowledge/bulletins", "/knowledge/utilities", "/knowledge/links",
        "/knowledge/acts", "/knowledge/rules", "/knowledge/forms",
        "/query", "/careers", "/contact", "/privacy-policy", "/disclaimer",
    ].map((route) => ({
        url: `${base}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : route.split("/").length <= 2 ? 0.8 : 0.6,
    }));

    const serviceRoutes = serviceCategories.flatMap((cat) => [
        { url: `${base}/services/${cat.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
        ...cat.services.map((svc) => ({
            url: `${base}/services/${cat.slug}/${svc.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
    ]);

    const bulletinRoutes = [...bulletins, ...blogPosts].map((item) => ({
        url: `${base}/knowledge/bulletins/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
    }));

    return [...staticRoutes, ...serviceRoutes, ...bulletinRoutes];
}
