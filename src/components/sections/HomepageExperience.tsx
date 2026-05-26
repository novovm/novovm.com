"use client";

import {
  ArrowRight,
  Binary,
} from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { type Language } from "@/lib/site-content";

type Bilingual = {
  en: string;
  zh: string;
};

type ReasonItem = {
  description: Bilingual;
  number: string;
  title: Bilingual;
};

type ComparisonItem = {
  description: Bilingual;
  title: Bilingual;
};

type EcosystemItem = {
  description: Bilingual;
  title: Bilingual;
};

type PillarItem = {
  description: Bilingual;
  href: string;
  summary: Bilingual;
  title: Bilingual;
};

type ApplicationItem = {
  description: Bilingual;
  title: Bilingual;
};

const whyItems: ReasonItem[] = [
  {
    number: "01",
    title: {
      en: "Current infrastructure struggles to scale efficiently.",
      zh: "现有基础设施难以高效扩展。",
    },
    description: {
      en: "Many networks still become harder to use as workloads, users, and service layers increase.",
      zh: "随着工作负载、用户数量和服务层增加，很多网络会越来越难用。",
    },
  },
  {
    number: "02",
    title: {
      en: "Privacy and verification are often treated as separate systems.",
      zh: "隐私与验证常常被拆成割裂的系统。",
    },
    description: {
      en: "That creates extra complexity for applications that need both trustworthy results and controlled data access.",
      zh: "这会让既需要可信结果又需要受控数据访问的应用承担额外复杂度。",
    },
  },
  {
    number: "03",
    title: {
      en: "Most networks were not designed for long-term quantum resistance.",
      zh: "大多数网络并不是按长期抗量子要求设计的。",
    },
    description: {
      en: "Future infrastructure should be prepared for the security assumptions of the next era, not only the current one.",
      zh: "未来基础设施需要为下一时代的安全假设做准备，而不只适配今天。",
    },
  },
];

const comparisonItems: ComparisonItem[] = [
  {
    title: { en: "Traditional internet", zh: "传统互联网" },
    description: {
      en: "Centralized platforms control infrastructure, access, and most user data.",
      zh: "中心化平台掌控基础设施、访问方式和大部分用户数据。",
    },
  },
  {
    title: { en: "Early blockchain systems", zh: "早期区块链系统" },
    description: {
      en: "Public verification exists, but scalability, privacy, and usability remain difficult.",
      zh: "虽然具备公开验证，但扩展性、隐私和可用性仍然较难兼顾。",
    },
  },
  {
    title: { en: "NOVOVM", zh: "NOVOVM" },
    description: {
      en: "Designed for scalable execution, privacy-aware computation, verifiable results, and quantum-resistant infrastructure.",
      zh: "面向可扩展执行、隐私感知计算、可验证结果和抗量子基础设施而设计。",
    },
  },
];

const ecosystemItems: EcosystemItem[] = [
  {
    title: { en: "NOVO Wallet", zh: "NOVO Wallet" },
    description: {
      en: "The entry point for users, identity, assets, and account access.",
      zh: "用户、身份、资产与账户访问的第一入口。",
    },
  },
  {
    title: { en: "Applications", zh: "Applications" },
    description: {
      en: "One ecosystem surface for products, services, and network use.",
      zh: "承载产品、服务和网络使用的统一生态入口。",
    },
  },
  {
    title: { en: "Assets", zh: "Assets" },
    description: {
      en: "Programmable digital assets connected to real network activity.",
      zh: "与真实网络活动连接的可编程数字资产。",
    },
  },
  {
    title: { en: "Mainnet", zh: "Mainnet" },
    description: {
      en: "The base network for applications, services, and infrastructure operations.",
      zh: "承载应用、服务与基础设施运行的基础网络。",
    },
  },
  {
    title: { en: "Identity", zh: "Identity" },
    description: {
      en: "User-controlled access across services and ecosystem functions.",
      zh: "由用户控制、贯穿不同服务与生态功能的访问方式。",
    },
  },
  {
    title: { en: "Services", zh: "Services" },
    description: {
      en: "Infrastructure services organized into a more usable Web3 experience.",
      zh: "被组织成更易使用 Web3 体验的基础设施服务。",
    },
  },
];

