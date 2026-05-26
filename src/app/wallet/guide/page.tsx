import { cookies } from "next/headers";
import type { Metadata } from "next";

import { UsingWalletPage } from "@/components/sections/wallet/UsingWalletPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "如何使用钱包 | NOVOVM",
      description: "了解如何使用 NOVO 钱包访问应用、管理资产并与网络交互。",
    };
  }

  return {
    title: "Using Your Wallet | NOVOVM",
    description:
      "Learn how to use NOVO Wallet to access applications, manage assets, and interact with the network.",
  };
}

export default async function WalletGuideRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <UsingWalletPage initialLanguage={initialLanguage} />;
}
