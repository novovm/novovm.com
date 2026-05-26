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
    title: { en: "Store application data", zh: "存储应用数据" },
    description: {
      en: "Applications can save and access data through ecosystem storage services.",
      zh: "应用可以通过生态存储服务保存和访问数据。",
    },
  },
  {
    number: "02",
    title: { en: "Manage user-controlled files", zh: "管理用户可控文件" },
    description: {
      en: "Users can connect data access to wallet-based identity and permissions.",
      zh: "用户可以把数据访问与钱包身份和权限体系连接起来。",
    },
  },
  {
    number: "03",
    title: { en: "Support decentralized applications", zh: "支撑去中心化应用" },
    description: {
      en: "DAPPs can use storage services for files, metadata, records, and user content.",
      zh: "DAPP 可以把存储服务用于文件、元数据、记录和用户内容。",
    },
  },
  {
    number: "04",
    title: { en: "Connect data with permissions", zh: "把数据与权限连接" },
    description: {
      en: "Data access can be controlled through accounts, wallets, and application rules.",
      zh: "数据访问可以通过账户、钱包和应用规则来控制。",
    },
  },
];

const connectionSteps: FlowStep[] = [
  {
    title: { en: "NOVO Wallet", zh: "NOVO Wallet" },
    description: {
      en: "Users access services and control permissions through their wallet.",
      zh: "用户通过钱包进入服务，并控制相关权限。",
    },
  },
  {
    title: { en: "Account Permission", zh: "账户权限" },
    description: {
      en: "Applications request access based on user-approved permissions.",
      zh: "应用基于用户批准的权限请求访问能力。",
    },
  },
  {
    title: { en: "Storage Service", zh: "存储服务" },
    description: {
      en: "Data is stored, accessed, or managed through ecosystem storage infrastructure.",
      zh: "数据通过生态存储基础设施完成存储、访问和管理。",
    },
  },
  {
    title: { en: "Applications", zh: "应用" },
    description: {
      en: "DAPPs use storage services for files, records, metadata, and user content.",
      zh: "DAPP 使用存储服务来承载文件、记录、元数据和用户内容。",
    },
  },
  {
    title: { en: "NOVOVM Network", zh: "NOVOVM 网络" },
    description: {
      en: "The network supports service interaction and ecosystem-level access.",
      zh: "网络负责支撑服务交互和生态级访问能力。",
    },
  },
];

const useCases: UseCase[] = [
  {
    title: { en: "Personal users", zh: "个人用户" },
    description: {
      en: "Store and access data connected to wallet identity and applications.",
      zh: "存储并访问与钱包身份和应用相连接的数据。",
    },
  },
  {
    title: { en: "Application developers", zh: "应用开发者" },
    description: {
      en: "Use storage services for user files, metadata, records, and app content.",
      zh: "把存储服务用于用户文件、元数据、记录和应用内容。",
    },
  },
  {
    title: { en: "Enterprise systems", zh: "企业系统" },
    description: {
      en: "Connect business data workflows with permission-aware Web3 infrastructure.",
      zh: "把业务数据流程连接到具备权限意识的 Web3 基础设施上。",
    },
  },
  {
    title: { en: "Content platforms", zh: "内容平台" },
    description: {
      en: "Support media, documents, profiles, and user-generated content.",
      zh: "支撑媒体、文档、个人资料和用户生成内容。",
    },
  },
  {
    title: { en: "AI and data services", zh: "AI 与数据服务" },
    description: {
      en: "Use storage infrastructure for datasets, model-related files, and workflow data.",
      zh: "把存储基础设施用于数据集、模型相关文件和工作流数据。",
    },
  },
];

function copy(text: Bilingual, language: Language) {
  return language === "zh" ? text.zh : text.en;
}

