"use client";

import { ArrowRight, Blocks, Coins, Network, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CapabilityCard } from "@/components/ui/CapabilityCard";
import { InfoBlock } from "@/components/ui/InfoBlock";
import { Reveal } from "@/components/ui/Reveal";
import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { cn } from "@/lib/cn";
import {
  type BilingualCopy,
  type Language,
  whatIsNovContent,
} from "@/lib/site-content";
import { resolveCopy } from "@/lib/language";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";

const capabilityIcons = {
  blocks: Blocks,
  coins: Coins,
  network: Network,
  wallet: Wallet,
};

type PageActionProps = {
  href: string;
  label: BilingualCopy;
  language: Language;
  variant: "primary" | "secondary" | "text";
};

function PageAction({ href, label, language, variant }: PageActionProps) {
  const copy = resolveCopy(label, language);

  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 rounded-[6px] text-sm font-medium transition-[transform,border-color,background-color,color,box-shadow] duration-500",
        variant === "primary" &&
          "border border-green bg-green px-5 py-3 text-text hover:-translate-y-1 hover:border-gold hover:shadow-[0_0_0_1px_rgba(241,188,26,0.32),0_14px_30px_rgba(241,188,26,0.12)]",
        variant === "secondary" &&
          "border border-border bg-[rgba(4,0,0,0.32)] px-5 py-3 text-text hover:-translate-y-1 hover:border-gold hover:bg-[rgba(241,188,26,0.08)]",
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
    </Link>
  );
}

type SectionTitleProps = {
  centered?: boolean;
  language: Language;
  title: BilingualCopy;
};

function SectionTitle({ centered = false, language, title }: SectionTitleProps) {
  return (
    <Reveal className={cn(centered && "mx-auto text-center")}>
      <h2 className="max-w-4xl text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
        {resolveCopy(title, language)}
      </h2>
    </Reveal>
  );
}

export function WhatIsNov({ initialLanguage }: { initialLanguage: Language }) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);
  const content = whatIsNovContent;

  const heroTitle = resolveCopy(content.hero.title, language);
  const heroDescription = resolveCopy(content.hero.description, language);
  const heroSupporting = content.hero.supporting.map((item) =>
    resolveCopy(item, language),
  );

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

          <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-7xl items-center gap-12 py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.72fr)] lg:py-24">
            <Reveal className="max-w-[760px]">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[rgba(90,181,70,0.56)]">
                {heroTitle}
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-none text-text sm:text-5xl lg:text-[5.25rem]">
                NOV
              </h1>
              <p className="mt-10 max-w-3xl text-xl leading-8 text-[rgba(245,242,232,0.9)] sm:text-2xl sm:leading-9">
                {heroDescription}
              </p>

              <div className="mt-10 space-y-5 text-sm leading-7 text-[rgba(245,242,232,0.82)] sm:text-base">
                {heroSupporting.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal className="lg:justify-self-end" delay={0.12}>
              <div className="relative mx-auto w-full max-w-[500px] lg:max-w-[560px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,181,70,0.1),transparent_62%)]" />
                <Image
                  alt={language === "zh" ? "NOV 正面视觉图" : "NOV front visual"}
                  className="relative h-auto w-full object-contain opacity-95 [mask-image:radial-gradient(ellipse_at_center,black_58%,rgba(0,0,0,0.76)_72%,transparent_96%)]"
                  height={1024}
                  priority
                  src="/media/nov-front.png"
                  width={1024}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle language={language} title={content.why.title} />
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
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle language={language} title={content.capabilities.title} />
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
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle language={language} title={content.fit.title} />
            <Reveal className="mt-12" delay={0.08}>
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)_48px_minmax(0,1fr)] lg:items-center">
                {content.fit.items.map((item, index) => (
                  <div
                    className="contents"
                    key={item.title.en}
                  >
                    <div className="interactive-card calm-panel calm-panel-hover rounded-[8px] p-6 sm:p-7">
                      <p className="text-xs font-medium uppercase tracking-[0.28em] text-[rgba(90,181,70,0.48)]">
                        {resolveCopy(item.eyebrow, language)}
                      </p>
                      <h3 className="mt-5 text-2xl leading-tight text-text">
                        {resolveCopy(item.title, language)}
                      </h3>
                      <p className="mt-5 max-w-sm text-sm leading-7 text-[rgba(245,242,232,0.82)] sm:text-base">
                        {resolveCopy(item.description, language)}
                      </p>
                    </div>
                    {index < content.fit.items.length - 1 ? (
                      <div className="hidden justify-center lg:flex">
                        <ArrowRight
                          aria-hidden="true"
                          className="h-5 w-5 text-[rgba(90,181,70,0.4)]"
                          strokeWidth={1.75}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle language={language} title={content.audience.title} />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {content.audience.items.map((item, index) => (
                <Reveal delay={index * 0.08} key={item.title.en}>
                  <div className="interactive-card calm-panel calm-panel-hover h-full rounded-[8px] p-6 sm:p-7">
                    <h3 className="text-2xl leading-tight text-text">
                      {resolveCopy(item.title, language)}
                    </h3>
                    <p className="mt-6 max-w-xs text-base leading-7 text-[rgba(245,242,232,0.82)]">
                      {resolveCopy(item.description, language)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle centered language={language} title={content.getNov.title} />
            <Reveal className="mx-auto mt-6 max-w-3xl text-center" delay={0.08}>
              <p className="text-base leading-7 text-[rgba(245,242,232,0.82)]">
                {resolveCopy(content.getNov.description, language)}
              </p>
            </Reveal>
            <Reveal
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              delay={0.16}
            >
              {content.getNov.actions.map((action) => (
                <PageAction
                  href={action.href}
                  key={action.label.en}
                  label={action.label}
                  language={language}
                  variant={action.variant}
                />
              ))}
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
