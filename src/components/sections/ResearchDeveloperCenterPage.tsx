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

type NavItem = {
  href: string;
  label: Bilingual;
};

type ResourceCard = {
  description: Bilingual;
  href: string;
  title: Bilingual;
};

type ResearchTopic = {
  description: Bilingual;
  title: Bilingual;
};

type SupportItem = {
  description: Bilingual;
  status?: Bilingual;
  title: Bilingual;
};

const sectionNav: NavItem[] = [
  { href: "#developer-center", label: { en: "Developer Center", zh: "开发者中心" } },
  { href: "#documentation", label: { en: "Documentation", zh: "文档" } },
  { href: "#apis-and-sdks", label: { en: "APIs & SDKs", zh: "APIs 与 SDKs" } },
  { href: "#research", label: { en: "Research", zh: "研究" } },
  { href: "#solutions", label: { en: "Solutions", zh: "解决方案" } },
  { href: "#support", label: { en: "Support", zh: "支持" } },
];

const developerCenterCards: ResourceCard[] = [
  {
    title: { en: "Build applications", zh: "构建应用" },
    description: {
      en: "Create Web3 applications connected to NOVOVM execution, wallet, and network services.",
      zh: "构建连接 NOVOVM 执行层、钱包和网络服务的 Web3 应用。",
    },
    href: "/developers",
  },
  {
    title: { en: "Integrate wallets", zh: "集成钱包" },
    description: {
      en: "Connect user accounts, assets, permissions, and application access.",
      zh: "连接用户账户、资产、权限和应用访问能力。",
    },
    href: "/ecosystem/wallet-services",
  },
  {
    title: { en: "Use network services", zh: "使用网络服务" },
    description: {
      en: "Access infrastructure services for execution, privacy, verification, and data.",
      zh: "访问执行、隐私、验证和数据相关的基础设施服务。",
    },
    href: "/network",
  },
  {
    title: { en: "Launch ecosystem tools", zh: "发布生态工具" },
    description: {
      en: "Build dashboards, explorers, developer tools, and service integrations.",
      zh: "构建仪表盘、浏览器、开发工具和服务集成能力。",
    },
    href: "/ecosystem",
  },
];

const documentationCards: ResourceCard[] = [
  {
    title: { en: "Getting started", zh: "入门指南" },
    description: {
      en: "Basic concepts, wallet setup, account flow, and ecosystem overview.",
      zh: "基础概念、钱包设置、账户流程和生态概览。",
    },
    href: "/learn-web3",
  },
  {
    title: { en: "Architecture", zh: "架构说明" },
    description: {
      en: "Mainnet, execution layer, network structure, wallet model, and service layers.",
      zh: "主网、执行层、网络结构、钱包模型和服务层结构。",
    },
    href: "/technology/developer-apis",
  },
  {
    title: { en: "Integration guides", zh: "集成指南" },
    description: {
      en: "How to connect applications, wallets, services, and APIs.",
      zh: "如何连接应用、钱包、服务和接口能力。",
    },
    href: "/docs",
  },
  {
    title: { en: "Security guides", zh: "安全指南" },
    description: {
      en: "Best practices for wallet access, permissions, privacy, and verification.",
      zh: "钱包访问、权限、隐私和验证相关的最佳实践。",
    },
    href: "/docs",
  },
];

const apiCards: ResourceCard[] = [
  {
    title: { en: "Wallet APIs", zh: "Wallet APIs" },
    description: {
      en: "Connect accounts, permissions, signatures, and user access.",
      zh: "连接账户、权限、签名和用户访问能力。",
    },
    href: "/ecosystem/wallet-services",
  },
  {
    title: { en: "Application APIs", zh: "Application APIs" },
    description: {
      en: "Send requests, read results, and interact with NOVOVM services.",
      zh: "发起请求、读取结果，并与 NOVOVM 服务交互。",
    },
    href: "/developers",
  },
  {
    title: { en: "Network APIs", zh: "Network APIs" },
    description: {
      en: "Access mainnet data, transactions, service status, and infrastructure endpoints.",
      zh: "访问主网数据、交易、服务状态和基础设施端点。",
    },
    href: "/network",
  },
  {
    title: { en: "Developer SDKs", zh: "Developer SDKs" },
    description: {
      en: "Use SDKs to integrate NOVOVM into applications faster.",
      zh: "使用 SDK 更快地把 NOVOVM 集成进应用。",
    },
    href: "/developers",
  },
];

