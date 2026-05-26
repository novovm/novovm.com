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
  description: BilingualCopy;
  number: string;
  title: BilingualCopy;
};

type PerspectiveItem = {
  description: BilingualCopy;
  title: BilingualCopy;
};

type PipelineStep = {
  description: BilingualCopy;
  title: BilingualCopy;
};

type UserActionItem = {
  label: string;
  description: BilingualCopy;
  title: BilingualCopy;
};

type UseCaseItem = {
  description: BilingualCopy;
  title: BilingualCopy;
};

const content = {
  hero: {
    eyebrow: {
      en: "Core Technology / Quantum-Resistant Security",
      zh: "核心技术 / 抗量子安全",
    },
    title: {
      en: "Built for the quantum era.",
      zh: "为量子时代而设计。",
    },
    subtitle: {
      en: "Future network security must be prepared before future threats arrive.",
      zh: "未来网络安全，必须在威胁成为现实之前提前准备。",
    },
    description: [
      {
        en: "Quantum computing may challenge many cryptographic systems that protect today’s internet and blockchain networks.",
        zh: "量子计算未来可能会挑战今天互联网和区块链网络所依赖的许多密码系统。",
      },
      {
        en: "NOVOVM is designed with long-term security assumptions in mind, so the network can evolve toward stronger post-quantum protection as the ecosystem grows.",
        zh: "NOVOVM 从一开始就以长期安全假设为前提来设计，因此网络可以随着生态成长，逐步演进到更强的后量子保护。",
      },
    ],
  },
  why: {
    title: {
      en: "Why quantum security matters",
      zh: "为什么量子安全重要",
    },
    intro: {
      en: "Most users do not need to understand quantum computing. But the systems that protect their assets, identities, and applications must be prepared for it.",
      zh: "多数用户并不需要理解量子计算本身，但保护他们资产、身份和应用的系统，必须提前为它做好准备。",
    },
    items: [
      {
        number: "01",
        title: {
          en: "Today’s security depends on cryptography.",
          zh: "今天的安全依赖密码学。",
        },
        description: {
          en: "Passwords, signatures, wallets, transactions, and network trust all rely on cryptographic systems.",
          zh: "密码、签名、钱包、交易，以及网络信任，都建立在密码系统之上。",
        },
      },
      {
        number: "02",
        title: {
          en: "Quantum computing may change the security assumptions.",
          zh: "量子计算可能改变当前的安全假设。",
        },
        description: {
          en: "Future quantum computers may challenge some of the cryptographic methods used today.",
          zh: "未来的量子计算机，可能会挑战今天仍在广泛使用的某些密码方法。",
        },
      },
      {
        number: "03",
        title: {
          en: "Infrastructure should prepare early.",
          zh: "基础设施应该提前准备。",
        },
        description: {
          en: "Networks that expect long-term use should plan for future security risks before they become urgent.",
          zh: "任何希望长期运行的网络，都应该在未来风险变得紧迫之前就开始规划。",
        },
      },
    ] satisfies WhyItem[],
  },
  meaning: {
    title: {
      en: "What quantum-resistant security means",
      zh: "什么是抗量子安全",
    },
    statement: {
      en: "Quantum-resistant security is not a slogan. It is a long-term design direction.",
      zh: "抗量子安全不是一句口号，而是一种长期设计方向。",
    },
    description: {
      en: "It means the network is designed to support cryptographic methods and security upgrades that are better prepared for future quantum-era risks.",
      zh: "它意味着网络在设计上会支持那些更适合未来量子时代风险的密码方法与安全升级能力。",
    },
    perspectives: [
      {
        title: {
          en: "User",
          zh: "用户",
        },
        description: {
          en: "NOVOVM is built with future protection in mind, so users are not depending only on today’s assumptions.",
          zh: "NOVOVM 在设计时就考虑未来保护能力，用户不必只依赖今天的安全假设。",
        },
      },
      {
        title: {
          en: "Developer",
          zh: "开发者",
        },
        description: {
          en: "Security is considered at the infrastructure layer instead of being added only after products are launched.",
          zh: "安全能力会在基础设施层就被考虑，而不是等产品上线后再补上。",
        },
      },
      {
        title: {
          en: "Enterprise",
          zh: "企业",
        },
        description: {
          en: "The network is designed around long-term resilience, which matters when systems must stay reliable for years.",
          zh: "网络以长期韧性为目标来设计，这对需要多年稳定运行的系统尤其重要。",
        },
      },
    ] satisfies PerspectiveItem[],
  },
  approach: {
    title: {
      en: "How NOVOVM approaches quantum-resistant security",
      zh: "NOVOVM 如何处理抗量子安全",
    },
    description: [
      {
        en: "NOVOVM approaches quantum-resistant security as part of the network foundation.",
        zh: "NOVOVM 把抗量子安全视为网络基础的一部分。",
      },
      {
        en: "It combines long-term security planning, upgradeable cryptographic design, account protection, and infrastructure-level security assumptions.",
        zh: "它把长期安全规划、可升级的密码设计、账户保护和基础设施级安全假设组合在一起。",
      },
    ],
    steps: [
      {
        title: {
          en: "User Account",
          zh: "用户账户",
        },
        description: {
          en: "Your network identity and asset access begin with an account.",
          zh: "你的网络身份与资产访问，首先从一个账户开始。",
        },
      },
      {
        title: {
          en: "Wallet Signature",
          zh: "钱包签名",
        },
        description: {
          en: "Actions are approved through cryptographic signatures.",
          zh: "所有操作都通过密码签名来完成授权。",
        },
      },
      {
        title: {
          en: "Secure Transaction",
          zh: "安全交易",
        },
        description: {
          en: "Transactions move through the network under security rules.",
          zh: "交易会在既定安全规则下穿过网络。",
        },
      },
      {
        title: {
          en: "Network Verification",
          zh: "网络验证",
        },
        description: {
          en: "The network checks whether actions and results are valid.",
          zh: "网络会检查操作和结果是否有效。",
        },
      },
      {
        title: {
          en: "Long-Term Protection",
          zh: "长期保护",
        },
        description: {
          en: "The system is designed to evolve toward stronger post-quantum protection over time.",
          zh: "系统被设计成可以随着时间推移，演进到更强的后量子保护能力。",
        },
      },
    ] satisfies PipelineStep[],
  },
  actions: {
    title: {
      en: "What users can do",
      zh: "用户可以做什么",
    },
    description: {
      en: "Users should not need to understand cryptography to benefit from better security design.",
      zh: "用户不需要理解密码学，也能从更好的安全设计中受益。",
    },
    items: [
      {
        label: "01",
        title: {
          en: "Create a NOVO Wallet",
          zh: "创建 NOVO Wallet",
        },
        description: {
          en: "Start with the official wallet as your entry point.",
          zh: "从官方钱包开始，把它作为你的统一入口。",
        },
      },
      {
        label: "02",
        title: {
          en: "Protect your recovery phrase",
          zh: "保护好恢复短语",
        },
        description: {
          en: "Your recovery phrase is the key to your account access. Never share it.",
          zh: "恢复短语就是你账户访问的钥匙，永远不要分享给他人。",
        },
      },
      {
        label: "03",
        title: {
          en: "Verify applications before connecting",
          zh: "连接前先验证应用",
        },
        description: {
          en: "Only connect your wallet to services you trust.",
          zh: "只把钱包连接到你信任的服务上。",
        },
      },
      {
        label: "04",
        title: {
          en: "Use updated NOVOVM tools",
          zh: "使用最新版本的 NOVOVM 工具",
        },
        description: {
          en: "Future security improvements may arrive through wallet, browser, and network updates.",
          zh: "未来的安全改进，可能会通过钱包、浏览器和网络更新逐步提供。",
        },
      },
    ] satisfies UserActionItem[],
  },
  useCases: {
    title: {
      en: "Where long-term security matters",
      zh: "哪些场景更需要长期安全",
    },
    items: [
      {
        title: {
          en: "Digital assets",
          zh: "数字资产",
        },
        description: {
          en: "Protecting assets requires security that can evolve over time.",
          zh: "保护资产，需要能够随时间持续演进的安全能力。",
        },
      },
      {
        title: {
          en: "Identity systems",
          zh: "身份系统",
        },
        description: {
          en: "Network identity should remain reliable in future security environments.",
          zh: "网络身份应当在未来安全环境中依然保持可靠。",
        },
      },
      {
        title: {
          en: "Enterprise applications",
          zh: "企业应用",
        },
        description: {
          en: "Organizations need infrastructure designed for long-term risk management.",
          zh: "组织需要为长期风险管理而设计的基础设施。",
        },
      },
      {
        title: {
          en: "Financial services",
          zh: "金融服务",
        },
        description: {
          en: "Financial systems require stronger assumptions around signatures, transactions, and verification.",
          zh: "金融系统需要在签名、交易和验证环节建立更强的安全假设。",
        },
      },
      {
        title: {
          en: "AI and data systems",
          zh: "AI 与数据系统",
        },
        description: {
          en: "AI-era systems may handle sensitive data and high-value computation over long timeframes.",
          zh: "AI 时代的系统，可能会在很长时间里处理敏感数据与高价值计算。",
        },
      },
    ] satisfies UseCaseItem[],
  },
  notes: {
    title: {
      en: "Clear security notes",
      zh: "明确的安全说明",
    },
    description: {
      en: "Quantum-resistant design is a direction for long-term resilience. It does not mean any system is impossible to attack.",
      zh: "抗量子设计是一条面向长期韧性的方向，但这并不意味着任何系统都不可能被攻击。",
    },
    items: [
      {
        en: "NOVOVM does not claim absolute security.",
        zh: "NOVOVM 不会宣称自己具备绝对安全。",
      },
      {
        en: "No network should be described as unbreakable.",
        zh: "任何网络都不应该被描述成“不可破解”。",
      },
      {
        en: "Users still need to protect wallets and recovery phrases.",
        zh: "用户仍然需要自己保护好钱包和恢复短语。",
      },
      {
        en: "Security improves through careful design, updates, audits, and ecosystem maturity.",
        zh: "安全性来自持续设计、更新、审计与生态成熟，而不是一句承诺。",
      },
      {
        en: "Post-quantum security is an evolving field.",
        zh: "后量子安全本身也是一个不断演进的领域。",
      },
    ] satisfies BilingualCopy[],
  },
  final: {
    title: {
      en: "Security designed before it is urgent.",
      zh: "在安全问题变得紧迫之前就开始设计。",
    },
    description: {
      en: "NOVOVM is built for a future where networks must support scale, privacy, verification, and long-term security.",
      zh: "NOVOVM 面向这样一个未来而构建：网络不仅要支持规模、隐私和验证，也要具备长期安全准备。",
    },
  },
};

