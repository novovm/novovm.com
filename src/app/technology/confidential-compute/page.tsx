import { cookies } from "next/headers";
import type { Metadata } from "next";

import { ConfidentialCompute } from "@/components/sections/ConfidentialCompute";
import { getInitialLanguageFromValue } from "@/lib/language";
import { LANGUAGE_COOKIE_KEY } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  if (initialLanguage === "zh") {
    return {
      title: "保密计算 | NOVOVM",
      description:
        "了解 NOVOVM 如何将隐私感知执行、受保护执行路径与可验证输出结合在运行时层。",
    };
  }

  return {
    title: "Confidential Compute | NOVOVM",
    description:
      "Learn how NOVOVM combines privacy-aware execution, protected execution paths, and verifiable output at the runtime layer.",
  };
}

export default async function ConfidentialComputePage() {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguageFromValue(
    cookieStore.get(LANGUAGE_COOKIE_KEY)?.value,
  );

  return <ConfidentialCompute initialLanguage={initialLanguage} />;
}
