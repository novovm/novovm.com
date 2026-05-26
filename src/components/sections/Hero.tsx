"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { getSiteContent, type Language } from "@/lib/site-content";
import { cn } from "@/lib/cn";

type HeroProps = {
  language: Language;
};

const heroVideos = [
  "/media/hero-1-web.mp4?v=20260516",
  "/media/hero-kling-960-web.mp4?v=20260516",
];

export function Hero({ language }: HeroProps) {
  const copy = getSiteContent(language).hero;
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [previousVideo, setPreviousVideo] = useState<number | null>(null);

  function playVideo(index: number) {
    const video = videoRefs.current[index];

    if (!video) {
      return;
    }

    video.currentTime = 0;
    void video.play();
  }

  function switchToNext(index: number) {
    if (index !== activeVideo || previousVideo !== null) {
      return;
    }

    const nextIndex = (index + 1) % heroVideos.length;

    setPreviousVideo(index);
    setActiveVideo(nextIndex);
    playVideo(nextIndex);

    window.setTimeout(() => {
      const previous = videoRefs.current[index];

      if (previous) {
        previous.pause();
        previous.currentTime = 0;
      }

      setPreviousVideo(null);
    }, 1000);
  }

  function handleTimeUpdate(index: number) {
    const video = videoRefs.current[index];

    if (!video || !video.duration) {
      return;
    }

    if (video.duration - video.currentTime <= 1) {
      switchToNext(index);
    }
  }

  return (
    <section
      className="relative z-20 flex min-h-screen items-center overflow-hidden bg-background px-5 pb-20 pt-32 sm:px-6 lg:px-8"
      id="hero"
    >
      {heroVideos.map((src, index) => {
        const primary = activeVideo === index;

        return (
          <video
            aria-hidden="true"
            autoPlay={index === 0}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
              primary ? "opacity-90" : "opacity-0",
            )}
            key={src}
            muted
            onEnded={() => switchToNext(index)}
            onTimeUpdate={() => handleTimeUpdate(index)}
            playsInline
            preload="auto"
            ref={(node) => {
              videoRefs.current[index] = node;
            }}
            src={src}
          />
        );
      })}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,0,0,0.9)_0%,rgba(4,0,0,0.64)_42%,rgba(4,0,0,0.2)_100%),linear-gradient(180deg,rgba(4,0,0,0.48)_0%,rgba(4,0,0,0.08)_46%,rgba(4,0,0,0.78)_100%)]"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-5xl">
          <p className="mb-5 text-xs font-medium uppercase text-green-bright">
            {copy.eyebrow}
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] text-text sm:text-6xl lg:text-7xl">
            {copy.title.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {copy.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#understand-web3">{copy.primaryCta}</Button>
            <Button href="#research" variant="secondary">
              {copy.secondaryCta}
            </Button>
          </div>
        </div>

        <div className="mt-20 grid max-w-4xl gap-3 border-t border-border pt-6 text-sm text-muted sm:grid-cols-3">
          {copy.stats.map((item) => (
            <div key={item.title}>
              <p className="font-medium text-text">{item.title}</p>
              <p className="mt-2 leading-6">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
