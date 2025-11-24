"use client";

import { useState, useEffect } from "react";
import { soundManager } from "@/shared/lib/sound-manager";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from 'next-intl';

export function FloatingMusicToggle() {
    const t = useTranslations('Common');
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Try to play on user interaction
        const startMusic = () => {
            soundManager.play("ambient", { loop: true, volume: 0.3 });
            setIsMusicPlaying(true);
            window.removeEventListener("click", startMusic);
        };

        window.addEventListener("click", startMusic, { once: true });

        return () => {
            window.removeEventListener("click", startMusic);
        };
    }, []);

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
        <button
            onClick={toggleMusic}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-[#00f0ff] to-[#ccff00] rounded-full shadow-lg hover:scale-110 transition-all duration-300 group"
            aria-label={isMusicPlaying ? "Mute music" : "Play music"}
        >
            <div className="relative">
                {isMusicPlaying ? (
                    <Volume2 className="w-6 h-6 text-black" />
                ) : (
                    <VolumeX className="w-6 h-6 text-black" />
                )}

                {/* Pulsing ring when playing */}
                {isMusicPlaying && (
                    <span className="absolute inset-0 rounded-full bg-[#00f0ff] animate-ping opacity-75" />
                )}
            </div>

            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {isMusicPlaying ? t('muteMusic') : t('playMusic')}
            </span>
        </button>
    );
}
