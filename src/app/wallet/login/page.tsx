import type { Metadata } from "next";
import { cookies } from "next/headers";

import { WalletLogin } from "@/components/sections/WalletLogin";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Login to NOVOVM | NOVOVM",
  description: "Use your wallet to access the NOVOVM network.",
};

export default async function WalletLoginPage() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <WalletLogin initialLanguage={initialLanguage} />;
}
