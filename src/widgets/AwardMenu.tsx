"use client";

import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";
import { Magnetic } from "@/shared/ui/Magnetic";
import { soundManager } from "@/shared/lib/sound-manager";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/features/LanguageSwitcher";
import Link from "next/link";

interface AwardMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItemProps {
  label: string;
  href: string;
  index: string;
  onClick: (href: string) => void;
}

function MenuItem({ label, href, index, onClick }: MenuItemProps) {
  return (
    <li className="menu-item opacity-0">
      <Link
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick(href);
        }}
        className="group flex items-baseline gap-6 py-4 border-b border-gray-800/50 transition-all duration-300 hover:border-[#00f0ff]/50"
        onMouseEnter={() => soundManager.play("hover", { volume: 0.2 })}
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
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const currentYear = new Date().getFullYear();

  const menuItems = useMemo(
    () => [
      { label: t("home"), href: "#home", index: "01" },
      { label: t("process"), href: "#process", index: "02" },
      { label: t("work"), href: "#work", index: "03" },
      { label: t("playground"), href: "#playground", index: "04" },
      { label: t("about"), href: "#about", index: "05" },
      { label: t("contact"), href: "#contact", index: "06" },
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

  const { contextSafe } = useGSAP(() => {
    // Only animate when the component is actually rendered in the DOM
    if (!menuRef.current || !overlayRef.current) return;

    if (isOpen) {
      setShouldRender(true);

      // Wait one frame for DOM to be ready before querying elements
      requestAnimationFrame(() => {
        if (!menuRef.current || !overlayRef.current) return;
        const items = menuRef.current.querySelectorAll(".menu-item");
        const decor = menuRef.current.querySelectorAll(".menu-decor");
        const social = menuRef.current.querySelectorAll(".social-link");
        if (!items.length) return;

        const tl = gsap.timeline();

        tl.to(overlayRef.current, { opacity: 1, duration: 0.4 })
          .to(
            menuRef.current,
            { x: "0%", duration: 0.8, ease: "power4.out" },
            "-=0.2",
          )
          .fromTo(
            items,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: "power3.out",
            },
            "-=0.4",
          )
          .fromTo(
            decor,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8 },
            "-=0.3",
          )
          .fromTo(
            social,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.05 },
            "-=0.4",
          );
      });
    } else {
      const items = menuRef.current.querySelectorAll(".menu-item");

      const tl = gsap.timeline({
        onComplete: () => setShouldRender(false),
      });

      tl.to(items, { x: 50, opacity: 0, duration: 0.3, stagger: 0.02 })
        .to(
          menuRef.current,
          { x: "100%", duration: 0.6, ease: "power3.in" },
          "-=0.1",
        )
        .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.4");
    }
  }, [isOpen]);

  const handleNavClick = contextSafe((href: string) => {
    soundManager.play("transition");
    onClose();

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: href, autoKill: true },
      ease: "power3.inOut",
      delay: 0.5, // Wait for menu to start closing
    });
  });

  if (!shouldRender && !isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[10002] opacity-0"
        onClick={onClose}
      />

      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-gradient-to-br from-black via-[#0a0a0a] to-black border-l border-[#00f0ff]/20 z-[10003] translate-x-full overflow-y-auto"
      >
        <div className="relative h-full p-12 flex flex-col">
          <div className="absolute top-8 right-8">
            <Magnetic strength={1}>
              <button
                onClick={onClose}
                className="w-14 h-14 rounded-full border border-gray-700 hover:border-[#00f0ff] flex items-center justify-center transition-all duration-300 group"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-gray-400 group-hover:text-[#00f0ff] group-hover:rotate-90 transition-all duration-300" />
              </button>
            </Magnetic>
          </div>

          <div className="mb-16">
            <span className="text-[#00f0ff] font-mono text-xs tracking-widest">
              {t("navigationLabel")}
            </span>
            <div className="menu-decor w-20 h-[2px] bg-gradient-to-r from-[#00f0ff] to-transparent mt-2 origin-left scale-x-0" />
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
                  className="social-link text-gray-400 hover:text-[#ccff00] transition-colors text-sm font-mono opacity-0"
                  onMouseEnter={() =>
                    soundManager.play("hover", { volume: 0.15 })
                  }
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

          <div className="absolute bottom-12 left-12 w-24 h-24 border-l-2 border-b-2 border-[#ccff00]/20" />
        </div>
      </div>
    </>
  );
}
