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
    title: { en: "Swap digital assets", zh: "交换数字资产" },
    description: {
      en: "Exchange one digital asset for another through supported services.",
      zh: "通过支持的服务，把一种数字资产交换为另一种数字资产。",
    },
  },
  {
    number: "02",
    title: { en: "Access market tools", zh: "访问市场工具" },
    description: {
      en: "View asset-related information and service interfaces.",
      zh: "查看与资产相关的信息和服务界面。",
    },
  },
  {
    number: "03",
    title: { en: "Move value between applications", zh: "在应用之间流转价值" },
    description: {
      en: "Use assets across different applications inside the ecosystem.",
      zh: "在生态中的不同应用之间使用资产。",
    },
  },
  {
    number: "04",
    title: { en: "Connect wallet-based transactions", zh: "连接钱包确认交易" },
    description: {
      en: "Confirm actions through NOVO Wallet before interacting with services.",
      zh: "在与服务交互前，通过 NOVO Wallet 确认操作。",
    },
  },
];

const connectionSteps: FlowStep[] = [
  {
    title: { en: "NOVO Wallet", zh: "NOVO Wallet" },
    description: {
      en: "Users access trading services and approve actions through their wallet.",
      zh: "用户通过钱包进入交易服务，并在其中确认操作。",
    },
  },
  {
    title: { en: "Trading Service", zh: "交易服务" },
    description: {
      en: "The service provides asset exchange and market-related functions.",
      zh: "服务本身提供资产交换和市场相关功能。",
    },
  },
  {
    title: { en: "NOVOVM Mainnet", zh: "NOVOVM 主网" },
    description: {
      en: "The network supports transaction processing and service interaction.",
      zh: "网络负责支撑交易处理和服务交互。",
    },
  },
  {
    title: { en: "Applications and Assets", zh: "应用与资产" },
    description: {
      en: "Assets can be used across ecosystem applications and services.",
      zh: "资产可以在生态中的应用和服务之间继续使用。",
    },
  },
];

const useCases: UseCase[] = [
  {
    title: { en: "Personal users", zh: "个人用户" },
    description: {
      en: "Exchange assets and access ecosystem services through a wallet.",
      zh: "通过钱包交换资产，并进入生态中的相关服务。",
    },
  },
  {
    title: { en: "Application users", zh: "应用用户" },
    description: {
      en: "Use assets inside finance, games, commerce, and other Web3 applications.",
      zh: "在金融、游戏、电商等 Web3 应用中使用资产。",
    },
  },
  {
    title: { en: "Developers", zh: "开发者" },
    description: {
      en: "Integrate asset exchange functions into applications.",
      zh: "把资产交换能力接入应用之中。",
    },
  },
  {
    title: { en: "Ecosystem partners", zh: "生态合作方" },
    description: {
      en: "Provide liquidity, market tools, or asset service interfaces.",
      zh: "提供流动性、市场工具或资产服务接口。",
    },
  },
];

function copy(text: Bilingual, language: Language) {
  return language === "zh" ? text.zh : text.en;
}

