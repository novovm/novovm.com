"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";
import { type Language } from "@/lib/site-content";

type Bilingual = {
  en: string;
  zh: string;
};

type Capability = {
  description: Bilingual;
  number: string;
  title: Bilingual;
};

type FlowStep = {
  description: Bilingual;
  title: Bilingual;
};

type UseCase = {
  description: Bilingual;
  title: Bilingual;
};

const capabilityCards: Capability[] = [
  {
    number: "01",
    title: { en: "Manage assets", zh: "管理资产" },
    description: {
      en: "Store, view, send, and receive digital assets.",
      zh: "保存、查看、发送和接收数字资产。",
    },
  },
  {
    number: "02",
    title: { en: "Access applications", zh: "访问应用" },
    description: {
      en: "Use NOVO Wallet to enter Web3 applications and services.",
      zh: "使用 NOVO Wallet 进入 Web3 应用和服务。",
    },
  },
  {
    number: "03",
    title: { en: "Control permissions", zh: "控制权限" },
    description: {
      en: "Choose which applications can connect to your wallet.",
      zh: "选择哪些应用可以连接到你的钱包。",
    },
  },
  {
    number: "04",
    title: { en: "Approve actions", zh: "确认操作" },
    description: {
      en: "Review and confirm transactions before they are submitted.",
      zh: "在提交前审查并确认交易操作。",
    },
  },
];

const connectionSteps: FlowStep[] = [
  {
    title: { en: "User", zh: "用户" },
    description: {
      en: "The person who owns the wallet and controls access.",
      zh: "拥有钱包并控制访问权限的人。",
    },
  },
  {
    title: { en: "NOVO Wallet", zh: "NOVO Wallet" },
    description: {
      en: "The interface for assets, accounts, permissions, and application access.",
      zh: "资产、账户、权限和应用访问的统一界面。",
    },
  },
  {
    title: { en: "NOVO Account", zh: "NOVO 账户" },
    description: {
      en: "The user's identity inside the NOVOVM ecosystem.",
      zh: "用户在 NOVOVM 生态中的身份入口。",
    },
  },
  {
    title: { en: "Applications and Services", zh: "应用与服务" },
    description: {
      en: "DAPPs and ecosystem services accessed through the wallet.",
      zh: "通过钱包访问的 DAPP 和生态服务。",
    },
  },
  {
    title: { en: "NOVOVM Mainnet", zh: "NOVOVM 主网" },
    description: {
      en: "The network where transactions, applications, and services operate.",
      zh: "交易、应用和服务运行的基础网络。",
    },
  },
];

const useCases: UseCase[] = [
  {
    title: { en: "Personal users", zh: "个人用户" },
    description: {
      en: "Manage assets, sign in to applications, and control account access.",
      zh: "管理资产、登录应用，并控制账户访问。",
    },
  },
  {
    title: { en: "New Web3 users", zh: "新的 Web3 用户" },
    description: {
      en: "Start with a wallet and explore the NOVOVM ecosystem without needing to understand every technical layer.",
      zh: "从钱包开始，在不必理解每一层技术细节的前提下探索 NOVOVM 生态。",
    },
  },
  {
    title: { en: "Application users", zh: "应用用户" },
    description: {
      en: "Connect to finance, games, storage, social, commerce, and other Web3 services.",
      zh: "连接金融、游戏、存储、社交、电商等 Web3 服务。",
    },
  },
  {
    title: { en: "Developers", zh: "开发者" },
    description: {
      en: "Build applications that users can access through wallet-based identity and permissions.",
      zh: "构建能够通过钱包身份和权限体系访问的应用。",
    },
  },
];

function copy(text: Bilingual, language: Language) {
  return language === "zh" ? text.zh : text.en;
}

