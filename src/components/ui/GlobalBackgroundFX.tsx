"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function GlobalBackgroundFX() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [hideOnHero, setHideOnHero] = useState(pathname === "/");

  useEffect(() => {
    if (pathname !== "/") {
      const frame = window.requestAnimationFrame(() => {
        setHideOnHero(false);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    const heroThreshold = () => Math.max(window.innerHeight * 0.82, 560);

    const handleScroll = () => {
      setHideOnHero(window.scrollY < heroThreshold());
    };

    const frame = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  if (hideOnHero) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[12] overflow-hidden opacity-100"
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-18%", "24%", "10%", "-18%"],
                y: ["-12%", "8%", "28%", "-12%"],
                scale: [1, 1.12, 0.94, 1],
              }
        }
        className="absolute left-[-16rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[rgba(90,181,70,0.24)] blur-[140px]"
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 18,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }
        }
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["16%", "-24%", "14%", "16%"],
                y: ["24%", "-10%", "16%", "24%"],
                scale: [0.9, 1.08, 0.98, 0.9],
              }
        }
        className="absolute right-[-14rem] top-[12rem] h-[28rem] w-[28rem] rounded-full bg-[rgba(90,181,70,0.18)] blur-[130px]"
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 22,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }
        }
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-8%", "18%", "-14%", "-8%"],
                y: ["12%", "-18%", "10%", "12%"],
                scale: [1, 0.92, 1.1, 1],
              }
        }
        className="absolute bottom-[-14rem] left-[24%] h-[30rem] w-[30rem] rounded-full bg-[rgba(90,181,70,0.18)] blur-[150px]"
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 20,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }
        }
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,181,70,0.06),transparent_56%)]" />
    </div>
  );
}
