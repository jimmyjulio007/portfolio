"use client";

import { useMemo } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/features/LanguageSwitcher";
import Link from "next/link";

interface AwardMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MenuItem({
  label,
  href,
  index,
  onClick,
}: {
  label: string;
  href: string;
  index: string;
  onClick: (href: string) => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick(href);
        }}
        className="group flex items-baseline gap-6 py-4 border-b border-gray-800/50 transition-all duration-300 hover:border-[#00f0ff]/50"
      >
        <span className="text-[#00f0ff]/40 font-mono text-sm group-hover:text-[#00f0ff] transition-colors">
          {index}
        </span>
        <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-[#00f0ff] transition-all duration-300 group-hover:translate-x-2">
          {label}
        </span>
      </Link>
    </li>
  );
}

export function AwardMenu({ isOpen, onClose }: AwardMenuProps) {
  const t = useTranslations("Navigation");
  const tContact = useTranslations("Contact");
  const currentYear = new Date().getFullYear();

  const menuItems = useMemo(
    () => [
      { label: t("home"), href: "#home", index: "01" },
      { label: t("process"), href: "#process", index: "02" },
      { label: t("work"), href: "#work", index: "03" },
      { label: t("about"), href: "#about", index: "04" },
      { label: t("contact"), href: "#contact", index: "05" },
    ],
    [t],
  );

  const socialLinks = useMemo(
    () => [
      { label: tContact("socialGithub"), href: "#" },
      { label: tContact("socialLinkedin"), href: "#" },
      { label: tContact("socialTwitter"), href: "#" },
    ],
    [tContact],
  );

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[10002] animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-gradient-to-br from-black via-[#0a0a0a] to-black border-l border-[#00f0ff]/20 z-[10003] overflow-y-auto animate-[slideInRight_0.4s_ease-out]">
        <div className="relative h-full p-12 flex flex-col">
          <div className="absolute top-8 right-8">
            <button
              onClick={onClose}
              className="w-14 h-14 rounded-full border border-gray-700 hover:border-[#00f0ff] flex items-center justify-center transition-all duration-300 group"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-400 group-hover:text-[#00f0ff] group-hover:rotate-90 transition-all duration-300" />
            </button>
          </div>

          <div className="mb-16">
            <span className="text-[#00f0ff] font-mono text-xs tracking-widest">
              {t("navigationLabel")}
            </span>
            <div className="w-20 h-[2px] bg-gradient-to-r from-[#00f0ff] to-transparent mt-2" />
          </div>

          <nav className="flex-1">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  index={item.index}
                  onClick={handleNavClick}
                />
              ))}
            </ul>
          </nav>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm mb-4 font-mono">
              {t("connectLabel")}
            </p>
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-[#ccff00] transition-colors text-sm font-mono"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 md:hidden">
              <LanguageSwitcher dropUp={true} />
            </div>

            <p className="text-gray-700 text-xs font-mono mt-8">
              © {currentYear} JIMMY JULIO
              <br />
              Antananarivo, Madagascar
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
