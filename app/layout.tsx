import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./portal.css";
import "./brand.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cedwebsite.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "CED Integrated Nigeria Limited | Industrial Operations & Procurement", template: "%s | CED Integrated Nigeria Limited" },
  description: "CED Integrated Nigeria Limited provides equipment rental, bulk aggregates, skilled manpower, logistics tracking and emergency site support across Nigeria.",
  applicationName: "CED Integrated Nigeria Limited",
  authors: [{ name: "CED Integrated Nigeria Limited", url: siteUrl }],
  creator: "CED Integrated Nigeria Limited",
  publisher: "CED Integrated Nigeria Limited",
  keywords: ["industrial procurement Nigeria", "construction equipment rental Nigeria", "bulk aggregates supply", "skilled manpower Nigeria", "construction logistics", "environmental remediation Nigeria", "CED Integrated Nigeria Limited"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_NG", url: "/", siteName: "CED Integrated Nigeria Limited", title: "CED Integrated Nigeria Limited | Industrial Operations & Procurement", description: "Equipment, materials, manpower, logistics and emergency support for complex industrial work across Nigeria.", images: [{ url: "/og-image.png", width: 1600, height: 1600, alt: "CED Integrated Nigeria Limited logo" }] },
  twitter: { card: "summary_large_image", title: "CED Integrated Nigeria Limited", description: "Industrial procurement, logistics and site support across Nigeria.", images: ["/og-image.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/favicon.ico", apple: "/logo.png" },
  category: "industrial services",
};

export const viewport: Viewport = { themeColor: "#082a5f", colorScheme: "light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
