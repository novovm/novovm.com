import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getSiteContent, type Language } from "@/lib/site-content";

type FourLayerNetworkProps = {
  language: Language;
};

export function FourLayerNetwork({ language }: FourLayerNetworkProps) {
  const copy = getSiteContent(language).fourLayerNetwork;

  return (
    <Section
      description={copy.description}
      eyebrow={copy.eyebrow}
      id="four-layer-network"
      title={copy.title}
    >
      <Reveal className="mt-14" delay={0.08}>
        <div className="grid gap-3">
          {copy.layers.map((layer, index) => (
            <article
              className="interactive-card group grid gap-5 rounded-[8px] border border-border bg-surface p-5 transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-[rgba(90,181,70,0.48)] hover:bg-[rgba(35,24,21,0.26)] sm:grid-cols-[0.28fr_1fr]"
              key={layer.title}
              tabIndex={0}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-border bg-surface-soft text-sm font-medium text-green-bright">
                  {index + 1}
                </span>
                <p className="text-xs font-medium uppercase text-muted">
                  {layer.meta}
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-[0.42fr_1fr] md:items-center">
                <h3 className="text-xl font-medium text-text">{layer.title}</h3>
                <p className="text-sm leading-6 text-muted">
                  {layer.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
