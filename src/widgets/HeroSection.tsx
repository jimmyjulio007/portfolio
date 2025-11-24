"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
// Lazy load Scene3D for performance
const Scene3D = dynamic(() => import("@/shared/ui/Scene3D").then((mod) => mod.Scene3D), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black/10" />, // Lightweight placeholder
});
import { HeroObject } from "@/entities/HeroObject";
import { Button } from "@/shared/ui/Button";
import { Magnetic } from "@/shared/ui/Magnetic";
import { ScrollLink } from "@/shared/ui/ScrollLink";
import { soundManager } from "@/shared/lib/sound-manager";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

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
            )
                .from(
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

    // Helper to split text
    const SplitText = ({ children, className }: { children: string, className?: string }) => (
        <span className={`inline-block overflow-hidden ${className}`}>
            {children.split("").map((char, i) => (
                <span key={i} className="char inline-block" style={{ whiteSpace: "pre" }}>
                    {char}
                </span>
            ))}
        </span>
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden flex items-center"
        >
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Scene3D enablePostProcessing={true}>
                    <HeroObject />
                </Scene3D>
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/80 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pointer-events-none">
                <div className="lg:col-span-8 pointer-events-auto">
                    <div className="mb-6">
                        <h1
                            ref={titleRef}
                            className="text-5xl md:text-[7rem] leading-[0.9] font-bold tracking-tighter text-white mix-blend-difference font-migumono"
                        >
                            <div className="flex flex-col">
                                <SplitText>ARCHITECTING</SplitText>
                                <span className="text-[#00f0ff]">
                                    <SplitText>INTELLIGENCE</SplitText>
                                </span>
                            </div>
                        </h1>
                    </div>

                    <p
                        ref={subtitleRef}
                        className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 font-light tracking-wide"
                    >
                        Forging the next generation of autonomous agents and immersive digital realities.
                        <br />
                        <span className="text-[#ccff00] font-mono text-sm mt-2 block">
              // 120 FPS NEURAL LINK ESTABLISHED
                        </span>
                    </p>

                    <div className="flex gap-6">
                        <Magnetic strength={1.5}>
                            <ScrollLink href="#work">
                                <Button
                                    size="lg"
                                    className="bg-[#00f0ff] text-black hover:bg-white hover:scale-105 transition-all duration-300 font-bold tracking-widest"
                                    withSound={false}
                                >
                                    VIEW WORK
                                </Button>
                            </ScrollLink>
                        </Magnetic>
                        <Magnetic strength={1.5}>
                            <ScrollLink href="#contact">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black font-bold tracking-widest"
                                    withSound={false}
                                >
                                    CONTACT NETWORK
                                </Button>
                            </ScrollLink>
                        </Magnetic>
                    </div>
                </div>

                {/* Stats / Info - Asymmetrical Layout */}
                <div
                    ref={statsRef}
                    className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end gap-8 pointer-events-auto"
                >
                    <div className="glass-panel p-6 rounded-none border-l-4 border-[#00f0ff]">
                        <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">
                            Location
                        </span>
                        <span className="text-xl font-bold text-white">
                            Antananarivo, Tsiadana
                        </span>
                        <span className="text-xs text-[#00f0ff] font-mono mt-1 block">
                            LAT: -18.8792 | LON: 47.5079
                        </span>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 left-6 text-xs text-gray-500 font-mono">
                SYSTEM: ONLINE // V3.0 // GPU_ACCELERATED
            </div>
        </section>
    );
}
