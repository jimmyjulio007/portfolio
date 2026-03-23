"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useMemo } from "react";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="footer-main relative py-12 bg-black border-t border-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <p className="text-gray-400 text-xs font-mono">
            © {currentYear} JIMMY JULIO. {t("systemOnline")}
          </p>
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-[#00f0ff] text-xs font-mono transition-colors underline underline-offset-4"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <span
            className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse"
            aria-hidden="true"
          />
          <span
            className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse [animation-delay:75ms]"
            aria-hidden="true"
          />
          <span
            className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:150ms]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent" />
    </footer>
  );
}
