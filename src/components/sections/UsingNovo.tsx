"use client";

import {
  ArrowRight,
  Blocks,
  Cpu,
  Landmark,
  Link2,
  UserRound,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { DownloadPanel } from "@/components/ui/DownloadPanel";
import { Reveal } from "@/components/ui/Reveal";
import { UsingCard } from "@/components/ui/UsingCard";
import { cn } from "@/lib/cn";
import { type Language } from "@/lib/site-content";

type Bilingual = {
  en: string;
  zh: string;
};

const onboardingSteps = [
  {
    title: { en: "Create a wallet", zh: "创建钱包" },
    description: {
      en: "Store assets and access applications.",
      zh: "管理资产并进入应用。",
    },
    icon: Wallet,
  },
  {
    title: { en: "Create your NOVO account", zh: "创建 NOVO 账户" },
    description: {
      en: "Set up your identity inside the ecosystem.",
      zh: "在生态中建立你的统一身份入口。",
    },
    icon: UserRound,
  },
  {
    title: { en: "Connect to the network", zh: "连接网络" },
    description: {
      en: "Access applications, assets, and services.",
      zh: "访问应用、资产和服务。",
    },
    icon: Link2,
  },
] as const;

const personalCards = [
  {
    title: { en: "Finance", zh: "Finance" },
    description: {
      en: "Manage and transfer digital assets.",
      zh: "管理与流转数字资产。",
    },
    icon: Landmark,
  },
  {
    title: { en: "Applications", zh: "Applications" },
    description: {
      en: "Access decentralized apps and services.",
      zh: "进入去中心化应用与服务。",
    },
    icon: Blocks,
  },
  {
    title: { en: "Identity", zh: "Identity" },
    description: {
      en: "Control your account and digital identity.",
      zh: "掌控账户与数字身份。",
    },
    icon: UserRound,
  },
  {
    title: { en: "Services", zh: "Services" },
    description: {
      en: "Use storage, AI, and network-based services.",
      zh: "使用存储、AI 与网络型服务。",
    },
    icon: Cpu,
  },
] as const;

const participationCards = [
  {
    title: { en: "Node operation", zh: "节点运行" },
    description: {
      en: "Help support network connectivity and infrastructure.",
      zh: "支持网络连接与基础设施运行。",
    },
  },
  {
    title: { en: "Compute contribution", zh: "计算资源贡献" },
    description: {
      en: "Contribute available compute resources to the ecosystem.",
      zh: "向生态提供可用的计算资源。",
    },
  },
  {
    title: { en: "Storage participation", zh: "存储参与" },
    description: {
      en: "Provide distributed storage capacity.",
      zh: "提供分布式存储容量。",
    },
  },
  {
    title: { en: "Network services", zh: "网络服务" },
    description: {
      en: "Support ecosystem-level services and operations.",
      zh: "支撑生态层面的服务与运行。",
    },
  },
] as const;

const downloadCards = [
  {
    title: { en: "NOVOVM Client", zh: "NOVOVM Client" },
    description: {
      en: "Access the network infrastructure.",
      zh: "进入网络基础设施。",
    },
    cta: { en: "Download NOVOVM", zh: "下载 NOVOVM" },
    href: "/network",
  },
  {
    title: { en: "NOVO Wallet", zh: "NOVO Wallet" },
    description: {
      en: "Manage assets and applications.",
      zh: "管理资产与应用。",
    },
    cta: { en: "Download Wallet", zh: "下载 Wallet" },
    href: "/wallet/create",
  },
  {
    title: { en: "NOVO Browser", zh: "NOVO Browser" },
    description: {
      en: "Explore Web3 services and decentralized applications.",
      zh: "探索 Web3 服务和去中心化应用。",
    },
    cta: { en: "Download Browser", zh: "下载 Browser" },
    href: "/ecosystem",
  },
] as const;

function copy(text: Bilingual, language: Language) {
  return language === "zh" ? text.zh : text.en;
}

export function UsingNovo({ language }: { language: Language }) {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [activeNode, setActiveNode] = useState(0);

  return (
    <section
      className="relative overflow-hidden border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8"
      id="using-novo"
    >
      <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(90,181,70,0.08),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(241,188,26,0.04),transparent_18%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.8fr)]">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-green-bright">
              USING NOVO
            </p>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.04] text-text sm:text-5xl lg:text-[5rem]">
              {copy({ en: "Enter the NOVOVM ecosystem.", zh: "进入 NOVOVM 生态。" }, language)}
            </h2>
            <p className="mt-6 text-lg text-[rgba(90,181,70,0.9)] sm:text-xl">
              {copy(
                {
                  en: "Create your identity, access applications, participate in the network, and explore the next generation of the internet.",
                  zh: "创建身份、访问应用、参与网络，并探索下一代互联网。",
                },
                language,
              )}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-[14px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.82)] p-6 shadow-[0_24px_52px_rgba(0,0,0,0.24)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,181,70,0.08),transparent_58%)]" />
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Wallet", icon: Wallet },
                  { label: "Account", icon: UserRound },
                  { label: "Apps", icon: Blocks },
                  { label: "Services", icon: Cpu },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      className="rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(12,7,7,0.88)] p-4"
                      key={item.label}
                      transition={reduceMotion ? undefined : { duration: 0.28 }}
                      whileHover={reduceMotion ? undefined : { y: -4 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text">{item.label}</span>
                        <Icon className="h-4 w-4 text-[rgba(90,181,70,0.72)]" strokeWidth={1.8} />
                      </div>
                      <motion.div
                        className="mt-8 h-px bg-[rgba(90,181,70,0.16)]"
                        animate={reduceMotion ? undefined : { opacity: [0.2, 0.6, 0.2] }}
                        transition={reduceMotion ? undefined : { duration: 2.8 + index * 0.3, repeat: Infinity }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-24" id="first-time">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.54)]">
              {copy({ en: "First time using NOVO", zh: "第一次使用" }, language)}
            </p>
            <h3 className="mt-5 text-3xl font-semibold leading-tight text-text sm:text-4xl">
              {copy({ en: "First time using NOVO", zh: "First time using NOVO" }, language)}
            </h3>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
              {copy(
                {
                  en: "Start by creating your unified NOVO account. Your NOVO account connects your wallet, assets, applications, and network identity into one entry point.",
                  zh: "从创建统一的 NOVO 账户开始。它把钱包、资产、应用和网络身份连接成一个统一入口。",
                },
                language,
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.72fr)] lg:items-center">
            <div className="space-y-5">
              {onboardingSteps.map((step, index) => {
                const Icon = step.icon;
                const active = activeStep === index;

                return (
                  <motion.button
                    className={cn(
                      "relative w-full rounded-[10px] border p-5 text-left transition-[transform,border-color,background-color] duration-300",
                      active
                        ? "border-[rgba(90,181,70,0.48)] bg-[rgba(13,18,13,0.72)]"
                        : "border-[rgba(90,181,70,0.12)] bg-[rgba(10,6,6,0.88)]",
                    )}
                    key={step.title.en}
                    onFocus={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    type="button"
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(4,0,0,0.42)] text-[rgba(245,242,232,0.9)]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-lg text-text">{copy(step.title, language)}</p>
                        <p className="mt-3 text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
                          {copy(step.description, language)}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="rounded-[14px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.82)] p-8">
              <div className="flex min-h-[300px] flex-col items-center justify-center">
                {onboardingSteps.map((step, index) => {
                  const active = index <= activeStep;
                  return (
                    <div className="flex w-full flex-col items-center" key={step.title.en}>
                      <motion.div
                        className={cn(
                          "w-full max-w-[280px] rounded-[10px] border px-5 py-4 text-center transition-colors duration-300",
                          active
                            ? "border-[rgba(90,181,70,0.46)] bg-[rgba(13,18,13,0.72)] text-text"
                            : "border-[rgba(90,181,70,0.12)] bg-[rgba(10,6,6,0.88)] text-muted",
                        )}
                        animate={reduceMotion ? undefined : { opacity: active ? 1 : 0.55 }}
                      >
                        {copy(step.title, language)}
                      </motion.div>
                      {index < onboardingSteps.length - 1 ? (
                        <motion.div
                          className={cn(
                            "my-3 h-10 w-px bg-[rgba(90,181,70,0.18)]",
                            activeStep > index && "bg-[rgba(90,181,70,0.72)]",
                          )}
                          animate={reduceMotion ? undefined : { opacity: [0.3, 0.7, 0.3] }}
                          transition={reduceMotion ? undefined : { duration: 2.6, repeat: Infinity }}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row" delay={0.08}>
            <Button href="/wallet/create">
              {copy({ en: "Create Wallet", zh: "创建钱包" }, language)}
            </Button>
            <Button href="/learn-web3" variant="secondary">
              {copy({ en: "Learn More", zh: "了解更多" }, language)}
            </Button>
          </Reveal>
        </div>

        <div className="mt-24" id="personal-users">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.54)]">
              {copy({ en: "For personal users", zh: "个人用户" }, language)}
            </p>
            <h3 className="mt-5 text-3xl font-semibold leading-tight text-text sm:text-4xl">
              {copy({ en: "For personal users", zh: "For personal users" }, language)}
            </h3>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
              {copy(
                {
                  en: "NOVOVM gives users access to decentralized applications, digital assets, identity systems, and network services through one ecosystem experience.",
                  zh: "NOVOVM 通过统一生态体验，为用户提供去中心化应用、数字资产、身份系统和网络服务入口。",
                },
                language,
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {personalCards.map((card, index) => (
              <Reveal delay={index * 0.06} key={card.title.en}>
                <UsingCard
                  description={copy(card.description, language)}
                  icon={card.icon}
                  title={copy(card.title, language)}
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10" delay={0.08}>
            <Button href="/ecosystem">
              {copy({ en: "Explore Ecosystem", zh: "探索生态" }, language)}
            </Button>
          </Reveal>
        </div>

        <div className="mt-24" id="participate-network">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.54)]">
              {copy({ en: "Participate in the network", zh: "参与节点建设" }, language)}
            </p>
            <h3 className="mt-5 text-3xl font-semibold leading-tight text-text sm:text-4xl">
              {copy({ en: "Participate in the network", zh: "参与网络" }, language)}
            </h3>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
              {copy(
                {
                  en: "NOVOVM allows participants to contribute compute power, storage, and network services to help support the ecosystem.",
                  zh: "NOVOVM 允许参与者贡献计算资源、存储能力和网络服务，以支持整个生态。",
                },
                language,
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.74fr)] lg:items-center">
            <div className="grid gap-4 md:grid-cols-2">
              {participationCards.map((card, index) => (
                <motion.button
                  className={cn(
                    "rounded-[10px] border p-5 text-left transition-[transform,border-color,background-color] duration-300",
                    activeNode === index
                      ? "border-[rgba(90,181,70,0.48)] bg-[rgba(13,18,13,0.72)]"
                      : "border-[rgba(90,181,70,0.12)] bg-[rgba(10,6,6,0.88)]",
                  )}
                  key={card.title.en}
                  onFocus={() => setActiveNode(index)}
                  onMouseEnter={() => setActiveNode(index)}
                  type="button"
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                >
                  <p className="text-xl text-text">{copy(card.title, language)}</p>
                  <p className="mt-4 text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
                    {copy(card.description, language)}
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-[14px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.82)] p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(90,181,70,0.08),transparent_24%),radial-gradient(circle_at_80%_74%,rgba(90,181,70,0.08),transparent_18%)]" />
              {[
                { left: "16%", top: "56%" },
                { left: "34%", top: "28%" },
                { left: "50%", top: "72%" },
                { left: "68%", top: "38%" },
                { left: "84%", top: "60%" },
              ].map((node, index) => (
                <motion.span
                  key={`${node.left}-${node.top}`}
                  className={cn(
                    "absolute h-3 w-3 rounded-full shadow-[0_0_12px_rgba(90,181,70,0.52)]",
                    activeNode === index % 4
                      ? "bg-[rgba(90,181,70,0.88)]"
                      : "bg-[rgba(90,181,70,0.56)]",
                  )}
                  style={{ left: node.left, top: node.top }}
                  animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
                  transition={reduceMotion ? undefined : { duration: 3 + index * 0.4, repeat: Infinity }}
                />
              ))}
              {[
                { className: "left-[18%] top-[56%] w-[18%] rotate-[-36deg]" },
                { className: "left-[36%] top-[34%] w-[16%] rotate-[40deg]" },
                { className: "left-[52%] top-[68%] w-[14%] rotate-[-48deg]" },
                { className: "left-[70%] top-[42%] w-[14%] rotate-[28deg]" },
              ].map((line, index) => (
                <motion.span
                  key={line.className}
                  className={cn(
                    "absolute h-px bg-[rgba(90,181,70,0.16)]",
                    line.className,
                    activeNode === index && "bg-[rgba(90,181,70,0.78)]",
                  )}
                  animate={reduceMotion ? undefined : { opacity: [0.2, 0.6, 0.2] }}
                  transition={reduceMotion ? undefined : { duration: 2.8 + index * 0.4, repeat: Infinity }}
                />
              ))}
              <div className="absolute bottom-8 left-8 max-w-[180px] text-sm text-muted">
                {copy(
                  {
                    en: "Connected infrastructure for participation, support, and resource contribution.",
                    zh: "用于参与、支撑和资源贡献的连接型基础设施。",
                  },
                  language,
                )}
              </div>
            </div>
          </div>

          <Reveal className="mt-10" delay={0.08}>
            <Button href="/network">
              {copy({ en: "Learn about nodes", zh: "了解节点" }, language)}
            </Button>
          </Reveal>
        </div>

        <div className="mt-24" id="downloads">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.54)]">
              {copy({ en: "Downloads", zh: "下载" }, language)}
            </p>
            <h3 className="mt-5 text-3xl font-semibold leading-tight text-text sm:text-4xl">
              {copy({ en: "Downloads", zh: "下载" }, language)}
            </h3>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
              {copy(
                {
                  en: "Access the core NOVOVM tools.",
                  zh: "访问 NOVOVM 的核心工具。",
                },
                language,
              )}
            </p>
          </Reveal>

          <div className="mt-12 space-y-4">
            {downloadCards.map((card, index) => (
              <Reveal delay={index * 0.06} key={card.title.en}>
                <DownloadPanel
                  cta={copy(card.cta, language)}
                  description={copy(card.description, language)}
                  href={card.href}
                  platforms="Windows · macOS · Linux"
                  title={copy(card.title, language)}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 rounded-[14px] border border-[rgba(90,181,70,0.18)] bg-[linear-gradient(180deg,rgba(13,18,13,0.94),rgba(8,4,4,0.96))] p-8 text-center shadow-[0_26px_60px_rgba(0,0,0,0.28)] sm:p-12">
          <Reveal>
            <h3 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
              {copy({ en: "Start exploring NOVOVM.", zh: "开始探索 NOVOVM。" }, language)}
            </h3>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
              {copy(
                {
                  en: "Create your account, access applications, and participate in the next generation of internet infrastructure.",
                  zh: "创建账户、访问应用，并参与下一代互联网基础设施。",
                },
                language,
              )}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/wallet/create">
                {copy({ en: "Create Wallet", zh: "创建钱包" }, language)}
              </Button>
              <Button href="/learn-web3" variant="secondary">
                {copy({ en: "Learn Web3", zh: "了解 Web3" }, language)}
              </Button>
              <Link
                className="group inline-flex items-center gap-2 px-0 py-3 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                href="/ecosystem"
              >
                <span>{copy({ en: "Explore Ecosystem", zh: "探索生态" }, language)}</span>
                <ArrowRight className="h-4 w-4 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-1 group-hover:opacity-100" strokeWidth={1.8} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
