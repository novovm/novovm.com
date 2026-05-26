import { BookOpen, Code2, Terminal } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getSiteContent, type Language } from "@/lib/site-content";

const icons = [Code2, Terminal, BookOpen];

type DevelopersProps = {
  language: Language;
};

export function Developers({ language }: DevelopersProps) {
  const copy = getSiteContent(language).developers;

  return (
    <Section
      className="bg-[radial-gradient(circle_at_bottom_left,rgba(90,181,70,0.08),transparent_34%),var(--background)]"
      description={copy.description}
      eyebrow={copy.eyebrow}
      id="developers"
      title={copy.title}
    >
      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal delay={0.08}>
          <div className="rounded-[8px] border border-border bg-surface p-5">
            <div className="mb-5 flex items-center gap-2 border-b border-border pb-4 text-sm text-muted">
              <span className="h-2.5 w-2.5 rounded-full bg-green-bright" />
              {copy.codeWindowLabel}
            </div>
            <pre className="overflow-x-auto text-sm leading-7 text-muted">
              <code>{copy.codeSample}</code>
            </pre>
          </div>
        </Reveal>

        <Reveal className="grid gap-3" delay={0.14}>
          {copy.items.map((item, index) => {
            const Icon = icons[index];

            return (
              <article
                className="interactive-card rounded-[8px] border border-border bg-surface p-5 transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-[rgba(90,181,70,0.48)] hover:bg-[rgba(35,24,21,0.26)]"
                key={item.title}
              >
                <Icon className="mb-5 h-5 w-5 text-green-bright" />
                <h3 className="text-lg font-medium text-text">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </article>
            );
          })}
          <div className="pt-3">
            <Button href="#final-cta" variant="secondary">
              {copy.previewCta}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