const pillarItems: PillarItem[] = [
  {
    title: { en: "Runtime", zh: "运行时" },
    summary: {
      en: "Parallel execution for scalable workloads.",
      zh: "面向可扩展工作负载的并行执行能力。",
    },
    description: {
      en: "Designed to support larger application surfaces without turning execution into a bottleneck.",
      zh: "以支撑更大应用规模为目标，避免执行层成为系统瓶颈。",
    },
    href: "/technology/parallel-execution",
  },
  {
    title: { en: "Privacy", zh: "隐私" },
    summary: {
      en: "Confidential computation integrated into execution.",
      zh: "把保密计算能力整合进执行流程。",
    },
    description: {
      en: "Sensitive data paths can be handled with more care inside the infrastructure itself.",
      zh: "让敏感数据路径在基础设施内部得到更审慎的处理。",
    },
    href: "/technology/confidential-compute",
  },
  {
    title: { en: "Proofs", zh: "证明" },
    summary: {
      en: "Verifiable results without blind trust.",
      zh: "在不依赖盲目信任的前提下提供可验证结果。",
    },
    description: {
      en: "Applications can expose trustworthy outcomes without overwhelming users with proof systems.",
      zh: "让应用能够给出可信结果，同时不把证明系统直接压到用户界面上。",
    },
    href: "/technology/verifiable-results",
  },
  {
    title: { en: "Access", zh: "接入" },
    summary: {
      en: "Developer APIs and ecosystem integration.",
      zh: "面向开发者 API 与生态集成的接入层。",
    },
    description: {
      en: "Clear interfaces help teams connect products, services, and infrastructure more predictably.",
      zh: "用清晰接口帮助团队更稳定地连接产品、服务和基础设施。",
    },
    href: "/technology/developer-apis",
  },
];

const applicationItems: ApplicationItem[] = [
  {
    title: { en: "Financial systems", zh: "金融系统" },
    description: {
      en: "Infrastructure that needs reliability, verification, and clear service continuity.",
      zh: "需要可靠性、可验证性和持续服务能力的金融基础设施。",
    },
  },
  {
    title: { en: "AI infrastructure", zh: "AI 基础设施" },
    description: {
      en: "Execution, coordination, and data flows built for larger computational environments.",
      zh: "面向更大计算环境的执行、协同与数据流支撑。",
    },
  },
  {
    title: { en: "Identity systems", zh: "身份系统" },
    description: {
      en: "User-controlled access models for accounts, services, and network interactions.",
      zh: "面向账户、服务和网络交互的用户控制型访问模型。",
    },
  },
  {
    title: { en: "Enterprise applications", zh: "企业应用" },
    description: {
      en: "Deployment environments that require stability, privacy awareness, and operational clarity.",
      zh: "需要稳定性、隐私意识和运维清晰度的部署环境。",
    },
  },
  {
    title: { en: "Developer platforms", zh: "开发者平台" },
    description: {
      en: "Tooling and service layers that need open interfaces and structured infrastructure support.",
      zh: "需要开放接口和结构化基础设施支撑的工具与服务平台。",
    },
  },
  {
    title: { en: "Distributed services", zh: "分布式服务" },
    description: {
      en: "Network-based services that must continue operating under real-world load and complexity.",
      zh: "需要在真实负载和复杂环境下持续运行的网络型服务。",
    },
  },
];

function copy(text: Bilingual, language: Language) {
  return language === "zh" ? text.zh : text.en;
}

function HomeSectionAction({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="group inline-flex h-12 items-center justify-center gap-2 rounded-[6px] border border-[rgba(90,181,70,0.22)] bg-[rgba(10,6,6,0.2)] px-5 text-sm font-medium text-text transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-[rgba(140,216,103,0.56)] hover:bg-[rgba(16,24,16,0.52)]"
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

function SectionIntro({
  title,
  description,
  language,
}: {
  title: Bilingual;
  description?: Bilingual;
  language: Language;
}) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
        {copy(title, language)}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          {copy(description, language)}
        </p>
      ) : null}
    </div>
  );
}

