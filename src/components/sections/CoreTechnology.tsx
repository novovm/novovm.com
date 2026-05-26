import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getSiteContent, type Language } from "@/lib/site-content";

type CoreTechnologyProps = {
  language: Language;
};

export function CoreTechnology({ language }: CoreTechnologyProps) {
  const copy = getSiteContent(language).coreTechnology;
  const items = copy.items.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        href: "/technology/parallel-execution",
      };
    }

    if (index === 1) {
      return {
        ...item,
        href: "/technology/confidential-compute",
      };
    }

    if (index === 2) {
      return {
        ...item,
        href: "/technology/verifiable-results",
      };
    }

    if (index === 3) {
      return {
        ...item,
        href: "/technology/developer-apis",
      };
    }

    return item;
  });

  return (
    <Section
      className="bg-[radial-gradient(circle_at_top_right,rgba(90,181,70,0.08),transparent_34%),var(--background)]"
      description={copy.description}
      eyebrow={copy.eyebrow}
      id="core-technology"
      title={copy.title}
    >
      <Reveal className="mt-14" delay={0.08}>
        <InteractiveGrid columns="four" items={items} />
      </Reveal>
    </Section>
  );
}
