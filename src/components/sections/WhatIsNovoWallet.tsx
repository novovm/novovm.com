"use client";

import { ArrowRight, Blocks, Shield, Wallet, Zap } from "lucide-react";
import Link from "next/link";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { resolveCopy } from "@/lib/language";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";
import { type BilingualCopy, type Language } from "@/lib/site-content";

type WalletFeature = {
  description: BilingualCopy;
  icon: typeof Wallet;
  title: BilingualCopy;
};

type WalletPoint = {
  description: BilingualCopy;
  number: string;
  title: BilingualCopy;
};

type WalletFitItem = {
  eyebrow: BilingualCopy;
  description: BilingualCopy;
  title: BilingualCopy;
};

type WalletAction = {
  href: string;
  label: BilingualCopy;
  variant: "primary" | "secondary" | "text";
};

type WalletPageContent = {
  capabilities: {
    items: WalletFeature[];
    title: BilingualCopy;
  };
  fit: {
    items: WalletFitItem[];
    title: BilingualCopy;
  };
  getStarted: {
    actions: WalletAction[];
    description: BilingualCopy;
    title: BilingualCopy;
  };
  hero: {
    description: BilingualCopy;
    supporting: BilingualCopy[];
    title: BilingualCopy;
  };
  security: {
    items: WalletFeature[];
    title: BilingualCopy;
  };
  why: {
    items: WalletPoint[];
    title: BilingualCopy;
  };
};

const walletContent: WalletPageContent = {
  hero: {
    title: {
      en: "What is NOVO Wallet",
      zh: "什么是 NOVO Wallet",
    },
    description: {
      en: "NOVO Wallet is the simple place where you keep your assets and enter the NOVOVM network.",
      zh: "NOVO Wallet 是你保存资产、进入 NOVOVM 网络的简单入口。",
    },
    supporting: [
      {
        en: "It works like a personal control panel for your money, apps, and activity.",
        zh: "你可以把它理解成一个个人入口，用来管理资金、应用和操作。",
      },
      {
        en: "With a wallet, you can create an account, use applications, and understand your access.",
        zh: "有了钱包，你可以创建账户、使用应用，并理解如何使用钱包。",
      },
    ],
  },
  why: {
    title: {
      en: "Why do you need a wallet",
      zh: "为什么你需要一个钱包",
    },
    items: [
      {
        number: "01",
        title: {
          en: "You need a simple way to create a wallet.",
          zh: "你需要一种简单的方式来创建一个钱包。",
        },
        description: {
          en: "A wallet is how people start using applications on NOVOVM.",
          zh: "钱包就是用户开始使用 NOVOVM 应用的方式。",
        },
      },
      {
        number: "02",
        title: {
          en: "You need one place to manage what is yours.",
          zh: "你需要一个统一管理自己资产的地方。",
        },
        description: {
          en: "It keeps your balance, actions, and connected apps easier to follow.",
          zh: "它让你的余额、操作和已连接应用都更容易查看和理解。",
        },
      },
      {
        number: "03",
        title: {
          en: "You need to understand how to create your own account.",
          zh: "你需要了解如何创建自己的账户。",
        },
        description: {
          en: "The wallet helps you review what is happening before you continue.",
          zh: "钱包会在你继续之前，帮助你先看清楚将要发生什么。",
        },
      },
    ],
  },
  capabilities: {
    title: {
      en: "What can you do with NOVO Wallet",
      zh: "你可以用 NOVO Wallet 做什么",
    },
    items: [
      {
        icon: Wallet,
        title: {
          en: "Hold your assets",
          zh: "保存你的资产",
        },
        description: {
          en: "Keep your NOV and other supported assets in one clear place.",
          zh: "把 NOV 和其他支持的资产放在一个清晰的入口里管理。",
        },
      },
      {
        icon: Blocks,
        title: {
          en: "Create a wallet",
          zh: "创建一个钱包",
        },
        description: {
          en: "Use the wallet to enter services and products built on NOVOVM.",
          zh: "通过钱包进入基于 NOVOVM 构建的服务和应用。",
        },
      },
      {
        icon: Zap,
        title: {
          en: "How to create your own account",
          zh: "如何创建自己的账户",
        },
        description: {
          en: "Review and approve what an application wants to do.",
          zh: "在应用执行操作前，先查看并确认它要做什么。",
        },
      },
      {
        icon: Shield,
        title: {
          en: "How to use a wallet",
          zh: "如何使用钱包",
        },
        description: {
          en: "Use one place to understand your activity and make your own decisions.",
          zh: "用一个地方看清自己的活动，并自己决定下一步怎么做。",
        },
      },
    ],
  },
  fit: {
    title: {
      en: "How it fits into NOVOVM",
      zh: "它在 NOVOVM 中扮演什么角色",
    },
    items: [
      {
        eyebrow: {
          en: "Step 1",
          zh: "步骤 1",
        },
        title: {
          en: "You start with the wallet",
          zh: "从钱包开始",
        },
        description: {
          en: "The wallet is the first place people enter before using anything else.",
          zh: "在使用其他内容之前，钱包通常是用户开始使用 NOVOVM 的第一站。",
        },
      },
      {
        eyebrow: {
          en: "Step 2",
          zh: "步骤 2",
        },
        title: {
          en: "The wallet connects to applications",
          zh: "钱包连接应用",
        },
        description: {
          en: "It helps people move from holding assets to actually using products.",
          zh: "它让用户从持有资产，走到真正开始使用产品。",
        },
      },
      {
        eyebrow: {
          en: "Step 3",
          zh: "步骤 3",
        },
        title: {
          en: "The wallet keeps the experience together",
          zh: "钱包把体验串联起来",
        },
        description: {
          en: "That is what makes the NOVOVM network feel usable instead of abstract.",
          zh: "这也是为什么 NOVOVM 给人的感觉会更可用，而不是抽象概念。",
        },
      },
    ],
  },
  security: {
    title: {
      en: "Security and control",
      zh: "安全与控制",
    },
    items: [
      {
        icon: Shield,
        title: {
          en: "You decide when to connect",
          zh: "你决定何时连接",
        },
        description: {
          en: "The wallet should help you choose when an app can interact with you.",
          zh: "钱包的作用之一，就是让你自己决定何时与应用建立连接。",
        },
      },
      {
        icon: Zap,
        title: {
          en: "You review actions before approving",
          zh: "确认前先查看操作",
        },
        description: {
          en: "You can see what is being requested before moving forward.",
          zh: "在继续之前，你可以先看到对方请求你执行什么操作。",
        },
      },
      {
        icon: Wallet,
        title: {
          en: "You keep one clear place for your activity",
          zh: "用一个地方管理活动",
        },
        description: {
          en: "That makes using the network feel calmer and easier to understand.",
          zh: "这会让你在使用网络时，感觉更清楚，也更安心。",
        },
      },
    ],
  },
  getStarted: {
    title: {
      en: "Get started",
      zh: "开始使用",
    },
    description: {
      en: "Start by learning the network, understanding NOV, and getting ready to create your wallet when NOVO Wallet becomes available.",
      zh: "你可以先了解 NOVOVM、认识 NOV，并在 NOVO Wallet 开放时准备创建自己的钱包。",
    },
    actions: [
      {
        href: "/#final-cta",
        label: {
          en: "Create NOVO Wallet",
          zh: "创建 NOVO Wallet",
        },
        variant: "primary",
      },
      {
        href: "/what-is-nov",
        label: {
          en: "What is NOV",
          zh: "什么是 NOV",
        },
        variant: "secondary",
      },
      {
        href: "/",
        label: {
          en: "Explore NOVOVM",
          zh: "探索 NOVOVM",
        },
        variant: "text",
      },
    ],
  },
};