function InteractionOneDiagram({ language }: { language: Language }) {
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
    <div
      className="relative aspect-square cursor-none overflow-hidden rounded-[14px] bg-transparent"
      onPointerEnter={handleShipMove}
      onPointerLeave={() => {
        previousPointerRef.current = null;
        setIsShipVisible(false);
        setFlameStrength(0.22);
      }}
      onPointerMove={handleShipMove}
    >
      <div className="pointer-events-none absolute -inset-12 bg-[radial-gradient(circle_at_center,rgba(90,181,70,0.14),transparent_58%)]" />
      <Image
        alt={copy({ en: "Unified quantum-ready network structure", zh: "统一的量子时代网络结构" }, language)}
        className="relative z-10 h-full w-full object-contain opacity-92 [mask-image:radial-gradient(ellipse_at_center,black_34%,rgba(0,0,0,0.84)_50%,rgba(0,0,0,0.44)_66%,rgba(0,0,0,0.14)_80%,transparent_96%)]"
        height={1086}
        priority
        src="/media/what-is-novovm-visual.png"
        width={1448}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,0,0,0.92)_0%,rgba(4,0,0,0.12)_18%,rgba(4,0,0,0.12)_82%,rgba(4,0,0,0.92)_100%),linear-gradient(180deg,rgba(4,0,0,0.92)_0%,rgba(4,0,0,0.08)_18%,rgba(4,0,0,0.08)_82%,rgba(4,0,0,0.92)_100%)]"
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
    </div>
  );
}

