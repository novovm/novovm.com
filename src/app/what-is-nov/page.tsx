import { cookies } from "next/headers";
import type { Metadata } from "next";

import { WhatIsNov } from "@/components/sections/WhatIsNov";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "什么是 NOV | NOVOVM",
      description: "用简单方式理解 NOV 是什么，以及它在 NOVOVM 里能做什么。",
    };
  }

  return {
    title: "What is NOV | NOVOVM",
    description:
      "A simple introduction to NOV, the native currency used inside NOVOVM.",
  };
}

export default async function WhatIsNovPage() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <WhatIsNov initialLanguage={initialLanguage} />;
}
