import { cookies } from "next/headers";
import type { Metadata } from "next";

import { LearnWeb3Page } from "@/components/sections/LearnWeb3Page";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "了解 Web3 | NOVOVM",
      description: "用更清晰的方式理解 Web3，并了解 NOVO 如何成为进入 Web3 生态的实际入口。",
    };
  }

  return {
    title: "Learn Web3 | NOVOVM",
    description:
      "A clearer introduction to Web3 and how NOVO acts as a practical entry point into a usable Web3 ecosystem.",
  };
}

export default async function LearnWeb3Route() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <LearnWeb3Page initialLanguage={initialLanguage} />;
}
