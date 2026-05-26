"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Header } from "@/components/site/Header";
import { resolveCopy } from "@/lib/language";
import { type BilingualCopy, type Language } from "@/lib/site-content";

type DetailPageHeaderProps = {
  backHref?: string;
  backLabel?: BilingualCopy;
  language: Language;
  onLanguageChange: (language: Language) => void;
};

const defaultBackLabel: BilingualCopy = {
  en: "Back to NOVOVM",
  zh: "返回 NOVOVM",
};

export function DetailPageHeader({
  backHref = "/",
  backLabel = defaultBackLabel,
  language,
  onLanguageChange,
}: DetailPageHeaderProps) {
  return (
    <>
      <Header
        language={language}
        onLanguageChange={onLanguageChange}
        sectionHrefPrefix="/"
      />
      <Link
        className="fixed left-5 top-[88px] z-40 inline-flex h-10 items-center gap-2 rounded-[6px] border border-border bg-[rgba(4,0,0,0.72)] px-3 text-sm text-muted backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(90,181,70,0.48)] hover:text-text sm:left-6 lg:left-8"
        href={backHref}
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
        <span>{resolveCopy(backLabel, language)}</span>
      </Link>
    </>
  );
}