export function TradingServicesPage({ initialLanguage }: { initialLanguage: Language }) {
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
                {copy({ en: "Trading Services", zh: "交易服务" }, language)}
              </h1>
              <p className="mt-6 text-lg text-[rgba(90,181,70,0.9)] sm:text-xl">
                {copy(
                  {
                    en: "Exchange digital assets and access market-related services inside the NOVOVM ecosystem.",
                    zh: "在 NOVOVM 生态中交换数字资产并访问市场相关服务。",
                  },
                  language,
                )}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                {copy(
                  {
                    en: "Trading Services allow users to move value between digital assets, access ecosystem market tools, and interact with asset-based applications through NOVO Wallet.",
                    zh: "交易服务让用户能够在数字资产之间流转价值、访问生态市场工具，并通过 NOVO Wallet 与基于资产的应用交互。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#coming-soon">
                  {copy({ en: "Open Trading Services", zh: "打开交易服务" }, language)}
                </Button>
                <Button href="/ecosystem" variant="secondary">
                  {copy({ en: "Back to Ecosystem", zh: "返回生态功能服务" }, language)}
                </Button>
              </div>
              <p className="mt-4 text-sm text-[rgba(245,242,232,0.58)]" id="coming-soon">
                {copy({ en: "Coming Soon", zh: "Coming Soon" }, language)}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-8 shadow-[0_24px_52px_rgba(0,0,0,0.24)]">
                <div className="flex min-h-[320px] flex-col items-center justify-center">
                  <div className="w-full max-w-[280px] rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-4 text-center text-text">
                    NOVO Wallet
                  </div>
                  <div className="my-4 h-10 w-px bg-[rgba(90,181,70,0.24)]" />
                  <div className="w-full max-w-[280px] rounded-[10px] border border-[rgba(90,181,70,0.28)] bg-[rgba(13,18,13,0.7)] px-5 py-4 text-center text-text">
                    {copy({ en: "Asset Exchange", zh: "资产交换" }, language)}
                  </div>
                  <div className="my-4 h-10 w-px bg-[rgba(90,181,70,0.24)]" />
                  <div className="w-full max-w-[280px] rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-4 text-center text-text">
                    NOVOVM Mainnet
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
                  {copy({ en: "What are Trading Services?", zh: "什么是交易服务？" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Trading Services are tools that help users exchange digital assets and access market-related functions. In NOVOVM, trading is part of the broader ecosystem experience: users connect with a wallet, choose an asset service, confirm actions, and interact with applications through the network.",
                      zh: "交易服务是帮助用户交换数字资产并访问市场相关功能的工具。在 NOVOVM 中，交易属于更大生态体验的一部分：用户连接钱包、选择资产服务、确认操作，并通过网络与应用交互。",
                    },
                    language,
                  )}
                </p>
                <p className="mt-6 text-base leading-7 text-[rgba(245,242,232,0.76)] sm:text-lg">
                  {copy(
                    {
                      en: "Trading Services help assets move between users, applications, and ecosystem services.",
                      zh: "交易服务帮助资产在用户、应用和生态服务之间流动。",
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
                    copy({ en: "User", zh: "用户" }, language),
                    copy({ en: "Wallet", zh: "钱包" }, language),
                    copy({ en: "Trading Service", zh: "交易服务" }, language),
                    copy({ en: "Asset / Application", zh: "资产 / 应用" }, language),
                  ].map((label, index, list) => (
                    <div className="flex w-full flex-col items-center" key={label}>
                      <div className="w-full max-w-[260px] rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-4 text-text">
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
                  {copy({ en: "How Trading Services connect to NOVOVM", zh: "交易服务如何连接到 NOVOVM" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Trading Services are accessed through NOVO Wallet and operate through NOVOVM network infrastructure.",
                      zh: "交易服务通过 NOVO Wallet 访问，并运行在 NOVOVM 网络基础设施之上。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 lg:grid-cols-4">
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
                  {copy({ en: "Security and risk awareness", zh: "安全与风险提示" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Trading digital assets involves risk. Users should always verify the service, understand the action they are confirming, and protect their wallet credentials.",
                      zh: "交易数字资产存在风险。用户应始终核验服务来源、理解正在确认的操作，并保护好自己的钱包凭据。",
                    },
                    language,
                  )}
                </p>
                <div className="mt-8 space-y-3 text-base leading-7 text-[rgba(245,242,232,0.78)]">
                  <p>{copy({ en: "NOVOVM does not promise profits.", zh: "NOVOVM 不承诺任何收益。" }, language)}</p>
                  <p>{copy({ en: "Asset prices may change.", zh: "资产价格可能会变化。" }, language)}</p>
                  <p>{copy({ en: "Users should verify applications before connecting wallets.", zh: "连接钱包前，用户应先核验应用。" }, language)}</p>
                  <p>{copy({ en: "Recovery phrases should never be shared.", zh: "恢复助记词绝不应分享给他人。" }, language)}</p>
                  <p>{copy({ en: "Coming services may not all be available at launch.", zh: "即将开放的服务在初期未必会全部上线。" }, language)}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[16px] border border-[rgba(90,181,70,0.18)] bg-[linear-gradient(180deg,rgba(13,18,13,0.94),rgba(8,4,4,0.96))] p-8 text-center shadow-[0_26px_60px_rgba(0,0,0,0.28)] sm:p-12">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy({ en: "Move value across the NOVOVM ecosystem.", zh: "让价值在 NOVOVM 生态中流动。" }, language)}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
                {copy(
                  {
                    en: "Trading Services help users exchange assets, access market tools, and connect asset flows across applications.",
                    zh: "交易服务帮助用户交换资产、访问市场工具，并把资产流动连接到不同应用之中。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#coming-soon">
                  {copy({ en: "Open Trading Services", zh: "打开交易服务" }, language)}
                </Button>
                <Button href="/ecosystem" variant="secondary">
                  {copy({ en: "Back to Ecosystem Services", zh: "返回生态功能服务" }, language)}
                </Button>
                <Link
                  className="group inline-flex items-center gap-2 px-0 py-3 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                  href="/wallet/create"
                >
                  <span>{copy({ en: "Download NOVO Wallet", zh: "下载 NOVO Wallet" }, language)}</span>
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
