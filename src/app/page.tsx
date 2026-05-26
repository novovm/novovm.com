import type { Metadata } from "next";
import { cookies } from "next/headers";

import { SiteExperience } from "@/components/site/SiteExperience";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "NOVOVM | 下一代互联网的执行层",
      description:
        "面向 Web3、AI 与去中心化应用的高性能、隐私保护、可验证基础设施。",
    };
  }

  return {
    title: "NOVOVM | The Execution Layer for the Next Internet",
    description:
      "High-performance, privacy-preserving, and verifiable infrastructure for Web3, AI, and decentralized applications.",
  };
}

export default async function Home() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <SiteExperience initialLanguage={initialLanguage} />;
}
