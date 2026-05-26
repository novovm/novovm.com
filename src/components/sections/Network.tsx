"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import {
  ArrowRight,
  Gauge,
  Globe,
  Route,
  Shield,
  Waypoints,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { resolveCopy } from "@/lib/language";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";
import { type BilingualCopy, type Language } from "@/lib/site-content";

type NetworkPoint = {
  description: BilingualCopy;
  number: string;
  title: BilingualCopy;
};

type NetworkFeature = {
  description: BilingualCopy;
  icon: LucideIcon;
  title: BilingualCopy;
};

type NetworkStage = {
  description: BilingualCopy;
  eyebrow: BilingualCopy;
  title: BilingualCopy;
};

type NetworkAction = {
  href: string;
  label: BilingualCopy;
  variant: "primary" | "secondary" | "text";
};

type NetworkPageContent = {
  difference: {
    items: NetworkFeature[];
    title: BilingualCopy;
  };
  enables: {
    items: NetworkFeature[];
    title: BilingualCopy;
  };
  final: {
    actions: NetworkAction[];
    description: BilingualCopy;
    title: BilingualCopy;
  };
  fit: {
    items: NetworkStage[];
    title: BilingualCopy;
  };
  hero: {
    description: BilingualCopy;
    note: BilingualCopy;
    supporting: BilingualCopy[];
    title: BilingualCopy;
  };
  why: {
    items: NetworkPoint[];
    title: BilingualCopy;
  };
};

