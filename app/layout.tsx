import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dev AI Websites & WhatsApp Automation",
  description: "AI-powered websites and WhatsApp enquiry automation for businesses in Kharghar, Navi Mumbai and across India. Work directly with Dev from idea to launch.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Dev AI Websites & WhatsApp Automation",
    description: "Websites that earn attention. Automation that keeps it.",
    siteName: "DEV / AI STUDIO",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DEV / AI STUDIO — AI websites and WhatsApp automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev AI Websites & WhatsApp Automation",
    description: "Websites that earn attention. Automation that keeps it.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#e5e4e0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"ProfessionalService",name:"DEV / AI STUDIO",url:siteUrl,description:"Website design and WhatsApp enquiry automation for businesses.",telephone:"+917738400373",areaServed:["Kharghar","Navi Mumbai","India"],hasOfferCatalog:{"@type":"OfferCatalog",name:"Services",itemListElement:[{"@type":"Offer",itemOffered:{"@type":"Service",name:"Website design"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"WhatsApp automation"}}]}})}}/>{children}</body>
    </html>
  );
}