export function WalletServicesPage({ initialLanguage }: { initialLanguage: Language }) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <DetailPageHeader language={language} onLanguageChange={handleLanguageChange} />
      <main className="bg-background pt-[72px]">
        <section className="relative overflow-hidden px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.1]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(90,181,70,0.06),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(241,188,26,0.03),transparent_18%)]" />

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.82fr)]">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-green-bright">
                ECOSYSTEM SERVICES
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.04] text-text sm:text-5xl lg:text-[5rem]">
                {copy({ en: "Wallet Services", zh: "钱包服务" }, language)}
              </h1>
              <p className="mt-6 text-lg text-[rgba(90,181,70,0.9)] sm:text-xl">
                {copy(
                  {
                    en: "Manage accounts, assets, permissions, and application access inside the NOVOVM ecosystem.",
                    zh: "在 NOVOVM 生态中管理账户、资产、权限和应用访问。",
                  },
                  language,
                )}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                {copy(
                  {
                    en: "Wallet Services are the primary entry point for users. They connect your NOVO account, digital assets, applications, and network identity into one usable interface.",
                    zh: "钱包服务是用户进入生态的主要入口。它把 NOVO 账户、数字资产、应用和网络身份连接进一个可使用的统一界面。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/wallet/create">
                  {copy({ en: "Download NOVO Wallet", zh: "下载 NOVO Wallet" }, language)}
                </Button>
                <Button href="/ecosystem" variant="secondary">
                  {copy({ en: "Back to Ecosystem", zh: "返回生态功能服务" }, language)}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-8 shadow-[0_24px_52px_rgba(0,0,0,0.24)]">
                <div className="grid min-h-[320px] items-center gap-4">
                  <div className="w-full max-w-[280px] rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-4 text-center text-text">
                    {copy({ en: "User", zh: "用户" }, language)}
                  </div>
                  <div className="h-px w-16 bg-[rgba(90,181,70,0.24)] sm:w-px sm:h-10 sm:justify-self-center" />
                  <div className="w-full max-w-[280px] rounded-[10px] border border-[rgba(90,181,70,0.28)] bg-[rgba(13,18,13,0.7)] px-5 py-4 text-center text-text">
                    NOVO Wallet
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3 sm:items-start">
                    <div className="sm:col-span-3 sm:flex sm:items-center sm:justify-center sm:gap-6">
                      <div className="h-10 w-px bg-[rgba(90,181,70,0.24)]" />
                    </div>
                    {[
                      copy({ en: "Assets", zh: "资产" }, language),
                      copy({ en: "Applications", zh: "应用" }, language),
                      "NOVOVM Mainnet",
                    ].map((label) => (
                      <div
                        className="rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-4 text-center text-text"
                        key={label}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "What are Wallet Services?", zh: "什么是钱包服务？" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Wallet Services help users access Web3 through a simple account interface. Instead of using many disconnected tools, users can manage assets, sign in to applications, approve actions, and interact with network services through NOVO Wallet.",
                      zh: "钱包服务帮助用户通过一个简洁的账户界面进入 Web3。用户不需要在多个割裂的工具之间切换，而是可以通过 NOVO Wallet 管理资产、登录应用、确认操作，并与网络服务交互。",
                    },
                    language,
                  )}
                </p>
                <p className="mt-6 text-base leading-7 text-[rgba(245,242,232,0.76)] sm:text-lg">
                  {copy(
                    {
                      en: "Wallet Services turn the NOVOVM ecosystem into something users can actually access and control.",
                      zh: "钱包服务让 NOVOVM 生态真正变成用户可以进入和控制的系统。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-14 rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-8">
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  {[
                    "Wallet",
                    copy({ en: "Account", zh: "账户" }, language),
                    copy({ en: "Assets + Applications + Network", zh: "资产 + 应用 + 网络" }, language),
                  ].map((label, index, list) => (
                    <div className="flex w-full flex-col items-center" key={label}>
                      <div className="w-full max-w-[300px] rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-4 text-text">
                        {label}
                      </div>
                      {index < list.length - 1 ? (
                        <div className="my-3 h-10 w-px bg-[rgba(90,181,70,0.24)]" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy({ en: "What users can do", zh: "用户可以做什么" }, language)}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {capabilityCards.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.number}>
                  <motion.div
                    className="group rounded-[12px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] p-6 transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.42)] hover:bg-[rgba(13,18,13,0.42)]"
                    transition={reduceMotion ? undefined : { duration: 0.28 }}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-xs font-medium tracking-[0.28em] text-[rgba(90,181,70,0.54)]">
                        {item.number}
                      </p>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-1 group-hover:opacity-100" strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-5 text-2xl leading-tight text-text">{copy(item.title, language)}</h3>
                    <p className="mt-4 text-base leading-7 text-[rgba(245,242,232,0.76)]">
                      {copy(item.description, language)}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "How Wallet Services connect to NOVOVM", zh: "钱包服务如何连接到 NOVOVM" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Wallet Services sit between users and the network. They allow users to connect accounts, manage assets, approve actions, and access decentralized applications through NOVOVM infrastructure.",
                      zh: "钱包服务位于用户与网络之间。它让用户能够连接账户、管理资产、确认操作，并通过 NOVOVM 基础设施访问去中心化应用。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 lg:grid-cols-5">
              {connectionSteps.map((step, index) => (
                <motion.button
                  className="relative rounded-[12px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-6 text-left transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.42)] hover:bg-[rgba(13,18,13,0.42)]"
                  key={step.title.en}
                  type="button"
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                >
                  <h3 className="text-xl text-text">{copy(step.title, language)}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted">{copy(step.description, language)}</p>
                  {index < connectionSteps.length - 1 ? (
                    <span className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-[rgba(90,181,70,0.28)] lg:block" />
                  ) : null}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy({ en: "Typical use cases", zh: "典型使用场景" }, language)}
              </h2>
            </Reveal>

            <div className="mt-16">
              {useCases.map((item, index) => (
                <Reveal delay={index * 0.07} key={item.title.en}>
                  <div className="grid gap-5 border-b border-[rgba(90,181,70,0.12)] py-8 transition-colors duration-300 hover:border-[rgba(90,181,70,0.26)] lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                    <p className="text-2xl font-semibold leading-tight text-text transition-colors duration-300 hover:text-green-bright">
                      {copy(item.title, language)}
                    </p>
                    <p className="max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.76)] sm:text-lg">
                      {copy(item.description, language)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl rounded-[16px] border border-[rgba(90,181,70,0.18)] bg-[rgba(8,4,4,0.76)] p-8">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl">
                  {copy({ en: "Security and control", zh: "安全与控制" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Your wallet gives you control over your account and assets. This also means you are responsible for protecting your access.",
                      zh: "钱包让你能够控制自己的账户和资产，同时也意味着你需要负责保护好自己的访问权限。",
                    },
                    language,
                  )}
                </p>
                <div className="mt-8 space-y-3 text-base leading-7 text-[rgba(245,242,232,0.78)]">
                  <p>{copy({ en: "Never share your recovery phrase.", zh: "绝不要分享恢复助记词。" }, language)}</p>
                  <p>{copy({ en: "Verify applications before connecting your wallet.", zh: "连接钱包前先核验应用来源。" }, language)}</p>
                  <p>{copy({ en: "Review actions before approving them.", zh: "确认前先审查每一个操作。" }, language)}</p>
                  <p>{copy({ en: "Disconnect applications you no longer use.", zh: "断开不再使用的应用连接。" }, language)}</p>
                  <p>{copy({ en: "NOVOVM will never ask for your recovery phrase outside the official wallet interface.", zh: "除官方钱包界面外，NOVOVM 不会要求你提供恢复助记词。" }, language)}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[16px] border border-[rgba(90,181,70,0.18)] bg-[linear-gradient(180deg,rgba(13,18,13,0.94),rgba(8,4,4,0.96))] p-8 text-center shadow-[0_26px_60px_rgba(0,0,0,0.28)] sm:p-12">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy({ en: "Your entry point to NOVOVM.", zh: "你进入 NOVOVM 的入口。" }, language)}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
                {copy(
                  {
                    en: "Wallet Services make it possible to access applications, manage assets, control permissions, and interact with the NOVOVM ecosystem.",
                    zh: "钱包服务让用户能够访问应用、管理资产、控制权限，并与 NOVOVM 生态交互。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/wallet/create">
                  {copy({ en: "Download NOVO Wallet", zh: "下载 NOVO Wallet" }, language)}
                </Button>
                <Button href="/wallet/account" variant="secondary">
                  {copy({ en: "Create NOVO Account", zh: "创建 NOVO 账户" }, language)}
                </Button>
                <Link
                  className="group inline-flex items-center gap-2 px-0 py-3 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                  href="/wallet/guide"
                >
                  <span>{copy({ en: "Learn how to use your wallet", zh: "了解如何使用你的钱包" }, language)}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer language={language} />
    </>
  );
}
