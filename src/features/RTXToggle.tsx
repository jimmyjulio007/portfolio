"use client";

import { useState, useRef } from "react";
import { Zap, ZapOff } from "lucide-react";
import { soundManager } from "@/shared/lib/sound-manager";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "@/shared/ui/Magnetic";

/**
 * RTXToggle Feature
 * - High-performance visual switch for 3D effects
 * - Enhanced with GSAP animations and Magnetic feedback
 */
export function RTXToggle() {
  const t = useTranslations("Hero");
  const [rtxEnabled, setRTXEnabled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const toggleRTX = contextSafe(() => {
    const nextState = !rtxEnabled;
    setRTXEnabled(nextState);
    soundManager.play("click", { volume: 0.5 });

    // Visual feedback animation
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.9 },
      { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" },
    );

    // Dispatch custom event for 3D components
    window.dispatchEvent(
      new CustomEvent("rtx-toggle", {
        detail: { enabled: nextState },
      }),
    );
  });

  return (
    <div className="fixed bottom-[164px] right-6 z-50">
      <Magnetic strength={0.5}>
        <button
          ref={buttonRef}
          onClick={toggleRTX}
          className={`px-4 py-3 rounded-lg font-mono text-xs tracking-widest transition-all duration-500 flex items-center gap-2 group ${rtxEnabled
            ? "bg-gradient-to-r from-[#00f0ff] to-[#ccff00] text-black shadow-[0_0_30px_rgba(0,240,255,0.6)]"
            : "bg-black/80 backdrop-blur-md text-gray-400 border border-gray-800 hover:border-[#00f0ff]/50 hover:text-white"
            }`}
          aria-label={rtxEnabled ? "Disable RTX Mode" : "Enable RTX Mode"}
          aria-pressed={rtxEnabled}
        >
          <div className="relative">
            {rtxEnabled ? (
              <Zap className="w-4 h-4 animate-pulse" />
            ) : (
              <ZapOff className="w-4 h-4" />
            )}

            {/* Glow effect when active */}
            {rtxEnabled && (
              <span className="absolute inset-0 bg-white blur-md opacity-50 rounded-full animate-ping" />
            )}
          </div>

          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
            RTX {rtxEnabled ? t("rtxOn") : t("rtxOff")}
          </span>
        </button>
      </Magnetic>
    </div>
  );
}