const networkContent: NetworkPageContent = {
  hero: {
    title: {
      en: "What is Network",
      zh: "什么是网络",
    },
    description: {
      en: "The NOVOVM Network is the distributed layer that keeps applications connected across real, uneven network conditions.",
      zh: "NOVOVM 的网络是一个分布式连接层，它让应用在真实且并不稳定的网络环境中持续保持连接。",
    },
    supporting: [
      {
        en: "It links users, applications, and infrastructure into one working system.",
        zh: "它把用户、应用和基础设施连接成一个真正可运行的系统。",
      },
      {
        en: "It is built to stay useful even when connections are weaker, slower, or less consistent.",
        zh: "即使连接更弱、更慢，或者不够稳定，它也会尽量保持可用。",
      },
    ],
    note: {
      en: "Designed for real use, not only perfect conditions.",
      zh: "为真实使用而设计，而不只是为理想环境设计。",
    },
  },
  why: {
    title: {
      en: "Why network reliability matters",
      zh: "为什么网络可靠性很重要",
    },
    items: [
      {
        number: "01",
        title: {
          en: "Real users do not live on perfect connections.",
          zh: "真实用户并不总处在理想网络里。",
        },
        description: {
          en: "People move between places, devices, and network quality. Infrastructure has to remain useful anyway.",
          zh: "用户会在不同地点、设备和网络质量之间切换，基础设施必须在这种变化中依然可用。",
        },
      },
      {
        number: "02",
        title: {
          en: "Reliability shapes trust very quickly.",
          zh: "可靠性会很快决定用户是否信任。",
        },
        description: {
          en: "If the network fails too easily, the whole application feels uncertain, even when the design looks good.",
          zh: "如果网络太容易失效，即使界面看起来不错，整个应用也会显得不可靠。",
        },
      },
      {
        number: "03",
        title: {
          en: "Weak-network support expands what can be built.",
          zh: "支持弱网，会直接拓宽可构建的产品范围。",
        },
        description: {
          en: "When a network stays steady under weaker conditions, more products become practical for everyday use.",
          zh: "当网络在较弱条件下也能保持稳定时，更多产品才能真正进入日常使用场景。",
        },
      },
    ],
  },
  difference: {
    title: {
      en: "How NOVOVM is different",
      zh: "NOVOVM 的网络有什么不同",
    },
    items: [
      {
        icon: Wifi,
        title: {
          en: "Not only for ideal conditions",
          zh: "不是只为理想网络准备",
        },
        description: {
          en: "It is designed to remain helpful when the connection is weaker or less even.",
          zh: "即使连接更弱、波动更大，它也会尽量保持有用和可达。",
        },
      },
      {
        icon: Route,
        title: {
          en: "A clearer path for activity",
          zh: "让活动走一条更清晰的路径",
        },
        description: {
          en: "It gives requests and responses a calmer route through the system.",
          zh: "它让请求和结果在系统中有一条更平稳、更清楚的路径。",
        },
      },
      {
        icon: Globe,
        title: {
          en: "Distributed by design",
          zh: "天生就是分布式的",
        },
        description: {
          en: "The network is not meant to depend on one place or one point of control.",
          zh: "这张网络并不是建立在单一点位或单一控制上。",
        },
      },
      {
        icon: Shield,
        title: {
          en: "Built for continuity",
          zh: "目标是持续可用",
        },
        description: {
          en: "Its job is to keep products feeling available instead of fragile.",
          zh: "它的目标是让产品保持可用，而不是显得脆弱易断。",
        },
      },
    ],
  },
  enables: {
    title: {
      en: "What the network enables",
      zh: "这张网络能带来什么",
    },
    items: [
      {
        icon: Globe,
        title: {
          en: "Use applications in more places",
          zh: "让应用在更多场景里可用",
        },
        description: {
          en: "Applications can stay helpful whether people are at home, at work, or moving between networks.",
          zh: "无论用户在家里、在办公室，还是在不同网络之间切换，应用都能尽量保持可用。",
        },
      },
      {
        icon: Waypoints,
        title: {
          en: "Connect real systems",
          zh: "连接真实世界中的系统",
        },
        description: {
          en: "Teams can connect software, devices, and services into one shared operating layer.",
          zh: "团队可以把软件、设备和服务连接成一个统一的运行层。",
        },
      },
      {
        icon: Gauge,
        title: {
          en: "Reduce friction in the path",
          zh: "减少路径中的阻滞感",
        },
        description: {
          en: "Requests and responses move through the system with less interruption.",
          zh: "请求和结果在系统中传递时，会尽量减少中断和卡顿感。",
        },
      },
      {
        icon: Shield,
        title: {
          en: "Support services people can trust",
          zh: "支撑更值得信任的服务",
        },
        description: {
          en: "A steadier network helps the whole product feel more dependable over time.",
          zh: "更稳定的网络，会让整个产品长期看起来更可靠。",
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
        eyebrow: {
          en: "Start",
          zh: "开始",
        },
        title: {
          en: "People and applications begin the request",
          zh: "用户和应用发起请求",
        },
        description: {
          en: "Every action starts with someone trying to use a product or service.",
          zh: "每一次运行，都是从用户或应用发起一个动作开始的。",
        },
      },
      {
        eyebrow: {
          en: "Carry",
          zh: "承载",
        },
        title: {
          en: "The network carries activity across the system",
          zh: "网络在系统中承载活动",
        },
        description: {
          en: "This is the layer that keeps requests, coordination, and results moving between parts.",
          zh: "这就是那一层，把请求、协调过程和结果在不同部分之间继续传递下去。",
        },
      },
      {
        eyebrow: {
          en: "Return",
          zh: "返回",
        },
        title: {
          en: "Products receive results that still feel connected",
          zh: "产品收到仍然连贯的结果",
        },
        description: {
          en: "Users do not need to see the network. They feel it when the experience keeps working.",
          zh: "用户不需要看见这张网络，但当体验持续可用时，他们会感受到它。",
        },
      },
    ],
  },
  final: {
    title: {
      en: "A network built for the real world",
      zh: "一张为真实世界而设计的网络",
    },
    description: {
      en: "NOVOVM is not trying to be a network that only looks good on paper. It is trying to be infrastructure that stays useful when people, places, and connections are imperfect.",
      zh: "NOVOVM 追求的不是一张只在纸面上看起来很好的网络，而是在真实的人、地点和连接都不完美时，依然保持有用的基础设施。",
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
        href: "/execution-engine",
        label: {
          en: "Execution Engine",
          zh: "执行引擎",
        },
        variant: "secondary",
      },
      {
        href: "/novo-wallet",
        label: {
          en: "NOVO Wallet",
          zh: "NOVO 钱包",
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
}: NetworkFeature & { language: Language }) {
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
}: NetworkAction & { language: Language }) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 rounded-[6px] text-sm font-medium transition-[transform,border-color,background-color,color,box-shadow] duration-500",
        variant === "primary" &&
          "border border-green bg-green px-5 py-3 text-text hover:-translate-y-1 hover:border-gold hover:bg-[#63be4f] hover:shadow-[0_14px_30px_rgba(241,188,26,0.12)]",
        variant === "secondary" &&
          "border border-border bg-[rgba(4,0,0,0.32)] px-5 py-3 text-text hover:-translate-y-1 hover:border-gold hover:bg-[rgba(241,188,26,0.08)]",
        variant === "text" && "px-0 py-3 text-muted hover:text-text",
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

function NetworkDiagram({ language }: { language: Language }) {
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
    <Reveal className="w-full max-w-[660px] lg:ml-auto" delay={0.12}>
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.012, 1],
                y: [0, -10, 0],
              }
        }
        className="relative cursor-none overflow-hidden"
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
                duration: 6.8,
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
          alt={language === "zh" ? "NOVOVM 网络视觉图" : "NOVOVM network visual"}
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
      </motion.div>
    </Reveal>
  );
}

