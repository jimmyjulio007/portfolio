"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/shared/types";
import { Button } from "@/shared/ui/Button";
import { Magnetic } from "@/shared/ui/Magnetic";
import { useTranslations } from 'next-intl';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}



export function WorkSection() {
    const t = useTranslations('Work');
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const PROJECTS: Project[] = [
        {
            id: "1",
            title: t('project1Title'),
            description: t('project1Description'),
            category: "AI / LangChain",
            year: 2025,
            tags: t('project1Tags').split(' • '),
            image: "/projects/project1.jpg",
        },
        {
            id: "2",
            title: t('project2Title'),
            description: t('project2Description'),
            category: "Full Stack",
            year: 2024,
            tags: t('project2Tags').split(' • '),
            image: "/projects/project2.jpg",
        },
        {
            id: "3",
            title: t('project3Title'),
            description: t('project3Description'),
            category: "E-Commerce",
            year: 2024,
            tags: t('project3Tags').split(' • '),
            image: "/projects/project3.jpg",
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop: Horizontal Scroll
            mm.add("(min-width: 768px)", () => {
                const container = containerRef.current;
                const totalWidth = container?.scrollWidth;
                const windowWidth = window.innerWidth;

                if (container && totalWidth) {
                    gsap.to(container, {
                        x: () => -(totalWidth - windowWidth),
                        ease: "none",
                        scrollTrigger: {
                            trigger: triggerRef.current,
                            start: "top top",
                            end: () => `+=${totalWidth}`,
                            scrub: 1,
                            pin: true,
                            invalidateOnRefresh: true,
                            anticipatePin: 1,
                        },
                    });
                }
            });

            // Mobile: Vertical Stagger
            mm.add("(max-width: 767px)", () => {
                const cards = document.querySelectorAll(".project-card");
                cards.forEach((card) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="work" className="bg-[#050505] overflow-hidden">
            <div
                ref={triggerRef}
                className="min-h-screen w-full flex md:items-center overflow-hidden relative"
            >

                {/* Container: Flex Row on Desktop, Flex Column on Mobile */}
                <div
                    ref={containerRef}
                    className="flex flex-col md:flex-row md:flex-nowrap h-auto md:h-full items-start md:items-center px-6 md:px-24 gap-16 md:gap-24 py-24 md:py-0 will-change-transform"
                >

                    {/* Intro Slide */}
                    <div className="flex-shrink-0 w-full md:w-[40vw] flex flex-col justify-center">
                        <span className="text-[#ccff00] font-mono text-sm tracking-widest uppercase mb-4">
                            {t('sectionLabel')}
                        </span>
                        <h2 className="text-6xl md:text-9xl font-bold text-white leading-[0.9] md:leading-[0.8] font-migumono">
                            {t('title')}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ccff00]">
                                {t('titleHighlight')}
                            </span>
                        </h2>
                        <p className="text-gray-300 mt-8 max-w-md text-lg font-light">
                            {t('introDescription')}
                            <br />
                            <span className="text-xs font-mono text-[#00f0ff] mt-4 block hidden md:block">
                                {t('scrollHint')}
                            </span>
                        </p>
                    </div>

                    {/* Project Cards */}
                    {PROJECTS.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card flex-shrink-0 w-full md:w-[60vw] lg:w-[40vw] h-[50vh] md:h-[70vh] relative group"
                        >
                            <div className="absolute inset-0 bg-[#0a0a0a] border border-gray-800 group-hover:border-[#00f0ff] transition-colors duration-500 overflow-hidden">
                                {/* Image Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black group-hover:scale-105 transition-transform duration-700" />

                                {/* Overlay Content */}
                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                                    <div className="transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-[#00f0ff] font-mono text-xs mb-2 block">
                                            {project.category}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-migumono">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm mb-6 max-w-sm hidden md:block">
                                            {project.description}
                                        </p>
                                        <div className="flex gap-2 flex-wrap mb-6">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-xs text-gray-400 border border-gray-700 px-2 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <Magnetic strength={0.5}>
                                            <Button size="sm" className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                                                {t('viewCaseStudy')}
                                            </Button>
                                        </Magnetic>
                                    </div>
                                </div>

                                {/* Number */}
                                <div className="absolute top-4 right-4 text-4xl md:text-6xl font-bold text-white/5 font-mono">
                                    0{index + 1}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End Slide */}
                    <div className="flex-shrink-0 w-full md:w-[30vw] flex items-center justify-center py-12 md:py-0">
                        <div className="text-center">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-migumono">
                                {t('seeMoreTitle')}
                            </h3>
                            <Magnetic strength={1}>
                                <Button size="lg" variant="secondary">
                                    {t('viewGithub')}
                                </Button>
                            </Magnetic>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
