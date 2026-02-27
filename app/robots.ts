import { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/api/", "/_next/", "/private/"],
            },
            // Block aggressive AI scrapers and content harvesters
            {
                userAgent: "GPTBot",
                disallow: ["/about/partners", "/contact"],
            },
            {
                userAgent: "CCBot",
                disallow: ["/about/partners", "/contact"],
            },
            {
                userAgent: "anthropic-ai",
                disallow: ["/about/partners", "/contact"],
            },
            {
                userAgent: "ClaudeBot",
                disallow: ["/about/partners", "/contact"],
            },
            {
                userAgent: "Bytespider",
                disallow: "/",
            },
            {
                userAgent: "PetalBot",
                disallow: "/",
            },
            {
                userAgent: "SemrushBot",
                disallow: "/",
            },
            {
                userAgent: "AhrefsBot",
                disallow: "/",
            },
            {
                userAgent: "MJ12bot",
                disallow: "/",
            },
            {
                userAgent: "DotBot",
                disallow: "/",
            },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}
