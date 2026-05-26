"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { cn } from "@/lib/cn";

type DappDownloadCardProps = {
  category: string;
  cta: string;
  description: string;
  featured?: boolean;
  href?: string;
  title: string;
};

export function DappDownloadCard({
  category,
  cta,
  description,
  featured = false,
  href,
  title,
}: DappDownloadCardProps) {
  const reduceMotion = useReducedMotion();
  const isAvailable = Boolean(href);

  return (
    <motion.div
      className={cn(
        "rounded-[12px] border bg-[rgba(10,6,6,0.88)] p-6 transition-[border-color,background-color,transform] duration-300",
        featured ? "border-[rgba(90,181,70,0.22)]" : "border-[rgba(90,181,70,0.14)]",
        isAvailable && "hover:border-[rgba(90,181,70,0.42)] hover:bg-[rgba(13,18,13,0.72)]",
      )}
      transition={reduceMotion ? undefined : { duration: 0.28 }}
      whileHover={reduceMotion || !isAvailable ? undefined : { y: -4 }}
    >
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.54)]">
        {category}
      </p>
      <h3 className="mt-4 text-2xl leading-tight text-text">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
        {description}
      </p>

      <div className="mt-8">
        {isAvailable && href ? (
          <Link
            className="group inline-flex items-center gap-2 rounded-[6px] border border-green bg-green px-4 py-3 text-sm font-medium text-text transition-all duration-300 hover:-translate-y-0.5"
            href={href}
          >
            <span>{cta}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.8} />
          </Link>
        ) : (
          <span className="inline-flex items-center rounded-[6px] border border-[rgba(245,242,232,0.12)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm font-medium text-[rgba(245,242,232,0.48)]">
            {cta}
          </span>
        )}
      </div>
    </motion.div>
  );
}
