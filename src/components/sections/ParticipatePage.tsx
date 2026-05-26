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

type RowItem = {
  description: Bilingual;
  title: Bilingual;
};

type EventCard = {
  description: Bilingual;
  title: Bilingual;
};

type JoinPath = {
  description: Bilingual;
  href: string;
  title: Bilingual;
};

const sectionNav: NavItem[] = [
  { href: "#community", label: { en: "Community", zh: "社区" } },
  { href: "#forum", label: { en: "Forum", zh: "论坛" } },
  { href: "#events", label: { en: "Events", zh: "活动" } },
  { href: "#join", label: { en: "Join", zh: "加入" } },
];

const communityItems: RowItem[] = [
  {
    title: { en: "Official community channels", zh: "官方社区频道" },
    description: {
      en: "Follow the main NOVO community spaces for announcements and updates.",
      zh: "通过 NOVO 官方社区空间获取公告和更新。",
    },
  },
  {
    title: { en: "User discussions", zh: "用户交流讨论" },
    description: {
      en: "Meet other users and see how people are exploring the ecosystem.",
      zh: "认识其他用户，看看大家如何探索这个生态。",
    },
  },
  {
    title: { en: "Ecosystem updates", zh: "生态进展更新" },
    description: {
      en: "Track product direction, launches, and broader ecosystem movement.",
      zh: "跟进产品方向、上线进度和更广泛的生态动向。",
    },
  },
  {
    title: { en: "Beginner support", zh: "新手支持" },
    description: {
      en: "Start with clear guidance and entry points for first-time users.",
      zh: "为第一次进入生态的用户提供清晰引导和入口。",
    },
  },
];

const forumItems: RowItem[] = [
  {
    title: { en: "General discussion", zh: "综合讨论" },
    description: {
      en: "A shared space for broad ecosystem topics and open conversation.",
      zh: "用于生态整体话题和开放交流的公共空间。",
    },
  },
  {
    title: { en: "Technical discussion", zh: "技术讨论" },
    description: {
      en: "A calmer place for implementation questions, architecture, and engineering exchange.",
      zh: "用于实现问题、架构方向和工程交流的更深入空间。",
    },
  },
  {
    title: { en: "Ecosystem proposals", zh: "生态提案" },
    description: {
      en: "Share ideas for services, tools, and ecosystem coordination.",
      zh: "提出关于服务、工具和生态协作的想法。",
    },
  },
  {
    title: { en: "Support and feedback", zh: "支持与反馈" },
    description: {
      en: "Surface user problems, onboarding friction, and practical feedback.",
      zh: "集中反馈用户问题、上手阻力和实际体验意见。",
    },
  },
];

const eventCards: EventCard[] = [
  {
    title: { en: "Online AMAs", zh: "线上 AMA" },
    description: {
      en: "Ask questions, hear roadmap context, and join open conversations with the ecosystem team.",
      zh: "向生态团队提问，了解路线背景，并参与公开交流。",
    },
  },
  {
    title: { en: "Developer workshops", zh: "开发者工作坊" },
    description: {
      en: "Structured sessions for building tools, applications, and integrations on NOVOVM.",
      zh: "围绕工具、应用和集成开发的结构化活动。",
    },
  },
  {
    title: { en: "Ecosystem launches", zh: "生态发布活动" },
    description: {
      en: "Follow new ecosystem directions, service rollouts, and product openings.",
      zh: "跟进新的生态方向、服务上线和产品开放进度。",
    },
  },
  {
    title: { en: "Community meetups", zh: "社区活动" },
    description: {
      en: "Meet users, builders, and participants through online and offline gatherings.",
      zh: "通过线上线下聚会认识用户、开发者和参与者。",
    },
  },
];

