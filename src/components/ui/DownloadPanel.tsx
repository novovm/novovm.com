"use client";

import { Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/Button";

type DownloadPanelProps = {
  cta: string;
  description: string;
  href: string;
  platforms: string;
  title: string;
};

export function DownloadPanel({
  cta,
  description,
  href,
  platforms,
  title,
}: DownloadPanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="rounded-[12px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[rgba(90,181,70,0.48)] hover:bg-[rgba(13,18,13,0.72)]"
      transition={reduceMotion ? undefined : { duration: 0.28 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h3 className="text-2xl leading-tight text-text">{title}</h3>
          <p className="mt-5 text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
            {description}
          </p>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-[rgba(90,181,70,0.54)]">
            {platforms}
          </p>
        </div>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
          transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity }}
          className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-[rgba(90,181,70,0.16)] bg-[rgba(4,0,0,0.46)] text-[rgba(90,181,70,0.8)] sm:inline-flex"
        >
          <Download className="h-5 w-5" strokeWidth={1.8} />
        </motion.div>
      </div>

      <div className="mt-8">
        <Button href={href}>{cta}</Button>
      </div>
    </motion.div>
  );
}
