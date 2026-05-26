import { cookies } from "next/headers";
import type { Metadata } from "next";

import { CreateWalletPage } from "@/components/sections/wallet/CreateWalletPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "创建一个钱包 | NOVOVM",
      description: "创建 NOVO 钱包并开始访问 NOVOVM 网络。",
    };
  }

  return {
    title: "Create a Wallet | NOVOVM",
    description: "Create a NOVO Wallet and start accessing the NOVOVM network.",
  };
}

export default async function WalletCreateRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <CreateWalletPage initialLanguage={initialLanguage} />;
}
