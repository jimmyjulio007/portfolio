"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Navigation } from "@/widgets/Navigation";
import { HeroSection } from "@/widgets/HeroSection";
import { WorkSection } from "@/widgets/WorkSection";
import { ProcessSection } from "@/widgets/ProcessSection";
import { PlaygroundSection } from "@/widgets/PlaygroundSection";
import { AboutSection } from "@/widgets/AboutSection";
import { ContactSection } from "@/widgets/ContactSection";
import { CinematicLoader } from "@/features/CinematicLoader";
import { FloatingMusicToggle } from "@/features/FloatingMusicToggle";
import { RTXToggle } from "@/features/RTXToggle";
import { soundManager } from "@/shared/lib/sound-manager";
import { SOUND_CONFIG } from "@/shared/config/constants";
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Footer');
  // Start with false to match server rendering, then show loader on client
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(true);
  }, []);
  useEffect(() => {
    // Initialize Lenis for ultra-smooth scrolling
    const lenis = new Lenis({
      duration: 1.5, // Increased duration for smoother momentum
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Preload sound effects
    Object.entries(SOUND_CONFIG.sounds).forEach(([name, url]) => {
      soundManager.preload(name, url);
    });

    soundManager.setMasterVolume(SOUND_CONFIG.volume.master);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {isMounted && isLoading && <CinematicLoader onComplete={() => setIsLoading(false)} />}
      <FloatingMusicToggle />
      <RTXToggle />
      <main className="min-h-screen bg-[#030303] text-white selection:bg-[#00f0ff] selection:text-black">
        {/* Only show Navigation after loader completes */}
        {!isLoading && <Navigation />}
        <HeroSection />
        <ProcessSection />
        <WorkSection />
        <PlaygroundSection />
        <AboutSection />
        <ContactSection />

        <footer className="relative py-12 bg-black border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <p className="text-gray-600 text-xs font-mono">
              © {currentYear} JIMMY. {t('systemOnline')}
            </p>
            <div className="flex gap-4">
              <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse delay-75" />
              <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
