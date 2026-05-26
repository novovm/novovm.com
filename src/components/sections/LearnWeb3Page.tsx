"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Footer } from "@/components/site/Footer";
import { cn } from "@/lib/cn";
import { resolveCopy } from "@/lib/language";
import { type BilingualCopy, type Language } from "@/lib/site-content";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";

type AppTile = {
  description: BilingualCopy;
  title: BilingualCopy;
};

type CompareItem = {
  example: BilingualCopy;
  mode: BilingualCopy;
  title: string;
};

type EcosystemBlock = {
  description: BilingualCopy;
  href: string;
  title: BilingualCopy;
};

type MainnetNode = {
  description: BilingualCopy;
  id: "users" | "developers" | "apps" | "services";
  title: BilingualCopy;
};

type SolutionCard = {
  description: BilingualCopy;
  href: string;
  title: BilingualCopy;
};

type RecommendedItem = {
  description: BilingualCopy;
  emphasis?: boolean;
  href: string;
  title: BilingualCopy;
};

type FaqItem = {
  answer: BilingualCopy;
  kind?: "answer" | "message";
  question: BilingualCopy;
};

const heroTiles: AppTile[] = [
  {
    title: { en: "Wallet", zh: "钱包" },
    description: { en: "Access", zh: "进入网络" },
  },
  {
    title: { en: "Apps", zh: "应用" },
    description: { en: "Use services", zh: "使用服务" },
  },
  {
    title: { en: "Assets", zh: "资产" },
    description: { en: "Move value", zh: "管理与流转" },
  },
  {
    title: { en: "Identity", zh: "身份" },
    description: { en: "User control", zh: "用户掌控" },
  },
  {
    title: { en: "Payments", zh: "支付" },
    description: { en: "Network actions", zh: "网络操作" },
  },
  {
    title: { en: "Services", zh: "服务" },
    description: { en: "Open access", zh: "开放接入" },
  },
];

const compareItems: CompareItem[] = [
  {
    title: "Web1",
    mode: { en: "Read", zh: "读取" },
    example: {
      en: "Mostly static pages and basic information sites.",
      zh: "以静态网页和信息浏览为主。",
    },
  },
  {
    title: "Web2",
    mode: { en: "Read + Write", zh: "读取 + 互动" },
    example: {
      en: "Platforms, social apps, and user-generated content.",
      zh: "平台化应用、社交网络和用户生成内容。",
    },
  },
  {
    title: "Web3",
    mode: { en: "Read + Write + Own", zh: "读取 + 互动 + 拥有" },
    example: {
      en: "Users can access apps, hold assets, and use open network services.",
      zh: "用户可以访问应用、持有资产，并使用开放网络服务。",
    },
  },
];

const ecosystemBlocks: EcosystemBlock[] = [
  {
    title: { en: "Wallet", zh: "钱包" },
    description: {
      en: "The first entry point for access, assets, and identity.",
      zh: "进入网络、管理资产和身份的第一入口。",
    },
    href: "/wallet/create",
  },
  {
    title: { en: "Applications", zh: "应用" },
    description: {
      en: "A growing set of user-facing products and network experiences.",
      zh: "面向用户的产品集合与网络体验入口。",
    },
    href: "/ecosystem",
  },
  {
    title: { en: "Assets", zh: "资产" },
    description: {
      en: "Digital assets used for access, transfer, and ecosystem activity.",
      zh: "用于访问、流转和生态活动的数字资产。",
    },
    href: "/what-is-nov",
  },
  {
    title: { en: "Mainnet", zh: "主网" },
    description: {
      en: "The base network where users, apps, and services connect.",
      zh: "连接用户、应用和服务的基础网络。",
    },
    href: "/learn-web3#novo-mainnet",
  },
  {
    title: { en: "Identity", zh: "身份" },
    description: {
      en: "User-controlled access across services and applications.",
      zh: "在不同服务与应用间由用户掌控的访问方式。",
    },
    href: "/learn-web3#qa",
  },
  {
    title: { en: "Developer tools", zh: "开发者工具" },
    description: {
      en: "Clear interfaces for building and connecting applications.",
      zh: "用于构建和接入应用的清晰接口层。",
    },
    href: "/developers",
  },
  {
    title: { en: "Services", zh: "服务" },
    description: {
      en: "Practical network services built around real user needs.",
      zh: "围绕真实用户需求组织的网络服务能力。",
    },
    href: "/ecosystem",
  },
  {
    title: { en: "Governance", zh: "治理" },
    description: {
      en: "Long-term coordination for ecosystem participants and partners.",
      zh: "用于生态参与者和合作方长期协作的治理层。",
    },
    href: "/learn-web3#final-cta",
  },
];

