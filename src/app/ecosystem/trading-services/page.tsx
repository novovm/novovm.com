import { cookies } from "next/headers";
import type { Metadata } from "next";

import { TradingServicesPage } from "@/components/sections/ecosystem/TradingServicesPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "交易服务 | NOVOVM",
      description: "了解 NOVOVM 生态中的交易服务，以及它如何连接钱包、资产和主网交互。",
    };
  }

  return {
    title: "Trading Services | NOVOVM",
    description:
      "Learn how NOVOVM Trading Services connect wallets, assets, and mainnet interactions across the ecosystem.",
  };
}

export default async function TradingServicesRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <TradingServicesPage initialLanguage={initialLanguage} />;
}
