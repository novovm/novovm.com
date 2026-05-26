import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getSiteContent, type Language } from "@/lib/site-content";

type EcosystemProps = {
  language: Language;
};

export function Ecosystem({ language }: EcosystemProps) {
  const copy = getSiteContent(language).ecosystem;

  return (
    <Section
      description={copy.description}
      eyebrow={copy.eyebrow}
      id="ecosystem"
      title={copy.title}
    >
      <Reveal className="mt-14" delay={0.08}>
        <InteractiveGrid columns="four" items={copy.items} revealOnHover />
      </Reveal>
    </Section>
  );
}
