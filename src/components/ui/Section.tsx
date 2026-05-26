import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Reveal } from "./Reveal";
import { MagneticGrid } from "./MagneticGrid";

type SectionProps = {
  children: ReactNode;
  className?: string;
  description: string;
  eyebrow: string;
  id: string;
  title: string;
  tone?: "left" | "center";
};

export function Section({
  children,
  className,
  description,
  eyebrow,
  id,
  title,
  tone = "left",
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative min-h-[88svh] overflow-hidden border-t border-border bg-background px-5 py-24 sm:px-6 lg:px-8 lg:py-32 group",
        className,
      )}
      id={id}
    >
      <MagneticGrid />
      <div className="relative z-10 mx-auto w-full max-w-7xl pointer-events-none">
        <div className="pointer-events-auto">
          <Reveal
          className={cn(
            "max-w-3xl",
            tone === "center" && "mx-auto text-center",
          )}
        >
          <p className="mb-4 text-xs font-medium uppercase text-green-bright">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
        </div>
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
