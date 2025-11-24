"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from 'next-intl';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}



export function ProcessSection() {
    const t = useTranslations('Process');
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const STEPS = [
        {
            id: "01",
            title: t('step1Title'),
            desc: t('step1Description'),
            color: "#00f0ff",
        },
        {
            id: "02",
            title: t('step2Title'),
            desc: t('step2Description'),
            color: "#ccff00",
        },
        {
            id: "03",
            title: t('step3Title'),
            desc: t('step3Description'),
            color: "#ffffff",
        },
        {
            id: "04",
            title: t('step4Title'),
            desc: t('step4Description'),
            color: "#00f0ff",
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current?.children;

            if (cards) {
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "bottom 80%",
                        scrub: 1,
                    },
                    y: 100,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1,
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="process"
            ref={sectionRef}
            className="py-32 bg-[#050505] relative border-t border-gray-900"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <span className="text-[#ccff00] font-mono text-sm tracking-widest uppercase">
                        {t('sectionLabel')}
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 tracking-tighter">
                        {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ccff00]">{t('titleHighlight')}</span>
                    </h2>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STEPS.map((step) => (
                        <div
                            key={step.id}
                            className="group relative p-8 bg-[#0a0a0a] border border-gray-800 hover:border-[#00f0ff] transition-colors duration-500 h-96 flex flex-col justify-between overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent opacity-10">
                                    {step.id}
                                </span>
                            </div>

                            <div className="relative z-10">
                                <div
                                    className="w-12 h-1 mb-6 transition-all duration-500 group-hover:w-full"
                                    style={{ backgroundColor: step.color }}
                                />
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>

                            <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <span className="text-xs font-mono text-[#00f0ff]">
                                    &gt; EXECUTE_STEP_{step.id}
                                </span>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
