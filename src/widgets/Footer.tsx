"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Footer Widget
 * - Extracting from page.tsx for better architecture (FSD)
 * - Adding accessibility-first approach
 */
export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useGSAP(() => {
    gsap.from(".footer-dot", {
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: ".footer-main",
        start: "top bottom",
      },
    });
  });

  return (
    <footer className="footer-main relative py-12 bg-black border-t border-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <p className="text-gray-600 text-xs font-mono">
            © {currentYear} JIMMY JULIO. {t("systemOnline")}
          </p>
          <Link
            href="/privacy"
            className="text-gray-600 hover:text-[#00f0ff] text-xs font-mono transition-colors underline underline-offset-4"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <span
            className="footer-dot w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse"
            aria-hidden="true"
          />
          <span
            className="footer-dot w-2 h-2 bg-[#ccff00] rounded-full animate-pulse delay-75"
            aria-hidden="true"
          />
          <span
            className="footer-dot w-2 h-2 bg-white rounded-full animate-pulse delay-150"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Subtle background gradient deco */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent" />
    </footer>
  );
}
