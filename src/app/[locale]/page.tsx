"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { Navigation } from "@/widgets/Navigation";
import { HeroSection } from "@/widgets/HeroSection";
import { soundManager } from "@/shared/lib/sound-manager";
import { SOUND_CONFIG } from "@/shared/config/constants";
import { useTranslations } from 'next-intl';
import { reportWebVitals } from '@/shared/lib/web-vitals';
import { Link } from "@/i18n/routing";

// Lazy load heavy components with dynamic imports
const WorkSection = dynamic(() => import("@/widgets/WorkSection").then(mod => ({ default: mod.WorkSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>,
  ssr: true,
});

const ProcessSection = dynamic(() => import("@/widgets/ProcessSection").then(mod => ({ default: mod.ProcessSection })), {
  loading: () => <div className="min-h-screen" />,
  ssr: true,
});

const PlaygroundSection = dynamic(() => import("@/widgets/PlaygroundSection").then(mod => ({ default: mod.PlaygroundSection })), {
  loading: () => <div className="min-h-screen" />,
  ssr: true,
});

const AboutSection = dynamic(() => import("@/widgets/AboutSection").then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="min-h-screen" />,
  ssr: true,
});

const ContactSection = dynamic(() => import("@/widgets/ContactSection").then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="min-h-screen" />,
  ssr: true,
});

const CinematicLoader = dynamic(() => import("@/features/CinematicLoader").then(mod => ({ default: mod.CinematicLoader })), {
  ssr: false,
});

const FloatingMusicToggle = dynamic(() => import("@/features/FloatingMusicToggle").then(mod => ({ default: mod.FloatingMusicToggle })), {
  ssr: false,
});

const RTXToggle = dynamic(() => import("@/features/RTXToggle").then(mod => ({ default: mod.RTXToggle })), {
  ssr: false,
});

export default function HomePage() {
  const t = useTranslations('Footer');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setIsMounted(true);

    // Check if we've already shown the loader
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }

    // Initialize web vitals monitoring
    reportWebVitals();
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
      {isMounted && isLoading && (
        <CinematicLoader
          onComplete={() => {
            setIsLoading(false);
            sessionStorage.setItem("hasLoaded", "true");
          }}
        />
      )}
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
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-gray-600 text-xs font-mono">
                © {currentYear} JIMMY. {t('systemOnline')}
              </p>
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-[#00f0ff] text-xs font-mono transition-colors underline underline-offset-4"
              >
                Privacy Policy
              </Link>
            </div>
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
