import { cookies } from "next/headers";
import type { Metadata } from "next";

import { DecentralizedServicesPage } from "@/components/sections/ecosystem/DecentralizedServicesPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "去中心化服务 | NOVOVM",
      description: "了解 NOVOVM 生态中的金融、游戏、社交和电商等去中心化服务方向。",
    };
  }

  return {
    title: "Decentralized Services | NOVOVM",
    description:
      "Learn how finance, games, social, and commerce fit into decentralized services across the NOVOVM ecosystem.",
  };
}

export default async function DecentralizedServicesRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <DecentralizedServicesPage initialLanguage={initialLanguage} />;
}