const mainnetNodes: MainnetNode[] = [
  {
    id: "users",
    title: { en: "Users", zh: "用户" },
    description: {
      en: "Use apps, move assets, and access services.",
      zh: "访问应用、流转资产并使用服务。",
    },
  },
  {
    id: "developers",
    title: { en: "Developers", zh: "开发者" },
    description: {
      en: "Deploy and connect applications to the network.",
      zh: "将应用部署并接入到网络中。",
    },
  },
  {
    id: "apps",
    title: { en: "Apps", zh: "应用" },
    description: {
      en: "Run on the network as part of the ecosystem.",
      zh: "作为生态的一部分在网络上运行。",
    },
  },
  {
    id: "services",
    title: { en: "Services", zh: "服务" },
    description: {
      en: "Support access, execution, and broader infrastructure use.",
      zh: "支撑访问、执行和更广义的基础设施调用。",
    },
  },
];

const solutionCards: SolutionCard[] = [
  {
    title: { en: "Wallet and identity", zh: "钱包与身份" },
    description: {
      en: "Access the network, manage assets, and control your account.",
      zh: "进入网络、管理资产，并控制你的账户。",
    },
    href: "/wallet/create",
  },
  {
    title: { en: "Payments and assets", zh: "支付与资产" },
    description: {
      en: "Send, receive, and use digital assets across applications.",
      zh: "在应用之间发送、接收并使用数字资产。",
    },
    href: "/what-is-nov",
  },
  {
    title: { en: "Applications", zh: "应用" },
    description: {
      en: "Use decentralized apps for finance, games, storage, AI, and more.",
      zh: "使用面向金融、游戏、存储、AI 等场景的去中心化应用。",
    },
    href: "/ecosystem",
  },
  {
    title: { en: "Developer tools", zh: "开发者工具" },
    description: {
      en: "Build and connect applications through clear interfaces.",
      zh: "通过清晰接口构建并接入应用。",
    },
    href: "/developers",
  },
  {
    title: { en: "Infrastructure services", zh: "基础设施服务" },
    description: {
      en: "Support execution, verification, privacy, and network access.",
      zh: "支撑执行、验证、隐私与网络接入。",
    },
    href: "/technology/developer-apis",
  },
  {
    title: { en: "Enterprise solutions", zh: "企业解决方案" },
    description: {
      en: "Use Web3 infrastructure for scalable and privacy-aware systems.",
      zh: "将 Web3 基础设施用于可扩展且具隐私意识的系统。",
    },
    href: "/learn-web3#qa",
  },
];

const recommendedItems: RecommendedItem[] = [
  {
    title: { en: "NOVO Wallet", zh: "NOVO Wallet" },
    description: {
      en: "Your entry point to the NOVO ecosystem.",
      zh: "进入 NOVO 生态系统的第一入口。",
    },
    href: "/wallet/create",
    emphasis: true,
  },
  {
    title: { en: "NOV", zh: "NOV" },
    description: {
      en: "The native currency used across the network.",
      zh: "在整个网络中使用的原生货币。",
    },
    href: "/what-is-nov",
  },
  {
    title: { en: "NOVO Mainnet", zh: "NOVO Mainnet" },
    description: {
      en: "The base network for applications and services.",
      zh: "承载应用与服务的基础网络。",
    },
    href: "/learn-web3#novo-mainnet",
  },
  {
    title: { en: "Developer APIs", zh: "Developer APIs" },
    description: {
      en: "The access layer for teams building on NOVO.",
      zh: "面向 NOVO 构建团队的接入层。",
    },
    href: "/developers",
  },
  {
    title: { en: "Ecosystem Apps", zh: "生态应用" },
    description: {
      en: "Applications built for users, assets, and services.",
      zh: "围绕用户、资产和服务构建的应用集合。",
    },
    href: "/ecosystem",
  },
];

const faqItems: FaqItem[] = [
  {
    question: {
      en: "Is NOVO the same as Web3?",
      zh: "NOVO 和 Web3 是一回事吗？",
    },
    answer: {
      en: "NOVO is not the entire Web3. NOVO is a Web3 ecosystem that gives users, developers, and partners a practical way to access Web3 applications, assets, and services.",
      zh: "NOVO 不是整个 Web3。NOVO 是一个 Web3 生态系统，为用户、开发者和合作伙伴提供一种更实际的方式来访问 Web3 应用、资产和服务。",
    },
  },
  {
    question: {
      en: "Do I need to understand blockchain to use NOVO?",
      zh: "我需要先懂区块链才能使用 NOVO 吗？",
    },
    answer: {
      en: "No. NOVO is designed to make Web3 easier to access. Users can start with a wallet and use applications without needing to understand the underlying infrastructure.",
      zh: "不需要。NOVO 的目标是让 Web3 更容易接近。用户可以先从钱包开始使用应用，而不必先理解底层基础设施。",
    },
  },
  {
    question: {
      en: "What is the NOVO Mainnet?",
      zh: "什么是 NOVO Mainnet？",
    },
    answer: {
      en: "The NOVO Mainnet is the base network where applications, transactions, assets, and services operate.",
      zh: "NOVO Mainnet 是应用、交易、资产和服务运行的基础网络。",
    },
  },
  {
    question: {
      en: "What can I do in the NOVO ecosystem?",
      zh: "我可以在 NOVO 生态里做什么？",
    },
    answer: {
      en: "You can use applications, manage assets, access services, interact with the network, and eventually participate in the broader Web3 economy.",
      zh: "你可以使用应用、管理资产、访问服务、与网络交互，并逐步参与更广泛的 Web3 生态活动。",
    },
  },
  {
    question: {
      en: "Is NOVO only for developers?",
      zh: "NOVO 只是给开发者用的吗？",
    },
    answer: {
      en: "No. NOVO is for users, developers, ecosystem partners, and organizations.",
      zh: "不是。NOVO 面向用户、开发者、生态合作伙伴和组织。",
    },
  },
  {
    question: {
      en: "How do I start?",
      zh: "我要怎么开始？",
    },
    answer: {
      en: "Start by downloading NOVO Wallet, then explore applications and services in the NOVO ecosystem.",
      zh: "先下载 NOVO Wallet，然后继续探索 NOVO 生态中的应用与服务。",
    },
  },
  {
    kind: "message",
    question: {
      en: "Other questions",
      zh: "其他问题",
    },
    answer: {
      en: "If the questions above do not cover what you need, leave a message here and we can use it as follow-up product feedback.",
      zh: "如果上面的问答没有覆盖到你的问题，可以直接在这里留言，我们会把它作为后续产品反馈参考。",
    },
  },
];

