"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useState, useTransition, useRef } from "react";
import { Globe } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const LOCALES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
] as const;

interface LanguageSwitcherProps {
  dropUp?: boolean;
}

/**
 * LanguageSwitcher Component
 * - Smooth GSAP transitions for dropdown
 * - Polished UI with glassmorphism and HSL highlights
 */
export function LanguageSwitcher({ dropUp = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: dropUp ? 10 : -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power4.out" },
      );

      gsap.fromTo(
        ".lang-btn",
        { x: -10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        },
      );
    }
  }, [isOpen, dropUp]);

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      setIsOpen(false);
    });
  };

  const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-gray-800 hover:border-[#00f0ff] rounded-full transition-all duration-300 group shadow-lg"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe
          className={`w-4 h-4 text-gray-400 group-hover:text-[#00f0ff] transition-all duration-500 ${isOpen ? "rotate-180 text-[#00f0ff]" : ""}`}
        />
        <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">
          {currentLocale.flag} {currentLocale.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/5"
            onClick={() => setIsOpen(false)}
          />

          <div
            ref={dropdownRef}
            className={`absolute ${dropUp ? "bottom-full mb-3" : "top-full mt-3"} right-0 w-48 bg-black/95 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 p-1`}
            role="listbox"
          >
            <div className="px-3 py-2 text-[10px] font-mono text-gray-500 uppercase tracking-tighter border-b border-gray-900 mb-1">
              Select Language
            </div>
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                onClick={() => handleLocaleChange(loc.code)}
                disabled={isPending}
                className={`
                                    lang-btn w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 mb-0.5
                                    ${
                                      locale === loc.code
                                        ? "bg-[#00f0ff]/10 text-[#00f0ff]"
                                        : "text-gray-400 hover:bg-gray-900 hover:text-white"
                                    }
                                    ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                                `}
                role="option"
                aria-selected={locale === loc.code}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{loc.flag}</span>
                  <span className="text-xs font-mono">{loc.name}</span>
                </div>
                {locale === loc.code && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
