"use client";

import { useState, useEffect, useRef } from "react";
import { soundManager } from "@/shared/lib/sound-manager";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "@/shared/ui/Magnetic";

/**
 * FloatingMusicToggle Feature
 * - Seamless Ambient Music Control
 * - Visual "sound waves" animation with GSAP
 */
export function FloatingMusicToggle() {
  const t = useTranslations("Common");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const wavesRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const startMusic = () => {
      soundManager.play("ambient", { loop: true, volume: 0.3 });
      setIsMusicPlaying(true);
      window.removeEventListener("click", startMusic);
    };

    const timer = setTimeout(() => {
      window.addEventListener("click", startMusic, { once: true });
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", startMusic);
    };
  }, []);

  useGSAP(() => {
    if (isMusicPlaying && wavesRef.current) {
      const bars = wavesRef.current.querySelectorAll(".sound-bar");
      gsap.to(bars, {
        scaleY: "random(0.3, 1)",
        duration: 0.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.05,
        ease: "none",
      });
    } else {
      gsap.killTweensOf(".sound-bar");
    }
  }, [isMusicPlaying]);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      soundManager.stop("ambient");
      setIsMusicPlaying(false);
    } else {
      soundManager.play("ambient", { loop: true, volume: 0.3 });
      setIsMusicPlaying(true);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-[98px] right-7 z-50">
      <Magnetic strength={0.8}>
        <button
          ref={buttonRef}
          onClick={toggleMusic}
          className={`relative p-4 rounded-full shadow-2xl transition-all duration-500 group overflow-hidden ${isMusicPlaying
            ? "bg-gradient-to-br from-[#00f0ff] via-[#00f0ff] to-[#ccff00] scale-105"
            : "bg-black/80 backdrop-blur-md border border-gray-800 text-gray-500"
            }`}
          aria-label={isMusicPlaying ? "Mute music" : "Play music"}
          aria-pressed={isMusicPlaying}
        >
          <div className="relative z-10">
            {isMusicPlaying ? (
              <Volume2 className="w-6 h-6 text-black" />
            ) : (
              <VolumeX className="w-6 h-6 group-hover:text-white transition-colors" />
            )}
          </div>

          {/* Sound Waves Animation Container */}
          {isMusicPlaying && (
            <div
              ref={wavesRef}
              className="absolute inset-0 flex items-center justify-center gap-1 opacity-20 pointer-events-none"
            >
              <div className="sound-bar w-1 h-8 bg-black/50 origin-center" />
              <div className="sound-bar w-1 h-8 bg-black/50 origin-center" />
              <div className="sound-bar w-1 h-8 bg-black/50 origin-center" />
            </div>
          )}

          {/* Tooltip */}
          <span className="absolute right-full mr-5 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/95 text-white text-xs font-mono rounded border border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl">
            {isMusicPlaying ? t("muteMusic") : t("playMusic")}
          </span>

          {/* Liquid background fill on hover for unpressed state */}
          {!isMusicPlaying && (
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
      </Magnetic>
    </div>
  );
}