const learnWeb3QuickLinks = [
  {
    href: "#novo-mainnet",
    label: { en: "NOVO Mainnet", zh: "NOVO 主网介绍" },
  },
  {
    href: "#ecosystem-and-solutions",
    label: { en: "Ecosystem and solutions", zh: "生态和解决方案" },
  },
  {
    href: "#recommended-ecosystem",
    label: { en: "Recommended ecosystem", zh: "推荐生态" },
  },
  {
    href: "#qa",
    label: { en: "Q&A", zh: "Q&A" },
  },
] as const;

function SectionTitle({
  description,
  title,
  language,
}: {
  description?: BilingualCopy;
  title: BilingualCopy;
  language: Language;
}) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
        {resolveCopy(title, language)}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          {resolveCopy(description, language)}
        </p>
      ) : null}
    </div>
  );
}

function PageAction({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary" | "text";
}) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 rounded-[6px] text-sm font-medium transition-[transform,border-color,background-color,color,box-shadow] duration-300",
        variant === "primary" &&
          "border border-green bg-green px-5 py-3 text-text hover:-translate-y-1 hover:border-green-bright hover:shadow-[0_0_0_1px_rgba(90,181,70,0.32),0_16px_34px_rgba(90,181,70,0.18)]",
        variant === "secondary" &&
          "border border-border bg-[rgba(4,0,0,0.32)] px-5 py-3 text-text hover:-translate-y-1 hover:border-[rgba(241,188,26,0.45)] hover:bg-[rgba(241,188,26,0.06)]",
        variant === "text" && "px-0 py-3 text-muted hover:text-text",
      )}
      href={href}
    >
      <span>{label}</span>
      <ArrowRight
        aria-hidden="true"
        className={cn(
          "h-4 w-4 transition-[transform,opacity] duration-300",
          variant === "text"
            ? "opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
            : "group-hover:translate-x-1",
        )}
        strokeWidth={1.8}
      />
    </Link>
  );
}

