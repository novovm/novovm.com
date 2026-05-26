import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";
import { type BilingualCopy, type Language } from "@/lib/site-content";

type CapabilityCardProps = {
  className?: string;
  description: BilingualCopy;
  icon: LucideIcon;
  language: Language;
  title: BilingualCopy;
};

function resolveCopy(copy: BilingualCopy, language: Language) {
  return language === "zh" ? copy.zh : copy.en;
}

export function CapabilityCard({
  className,
  description,
  icon: Icon,
  language,
  title,
}: CapabilityCardProps) {
  const titleCopy = resolveCopy(title, language);
  const descriptionCopy = resolveCopy(description, language);

  return (
    <div
      className={cn(
        "interactive-card calm-panel calm-panel-hover group rounded-[8px] p-6 sm:p-7",
        className,
      )}
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(4,0,0,0.42)] text-[rgba(245,242,232,0.9)]">
        <Icon
          aria-hidden="true"
          className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      </div>
      <div className="mt-6">
        <h3 className="text-xl leading-tight text-text">{titleCopy}</h3>
        <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
          {descriptionCopy}
        </p>
      </div>
    </div>
  );
}
