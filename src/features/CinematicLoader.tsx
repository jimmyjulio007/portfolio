"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { useTranslations } from 'next-intl';

export function CinematicLoader({ onComplete }: { onComplete: () => void }) {
    const t = useTranslations('Common');
    const tAbout = useTranslations('About');
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const currentYear = new Date().getFullYear();

    const TIPS = [
        t('loadingTip1'),
        t('loadingTip2'),
        t('loadingTip3'),
        t('loadingTip4'),
        t('loadingTip5'),
    ];

    const [currentTip, setCurrentTip] = useState(TIPS[0]);

    useEffect(() => {
        // Rotate tips
        const tipInterval = setInterval(() => {
            setCurrentTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
        }, 2000);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    clearInterval(tipInterval);

                    // Column reveal animation
                    const revealTl = gsap.timeline({
                        onComplete,
                    });

                    // Create and animate columns
                    const columnsContainer = document.createElement('div');
                    columnsContainer.className = 'fixed inset-0 z-[10000] pointer-events-none flex';
                    columnsContainer.id = 'reveal-columns';

                    for (let i = 0; i < 12; i++) {
                        const col = document.createElement('div');
                        col.className = 'flex-1 h-full bg-gradient-to-b from-[#00f0ff] via-[#0088ff] to-black origin-bottom';
                        columnsContainer.appendChild(col);
                    }

                    document.body.appendChild(columnsContainer);

                    // Fade out loader
                    revealTl.to(containerRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.inOut",
                    });

                    // Reveal columns from center outward
                    revealTl.to(columnsContainer.children, {
                        scaleY: 0,
                        duration: 1,
                        ease: "power4.inOut",
                        stagger: {
                            each: 0.04,
                            from: "center",
                        },
                        onComplete: () => {
                            columnsContainer.remove();
                        }
                    }, "-=0.2");
                },
            });

            // Longer, more epic loading (5 seconds like RDR2)
            tl.to({}, {
                duration: 5,
                ease: "power1.inOut",
                onUpdate: function () {
                    const prog = Math.min(100, this.progress() * 100);
                    setProgress(prog);
                },
            });

            // Logo entrance - epic reveal
            tl.from(".loader-logo", {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
            }, 0);

            // Title with split effect
            tl.from(".loader-title-first", {
                x: -100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
            }, 0.5);

            tl.from(".loader-title-last", {
                x: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
            }, 0.6);

            // Subtitle elegant fade
            tl.from(".loader-subtitle", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
            }, 1.2);

            // Progress bar smooth fill
            tl.from(".loader-progress-track", {
                scaleX: 0,
                duration: 0.8,
                ease: "power2.out",
                transformOrigin: "left",
            }, 1.5);

            // Tip text fade in
            tl.from(".loader-tip", {
                y: 20,
                opacity: 0,
                duration: 0.8,
            }, 2);

            // Corner decorations
            gsap.from(".corner-decor", {
                scale: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: 0.8,
            });

        }, containerRef);

        return () => {
            ctx.revert();
            clearInterval(tipInterval);
        };
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-radial from-[#00f0ff]/5 via-transparent to-black animate-pulse" />

            {/* Film grain effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                <div className="w-full h-full bg-noise animate-grain" />
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black pointer-events-none" />

            {/* Scan lines (RDR2 style) */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-scan" />
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center px-6 max-w-5xl">

                {/* Logo/Emblem (RDR2 style) */}
                <div className="loader-logo mb-8 flex items-center justify-center">
                    <div className="relative">
                        {/* Outer ring */}
                        <div className="w-24 h-24 rounded-full border-2 border-[#00f0ff]/30 flex items-center justify-center">
                            {/* Inner glow */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f0ff]/20 to-[#ccff00]/20 flex items-center justify-center">
                                <div className="text-2xl font-bold text-[#00f0ff]">JJ</div>
                            </div>
                        </div>
                        {/* Rotating ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ccff00]/50 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                </div>

                {/* Main Title (RDR2 inspired typography) */}
                <div className="mb-6 overflow-hidden">
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter flex items-center justify-center gap-3">
                        <span className="loader-title-first text-white">JIMMY</span>
                        <span className="loader-title-last text-[#00f0ff]">JULIO</span>
                    </h1>
                </div>

                {/* Subtitle with decorative lines */}
                <div className="loader-subtitle flex items-center justify-center gap-4 mb-16">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#ccff00]" />
                    <p className="text-lg md:text-xl text-gray-400 font-light tracking-[0.2em] uppercase">
                        {tAbout('role')}
                    </p>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#ccff00]" />
                </div>

                {/* Progress Section (RDR2 style) */}
                <div className="space-y-6 max-w-2xl mx-auto">

                    {/* Progress Track */}
                    <div className="loader-progress-track relative h-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden border border-gray-700/50">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00f0ff] via-[#00d4ff] to-[#ccff00] transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                        </div>

                        {/* Progress percentage indicator */}
                        <div
                            className="absolute -top-8 transition-all duration-300 flex flex-col items-center"
                            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                        >
                            <span className="text-[#00f0ff] font-mono text-sm font-bold">
                                {Math.floor(progress)}%
                            </span>
                        </div>
                    </div>

                    {/* Loading tip (RDR2 style) */}
                    <div className="loader-tip">
                        <p className="text-sm text-gray-500 font-mono animate-pulse">
                            {currentTip}
                        </p>
                    </div>
                </div>

                {/* Footer text */}
                <p className="mt-12 text-xs text-gray-700 font-mono tracking-widest">
                    ANTANANARIVO • MADAGASCAR • {currentYear}
                </p>
            </div>

            {/* Corner ornaments (RDR2 style) */}
            <div className="corner-decor absolute top-8 left-8 w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] to-transparent" />
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#00f0ff] to-transparent" />
            </div>
            <div className="corner-decor absolute top-8 right-8 w-20 h-20">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#00f0ff] to-transparent" />
                <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-[#00f0ff] to-transparent" />
            </div>
            <div className="corner-decor absolute bottom-8 left-8 w-20 h-20">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ccff00] to-transparent" />
                <div className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-[#ccff00] to-transparent" />
            </div>
            <div className="corner-decor absolute bottom-8 right-8 w-20 h-20">
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#ccff00] to-transparent" />
                <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-[#ccff00] to-transparent" />
            </div>

            {/* Subtle particles floating */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#00f0ff]/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
