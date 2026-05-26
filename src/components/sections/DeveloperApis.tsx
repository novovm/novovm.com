"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { resolveCopy } from "@/lib/language";
import { type BilingualCopy, type Language } from "@/lib/site-content";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";

type WhyItem = { number: string; text: BilingualCopy };
type PipelineStep = { description: BilingualCopy; title: BilingualCopy };
type GridItem = { label: string; paragraph: BilingualCopy; title: BilingualCopy };
type UseCaseItem = { description: BilingualCopy; title: BilingualCopy };

const content = {
  hero: {
    eyebrow: { en: "Core Technology / Access", zh: "核心技术 / 接入" },
    title: { en: "Developer APIs", zh: "开发者接口" },
    subtitle: {
      en: "A clear surface for building on NOVOVM.",
      zh: "面向 NOVOVM 构建的清晰接口表面。",
    },
    description: [
      {
        en: "Developer APIs give teams a simple way to connect applications, tools, wallets, and services to the NOVOVM network.",
        zh: "开发者接口为团队提供一种简单方式，将应用、工具、钱包和服务连接到 NOVOVM 网络。",
      },
      {
        en: "Instead of forcing every team to understand the full system, NOVOVM exposes clean interfaces for building, integrating, and scaling applications.",
        zh: "NOVOVM 不要求每个团队理解完整系统，而是提供清晰接口，帮助团队构建、集成并扩展应用。",
      },
    ],
  },
  why: {
    title: { en: "Why developer access matters", zh: "为什么开发者接入很重要" },
    intro: [
      {
        en: "A powerful network is only useful if people can build on it.",
        zh: "一个强大的网络，只有当人们能在其上构建时才真正有用。",
      },
      {
        en: "Developer APIs turn infrastructure into something applications can actually use.",
        zh: "开发者接口把基础设施转化为应用真正可以使用的能力。",
      },
    ],
    items: [
      {
        number: "01",
        text: { en: "Teams need simple ways to connect.", zh: "团队需要简单的连接方式。" },
      },
      {
        number: "02",
        text: {
          en: "Tools should not require deep protocol knowledge.",
          zh: "工具不应要求深层协议知识。",
        },
      },
      {
        number: "03",
        text: {
          en: "Applications need stable interfaces to grow.",
          zh: "应用需要稳定接口才能持续成长。",
        },
      },
    ] satisfies WhyItem[],
  },
  approach: {
    title: { en: "How NOVOVM exposes the network", zh: "NOVOVM 如何开放网络能力" },
    description: [
      {
        en: "NOVOVM provides a clean access layer between applications and the underlying execution system.",
        zh: "NOVOVM 在应用与底层执行系统之间提供清晰的访问层。",
      },
      {
        en: "Applications can send requests, read results, interact with wallets, and connect to network services through consistent interfaces.",
        zh: "应用可以通过一致接口发送请求、读取结果、与钱包交互，并连接网络服务。",
      },
    ],
    steps: [
      {
        title: { en: "Application", zh: "应用" },
        description: {
          en: "A product, wallet, tool, or service wants to use NOVOVM.",
          zh: "产品、钱包、工具或服务希望使用 NOVOVM。",
        },
      },
      {
        title: { en: "API Surface", zh: "API 表面" },
        description: {
          en: "The interface that allows developers to send requests and integrate features.",
          zh: "允许开发者发送请求并集成功能的接口。",
        },
      },
      {
        title: { en: "Execution", zh: "执行" },
        description: {
          en: "The request is processed by the NOVOVM execution layer.",
          zh: "请求由 NOVOVM 执行层处理。",
        },
      },
      {
        title: { en: "Result", zh: "结果" },
        description: {
          en: "The application receives usable output from the network.",
          zh: "应用从网络接收可用输出。",
        },
      },
    ] satisfies PipelineStep[],
  },
  builds: {
    title: { en: "What developers can build", zh: "开发者可以构建什么" },
    items: [
      {
        label: "01",
        title: { en: "Wallets and user tools", zh: "钱包与用户工具" },
        paragraph: {
          en: "Create interfaces for users to manage assets and interact with applications.",
          zh: "创建界面，帮助用户管理资产并与应用交互。",
        },
      },
      {
        label: "02",
        title: { en: "Decentralized applications", zh: "去中心化应用" },
        paragraph: {
          en: "Build applications that use NOVOVM for execution, privacy, and verification.",
          zh: "构建使用 NOVOVM 执行、隐私与验证能力的应用。",
        },
      },
      {
        label: "03",
        title: { en: "Enterprise integrations", zh: "企业集成" },
        paragraph: {
          en: "Connect NOVOVM infrastructure with existing business systems.",
          zh: "将 NOVOVM 基础设施连接到现有业务系统。",
        },
      },
      {
        label: "04",
        title: { en: "Network services", zh: "网络服务" },
        paragraph: {
          en: "Build services that support data access, execution, monitoring, and ecosystem operations.",
          zh: "构建支持数据访问、执行、监控与生态运营的服务。",
        },
      },
    ] satisfies GridItem[],
  },
  simple: {
    title: {
      en: "Simple for developers. Powerful underneath.",
      zh: "对开发者简单。底层能力强大。",
    },
    statement: {
      en: "Developers should not need to rebuild the network to use it.",
      zh: "开发者不应为了使用网络而重建网络。",
    },
    description: {
      en: "NOVOVM hides low-level system complexity behind clear interfaces, so builders can focus on products, users, and real-world use cases.",
      zh: "NOVOVM 将底层系统复杂性隐藏在清晰接口之后，让构建者专注于产品、用户和真实使用场景。",
    },
    support: {
      en: "The network handles execution, privacy, and verification. Developers build on top.",
      zh: "网络负责执行、隐私与验证。开发者在其上构建。",
    },
    left: { en: "Developer Experience", zh: "开发者体验" },
    right: { en: "Network Capability", zh: "网络能力" },
  },
  useCases: {
    title: { en: "Where Developer APIs matter most", zh: "开发者接口最重要的场景" },
    description: {
      en: "Developer APIs are the bridge between NOVOVM infrastructure and real applications.",
      zh: "开发者接口是 NOVOVM 基础设施与真实应用之间的桥梁。",
    },
    items: [
      {
        title: { en: "Wallet products", zh: "钱包产品" },
        description: {
          en: "Let users access assets, apps, and network services.",
          zh: "让用户访问资产、应用和网络服务。",
        },
      },
      {
        title: { en: "Application platforms", zh: "应用平台" },
        description: {
          en: "Build user-facing applications powered by NOVOVM execution.",
          zh: "构建由 NOVOVM 执行能力支撑的用户应用。",
        },
      },
      {
        title: { en: "Enterprise systems", zh: "企业系统" },
        description: {
          en: "Integrate privacy-aware and verifiable infrastructure into existing workflows.",
          zh: "将隐私感知和可验证基础设施集成进现有工作流。",
        },
      },
      {
        title: { en: "Developer tooling", zh: "开发者工具" },
        description: {
          en: "Create SDKs, dashboards, testing tools, and monitoring interfaces.",
          zh: "创建 SDK、仪表盘、测试工具和监控界面。",
        },
      },
      {
        title: { en: "Ecosystem services", zh: "生态服务" },
        description: {
          en: "Support exchanges, explorers, data providers, and network operations.",
          zh: "支持交易平台、浏览器、数据提供方和网络运营。",
        },
      },
    ] satisfies UseCaseItem[],
  },
  final: {
    title: { en: "Build on a clear interface.", zh: "在清晰接口上构建。" },
    description: {
      en: "Developer APIs make NOVOVM accessible to application teams, tool builders, enterprises, and ecosystem partners.",
      zh: "开发者接口让应用团队、工具构建者、企业和生态伙伴都能接入 NOVOVM。",
    },
  },
};

function SectionShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative border-t border-[rgba(90,181,70,0.12)] px-5 py-[72px] sm:px-6 lg:px-8 lg:py-[120px]",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "max-w-4xl text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function ActionLink({
  children,
  href,
  variant,
}: {
  children: ReactNode;
  href: string;
  variant: "primary" | "secondary" | "text";
}) {
  if (variant === "text") {
    return (
      <Link
        className="group inline-flex items-center justify-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
        href={href}
      >
        {children}
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.8}
        />
      </Link>
    );
  }

  return (
    <Link
      className={cn(
        "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border px-5 text-sm font-medium transition-[transform,border-color,background-color,color] duration-300 hover:-translate-y-0.5 sm:w-auto",
        variant === "primary" &&
          "border-green bg-green text-text hover:border-green-bright hover:bg-green-bright",
        variant === "secondary" &&
          "border-border bg-transparent text-text hover:border-[rgba(241,188,26,0.52)] hover:bg-[rgba(241,188,26,0.06)]",
      )}
      href={href}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={1.8}
      />
    </Link>
  );
}

function InterfaceDiagram({ language }: { language: Language }) {
  const previousPointerRef = useRef<{
    left: number;
    time: number;
    top: number;
  } | null>(null);
  const [isShipVisible, setIsShipVisible] = useState(false);
  const [flameStrength, setFlameStrength] = useState(0.22);
  const shipX = useMotionValue(0);
  const shipY = useMotionValue(0);
  const springX = useSpring(shipX, {
    damping: 18,
    mass: 0.6,
    stiffness: 260,
  });
  const springY = useSpring(shipY, {
    damping: 18,
    mass: 0.6,
    stiffness: 260,
  });
  const title = resolveCopy(content.hero.title, language);
  const subtitle = resolveCopy(content.hero.subtitle, language);

  function handleShipMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const left = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const top = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
    const now = event.timeStamp;
    const previousPointer = previousPointerRef.current;
    let flame = 0.22;

    if (previousPointer) {
      const distance = Math.hypot(left - previousPointer.left, top - previousPointer.top);
      const elapsed = Math.max(now - previousPointer.time, 16);
      const speed = distance / elapsed;

      flame = Math.min(1, Math.max(0.18, speed / 1.65));
    }

    previousPointerRef.current = {
      left,
      time: now,
      top,
    };

    shipX.set(left);
    shipY.set(top);
    setFlameStrength((current) => current + (flame - current) * 0.42);
    setIsShipVisible(true);
  }

  return (
    <Reveal className="w-full max-w-[580px] lg:ml-auto" delay={0.12}>
      <div
        className="relative cursor-none overflow-hidden rounded-[20px] border border-[rgba(90,181,70,0.24)] bg-[rgba(4,0,0,0.64)] transition-colors duration-500 hover:border-[rgba(140,216,103,0.46)]"
        onPointerEnter={handleShipMove}
        onPointerLeave={() => {
          previousPointerRef.current = null;
          setIsShipVisible(false);
          setFlameStrength(0.22);
        }}
        onPointerMove={handleShipMove}
      >
        <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(90,181,70,0.12),transparent_62%)]" />
        <Image
          alt={`${title} - ${subtitle}`}
          className="relative z-10 h-auto w-full object-contain opacity-92 [mask-image:radial-gradient(ellipse_at_center,black_42%,rgba(0,0,0,0.72)_58%,rgba(0,0,0,0.18)_76%,transparent_92%)]"
          height={1024}
          priority
          src="/media/developer-apis-visual.png"
          width={1536}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,transparent_16%,transparent_84%,var(--background)_100%),linear-gradient(180deg,var(--background)_0%,transparent_14%,transparent_82%,var(--background)_100%)]"
        />
        {isShipVisible ? (
          <motion.div
            aria-hidden="true"
            className="cursor-ship pointer-events-none absolute z-30 h-[74px] w-[118px] overflow-visible sm:h-[86px] sm:w-[138px]"
            initial={false}
            style={{
              "--flame-scale": 0.5 + flameStrength * 1.15,
              "--flame-strength": 0.34 + flameStrength * 0.66,
              left: 0,
              top: 0,
              x: springX,
              y: springY,
            } as CSSProperties}
          >
            <span className="cursor-ship-flame" />
            <span className="cursor-ship-flame cursor-ship-flame-secondary" />
            <Image
              alt=""
              className="relative z-10 h-full w-full object-contain"
              height={816}
              priority
              src="/media/cursor-ship.png"
              width={1306}
            />
          </motion.div>
        ) : null}
      </div>
    </Reveal>
  );
}

