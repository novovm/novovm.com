"use client";

import { GitBranch, Wallet } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { DownloadButton } from "@/components/ui/DownloadButton";
import { type Language } from "@/lib/site-content";

const downloadCopy = {
  en: {
    description:
      "Access the wallet, developer tools, and core infrastructure of the NOVOVM network.",
    documentation: "I have my own wallet",
    eyebrow: "Download",
    github: "View GitHub",
    platforms: "Windows · macOS · Linux",
    title: "Start using NOVOVM",
    wallet: "Download NOVO Wallet",
  },
  zh: {
    description: "访问钱包、开发者工具与 NOVOVM 网络的核心基础设施。",
    documentation: "我有自己的钱包",
    eyebrow: "下载",
    github: "查看 GitHub",
    platforms: "Windows · macOS · Linux",
    title: "开始使用 NOVOVM",
    wallet: "下载 NOVO 钱包",
  },
} satisfies Record<Language, Record<string, string>>;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function DownloadSection({ language }: { language: Language }) {
  const reduceMotion = useReducedMotion();
  const copy = downloadCopy[language];

  return (
    <section
      className="relative overflow-hidden bg-background px-5 py-28 sm:px-6 sm:py-32 lg:px-8"
      id="download"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,185,95,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(99,185,95,0.9) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <motion.div
        className="relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:items-center"
        initial={reduceMotion ? false : "hidden"}
        transition={reduceMotion ? undefined : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        variants={fadeUp}
        viewport={{ amount: 0.35, once: true }}
        whileInView="visible"
      >
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-medium uppercase text-green-bright">
            {copy.eyebrow}
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-text sm:text-5xl lg:text-6xl">
            {copy.title}
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {copy.description}
          </p>
        </div>

        <div className="w-full">
          <DownloadButton
            href="/wallet/create"
            subtext={copy.platforms}
            text={copy.wallet}
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1">
            <motion.a
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-border bg-[rgba(35,24,21,0.18)] px-5 text-sm font-medium text-text transition-colors duration-300 hover:border-[rgba(99,185,95,0.72)] hover:bg-[rgba(90,181,70,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-bright motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
              href="/wallet/login"
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { y: 0 }}
            >
              <Wallet aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              {copy.documentation}
            </motion.a>
            <motion.a
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] px-5 text-sm font-medium text-muted transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-bright sm:w-auto lg:w-full"
              href="https://github.com/novovm/supervm"
              rel="noreferrer"
              target="_blank"
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { y: 0 }}
            >
              <GitBranch aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              {copy.github}
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
