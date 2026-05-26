"use client";

import { KeyRound, MonitorCheck, Wallet } from "lucide-react";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SecurityNotice } from "@/components/ui/SecurityNotice";
import { StepCard } from "@/components/ui/StepCard";
import { WalletActionButton } from "@/components/ui/WalletActionButton";
import { resolveCopy } from "@/lib/language";
import { type BilingualCopy, type Language } from "@/lib/site-content";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";

const copy = {
  back: { en: "Back to Create Wallet", zh: "返回创建钱包" },
  eyebrow: { en: "Wallet Onboarding", zh: "钱包引导" },
  title: { en: "Create Your Account", zh: "Create Your Account" },
  helper: { en: "Create your account", zh: "创建你的账户" },
  subtitle: {
    en: "Set up your identity inside the NOVOVM network.",
    zh: "在 NOVOVM 网络中设置你的身份。",
  },
  step1: { en: "Choose an account name", zh: "选择账户名称" },
  placeholder: { en: "Choose a username", zh: "选择一个用户名" },
  helperText: {
    en: "Your account name helps applications recognize your identity.",
    zh: "账户名称帮助应用识别你的身份。",
  },
  step2: { en: "Secure your account", zh: "保护你的账户" },
  secureText: {
    en: "Protect your account with your wallet and recovery phrase.",
    zh: "使用钱包和恢复短语保护你的账户。",
  },
  ready: { en: "Your account is ready", zh: "你的账户已准备好" },
  readyText: {
    en: "You can now access applications, assets, and services on NOVOVM.",
    zh: "现在你可以访问 NOVOVM 上的应用、资产和服务。",
  },
  primary: { en: "Go to Wallet Guide", zh: "前往钱包指南" },
  secondary: { en: "Back to Create Wallet", zh: "返回创建钱包" },
  notice: {
    en: "This screen is UI only. Your username is not saved, checked, or sent anywhere yet.",
    zh: "这是纯界面展示。用户名暂时不会保存、校验或发送到任何地方。",
  },
} satisfies Record<string, BilingualCopy>;

const securityPoints = [
  { icon: Wallet, label: { en: "Wallet ownership", zh: "钱包所有权" } },
  { icon: KeyRound, label: { en: "Recovery phrase", zh: "恢复短语" } },
  { icon: MonitorCheck, label: { en: "Device security", zh: "设备安全" } },
] as const;

export function CreateAccountPage({ initialLanguage }: { initialLanguage: Language }) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);

  return (
    <>
      <DetailPageHeader
        backHref="/wallet/create"
        backLabel={copy.back}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main className="relative min-h-svh overflow-hidden bg-background px-5 pb-24 pt-[120px] text-text sm:px-6 lg:px-8">
        <div aria-hidden="true" className="section-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <section className="relative z-10 mx-auto max-w-[980px] py-16 sm:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-green-bright">
              {resolveCopy(copy.eyebrow, language)}
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-none text-text sm:text-6xl lg:text-7xl">
              {resolveCopy(copy.title, language)}
            </h1>
            <p className="mt-4 text-base font-medium text-green-bright">
              {resolveCopy(copy.helper, language)}
            </p>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted">
              {resolveCopy(copy.subtitle, language)}
            </p>
          </Reveal>

          <div className="mt-14 rounded-[12px] border border-[rgba(90,181,70,0.18)] bg-[rgba(4,0,0,0.72)] p-5 backdrop-blur-xl sm:p-7 lg:p-9">
            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              {["01", "02", "03"].map((step) => (
                <div
                  className="h-1 rounded-full bg-[linear-gradient(90deg,rgba(140,216,103,0.76),rgba(90,181,70,0.18))]"
                  key={step}
                  aria-label={step}
                />
              ))}
            </div>

            <div className="space-y-5">
              <Reveal>
                <StepCard eyebrow="01 / 03" title={resolveCopy(copy.step1, language)}>
                  <input
                    className="h-12 w-full rounded-[6px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.78)] px-4 text-sm text-text outline-none transition-colors duration-300 placeholder:text-[rgba(245,242,232,0.36)] focus:border-green-bright"
                    placeholder={resolveCopy(copy.placeholder, language)}
                    type="text"
                  />
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {resolveCopy(copy.helperText, language)}
                  </p>
                </StepCard>
              </Reveal>

              <Reveal delay={0.08}>
                <StepCard
                  description={resolveCopy(copy.secureText, language)}
                  eyebrow="02 / 03"
                  title={resolveCopy(copy.step2, language)}
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    {securityPoints.map((point) => {
                      const Icon = point.icon;

                      return (
                        <div
                          className="rounded-[8px] border border-[rgba(90,181,70,0.16)] bg-[rgba(4,0,0,0.36)] p-4"
                          key={point.label.en}
                        >
                          <Icon className="h-5 w-5 text-green-bright" strokeWidth={1.8} />
                          <p className="mt-4 text-sm font-medium text-text">
                            {resolveCopy(point.label, language)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </StepCard>
              </Reveal>

              <Reveal delay={0.16}>
                <StepCard
                  description={resolveCopy(copy.readyText, language)}
                  eyebrow="03 / 03"
                  title={resolveCopy(copy.ready, language)}
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <WalletActionButton className="w-full sm:w-auto" href="/wallet/guide">
                      {resolveCopy(copy.primary, language)}
                    </WalletActionButton>
                    <WalletActionButton className="w-full sm:w-auto" href="/wallet/create" variant="secondary">
                      {resolveCopy(copy.secondary, language)}
                    </WalletActionButton>
                  </div>
                </StepCard>
              </Reveal>
            </div>

            <SecurityNotice className="mt-6" text={resolveCopy(copy.notice, language)} />
          </div>
        </section>
      </main>
    </>
  );
}
