import { cookies } from "next/headers";
import type { Metadata } from "next";

import { VerifiableResults } from "@/components/sections/VerifiableResults";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "结果可验证 | NOVOVM",
      description:
        "了解 NOVOVM 如何让执行结果可由网络检查，帮助应用建立清晰、可信的用户信心。",
    };
  }

  return {
    title: "Verifiable Results | NOVOVM",
    description:
      "Learn how NOVOVM makes execution results checkable by the network, creating clear user-facing confidence.",
  };
}

export default async function VerifiableResultsPage() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <VerifiableResults initialLanguage={initialLanguage} />;
}
