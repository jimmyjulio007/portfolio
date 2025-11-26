"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { useTranslations } from 'next-intl';

// Lazy load Scene3D for performance
const Scene3D = dynamic(() => import("@/shared/ui/Scene3D").then((mod) => mod.Scene3D), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black/10" />,
});

const HeroComputer = dynamic(() => import("@/entities/HeroComputer").then(mod => mod.HeroComputer), {
    ssr: false,
});
import { Button } from "@/shared/ui/Button";
import { Magnetic } from "@/shared/ui/Magnetic";
import { ScrollLink } from "@/shared/ui/ScrollLink";

export function HeroSection() {
    const t = useTranslations('Hero');
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const [rtxEnabled, setRtxEnabled] = useState(false);

    // Listen for RTX toggle
    useEffect(() => {
        const handleRTX = (e: CustomEvent) => {
            setRtxEnabled(e.detail.enabled);
        };
        window.addEventListener("rtx-toggle" as any, handleRTX);
        return () => window.removeEventListener("rtx-toggle" as any, handleRTX);
    }, []);

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // Split text animation logic
            const chars = titleRef.current?.querySelectorAll(".char");
            if (chars) {
                tl.from(chars, {
                    y: 100,
                    opacity: 0,
                    rotateX: -90,
                    stagger: 0.02,
                    duration: 1,
                    ease: "back.out(1.7)",
                });
            }

            tl.from(
                subtitleRef.current,
                {
                    x: -50,
                    opacity: 0,
                    duration: 1,
                },
                "-=0.5",
            ).from(
                statsRef.current?.children || [],
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                },
                "-=0.5",
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Helper to split text for animation
    const SplitText = ({ children, className }: { children: string; className?: string }) => (
        <span className={`inline-block overflow-hidden  ${className}`}>
            {children.split("").map((char, i) => (
                <span key={i} className="char inline-block" style={{ whiteSpace: "pre" }}>
                    {char}
                </span>
            ))}
        </span>
    );

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden flex items-center bg-black"
        >
            {/* Grid Layout: 3D Computer (Left) + Content (Right) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">

                {/* LEFT: Interactive 3D Computer */}
                <div className="order-2 lg:order-1">
                    <div className="h-[500px] lg:h-[600px] w-full">
                        <Scene3D enableControls={true}>
                            <HeroComputer enableRTX={rtxEnabled} />
                        </Scene3D>
                    </div>
                    <p className="text-center text-gray-500 text-xs font-mono mt-4">
                        {t('dragToRotate', { rtxStatus: rtxEnabled ? t('rtxOn') : t('rtxOff') })}
                    </p>
                </div>

                {/* RIGHT: Content */}
                <div className="order-1 lg:order-2 pointer-events-auto">
                    <div className="mb-6">
                        <div className="mb-4">
                            <span className="text-[#00f0ff] font-mono text-sm tracking-widest uppercase block mb-2">
                                Hello, I am
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white font-migumono">
                                JIMMY JULIO
                            </h2>
                        </div>
                        <h1
                            ref={titleRef}
                            className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-white font-migumono"
                        >
                            <div className="flex flex-col">
                                <SplitText className="font-migumono">{t('title_line1')}</SplitText>
                                <span className="text-[#00f0ff]">
                                    <SplitText className="font-migumono">{t('title_line2')}</SplitText>
                                </span>
                            </div>
                        </h1>
                    </div>

                    <p
                        ref={subtitleRef}
                        className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 font-light tracking-wide"
                    >
                        {t('subtitle')}
                        <br />
                        <span className="text-[#ccff00] font-mono text-sm mt-2 block">
                            {t('neuralLink')}
                        </span>
                    </p>

                    <div className="flex gap-6 flex-wrap">
                        <Magnetic strength={1.5}>
                            <ScrollLink href="#work">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto min-w-[200px] bg-[#00f0ff] text-black hover:bg-white hover:scale-105 transition-all duration-300 font-bold tracking-widest"
                                    withSound={false}
                                >
                                    {t('viewWork')}
                                </Button>
                            </ScrollLink>
                        </Magnetic>
                        <Magnetic strength={1.5}>
                            <ScrollLink href="#contact">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="w-full sm:w-auto min-w-[200px] border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black font-bold tracking-widest"
                                    withSound={false}
                                >
                                    {t('contactNetwork')}
                                </Button>
                            </ScrollLink>
                        </Magnetic>
                    </div>

                    {/* Stats Panel */}
                    <div ref={statsRef} className="mt-12">
                        <div className="glass-panel p-6 rounded-none border-l-4 border-[#00f0ff] inline-block">
                            <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">
                                {t('location')}
                            </span>
                            <span className="text-xl font-bold text-white">
                                {t('locationName')}
                            </span>
                            <span className="text-xs text-[#00f0ff] font-mono mt-1 block">
                                {t('coordinates')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 left-6 text-xs text-gray-500 font-mono hidden lg:block">
                {t('systemStatus')}
            </div>
        </section>
    );
}
