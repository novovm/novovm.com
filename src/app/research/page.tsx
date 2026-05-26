import { cookies } from "next/headers";
import type { Metadata } from "next";

import { ResearchDeveloperCenterPage } from "@/components/sections/ResearchDeveloperCenterPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "研究与开发者中心 | NOVOVM",
      description: "查看 NOVOVM 的开发者资源、研究方向、文档、接口和集成入口。",
    };
  }

  return {
    title: "Research & Developer Center | NOVOVM",
    description:
      "Explore NOVOVM developer resources, research directions, documentation, APIs, and integration paths.",
  };
}

export default async function ResearchRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <ResearchDeveloperCenterPage initialLanguage={initialLanguage} />;
}
