"use client";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Footer } from "@/components/site/Footer";
import { EcosystemServices } from "@/components/sections/EcosystemServices";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";
import { type Language } from "@/lib/site-content";

export function EcosystemServicesPage({ initialLanguage }: { initialLanguage: Language }) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);

  return (
    <>
      <DetailPageHeader language={language} onLanguageChange={handleLanguageChange} />
      <EcosystemServices language={language} />
      <Footer language={language} />
    </>
  );
}
