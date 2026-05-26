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
    title: { en: "Register readable names", zh: "注册可读名称" },
    description: {
      en: "Use simple names for accounts, services, or network identities.",
      zh: "为账户、服务或网络身份使用简洁可读的名称。",
    },
  },
  {
    number: "02",
    title: { en: "Link names to wallet accounts", zh: "把名称连接到钱包账户" },
    description: {
      en: "Connect a readable name to a wallet-based account.",
      zh: "把可读名称连接到基于钱包的账户。",
    },
  },
  {
    number: "03",
    title: { en: "Identify services", zh: "识别服务" },
    description: {
      en: "Help users recognize official services and ecosystem applications.",
      zh: "帮助用户识别官方服务和生态应用。",
    },
  },
  {
    number: "04",
    title: { en: "Improve user experience", zh: "提升使用体验" },
    description: {
      en: "Reduce mistakes caused by copying long addresses.",
      zh: "减少因复制长地址而产生的错误。",
    },
  },
];

const connectionSteps: FlowStep[] = [
  {
    title: { en: "Readable Name", zh: "可读名称" },
    description: {
      en: "A human-friendly name that users can recognize.",
      zh: "用户可以直观识别的人类可读名称。",
    },
  },
  {
    title: { en: "NOVO Account", zh: "NOVO 账户" },
    description: {
      en: "The identity layer connected to the name.",
      zh: "与名称关联的身份层。",
    },
  },
  {
    title: { en: "NOVO Wallet", zh: "NOVO Wallet" },
    description: {
      en: "The wallet that controls account access and permissions.",
      zh: "控制账户访问和权限的钱包入口。",
    },
  },
  {
    title: { en: "Applications and Services", zh: "应用与服务" },
    description: {
      en: "DAPPs and services can use readable names to improve usability.",
      zh: "DAPP 和服务可以使用可读名称来提升可用性。",
    },
  },
  {
    title: { en: "NOVOVM Mainnet", zh: "NOVOVM 主网" },
    description: {
      en: "The network where identities, services, and interactions operate.",
      zh: "身份、服务和交互运行的基础网络。",
    },
  },
];

const useCases: UseCase[] = [
  {
    title: { en: "Personal identity", zh: "个人身份" },
    description: {
      en: "Use a readable name for wallet-based identity.",
      zh: "为基于钱包的身份使用可读名称。",
    },
  },
  {
    title: { en: "Payments and transfers", zh: "支付与转账" },
    description: {
      en: "Send assets to a readable name instead of copying a long address.",
      zh: "把资产发送到可读名称，而不是复制冗长地址。",
    },
  },
  {
    title: { en: "Applications", zh: "应用" },
    description: {
      en: "Let applications display recognizable account or service names.",
      zh: "让应用显示更容易识别的账户或服务名称。",
    },
  },
  {
    title: { en: "Service discovery", zh: "服务识别" },
    description: {
      en: "Help users identify ecosystem services more clearly.",
      zh: "帮助用户更清晰地识别生态服务。",
    },
  },
  {
    title: { en: "Communities", zh: "社群" },
    description: {
      en: "Use readable names for groups, projects, and public identities.",
      zh: "为群组、项目和公开身份使用可读名称。",
    },
  },
];

function copy(text: Bilingual, language: Language) {
  return language === "zh" ? text.zh : text.en;
}

export function ChainNameServicesPage({ initialLanguage }: { initialLanguage: Language }) {
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
                {copy({ en: "Chain Name Services", zh: "链名服务" }, language)}
              </h1>
              <p className="mt-6 text-lg text-[rgba(90,181,70,0.9)] sm:text-xl">
                {copy(
                  {
                    en: "Use readable names for accounts, services, and network identities.",
                    zh: "为账户、服务和网络身份使用可读名称。",
                  },
                  language,
                )}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                {copy(
                  {
                    en: "Chain Name Services make Web3 easier to use by replacing long, difficult addresses with readable names that can represent users, applications, services, and network identities.",
                    zh: "链名服务通过用可读名称替代冗长难记的地址，让 Web3 更容易使用。这些名称可以代表用户、应用、服务和网络身份。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#coming-soon">
                  {copy({ en: "Explore Chain Name Services", zh: "探索链名服务" }, language)}
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
                <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                  {[
                    "alice.novo",
                    copy({ en: "Wallet Account", zh: "钱包账户" }, language),
                    copy({ en: "Network Service", zh: "网络服务" }, language),
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
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "What are Chain Name Services?", zh: "什么是链名服务？" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Chain Name Services allow users and services to use readable names instead of long technical addresses. They help people recognize accounts, applications, and services more easily across the NOVOVM ecosystem.",
                      zh: "链名服务让用户和服务可以使用可读名称，而不必面对冗长的技术地址。它帮助人们在 NOVOVM 生态中更容易识别账户、应用和服务。",
                    },
                    language,
                  )}
                </p>
                <p className="mt-6 text-base leading-7 text-[rgba(245,242,232,0.76)] sm:text-lg">
                  {copy(
                    {
                      en: "A chain name works like a human-readable identity layer for Web3.",
                      zh: "链名可以被理解为 Web3 中的人类可读身份层。",
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
                    "alice.novo",
                    copy({ en: "Wallet Account", zh: "钱包账户" }, language),
                    copy({ en: "Applications / Services", zh: "应用 / 服务" }, language),
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
                  {copy({ en: "How Chain Name Services connect to NOVOVM", zh: "链名服务如何连接到 NOVOVM" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Chain Name Services connect readable names with accounts, wallets, applications, and network services.",
                      zh: "链名服务把可读名称与账户、钱包、应用和网络服务连接起来。",
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
                  {copy({ en: "Security and name ownership", zh: "安全与名称所有权" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Readable names improve usability, but users should still verify who they are interacting with.",
                      zh: "可读名称可以提升使用体验，但用户仍然需要核验自己正在与谁交互。",
                    },
                    language,
                  )}
                </p>
                <div className="mt-8 space-y-3 text-base leading-7 text-[rgba(245,242,232,0.78)]">
                  <p>{copy({ en: "Always verify the name before sending assets.", zh: "发送资产前始终要核验名称。" }, language)}</p>
                  <p>{copy({ en: "Similar names can be misleading.", zh: "相似名称可能具有误导性。" }, language)}</p>
                  <p>{copy({ en: "Official services should be checked carefully.", zh: "官方服务需要被仔细核验。" }, language)}</p>
                  <p>{copy({ en: "Name ownership and availability depend on supported services.", zh: "名称所有权和可用性取决于支持的服务。" }, language)}</p>
                  <p>{copy({ en: "Coming name features may not all be available at launch.", zh: "即将开放的链名功能在初期未必会全部上线。" }, language)}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[16px] border border-[rgba(90,181,70,0.18)] bg-[linear-gradient(180deg,rgba(13,18,13,0.94),rgba(8,4,4,0.96))] p-8 text-center shadow-[0_26px_60px_rgba(0,0,0,0.28)] sm:p-12">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy({ en: "Readable identity for the NOVOVM ecosystem.", zh: "面向 NOVOVM 生态的可读身份层。" }, language)}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
                {copy(
                  {
                    en: "Chain Name Services make accounts, applications, and services easier to recognize and use across Web3.",
                    zh: "链名服务让账户、应用和服务在 Web3 中更容易被识别和使用。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#coming-soon">
                  {copy({ en: "Explore Chain Name Services", zh: "探索链名服务" }, language)}
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
