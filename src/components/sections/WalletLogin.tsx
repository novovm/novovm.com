"use client";

import { ArrowRight, Download, KeyRound, Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { cn } from "@/lib/cn";
import { type BilingualCopy, type Language } from "@/lib/site-content";
import { resolveCopy } from "@/lib/language";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";

const loginOptions = [
  {
    action: "placeholder",
    button: {
      en: "Login with NOVO Wallet",
      zh: "使用 NOVO 钱包登录",
    },
    description: {
      en: "Use the official NOVO Wallet to access applications, assets, and network services.",
      zh: "使用官方 NOVO 钱包访问应用、资产和网络服务。",
    },
    icon: Download,
    title: {
      en: "Login with NOVO Wallet",
      zh: "使用 NOVO 钱包登录",
    },
  },
  {
    action: "placeholder",
    button: {
      en: "Connect Wallet",
      zh: "连接钱包",
    },
    description: {
      en: "Connect a compatible wallet you already use.",
      zh: "连接你已经在使用的兼容钱包。",
    },
    icon: Wallet,
    title: {
      en: "Connect existing wallet",
      zh: "连接已有钱包",
    },
  },
  {
    action: "link",
    button: {
      en: "Restore Wallet",
      zh: "恢复钱包",
    },
    description: {
      en: "Restore access using your recovery phrase.",
      zh: "使用恢复短语重新获得访问权限。",
    },
    href: "/wallet/import",
    icon: KeyRound,
    title: {
      en: "Restore wallet",
      zh: "恢复钱包",
    },
  },
] as const;

const pageCopy = {
  eyebrow: {
    en: "Wallet Access",
    zh: "钱包访问",
  },
  title: {
    en: "Login to NOVOVM",
    zh: "登录 NOVOVM",
  },
  subtitle: {
    en: "Use your wallet to access the NOVOVM network.",
    zh: "使用你的钱包访问 NOVOVM 网络。",
  },
  comingSoon: {
    en: "Coming soon",
    zh: "即将开放",
  },
  notice: {
    en: "Never share your recovery phrase with anyone. NOVOVM will never ask for it outside the official wallet interface.",
    zh: "不要向任何人分享你的恢复短语。NOVOVM 绝不会在官方钱包界面之外要求你提供它。",
  },
} satisfies Record<string, BilingualCopy>;

export function WalletLogin({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  function handlePlaceholder(title: BilingualCopy) {
    setComingSoon(title.en);
    window.setTimeout(() => {
      setComingSoon((current) => (current === title.en ? null : current));
    }, 1800);
  }

  return (
    <>
      <DetailPageHeader
        backHref="/#download"
        backLabel={{
          en: "Back to Download",
          zh: "返回下载",
        }}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main className="relative min-h-svh overflow-hidden bg-background px-5 py-24 text-text sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(90,181,70,0.62) 1px, transparent 1px), linear-gradient(90deg, rgba(90,181,70,0.62) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(90,181,70,0.08),transparent)]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-5xl items-center justify-center pt-12">
        <div className="w-full rounded-[12px] border border-[rgba(90,181,70,0.2)] bg-[rgba(4,0,0,0.78)] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-green-bright">
              {resolveCopy(pageCopy.eyebrow, language)}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-text sm:text-5xl">
              {resolveCopy(pageCopy.title, language)}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
              {resolveCopy(pageCopy.subtitle, language)}
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {loginOptions.map((option) => {
              const Icon = option.icon;
              const isComingSoon = comingSoon === option.title.en;
              const buttonClassName =
                "group mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[6px] border border-green bg-green px-4 text-sm font-medium text-text transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-green-bright hover:bg-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-bright";

              return (
                <article
                  className="group flex min-h-[300px] flex-col rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.68)] p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[rgba(140,216,103,0.56)] hover:bg-[rgba(14,20,14,0.76)]"
                  key={option.title.en}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[rgba(90,181,70,0.22)] bg-[rgba(4,0,0,0.46)] text-green-bright transition-colors duration-300 group-hover:border-[rgba(241,188,26,0.38)]">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h2 className="mt-7 text-2xl font-medium leading-tight text-text">
                    {resolveCopy(option.title, language)}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-6 text-muted">
                    {resolveCopy(option.description, language)}
                  </p>

                  {option.action === "link" ? (
                    <Link className={buttonClassName} href={option.href}>
                      {resolveCopy(option.button, language)}
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={1.8}
                      />
                    </Link>
                  ) : (
                    <button
                      className={cn(
                        buttonClassName,
                        isComingSoon &&
                          "border-[rgba(241,188,26,0.54)] bg-[rgba(241,188,26,0.12)]",
                      )}
                      onClick={() => handlePlaceholder(option.title)}
                      type="button"
                    >
                      {isComingSoon
                        ? resolveCopy(pageCopy.comingSoon, language)
                        : resolveCopy(option.button, language)}
                    </button>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-[8px] border border-[rgba(241,188,26,0.2)] bg-[rgba(241,188,26,0.055)] p-4">
            <p className="text-sm leading-6 text-[rgba(248,242,232,0.76)]">
              {resolveCopy(pageCopy.notice, language)}
            </p>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
