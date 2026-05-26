import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { type BilingualCopy, type Language } from "@/lib/site-content";

type StepPanelProps = {
  active: boolean;
  className?: string;
  description: BilingualCopy;
  href?: string;
  language: Language;
  note: BilingualCopy;
  number: string;
  onActivate?: () => void;
  title: BilingualCopy;
};

function resolveCopy(copy: BilingualCopy, language: Language) {
  return language === "zh" ? copy.zh : copy.en;
}

export function StepPanel({
  active,
  className,
  description,
  href,
  language,
  note,
  number,
  onActivate,
  title,
}: StepPanelProps) {
  const descriptionCopy = resolveCopy(description, language);
  const noteCopy = resolveCopy(note, language);
  const titleCopy = resolveCopy(title, language);
  const panelClassName = cn(
    "group relative grid w-full gap-5 rounded-[8px] border border-transparent bg-transparent px-0 py-0 text-left transition-[border-color,background-color] duration-500 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-8",
    className,
  );
  const content = (
    <>
      <div className="relative flex lg:justify-center">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border text-xs font-medium tracking-[0.28em] transition-[color,border-color,background-color] duration-500",
            active
              ? "border-[rgba(140,216,103,0.58)] bg-[rgba(13,18,13,0.88)] text-green-bright"
              : "border-[rgba(90,181,70,0.2)] bg-[rgba(4,0,0,0.48)] text-[rgba(90,181,70,0.52)] group-hover:border-[rgba(140,216,103,0.42)] group-hover:text-green-bright",
          )}
        >
          {number}
        </span>
      </div>
      <div
        className={cn(
          "calm-panel calm-panel-hover interactive-card relative rounded-[8px] p-5 sm:p-6",
          active &&
            "border-[rgba(140,216,103,0.55)] bg-[rgba(13,18,13,0.72)]",
        )}
      >
        {href ? (
          <span className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(90,181,70,0.14)] bg-[rgba(4,0,0,0.4)] text-muted transition-[transform,color,border-color] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[rgba(140,216,103,0.36)] group-hover:text-text">
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.9} />
          </span>
        ) : null}
        <h3 className="text-xl leading-tight text-text">{titleCopy}</h3>
        <p className="mt-3 max-w-3xl pr-10 text-sm leading-6 text-[rgba(245,242,232,0.82)] sm:text-base">
          {descriptionCopy}
        </p>
        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity,margin] duration-500 lg:hidden",
            active ? "mt-4 max-h-28 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <p className="text-sm leading-6 text-green-bright">{noteCopy}</p>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        className={panelClassName}
        href={href}
        onFocus={onActivate}
        onMouseEnter={onActivate}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={panelClassName}
      onClick={onActivate}
      onFocus={onActivate}
      onMouseEnter={onActivate}
      type="button"
    >
      {content}
    </button>
  );
}