const researchTopics: ResearchTopic[] = [
  {
    title: { en: "Quantum-resistant networks", zh: "抗量子网络" },
    description: {
      en: "Long-term security direction for future cryptographic risk.",
      zh: "面向未来密码学风险的长期网络安全方向。",
    },
  },
  {
    title: { en: "Parallel execution", zh: "并行执行" },
    description: {
      en: "Scalable runtime design for high-volume workloads.",
      zh: "面向高负载场景的可扩展运行时设计。",
    },
  },
  {
    title: { en: "Confidential compute", zh: "保密计算" },
    description: {
      en: "Execution-layer privacy for sensitive workloads.",
      zh: "为敏感工作负载提供执行层隐私能力。",
    },
  },
  {
    title: { en: "Verifiable results", zh: "可验证结果" },
    description: {
      en: "Infrastructure for checking execution outputs.",
      zh: "用于检查执行结果的基础设施方向。",
    },
  },
  {
    title: { en: "Decentralized storage and services", zh: "去中心化存储与服务" },
    description: {
      en: "Data and service infrastructure for Web3 ecosystems.",
      zh: "为 Web3 生态提供数据和服务基础设施。",
    },
  },
  {
    title: { en: "AI and Web3 infrastructure", zh: "AI 与 Web3 基础设施" },
    description: {
      en: "Future interaction between AI systems and decentralized networks.",
      zh: "AI 系统与去中心化网络的未来协同方向。",
    },
  },
];

const solutionCards: ResourceCard[] = [
  {
    title: { en: "Application teams", zh: "应用团队" },
    description: {
      en: "Build user-facing products on NOVOVM.",
      zh: "在 NOVOVM 上构建面向用户的产品。",
    },
    href: "/contact",
  },
  {
    title: { en: "Infrastructure providers", zh: "基础设施提供方" },
    description: {
      en: "Provide compute, storage, network, or service capacity.",
      zh: "提供算力、存储、网络或服务能力。",
    },
    href: "/contact",
  },
  {
    title: { en: "Enterprise integrators", zh: "企业集成方" },
    description: {
      en: "Connect business systems with Web3 infrastructure.",
      zh: "把业务系统与 Web3 基础设施连接起来。",
    },
    href: "/contact",
  },
  {
    title: { en: "Wallet and tool builders", zh: "钱包与工具开发者" },
    description: {
      en: "Create user-facing access tools and developer tooling.",
      zh: "构建面向用户的访问工具和开发者工具链。",
    },
    href: "/contact",
  },
  {
    title: { en: "AI and data companies", zh: "AI 与数据公司" },
    description: {
      en: "Explore privacy-aware and verifiable computation workflows.",
      zh: "探索隐私感知与可验证的计算工作流。",
    },
    href: "/contact",
  },
];

const supportItems: SupportItem[] = [
  {
    title: { en: "Developer forum", zh: "开发者论坛" },
    description: {
      en: "Discuss technical questions, proposals, and integration topics.",
      zh: "讨论技术问题、提案和集成方向。",
    },
    status: { en: "Coming Soon", zh: "Coming Soon" },
  },
  {
    title: { en: "GitHub", zh: "GitHub" },
    description: {
      en: "Access code, examples, and technical resources.",
      zh: "查看代码、示例和技术资源。",
    },
    status: { en: "Coming Soon", zh: "Coming Soon" },
  },
  {
    title: { en: "Issue tracking", zh: "问题追踪" },
    description: {
      en: "Report bugs, request features, and follow development progress.",
      zh: "提交问题、请求功能并跟进开发进展。",
    },
    status: { en: "Coming Soon", zh: "Coming Soon" },
  },
  {
    title: { en: "Community", zh: "社区" },
    description: {
      en: "Join ecosystem conversations and developer events.",
      zh: "加入生态交流和开发者活动。",
    },
  },
];

function copy(text: Bilingual, language: Language) {
  return language === "zh" ? text.zh : text.en;
}

