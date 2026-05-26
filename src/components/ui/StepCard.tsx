"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type StepCardProps = {
  children?: ReactNode;
  className?: string;
  description?: string;
  eyebrow?: string;
  title: string;
};

export function StepCard({
  children,
  className,
  description,
  eyebrow,
  title,
}: StepCardProps) {
  return (
    <article
      className={cn(
        "group rounded-[8px] border border-[rgba(90,181,70,0.18)] bg-[rgba(7,7,7,0.68)] p-5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[rgba(140,216,103,0.54)] hover:bg-[rgba(14,20,14,0.72)] sm:p-6",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-[rgba(90,181,70,0.52)] transition-colors duration-300 group-hover:text-green-bright">
          {eyebrow}
        </p>
      ) : null}
      <h3 className={cn("text-xl font-medium leading-tight text-text", eyebrow && "mt-5")}>
        {title}
      </h3>
      {description ? (
        <p className="mt-4 text-sm leading-6 text-muted">{description}</p>
      ) : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </article>
  );
}