const joinPaths: JoinPath[] = [
  {
    title: { en: "Become a user", zh: "成为用户" },
    description: {
      en: "Create a wallet and start exploring Web3 services.",
      zh: "创建钱包，开始探索 Web3 服务。",
    },
    href: "/wallet/create",
  },
  {
    title: { en: "Become a developer", zh: "成为开发者" },
    description: {
      en: "Build applications and tools on top of NOVOVM.",
      zh: "在 NOVOVM 上构建应用和工具。",
    },
    href: "/developers",
  },
  {
    title: { en: "Become a node participant", zh: "成为节点参与者" },
    description: {
      en: "Contribute infrastructure, compute, storage, or network services.",
      zh: "贡献基础设施、算力、存储或网络服务。",
    },
    href: "/network",
  },
  {
    title: { en: "Become an ecosystem partner", zh: "成为生态合作伙伴" },
    description: {
      en: "Provide services, integrations, applications, or community support.",
      zh: "提供服务、集成、应用或社区支持。",
    },
    href: "/contact",
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

function DirectoryRows({
  items,
  language,
}: {
  items: RowItem[];
  language: Language;
}) {
  return (
    <div className="rounded-[18px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.74)] p-5 sm:p-7 lg:p-8">
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            className="group rounded-[14px] border border-transparent px-4 py-5 transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.24)] hover:bg-[rgba(13,18,13,0.42)]"
            key={item.title.en}
            transition={{ duration: 0.24 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 h-14 w-px bg-transparent transition-colors duration-300 group-hover:bg-[rgba(90,181,70,0.9)]" />
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-[rgba(90,181,70,0.44)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-text transition-colors duration-300 group-hover:text-green-bright">
                  {copy(item.title, language)}
                </h3>
                <p className="mt-3 max-w-[40rem] text-base leading-7 text-[rgba(245,242,232,0.76)]">
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

function CtaRow({
  href,
  label,
  language,
}: {
  href: string;
  label: Bilingual;
  language: Language;
}) {
  return (
    <Link
      className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
      href={href}
    >
      <span>{copy(label, language)}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
    </Link>
  );
}

export function ParticipatePage({ initialLanguage }: { initialLanguage: Language }) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <DetailPageHeader language={language} onLanguageChange={handleLanguageChange} />
      <main className="bg-background pt-[72px]">
        <section className="relative overflow-hidden px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.1]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(90,181,70,0.06),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(241,188,26,0.03),transparent_18%)]" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid items-end gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.8fr)]">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-green-bright">
                  PARTICIPATE
                </p>
                <h1 className="mt-6 text-4xl font-semibold leading-[1.04] text-text sm:text-5xl lg:text-[5rem]">
                  {copy({ en: "Join the NOVO world.", zh: "加入 NOVO 世界。" }, language)}
                </h1>
                <p className="mt-6 text-lg text-[rgba(90,181,70,0.9)] sm:text-xl">
                  {copy(
                    { en: "A shared space for NOVO people.", zh: "NOVO 人的交流天地。" },
                    language,
                  )}
                </p>
                <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Connect with users, developers, node participants, creators, and ecosystem builders.",
                      zh: "连接用户、开发者、节点参与者、创作者和生态建设者。",
                    },
                    language,
                  )}
                </p>
                <p className="mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.76)] sm:text-lg">
                  {copy(
                    {
                      en: "NOVOVM is more than infrastructure. It is a growing network of people building, using, and shaping the next generation of Web3 services.",
                      zh: "NOVOVM 不只是基础设施，它也是一个不断成长的人群网络，大家一起构建、使用并塑造下一代 Web3 服务。",
                    },
                    language,
                  )}
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href="#community-coming-soon">
                    {copy({ en: "Join Community", zh: "加入社区" }, language)}
                  </Button>
                  <Button href="#events-coming-soon" variant="secondary">
                    {copy({ en: "Explore Events", zh: "探索活动" }, language)}
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="rounded-[18px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-8 shadow-[0_24px_52px_rgba(0,0,0,0.24)]">
                  <div className="relative min-h-[320px]">
                    <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(90,181,70,0.3)] bg-[rgba(13,18,13,0.72)] text-center text-base font-medium text-text">
                      NOVO
                    </div>
                    {[
                      { label: copy({ en: "Community", zh: "Community" }, language), left: "12%", top: "16%" },
                      { label: copy({ en: "Forum", zh: "Forum" }, language), left: "70%", top: "18%" },
                      { label: copy({ en: "Events", zh: "Events" }, language), left: "16%", top: "68%" },
                      { label: copy({ en: "Join", zh: "Join" }, language), left: "72%", top: "66%" },
                    ].map((node) => (
                      <motion.div
                        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                        className="absolute rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.9)] px-4 py-3 text-sm text-text"
                        key={node.label}
                        style={{ left: node.left, top: node.top }}
                        transition={reduceMotion ? undefined : { duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        {node.label}
                      </motion.div>
                    ))}
                    <div className="absolute left-[31%] top-[33%] h-px w-[16%] -rotate-[24deg] bg-[rgba(90,181,70,0.2)]" />
                    <div className="absolute left-[53%] top-[33%] h-px w-[16%] rotate-[24deg] bg-[rgba(90,181,70,0.2)]" />
                    <div className="absolute left-[31%] top-[64%] h-px w-[16%] rotate-[24deg] bg-[rgba(90,181,70,0.2)]" />
                    <div className="absolute left-[53%] top-[64%] h-px w-[16%] -rotate-[24deg] bg-[rgba(90,181,70,0.2)]" />
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="mt-16">
              <SectionNav language={language} />
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="community">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "Community", zh: "Community" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Join the NOVO community to follow updates, meet other users, and learn how the ecosystem is growing.",
                      zh: "加入 NOVO 社区，跟进更新，认识其他用户，并了解生态如何持续成长。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14">
              <Reveal delay={0.08}>
                <DirectoryRows items={communityItems} language={language} />
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="mt-8">
                <CtaRow
                  href="#community-coming-soon"
                  label={{ en: "Join Community", zh: "加入社区" }}
                  language={language}
                />
                <p className="mt-3 text-sm text-[rgba(245,242,232,0.56)]" id="community-coming-soon">
                  {copy({ en: "Community entry coming soon.", zh: "社区入口即将开放。" }, language)}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="forum">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                    {copy({ en: "Forum", zh: "Forum" }, language)}
                  </h2>
                  <span className="rounded-[999px] border border-[rgba(90,181,70,0.16)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[rgba(90,181,70,0.58)]">
                    {copy({ en: "Coming Soon", zh: "Coming Soon" }, language)}
                  </span>
                </div>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "A place for deeper discussions, proposals, technical topics, ecosystem ideas, and user feedback.",
                      zh: "这里用于更深入的讨论、提案、技术话题、生态想法和用户反馈。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14">
              <Reveal delay={0.08}>
                <DirectoryRows items={forumItems} language={language} />
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="mt-8">
                <CtaRow
                  href="#forum-coming-soon"
                  label={{ en: "Open Forum", zh: "打开论坛" }}
                  language={language}
                />
                <p className="mt-3 text-sm text-[rgba(245,242,232,0.56)]" id="forum-coming-soon">
                  {copy({ en: "Forum opening soon.", zh: "论坛即将开放。" }, language)}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="events">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                    {copy({ en: "Events", zh: "Events" }, language)}
                  </h2>
                  <span className="rounded-[999px] border border-[rgba(90,181,70,0.16)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[rgba(90,181,70,0.58)]">
                    {copy({ en: "Coming Soon", zh: "Coming Soon" }, language)}
                  </span>
                </div>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Follow online and offline events, ecosystem launches, developer sessions, and community activities.",
                      zh: "关注线上线下活动、生态发布、开发者活动和社区交流。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {eventCards.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title.en}>
                  <motion.div
                    className="group rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-6 transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.36)] hover:bg-[rgba(13,18,13,0.42)]"
                    transition={{ duration: 0.24 }}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.48)]">
                          {copy({ en: "Placeholder Event", zh: "占位活动" }, language)}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold leading-tight text-text transition-colors duration-300 group-hover:text-green-bright">
                          {copy(item.title, language)}
                        </h3>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-1 group-hover:opacity-100" strokeWidth={1.8} />
                    </div>
                    <p className="mt-4 text-base leading-7 text-[rgba(245,242,232,0.76)]">
                      {copy(item.description, language)}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-8">
                <CtaRow
                  href="#events-coming-soon"
                  label={{ en: "View Events", zh: "查看活动" }}
                  language={language}
                />
                <p className="mt-3 text-sm text-[rgba(245,242,232,0.56)]" id="events-coming-soon">
                  {copy({ en: "Event calendar coming soon.", zh: "活动日历即将开放。" }, language)}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="join">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "How to join", zh: "如何加入" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Choose how you want to participate in NOVOVM.",
                      zh: "选择你希望以什么方式参与 NOVOVM。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {joinPaths.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title.en}>
                  <motion.div
                    className="group rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-6 transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.36)] hover:bg-[rgba(13,18,13,0.42)]"
                    transition={{ duration: 0.24 }}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                  >
                    <h3 className="text-2xl font-semibold leading-tight text-text transition-colors duration-300 group-hover:text-green-bright">
                      {copy(item.title, language)}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[rgba(245,242,232,0.76)]">
                      {copy(item.description, language)}
                    </p>
                    <div className="mt-8">
                      <CtaRow href={item.href} label={item.title} language={language} />
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/wallet/create">
                  {copy({ en: "Create Wallet", zh: "创建钱包" }, language)}
                </Button>
                <Button href="/developers" variant="secondary">
                  {copy({ en: "Developer Docs", zh: "开发者文档" }, language)}
                </Button>
                <Button href="/network" variant="secondary">
                  {copy({ en: "Learn About Nodes", zh: "了解节点" }, language)}
                </Button>
                <Button href="/contact" variant="secondary">
                  {copy({ en: "Partner With Us", zh: "成为合作伙伴" }, language)}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[16px] border border-[rgba(90,181,70,0.18)] bg-[linear-gradient(180deg,rgba(13,18,13,0.94),rgba(8,4,4,0.96))] p-8 text-center shadow-[0_26px_60px_rgba(0,0,0,0.28)] sm:p-12">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy(
                  { en: "The network grows through participation.", zh: "网络因参与而成长。" },
                  language,
                )}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
                {copy(
                  {
                    en: "NOVOVM is built for users, builders, service providers, and communities working together.",
                    zh: "NOVOVM 面向用户、建设者、服务提供者和社区共同协作而构建。",
                  },
                  language,
                )}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#community-coming-soon">
                  {copy({ en: "Join Community", zh: "加入社区" }, language)}
                </Button>
                <Button href="/wallet/create" variant="secondary">
                  {copy({ en: "Create Wallet", zh: "创建钱包" }, language)}
                </Button>
                <Link
                  className="group inline-flex items-center gap-2 px-0 py-3 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                  href="/"
                >
                  <span>{copy({ en: "Back to Home", zh: "返回首页" }, language)}</span>
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