export function Network({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);
  const reduceMotion = useReducedMotion();

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

          <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-7xl items-center gap-12 py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.78fr)] lg:py-24">
            <Reveal className="max-w-[760px]">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[rgba(90,181,70,0.56)]">
                {resolveCopy(networkContent.hero.title, language)}
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-none text-text sm:text-5xl lg:text-[5.1rem]">
                {language === "zh" ? "网络" : "Network"}
              </h1>
              <p className="mt-10 max-w-3xl text-xl leading-8 text-[rgba(245,242,232,0.9)] sm:text-2xl sm:leading-9">
                {resolveCopy(networkContent.hero.description, language)}
              </p>

              <div className="mt-10 space-y-5">
                {networkContent.hero.supporting.map((paragraph) => (
                  <div key={paragraph.en}>
                    <p className="text-sm leading-7 text-[rgba(245,242,232,0.82)] sm:text-base">
                      {resolveCopy(paragraph, language)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 inline-flex max-w-[520px] rounded-[8px] border border-[rgba(90,181,70,0.16)] bg-[rgba(4,0,0,0.5)] px-4 py-3">
                <p className="text-sm leading-6 text-[rgba(245,242,232,0.82)]">
                  {resolveCopy(networkContent.hero.note, language)}
                </p>
              </div>
            </Reveal>

            <NetworkDiagram language={language} />
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={networkContent.why.title} />
            <div className="mt-12">
              {networkContent.why.items.map((item, index) => (
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
              title={networkContent.difference.title}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {networkContent.difference.items.map((item, index) => (
                <Reveal className="h-full" delay={index * 0.08} key={item.title.en}>
                  <FeatureCard {...item} language={language} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={networkContent.enables.title} />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {networkContent.enables.items.map((item, index) => (
                <Reveal className="h-full" delay={index * 0.08} key={item.title.en}>
                  <FeatureCard {...item} language={language} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading language={language} title={networkContent.fit.title} />
            <Reveal className="mt-12" delay={0.08}>
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)_40px_minmax(0,1fr)] lg:items-center">
                {networkContent.fit.items.map((item, index) => (
                  <div className="contents" key={item.title.en}>
                    <div className="interactive-card calm-panel calm-panel-hover rounded-[8px] p-6 sm:p-7">
                      <p className="text-xs font-medium uppercase tracking-[0.28em] text-[rgba(90,181,70,0.48)]">
                        {resolveCopy(item.eyebrow, language)}
                      </p>
                      <h3 className="mt-5 text-2xl leading-tight text-text">
                        {resolveCopy(item.title, language)}
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
                        {resolveCopy(item.description, language)}
                      </p>
                    </div>
                    {index < networkContent.fit.items.length - 1 ? (
                      <div className="hidden justify-center lg:flex">
                        {reduceMotion ? (
                          <ArrowRight
                            aria-hidden="true"
                            className="h-5 w-5 text-[rgba(90,181,70,0.4)]"
                            strokeWidth={1.75}
                          />
                        ) : (
                          <motion.div
                            animate={{ x: [0, 6, 0] }}
                            transition={{
                              duration: 2.8,
                              ease: "easeInOut",
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <ArrowRight
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
            <SectionHeading language={language} title={networkContent.final.title} />
            <Reveal className="mt-6 max-w-3xl" delay={0.08}>
              <p className="text-base leading-7 text-[rgba(245,242,232,0.82)]">
                {resolveCopy(networkContent.final.description, language)}
              </p>
            </Reveal>
            <Reveal
              className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
              delay={0.16}
            >
              {networkContent.final.actions.map((action) => (
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
