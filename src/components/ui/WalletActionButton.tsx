"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type WalletActionButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  variant?: "primary" | "secondary" | "ghost";
};

export function WalletActionButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
}: WalletActionButtonProps) {
  const buttonClassName = cn(
    "group inline-flex h-12 items-center justify-center gap-2 rounded-[6px] px-5 text-sm font-medium transition-[transform,border-color,background-color,color] duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-bright sm:w-auto",
    variant === "primary" &&
      "border border-green bg-green text-text hover:border-green-bright hover:bg-green-bright",
    variant === "secondary" &&
      "border border-[rgba(90,181,70,0.22)] bg-[rgba(4,0,0,0.36)] text-text hover:border-[rgba(140,216,103,0.58)] hover:bg-[rgba(90,181,70,0.08)]",
    variant === "ghost" && "text-muted hover:text-text",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={1.8}
      />
    </>
  );

  if (href) {
    return (
      <Link className={buttonClassName} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} onClick={onClick} type="button">
      {content}
    </button>
  );
}
