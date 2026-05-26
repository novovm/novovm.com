"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, Gauge, Layers3, ShieldCheck, Waypoints } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { resolveCopy } from "@/lib/language";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";
import { type BilingualCopy, type Language } from "@/lib/site-content";

type WhyItem = {
  number: string;
  text: BilingualCopy;
};

type FeatureItem = {
  description: BilingualCopy;
  icon: typeof Gauge;
  title: BilingualCopy;
};

type FlowStep = {
  title: BilingualCopy;
};

type ActionItem = {
  href: string;
  label: BilingualCopy;
  variant: "primary" | "secondary";
};

type ParallelExecutionContent = {
  enables: {
    items: FeatureItem[];
    title: BilingualCopy;
  };
  final: {
    actions: ActionItem[];
    description: BilingualCopy[];
    title: BilingualCopy;
  };
  fit: {
    description: BilingualCopy[];
    stack: BilingualCopy[];
    title: BilingualCopy;
  };
  hero: {
    description: BilingualCopy[];
    eyebrow: BilingualCopy;
    subtitle: BilingualCopy;
    title: BilingualCopy;
  };
  how: {
    description: BilingualCopy[];
    steps: FlowStep[];
    title: BilingualCopy;
  };
  why: {
    items: WhyItem[];
    title: BilingualCopy;
  };
};

const parallelExecutionContent: ParallelExecutionContent = {
  hero: {
    eyebrow: {
      en: "Core Technology / Runtime",
      zh: "核心技术 / 运行时",
    },
    title: {
      en: "Parallel Execution",
      zh: "并行执行",
    },
    subtitle: {
      en: "Process multiple independent tasks at the same time.",
      zh: "让多个互不依赖的任务同时处理。",
    },
    description: [
      {
        en: "Traditional systems often force all transactions and computations through a single execution path.",
        zh: "传统系统常常把所有交易和计算都压到同一条执行路径里。",
      },
      {
        en: "NOVOVM separates workloads and runs them in parallel, allowing the system to remain responsive as demand increases.",
        zh: "NOVOVM 会先分离工作负载，再并行处理独立任务，因此在需求增长时依然尽量保持响应。",
      },
    ],
  },
  why: {
    title: {
      en: "Why parallel execution matters",
      zh: "为什么并行执行重要",
    },
    items: [
      {
        number: "01",
        text: {
          en: "More users should not slow the system down.",
          zh: "更多用户不应让系统明显变慢。",
        },
      },
      {
        number: "02",
        text: {
          en: "Applications need consistent and predictable performance.",
          zh: "应用需要稳定且可预期的性能。",
        },
      },
      {
        number: "03",
        text: {
          en: "Infrastructure must scale with demand.",
          zh: "基础设施必须随着需求一起扩展。",
        },
      },
    ],
  },
  how: {
    title: {
      en: "How NOVOVM handles execution",
      zh: "NOVOVM 如何处理执行",
    },
    description: [
      {
        en: "NOVOVM organizes execution into structured lanes.",
        zh: "NOVOVM 会把执行组织成清晰的通道。",
      },
      {
        en: "Independent tasks move through the system in parallel, while conflicting operations are handled carefully to keep results consistent.",
        zh: "彼此独立的任务会并行向前推进，而可能相互影响的操作会被谨慎处理，以保持结果一致。",
      },
    ],
    steps: [
      {
        title: {
          en: "Input Requests",
          zh: "输入请求",
        },
      },
      {
        title: {
          en: "Workload Separation",
          zh: "负载分离",
        },
      },
      {
        title: {
          en: "Parallel Execution Lanes",
          zh: "并行执行通道",
        },
      },
      {
        title: {
          en: "Verified Results",
          zh: "验证结果",
        },
      },
    ],
  },
  enables: {
    title: {
      en: "What parallel execution enables",
      zh: "并行执行带来什么",
    },
    items: [
      {
        icon: Gauge,
        title: {
          en: "Higher throughput",
          zh: "更高吞吐",
        },
        description: {
          en: "Process more work in the same amount of time.",
          zh: "在同样时间内处理更多工作。",
        },
      },
      {
        icon: Waypoints,
        title: {
          en: "Lower latency",
          zh: "更低延迟",
        },
        description: {
          en: "Reduce waiting time for users and applications.",
          zh: "减少用户和应用的等待时间。",
        },
      },
      {
        icon: ShieldCheck,
        title: {
          en: "Stable performance",
          zh: "稳定性能",
        },
        description: {
          en: "Remain responsive under heavy workloads.",
          zh: "在高负载下依然保持响应。",
        },
      },
      {
        icon: Layers3,
        title: {
          en: "Scalable systems",
          zh: "可扩展系统",
        },
        description: {
          en: "Grow without redesigning the entire architecture.",
          zh: "增长时不必重做整套架构。",
        },
      },
    ],
  },
  fit: {
    title: {
      en: "Where it fits in NOVOVM",
      zh: "它在 NOVOVM 中处于什么位置",
    },
    description: [
      {
        en: "Parallel execution is part of the runtime layer.",
        zh: "并行执行属于运行时层。",
      },
      {
        en: "Applications and wallets send requests. The execution engine organizes the workload. The network distributes and delivers results.",
        zh: "应用和钱包发送请求。执行引擎整理工作负载。网络再分发并返回结果。",
      },
    ],
    stack: [
      {
        en: "Applications / Wallets",
        zh: "应用 / 钱包",
      },
      {
        en: "Execution Engine (Parallel Runtime)",
        zh: "执行引擎（并行运行时）",
      },
      {
        en: "Network / Results",
        zh: "网络 / 结果",
      },
    ],
  },
  final: {
    title: {
      en: "Built for real-world workloads",
      zh: "为真实世界负载而构建",
    },
    description: [
      {
        en: "Parallel execution allows NOVOVM to handle growing demand without sacrificing speed or reliability.",
        zh: "并行执行让 NOVOVM 在需求增长时，仍然尽量不牺牲速度和可靠性。",
      },
      {
        en: "It helps the system remain usable as applications and users scale.",
        zh: "随着应用和用户规模扩大，它依然有助于系统保持可用。",
      },
    ],
    actions: [
      {
        href: "/#core-technology",
        label: {
          en: "Back to Core Technology",
          zh: "返回核心技术",
        },
        variant: "secondary",
      },
      {
        href: "/execution-engine",
        label: {
          en: "Explore Execution Engine",
          zh: "查看执行引擎",
        },
        variant: "primary",
      },
    ],
  },
};

