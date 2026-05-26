"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { type Language } from "@/lib/site-content";

type Bilingual = {
  en: string;
  zh: string;
};

type DirectoryItem = {
  description: Bilingual;
  title: Bilingual;
};

type ActionItem = {
  href: string;
  label: Bilingual;
};

type TabId = "ecosystem" | "participate" | "research" | "developers";

type TabDefinition = {
  actions?: ActionItem[];
  ctaBlocks?: Array<{
    description: Bilingual;
    href: string;
    title: Bilingual;
  }>;
  description?: Bilingual;
  id: TabId;
  leftColumn?: DirectoryItem[];
  rightColumn?: DirectoryItem[];
  title: Bilingual;
};

const tabs: Array<{ id: TabId; label: Bilingual }> = [
  { id: "ecosystem", label: { en: "Ecosystem Services", zh: "生态功能服务" } },
  { id: "participate", label: { en: "Participate", zh: "参与" } },
  { id: "research", label: { en: "Research", zh: "研究" } },
  { id: "developers", label: { en: "Developers", zh: "开发者" } },
];

const tabContent: Record<TabId, TabDefinition> = {
  ecosystem: {
    id: "ecosystem",
    title: { en: "Ecosystem Services", zh: "生态功能服务" },
    leftColumn: [
      {
        title: { en: "Trading Services", zh: "交易服务" },
        description: {
          en: "Exchange digital assets and access market-related services.",
          zh: "交换数字资产并访问市场相关服务。",
        },
      },
      {
        title: { en: "Wallet Services", zh: "钱包服务" },
        description: {
          en: "Manage accounts, assets, permissions, and application access.",
          zh: "管理账户、资产、权限和应用访问。",
        },
      },
      {
        title: { en: "Storage Services", zh: "存储服务" },
        description: {
          en: "Access and manage data through decentralized storage.",
          zh: "通过去中心化存储访问和管理数据。",
        },
      },
      {
        title: { en: "Chain Name Services", zh: "链名服务" },
        description: {
          en: "Use readable names for accounts, services, and network identities.",
          zh: "为账户、服务和网络身份使用可读名称。",
        },
      },
    ],
    rightColumn: [
      {
        title: { en: "Finance", zh: "金融" },
        description: {
          en: "Access financial applications built on open network infrastructure.",
          zh: "访问开放网络基础设施上的金融应用。",
        },
      },
      {
        title: { en: "Games", zh: "游戏" },
        description: {
          en: "Use Web3 games connected to assets, identity, and ecosystem activity.",
          zh: "体验连接资产、身份和经济系统的 Web3 游戏。",
        },
      },
      {
        title: { en: "Social", zh: "社交" },
        description: {
          en: "Connect and build communities with user-controlled identity.",
          zh: "以用户可控身份进行聊天和社区建设。",
        },
      },
      {
        title: { en: "Commerce", zh: "电商" },
        description: {
          en: "Buy, sell, and interact with digital commerce services across the ecosystem.",
          zh: "在生态中进行买卖并使用数字商业服务。",
        },
      },
    ],
    ctaBlocks: [
      {
        title: { en: "Decentralized Services", zh: "去中心化服务" },
        description: {
          en: "Enter the Web3 ecosystem through finance, games, social, and commerce services.",
          zh: "从金融、游戏、社交和电商等服务进入 Web3 生态。",
        },
        href: "/ecosystem#services",
      },
      {
        title: { en: "Use or Download DAPP", zh: "使用或下载 DAPP" },
        description: {
          en: "Open Web3 services or download related applications.",
          zh: "打开 Web3 服务或下载相关应用。",
        },
        href: "/downloads/browser",
      },
    ],
  },
  participate: {
    id: "participate",
    title: { en: "Participate in the NOVOVM Network", zh: "参与 NOVOVM 网络" },
    leftColumn: [
      {
        title: { en: "Run Nodes", zh: "运行节点" },
        description: {
          en: "Support network connectivity, execution, and infrastructure services.",
          zh: "帮助支持网络连接、执行和基础设施服务。",
        },
      },
      {
        title: { en: "Contribute Compute Resources", zh: "贡献计算资源" },
        description: {
          en: "Connect available compute capacity to help support ecosystem services.",
          zh: "把可用计算能力接入生态，用于支持网络服务。",
        },
      },
    ],
    rightColumn: [
      {
        title: { en: "Contribute Storage Resources", zh: "贡献存储资源" },
        description: {
          en: "Provide storage capacity for distributed data services.",
          zh: "提供可用存储容量，支持分布式数据服务。",
        },
      },
      {
        title: { en: "Ecosystem Service Providers", zh: "生态服务商" },
        description: {
          en: "Provide services for wallets, browsers, applications, data, and tools.",
          zh: "为钱包、浏览器、应用、数据和工具提供服务。",
        },
      },
    ],
    actions: [
      { href: "/network", label: { en: "Join Node Network", zh: "加入节点网络" } },
      { href: "/network", label: { en: "Learn Participation", zh: "了解参与方式" } },
    ],
  },
  research: {
    id: "research",
    title: { en: "Research and Technical Directions", zh: "研究与技术方向" },
    leftColumn: [
      {
        title: { en: "Quantum-Resistant Network", zh: "抗量子网络" },
        description: {
          en: "A long-term security direction designed for future cryptographic risks.",
          zh: "面向未来密码学风险设计的长期网络安全方向。",
        },
      },
      {
        title: { en: "Verifiable Computation", zh: "可验证计算" },
        description: {
          en: "Make execution results inspectable rather than only trusted.",
          zh: "让执行结果可以被检查，而不是只能被相信。",
        },
      },
    ],
    rightColumn: [
      {
        title: { en: "Confidential Computation", zh: "保密计算" },
        description: {
          en: "Complete computation while protecting sensitive data.",
          zh: "在保护敏感数据的同时完成计算。",
        },
      },
      {
        title: { en: "Large-Scale Execution Systems", zh: "大规模执行系统" },
        description: {
          en: "Execution infrastructure for real-world high-concurrency applications.",
          zh: "面向真实世界高并发应用的执行基础设施。",
        },
      },
    ],
    actions: [
      { href: "/technology/developer-apis", label: { en: "Read Whitepaper", zh: "阅读白皮书" } },
      { href: "/technology/parallel-execution", label: { en: "View Technical Roadmap", zh: "查看技术路线" } },
    ],
  },
  developers: {
    id: "developers",
    title: { en: "Developer Entry", zh: "开发者入口" },
    leftColumn: [
      {
        title: { en: "Developer APIs", zh: "Developer APIs" },
        description: {
          en: "A clear access surface for applications, tools, wallets, and services.",
          zh: "为应用、工具、钱包和服务提供清晰接入表面。",
        },
      },
      {
        title: { en: "SDKs", zh: "SDKs" },
        description: {
          en: "Help developers connect to the NOVOVM ecosystem more quickly.",
          zh: "帮助开发者更快接入 NOVOVM 生态。",
        },
      },
    ],
    rightColumn: [
      {
        title: { en: "Documentation", zh: "Documentation" },
        description: {
          en: "Review protocol, interface, and development guides.",
          zh: "查看协议、接口和开发指南。",
        },
      },
      {
        title: { en: "GitHub", zh: "GitHub" },
        description: {
          en: "Access repositories and development resources.",
          zh: "访问代码仓库和开发资源。",
        },
      },
    ],
    actions: [
      { href: "/developers", label: { en: "Read Developer Docs", zh: "阅读开发文档" } },
      { href: "https://github.com/", label: { en: "View GitHub", zh: "查看 GitHub" } },
    ],
  },
};

