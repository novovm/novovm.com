"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  Gauge,
  Shield,
  Waypoints,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { resolveCopy } from "@/lib/language";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";
import { type BilingualCopy, type Language } from "@/lib/site-content";

type EnginePoint = {
  description: BilingualCopy;
  number: string;
  title: BilingualCopy;
};

type EngineFeature = {
  description: BilingualCopy;
  icon: LucideIcon;
  title: BilingualCopy;
};

type FlowStep = {
  description: BilingualCopy;
  title: BilingualCopy;
};

type EngineAction = {
  href: string;
  label: BilingualCopy;
  variant: "primary" | "secondary" | "text";
};

type EnginePageContent = {
  advantage: {
    actions: EngineAction[];
    description: BilingualCopy;
    title: BilingualCopy;
  };
  enables: {
    items: EngineFeature[];
    title: BilingualCopy;
  };
  fit: {
    items: EngineFeature[];
    title: BilingualCopy;
  };
  flow: {
    items: FlowStep[];
    title: BilingualCopy;
  };
  hero: {
    description: BilingualCopy;
    supporting: BilingualCopy[];
    title: BilingualCopy;
  };
  why: {
    items: EnginePoint[];
    title: BilingualCopy;
  };
};

const engineContent: EnginePageContent = {
  hero: {
    title: {
      en: "What is Execution Engine",
      zh: "什么是执行引擎",
    },
    description: {
      en: "The Execution Engine is the part of NOVOVM that runs applications and turns requests into real results.",
      zh: "执行引擎是 NOVOVM 中负责运行应用、把请求变成真实结果的核心部分。",
    },
    supporting: [
      {
        en: "If NOVOVM is the network, the engine is the part that actually gets the work done.",
        zh: "如果说 NOVOVM 是整个网络，那么引擎就是那个真正把事情做完的部分。",
      },
      {
        en: "It helps applications feel responsive, reliable, and ready for real use.",
        zh: "它让应用更有响应感、更稳定，也更接近真实可用的产品体验。",
      },
    ],
  },
  why: {
    title: {
      en: "Why it matters",
      zh: "为什么它重要",
    },
    items: [
      {
        number: "01",
        title: {
          en: "Applications need a place where work can happen.",
          zh: "应用需要一个真正做事的地方。",
        },
        description: {
          en: "Without an engine, a network is only a promise. The engine is what makes it useful.",
          zh: "没有引擎，网络就只是一个概念。真正让它变得有用的，是执行引擎。",
        },
      },
      {
        number: "02",
        title: {
          en: "People notice speed and smoothness first.",
          zh: "用户最先感受到的是速度和顺畅度。",
        },
        description: {
          en: "A better engine helps the whole product feel quicker and easier to trust.",
          zh: "更好的引擎，会让整个产品用起来更快，也更容易建立信任感。",
        },
      },
      {
        number: "03",
        title: {
          en: "This is where NOVOVM shows its real strength.",
          zh: "这里正是 NOVOVM 真正体现实力的地方。",
        },
        description: {
          en: "The engine is the core layer that shapes the experience for users and builders.",
          zh: "执行引擎是决定用户和开发者体验的核心层。",
        },
      },
    ],
  },
  enables: {
    title: {
      en: "What the engine enables",
      zh: "执行引擎带来了什么能力",
    },
    items: [
      {
        icon: Gauge,
        title: {
          en: "Faster application use",
          zh: "更快的应用体验",
        },
        description: {
          en: "It helps applications respond faster when people open, click, or use them.",
          zh: "它让用户在打开、点击和使用应用时，感受到更快的响应。",
        },
      },
      {
        icon: Blocks,
        title: {
          en: "Cleaner product flows",
          zh: "更流畅的产品流程",
        },
        description: {
          en: "A strong engine helps apps feel more direct and less fragmented.",
          zh: "好的引擎会让产品流程更直接，不容易显得零散和卡顿。",
        },
      },
      {
        icon: Waypoints,
        title: {
          en: "Support for bigger systems",
          zh: "支撑更大的系统",
        },
        description: {
          en: "It gives room for products that need to handle more activity over time.",
          zh: "它为那些未来需要承载更多活动的产品留出了空间。",
        },
      },
      {
        icon: Shield,
        title: {
          en: "More dependable results",
          zh: "更可靠的结果",
        },
        description: {
          en: "The engine helps make application behavior feel more stable and consistent.",
          zh: "它帮助应用表现得更稳定，也让结果更一致、更可预期。",
        },
      },
    ],
  },
  flow: {
    title: {
      en: "How it works",
      zh: "它是怎么工作的",
    },
    items: [
      {
        title: {
          en: "An application sends work",
          zh: "应用发起请求",
        },
        description: {
          en: "A user action or app request reaches the engine.",
          zh: "当用户点击或应用发起请求时，任务会进入执行引擎。",
        },
      },
      {
        title: {
          en: "The engine organizes it",
          zh: "引擎先进行组织",
        },
        description: {
          en: "The engine prepares that work so it can move through the network clearly.",
          zh: "引擎会先把这项工作整理清楚，再让它继续向下运行。",
        },
      },
      {
        title: {
          en: "The engine runs the task",
          zh: "引擎执行任务",
        },
        description: {
          en: "This is where the action actually gets processed.",
          zh: "真正的执行过程就在这里完成。",
        },
      },
      {
        title: {
          en: "The result returns to the app",
          zh: "结果回到应用",
        },
        description: {
          en: "The application gets the result and turns it into a user experience.",
          zh: "应用收到结果后，再把它呈现成用户能感受到的体验。",
        },
      },
    ],
  },
  fit: {
    title: {
      en: "Where it fits",
      zh: "它在整体中处于什么位置",
    },
    items: [
      {
        icon: Zap,
        title: {
          en: "At the center of execution",
          zh: "位于执行中心",
        },
        description: {
          en: "It sits at the heart of how NOVOVM runs applications.",
          zh: "它位于 NOVOVM 运行应用的中心位置。",
        },
      },
      {
        icon: Waypoints,
        title: {
          en: "Between apps and the network",
          zh: "位于应用和网络之间",
        },
        description: {
          en: "It connects what users do with what the network needs to complete.",
          zh: "它连接了用户的操作和网络要完成的事情。",
        },
      },
      {
        icon: Shield,
        title: {
          en: "Under the full experience",
          zh: "位于整体体验底层",
        },
        description: {
          en: "People may not see the engine directly, but they feel its quality in every action.",
          zh: "用户也许看不到引擎本身，但会在每一次操作里感受到它的质量。",
        },
      },
    ],
  },
  advantage: {
    title: {
      en: "The core advantage",
      zh: "核心优势",
    },
    description: {
      en: "NOVOVM is stronger when its engine makes products feel fast, ordered, and ready for real use.",
      zh: "当执行引擎让产品表现得更快、更有秩序、也更接近真实可用时，NOVOVM 的优势才会真正被感受到。",
    },
    actions: [
      {
        href: "/",
        label: {
          en: "Explore NOVOVM",
          zh: "探索 NOVOVM",
        },
        variant: "primary",
      },
      {
        href: "/novo-wallet",
        label: {
          en: "What is NOVO Wallet",
          zh: "什么是 NOVO 钱包",
        },
        variant: "secondary",
      },
      {
        href: "/what-is-nov",
        label: {
          en: "What is NOV",
          zh: "什么是 NOV",
        },
        variant: "text",
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

function FeatureCard({
  description,
  icon: Icon,
  language,
  title,
}: EngineFeature & { language: Language }) {
  return (
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
          {resolveCopy(title, language)}
        </h3>
        <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
          {resolveCopy(description, language)}
        </p>
      </div>
    </div>
  );
}

function ActionLink({
  href,
  label,
  language,
  variant,
}: EngineAction & { language: Language }) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 rounded-[6px] text-sm font-medium transition-[transform,border-color,background-color,color,box-shadow] duration-500",
        variant === "primary" &&
          "border border-green bg-green px-5 py-3 text-text hover:-translate-y-1 hover:border-gold hover:bg-[#63be4f] hover:shadow-[0_14px_30px_rgba(241,188,26,0.12)]",
        variant === "secondary" &&
          "border border-border bg-[rgba(4,0,0,0.32)] px-5 py-3 text-text hover:-translate-y-1 hover:border-gold hover:bg-[rgba(241,188,26,0.08)]",
        variant === "text" &&
          "px-0 py-3 text-muted hover:text-text",
      )}
      href={href}
    >
      <span>{resolveCopy(label, language)}</span>
      <ArrowRight
        aria-hidden="true"
        className={cn(
          "h-4 w-4 transition-[opacity,transform] duration-500",
          variant === "text"
            ? "opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
            : "group-hover:translate-x-1",
        )}
        strokeWidth={1.8}
      />
    </Link>
  );
}

