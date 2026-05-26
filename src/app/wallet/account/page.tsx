import { cookies } from "next/headers";
import type { Metadata } from "next";

import { CreateAccountPage } from "@/components/sections/wallet/CreateAccountPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "创建你的账户 | NOVOVM",
      description: "在 NOVOVM 网络中设置你的账户身份。",
    };
  }

  return {
    title: "Create Your Account | NOVOVM",
    description: "Set up your account identity inside the NOVOVM network.",
  };
}

export default async function WalletAccountRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <CreateAccountPage initialLanguage={initialLanguage} />;
}