export function StorageServicesPage({ initialLanguage }: { initialLanguage: Language }) {
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
                {copy({ en: "Storage Services", zh: "存储服务" }, language)}
              </h1>
              <p className="mt-6 text-lg text-[rgba(90,181,70,0.9)] sm:text-xl">
                {copy(
                  {
                    en: "Access and manage data through decentralized storage services.",
                    zh: "通过去中心化存储服务访问和管理数据。",
                  },
                  language,
                )}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                {copy(
                  {
                    en: "Storage Services allow users, applications, and ecosystem partners to store, access, and manage data across Web3 infrastructure. They help applications move beyond centralized data silos and give users a clearer path to data control.",
                    zh: "存储服务让用户、应用和生态合作方能够在 Web3 基础设施中存储、访问和管理数据。它帮助应用摆脱中心化数据孤岛，并给用户提供更清晰的数据控制路径。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#coming-soon">
                  {copy({ en: "Explore Storage Services", zh: "探索存储服务" }, language)}
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
                <div className="grid min-h-[320px] items-center gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      copy({ en: "User", zh: "用户" }, language),
                      copy({ en: "App", zh: "应用" }, language),
                    ].map((label) => (
                      <div
                        className="rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-4 text-center text-text"
                        key={label}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="h-px w-16 bg-[rgba(90,181,70,0.24)] sm:w-px sm:h-10 sm:justify-self-center" />
                  <div className="w-full rounded-[10px] border border-[rgba(90,181,70,0.28)] bg-[rgba(13,18,13,0.7)] px-5 py-4 text-center text-text">
                    {copy({ en: "Storage Service", zh: "存储服务" }, language)}
                  </div>
                  <div className="h-px w-16 bg-[rgba(90,181,70,0.24)] sm:w-px sm:h-10 sm:justify-self-center" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      copy({ en: "Data Layer", zh: "数据层" }, language),
                      "NOVOVM Network",
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
                  {copy({ en: "What are Storage Services?", zh: "什么是存储服务？" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Storage Services provide a way to store and access data through decentralized infrastructure. Instead of keeping all data inside one centralized platform, applications can connect data storage with wallet identity, permissions, and network services.",
                      zh: "存储服务提供一种通过去中心化基础设施保存和访问数据的方式。应用不必把所有数据都放在单一中心化平台中，而是可以把数据存储与钱包身份、权限和网络服务连接起来。",
                    },
                    language,
                  )}
                </p>
                <p className="mt-6 text-base leading-7 text-[rgba(245,242,232,0.76)] sm:text-lg">
                  {copy(
                    {
                      en: "Storage Services help Web3 applications keep data available, connected, and easier for users to control.",
                      zh: "存储服务帮助 Web3 应用让数据保持可用、可连接，也更容易被用户控制。",
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
                    copy({ en: "Wallet Identity", zh: "钱包身份" }, language),
                    copy({ en: "Permissions", zh: "权限" }, language),
                    copy({ en: "Storage Service", zh: "存储服务" }, language),
                    copy({ en: "Application Data", zh: "应用数据" }, language),
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
                  {copy({ en: "How Storage Services connect to NOVOVM", zh: "存储服务如何连接到 NOVOVM" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Storage Services connect data access with NOVOVM accounts, applications, and network infrastructure.",
                      zh: "存储服务把数据访问与 NOVOVM 账户、应用和网络基础设施连接起来。",
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
                  {copy({ en: "Security and data control", zh: "安全与数据控制" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Storage involves data responsibility. Users and applications should understand what is stored, who can access it, and which permissions have been granted.",
                      zh: "存储意味着对数据承担责任。用户和应用应当清楚知道存了什么、谁可以访问，以及已经授予了哪些权限。",
                    },
                    language,
                  )}
                </p>
                <div className="mt-8 space-y-3 text-base leading-7 text-[rgba(245,242,232,0.78)]">
                  <p>{copy({ en: "Verify applications before granting storage access.", zh: "授予存储访问前先核验应用来源。" }, language)}</p>
                  <p>{copy({ en: "Review permissions before connecting services.", zh: "连接服务前先审查权限。" }, language)}</p>
                  <p>{copy({ en: "Sensitive data should be handled carefully.", zh: "敏感数据需要被谨慎处理。" }, language)}</p>
                  <p>{copy({ en: "Storage availability depends on supported services.", zh: "存储可用性取决于支持的服务。" }, language)}</p>
                  <p>{copy({ en: "Coming storage features may not all be available at launch.", zh: "即将开放的存储功能在初期未必会全部上线。" }, language)}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[16px] border border-[rgba(90,181,70,0.18)] bg-[linear-gradient(180deg,rgba(13,18,13,0.94),rgba(8,4,4,0.96))] p-8 text-center shadow-[0_26px_60px_rgba(0,0,0,0.28)] sm:p-12">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy({ en: "Data infrastructure for Web3 applications.", zh: "面向 Web3 应用的数据基础设施。" }, language)}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
                {copy(
                  {
                    en: "Storage Services help NOVOVM applications store data, connect permissions, and support user-controlled Web3 experiences.",
                    zh: "存储服务帮助 NOVOVM 应用承载数据、连接权限，并支撑用户可控的 Web3 体验。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#coming-soon">
                  {copy({ en: "Explore Storage Services", zh: "探索存储服务" }, language)}
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
