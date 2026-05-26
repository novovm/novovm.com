"use client";

import {
  ArrowRight,
  BadgeCheck,
  Gauge,
  Shield,
  Waypoints,
} from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { CapabilityCard } from "@/components/ui/CapabilityCard";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Reveal } from "@/components/ui/Reveal";
import { StepPanel } from "@/components/ui/StepPanel";
import { cn } from "@/lib/cn";
import {
  type BilingualCopy,
  type Language,
  whatIsNovoVMContent,
} from "@/lib/site-content";

type WhatIsNovoVMProps = {
  language: Language;
};

const capabilityIcons = {
  "badge-check": BadgeCheck,
  gauge: Gauge,
  shield: Shield,
  waypoints: Waypoints,
};

function resolveCopy(copy: BilingualCopy, language: Language) {
  return language === "zh" ? copy.zh : copy.en;
}

type SectionHeadingProps = {
  centered?: boolean;
  className?: string;
  language: Language;
  title: BilingualCopy;
};

function SectionHeading({
  centered = false,
  className,
  language,
  title,
}: SectionHeadingProps) {
  const copy = resolveCopy(title, language);

  return (
    <Reveal className={cn(centered && "mx-auto text-center", className)}>
      <h2 className="max-w-4xl text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
        {copy}
      </h2>
    </Reveal>
  );
}

type ActionLinkProps = {
  href: string;
  label: BilingualCopy;
  language: Language;
  variant: "primary" | "secondary" | "text";
};

function ActionLink({ href, label, language, variant }: ActionLinkProps) {
  const copy = resolveCopy(label, language);

  return (
    <a
      className={cn(
        "group inline-flex items-center gap-2 rounded-[6px] text-sm font-medium transition-[transform,border-color,background-color,color] duration-500",
        variant === "primary" &&
          "border border-green bg-green px-5 py-3 text-text hover:-translate-y-1 hover:border-[rgba(140,216,103,0.55)] hover:bg-[#67c451]",
        variant === "secondary" &&
          "border border-border bg-[rgba(4,0,0,0.32)] px-5 py-3 text-text hover:-translate-y-1 hover:border-[rgba(140,216,103,0.55)] hover:bg-[rgba(13,18,13,0.72)]",
        variant === "text" &&
          "px-0 py-3 text-muted hover:text-text",
      )}
      href={href}
    >
      <span>{copy}</span>
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
    </a>
  );
}

function UnifiedNetworkDiagram({ language }: { language: Language }) {
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
  const inputLabel = resolveCopy(
    whatIsNovoVMContent.hero.diagramLabels.input,
    language,
  );
  const networkLabel = resolveCopy(
    whatIsNovoVMContent.hero.diagramLabels.network,
    language,
  );
  const outputLabel = resolveCopy(
    whatIsNovoVMContent.hero.diagramLabels.output,
    language,
  );

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
    <Reveal className="w-full max-w-[900px] self-center lg:ml-auto lg:translate-x-10 xl:max-w-[980px] xl:translate-x-20" delay={0.14}>
      <div
        className="relative cursor-none overflow-hidden"
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
          alt={`${inputLabel} - ${networkLabel} - ${outputLabel}`}
          className="relative h-auto w-full object-contain opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_42%,rgba(0,0,0,0.72)_58%,rgba(0,0,0,0.18)_74%,transparent_92%)]"
          height={1086}
          priority
          src="/media/what-is-novovm-visual.png"
          width={1448}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,transparent_18%,transparent_82%,var(--background)_100%),linear-gradient(180deg,var(--background)_0%,transparent_18%,transparent_78%,var(--background)_100%)]"
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
      </div>
    </Reveal>
  );
}

