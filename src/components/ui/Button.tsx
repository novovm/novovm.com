"use client";

import { ArrowRight } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  rel?: string;
  target?: string;
  variant?: "primary" | "secondary";
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

type Particle = {
  angle: number;
  distance: number;
  duration: number;
  id: number;
  scale: number;
  x: number;
  y: number;
};

const variants = {
  primary:
    "border-green bg-green text-text shadow-[0_0_0_rgba(90,181,70,0)] hover:border-green hover:bg-green hover:shadow-[0_0_0_2px_rgba(90,181,70,0.6),0_0_30px_rgba(180,255,200,0.6),0_16px_40px_rgba(90,181,70,0.4)]",
  secondary:
    "border-border bg-[rgba(35,24,21,0.2)] text-text hover:border-[rgba(241,188,26,0.6)] hover:bg-[rgba(241,188,26,0.08)] hover:shadow-[0_0_20px_rgba(241,188,26,0.3),inset_0_0_15px_rgba(241,188,26,0.1)] hover:text-white",
};

export function Button({
  children,
  className,
  variant = "primary",
  onClick,
  ...props
}: ButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newParticles = Array.from({ length: 14 }).map((_, i) => ({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * 80 + 30,
      duration: 0.5 + Math.random() * 0.4,
      id: Date.now() + i + Math.random(),
      scale: Math.random() * 3 + 1.5,
      x: clickX,
      y: clickY,
    }));
    
    setParticles((prev) => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.includes(p)));
    }, 1000);

    if (onClick) onClick(e);
  };

  return (
    <a
      className={cn(
        "group relative overflow-visible inline-flex h-12 items-center justify-center gap-2 rounded-[6px] border px-5 text-sm font-medium transition-all duration-300 hover:-translate-y-1 active:scale-95 active:translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-green",
        variants[variant],
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.8} />
      </span>

      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 0.5, scale: 0.5 }}
            animate={{
              x: p.x + Math.cos(p.angle) * p.distance,
              y: p.y + Math.sin(p.angle) * p.distance,
              opacity: 0,
              scale: p.scale,
            }}
            transition={{ duration: p.duration, ease: "easeOut" }}
            className={cn(
              "absolute top-0 left-0 pointer-events-none rounded-full blur-[3px]",
              variant === "primary" ? "bg-[rgba(180,255,200,0.8)]" : "bg-[rgba(241,188,26,0.6)]"
            )}
            style={{ width: "10px", height: "10px", zIndex: 0 }}
          />
        ))}
      </AnimatePresence>
    </a>
  );
}
