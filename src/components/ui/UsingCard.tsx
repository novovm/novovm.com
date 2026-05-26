"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

type UsingCardProps = {
  description: string;
  icon: LucideIcon;
  label?: string;
  title: string;
};

export function UsingCard({
  description,
  icon: Icon,
  label,
  title,
}: UsingCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group h-full rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[rgba(90,181,70,0.46)] hover:bg-[rgba(13,18,13,0.72)]"
      transition={reduceMotion ? undefined : { duration: 0.28 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[rgba(90,181,70,0.2)] bg-[rgba(4,0,0,0.42)] text-[rgba(245,242,232,0.9)]">
        <Icon
          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.8}
        />
      </div>
      {label ? (
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-[rgba(90,181,70,0.54)]">
          {label}
        </p>
      ) : null}
      <h3 className={cn("text-2xl leading-tight text-text", label ? "mt-3" : "mt-5")}>
        {title}
      </h3>
      <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
        {description}
      </p>
    </motion.div>
  );
}