function SectionHeading({
  language,
  title,
}: {
  language: Language;
  title: BilingualCopy;
}) {
  return (
    <Reveal>
      <h2 className="max-w-4xl text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
        {resolveCopy(title, language)}
      </h2>
    </Reveal>
  );
}

function ActionLink({
  href,
  label,
  language,
  variant,
}: ActionItem & { language: Language }) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 rounded-[6px] text-sm font-medium transition-[transform,border-color,background-color,color,box-shadow] duration-500",
        variant === "primary" &&
          "border border-green bg-green px-5 py-3 text-text hover:-translate-y-1 hover:border-gold hover:bg-[#63be4f] hover:shadow-[0_14px_30px_rgba(241,188,26,0.12)]",
        variant === "secondary" &&
          "border border-border bg-[rgba(4,0,0,0.32)] px-5 py-3 text-text hover:-translate-y-1 hover:border-gold hover:bg-[rgba(241,188,26,0.08)]",
      )}
      href={href}
    >
      <span>{resolveCopy(label, language)}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
        strokeWidth={1.8}
      />
    </Link>
  );
}

function ParallelLanesDiagram({ language }: { language: Language }) {
  const reduceMotion = useReducedMotion();
  const previousPointerRef = useRef<{ left: number; time: number; top: number } | null>(null);
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
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -4, 0],
              }
        }
        className="relative cursor-none overflow-hidden rounded-[28px] bg-transparent"
        onPointerEnter={handleShipMove}
        onPointerLeave={() => {
          previousPointerRef.current = null;
          setIsShipVisible(false);
          setFlameStrength(0.22);
        }}
        onPointerMove={handleShipMove}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 7,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }
        }
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-14%] bg-[radial-gradient(circle_at_center,rgba(90,181,70,0.12),transparent_58%)]"
        />
        <Image
          alt={language === "zh" ? "并行执行交互图" : "Parallel execution interaction visual"}
          className="relative h-auto w-full object-contain opacity-95 [mask-image:radial-gradient(ellipse_at_center,black_52%,rgba(0,0,0,0.72)_68%,rgba(0,0,0,0.2)_82%,transparent_96%)]"
          height={1024}
          priority
          src="/media/network-visual.png"
          width={1024}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,transparent_18%,transparent_82%,var(--background)_100%),linear-gradient(180deg,var(--background)_0%,transparent_16%,transparent_82%,var(--background)_100%)]"
        />
        {isShipVisible ? (
          <motion.div
            aria-hidden="true"
            className="cursor-ship pointer-events-none absolute z-30 h-[74px] w-[118px] overflow-visible sm:h-[86px] sm:w-[138px]"
            style={
              {
                "--flame-scale": 0.5 + flameStrength * 1.15,
                "--flame-strength": 0.34 + flameStrength * 0.66,
                left: 0,
                top: 0,
                x: springX,
                y: springY,
              } as unknown as CSSProperties
            }
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
      </motion.div>
    </Reveal>
  );
}

