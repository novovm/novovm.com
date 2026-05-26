import { cookies } from "next/headers";
import type { Metadata } from "next";

import { UsingNovoPage } from "@/components/sections/UsingNovoPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "使用 | NOVOVM",
      description: "了解如何进入 NOVOVM 生态、使用服务、参与网络，并访问核心工具下载入口。",
    };
  }

  return {
    title: "Using NOVO | NOVOVM",
    description:
      "Learn how to enter the NOVOVM ecosystem, use services, participate in the network, and access core tool downloads.",
  };
}

export default async function UsingRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <UsingNovoPage initialLanguage={initialLanguage} />;
}
