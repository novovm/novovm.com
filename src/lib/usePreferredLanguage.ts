"use client";

import { useEffect, useState, useTransition } from "react";

import { defaultLanguage, type Language } from "@/lib/site-content";
import { persistLanguagePreference, readStoredLanguage } from "@/lib/language";

export function usePreferredLanguage(initialLanguage: Language = defaultLanguage) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const stored = readStoredLanguage();

    if (!stored || stored === initialLanguage) {
      return;
    }

    startTransition(() => {
      setLanguage(stored);
    });
  }, [initialLanguage, startTransition]);

  useEffect(() => {
    persistLanguagePreference(language);
  }, [language]);

  function handleLanguageChange(nextLanguage: Language) {
    if (nextLanguage === language) {
      return;
    }

    startTransition(() => {
      setLanguage(nextLanguage);
    });
  }

  return {
    handleLanguageChange,
    language,
  };
}
