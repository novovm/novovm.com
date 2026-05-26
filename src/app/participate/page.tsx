import { cookies } from "next/headers";
import type { Metadata } from "next";

import { ParticipatePage } from "@/components/sections/ParticipatePage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "参与 | NOVOVM",
      description: "了解如何通过社区、论坛、活动和网络参与方式进入 NOVOVM 生态。",
    };
  }

  return {
    title: "Participate | NOVOVM",
    description:
      "Explore community, forum, events, and network participation paths across the NOVOVM ecosystem.",
  };
}

export default async function ParticipateRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <ParticipatePage initialLanguage={initialLanguage} />;
}
