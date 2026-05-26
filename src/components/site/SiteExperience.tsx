"use client";

import { Hero } from "@/components/sections/Hero";
import { HomepageExperience } from "@/components/sections/HomepageExperience";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";
import { type Language } from "@/lib/site-content";

type SiteExperienceProps = {
  initialLanguage: Language;
};

export function SiteExperience({
  initialLanguage,
}: SiteExperienceProps) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);

  return (
    <>
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <main className="bg-background">
        <Hero language={language} />
        <HomepageExperience language={language} />
      </main>
      <Footer language={language} />
    </>
  );
}