function EngineFlow({ language }: { language: Language }) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal className="mt-12" delay={0.08}>
      <div className="relative grid gap-8 lg:grid-cols-4">
        <div className="absolute left-[22px] top-0 h-full w-px bg-[linear-gradient(180deg,rgba(90,181,70,0.22),rgba(140,216,103,0.55),rgba(90,181,70,0.16))] lg:left-0 lg:right-0 lg:top-[22px] lg:h-px lg:w-auto" />
        {!reduceMotion ? (
          <motion.div
            animate={{
              x: ["0%", "300%"],
            }}
            className="absolute top-[16px] hidden h-3 w-3 rounded-full bg-green-bright shadow-[0_0_12px_rgba(140,216,103,0.5)] lg:block"
            transition={{
              duration: 5.6,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ) : null}
        {!reduceMotion ? (
          <motion.div
            animate={{
              y: ["0%", "300%"],
            }}
            className="absolute left-[16px] top-0 h-3 w-3 rounded-full bg-green-bright shadow-[0_0_12px_rgba(140,216,103,0.5)] lg:hidden"
            transition={{
              duration: 5.6,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ) : null}

        {engineContent.flow.items.map((item, index) => (
          <div className="relative pl-14 lg:pl-0" key={item.title.en}>
            <div className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(90,181,70,0.24)] bg-[rgba(4,0,0,0.72)] text-xs font-medium tracking-[0.28em] text-green-bright lg:relative lg:mx-auto">
              {`0${index + 1}`}
            </div>
            <div className="interactive-card calm-panel calm-panel-hover mt-4 rounded-[8px] p-5 sm:p-6 lg:mt-6">
              <h3 className="text-xl leading-tight text-text">
                {resolveCopy(item.title, language)}
              </h3>
              <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
                {resolveCopy(item.description, language)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function ExecutionEngine({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);

  return (
    <>
      <DetailPageHeader
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      <main className="bg-background pt-[72px]">
        <section className="relative overflow-hidden px-5 sm:px-6 lg:px-8">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.16]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(90,181,70,0.05),transparent)]" />

          <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-7xl items-center gap-12 py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,0.72fr)] lg:py-24">
            <Reveal className="max-w-[760px]">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[rgba(90,181,70,0.56)]">
                {resolveCopy(engineContent.hero.title, language)}
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-none text-text sm:text-5xl lg:text-[5.1rem]">
                {language === "zh" ? "执行引擎" : "Execution Engine"}
              </h1>
              <p className="mt-10 max-w-3xl text-xl leading-8 text-[rgba(245,242,232,0.9)] sm:text-2xl sm:leading-9">
                {resolveCopy(engineContent.hero.description, language)}
              </p>

              <div className="mt-10 space-y-5">
                {engineContent.hero.supporting.map((paragraph) => (
                  <div key={paragraph.en}>
                    <p className="text-sm leading-7 text-[rgba(245,242,232,0.82)] sm:text-base">
                      {resolveCopy(paragraph, language)}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="grid gap-4">
                {[
                  {
                    en: "Run",
                    zh: "执行",
                  },
                  {
                    en: "Organize",
                    zh: "组织",
                  },
                  {
                    en: "Return",
                    zh: "返回结果",
                  },
                ].map((point, index) => (
                  <div
                    className="interactive-card calm-panel calm-panel-hover rounded-[8px] p-5 sm:p-6"
                    key={point.en}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-[rgba(90,181,70,0.48)]">
                      {`0${index + 1}`}
                    </p>
                    <p className="mt-4 text-xl leading-tight text-text">
                      {resolveCopy(point, language)}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={engineContent.why.title} />
            <div className="mt-12">
              {engineContent.why.items.map((item, index) => (
                <Reveal delay={index * 0.08} key={item.number}>
                  <div className="group grid gap-5 border-b border-[rgba(90,181,70,0.16)] py-8 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-10">
                    <div className="pt-1">
                      <p className="text-xs font-medium tracking-[0.32em] text-[rgba(90,181,70,0.42)] transition-colors duration-500 group-hover:text-green-bright">
                        {item.number}
                      </p>
                    </div>
                    <div className="max-w-4xl">
                      <p className="text-2xl leading-tight text-text sm:text-[2rem]">
                        {resolveCopy(item.title, language)}
                      </p>
                      <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
                        {resolveCopy(item.description, language)}
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
            <SectionHeading
              language={language}
              title={engineContent.enables.title}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {engineContent.enables.items.map((item, index) => (
                <Reveal className="h-full" delay={index * 0.08} key={item.title.en}>
                  <FeatureCard {...item} language={language} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={engineContent.flow.title} />
            <EngineFlow language={language} />
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={engineContent.fit.title} />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {engineContent.fit.items.map((item, index) => (
                <Reveal delay={index * 0.08} key={item.title.en}>
                  <FeatureCard {...item} language={language} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              language={language}
              title={engineContent.advantage.title}
            />
            <Reveal className="mt-6 max-w-3xl" delay={0.08}>
              <p className="text-base leading-7 text-[rgba(245,242,232,0.82)]">
                {resolveCopy(engineContent.advantage.description, language)}
              </p>
            </Reveal>
            <Reveal
              className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
              delay={0.16}
            >
              {engineContent.advantage.actions.map((action) => (
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
