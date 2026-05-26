"use client";

import { AppWindow, Coins, KeyRound, ShieldCheck } from "lucide-react";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SecurityNotice } from "@/components/ui/SecurityNotice";
import { StepCard } from "@/components/ui/StepCard";
import { WalletActionButton } from "@/components/ui/WalletActionButton";
import { resolveCopy } from "@/lib/language";
import { type BilingualCopy, type Language } from "@/lib/site-content";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";

const copy = {
  back: { en: "Back to Download", zh: "返回下载" },
  eyebrow: { en: "Wallet Onboarding", zh: "钱包引导" },
  title: { en: "Create a Wallet", zh: "Create a Wallet" },
  helper: { en: "Create a wallet", zh: "创建一个钱包" },
  subtitle: {
    en: "Your wallet is your personal access point to the NOVOVM network.",
    zh: "你的钱包是访问 NOVOVM 网络的个人入口。",
  },
  whatTitle: { en: "What is a wallet?", zh: "什么是钱包？" },
  whatText: {
    en: "A wallet helps you store assets, access applications, send transactions, and control your account.",
    zh: "钱包帮助你保存资产、访问应用、发送交易，并管理自己的账户。",
  },
  createTitle: { en: "Create your wallet", zh: "创建你的钱包" },
  createText: {
    en: "Creating a wallet takes less than a minute.",
    zh: "创建钱包通常不到一分钟。",
  },
  createButton: { en: "Create NOVO Wallet", zh: "创建 NOVO 钱包" },
  noticeTitle: { en: "Security reminder", zh: "安全提醒" },
  notice: {
    en: "Your wallet gives you control over your assets. Keep your recovery phrase private and secure.",
    zh: "钱包让你掌控自己的资产。请妥善保管恢复短语，不要向任何人透露。",
  },
  existingTitle: { en: "Already have a wallet?", zh: "已经有钱包？" },
  existingText: {
    en: "Connect an existing wallet and continue with NOVOVM.",
    zh: "连接已有钱包，继续使用 NOVOVM。",
  },
  existingButton: { en: "Connect Existing Wallet", zh: "连接已有钱包" },
} satisfies Record<string, BilingualCopy>;

const features = [
  { icon: Coins, label: { en: "Assets", zh: "资产" } },
  { icon: AppWindow, label: { en: "Applications", zh: "应用" } },
  { icon: KeyRound, label: { en: "Transactions", zh: "交易" } },
  { icon: ShieldCheck, label: { en: "Account Control", zh: "账户控制" } },
] as const;

export function CreateWalletPage({ initialLanguage }: { initialLanguage: Language }) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);

  return (
    <>
      <DetailPageHeader
        backHref="/#download"
        backLabel={copy.back}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main className="relative min-h-svh overflow-hidden bg-background px-5 pb-24 pt-[120px] text-text sm:px-6 lg:px-8">
        <div aria-hidden="true" className="section-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(90,181,70,0.08),transparent)]" />

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

          <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.58fr)]">
            <Reveal>
              <div>
                <h2 className="text-3xl font-semibold text-text sm:text-4xl">
                  {resolveCopy(copy.whatTitle, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
                  {resolveCopy(copy.whatText, language)}
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <StepCard key={feature.label.en} title={resolveCopy(feature.label, language)}>
                        <Icon aria-hidden="true" className="h-5 w-5 text-green-bright" strokeWidth={1.8} />
                      </StepCard>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <div className="space-y-5">
              <Reveal delay={0.08}>
                <StepCard
                  description={resolveCopy(copy.createText, language)}
                  eyebrow="01"
                  title={resolveCopy(copy.createTitle, language)}
                >
                  <WalletActionButton className="w-full" href="/wallet/account">
                    {resolveCopy(copy.createButton, language)}
                  </WalletActionButton>
                </StepCard>
              </Reveal>
              <Reveal delay={0.14}>
                <SecurityNotice
                  text={resolveCopy(copy.notice, language)}
                  title={resolveCopy(copy.noticeTitle, language)}
                />
              </Reveal>
              <Reveal delay={0.2}>
                <StepCard
                  description={resolveCopy(copy.existingText, language)}
                  eyebrow="02"
                  title={resolveCopy(copy.existingTitle, language)}
                >
                  <WalletActionButton className="w-full" href="/wallet/login" variant="secondary">
                    {resolveCopy(copy.existingButton, language)}
                  </WalletActionButton>
                </StepCard>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
