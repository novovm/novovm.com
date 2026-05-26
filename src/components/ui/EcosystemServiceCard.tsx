"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

type EcosystemServiceCardProps = {
  action: string;
  description: string;
  label: string;
  title: string;
};

export function EcosystemServiceCard({
  action,
  description,
  label,
  title,
}: EcosystemServiceCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group h-full rounded-[12px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] p-6 transition-[border-color,background-color,transform] duration-300 hover:border-[rgba(90,181,70,0.42)] hover:bg-[rgba(13,18,13,0.72)]"
      transition={reduceMotion ? undefined : { duration: 0.28 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(90,181,70,0.54)]">
        {label}
      </p>
      <h3 className="mt-4 text-2xl leading-tight text-text">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
        {description}
      </p>
      <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[rgba(245,242,232,0.82)]">
        <span>{action}</span>
        <ArrowRight
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            "group-hover:translate-x-1",
          )}
          strokeWidth={1.8}
        />
      </div>
    </motion.div>
  );
}
