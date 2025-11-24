"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function PageLoader() {
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const columnsRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsComplete(true);
            },
        });

        // 1. Initial Loading Sequence
        tl.to(progressRef.current, {
            width: "100%",
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: function () {
                if (percentRef.current) {
                    const progress = Math.round(this.progress() * 100);
                    percentRef.current.innerText = `${progress}%`;
                }
            },
        });

        // 2. Text Glitch & Fade Out
        tl.to(textRef.current, {
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.inOut",
        });

        // 3. The "Slice Column" Reveal
        // We animate the height of the columns to 0%
        if (columnsRef.current) {
            const columns = columnsRef.current.children;
            tl.to(columns, {
                height: "0%",
                duration: 1.2,
                stagger: {
                    amount: 0.4,
                    from: "random", // Randomize for a more organic/fluid feel
                },
                ease: "power4.inOut",
            }, "-=0.2");
        }

        // 4. Remove container
        tl.set(containerRef.current, { display: "none" });

        return () => {
            tl.kill();
        };
    }, []);

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none"
        >
            {/* The Slice Columns Background */}
            <div
                ref={columnsRef}
                className="absolute inset-0 flex w-full h-full pointer-events-auto"
            >
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="h-full w-1/5 bg-[#030303] border-r border-gray-900/20 relative overflow-hidden"
                    >
                        {/* Subtle noise texture on each column */}
                        <div
                            className="absolute inset-0 opacity-10 mix-blend-overlay"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Loading Content (Centered) */}
            <div ref={textRef} className="relative z-20 flex flex-col items-center gap-4 pointer-events-auto">
                <div className="flex items-center gap-3 font-mono text-xs text-[#00f0ff] tracking-widest">
                    <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
                    SYSTEM_INITIALIZING
                    <span ref={percentRef}>0%</span>
                </div>

                <div className="w-64 h-[1px] bg-gray-800 overflow-hidden">
                    <div
                        ref={progressRef}
                        className="h-full w-0 bg-[#ccff00] shadow-[0_0_15px_#ccff00]"
                    />
                </div>

                <div className="font-mono text-[10px] text-gray-500 tracking-[0.2em]">
                    ESTABLISHING_NEURAL_LINK
                </div>
            </div>
        </div>
    );
}
