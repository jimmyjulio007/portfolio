"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useState, useTransition, useRef, useEffect } from "react";

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

/** Inline Globe SVG — avoids loading entire lucide-react bundle */
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export function LanguageSwitcher({ dropUp = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [isOpen]);

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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-gray-800 hover:border-[#00f0ff] rounded-full transition-all duration-300 group shadow-lg"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <GlobeIcon
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
            className={`absolute ${dropUp ? "bottom-full mb-3" : "top-full mt-3"} right-0 w-48 bg-black/95 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 p-1 animate-[fadeInUp_0.2s_ease-out_both]`}
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
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 mb-0.5
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
