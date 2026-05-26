import { cookies } from "next/headers";
import type { Metadata } from "next";

import { StorageServicesPage } from "@/components/sections/ecosystem/StorageServicesPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "存储服务 | NOVOVM",
      description: "了解 NOVOVM 存储服务如何连接钱包身份、权限、应用数据与网络访问。",
    };
  }

  return {
    title: "Storage Services | NOVOVM",
    description:
      "Learn how NOVOVM Storage Services connect wallet identity, permissions, application data, and network access.",
  };
}

export default async function StorageServicesRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <StorageServicesPage initialLanguage={initialLanguage} />;
}
