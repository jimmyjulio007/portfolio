"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "@/widgets/Navigation";
import { HeroSection } from "@/widgets/HeroSection";

// Everything below the fold — lazy loaded
const ProcessSection = dynamic(
  () => import("@/widgets/ProcessSection").then((mod) => ({ default: mod.ProcessSection })),
  { ssr: false },
);
const WorkSection = dynamic(
  () => import("@/widgets/WorkSection").then((mod) => ({ default: mod.WorkSection })),
  { ssr: false },
);
const PlaygroundSection = dynamic(
  () => import("@/widgets/PlaygroundSection").then((mod) => ({ default: mod.PlaygroundSection })),
  { ssr: false },
);
const AboutSection = dynamic(
  () => import("@/widgets/AboutSection").then((mod) => ({ default: mod.AboutSection })),
  { ssr: false },
);
const ContactSection = dynamic(
  () => import("@/widgets/ContactSection").then((mod) => ({ default: mod.ContactSection })),
  { ssr: false },
);
const Footer = dynamic(
  () => import("@/widgets/Footer").then((mod) => ({ default: mod.Footer })),
  { ssr: false },
);
const FloatingMusicToggle = dynamic(
  () => import("@/features/FloatingMusicToggle").then((mod) => ({ default: mod.FloatingMusicToggle })),
  { ssr: false },
);
const RTXToggle = dynamic(
  () => import("@/features/RTXToggle").then((mod) => ({ default: mod.RTXToggle })),
  { ssr: false },
);

/** Renders children only when sentinel enters viewport */
function LazySection({
  children,
  rootMargin = "300px",
}: {
  children: React.ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {visible ? children : <div className="min-h-[50vh]" />}
    </div>
  );
}

export default function HomePage() {
  const [showExtras, setShowExtras] = useState(false);

  useEffect(() => {
    // Prevent browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    // Defer everything non-critical until idle
    const id = requestIdleCallback(
      () => {
        setShowExtras(true);

        // Lazy web vitals
        import("@/shared/lib/web-vitals").then(({ reportWebVitals }) => reportWebVitals());

        // Lazy smooth scroll
        import("lenis").then(({ default: Lenis }) => {
          const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
          (window as any).__lenisCleanup = () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
          };
        });

        // Sounds: only on first interaction
        const initSounds = () => {
          import("@/shared/lib/sound-manager").then(({ soundManager }) => {
            import("@/shared/config/constants").then(({ SOUND_CONFIG }) => {
              const { ambient: _ambient, ...uiSounds } = SOUND_CONFIG.sounds;
              for (const [name, url] of Object.entries(uiSounds)) {
                soundManager.preload(name, url);
              }
              soundManager.setMasterVolume(SOUND_CONFIG.volume.master);
            });
          });
          window.removeEventListener("pointerdown", initSounds);
          window.removeEventListener("keydown", initSounds);
        };
        window.addEventListener("pointerdown", initSounds, { once: true });
        window.addEventListener("keydown", initSounds, { once: true });
      },
      { timeout: 1500 },
    );

    return () => {
      cancelIdleCallback(id);
      (window as any).__lenisCleanup?.();
    };
  }, []);

  return (
    <>
      {showExtras && (
        <>
          <FloatingMusicToggle />
          <RTXToggle />
        </>
      )}
      <main className="min-h-screen bg-[#030303] text-white selection:bg-[#00f0ff] selection:text-black">
        <Navigation />
        <HeroSection />
        <LazySection rootMargin="100px">
          <ProcessSection />
        </LazySection>
        <LazySection>
          <WorkSection />
        </LazySection>
        <LazySection>
          <PlaygroundSection />
        </LazySection>
        <LazySection>
          <AboutSection />
        </LazySection>
        <LazySection>
          <ContactSection />
        </LazySection>
        <LazySection rootMargin="200px">
          <Footer />
        </LazySection>
      </main>
    </>
  );
}
