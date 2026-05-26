import { cookies } from "next/headers";
import type { Metadata } from "next";

import { WalletServicesPage } from "@/components/sections/ecosystem/WalletServicesPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "钱包服务 | NOVOVM",
      description: "了解 NOVOVM 钱包服务如何连接账户、资产、应用权限与主网访问。",
    };
  }

  return {
    title: "Wallet Services | NOVOVM",
    description:
      "Learn how NOVOVM Wallet Services connect accounts, assets, application permissions, and mainnet access.",
  };
}

export default async function WalletServicesRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <WalletServicesPage initialLanguage={initialLanguage} />;
}