function PipelineDiagram({ language }: { language: Language }) {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(2);
  const steps = parallelExecutionContent.how.steps;

  return (
    <Reveal className="mt-12" delay={0.08}>
      <div className="relative grid gap-5 lg:grid-cols-4">
        <div className="absolute left-[22px] top-0 h-full w-px bg-[linear-gradient(180deg,rgba(90,181,70,0.22),rgba(140,216,103,0.55),rgba(90,181,70,0.16))] lg:left-0 lg:right-0 lg:top-[22px] lg:h-px lg:w-auto" />
        {!reduceMotion ? (
          <motion.div
            animate={{ x: ["0%", "300%"] }}
            className="absolute top-[16px] hidden h-3 w-3 rounded-full bg-green-bright shadow-[0_0_12px_rgba(140,216,103,0.5)] lg:block"
            transition={{
              duration: 5.2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ) : null}
        {!reduceMotion ? (
          <motion.div
            animate={{ y: ["0%", "300%"] }}
            className="absolute left-[16px] top-0 h-3 w-3 rounded-full bg-green-bright shadow-[0_0_12px_rgba(140,216,103,0.5)] lg:hidden"
            transition={{
              duration: 5.2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ) : null}

        {steps.map((step, index) => {
          const active = activeStep === index;

          return (
            <div className="relative pl-14 lg:pl-0" key={step.title.en}>
              <button
                className="group relative w-full text-left"
                onFocus={() => setActiveStep(index)}
                onMouseEnter={() => setActiveStep(index)}
                type="button"
              >
                <div className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(90,181,70,0.24)] bg-[rgba(4,0,0,0.72)] text-xs font-medium tracking-[0.28em] text-green-bright lg:relative lg:mx-auto">
                  {`0${index + 1}`}
                </div>
                <div
                  className={cn(
                    "interactive-card calm-panel calm-panel-hover mt-4 rounded-[8px] p-5 sm:p-6 lg:mt-6",
                    active &&
                      "border-[rgba(140,216,103,0.55)] bg-[rgba(13,18,13,0.72)]",
                  )}
                >
                  <h3 className="text-xl leading-tight text-text">
                    {resolveCopy(step.title, language)}
                  </h3>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

export function ParallelExecution({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);
  const reduceMotion = useReducedMotion();

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
        <section className="relative overflow-hidden px-5 sm:px-6 lg:px-8">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.16]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(90,181,70,0.05),transparent)]" />

          <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-7xl items-center gap-12 py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.78fr)] lg:py-24">
            <Reveal className="max-w-[760px]">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[rgba(90,181,70,0.56)]">
                {resolveCopy(parallelExecutionContent.hero.eyebrow, language)}
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-none text-text sm:text-5xl lg:text-[5.1rem]">
                {resolveCopy(parallelExecutionContent.hero.title, language)}
              </h1>
              <p className="mt-10 max-w-3xl text-xl leading-8 text-[rgba(245,242,232,0.9)] sm:text-2xl sm:leading-9">
                {resolveCopy(parallelExecutionContent.hero.subtitle, language)}
              </p>

              <div className="mt-10 space-y-5">
                {parallelExecutionContent.hero.description.map((paragraph) => (
                  <p
                    className="text-sm leading-7 text-[rgba(245,242,232,0.82)] sm:text-base"
                    key={paragraph.en}
                  >
                    {resolveCopy(paragraph, language)}
                  </p>
                ))}
              </div>
            </Reveal>

            <ParallelLanesDiagram language={language} />
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={parallelExecutionContent.why.title} />
            <div className="mt-12">
              {parallelExecutionContent.why.items.map((item, index) => (
                <Reveal delay={index * 0.08} key={item.number}>
                  <div className="group grid gap-5 border-b border-[rgba(90,181,70,0.16)] py-8 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-10">
                    <div className="pt-1">
                      <p className="text-xs font-medium tracking-[0.32em] text-[rgba(90,181,70,0.42)] transition-colors duration-500 group-hover:text-green-bright">
                        {item.number}
                      </p>
                    </div>
                    <div className="max-w-4xl">
                      <p className="text-2xl leading-tight text-text sm:text-[2rem]">
                        {resolveCopy(item.text, language)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={parallelExecutionContent.how.title} />
            <Reveal className="mt-6 max-w-3xl" delay={0.08}>
              {parallelExecutionContent.how.description.map((paragraph) => (
                <p
                  className="mt-3 text-base leading-7 text-[rgba(245,242,232,0.82)] first:mt-0"
                  key={paragraph.en}
                >
                  {resolveCopy(paragraph, language)}
                </p>
              ))}
            </Reveal>
            <PipelineDiagram language={language} />
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              language={language}
              title={parallelExecutionContent.enables.title}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {parallelExecutionContent.enables.items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal className="h-full" delay={index * 0.08} key={item.title.en}>
                    <div className="interactive-card calm-panel calm-panel-hover group h-full rounded-[8px] p-6 sm:p-7">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(4,0,0,0.42)] text-[rgba(245,242,232,0.9)]">
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                        />
                      </div>
                      <div className="mt-6">
                        <h3 className="text-xl leading-tight text-text">
                          {resolveCopy(item.title, language)}
                        </h3>
                        <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
                          {resolveCopy(item.description, language)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={parallelExecutionContent.fit.title} />
            <Reveal className="mt-6 max-w-3xl" delay={0.08}>
              {parallelExecutionContent.fit.description.map((paragraph) => (
                <p
                  className="mt-3 text-base leading-7 text-[rgba(245,242,232,0.82)] first:mt-0"
                  key={paragraph.en}
                >
                  {resolveCopy(paragraph, language)}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-12" delay={0.12}>
              <div className="mx-auto grid max-w-2xl gap-4">
                {parallelExecutionContent.fit.stack.map((item, index) => (
                  <div className="contents" key={item.en}>
                    <div className="interactive-card calm-panel calm-panel-hover rounded-[8px] p-6 text-center sm:p-7">
                      <p className="text-xl leading-tight text-text">
                        {resolveCopy(item, language)}
                      </p>
                    </div>
                    {index < parallelExecutionContent.fit.stack.length - 1 ? (
                      <div className="flex justify-center">
                        {reduceMotion ? (
                          <ArrowDown
                            aria-hidden="true"
                            className="h-5 w-5 text-[rgba(90,181,70,0.4)]"
                            strokeWidth={1.75}
                          />
                        ) : (
                          <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{
                              duration: 2.6,
                              ease: "easeInOut",
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <ArrowDown
                              aria-hidden="true"
                              className="h-5 w-5 text-[rgba(90,181,70,0.4)]"
                              strokeWidth={1.75}
                            />
                          </motion.div>
                        )}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={parallelExecutionContent.final.title} />
            <Reveal className="mt-6 max-w-3xl" delay={0.08}>
              {parallelExecutionContent.final.description.map((paragraph) => (
                <p
                  className="mt-3 text-base leading-7 text-[rgba(245,242,232,0.82)] first:mt-0"
                  key={paragraph.en}
                >
                  {resolveCopy(paragraph, language)}
                </p>
              ))}
            </Reveal>
            <Reveal
              className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
              delay={0.16}
            >
              {parallelExecutionContent.final.actions.map((action) => (
                <ActionLink
                  {...action}
                  key={action.label.en}
                  language={language}
                />
              ))}
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
