import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import {
  getSiteContent,
  type BilingualCopy,
  type Language,
  whatIsNovContent,
} from "@/lib/site-content";

type NovEconomyProps = {
  language: Language;
};

function resolveCopy(copy: BilingualCopy, language: Language) {
  return language === "zh" ? copy.zh : copy.en;
}

export function NovEconomy({ language }: NovEconomyProps) {
  const copy = getSiteContent(language).economy;
  const novTitle = resolveCopy(whatIsNovContent.hero.title, language);
  const novDescription = resolveCopy(whatIsNovContent.hero.description, language);

  return (
    <Section
      className="bg-[linear-gradient(180deg,var(--background),var(--surface)_52%,var(--background))]"
      description={copy.description}
      eyebrow={copy.eyebrow}
      id="nov-economy"
      title={copy.title}
    >
      <Reveal className="mt-14" delay={0.08}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
          <Link
            className="interactive-card calm-panel calm-panel-hover group relative flex rounded-[8px] p-6 sm:p-8"
            href="/what-is-nov"
          >
            <div className="max-w-md">
              <p className="text-4xl font-semibold text-text sm:text-5xl">
                NOV
              </p>
              <p className="mt-6 text-base leading-8 text-[rgba(245,242,232,0.84)] sm:text-lg">
                {novDescription}
              </p>
              <p className="mt-10 text-xs font-medium uppercase tracking-[0.28em] text-[rgba(90,181,70,0.52)]">
                {novTitle}
              </p>
            </div>
            <span className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(90,181,70,0.14)] bg-[rgba(4,0,0,0.4)] text-muted transition-[transform,color,border-color] duration-500 group-hover:translate-x-1 group-hover:border-[rgba(90,181,70,0.32)] group-hover:text-text">
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </span>
          </Link>
          <InteractiveGrid className="lg:grid-cols-3" items={copy.items} />
        </div>
      </Reveal>
    </Section>
  );
}
