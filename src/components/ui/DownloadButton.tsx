"use client";

import { Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

type DownloadButtonProps = {
  className?: string;
  href: string;
  subtext: string;
  text: string;
};

export function DownloadButton({
  className,
  href,
  subtext,
  text,
}: DownloadButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      className={cn(
        "group flex w-full items-center justify-between rounded-[8px] border border-[rgba(99,185,95,0.62)] bg-[rgba(20,72,34,0.74)] px-6 py-5 text-left text-white outline-none transition-colors duration-300 hover:border-[rgba(128,214,107,0.95)] hover:bg-[rgba(27,88,42,0.82)] focus-visible:ring-2 focus-visible:ring-green-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-[rgba(18,62,30,0.9)] sm:px-7 sm:py-6",
        "motion-safe:hover:-translate-y-[3px] motion-safe:active:translate-y-[1px]",
        className,
      )}
      href={href}
      transition={reduceMotion ? undefined : { duration: 0.18, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { y: 1, scale: 0.995 }}
    >
      <span>
        <span className="block text-base font-semibold tracking-normal sm:text-lg">
          {text}
        </span>
        <span className="mt-1 block text-sm text-[rgba(255,255,255,0.68)]">
          {subtext}
        </span>
      </span>
      <span className="ml-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-[rgba(255,255,255,0.14)] bg-[rgba(0,0,0,0.22)] transition-colors duration-300 group-hover:border-[rgba(255,255,255,0.24)]">
        <Download aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
      </span>
    </motion.a>
  );
}
