import { cookies } from "next/headers";
import type { Metadata } from "next";

import { WhatIsNovoWallet } from "@/components/sections/WhatIsNovoWallet";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "什么是 NOVO 钱包 | NOVOVM",
      description: "用简单方式理解 NOVO 钱包是什么，以及它如何帮助你使用 NOVOVM。",
    };
  }

  return {
    title: "What is NOVO Wallet | NOVOVM",
    description:
      "A simple introduction to NOVO Wallet and how it helps people use NOVOVM.",
  };
}

export default async function NovoWalletPage() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <WhatIsNovoWallet initialLanguage={initialLanguage} />;
}
