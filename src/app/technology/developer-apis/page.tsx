import { cookies } from "next/headers";
import type { Metadata } from "next";

import { DeveloperApis } from "@/components/sections/DeveloperApis";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "开发者接口 | NOVOVM",
      description:
        "了解 NOVOVM 如何通过清晰稳定的访问表面，帮助团队构建、集成并连接真实应用。",
    };
  }

  return {
    title: "Developer APIs | NOVOVM",
    description:
      "Learn how NOVOVM gives teams a clean, stable access surface for building, integrating, and connecting real applications.",
  };
}

export default async function DeveloperApisPage() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <DeveloperApis initialLanguage={initialLanguage} />;
}
