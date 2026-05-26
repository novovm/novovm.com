"use client";

import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/cn";

type SecurityNoticeProps = {
  className?: string;
  text: string;
  title?: string;
};

export function SecurityNotice({ className, text, title }: SecurityNoticeProps) {
  return (
    <div
      className={cn(
        "rounded-[8px] border border-[rgba(241,188,26,0.18)] bg-[rgba(241,188,26,0.045)] p-5 text-[rgba(248,242,232,0.78)]",
        className,
      )}
    >
      <div className="flex gap-4">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-[rgba(241,188,26,0.2)] bg-[rgba(4,0,0,0.42)] text-green-bright">
          <ShieldCheck aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        </div>
        <div>
          {title ? <p className="text-sm font-medium text-text">{title}</p> : null}
          <p className={cn("text-sm leading-6", title && "mt-2")}>{text}</p>
        </div>
      </div>
    </div>
  );
}
