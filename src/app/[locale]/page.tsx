"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "@/widgets/Navigation";
import { HeroSection } from "@/widgets/HeroSection";

const ProcessSection = dynamic(
  () => import("@/widgets/ProcessSection").then((mod) => ({ default: mod.ProcessSection })),
  { ssr: false },
);
const WorkSection = dynamic(
  () => import("@/widgets/WorkSection").then((mod) => ({ default: mod.WorkSection })),
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
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
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
        <AboutSection />
      </LazySection>
      <LazySection>
        <ContactSection />
      </LazySection>
      <LazySection rootMargin="200px">
        <Footer />
      </LazySection>
    </main>
  );
}
