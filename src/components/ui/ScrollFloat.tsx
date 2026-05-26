"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

type ScrollFloatProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollFloat({ children, className, delay = 0 }: ScrollFloatProps) {
  const reduceMotion = useReducedMotion();

  if (typeof children !== "string" || reduceMotion) {
    return <span className={className}>{children}</span>;
  }

  // Split the string into words 
  const words = children.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 80,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, idx) => (
        <motion.span variants={child} key={idx} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
