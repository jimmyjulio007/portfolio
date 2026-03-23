"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui/Button";
import { ScrollLink } from "@/shared/ui/ScrollLink";

// 3D is the heaviest part — only load when visible
const Scene3D = dynamic(
  () => import("@/shared/ui/Scene3D").then((mod) => mod.Scene3D),
  { ssr: false },
);

const HeroComputer = dynamic(
  () => import("@/entities/HeroComputer").then((mod) => mod.HeroComputer),
  { ssr: false },
);

export function HeroSection() {
  const t = useTranslations("Hero");
  const sceneRef = useRef<HTMLDivElement>(null);
  const [rtxEnabled, setRtxEnabled] = useState(false);
  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    const handleRTX = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      setRtxEnabled(customEvent.detail.enabled);
    };
    window.addEventListener("rtx-toggle", handleRTX);
    return () => window.removeEventListener("rtx-toggle", handleRTX);
  }, []);

  // Lazy load 3D scene — only when the container is in viewport
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad3D(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-black"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        <div className="order-2 lg:order-1">
          <div ref={sceneRef} className="h-[500px] lg:h-[600px] w-full">
            {load3D ? (
              <Scene3D enableControls={true}>
                <HeroComputer enableRTX={rtxEnabled} />
              </Scene3D>
            ) : (
              <div className="w-full h-full bg-black/10 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <p className="text-center text-gray-400 text-xs font-mono mt-4">
            {t("dragToRotate", {
              rtxStatus: rtxEnabled ? t("rtxOn") : t("rtxOff"),
            })}
          </p>
        </div>

        <div className="order-1 lg:order-2 pointer-events-auto">
          <div className="mb-6 animate-[fadeInUp_0.8s_ease-out_both]">
            <div className="mb-4">
              <span className="text-[#00f0ff] font-mono text-sm tracking-widest uppercase block mb-2">
                {t("greeting")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-migumono">
                JIMMY JULIO
              </h2>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-white font-migumono">
              <div className="flex flex-col">
                <span className="font-migumono animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
                  {t("title_line1")}
                </span>
                <span className="text-[#00f0ff] font-migumono animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
                  {t("title_line2")}
                </span>
              </div>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 font-light tracking-wide animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
            {t("subtitle")}
            <br />
            <span className="text-[#ccff00] font-mono text-sm mt-2 block">
              {t("neuralLink")}
            </span>
          </p>

          <div className="flex gap-6 flex-wrap animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <ScrollLink href="#work">
              <Button
                size="lg"
                className="w-full sm:w-auto min-w-[200px] bg-[#00f0ff] text-black hover:bg-white hover:scale-105 transition-all duration-300 font-bold tracking-widest"
                withSound={false}
              >
                {t("viewWork")}
              </Button>
            </ScrollLink>
            <ScrollLink href="#contact">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto min-w-[200px] border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black font-bold tracking-widest"
                withSound={false}
              >
                {t("contactNetwork")}
              </Button>
            </ScrollLink>
          </div>

          <div className="mt-12 animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
            <div className="glass-panel p-6 rounded-none border-l-4 border-[#00f0ff] inline-block">
              <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">
                {t("location")}
              </span>
              <span className="text-xl font-bold text-white">
                {t("locationName")}
              </span>
              <span className="text-xs text-[#00f0ff] font-mono mt-1 block">
                {t("coordinates")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 text-xs text-gray-400 font-mono hidden lg:block">
        {t("systemStatus")}
      </div>
    </section>
  );
}
