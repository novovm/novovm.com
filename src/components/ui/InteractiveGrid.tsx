"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/cn";

export type InteractiveGridItem = {
  description: string;
  href?: string;
  meta?: string;
  title: string;
};

type InteractiveGridProps = {
  className?: string;
  columns?: "two" | "three" | "four";
  items: InteractiveGridItem[];
  revealOnHover?: boolean;
};

const columnClasses = {
  two: "md:grid-cols-2",
  three: "md:grid-cols-3",
  four: "sm:grid-cols-2 lg:grid-cols-4",
};

export function InteractiveGrid({
  className,
  columns = "three",
  items,
  revealOnHover = false,
}: InteractiveGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid gap-3", columnClasses[columns], className)}>
      {items.map((item, index) => {
        const cardClassName = cn(
          "interactive-card group relative min-h-48 rounded-[8px] border border-border bg-surface p-5 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(90,181,70,0.48)] hover:bg-[rgba(35,24,21,0.26)] focus:outline-none focus-visible:border-green-bright",
          activeIndex === index && "border-[rgba(90,181,70,0.48)]",
        );
        const content = (
          <div className="flex h-full flex-col justify-between gap-8">
            <div>
              {item.href ? (
                <span className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(90,181,70,0.14)] bg-[rgba(4,0,0,0.4)] text-muted transition-[transform,color,border-color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[rgba(140,216,103,0.36)] group-hover:text-text">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    strokeWidth={1.9}
                  />
                </span>
              ) : null}
              {item.meta ? (
                <p className="mb-4 text-xs font-medium uppercase text-green-bright">
                  {item.meta}
                </p>
              ) : null}
              <h3 className="pr-10 text-lg font-medium text-text">{item.title}</h3>
            </div>
            <p
              className={cn(
                "text-sm leading-6 text-muted",
                revealOnHover &&
                  "md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-300 md:group-hover:max-h-28 md:group-hover:opacity-100 md:group-focus:max-h-28 md:group-focus:opacity-100",
              )}
            >
              {item.description}
            </p>
          </div>
        );

        if (item.href) {
          return (
            <Link
              className={cardClassName}
              href={item.href}
              key={item.title}
              onBlur={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {content}
            </Link>
          );
        }

        return (
          <article
            className={cardClassName}
            key={item.title}
            onBlur={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            tabIndex={0}
          >
            {content}
          </article>
        );
      })}
    </div>
  );
}