function SectionNav({ language }: { language: Language }) {
  return (
    <Reveal>
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full items-center gap-6 border-b border-[rgba(90,181,70,0.12)] pb-4 sm:min-w-0 sm:gap-10">
          {sectionNav.map((item, index) => (
            <a
              className="relative shrink-0 pb-2 text-lg font-medium text-[rgba(245,242,232,0.68)] transition-colors duration-300 hover:text-text"
              href={item.href}
              key={item.href}
            >
              {copy(item.label, language)}
              {index === 0 ? (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-green-bright shadow-[0_0_8px_rgba(90,181,70,0.6)]" />
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function GridCard({
  description,
  href,
  title,
}: {
  description: string;
  href: string;
  title: string;
}) {
  return (
    <motion.div
      className="group rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-6 transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.4)] hover:bg-[rgba(13,18,13,0.42)]"
      transition={{ duration: 0.24 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold leading-tight text-text transition-colors duration-300 group-hover:text-green-bright">
          {title}
        </h3>
        <ArrowRight className="h-4 w-4 shrink-0 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-1 group-hover:opacity-100" strokeWidth={1.8} />
      </div>
      <p className="mt-4 text-base leading-7 text-[rgba(245,242,232,0.76)]">
        {description}
      </p>
      <Link
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
        href={href}
      >
        <span>{title}</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
      </Link>
    </motion.div>
  );
}

function EditorialTopic({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <motion.div
      className="group grid gap-5 border-b border-[rgba(90,181,70,0.12)] py-8 transition-colors duration-300 hover:border-[rgba(90,181,70,0.26)] lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)]"
      transition={{ duration: 0.24 }}
      whileHover={{ y: -2 }}
    >
      <h3 className="text-2xl font-semibold leading-tight text-text transition-colors duration-300 group-hover:text-green-bright sm:text-[2rem]">
        {title}
      </h3>
      <p className="max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.76)]">
        {description}
      </p>
    </motion.div>
  );
}

export function ResearchDeveloperCenterPage({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <DetailPageHeader language={language} onLanguageChange={handleLanguageChange} />
      <main className="bg-background pt-[72px]">
        <section className="relative overflow-hidden px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.1]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(90,181,70,0.05),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(241,188,26,0.03),transparent_18%)]" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.94fr)_minmax(360px,0.82fr)]">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-green-bright">
                  RESEARCH &amp; DEVELOPER CENTER
                </p>
                <h1 className="mt-6 text-4xl font-semibold leading-[1.04] text-text sm:text-5xl lg:text-[5rem]">
                  {copy({ en: "Build on NOVOVM.", zh: "构建于 NOVOVM 之上。" }, language)}
                </h1>
                <p className="mt-6 text-lg text-[rgba(90,181,70,0.9)] sm:text-xl">
                  {copy(
                    { en: "NOVOVM Developer Center.", zh: "NOVOVM 开发者中心。" },
                    language,
                  )}
                </p>
                <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "A technical center for developers, companies, researchers, and ecosystem builders.",
                      zh: "面向开发者、企业、研究者和生态建设者的技术中心。",
                    },
                    language,
                  )}
                </p>
                <p className="mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.76)] sm:text-lg">
                  {copy(
                    {
                      en: "Access documentation, APIs, SDKs, research directions, integration guides, and infrastructure resources for building on NOVOVM.",
                      zh: "获取文档、APIs、SDKs、研究方向、集成指南和面向 NOVOVM 构建所需的基础设施资源。",
                    },
                    language,
                  )}
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href="/developers">
                    {copy({ en: "Start Building", zh: "开始构建" }, language)}
                  </Button>
                  <Button href="/docs" variant="secondary">
                    {copy({ en: "Read Documentation", zh: "阅读文档" }, language)}
                  </Button>
                  <Button href="/research/topics" variant="secondary">
                    {copy({ en: "Explore Research", zh: "探索研究" }, language)}
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="rounded-[18px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-8 shadow-[0_24px_52px_rgba(0,0,0,0.24)]">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      copy({ en: "Developer Center", zh: "开发者中心" }, language),
                      copy({ en: "Documentation", zh: "文档" }, language),
                      copy({ en: "APIs & SDKs", zh: "APIs 与 SDKs" }, language),
                      copy({ en: "Research", zh: "研究" }, language),
                      copy({ en: "Solutions", zh: "解决方案" }, language),
                      copy({ en: "Support", zh: "支持" }, language),
                    ].map((label, index) => (
                      <motion.div
                        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                        className="rounded-[12px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-5 text-base text-text"
                        key={label}
                        transition={
                          reduceMotion
                            ? undefined
                            : {
                                duration: 5.4,
                                delay: index * 0.1,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }
                        }
                      >
                        {label}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="mt-16">
              <SectionNav language={language} />
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="developer-center">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "Developer Center", zh: "开发者中心" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Everything developers need to start building applications, tools, wallets, and services on NOVOVM.",
                      zh: "为开发者提供在 NOVOVM 上构建应用、工具、钱包和服务所需的核心入口。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {developerCenterCards.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title.en}>
                  <GridCard
                    description={copy(item.description, language)}
                    href={item.href}
                    title={copy(item.title, language)}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-10">
                <Link
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                  href="/developers"
                >
                  <span>{copy({ en: "Enter Developer Center", zh: "进入开发者中心" }, language)}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="documentation">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                    {copy({ en: "Documentation", zh: "文档" }, language)}
                  </h2>
                  <span className="rounded-[999px] border border-[rgba(90,181,70,0.16)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[rgba(90,181,70,0.58)]">
                    {copy(
                      { en: "Documentation is being updated.", zh: "文档正在持续更新。" },
                      language,
                    )}
                  </span>
                </div>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Find guides, references, and technical explanations for using NOVOVM.",
                      zh: "查找使用 NOVOVM 所需的指南、参考资料和技术说明。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {documentationCards.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title.en}>
                  <GridCard
                    description={copy(item.description, language)}
                    href={item.href}
                    title={copy(item.title, language)}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-10">
                <Link
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                  href="/docs"
                >
                  <span>{copy({ en: "Read Docs", zh: "阅读文档" }, language)}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="apis-and-sdks">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                    {copy({ en: "APIs & SDKs", zh: "APIs 与 SDKs" }, language)}
                  </h2>
                  <span className="rounded-[999px] border border-[rgba(90,181,70,0.16)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[rgba(90,181,70,0.58)]">
                    {copy({ en: "Coming Soon", zh: "Coming Soon" }, language)}
                  </span>
                </div>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "NOVOVM provides clear interfaces for applications, wallets, tools, and ecosystem services.",
                      zh: "NOVOVM 为应用、钱包、工具和生态服务提供清晰的接口表面。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {apiCards.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title.en}>
                  <GridCard
                    description={copy(item.description, language)}
                    href={item.href}
                    title={copy(item.title, language)}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-10">
                <Link
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                  href="/developers"
                >
                  <span>{copy({ en: "View API Reference", zh: "查看 API Reference" }, language)}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="research">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "Research directions", zh: "研究方向" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "NOVOVM research focuses on scalable execution, privacy-aware computation, verifiable systems, post-quantum infrastructure, and real-world Web3 deployment.",
                      zh: "NOVOVM 的研究聚焦于可扩展执行、隐私感知计算、可验证系统、后量子基础设施和真实世界 Web3 部署。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-16">
              {researchTopics.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title.en}>
                  <EditorialTopic
                    description={copy(item.description, language)}
                    title={copy(item.title, language)}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-10">
                <Link
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                  href="/research/topics"
                >
                  <span>{copy({ en: "Explore Research Topics", zh: "探索研究主题" }, language)}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="solutions">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "Solutions for technology companies", zh: "面向科技公司的解决方案" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "NOVOVM supports companies that want to build, integrate, or provide services in the Web3 infrastructure ecosystem.",
                      zh: "NOVOVM 支持希望在 Web3 基础设施生态中构建、集成或提供服务的公司。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {solutionCards.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title.en}>
                  <GridCard
                    description={copy(item.description, language)}
                    href={item.href}
                    title={copy(item.title, language)}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-10">
                <Link
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                  href="/contact"
                >
                  <span>{copy({ en: "Contact Ecosystem Team", zh: "联系生态团队" }, language)}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="support">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "Developer support", zh: "开发者支持" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Get support, follow updates, and participate in technical discussions.",
                      zh: "获取支持、跟进更新，并参与技术讨论。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {supportItems.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title.en}>
                  <motion.div
                    className="group rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-6 transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.4)] hover:bg-[rgba(13,18,13,0.42)]"
                    transition={{ duration: 0.24 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-semibold leading-tight text-text transition-colors duration-300 group-hover:text-green-bright">
                        {copy(item.title, language)}
                      </h3>
                      <ArrowRight className="h-4 w-4 shrink-0 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-1 group-hover:opacity-100" strokeWidth={1.8} />
                    </div>
                    <p className="mt-4 text-base leading-7 text-[rgba(245,242,232,0.76)]">
                      {copy(item.description, language)}
                    </p>
                    {item.status ? (
                      <div className="mt-6 inline-flex rounded-[999px] border border-[rgba(90,181,70,0.16)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[rgba(90,181,70,0.58)]">
                        {copy(item.status, language)}
                      </div>
                    ) : null}
                  </motion.div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-10">
                <Link
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                  href="/participate#community"
                >
                  <span>{copy({ en: "Join Developer Community", zh: "加入开发者社区" }, language)}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[16px] border border-[rgba(90,181,70,0.18)] bg-[linear-gradient(180deg,rgba(13,18,13,0.94),rgba(8,4,4,0.96))] p-8 text-center shadow-[0_26px_60px_rgba(0,0,0,0.28)] sm:p-12">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy(
                  { en: "Start building the next Web3 infrastructure.", zh: "开始构建下一代 Web3 基础设施。" },
                  language,
                )}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
                {copy(
                  {
                    en: "NOVOVM gives developers and companies a foundation for scalable, privacy-aware, verifiable, and quantum-resistant applications.",
                    zh: "NOVOVM 为开发者和企业提供可扩展、隐私感知、可验证且面向抗量子方向的应用基础。",
                  },
                  language,
                )}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/developers">
                  {copy({ en: "Start Building", zh: "开始构建" }, language)}
                </Button>
                <Button href="/docs" variant="secondary">
                  {copy({ en: "Read Documentation", zh: "阅读文档" }, language)}
                </Button>
                <Button href="/contact" variant="secondary">
                  {copy({ en: "Contact Us", zh: "联系我们" }, language)}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer language={language} />
    </>
  );
}