function Pipeline({ language }: { language: Language }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Reveal className="mt-14" delay={0.12}>
      <div className="grid gap-4 lg:grid-cols-4 lg:gap-0">
        {content.approach.steps.map((step, index) => (
          <div className="relative" key={step.title.en}>
            {index > 0 ? (
              <div
                className={cn(
                  "absolute -left-0 top-6 hidden h-px w-full -translate-x-1/2 bg-[rgba(90,181,70,0.2)] transition-colors duration-700 lg:block",
                  activeIndex >= index && "bg-green-bright",
                )}
              />
            ) : null}
            <button
              className={cn(
                "group relative z-10 min-h-[150px] w-full rounded-[8px] border border-[rgba(90,181,70,0.22)] bg-[rgba(7,7,7,0.68)] p-6 text-left transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[rgba(140,216,103,0.56)] hover:bg-[rgba(14,20,14,0.78)]",
                activeIndex === index &&
                  "border-[rgba(140,216,103,0.56)] bg-[rgba(14,20,14,0.78)]",
              )}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              type="button"
            >
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-green-bright">
                0{index + 1}
              </p>
              <h3 className="mt-5 text-xl font-medium leading-tight text-text">
                {resolveCopy(step.title, language)}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                {resolveCopy(step.description, language)}
              </p>
            </button>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function SplitBridge({ language }: { language: Language }) {
  return (
    <Reveal className="mt-16" delay={0.12}>
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_180px_1fr]">
        <div className="group rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.62)] p-6 text-center transition-colors duration-300 hover:border-[rgba(140,216,103,0.54)]">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-green-bright">
            {resolveCopy(content.simple.left, language)}
          </p>
        </div>
        <motion.div
          className="order-2 h-px bg-green-bright lg:order-none"
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-90px" }}
          whileInView={{ scaleX: 1 }}
        />
        <div className="group rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.62)] p-6 text-center transition-colors duration-300 hover:border-[rgba(140,216,103,0.54)]">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-green-bright">
            {resolveCopy(content.simple.right, language)}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function DeveloperApis({ initialLanguage }: { initialLanguage: Language }) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);

  return (
    <>
      <DetailPageHeader
        backHref="/#core-technology"
        backLabel={{ en: "Back to Core Technology", zh: "返回核心技术" }}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      <main className="bg-background pt-[72px]">
        <section className="relative overflow-hidden px-5 py-[72px] sm:px-6 lg:px-8 lg:py-[120px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(90,181,70,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(90,181,70,0.5) 1px, transparent 1px)",
              backgroundSize: "68px 68px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(90,181,70,0.06),transparent)]" />

          <div className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.82fr)]">
            <Reveal className="max-w-[780px]">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[rgba(90,181,70,0.68)]">
                {resolveCopy(content.hero.eyebrow, language)}
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-none text-text sm:text-6xl lg:text-[5.4rem]">
                {resolveCopy(content.hero.title, language)}
              </h1>
              <p className="mt-9 max-w-3xl text-xl leading-8 text-[rgba(248,242,232,0.92)] sm:text-2xl sm:leading-9">
                {resolveCopy(content.hero.subtitle, language)}
              </p>
              <div className="mt-10 space-y-5">
                {content.hero.description.map((paragraph) => (
                  <p
                    className="max-w-3xl text-base leading-7 text-[rgba(248,242,232,0.74)]"
                    key={paragraph.en}
                  >
                    {resolveCopy(paragraph, language)}
                  </p>
                ))}
              </div>
            </Reveal>
            <InterfaceDiagram language={language} />
          </div>
        </section>

        <SectionShell>
          <Reveal>
            <SectionTitle>{resolveCopy(content.why.title, language)}</SectionTitle>
            <div className="mt-6 max-w-3xl space-y-3">
              {content.why.intro.map((paragraph) => (
                <p className="text-base leading-7 text-muted" key={paragraph.en}>
                  {resolveCopy(paragraph, language)}
                </p>
              ))}
            </div>
          </Reveal>
          <div className="mt-14">
            {content.why.items.map((item, index) => (
              <Reveal delay={index * 0.08} key={item.number}>
                <div className="group grid gap-5 border-b border-[rgba(90,181,70,0.16)] py-8 transition-colors duration-300 hover:border-[rgba(140,216,103,0.48)] lg:grid-cols-[104px_minmax(0,1fr)]">
                  <p className="text-sm font-medium tracking-[0.32em] text-[rgba(90,181,70,0.44)] transition-colors duration-300 group-hover:text-green-bright">
                    {item.number}
                  </p>
                  <p className="max-w-4xl text-2xl leading-tight text-text sm:text-[2rem]">
                    {resolveCopy(item.text, language)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        <SectionShell>
          <Reveal>
            <SectionTitle>{resolveCopy(content.approach.title, language)}</SectionTitle>
            <div className="mt-6 max-w-3xl space-y-3">
              {content.approach.description.map((paragraph) => (
                <p className="text-base leading-7 text-muted" key={paragraph.en}>
                  {resolveCopy(paragraph, language)}
                </p>
              ))}
            </div>
          </Reveal>
          <Pipeline language={language} />
        </SectionShell>

        <SectionShell>
          <Reveal>
            <SectionTitle>{resolveCopy(content.builds.title, language)}</SectionTitle>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {content.builds.items.map((item, index) => (
              <Reveal className="h-full" delay={index * 0.08} key={item.title.en}>
                <article className="group relative flex h-full min-h-[230px] flex-col justify-between rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.62)] p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[rgba(140,216,103,0.54)] hover:bg-[rgba(14,20,14,0.76)] sm:p-7">
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute right-6 top-6 h-4 w-4 translate-x-[-4px] text-green-bright opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={1.8}
                  />
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-green-bright">
                    {item.label}
                  </p>
                  <div>
                    <h3 className="text-2xl font-medium leading-tight text-text">
                      {resolveCopy(item.title, language)}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
                      {resolveCopy(item.paragraph, language)}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        <SectionShell className="overflow-hidden">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <SectionTitle className="mx-auto">
                {resolveCopy(content.simple.title, language)}
              </SectionTitle>
              <p className="mx-auto mt-12 max-w-4xl text-3xl font-medium leading-tight text-text sm:text-4xl lg:text-5xl">
                {resolveCopy(content.simple.statement, language)}
              </p>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-muted">
                {resolveCopy(content.simple.description, language)}
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[rgba(248,242,232,0.62)]">
                {resolveCopy(content.simple.support, language)}
              </p>
            </Reveal>
            <SplitBridge language={language} />
          </div>
        </SectionShell>

        <SectionShell>
          <Reveal>
            <SectionTitle>{resolveCopy(content.useCases.title, language)}</SectionTitle>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
              {resolveCopy(content.useCases.description, language)}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {content.useCases.items.map((item, index) => (
              <Reveal delay={index * 0.06} key={item.title.en}>
                <article className="group min-h-[132px] rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.62)] p-5 transition-colors duration-300 hover:border-[rgba(140,216,103,0.54)]">
                  <h3 className="text-base font-medium leading-snug text-text">
                    {resolveCopy(item.title, language)}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                    {resolveCopy(item.description, language)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        <SectionShell>
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-semibold leading-tight text-text sm:text-5xl lg:text-6xl">
              {resolveCopy(content.final.title, language)}
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              {resolveCopy(content.final.description, language)}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ActionLink href="/#developers" variant="primary">
                {language === "zh" ? "阅读开发者文档" : "Read Developer Docs"}
              </ActionLink>
              <ActionLink href="/#core-technology" variant="secondary">
                {language === "zh" ? "返回核心技术" : "Back to Core Technology"}
              </ActionLink>
            </div>
            <div className="mt-6">
              <ActionLink href="/#developers" variant="text">
                {language === "zh" ? "查看 API 参考" : "View API Reference"}
              </ActionLink>
            </div>
          </Reveal>
        </SectionShell>
      </main>
    </>
  );
}