export function HomepageExperience({ language }: { language: Language }) {
  const reduceMotion = useReducedMotion();
  const [activeComparison, setActiveComparison] = useState(2);
  const [activeApplication, setActiveApplication] = useState(0);

  return (
    <>
      <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="why-novovm">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionIntro
              description={{
                en: "The internet is changing. Applications are becoming more distributed. Digital assets are becoming programmable. AI systems are generating and processing massive amounts of data. Privacy requirements are increasing. Future networks must also prepare for quantum-era security challenges. NOVOVM was created to address these changes.",
                zh: "互联网正在变化。应用变得更分布式，数字资产变得可编程，AI 系统正在生成并处理海量数据，隐私要求不断提高，未来网络也必须为量子时代的安全挑战做好准备。NOVOVM 正是为这些变化而出现。",
              }}
              language={language}
              title={{ en: "Why NOVOVM exists", zh: "为什么需要 NOVOVM" }}
            />
          </Reveal>

          <div className="mt-16">
            {whyItems.map((item, index) => (
              <Reveal delay={index * 0.08} key={item.number}>
                <div className="grid gap-5 border-b border-[rgba(90,181,70,0.12)] py-8 lg:grid-cols-[80px_minmax(0,1fr)] lg:gap-10">
                  <p className="pt-1 text-xs font-medium tracking-[0.32em] text-[rgba(90,181,70,0.44)]">
                    {item.number}
                  </p>
                  <div className="max-w-4xl">
                    <p className="text-2xl leading-tight text-text sm:text-[2rem]">
                      {copy(item.title, language)}
                    </p>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
                      {copy(item.description, language)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="why-current-systems">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionIntro
              language={language}
              title={{ en: "Why current systems are not enough", zh: "为什么现有系统还不够" }}
            />
          </Reveal>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {comparisonItems.map((item, index) => {
              const active = activeComparison === index;
              const highlighted = index === 2;
              return (
                <motion.button
                  className={cn(
                    "rounded-[10px] border bg-[rgba(10,6,6,0.86)] p-6 text-left transition-[transform,border-color,background-color,box-shadow] duration-300",
                    highlighted
                      ? "border-[rgba(90,181,70,0.34)]"
                      : "border-[rgba(90,181,70,0.12)]",
                    active && "border-[rgba(90,181,70,0.56)] shadow-[0_18px_38px_rgba(0,0,0,0.24)]",
                  )}
                  key={item.title.en}
                  onFocus={() => setActiveComparison(index)}
                  onMouseEnter={() => setActiveComparison(index)}
                  type="button"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.48)]">
                    {index === 0 ? "WEB2" : index === 1 ? "EARLY BLOCKCHAIN" : "NOVOVM"}
                  </p>
                  <h3 className="mt-6 text-2xl text-text">
                    {copy(item.title, language)}
                  </h3>
                  <p className="mt-6 text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
                    {copy(item.description, language)}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="quantum-resistant">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.82fr)]">
          <Reveal>
            <SectionIntro
              description={{
                en: "Quantum computing may eventually challenge many existing cryptographic systems. NOVOVM is designed with long-term network resilience and post-quantum infrastructure considerations in mind.",
                zh: "量子计算未来可能会挑战许多现有密码系统。NOVOVM 在设计时就考虑了长期网络韧性与后量子基础设施要求。",
              }}
              language={language}
              title={{ en: "Built for the quantum era", zh: "为量子时代而设计" }}
            />
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[rgba(245,242,232,0.68)] sm:text-base">
              {copy(
                {
                  en: "Future infrastructure must prepare for future threats. NOVOVM is designed for, built with, and intended to support long-term security assumptions rather than short-term convenience.",
                  zh: "未来基础设施必须为未来威胁做准备。NOVOVM 以长期安全假设为前提来设计、构建并持续支持，而不是只追求短期便利。",
                },
                language,
              )}
            </p>
            <div className="mt-8">
              <HomeSectionAction href="/technology/quantum-resistant-security">
                {copy(
                  {
                    en: "Explore Quantum-Resistant Security",
                    zh: "了解抗量子安全",
                  },
                  language,
                )}
              </HomeSectionAction>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <InteractionOneDiagram language={language} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="large-scale-deployment">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionIntro
              description={{
                en: "NOVOVM is designed for environments where networks must support large numbers of users, continuous execution, privacy-sensitive workloads, scalable infrastructure, and distributed services.",
                zh: "NOVOVM 面向这样一类环境而设计：网络需要支持大量用户、持续执行、隐私敏感工作负载、可扩展基础设施和分布式服务。",
              }}
              language={language}
              title={{ en: "Built for large-scale real-world deployment", zh: "面向大规模真实部署而设计" }}
            />
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <Reveal>
              <div className="relative min-h-[420px] overflow-hidden rounded-[14px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.82)]">
                <Image
                  alt={copy(
                    {
                      en: "Large-scale deployment visual",
                      zh: "大规模真实部署示意图",
                    },
                    language,
                  )}
                  className="object-cover object-center"
                  fill
                  priority={false}
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  src="/media/deployment-visual-chatgpt-20260522.png"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,3,2,0.06),rgba(4,3,2,0.14)_42%,rgba(4,3,2,0.52)_100%)]" />

                <div className="absolute bottom-8 left-8 max-w-[220px] text-sm text-muted">
                  {copy(
                    {
                      en: "Topology organized for distributed services, application clusters, and ongoing infrastructure workloads.",
                      zh: "为分布式服务、应用集群和持续基础设施工作负载而组织的网络拓扑。",
                    },
                    language,
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-3">
                {[
                  { en: "finance", zh: "金融" },
                  { en: "AI systems", zh: "AI 系统" },
                  { en: "enterprise infrastructure", zh: "企业基础设施" },
                  { en: "identity systems", zh: "身份系统" },
                  { en: "decentralized services", zh: "去中心化服务" },
                ].map((item) => (
                  <div
                    className="rounded-[10px] border border-[rgba(90,181,70,0.12)] bg-[rgba(10,6,6,0.86)] px-5 py-4 text-text"
                    key={item.en}
                  >
                    {copy(item, language)}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="core-technology-pillars">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionIntro
              description={{
                en: "NOVOVM keeps its technology surface focused on the pieces that matter for real deployment: scalable execution, privacy-aware computation, verifiable outputs, and clean access for builders.",
                zh: "NOVOVM 把技术表面收敛在真实部署真正需要的几层能力上：可扩展执行、隐私感知计算、可验证输出，以及面向构建者的清晰接入。",
              }}
              language={language}
              title={{ en: "Core technology pillars", zh: "核心技术支柱" }}
            />
          </Reveal>

          <div className="mt-14 grid gap-4 lg:grid-cols-4">
            {pillarItems.map((item, index) => (
              <Reveal delay={index * 0.05} key={item.title.en}>
                <motion.div
                  transition={reduceMotion ? undefined : { duration: 0.28 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                >
                  <Link
                    className="group block h-full rounded-[10px] border border-[rgba(90,181,70,0.12)] bg-[rgba(10,6,6,0.88)] p-6 transition-[transform,border-color,background-color,box-shadow] duration-300 hover:border-[rgba(90,181,70,0.48)] hover:bg-[rgba(13,18,13,0.72)] hover:shadow-[0_18px_38px_rgba(0,0,0,0.24)]"
                    href={item.href}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.52)]">
                      {copy(item.title, language)}
                    </p>
                    <h3 className="mt-5 text-2xl text-text">
                      {copy(item.summary, language)}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-muted">
                      {copy(item.description, language)}
                    </p>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[rgba(241,188,26,0.0)] transition-colors duration-300 group-hover:text-[rgba(241,188,26,0.92)]">
                      <span>{copy({ en: "Learn more", zh: "了解更多" }, language)}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="web3-entry">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionIntro
              description={{
                en: "NOVOVM organizes wallets, applications, assets, services, and infrastructure into one ecosystem experience.",
                zh: "NOVOVM 把钱包、应用、资产、服务和基础设施组织进一个统一生态体验中。",
              }}
              language={language}
              title={{ en: "Web3 should be usable", zh: "Web3 应该真正可用" }}
            />
          </Reveal>

          <div className="mt-14 grid gap-4 lg:grid-cols-6">
            {ecosystemItems.map((item, index) => (
              <Reveal delay={index * 0.05} key={item.title.en}>
                <div className="rounded-[10px] border border-[rgba(90,181,70,0.12)] bg-[rgba(10,6,6,0.88)] p-5">
                  <p className="text-lg text-text">{copy(item.title, language)}</p>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    {copy(item.description, language)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row" delay={0.08}>
            <Button href="/ecosystem">
              {copy({ en: "Explore Ecosystem", zh: "探索生态" }, language)}
            </Button>
            <Button href="/wallet/create" variant="secondary">
              {copy({ en: "Create Wallet", zh: "创建钱包" }, language)}
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="real-world-applications">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionIntro
              language={language}
              title={{ en: "Built for real-world applications", zh: "为真实世界应用而构建" }}
            />
          </Reveal>

          <div className="mt-14 grid gap-3 lg:grid-cols-6">
            {applicationItems.map((item, index) => {
              const active = activeApplication === index;
              return (
                <motion.button
                  className={cn(
                    "rounded-[10px] border bg-[rgba(10,6,6,0.88)] px-5 py-5 text-left transition-[transform,border-color,background-color,box-shadow] duration-300",
                    active
                      ? "border-[rgba(90,181,70,0.48)] bg-[rgba(13,18,13,0.72)]"
                      : "border-[rgba(90,181,70,0.12)]",
                  )}
                  key={item.title.en}
                  onFocus={() => setActiveApplication(index)}
                  onMouseEnter={() => setActiveApplication(index)}
                  type="button"
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                >
                  <p className="text-base font-medium text-text">
                    {copy(item.title, language)}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    {copy(item.description, language)}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8" id="developers">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.74fr)] lg:items-center">
          <Reveal>
            <SectionIntro
              description={{
                en: "NOVOVM provides developers and infrastructure teams with access to scalable execution, privacy-aware computation, verifiable systems, and open network interfaces.",
                zh: "NOVOVM 为开发者和基础设施团队提供可扩展执行、隐私感知计算、可验证系统与开放网络接口。",
              }}
              language={language}
              title={{ en: "Build on NOVOVM", zh: "在 NOVOVM 上构建" }}
            />

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/developers">
                {copy({ en: "Developer Docs", zh: "开发者文档" }, language)}
              </Button>
              <Button href="/technology/developer-apis" variant="secondary">
                {copy({ en: "API Reference", zh: "API 参考" }, language)}
              </Button>
              <Button href="https://github.com/" variant="secondary">
                GitHub
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[14px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.82)] p-6 shadow-[0_24px_52px_rgba(0,0,0,0.24)]">
              <div className="flex items-center justify-between border-b border-[rgba(90,181,70,0.12)] pb-3">
                <p className="text-sm text-text">infrastructure.preview.ts</p>
                <Binary className="h-4 w-4 text-[rgba(90,181,70,0.68)]" strokeWidth={1.8} />
              </div>
              <pre className="mt-5 overflow-x-auto text-sm leading-7 text-[rgba(245,242,232,0.78)]">
{`network: "novovm"
runtime: "parallel"
privacy: "integrated"
proofs: "verifiable"
security: "quantum-aware"
interfaces: "open"`}
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8" id="final-cta">
        <div className="mx-auto max-w-5xl rounded-[14px] border border-[rgba(90,181,70,0.18)] bg-[linear-gradient(180deg,rgba(13,18,13,0.94),rgba(8,4,4,0.96))] p-8 text-center shadow-[0_26px_60px_rgba(0,0,0,0.28)] sm:p-12">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
              {copy({ en: "Infrastructure for the next internet.", zh: "面向下一代互联网的基础设施。" }, language)}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
              {copy(
                {
                  en: "NOVOVM is building a scalable, privacy-aware, verifiable, and quantum-resistant network infrastructure for the future of decentralized systems.",
                  zh: "NOVOVM 正在构建一个可扩展、具隐私意识、可验证且面向量子时代准备的网络基础设施，用于支撑未来的去中心化系统。",
                },
                language,
              )}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#why-novovm">
                {copy({ en: "Explore NOVOVM", zh: "探索 NOVOVM" }, language)}
              </Button>
              <Button href="/wallet/create" variant="secondary">
                {copy({ en: "Download NOVO Wallet", zh: "下载 NOVO Wallet" }, language)}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
