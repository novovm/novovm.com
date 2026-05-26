import { cookies } from "next/headers";
import type { Metadata } from "next";

import { ExecutionEngine } from "@/components/sections/ExecutionEngine";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "执行引擎 | NOVOVM",
      description: "用简单方式理解执行引擎是什么，以及它为什么是 NOVOVM 的核心能力。",
    };
  }

  return {
    title: "Execution Engine | NOVOVM",
    description:
      "A simple introduction to the Execution Engine and why it is core to NOVOVM.",
  };
}

export default async function ExecutionEnginePage() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <ExecutionEngine initialLanguage={initialLanguage} />;
}
