"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ScrollLink } from "@/shared/ui/ScrollLink";

const LanguageSwitcher = dynamic(
  () =>
    import("@/features/LanguageSwitcher").then((mod) => mod.LanguageSwitcher),
  { ssr: false },
);

import { useTranslations } from "next-intl";

const AwardMenu = dynamic(
  () => import("@/widgets/AwardMenu").then((mod) => mod.AwardMenu),
  { ssr: false },
);

export function Navigation() {
  const t = useTranslations("Navigation");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = { current: 0 };

  const navItems = useMemo(
    () => [
      { label: t("work"), href: "#work" },
      { label: t("process"), href: "#process" },
      { label: t("about"), href: "#about" },
      { label: t("contact"), href: "#contact" },
    ],
    [t],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: lastScrollY is a stable mutable ref-like object used for cross-render scroll tracking; adding it would recreate the callback every render and churn the scroll listener
  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setIsScrolled(y > 100);
    if (y > lastScrollY.current && y > 200) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    lastScrollY.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[10001] transition-all duration-500 border-b",
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-gray-800 py-3 md:py-4"
            : "bg-transparent border-transparent py-4 md:py-6",
          !isVisible && !isMenuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <ScrollLink
            href="#home"
            className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tighter inline-block font-grotesk"
          >
            JIMMY<span className="text-[#00f0ff]">.JULIO</span>
          </ScrollLink>

          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <ScrollLink
                  href={item.href}
                  className="text-gray-300 hover:text-[#ccff00] transition-colors duration-300 text-xs font-mono tracking-widest inline-block p-2 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#ccff00] transition-all duration-300 group-hover:w-full" />
                </ScrollLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <div className="scale-90 sm:scale-100">
              <LanguageSwitcher />
            </div>

            <ScrollLink
              href="#contact"
              className="hidden md:inline-flex items-center justify-center px-5 py-2 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-[#00f0ff] transition-all duration-300"
            >
              {t("contact")}
            </ScrollLink>

            <button
              type="button"
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
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <AwardMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}