export function WhatIsNovoVM({ language }: WhatIsNovoVMProps) {
  const content = whatIsNovoVMContent;
  const [activeStep, setActiveStep] = useState(0);
  const heroTitle = resolveCopy(content.hero.title, language);
  const heroDefinition = resolveCopy(content.hero.definition, language);
  const heroParagraphs = content.hero.paragraphs.map((paragraph) =>
    resolveCopy(paragraph, language),
  );
  const activeWorkflowItem = content.workflow.items[activeStep];
  const activeWorkflowTitle = resolveCopy(activeWorkflowItem.title, language);
  const activeWorkflowNote = resolveCopy(activeWorkflowItem.note, language);

  return (
    <section
      className="relative overflow-hidden border-t border-border bg-background px-5 sm:px-6 lg:px-8"
      id="what-is-novovm"
    >
      <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(90,181,70,0.06),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid min-h-[100svh] items-center gap-16 py-24 lg:grid-cols-[minmax(0,0.86fr)_minmax(560px,1.08fr)] lg:gap-16 lg:py-28 xl:grid-cols-[minmax(0,0.82fr)_minmax(640px,1.18fr)] xl:gap-18">
          <Reveal className="max-w-[880px]">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-[rgba(90,181,70,0.56)]">
              {language === "zh" ? "什么是 NOVOVM" : "What Is NOVOVM"}
            </p>
            <h2 className="mt-6 text-4xl font-semibold leading-none text-text sm:text-5xl lg:text-[5.4rem]">
              {heroTitle}
            </h2>
            <p className="mt-10 max-w-[840px] text-xl leading-8 text-[rgba(245,242,232,0.9)] sm:text-2xl sm:leading-9">
              {heroDefinition}
            </p>

            <div className="mt-10 max-w-[880px] space-y-5 text-sm leading-7 text-[rgba(245,242,232,0.82)] sm:text-base">
              {heroParagraphs.map((paragraph, index) => (
                <div key={`${paragraph}-${index}`}>
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <UnifiedNetworkDiagram language={language} />
        </div>

        <div className="border-t border-[rgba(90,181,70,0.12)] py-24 sm:py-28">
          <SectionHeading language={language} title={content.why.title} />
          <div className="mt-12">
            {content.why.items.map((item, index) => (
              <InfoBlock
                delay={index * 0.08}
                description={item.description}
                headline={item.headline}
                key={item.number}
                language={language}
                number={item.number}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-[rgba(90,181,70,0.12)] py-24 sm:py-28">
          <SectionHeading language={language} title={content.capabilities.title} />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {content.capabilities.items.map((item, index) => {
              const Icon = capabilityIcons[item.icon];

              return (
                <Reveal className="h-full" delay={index * 0.08} key={item.title.en}>
                  <CapabilityCard
                    className="h-full"
                    description={item.description}
                    icon={Icon}
                    language={language}
                    title={item.title}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[rgba(90,181,70,0.12)] py-24 sm:py-28">
          <SectionHeading language={language} title={content.workflow.title} />
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_320px] lg:items-start">
            <Reveal>
              <div className="relative">
                <div className="absolute bottom-10 left-6 top-6 hidden w-px bg-[linear-gradient(180deg,rgba(90,181,70,0.3),rgba(140,216,103,0.55),rgba(90,181,70,0.18))] lg:block" />
                <div className="space-y-5">
                  {content.workflow.items.map((item, index) => (
                    <StepPanel
                      active={activeStep === index}
                      description={item.description}
                      href={
                        index === 0
                          ? "/what-is-nov"
                          : index === 1
                            ? "/novo-wallet"
                            : index === 2
                              ? "/execution-engine"
                              : index === 3
                                ? "/network"
                                : undefined
                      }
                      key={item.number}
                      language={language}
                      note={item.note}
                      number={item.number}
                      onActivate={() => setActiveStep(index)}
                      title={item.title}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="hidden lg:block" delay={0.1}>
              <aside className="calm-panel sticky top-28 rounded-[10px] p-6">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-[rgba(90,181,70,0.56)]">
                  {activeWorkflowItem.number}
                </p>
                <h3 className="mt-4 text-2xl leading-tight text-text">
                  {activeWorkflowTitle}
                </h3>
                <p className="mt-5 text-base leading-7 text-green-bright">
                  {activeWorkflowNote}
                </p>
              </aside>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-[rgba(90,181,70,0.12)] py-24 sm:py-28">
          <SectionHeading language={language} title={content.audience.title} />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {content.audience.items.map((item, index) => {
              const titleCopy = resolveCopy(item.title, language);
              const descriptionCopy = resolveCopy(item.description, language);
              const ctaCopy = resolveCopy(item.cta, language);

              return (
                <Reveal delay={index * 0.08} key={item.title.en}>
                  <div className="interactive-card calm-panel calm-panel-hover group flex h-full min-h-[260px] flex-col justify-between rounded-[8px] p-6 sm:p-7">
                    <div>
                      <h3 className="text-2xl leading-tight text-text">
                        {titleCopy}
                      </h3>
                      <p className="mt-8 max-w-xs text-base leading-7 text-[rgba(245,242,232,0.82)]">
                        {descriptionCopy}
                      </p>
                    </div>
                    <a
                      className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-500 group-hover:text-text"
                      href={item.href}
                    >
                      <span>{ctaCopy}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 translate-x-0 opacity-0 transition-[transform,opacity] duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                        strokeWidth={1.8}
                      />
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[rgba(90,181,70,0.12)] py-24 sm:py-32">
          <SectionHeading
            centered
            className="mx-auto max-w-3xl"
            language={language}
            title={content.getStarted.title}
          />
          <Reveal className="mx-auto mt-6 max-w-3xl text-center" delay={0.08}>
            <p className="text-base leading-7 text-[rgba(245,242,232,0.82)]">
              {resolveCopy(content.getStarted.description, language)}
            </p>
          </Reveal>
          <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" delay={0.16}>
            {content.getStarted.buttons.map((button) => (
              <ActionLink
                href={button.href}
                key={button.label.en}
                label={button.label}
                language={language}
                variant={button.variant}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
