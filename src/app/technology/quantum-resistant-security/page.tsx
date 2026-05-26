import { cookies } from "next/headers";
import type { Metadata } from "next";

import { QuantumResistantSecurityPage } from "@/components/sections/QuantumResistantSecurityPage";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "抗量子安全 | NOVOVM",
      description:
        "了解 NOVOVM 为什么在设计阶段就考虑抗量子安全，以及用户、开发者和企业如何理解这部分长期安全准备。",
    };
  }

  return {
    title: "Quantum-Resistant Security | NOVOVM",
    description:
      "Learn why NOVOVM considers quantum-resistant security from the design stage and how users, developers, and enterprises benefit from long-term security preparation.",
  };
}

export default async function QuantumResistantSecurityRoute() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <QuantumResistantSecurityPage initialLanguage={initialLanguage} />;
}