export function LearnWeb3Page({ initialLanguage }: { initialLanguage: Language }) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);
  const reduceMotion = useReducedMotion();
  const [activeCompare, setActiveCompare] = useState(2);
  const [activeBlock, setActiveBlock] = useState(0);
  const [activeMainnet, setActiveMainnet] = useState<MainnetNode["id"] | null>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [openDirectory, setOpenDirectory] = useState(false);
  const [faqMessage, setFaqMessage] = useState("");
  const [faqMessageSubmitted, setFaqMessageSubmitted] = useState(false);

  return (
    <>
      <DetailPageHeader language={language} onLanguageChange={handleLanguageChange} />
      <main className="bg-background pt-[72px]">
        <section className="relative overflow-hidden px-5 sm:px-6 lg:px-8" id="hero">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.14]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(90,181,70,0.06),transparent)]" />

          <div className="relative z-10 mx-auto grid min-h-[94svh] max-w-7xl items-center gap-14 py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.85fr)] lg:py-24">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              transition={reduceMotion ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[rgba(90,181,70,0.56)]">
                LEARN WEB3
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-text sm:text-6xl lg:text-[5.6rem]">
                {resolveCopy(
                  {
                    en: "NOVO is your gateway to Web3.",
                    zh: "NOVO 是你进入 Web3 的入口。",
                  },
                  language,
                )}
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-8 text-[rgba(245,242,232,0.9)] sm:text-2xl sm:leading-9">
                {resolveCopy(
                  {
                    en: "A new internet where users, applications, assets, and services connect through an open network.",
                    zh: "一个通过开放网络连接用户、应用、资产和服务的新互联网。",
                  },
                  language,
                )}
              </p>
              <p className="mt-8 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
                {resolveCopy(
                  {
                    en: "NOVO brings the Web3 experience into one ecosystem — from wallets and applications to payments, identity, infrastructure, and decentralized services.",
                    zh: "NOVO 将 Web3 体验组织进一个统一生态中，从钱包、应用，到支付、身份、基础设施和去中心化服务。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="#novo-ecosystem">
                  {resolveCopy(
                    { en: "Explore NOVO Ecosystem", zh: "探索 NOVO 生态" },
                    language,
                  )}
                </Button>
                <Button href="#what-is-web3" variant="secondary">
                  {resolveCopy(
                    { en: "What is Web3?", zh: "什么是 Web3？" },
                    language,
                  )}
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              transition={reduceMotion ? undefined : { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(90,181,70,0.14),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(241,188,26,0.06),transparent_18%)]" />
              <div className="rounded-[12px] border border-[rgba(90,181,70,0.14)] bg-[rgba(7,4,4,0.84)] p-4 shadow-[0_28px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-5">
                <div className="mb-4 flex items-center justify-between border-b border-[rgba(90,181,70,0.12)] pb-3">
                  <div>
                    <p className="text-sm font-medium text-text">
                      {resolveCopy(
                        { en: "Web3 App Ecosystem", zh: "Web3 应用生态" },
                        language,
                      )}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {resolveCopy(
                        { en: "A calmer entry point for users", zh: "更容易进入的用户入口" },
                        language,
                      )}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[rgba(90,181,70,0.58)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[rgba(241,188,26,0.28)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[rgba(245,242,232,0.24)]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {heroTiles.map((tile, index) => (
                    <motion.div
                      className="interactive-card rounded-[10px] border border-[rgba(90,181,70,0.12)] bg-[rgba(12,7,7,0.92)] p-4"
                      key={tile.title.en}
                      transition={reduceMotion ? undefined : { duration: 0.35 }}
                      whileHover={reduceMotion ? undefined : { y: -4, borderColor: "rgba(90,181,70,0.4)" }}
                      whileTap={reduceMotion ? undefined : { y: -1 }}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-medium text-text">
                          {resolveCopy(tile.title, language)}
                        </span>
                        <motion.span
                          className="h-2.5 w-2.5 rounded-full bg-[rgba(90,181,70,0.58)]"
                          animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
                          transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, delay: index * 0.18 }}
                        />
                      </div>
                      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[rgba(245,242,232,0.46)]">
                        {resolveCopy(tile.description, language)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="rounded-[10px] border border-[rgba(90,181,70,0.12)] bg-[rgba(8,4,4,0.82)] p-5 backdrop-blur-xl sm:p-6"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              transition={reduceMotion ? undefined : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <div className="flex justify-start">
                <div
                  className="group relative"
                  onMouseEnter={() => setOpenDirectory(true)}
                  onMouseLeave={() => setOpenDirectory(false)}
                >
                  <button
                    aria-expanded={openDirectory}
                    className="inline-flex items-center gap-3 rounded-[8px] px-1 py-1 text-left"
                    onClick={() => setOpenDirectory((value) => !value)}
                    type="button"
                  >
                    <span>
                      <span className="block text-[2rem] font-semibold leading-none text-text">
                        {resolveCopy({ en: "Learn Web3", zh: "了解 Web3" }, language)}
                      </span>
                      <span className="mt-3 block h-[3px] w-24 rounded-full bg-green" />
                    </span>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-5 w-5 text-[rgba(90,181,70,0.78)] transition-transform duration-300",
                        openDirectory && "translate-y-0.5 rotate-180",
                      )}
                      strokeWidth={1.8}
                    />
                  </button>

                  <AnimatePresence>
                    {openDirectory ? (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-0 top-full z-30 mt-4 w-[320px] rounded-[10px] border border-[rgba(90,181,70,0.16)] bg-[rgba(4,0,0,0.94)] p-2 shadow-[0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-xl"
                        exit={{ opacity: 0, y: -8 }}
                        initial={{ opacity: 0, y: -8 }}
                        transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {learnWeb3QuickLinks.map((item) => (
                          <Link
                            className="group flex items-center justify-between rounded-[8px] px-4 py-3 text-sm text-[rgba(245,242,232,0.78)] transition-colors duration-300 hover:bg-[rgba(13,18,13,0.72)] hover:text-text"
                            href={item.href}
                            key={item.href}
                            onClick={() => setOpenDirectory(false)}
                          >
                            <span>{resolveCopy(item.label, language)}</span>
                            <ArrowRight
                              className="h-3.5 w-3.5 translate-x-0 text-[rgba(90,181,70,0.72)] transition-transform duration-300 group-hover:translate-x-1"
                              strokeWidth={1.8}
                            />
                          </Link>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="what-is-web3">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              transition={reduceMotion ? undefined : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <SectionTitle
                description={{
                  en: "Web3 is the next generation of the internet, where users can own assets, control identity, and access applications through open networks.",
                  zh: "Web3 是下一代互联网，用户可以通过开放网络拥有资产、掌控身份，并访问应用。",
                }}
                language={language}
                title={{ en: "What is Web3?", zh: "什么是 Web3？" }}
              />
              <div className="mt-8 max-w-4xl space-y-3 text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
                <p>
                  {resolveCopy(
                    {
                      en: "Web1 was mainly about reading information. Web2 made the internet interactive through platforms and apps. Web3 adds ownership, digital assets, open networks, and user-controlled access.",
                      zh: "Web1 主要是读取信息。Web2 让互联网通过平台和应用变得可互动。Web3 则进一步加入了拥有权、数字资产、开放网络和用户可控的访问方式。",
                    },
                    language,
                  )}
                </p>
              </div>
            </motion.div>

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {compareItems.map((item, index) => {
                const active = activeCompare === index;
                const isWeb3 = item.title === "Web3";

                return (
                  <motion.button
                    className={cn(
                      "text-left rounded-[10px] border bg-[rgba(10,6,6,0.84)] p-6 transition-[transform,border-color,background-color,box-shadow] duration-300",
                      isWeb3
                        ? "border-[rgba(90,181,70,0.34)]"
                        : "border-[rgba(90,181,70,0.12)]",
                      active && "border-[rgba(90,181,70,0.56)] shadow-[0_18px_38px_rgba(0,0,0,0.24)]",
                    )}
                    key={item.title}
                    onHoverStart={() => setActiveCompare(index)}
                    onFocus={() => setActiveCompare(index)}
                    onMouseEnter={() => setActiveCompare(index)}
                    transition={reduceMotion ? undefined : { duration: 0.28 }}
                    type="button"
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.54)]">
                      {item.title}
                    </p>
                    <h3 className="mt-6 text-2xl text-text">
                      {resolveCopy(item.mode, language)}
                    </h3>
                    <AnimatePresence initial={false} mode="wait">
                      {active ? (
                        <motion.p
                          key="open"
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-6 overflow-hidden text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base"
                          exit={{ opacity: 0, height: 0 }}
                          initial={{ opacity: 0, height: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.24 }}
                        >
                          {resolveCopy(item.example, language)}
                        </motion.p>
                      ) : (
                        <motion.div
                          key="closed"
                          animate={{ opacity: 1, height: 24 }}
                          className="mt-6 overflow-hidden"
                          exit={{ opacity: 0, height: 0 }}
                          initial={{ opacity: 0, height: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.2 }}
                        >
                          <span className="text-sm text-[rgba(245,242,232,0.32)]">
                            {resolveCopy(
                              { en: "Hover to compare", zh: "悬停查看示例" },
                              language,
                            )}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="novo-ecosystem">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              transition={reduceMotion ? undefined : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <SectionTitle
                description={{
                  en: "Instead of making users jump between wallets, chains, tools, and fragmented services, NOVO organizes Web3 into a unified ecosystem experience. NOVO works like a Web3 application ecosystem — similar to how an app ecosystem gives users access to many apps, but built for decentralized applications, digital assets, and open network services.",
                  zh: "NOVO 不再让用户在钱包、链、工具和分散服务之间不断切换，而是把 Web3 组织成一个统一生态体验。NOVO 更像一个 Web3 应用生态系统，类似于人们熟悉的应用生态入口，但它服务的是去中心化应用、数字资产和开放网络服务。",
                }}
                language={language}
                title={{
                  en: "NOVO turns Web3 into an ecosystem people can use.",
                  zh: "NOVO 让 Web3 变成一个真正能使用的生态系统。",
                }}
              />
            </motion.div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {ecosystemBlocks.map((block, index) => {
                const active = activeBlock === index;

                return (
                  <motion.div
                    key={block.title.en}
                    transition={reduceMotion ? undefined : { duration: 0.28 }}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                  >
                    <Link
                      className={cn(
                        "group block min-h-[210px] rounded-[10px] border bg-[rgba(10,6,6,0.88)] p-5 transition-[border-color,background-color,box-shadow] duration-300",
                        active
                          ? "border-[rgba(90,181,70,0.5)] shadow-[0_20px_40px_rgba(0,0,0,0.22)]"
                          : "border-[rgba(90,181,70,0.12)]",
                      )}
                      href={block.href}
                      onFocus={() => setActiveBlock(index)}
                      onMouseEnter={() => setActiveBlock(index)}
                    >
                      <div className="flex h-full flex-col justify-between gap-10">
                        <div>
                          <p className="text-lg font-medium text-text">
                            {resolveCopy(block.title, language)}
                          </p>
                        </div>
                        <div>
                          <AnimatePresence mode="wait">
                            {active ? (
                              <motion.p
                                key="open"
                                animate={{ opacity: 1, height: "auto" }}
                                className="overflow-hidden text-sm leading-6 text-[rgba(245,242,232,0.8)]"
                                exit={{ opacity: 0, height: 0 }}
                                initial={{ opacity: 0, height: 0 }}
                                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                              >
                                {resolveCopy(block.description, language)}
                              </motion.p>
                            ) : (
                              <motion.div
                                key="closed"
                                animate={{ opacity: 1, height: 20 }}
                                className="overflow-hidden"
                                exit={{ opacity: 0, height: 0 }}
                                initial={{ opacity: 0, height: 0 }}
                                transition={{ duration: reduceMotion ? 0 : 0.18 }}
                              >
                                <span className="text-xs uppercase tracking-[0.18em] text-[rgba(245,242,232,0.34)]">
                                  {resolveCopy(
                                    { en: "Future route", zh: "后续入口" },
                                    language,
                                  )}
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <div className="mt-5 inline-flex items-center gap-2 text-sm text-[rgba(90,181,70,0.86)]">
                            <span>
                              {resolveCopy(
                                { en: "Open", zh: "进入" },
                                language,
                              )}
                            </span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="novo-mainnet">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              transition={reduceMotion ? undefined : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <SectionTitle
                description={{
                  en: "The NOVO Mainnet is the core network where transactions, applications, assets, and network services operate. It provides the foundation for users, developers, and ecosystem partners to build and interact with Web3 applications.",
                  zh: "NOVO Mainnet 是交易、应用、资产和网络服务运行的核心网络。它为用户、开发者和生态合作伙伴提供构建和交互 Web3 应用的基础。",
                }}
                language={language}
                title={{ en: "NOVO Mainnet", zh: "NOVO Mainnet" }}
              />
            </motion.div>

            <div className="mt-14 rounded-[14px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.8)] p-6 sm:p-8">
              <div className="relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.15fr_1fr] lg:grid-rows-[1fr_auto_1fr] lg:items-center">
                <motion.div
                  className={cn(
                    "rounded-[10px] border p-5 lg:col-start-1 lg:row-start-1",
                    activeMainnet === "developers"
                      ? "border-[rgba(90,181,70,0.52)] bg-[rgba(14,20,14,0.72)]"
                      : "border-[rgba(90,181,70,0.14)] bg-[rgba(11,7,7,0.82)]",
                  )}
                  onHoverStart={() => setActiveMainnet("developers")}
                  onHoverEnd={() => setActiveMainnet(null)}
                >
                  <p className="text-lg text-text">{resolveCopy(mainnetNodes[1].title, language)}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{resolveCopy(mainnetNodes[1].description, language)}</p>
                </motion.div>

                <motion.div
                  className={cn(
                    "rounded-[10px] border p-5 lg:col-start-3 lg:row-start-1",
                    activeMainnet === "apps"
                      ? "border-[rgba(90,181,70,0.52)] bg-[rgba(14,20,14,0.72)]"
                      : "border-[rgba(90,181,70,0.14)] bg-[rgba(11,7,7,0.82)]",
                  )}
                  onHoverStart={() => setActiveMainnet("apps")}
                  onHoverEnd={() => setActiveMainnet(null)}
                >
                  <p className="text-lg text-text">{resolveCopy(mainnetNodes[2].title, language)}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{resolveCopy(mainnetNodes[2].description, language)}</p>
                </motion.div>

                <div className="relative rounded-[14px] border border-[rgba(90,181,70,0.24)] bg-[linear-gradient(180deg,rgba(16,22,16,0.96),rgba(8,4,4,0.96))] p-8 lg:col-start-2 lg:row-start-2">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,181,70,0.14),transparent_62%)]" />
                  <p className="relative text-center text-xs font-medium uppercase tracking-[0.28em] text-[rgba(90,181,70,0.58)]">
                    {resolveCopy(
                      { en: "Base Network", zh: "基础网络" },
                      language,
                    )}
                  </p>
                  <h3 className="relative mt-5 text-center text-3xl font-semibold text-text">
                    NOVO Mainnet
                  </h3>
                  <p className="relative mx-auto mt-5 max-w-sm text-center text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
                    {resolveCopy(
                      {
                        en: "The base network that powers users, developers, apps, assets, and ecosystem services.",
                        zh: "为用户、开发者、应用、资产与生态服务提供支撑的基础网络。",
                      },
                      language,
                    )}
                  </p>

                  <div className="pointer-events-none hidden lg:block">
                    <span
                      className={cn(
                        "absolute left-[-96px] top-1/2 h-px w-24 -translate-y-1/2 bg-[rgba(90,181,70,0.18)] transition-colors duration-300",
                        activeMainnet === "developers" && "bg-[rgba(90,181,70,0.82)]",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute right-[-96px] top-1/2 h-px w-24 -translate-y-1/2 bg-[rgba(90,181,70,0.18)] transition-colors duration-300",
                        activeMainnet === "apps" && "bg-[rgba(90,181,70,0.82)]",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute bottom-[-92px] left-1/2 h-24 w-px -translate-x-1/2 bg-[rgba(90,181,70,0.18)] transition-colors duration-300",
                        activeMainnet === "users" && "bg-[rgba(90,181,70,0.82)]",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute top-[-92px] left-1/2 h-24 w-px -translate-x-1/2 bg-[rgba(90,181,70,0.18)] transition-colors duration-300",
                        activeMainnet === "services" && "bg-[rgba(90,181,70,0.82)]",
                      )}
                    />
                  </div>
                </div>

                <motion.div
                  className={cn(
                    "rounded-[10px] border p-5 lg:col-start-2 lg:row-start-1",
                    activeMainnet === "services"
                      ? "border-[rgba(90,181,70,0.52)] bg-[rgba(14,20,14,0.72)]"
                      : "border-[rgba(90,181,70,0.14)] bg-[rgba(11,7,7,0.82)]",
                  )}
                  onHoverStart={() => setActiveMainnet("services")}
                  onHoverEnd={() => setActiveMainnet(null)}
                >
                  <p className="text-lg text-text">{resolveCopy(mainnetNodes[3].title, language)}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{resolveCopy(mainnetNodes[3].description, language)}</p>
                </motion.div>

                <motion.div
                  className={cn(
                    "rounded-[10px] border p-5 lg:col-start-2 lg:row-start-3",
                    activeMainnet === "users"
                      ? "border-[rgba(90,181,70,0.52)] bg-[rgba(14,20,14,0.72)]"
                      : "border-[rgba(90,181,70,0.14)] bg-[rgba(11,7,7,0.82)]",
                  )}
                  onHoverStart={() => setActiveMainnet("users")}
                  onHoverEnd={() => setActiveMainnet(null)}
                >
                  <p className="text-lg text-text">{resolveCopy(mainnetNodes[0].title, language)}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{resolveCopy(mainnetNodes[0].description, language)}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="ecosystem-and-solutions">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              transition={reduceMotion ? undefined : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <SectionTitle
                description={{
                  en: "NOVO connects different parts of Web3 into one practical ecosystem.",
                  zh: "NOVO 把 Web3 的不同部分连接成一个更实际、可使用的生态系统。",
                }}
                language={language}
                title={{ en: "Ecosystem and solutions", zh: "生态与解决方案" }}
              />
            </motion.div>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {solutionCards.map((card, index) => (
                <motion.div
                  key={card.title.en}
                  transition={reduceMotion ? undefined : { duration: 0.28 }}
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                >
                  <Link
                    className="group block h-full rounded-[10px] border border-[rgba(90,181,70,0.12)] bg-[rgba(10,6,6,0.88)] p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[rgba(90,181,70,0.52)] hover:bg-[rgba(12,8,8,0.92)] hover:shadow-[0_18px_36px_rgba(0,0,0,0.2)]"
                    href={card.href}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.48)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-5 text-2xl leading-tight text-text">
                      {resolveCopy(card.title, language)}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
                      {resolveCopy(card.description, language)}
                    </p>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 group-hover:text-[rgba(90,181,70,0.92)]">
                      <span>{resolveCopy({ en: "Learn more", zh: "了解更多" }, language)}</span>
                      <ArrowRight className="h-4 w-4 translate-x-0 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="recommended-ecosystem">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              transition={reduceMotion ? undefined : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <SectionTitle
                description={{
                  en: "Start with the essential parts of NOVO.",
                  zh: "从 NOVO 生态中最核心的部分开始。",
                }}
                language={language}
                title={{ en: "Recommended ecosystem", zh: "推荐生态" }}
              />
            </motion.div>

            <div className="mt-14 grid gap-4 lg:grid-cols-5">
              {recommendedItems.map((item) => (
                <motion.div
                  key={item.title.en}
                  transition={reduceMotion ? undefined : { duration: 0.28 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                >
                  <Link
                    className={cn(
                      "group flex h-full min-h-[210px] flex-col justify-between rounded-[10px] border p-5 transition-[border-color,background-color,box-shadow] duration-300",
                      item.emphasis
                        ? "border-[rgba(90,181,70,0.36)] bg-[linear-gradient(180deg,rgba(17,23,17,0.96),rgba(8,4,4,0.96))] shadow-[0_22px_44px_rgba(0,0,0,0.22)]"
                        : "border-[rgba(90,181,70,0.12)] bg-[rgba(10,6,6,0.88)] hover:border-[rgba(90,181,70,0.44)]",
                    )}
                    href={item.href}
                  >
                    <div>
                      {item.emphasis ? (
                        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[rgba(90,181,70,0.58)]">
                          {resolveCopy({ en: "Start here", zh: "从这里开始" }, language)}
                        </p>
                      ) : null}
                      <h3 className="mt-4 text-2xl leading-tight text-text">
                        {resolveCopy(item.title, language)}
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
                        {resolveCopy(item.description, language)}
                      </p>
                    </div>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 group-hover:text-[rgba(90,181,70,0.92)]">
                      <span>{resolveCopy({ en: "Open", zh: "进入" }, language)}</span>
                      <ArrowRight className="h-4 w-4 translate-x-0 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              transition={reduceMotion ? undefined : { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <Button href="/wallet/create">
                {resolveCopy({ en: "Download NOVO Wallet", zh: "下载 NOVO Wallet" }, language)}
              </Button>
              <Button href="/ecosystem" variant="secondary">
                {resolveCopy({ en: "Explore Apps", zh: "探索应用" }, language)}
              </Button>
              <PageAction
                href="/developers"
                label={resolveCopy({ en: "Read Docs", zh: "阅读文档" }, language)}
                variant="text"
              />
            </motion.div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="qa">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              transition={reduceMotion ? undefined : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <SectionTitle language={language} title={{ en: "Q&A", zh: "Q&A" }} />
            </motion.div>

            <div className="mt-12 divide-y divide-[rgba(90,181,70,0.12)] border-y border-[rgba(90,181,70,0.12)]">
              {faqItems.map((item, index) => {
                const open = openFaq === index;

                return (
                  <div key={item.question.en}>
                    <button
                      className="group flex w-full items-center justify-between gap-5 py-6 text-left"
                      onClick={() => setOpenFaq(open ? -1 : index)}
                      type="button"
                    >
                      <span className="text-lg text-text transition-colors duration-300 group-hover:text-[rgba(90,181,70,0.92)] sm:text-xl">
                        {resolveCopy(item.question, language)}
                      </span>
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.22 }}
                      >
                        <ChevronDown className="h-5 w-5 text-[rgba(90,181,70,0.74)]" strokeWidth={1.8} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          animate={{ opacity: 1, height: "auto" }}
                          className="overflow-hidden"
                          exit={{ opacity: 0, height: 0 }}
                          initial={{ opacity: 0, height: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="pb-6 pr-8">
                            <p className="text-sm leading-7 text-[rgba(245,242,232,0.78)] sm:text-base">
                              {resolveCopy(item.answer, language)}
                            </p>
                            {item.kind === "message" ? (
                              <div className="mt-5 max-w-3xl">
                                <textarea
                                  className="min-h-[132px] w-full rounded-[10px] border border-[rgba(90,181,70,0.16)] bg-[rgba(8,4,4,0.82)] px-4 py-3 text-sm leading-6 text-text outline-none transition-colors duration-300 placeholder:text-[rgba(245,242,232,0.28)] focus:border-[rgba(140,216,103,0.54)]"
                                  onChange={(event) => {
                                    setFaqMessage(event.target.value);
                                    if (faqMessageSubmitted) {
                                      setFaqMessageSubmitted(false);
                                    }
                                  }}
                                  placeholder={resolveCopy(
                                    {
                                      en: "Leave your question here...",
                                      zh: "在这里输入你的问题...",
                                    },
                                    language,
                                  )}
                                  value={faqMessage}
                                />
                                <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                                  <button
                                    className="inline-flex h-11 items-center justify-center rounded-[6px] border border-[rgba(90,181,70,0.22)] bg-[rgba(10,6,6,0.2)] px-5 text-sm font-medium text-text transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-[rgba(140,216,103,0.56)] hover:bg-[rgba(14,20,14,0.72)] disabled:cursor-not-allowed disabled:opacity-40"
                                    disabled={faqMessage.trim().length === 0}
                                    onClick={() => {
                                      if (faqMessage.trim().length === 0) {
                                        return;
                                      }

                                      setFaqMessageSubmitted(true);
                                      setFaqMessage("");
                                    }}
                                    type="button"
                                  >
                                    {resolveCopy(
                                      {
                                        en: "Submit message",
                                        zh: "提交留言",
                                      },
                                      language,
                                    )}
                                  </button>
                                  {faqMessageSubmitted ? (
                                    <p className="text-sm text-[rgba(90,181,70,0.86)]">
                                      {resolveCopy(
                                        {
                                          en: "Message received locally. This entry is ready for future form integration.",
                                          zh: "留言已在当前页面记录，后续可以继续接入正式提交能力。",
                                        },
                                        language,
                                      )}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8" id="final-cta">
          <div className="mx-auto max-w-5xl rounded-[14px] border border-[rgba(90,181,70,0.18)] bg-[linear-gradient(180deg,rgba(13,18,13,0.94),rgba(8,4,4,0.96))] p-8 text-center shadow-[0_26px_60px_rgba(0,0,0,0.28)] sm:p-12">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              transition={reduceMotion ? undefined : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {resolveCopy({ en: "Start with NOVO Wallet.", zh: "从 NOVO Wallet 开始。" }, language)}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
                {resolveCopy(
                  {
                    en: "Your wallet is the first step into the NOVO Web3 ecosystem.",
                    zh: "钱包是进入 NOVO Web3 生态系统的第一步。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/wallet/create">
                  {resolveCopy({ en: "Download NOVO Wallet", zh: "下载 NOVO Wallet" }, language)}
                </Button>
                <Button href="/ecosystem" variant="secondary">
                  {resolveCopy({ en: "Explore Ecosystem", zh: "探索生态" }, language)}
                </Button>
                <PageAction
                  href="/developers"
                  label={resolveCopy({ en: "Read Documentation", zh: "阅读文档" }, language)}
                  variant="text"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer language={language} />
    </>
  );
}