function SectionShell({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      className={cn(
        "relative border-t border-[rgba(90,181,70,0.12)] px-5 py-[72px] sm:px-6 lg:px-8 lg:py-[120px]",
        className,
      )}
      id={id}
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
  variant: "primary" | "secondary" | "text";
}) {
  if (variant === "text") {
    return (
      <Link
        className="group inline-flex items-center gap-2 text-sm font-medium text-[rgba(248,242,232,0.74)] transition-colors duration-300 hover:text-green-bright"
        href={href}
      >
        <span>{children}</span>
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
          "border-[rgba(90,181,70,0.22)] bg-[rgba(10,6,6,0.2)] text-text hover:border-[rgba(140,216,103,0.56)] hover:bg-[rgba(14,20,14,0.72)]",
        variant === "secondary" &&
          "border-[rgba(90,181,70,0.16)] bg-transparent text-text hover:border-[rgba(140,216,103,0.48)] hover:bg-[rgba(14,20,14,0.44)]",
      )}
      href={href}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={1.8}
      />
    </Link>
  );
}

function ProtectionLayersDiagram({ language }: { language: Language }) {
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
        className="relative cursor-none overflow-hidden rounded-[20px] border border-[rgba(90,181,70,0.22)] bg-[rgba(6,6,6,0.76)] transition-colors duration-500 hover:border-[rgba(140,216,103,0.46)]"
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
          src="/media/quantum-resistant-security-visual.png"
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

function SecurityPipeline({ language }: { language: Language }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Reveal className="mt-14" delay={0.12}>
      <div className="grid gap-4 lg:grid-cols-5 lg:gap-0">
        {content.approach.steps.map((step, index) => (
          <div className="relative" key={step.title.en}>
            <button
              className={cn(
                "group relative z-10 min-h-[170px] w-full rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.64)] p-6 text-left transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[rgba(140,216,103,0.56)] hover:bg-[rgba(14,20,14,0.78)]",
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

export function QuantumResistantSecurityPage({
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
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(90,181,70,0.42) 1px, transparent 1px), linear-gradient(90deg, rgba(90,181,70,0.42) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(90,181,70,0.05),transparent)]" />

          <div className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.78fr)]">
            <Reveal className="max-w-[780px]">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[rgba(90,181,70,0.68)]">
                {resolveCopy(content.hero.eyebrow, language)}
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-none text-text sm:text-6xl lg:text-[5.2rem]">
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
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="#how-novovm-approaches-it" variant="primary">
                  {language === "zh" ? "了解它如何运作" : "Explore how it works"}
                </ActionLink>
                <ActionLink href="/#core-technology" variant="secondary">
                  {language === "zh" ? "返回核心技术" : "Back to Core Technology"}
                </ActionLink>
              </div>
            </Reveal>

            <ProtectionLayersDiagram language={language} />
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
                  <div className="max-w-4xl">
                    <p className="text-2xl leading-tight text-text sm:text-[2rem]">
                      {resolveCopy(item.title, language)}
                    </p>
                    <p className="mt-4 text-base leading-7 text-muted">
                      {resolveCopy(item.description, language)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        <SectionShell>
          <Reveal>
            <SectionTitle>{resolveCopy(content.meaning.title, language)}</SectionTitle>
            <p className="mt-8 max-w-4xl text-3xl font-medium leading-tight text-text sm:text-4xl">
              {resolveCopy(content.meaning.statement, language)}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
              {resolveCopy(content.meaning.description, language)}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {content.meaning.perspectives.map((item, index) => (
              <Reveal className="h-full" delay={index * 0.06} key={item.title.en}>
                <article className="group h-full rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.62)] p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[rgba(140,216,103,0.54)] hover:bg-[rgba(14,20,14,0.76)]">
                  <h3 className="text-2xl font-medium leading-tight text-text transition-colors duration-300 group-hover:text-green-bright">
                    {resolveCopy(item.title, language)}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-muted sm:text-base">
                    {resolveCopy(item.description, language)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="how-novovm-approaches-it">
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
          <SecurityPipeline language={language} />
        </SectionShell>

        <SectionShell>
          <Reveal>
            <SectionTitle>{resolveCopy(content.actions.title, language)}</SectionTitle>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
              {resolveCopy(content.actions.description, language)}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {content.actions.items.map((item, index) => (
              <Reveal className="h-full" delay={index * 0.06} key={item.label}>
                <article className="group h-full rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.62)] p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[rgba(140,216,103,0.54)] hover:bg-[rgba(14,20,14,0.76)]">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-green-bright">
                    {item.label}
                  </p>
                  <h3 className="mt-5 text-2xl font-medium leading-tight text-text">
                    {resolveCopy(item.title, language)}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-muted sm:text-base">
                    {resolveCopy(item.description, language)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <div className="mt-10">
              <ActionLink href="/wallet/create" variant="primary">
                {language === "zh" ? "下载 NOVO Wallet" : "Download NOVO Wallet"}
              </ActionLink>
            </div>
          </Reveal>
        </SectionShell>

        <SectionShell>
          <Reveal>
            <SectionTitle>{resolveCopy(content.useCases.title, language)}</SectionTitle>
          </Reveal>
          <div className="mt-14 flex flex-col gap-3 xl:flex-row">
            {content.useCases.items.map((item, index) => (
              <Reveal className="xl:flex-1" delay={index * 0.05} key={item.title.en}>
                <article className="group min-h-[150px] rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.62)] p-5 transition-colors duration-300 hover:border-[rgba(140,216,103,0.54)]">
                  <h3 className="text-base font-medium leading-snug text-text">
                    {resolveCopy(item.title, language)}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted opacity-100 transition-opacity duration-300 xl:opacity-0 xl:group-hover:opacity-100">
                    {resolveCopy(item.description, language)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </SectionShell>

        <SectionShell>
          <Reveal>
            <SectionTitle>{resolveCopy(content.notes.title, language)}</SectionTitle>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
              {resolveCopy(content.notes.description, language)}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-12 rounded-[12px] border border-[rgba(90,181,70,0.2)] bg-[rgba(7,7,7,0.68)] p-6 sm:p-7">
              <div className="space-y-4 text-sm leading-6 text-[rgba(248,242,232,0.74)]">
                {content.notes.items.map((item) => (
                  <p key={item.en}>- {resolveCopy(item, language)}</p>
                ))}
              </div>
            </div>
          </Reveal>
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
              <ActionLink href="/wallet/create" variant="primary">
                {language === "zh" ? "下载 NOVO Wallet" : "Download NOVO Wallet"}
              </ActionLink>
              <ActionLink href="/#core-technology" variant="secondary">
                {language === "zh" ? "探索核心技术" : "Explore Core Technology"}
              </ActionLink>
            </div>
            <div className="mt-6">
              <ActionLink href="/developers" variant="text">
                {language === "zh" ? "阅读开发者文档" : "Read Developer Docs"}
              </ActionLink>
            </div>
          </Reveal>
        </SectionShell>
      </main>
    </>
  );
}
