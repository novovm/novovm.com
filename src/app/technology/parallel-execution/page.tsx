import { cookies } from "next/headers";
import type { Metadata } from "next";

import { ParallelExecution } from "@/components/sections/ParallelExecution";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "并行执行 | NOVOVM",
      description: "用简单方式理解并行执行为什么重要，以及 NOVOVM 如何让系统随着真实需求扩展。",
    };
  }

  return {
    title: "Parallel Execution | NOVOVM",
    description:
      "A simple introduction to parallel execution, why it matters, and how NOVOVM approaches scaling under real-world demand.",
  };
}

export default async function ParallelExecutionPage() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <ParallelExecution initialLanguage={initialLanguage} />;
}
