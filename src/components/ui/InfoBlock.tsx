import { cn } from "@/lib/cn";
import { type BilingualCopy, type Language } from "@/lib/site-content";

import { Reveal } from "./Reveal";

type InfoBlockProps = {
  className?: string;
  delay?: number;
  description?: BilingualCopy;
  headline: BilingualCopy;
  language: Language;
  number: string;
};

function resolveCopy(copy: BilingualCopy, language: Language) {
  return language === "zh" ? copy.zh : copy.en;
}

export function InfoBlock({
  className,
  delay = 0,
  description,
  headline,
  language,
  number,
}: InfoBlockProps) {
  const headlineCopy = resolveCopy(headline, language);
  const descriptionCopy = description
    ? resolveCopy(description, language)
    : null;

  return (
    <Reveal delay={delay}>
      <div
        className={cn(
          "group grid gap-5 border-b border-[rgba(90,181,70,0.16)] py-8 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-10",
          "calm-panel-hover",
          className,
        )}
      >
        <div className="pt-1">
          <p className="text-xs font-medium tracking-[0.32em] text-[rgba(90,181,70,0.42)] transition-colors duration-500 group-hover:text-green-bright">
            {number}
          </p>
        </div>
        <div className="max-w-4xl">
          <p className="text-2xl leading-tight text-text sm:text-[2rem]">
            {headlineCopy}
          </p>
          {descriptionCopy ? (
            <p className="mt-4 max-w-3xl text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
              {descriptionCopy}
            </p>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
