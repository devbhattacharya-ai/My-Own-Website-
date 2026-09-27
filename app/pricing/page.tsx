import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing-page";

export const metadata: Metadata = {
  title: "Pricing | DEV / AI STUDIO",
  description: "Clear starting prices for business websites, animated websites, extra motion and WhatsApp automation. Every project is scoped before work begins.",
  alternates: { canonical: "/pricing" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  return <PricingPage initialLanguage={lang === "mr" ? "mr" : "en"} />;
}
