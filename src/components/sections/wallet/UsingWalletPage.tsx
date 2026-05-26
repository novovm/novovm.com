"use client";

import { useState } from "react";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SecurityNotice } from "@/components/ui/SecurityNotice";
import { StepCard } from "@/components/ui/StepCard";
import { WalletActionButton } from "@/components/ui/WalletActionButton";
import { cn } from "@/lib/cn";
import { resolveCopy } from "@/lib/language";
import { type BilingualCopy, type Language } from "@/lib/site-content";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";

const copy = {
  back: { en: "Back to Account", zh: "返回账户创建" },
  eyebrow: { en: "Wallet Guide", zh: "钱包指南" },
  title: { en: "Using Your Wallet", zh: "Using Your Wallet" },
  helper: { en: "How to use a wallet", zh: "如何使用钱包" },
  subtitle: {
    en: "Use your wallet to access applications, manage assets, and interact with the network.",
    zh: "使用钱包访问应用、管理资产，并与网络交互。",
  },
  sendTitle: { en: "Send and receive assets", zh: "发送和接收资产" },
  sendText: {
    en: "Your wallet allows you to send and receive digital assets securely.",
    zh: "你的钱包可以帮助你安全地发送和接收数字资产。",
  },
  appsTitle: { en: "Access applications", zh: "访问应用" },
  appsText: {
    en: "Use your wallet to sign in to decentralized applications.",
    zh: "使用钱包登录去中心化应用。",
  },
  permissionsTitle: { en: "Manage permissions", zh: "管理权限" },
  permissionsText: {
    en: "You control which applications can access your wallet.",
    zh: "由你控制哪些应用可以访问你的钱包。",
  },
  secureTitle: { en: "Stay secure", zh: "保持安全" },
  secureText: {
    en: "Never share your recovery phrase. Always verify applications before connecting.",
    zh: "不要分享你的恢复短语。连接应用前，请先确认应用是否可信。",
  },
  exploreTitle: { en: "Explore NOVOVM", zh: "探索 NOVOVM" },
  dashboard: { en: "Open Dashboard", zh: "打开控制台" },
  apps: { en: "Explore Apps", zh: "探索应用" },
  docs: { en: "Developer Docs", zh: "开发者文档" },
  comingSoon: { en: "Coming soon", zh: "即将开放" },
} satisfies Record<string, BilingualCopy>;

const appTiles = [
  { en: "Finance", zh: "金融" },
  { en: "Storage", zh: "存储" },
  { en: "AI", zh: "AI" },
  { en: "Games", zh: "游戏" },
] satisfies BilingualCopy[];

const permissions = [
  { en: "App connection", zh: "应用连接" },
  { en: "Transaction approval", zh: "交易确认" },
  { en: "Data access", zh: "数据访问" },
] satisfies BilingualCopy[];

export function UsingWalletPage({ initialLanguage }: { initialLanguage: Language }) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);
  const [comingSoon, setComingSoon] = useState(false);

  function handleComingSoon() {
    setComingSoon(true);
    window.setTimeout(() => setComingSoon(false), 1600);
  }

  return (
    <>
      <DetailPageHeader
        backHref="/wallet/account"
        backLabel={copy.back}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main className="relative min-h-svh overflow-hidden bg-background px-5 pb-24 pt-[120px] text-text sm:px-6 lg:px-8">
        <div aria-hidden="true" className="section-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <section className="relative z-10 mx-auto max-w-[1200px] py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-green-bright">
              {resolveCopy(copy.eyebrow, language)}
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-none text-text sm:text-6xl lg:text-7xl">
              {resolveCopy(copy.title, language)}
            </h1>
            <p className="mt-4 text-base font-medium text-green-bright">
              {resolveCopy(copy.helper, language)}
            </p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              {resolveCopy(copy.subtitle, language)}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <StepCard description={resolveCopy(copy.sendText, language)} title={resolveCopy(copy.sendTitle, language)}>
                <div className="flex items-center justify-between gap-4 rounded-[8px] border border-[rgba(90,181,70,0.16)] bg-[rgba(4,0,0,0.4)] p-5">
                  <span className="text-sm font-medium text-text">You</span>
                  <span className="h-px flex-1 bg-[rgba(140,216,103,0.54)]" />
                  <span className="text-sm font-medium text-green-bright">NOVOVM Network</span>
                </div>
              </StepCard>
            </Reveal>

            <Reveal delay={0.08}>
              <StepCard description={resolveCopy(copy.appsText, language)} title={resolveCopy(copy.appsTitle, language)}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {appTiles.map((tile) => (
                    <div
                      className="rounded-[8px] border border-[rgba(90,181,70,0.16)] bg-[rgba(4,0,0,0.36)] p-4 text-sm font-medium text-text transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[rgba(140,216,103,0.56)]"
                      key={tile.en}
                    >
                      {resolveCopy(tile, language)}
                    </div>
                  ))}
                </div>
              </StepCard>
            </Reveal>

            <Reveal delay={0.16}>
              <StepCard description={resolveCopy(copy.permissionsText, language)} title={resolveCopy(copy.permissionsTitle, language)}>
                <div className="space-y-3">
                  {permissions.map((permission, index) => (
                    <div
                      className="flex items-center justify-between rounded-[8px] border border-[rgba(90,181,70,0.14)] bg-[rgba(4,0,0,0.36)] p-4"
                      key={permission.en}
                    >
                      <span className="text-sm text-text">{resolveCopy(permission, language)}</span>
                      <span
                        className={cn(
                          "relative h-6 w-11 rounded-full border transition-colors duration-300",
                          index < 2
                            ? "border-[rgba(140,216,103,0.45)] bg-[rgba(90,181,70,0.22)]"
                            : "border-[rgba(245,242,232,0.14)] bg-[rgba(245,242,232,0.06)]",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-1 h-4 w-4 rounded-full bg-text transition-transform duration-300",
                            index < 2 ? "left-5" : "left-1",
                          )}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </StepCard>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex h-full flex-col gap-5">
                <SecurityNotice
                  className="flex-1"
                  text={resolveCopy(copy.secureText, language)}
                  title={resolveCopy(copy.secureTitle, language)}
                />
                <StepCard title={resolveCopy(copy.exploreTitle, language)}>
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                    <WalletActionButton className="w-full" onClick={handleComingSoon}>
                      {comingSoon
                        ? resolveCopy(copy.comingSoon, language)
                        : resolveCopy(copy.dashboard, language)}
                    </WalletActionButton>
                    <WalletActionButton className="w-full" href="/ecosystem" variant="secondary">
                      {resolveCopy(copy.apps, language)}
                    </WalletActionButton>
                    <WalletActionButton className="w-full" href="/developers" variant="secondary">
                      {resolveCopy(copy.docs, language)}
                    </WalletActionButton>
                  </div>
                </StepCard>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
