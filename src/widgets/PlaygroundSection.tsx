"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "@/shared/ui/Magnetic";
import { useTranslations } from 'next-intl';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}



export function PlaygroundSection() {
    const t = useTranslations('Playground');
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [activeColor, setActiveColor] = useState("#00f0ff");

    const EXPERIMENTS = [
        { id: 1, name: t('feature1'), type: "Simulation", color: "#00f0ff" },
        { id: 2, name: t('feature2'), type: "AI Viz", color: "#ccff00" },
        { id: 3, name: t('feature3'), type: "Sound", color: "#ff0055" },
        { id: 4, name: t('feature4'), type: "Shader", color: "#ffffff" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = listRef.current?.children;

            if (items) {
                gsap.from(items, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                    x: -50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out",
                });
            }

            // Custom Cursor Logic for this section
            const moveCursor = (e: MouseEvent) => {
                if (!sectionRef.current) return;
                const rect = sectionRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                gsap.to(cursorRef.current, {
                    x: x,
                    y: y,
                    duration: 0.5,
                    ease: "power3.out",
                });
            };

            sectionRef.current?.addEventListener("mousemove", moveCursor);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (color: string) => {
        setActiveColor(color);
        gsap.to(cursorRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cursorRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
        });
    };

    return (
        <section
            id="playground"
            ref={sectionRef}
            className="py-32 bg-[#030303] relative overflow-hidden cursor-none"
        >
            {/* Background Noise/Grid */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Floating Preview Cursor */}
            <div
                ref={cursorRef}
                className="absolute top-0 left-0 w-64 h-64 pointer-events-none z-20 mix-blend-difference hidden md:block"
                style={{ transform: "translate(-50%, -50%) scale(0)", opacity: 0 }}
            >
                <div
                    className="w-full h-full rounded-full blur-3xl opacity-50 animate-pulse"
                    style={{ backgroundColor: activeColor }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 relative z-10">
                <div>
                    <span className="text-[#00f0ff] font-mono text-sm tracking-widest uppercase">
                        {t('sectionLabel')}
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-8 tracking-tighter">
                        {t('title')}<br />{t('titleHighlight')}
                    </h2>
                    <p className="text-gray-400 max-w-md mb-12">
                        {t('description')}
                    </p>

                    <ul ref={listRef} className="space-y-4">
                        {EXPERIMENTS.map((exp) => (
                            <li key={exp.id}>
                                <Magnetic strength={0.2}>
                                    <div
                                        className="group flex items-center justify-between border-b border-gray-800 py-6 cursor-pointer hover:border-white transition-colors duration-300"
                                        onMouseEnter={() => handleMouseEnter(exp.color)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <span className="text-2xl md:text-4xl font-bold text-gray-500 group-hover:text-white transition-colors duration-300">
                                            {exp.name}
                                        </span>
                                        <span
                                            className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ color: exp.color }}
                                        >
                                            [{exp.type}]
                                        </span>
                                    </div>
                                </Magnetic>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual Preview Area */}
                <div className="relative h-[400px] lg:h-auto bg-[#0a0a0a] border border-gray-800 flex items-center justify-center overflow-hidden group">


                    {/* Dynamic Circle based on active hover */}
                    <div
                        className="w-64 h-64 rounded-full animate-pulse opacity-20 blur-xl transition-colors duration-500"
                        style={{ backgroundColor: activeColor, boxShadow: `0 0 50px ${activeColor}` }}
                    />

                    <span className="relative z-10 font-mono text-xs bg-black/50 px-4 py-2 border border-white/10 backdrop-blur-md text-white">
                        PREVIEW_MODULE_LOADED
                    </span>
                </div>
            </div>
        </section>
    );
}
