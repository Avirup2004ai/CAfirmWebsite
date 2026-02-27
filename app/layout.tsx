import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { InitialLoaderGate } from "@/components/InitialLoaderGate";
import { siteConfig } from "@/content/site";
import { buildJsonLd, organizationSchema, localBusinessSchema } from "@/lib/jsonld";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} – ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {siteConfig.ga4Id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4Id}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${siteConfig.ga4Id}');`,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildJsonLd(organizationSchema()) }}
        />
        {siteConfig.addresses.map((addr) => {
          const schema = localBusinessSchema(addr.id);
          return schema ? (
            <script
              key={addr.id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: buildJsonLd(schema) }}
            />
          ) : null;
        })}
      </head>
      <body className="flex min-h-screen flex-col" style={{ fontFamily: "var(--font-inter), var(--font-sans)" }}>
        <ScrollProgress />
        <InitialLoaderGate>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </InitialLoaderGate>
      </body>
    </html>
  );
}
