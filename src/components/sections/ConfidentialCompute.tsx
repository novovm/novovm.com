"use client";

import { motion, useMotionValue, useSpring, type MotionStyle } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { resolveCopy } from "@/lib/language";
import { type BilingualCopy, type Language } from "@/lib/site-content";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";

type WhyItem = {
  number: string;
  text: BilingualCopy;
};

type PipelineStep = {
  description: BilingualCopy;
  title: BilingualCopy;
};

type EnableItem = {
  label: string;
  paragraph: BilingualCopy;
  title: BilingualCopy;
};

type UseCaseItem = {
  description: BilingualCopy;
  title: BilingualCopy;
};

const content = {
  hero: {
    eyebrow: {
      en: "Core Technology / Privacy",
      zh: "核心技术 / 隐私",
    },
    title: {
      en: "Confidential Compute",
      zh: "保密计算",
    },
    subtitle: {
      en: "Computation without exposing sensitive data.",
      zh: "在不暴露敏感数据的前提下完成计算。",
    },
    description: [
      {
        en: "NOVOVM integrates privacy-aware execution directly into the runtime layer, allowing applications to process sensitive information without making it publicly visible.",
        zh: "NOVOVM 将隐私感知执行直接整合进运行时层，让应用能够处理敏感信息，而不必将其公开暴露。",
      },
      {
        en: "Instead of treating privacy as an external add-on, NOVOVM treats confidentiality as part of execution itself.",
        zh: "NOVOVM 不把隐私当作外部附加层，而是把保密性视为执行本身的一部分。",
      },
    ],
  },
  why: {
    title: {
      en: "Why privacy matters",
      zh: "为什么隐私很重要",
    },
    intro: {
      en: "Most decentralized systems expose too much information by default. Real-world applications often require privacy before they can move on-chain.",
      zh: "多数去中心化系统默认暴露过多信息。真实世界应用往往需要先具备隐私能力，才有可能迁移到链上。",
    },
    items: [
      {
        number: "01",
        text: {
          en: "Financial activity should not expose personal information.",
          zh: "金融活动不应暴露个人信息。",
        },
      },
      {
        number: "02",
        text: {
          en: "Applications should not leak sensitive business logic.",
          zh: "应用不应泄露敏感业务逻辑。",
        },
      },
      {
        number: "03",
        text: {
          en: "Users should not lose privacy in exchange for verification.",
          zh: "用户不应为了获得验证而失去隐私。",
        },
      },
    ] satisfies WhyItem[],
  },
  approach: {
    title: {
      en: "How NOVOVM approaches confidential compute",
      zh: "NOVOVM 如何处理保密计算",
    },
    description: [
      {
        en: "NOVOVM separates public execution visibility from private computation flow.",
        zh: "NOVOVM 将公开执行可见性与私有计算流程分离。",
      },
      {
        en: "Sensitive operations can move through protected execution paths while still producing results that the network can validate.",
        zh: "敏感操作可以通过受保护执行路径完成，同时仍然产生网络可验证的结果。",
      },
    ],
    steps: [
      {
        title: {
          en: "Public Request",
          zh: "公开请求",
        },
        description: {
          en: "Applications submit actions to the network.",
          zh: "应用向网络提交操作。",
        },
      },
      {
        title: {
          en: "Protected Execution Flow",
          zh: "受保护执行流程",
        },
        description: {
          en: "Sensitive computation is handled inside protected execution paths.",
          zh: "敏感计算在受保护执行路径中完成。",
        },
      },
      {
        title: {
          en: "Verifiable Output",
          zh: "可验证输出",
        },
        description: {
          en: "The network receives results that can be checked without exposing private data.",
          zh: "网络接收可检查的结果，而不需要暴露私有数据。",
        },
      },
    ] satisfies PipelineStep[],
  },
  enables: {
    title: {
      en: "What confidential compute enables",
      zh: "保密计算带来什么",
    },
    items: [
      {
        label: "01",
        title: {
          en: "Private applications",
          zh: "隐私应用",
        },
        paragraph: {
          en: "Applications can process sensitive data without exposing it publicly.",
          zh: "应用可以处理敏感数据，而不将其公开暴露。",
        },
      },
      {
        label: "02",
        title: {
          en: "Protected transactions",
          zh: "受保护交易",
        },
        paragraph: {
          en: "Transaction-related information can remain confidential when privacy is required.",
          zh: "在需要隐私时，交易相关信息可以保持保密。",
        },
      },
      {
        label: "03",
        title: {
          en: "Trusted execution",
          zh: "可信执行",
        },
        paragraph: {
          en: "Results can remain verifiable without revealing internal logic.",
          zh: "结果可以保持可验证，同时不暴露内部逻辑。",
        },
      },
      {
        label: "04",
        title: {
          en: "Enterprise-ready systems",
          zh: "面向企业的系统",
        },
        paragraph: {
          en: "Organizations can use shared infrastructure without giving up confidentiality.",
          zh: "组织可以使用共享基础设施，同时不放弃保密性。",
        },
      },
    ] satisfies EnableItem[],
  },
  verification: {
    title: {
      en: "Privacy and verification can coexist",
      zh: "隐私与验证可以共存",
    },
    statement: {
      en: "NOVOVM is designed so that privacy does not require abandoning trust.",
      zh: "NOVOVM 的设计目标是让隐私不必以放弃信任为代价。",
    },
    description: {
      en: "Applications can preserve confidential information while still producing outputs that can be validated by the network.",
      zh: "应用可以保护保密信息，同时仍然产生可由网络验证的输出。",
    },
    support: {
      en: "The goal is not to hide the system. The goal is to protect sensitive computation while preserving integrity.",
      zh: "目标不是隐藏系统，而是在保护敏感计算的同时保持完整性。",
    },
    left: {
      en: "Private computation",
      zh: "私有计算",
    },
    right: {
      en: "Verifiable result",
      zh: "可验证结果",
    },
  },
  useCases: {
    title: {
      en: "Built for real-world confidential workloads",
      zh: "为真实世界的保密工作负载而构建",
    },
    description: {
      en: "NOVOVM is designed for environments where confidentiality is not optional.",
      zh: "NOVOVM 面向那些保密性不是可选项的环境而设计。",
    },
    items: [
      {
        title: {
          en: "Financial systems",
          zh: "金融系统",
        },
        description: {
          en: "Protect sensitive transaction and account-related data.",
          zh: "保护敏感交易与账户相关数据。",
        },
      },
      {
        title: {
          en: "Identity infrastructure",
          zh: "身份基础设施",
        },
        description: {
          en: "Support identity flows without exposing unnecessary personal information.",
          zh: "支持身份流程，而不暴露不必要的个人信息。",
        },
      },
      {
        title: {
          en: "Enterprise applications",
          zh: "企业应用",
        },
        description: {
          en: "Run business logic on shared infrastructure while preserving confidentiality.",
          zh: "在共享基础设施上运行业务逻辑，同时保持保密性。",
        },
      },
      {
        title: {
          en: "AI-related computation",
          zh: "AI 相关计算",
        },
        description: {
          en: "Enable privacy-sensitive computation for models, data, and workflows.",
          zh: "为模型、数据和工作流启用隐私敏感计算。",
        },
      },
      {
        title: {
          en: "Private coordination systems",
          zh: "私有协同系统",
        },
        description: {
          en: "Coordinate activity between parties without making everything public.",
          zh: "让多方协同活动不必全部公开。",
        },
      },
    ] satisfies UseCaseItem[],
  },
  final: {
    title: {
      en: "Privacy built into execution.",
      zh: "隐私内建于执行。",
    },
    description: {
      en: "Confidential compute is part of the runtime itself - not an external layer added afterward.",
      zh: "保密计算是运行时本身的一部分，而不是事后添加的外部层。",
    },
  },
};