function copy(text: Bilingual, language: Language) {
  return language === "zh" ? text.zh : text.en;
}

function DirectoryColumn({
  items,
  language,
}: {
  items: DirectoryItem[];
  language: Language;
}) {
  return (
    <div className="rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.72)] p-5 sm:p-7 lg:p-8">
      <div className="space-y-2">
        {items.map((item) => (
          <motion.div
            className="group rounded-[12px] border border-transparent px-4 py-4 transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.22)] hover:bg-[rgba(13,18,13,0.42)]"
            key={item.title.en}
            whileHover={{ y: 0 }}
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 h-12 w-px bg-transparent transition-colors duration-300 group-hover:bg-[rgba(90,181,70,0.88)]" />
              <div className="min-w-0">
                <h3 className="text-2xl font-semibold leading-tight text-text transition-colors duration-300 group-hover:text-green-bright">
                  {copy(item.title, language)}
                </h3>
                <p className="mt-3 max-w-[32rem] text-base leading-7 text-[rgba(245,242,232,0.76)]">
                  {copy(item.description, language)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LargeCta({
  description,
  href,
  title,
  trigger,
}: {
  description: string;
  href: string;
  title: string;
  trigger: string;
}) {
  return (
    <Link
      className="group flex min-h-[152px] items-center justify-between gap-6 rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.72)] px-6 py-6 transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.42)] hover:bg-[rgba(13,18,13,0.42)] sm:px-8"
      href={href}
    >
      <div className="max-w-[28rem]">
        <h3 className="text-2xl font-semibold leading-tight text-text">{title}</h3>
        <p className="mt-3 text-base leading-7 text-[rgba(245,242,232,0.76)]">{description}</p>
        <p className="mt-5 text-sm font-medium text-[rgba(245,242,232,0.84)]">{trigger}</p>
      </div>
      <ArrowRight className="h-6 w-6 shrink-0 text-[rgba(245,242,232,0.72)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-green-bright" strokeWidth={1.8} />
    </Link>
  );
}

function ActionBar({
  actions,
  language,
}: {
  actions: ActionItem[];
  language: Language;
}) {
  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {actions.map((action, index) => (
        <Link
          className={cn(
            "inline-flex min-h-12 items-center justify-center rounded-[8px] border px-5 py-3 text-sm font-medium transition-[border-color,background-color,color] duration-300",
            index === 0
              ? "border-[rgba(90,181,70,0.42)] bg-[rgba(13,18,13,0.64)] text-text hover:border-[rgba(90,181,70,0.6)]"
              : "border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.72)] text-muted hover:border-[rgba(90,181,70,0.32)] hover:text-text",
          )}
          href={action.href}
          key={action.label.en}
        >
          {copy(action.label, language)}
        </Link>
      ))}
    </div>
  );
}

export function EcosystemServices({ language }: { language: Language }) {
  const [activeTab, setActiveTab] = useState<TabId>("ecosystem");
  const reduceMotion = useReducedMotion();
  const current = tabContent[activeTab];

  return (
    <section className="relative overflow-hidden border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="ecosystem-services-directory">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.1]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(90,181,70,0.06),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(241,188,26,0.03),transparent_18%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="overflow-x-auto">
            <div className="inline-flex min-w-full items-center gap-6 border-b border-[rgba(90,181,70,0.12)] pb-4 sm:min-w-0 sm:gap-10">
              {tabs.map((tab) => {
                const active = tab.id === activeTab;
                return (
                  <button
                    className={cn(
                      "relative shrink-0 pb-2 text-lg font-medium transition-colors duration-300",
                      active ? "text-text" : "text-[rgba(245,242,232,0.62)] hover:text-text",
                    )}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                  >
                    {copy(tab.label, language)}
                    {active ? (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-green-bright shadow-[0_0_8px_rgba(90,181,70,0.6)]" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            className="mt-12"
            exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            key={activeTab}
            transition={reduceMotion ? undefined : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy(current.title, language)}
              </h2>
              {current.description ? (
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                  {copy(current.description, language)}
                </p>
              ) : null}
            </div>

            <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:gap-6">
              <DirectoryColumn items={current.leftColumn ?? []} language={language} />
              <DirectoryColumn items={current.rightColumn ?? []} language={language} />
            </div>

            {activeTab === "ecosystem" && current.ctaBlocks ? (
              <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-6">
                <LargeCta
                  description={copy(current.ctaBlocks[0].description, language)}
                  href={current.ctaBlocks[0].href}
                  title={copy(current.ctaBlocks[0].title, language)}
                  trigger={language === "zh" ? "Explore services" : "Explore services"}
                />
                <LargeCta
                  description={copy(current.ctaBlocks[1].description, language)}
                  href={current.ctaBlocks[1].href}
                  title={copy(current.ctaBlocks[1].title, language)}
                  trigger={language === "zh" ? "Download DAPP" : "Download DAPP"}
                />
              </div>
            ) : null}

            {activeTab !== "ecosystem" && current.actions ? (
              <ActionBar actions={current.actions} language={language} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
