"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

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
      en: "Core Technology / Proofs",
      zh: "核心技术 / 证明",
    },
    title: {
      en: "Verifiable Results",
      zh: "结果可验证",
    },
    subtitle: {
      en: "Don't just trust the result. Check it.",
      zh: "不要只信任结果。让结果可检查。",
    },
    description: [
      {
        en: "NOVOVM is designed so execution results can be verified by the network.",
        zh: "NOVOVM 的设计目标是让执行结果可以由网络验证。",
      },
      {
        en: "This helps applications build trust without exposing unnecessary information or relying on a single central authority.",
        zh: "这帮助应用建立信任，同时不暴露不必要的信息，也不依赖单一中心化权威。",
      },
    ],
  },
  why: {
    title: {
      en: "Why verification matters",
      zh: "为什么验证很重要",
    },
    intro: {
      en: "In many systems, users only see the final result. They cannot easily know whether the result was produced correctly.",
      zh: "在许多系统中，用户只能看到最终结果，却很难知道这个结果是否被正确生成。",
    },
    items: [
      {
        number: "01",
        text: {
          en: "Users should not need to trust blindly.",
          zh: "用户不应该只能盲目信任。",
        },
      },
      {
        number: "02",
        text: {
          en: "Applications need results that can be checked.",
          zh: "应用需要可检查的结果。",
        },
      },
      {
        number: "03",
        text: {
          en: "Networks become stronger when verification is built in.",
          zh: "当验证能力内建其中，网络会更稳健。",
        },
      },
    ] satisfies WhyItem[],
  },
  approach: {
    title: {
      en: "How NOVOVM makes results verifiable",
      zh: "NOVOVM 如何让结果可验证",
    },
    description: [
      {
        en: "NOVOVM separates execution from trust.",
        zh: "NOVOVM 将执行与信任分离。",
      },
      {
        en: "The system can run computation, produce an output, and allow that output to be checked by the network.",
        zh: "系统可以运行计算、生成输出，并让这个输出由网络检查。",
      },
    ],
    steps: [
      {
        title: {
          en: "Input",
          zh: "输入",
        },
        description: {
          en: "A user or application sends a request.",
          zh: "用户或应用发送请求。",
        },
      },
      {
        title: {
          en: "Execution",
          zh: "执行",
        },
        description: {
          en: "The request is processed by the execution layer.",
          zh: "请求由执行层处理。",
        },
      },
      {
        title: {
          en: "Output",
          zh: "输出",
        },
        description: {
          en: "The system produces a result.",
          zh: "系统生成结果。",
        },
      },
      {
        title: {
          en: "Verification",
          zh: "验证",
        },
        description: {
          en: "The network can check whether the result is valid.",
          zh: "网络可以检查结果是否有效。",
        },
      },
    ] satisfies PipelineStep[],
  },
  enables: {
    title: {
      en: "What verifiable results enable",
      zh: "可验证结果带来什么",
    },
    items: [
      {
        label: "01",
        title: {
          en: "Trustworthy applications",
          zh: "可信应用",
        },
        paragraph: {
          en: "Applications can show that results were produced correctly.",
          zh: "应用可以表明结果是被正确生成的。",
        },
      },
      {
        label: "02",
        title: {
          en: "Transparent systems",
          zh: "透明系统",
        },
        paragraph: {
          en: "Users can rely on verification instead of promises.",
          zh: "用户可以依赖验证，而不是依赖承诺。",
        },
      },
      {
        label: "03",
        title: {
          en: "Safer networks",
          zh: "更安全的网络",
        },
        paragraph: {
          en: "Invalid or incorrect outputs can be detected more easily.",
          zh: "无效或不正确的输出可以更容易被发现。",
        },
      },
      {
        label: "04",
        title: {
          en: "Better coordination",
          zh: "更好的协同",
        },
        paragraph: {
          en: "Different participants can work together with shared confidence in the result.",
          zh: "不同参与方可以基于对结果的共同信心进行协作。",
        },
      },
    ] satisfies EnableItem[],
  },
  clarity: {
    title: {
      en: "Verification without extra noise",
      zh: "没有额外噪音的验证",
    },
    statement: {
      en: "Verification should create trust, not complexity.",
      zh: "验证应该创造信任，而不是制造复杂性。",
    },
    description: {
      en: "NOVOVM is designed to make verification part of the infrastructure, so applications can benefit from it without overwhelming users with technical details.",
      zh: "NOVOVM 将验证作为基础设施的一部分，让应用能够从中受益，同时不让用户被技术细节淹没。",
    },
    support: {
      en: "The user sees a clear result. The network handles the proof of correctness.",
      zh: "用户看到清晰结果。网络负责处理正确性的验证。",
    },
    steps: [
      {
        en: "User Result",
        zh: "用户结果",
      },
      {
        en: "Network Verification",
        zh: "网络验证",
      },
      {
        en: "Trusted Output",
        zh: "可信输出",
      },
    ] satisfies BilingualCopy[],
  },
  useCases: {
    title: {
      en: "Where verifiable results matter most",
      zh: "可验证结果最重要的场景",
    },
    description: {
      en: "Verification becomes essential when applications handle value, identity, data, or shared decisions.",
      zh: "当应用处理价值、身份、数据或共同决策时，验证会变得非常关键。",
    },
    items: [
      {
        title: {
          en: "Financial applications",
          zh: "金融应用",
        },
        description: {
          en: "Help confirm that transactions and balances are handled correctly.",
          zh: "帮助确认交易和余额被正确处理。",
        },
      },
      {
        title: {
          en: "Identity systems",
          zh: "身份系统",
        },
        description: {
          en: "Support trusted identity flows without relying only on platform promises.",
          zh: "支持可信身份流程，而不只依赖平台承诺。",
        },
      },
      {
        title: {
          en: "Enterprise workflows",
          zh: "企业工作流",
        },
        description: {
          en: "Allow organizations to coordinate around results that can be checked.",
          zh: "让组织围绕可检查的结果进行协同。",
        },
      },
      {
        title: {
          en: "AI and data systems",
          zh: "AI 与数据系统",
        },
        description: {
          en: "Help verify outputs in systems where data and computation matter.",
          zh: "在数据和计算都很重要的系统中帮助验证输出。",
        },
      },
      {
        title: {
          en: "Cross-network applications",
          zh: "跨网络应用",
        },
        description: {
          en: "Allow systems to interact with greater confidence.",
          zh: "让系统之间能以更高信心进行交互。",
        },
      },
    ] satisfies UseCaseItem[],
  },
  final: {
    title: {
      en: "Trust built into the result.",
      zh: "信任内建于结果。",
    },
    description: {
      en: "Verifiable results allow NOVOVM applications to operate with transparency, confidence, and stronger integrity.",
      zh: "可验证结果让 NOVOVM 应用以透明、可信和更强完整性运行。",
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

function VerificationHeroDiagram({ language }: { language: Language }) {
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
          src="/media/verifiable-results-visual.png"
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
            } as unknown as CSSProperties}
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

function QuietVerificationFlow({ language }: { language: Language }) {
  return (
    <Reveal className="mt-16" delay={0.12}>
      <div className="mx-auto grid max-w-xl gap-4">
        {content.clarity.steps.map((step, index) => (
          <div className="contents" key={step.en}>
            <div className="rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.62)] p-6 text-center transition-colors duration-300 hover:border-[rgba(140,216,103,0.54)]">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-green-bright">
                {resolveCopy(step, language)}
              </p>
            </div>
            {index < content.clarity.steps.length - 1 ? (
              <motion.div
                className="mx-auto h-12 w-px origin-top bg-green-bright"
                initial={{ scaleY: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, margin: "-90px" }}
                whileInView={{ scaleY: 1 }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function VerifiableResults({
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

            <VerificationHeroDiagram language={language} />
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
                {resolveCopy(content.clarity.title, language)}
              </SectionTitle>
              <p className="mx-auto mt-12 max-w-4xl text-3xl font-medium leading-tight text-text sm:text-4xl lg:text-5xl">
                {resolveCopy(content.clarity.statement, language)}
              </p>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-muted">
                {resolveCopy(content.clarity.description, language)}
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[rgba(248,242,232,0.62)]">
                {resolveCopy(content.clarity.support, language)}
              </p>
            </Reveal>
            <QuietVerificationFlow language={language} />
          </div>
        </SectionShell>

        <SectionShell>
          <Reveal>
            <SectionTitle>
              {resolveCopy(content.useCases.title, language)}
            </SectionTitle>
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
                {language === "zh" ? "探索开发者接口" : "Explore Developer APIs"}
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
