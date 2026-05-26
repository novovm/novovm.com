import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getSiteContent, type Language } from "@/lib/site-content";

type FinalCTAProps = {
  language: Language;
};

export function FinalCTA({ language }: FinalCTAProps) {
  const copy = getSiteContent(language).finalCta;

  return (
    <Section
      className="min-h-[70svh]"
      description={copy.description}
      eyebrow={copy.eyebrow}
      id="final-cta"
      title={copy.title}
      tone="center"
    >
      <Reveal
        className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        delay={0.08}
      >
        <Button href="#hero">{copy.primaryCta}</Button>
        <Button href="#developers" variant="secondary">
          {copy.secondaryCta}
        </Button>
      </Reveal>
    </Section>
  );
}
