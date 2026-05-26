import {
  defaultLanguage,
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_STORAGE_KEY,
  type BilingualCopy,
  type Language,
} from "@/lib/site-content";

export function isLanguage(value: string | null | undefined): value is Language {
  return value === "en" || value === "zh";
}

export function getInitialLanguageFromValue(
  value: string | null | undefined,
): Language {
  return isLanguage(value) ? value : defaultLanguage;
}

export function resolveCopy(copy: BilingualCopy, language: Language) {
  return language === "zh" ? copy.zh : copy.en;
}

export function persistLanguagePreference(language: Language) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  document.cookie = `${LANGUAGE_COOKIE_KEY}=${language}; path=/; max-age=31536000; samesite=lax`;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
}

export function readStoredLanguage() {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isLanguage(stored) ? stored : null;
}
