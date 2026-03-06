"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { Navigation } from "@/widgets/Navigation";
import { HeroSection } from "@/widgets/HeroSection";
import { Footer } from "@/widgets/Footer";
import { soundManager } from "@/shared/lib/sound-manager";
import { SOUND_CONFIG } from "@/shared/config/constants";
import { reportWebVitals } from "@/shared/lib/web-vitals";

// Lazy load heavy components with dynamic imports
const WorkSection = dynamic(
  () =>
    import("@/widgets/WorkSection").then((mod) => ({
      default: mod.WorkSection,
    })),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    ),
    ssr: true,
  },
);

const ProcessSection = dynamic(
  () =>
    import("@/widgets/ProcessSection").then((mod) => ({
      default: mod.ProcessSection,
    })),
  {
    loading: () => <div className="min-h-screen" />,
    ssr: true,
  },
);

const PlaygroundSection = dynamic(
  () =>
    import("@/widgets/PlaygroundSection").then((mod) => ({
      default: mod.PlaygroundSection,
    })),
  {
    loading: () => <div className="min-h-screen" />,
    ssr: true,
  },
);

const AboutSection = dynamic(
  () =>
    import("@/widgets/AboutSection").then((mod) => ({
      default: mod.AboutSection,
    })),
  {
    loading: () => <div className="min-h-screen" />,
    ssr: true,
  },
);

const ContactSection = dynamic(
  () =>
    import("@/widgets/ContactSection").then((mod) => ({
      default: mod.ContactSection,
    })),
  {
    loading: () => <div className="min-h-screen" />,
    ssr: true,
  },
);

const CinematicLoader = dynamic(
  () =>
    import("@/features/CinematicLoader").then((mod) => ({
      default: mod.CinematicLoader,
    })),
  {
    ssr: false,
  },
);

const FloatingMusicToggle = dynamic(
  () =>
    import("@/features/FloatingMusicToggle").then((mod) => ({
      default: mod.FloatingMusicToggle,
    })),
  {
    ssr: false,
  },
);

const RTXToggle = dynamic(
  () =>
    import("@/features/RTXToggle").then((mod) => ({ default: mod.RTXToggle })),
  {
    ssr: false,
  },
);

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

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

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Preload sound effects
    Object.entries(SOUND_CONFIG.sounds).forEach(([name, url]) => {
      soundManager.preload(name, url);
    });

    soundManager.setMasterVolume(SOUND_CONFIG.volume.master);

    return () => {
      cancelAnimationFrame(rafId);
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
            window.dispatchEvent(new Event("app-loaded"));
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
        <Footer />
      </main>
    </>
  );
}