function SectionHeading({
  language,
  title,
}: {
  language: Language;
  title: BilingualCopy;
}) {
  return (
    <Reveal>
      <h2 className="max-w-4xl text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
        {resolveCopy(title, language)}
      </h2>
    </Reveal>
  );
}

function ActionLink({
  href,
  label,
  language,
  variant,
}: WalletAction & { language: Language }) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 rounded-[6px] text-sm font-medium transition-[transform,border-color,background-color,color,box-shadow] duration-500",
        variant === "primary" &&
          "border border-green bg-green px-5 py-3 text-text hover:-translate-y-1 hover:border-gold hover:bg-[#63be4f] hover:shadow-[0_14px_30px_rgba(241,188,26,0.12)]",
        variant === "secondary" &&
          "border border-border bg-[rgba(4,0,0,0.32)] px-5 py-3 text-text hover:-translate-y-1 hover:border-gold hover:bg-[rgba(241,188,26,0.08)]",
        variant === "text" &&
          "px-0 py-3 text-muted hover:text-text",
      )}
      href={href}
    >
      <span>{resolveCopy(label, language)}</span>
      <ArrowRight
        aria-hidden="true"
        className={cn(
          "h-4 w-4 transition-[opacity,transform] duration-500",
          variant === "text"
            ? "opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
            : "group-hover:translate-x-1",
        )}
        strokeWidth={1.8}
      />
    </Link>
  );
}

