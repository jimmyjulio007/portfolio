"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BaobabTree } from "@/entities/BaobabTree";

const Scene3D = dynamic(() => import("@/shared/ui/Scene3D").then(mod => ({ default: mod.Scene3D })), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-transparent" />,
});

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TECH_SKILLS = [
    { name: "LangChain / AI Agents", level: 98 },
    { name: "JavaScript / TypeScript", level: 96 },
    { name: "React / Next.js", level: 95 },
    { name: "Node.js / Python", level: 92 },
    { name: "WebGL / Three.js", level: 88 },
];

const SOFT_SKILLS = [
    "Strategic Leadership",
    "Complex Problem Solving",
    "Effective Communication",
    "Agile Methodology",
    "Team Mentorship"
];

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                },
                x: -100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 75%",
                },
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)",
            });

            gsap.from(descRef.current, {
                scrollTrigger: {
                    trigger: descRef.current,
                    start: "top 75%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            const skillBars = skillsRef.current?.querySelectorAll(".skill-bar");
            if (skillBars) {
                skillBars.forEach((bar) => {
                    const level = bar.getAttribute("data-level");
                    gsap.fromTo(
                        bar,
                        { width: "0%" },
                        {
                            scrollTrigger: {
                                trigger: bar,
                                start: "top 85%",
                            },
                            width: `${level}%`,
                            duration: 1.5,
                            ease: "power2.out",
                        },
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-32 bg-[#0a0a0a] overflow-hidden"
        >
            {/* 3D Background */}
            <div className="absolute inset-0 opacity-20">
                <Scene3D>
                    <BaobabTree />
                </Scene3D>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Image & Profile */}
                    <div className="lg:col-span-5">
                        <div ref={imageRef} className="relative group">
                            {/* Holographic Border */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#ccff00] rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

                            <div className="relative bg-black rounded-lg overflow-hidden border border-gray-800 aspect-[3/4]">
                                <Image
                                    src="/profile.png"
                                    alt="Jimmy Julio"
                                    fill
                                    className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                                />

                                {/* Tech Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                                    <h3 className="text-2xl font-bold text-white font-migumono">JIMMY JULIO</h3>
                                    <p className="text-[#00f0ff] font-mono text-xs tracking-widest">FULL STACK AI ARCHITECT</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Text & Skills */}
                    <div className="lg:col-span-7">
                        <span className="text-[#ccff00] font-mono text-sm tracking-widest uppercase">
              // The Architect
                        </span>
                        <h2
                            ref={titleRef}
                            className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tighter font-migumono"
                        >
                            BUILDING THE <span className="text-[#00f0ff]">FUTURE</span>
                        </h2>

                        <div ref={descRef} className="space-y-6 text-gray-300 text-lg font-light leading-relaxed mb-12">
                            <p>
                                I am a <strong>Full Stack JS & AI Developer</strong> based in
                                <span className="text-white"> Antananarivo, Tsiadana</span>.
                                My passion lies in building autonomous AI agents and immersive web experiences
                                that push the boundaries of what's possible in the browser.
                            </p>
                            <p>
                                With a deep focus on <strong>LangChain implementation</strong> and modern
                                JavaScript ecosystems, I create systems that are not just functional,
                                but intelligent and adaptive.
                            </p>

                            <div className="pt-4">
                                <h3 className="text-white font-bold mb-4 text-xl">Soft Skills Powerhouse</h3>
                                <div className="flex flex-wrap gap-3">
                                    {SOFT_SKILLS.map(skill => (
                                        <span key={skill} className="px-4 py-2 border border-gray-800 rounded-full text-sm text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00] transition-colors duration-300 cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div ref={skillsRef} className="space-y-8 bg-[#050505] p-8 border border-gray-800">
                            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4">
                                Technical Arsenal
                            </h3>
                            {TECH_SKILLS.map((skill) => (
                                <div key={skill.name} className="group">
                                    <div className="flex justify-between mb-2 font-mono text-xs uppercase tracking-widest">
                                        <span className="text-gray-500 group-hover:text-white transition-colors">
                                            {skill.name}
                                        </span>
                                        <span className="text-[#00f0ff]">{skill.level}%</span>
                                    </div>
                                    <div className="h-1 bg-gray-800 w-full overflow-hidden">
                                        <div
                                            className="skill-bar h-full bg-[#00f0ff] relative"
                                            data-level={skill.level}
                                        >
                                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#ccff00] shadow-[0_0_10px_#ccff00]" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
