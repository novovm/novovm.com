import { cookies } from "next/headers";
import type { Metadata } from "next";

import { Network } from "@/components/sections/Network";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "网络 | NOVOVM",
      description: "用简单方式理解 NOVOVM 的网络，以及它为什么是为真实世界条件设计的。",
    };
  }

  return {
    title: "Network | NOVOVM",
    description:
      "A simple introduction to the NOVOVM Network and why it is built for real-world conditions.",
  };
}

export default async function NetworkPage() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <Network initialLanguage={initialLanguage} />;
}