export function WhatIsNovoWallet({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);

  return (
    <>
      <DetailPageHeader
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      <main className="bg-background pt-[72px]">
        <section className="relative overflow-hidden px-5 sm:px-6 lg:px-8">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.16]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(90,181,70,0.05),transparent)]" />

          <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-7xl items-center gap-12 py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,0.72fr)] lg:py-24">
            <Reveal className="max-w-[760px]">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[rgba(90,181,70,0.56)]">
                {resolveCopy(walletContent.hero.title, language)}
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-none text-text sm:text-5xl lg:text-[5.1rem]">
                {language === "zh" ? "NOVO 钱包" : "NOVO Wallet"}
              </h1>
              <p className="mt-10 max-w-3xl text-xl leading-8 text-[rgba(245,242,232,0.9)] sm:text-2xl sm:leading-9">
                {resolveCopy(walletContent.hero.description, language)}
              </p>

              <div className="mt-10 space-y-5">
                {walletContent.hero.supporting.map((paragraph) => (
                  <div key={paragraph.en}>
                    <p className="text-sm leading-7 text-[rgba(245,242,232,0.82)] sm:text-base">
                      {resolveCopy(paragraph, language)}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="grid gap-4">
                {[
                  {
                    en: "Create a wallet",
                    href: "/wallet/create",
                    zh: "创建一个钱包",
                  },
                  {
                    en: "How to create your own account",
                    href: "/wallet/account",
                    zh: "如何创建自己的账户",
                  },
                  {
                    en: "How to use a wallet",
                    href: "/wallet/guide",
                    zh: "如何使用钱包",
                  },
                ].map((point, index) => (
                  <Link
                    className="interactive-card calm-panel calm-panel-hover block rounded-[8px] p-5 sm:p-6"
                    href={point.href}
                    key={point.en}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-[rgba(90,181,70,0.48)]">
                      {`0${index + 1}`}
                    </p>
                    <p className="mt-4 text-xl leading-tight text-text">
                      {resolveCopy(point, language)}
                    </p>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={walletContent.why.title} />
            <div className="mt-12">
              {walletContent.why.items.map((item, index) => (
                <Reveal delay={index * 0.08} key={item.number}>
                  <div className="group grid gap-5 border-b border-[rgba(90,181,70,0.16)] py-8 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-10">
                    <div className="pt-1">
                      <p className="text-xs font-medium tracking-[0.32em] text-[rgba(90,181,70,0.42)] transition-colors duration-500 group-hover:text-green-bright">
                        {item.number}
                      </p>
                    </div>
                    <div className="max-w-4xl">
                      <p className="text-2xl leading-tight text-text sm:text-[2rem]">
                        {resolveCopy(item.title, language)}
                      </p>
                      <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
                        {resolveCopy(item.description, language)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              language={language}
              title={walletContent.capabilities.title}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {walletContent.capabilities.items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal className="h-full" delay={index * 0.08} key={item.title.en}>
                    <div className="interactive-card calm-panel calm-panel-hover h-full rounded-[8px] p-6 sm:p-7">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(4,0,0,0.42)] text-[rgba(245,242,232,0.9)]">
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                        />
                      </div>
                      <div className="mt-6">
                        <h3 className="text-xl leading-tight text-text">
                          {resolveCopy(item.title, language)}
                        </h3>
                        <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
                          {resolveCopy(item.description, language)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={walletContent.fit.title} />
            <Reveal className="mt-12" delay={0.08}>
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)_48px_minmax(0,1fr)] lg:items-center">
                {walletContent.fit.items.map((item, index) => (
                  <div className="contents" key={item.title.en}>
                    <div className="interactive-card calm-panel calm-panel-hover rounded-[8px] p-6 sm:p-7">
                      <p className="text-xs font-medium uppercase tracking-[0.28em] text-[rgba(90,181,70,0.48)]">
                        {resolveCopy(item.eyebrow, language)}
                      </p>
                      <h3 className="mt-5 text-2xl leading-tight text-text">
                        {resolveCopy(item.title, language)}
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
                        {resolveCopy(item.description, language)}
                      </p>
                    </div>
                    {index < walletContent.fit.items.length - 1 ? (
                      <div className="hidden justify-center lg:flex">
                        <ArrowRight
                          aria-hidden="true"
                          className="h-5 w-5 text-[rgba(90,181,70,0.4)]"
                          strokeWidth={1.75}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={walletContent.security.title} />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {walletContent.security.items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal delay={index * 0.08} key={item.title.en}>
                    <div className="interactive-card calm-panel calm-panel-hover h-full rounded-[8px] p-6 sm:p-7">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(4,0,0,0.42)] text-[rgba(245,242,232,0.9)]">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <h3 className="mt-6 text-xl leading-tight text-text">
                        {resolveCopy(item.title, language)}
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
                        {resolveCopy(item.description, language)}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              language={language}
              title={walletContent.getStarted.title}
            />
            <Reveal className="mt-6 max-w-3xl" delay={0.08}>
              <p className="text-base leading-7 text-[rgba(245,242,232,0.82)]">
                {resolveCopy(walletContent.getStarted.description, language)}
              </p>
            </Reveal>
            <Reveal
              className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
              delay={0.16}
            >
              {walletContent.getStarted.actions.map((action) => (
                <ActionLink
                  {...action}
                  key={action.label.en}
                  language={language}
                />
              ))}
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
