import { cookies } from "next/headers";
import type { Metadata } from "next";

import { ChainNameServicesPage } from "@/components/sections/ecosystem/ChainNameServicesPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "链名服务 | NOVOVM",
      description: "了解 NOVOVM 链名服务如何连接可读名称、账户、钱包、应用和网络身份。",
    };
  }

  return {
    title: "Chain Name Services | NOVOVM",
    description:
      "Learn how NOVOVM Chain Name Services connect readable names with accounts, wallets, applications, and network identity.",
  };
}

export default async function ChainNameServicesRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <ChainNameServicesPage initialLanguage={initialLanguage} />;
}
