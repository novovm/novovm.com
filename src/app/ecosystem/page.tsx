import { cookies } from "next/headers";
import type { Metadata } from "next";

import { EcosystemServicesPage } from "@/components/sections/EcosystemServicesPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "生态功能服务 | NOVOVM",
      description: "了解 NOVOVM 生态中的交易、钱包、存储、链名和去中心化服务入口。",
    };
  }

  return {
    title: "Ecosystem Services | NOVOVM",
    description:
      "Explore trading, wallet, storage, naming, and decentralized service entry points across the NOVOVM ecosystem.",
  };
}

export default async function EcosystemRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <EcosystemServicesPage initialLanguage={initialLanguage} />;
}
