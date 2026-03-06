"use client";

import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/utils";
import { soundManager } from "@/shared/lib/sound-manager";
import { Magnetic } from "@/shared/ui/Magnetic";
import { ScrollLink } from "@/shared/ui/ScrollLink";
import { AwardMenu } from "@/widgets/AwardMenu";
import { LanguageSwitcher } from "@/features/LanguageSwitcher";
import { useTranslations } from "next-intl";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Navigation() {
  const t = useTranslations("Navigation");
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navItems = useMemo(
    () => [
      { label: t("work"), href: "#work" },
      { label: t("process"), href: "#process" },
      { label: t("playground"), href: "#playground" },
      { label: t("about"), href: "#about" },
      { label: t("contact"), href: "#contact" },
    ],
    [t],
  );

  useGSAP(
    () => {
      // Scroll style change
      ScrollTrigger.create({
        start: "100px top",
        onEnter: () => setIsScrolled(true),
        onLeaveBack: () => setIsScrolled(false),
      });

      // Smart navigation: hide on scroll down, show on scroll up
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    },
    { scope: navRef },
  );

  const toggleSound = () => {
    soundManager.toggle();
    setSoundEnabled(soundManager.isEnabled());
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-[10001] transition-all duration-500 border-b",
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-gray-800 py-3 md:py-4"
            : "bg-transparent border-transparent py-4 md:py-6",
          !isVisible && !isMenuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Magnetic strength={0.5}>
            <ScrollLink
              href="#home"
              className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tighter inline-block font-grotesk"
            >
              JIMMY<span className="text-[#00f0ff]">.JULIO</span>
            </ScrollLink>
          </Magnetic>

          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Magnetic strength={0.3}>
                  <ScrollLink
                    href={item.href}
                    className="text-gray-300 hover:text-[#ccff00] transition-colors duration-300 text-xs font-mono tracking-widest inline-block p-2 relative group"
                    onMouseEnter={() =>
                      soundManager.play("hover", { volume: 0.25 })
                    }
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#ccff00] transition-all duration-300 group-hover:w-full" />
                  </ScrollLink>
                </Magnetic>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <div className="scale-90 sm:scale-100">
              <LanguageSwitcher />
            </div>

            <Magnetic strength={0.5}>
              <button
                type="button"
                onClick={toggleSound}
                className="text-gray-300 hover:text-[#00f0ff] transition-colors p-1.5 sm:p-2"
                aria-label="Toggle sound"
              >
                {soundEnabled ? (
                  <div className="flex gap-[2px] items-end h-3 sm:h-4">
                    <span className="w-[2px] h-1.5 sm:h-2 bg-current animate-pulse" />
                    <span className="w-[2px] h-3 sm:h-4 bg-current animate-pulse delay-75" />
                    <span className="w-[2px] h-2 sm:h-3 bg-current animate-pulse delay-150" />
                  </div>
                ) : (
                  <div className="w-3 sm:w-4 h-[2px] bg-current" />
                )}
              </button>
            </Magnetic>

            <Magnetic strength={1}>
              <ScrollLink href="#contact">
                <Button
                  variant="primary"
                  size="sm"
                  className="hidden md:inline-flex bg-white text-black hover:bg-[#00f0ff] font-bold tracking-widest text-xs"
                  withSound={false}
                >
                  {t("contact")}
                </Button>
              </ScrollLink>
            </Magnetic>

            <button
              className="md:hidden text-white p-1.5 sm:p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="space-y-1 sm:space-y-1.5">
                <span
                  className={cn(
                    "block w-5 sm:w-6 h-0.5 bg-white transition-transform duration-300",
                    isMenuOpen && "rotate-45 translate-y-1.5 sm:translate-y-2",
                  )}
                />
                <span
                  className={cn(
                    "block w-5 sm:w-6 h-0.5 bg-white transition-opacity duration-300",
                    isMenuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block w-5 sm:w-6 h-0.5 bg-white transition-transform duration-300",
                    isMenuOpen &&
                      "-rotate-45 -translate-y-1.5 sm:-translate-y-2",
                  )}
                />
              </div>
            </button>

            <button
              className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#00f0ff] transition-colors p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onMouseEnter={() => soundManager.play("hover", { volume: 0.2 })}
            >
              <span className="tracking-widest">{t("menuLabel")}</span>
              <div className="flex flex-col gap-[3px]">
                <span className="w-4 h-[2px] bg-current" />
                <span className="w-4 h-[2px] bg-current" />
                <span className="w-4 h-[2px] bg-current" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <AwardMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