function SectionShell({
  children,
  className,
}: {
  children: React.ReactNode;
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
  children: React.ReactNode;
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
  children: React.ReactNode;
  href: string;
  variant: "primary" | "secondary";
}) {
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

function ProtectedFlowDiagram({ language }: { language: Language }) {
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
    <Reveal className="w-full max-w-[560px] lg:ml-auto" delay={0.12}>
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
          src="/media/confidential-compute-visual.png"
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
            } as MotionStyle}
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
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-0">
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

function PrivacyVerification({ language }: { language: Language }) {
  return (
    <Reveal className="mt-16" delay={0.12}>
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_180px_1fr]">
        <div className="group rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.62)] p-6 text-center transition-colors duration-300 hover:border-[rgba(140,216,103,0.54)]">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-green-bright">
            {resolveCopy(content.verification.left, language)}
          </p>
        </div>
        <motion.div
          className="h-px bg-green-bright lg:h-px"
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-90px" }}
          whileInView={{ scaleX: 1 }}
        />
        <div className="group rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.62)] p-6 text-center transition-colors duration-300 hover:border-[rgba(140,216,103,0.54)]">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-green-bright">
            {resolveCopy(content.verification.right, language)}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function ConfidentialCompute({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);

  return (
    <>
      <DetailPageHeader
        backHref="/#core-technology"
        backLabel={{
          en: "Back to Core Technology",
          zh: "返回核心技术",
        }}
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

          <div className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.78fr)]">
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

            <ProtectedFlowDiagram language={language} />
          </div>
        </section>

        <SectionShell>
          <Reveal>
            <SectionTitle>{resolveCopy(content.why.title, language)}</SectionTitle>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
              {resolveCopy(content.why.intro, language)}
            </p>
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
            <SectionTitle>
              {resolveCopy(content.approach.title, language)}
            </SectionTitle>
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
            <SectionTitle>{resolveCopy(content.enables.title, language)}</SectionTitle>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {content.enables.items.map((item, index) => (
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
                {resolveCopy(content.verification.title, language)}
              </SectionTitle>
              <p className="mx-auto mt-12 max-w-4xl text-3xl font-medium leading-tight text-text sm:text-4xl lg:text-5xl">
                {resolveCopy(content.verification.statement, language)}
              </p>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-muted">
                {resolveCopy(content.verification.description, language)}
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[rgba(248,242,232,0.62)]">
                {resolveCopy(content.verification.support, language)}
              </p>
            </Reveal>
            <PrivacyVerification language={language} />
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
              <ActionLink href="/#four-layer-network" variant="primary">
                {language === "zh" ? "探索可验证结果" : "Explore Verifiable Results"}
              </ActionLink>
              <ActionLink href="/#core-technology" variant="secondary">
                {language === "zh" ? "返回核心技术" : "Back to Core Technology"}
              </ActionLink>
            </div>
          </Reveal>
        </SectionShell>
      </main>
    </>
  );
}
