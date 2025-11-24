"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PageRevealProps {
    onComplete: () => void;
}

export function PageReveal({ onComplete }: PageRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const COLUMNS = 12;

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete,
            });

            // Stagger reveal columns from center outward
            tl.to(".reveal-column", {
                scaleY: 0,
                duration: 1.2,
                ease: "power4.inOut",
                stagger: {
                    each: 0.05,
                    from: "center",
                },
            });

            // Fade out container
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.3,
            }, "-=0.3");

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9998] pointer-events-none"
        >
            <div className="w-full h-full flex">
                {Array.from({ length: COLUMNS }).map((_, i) => (
                    <div
                        key={i}
                        className="reveal-column flex-1 h-full bg-gradient-to-b from-[#00f0ff] via-[#0088ff] to-black origin-bottom"
                    />
                ))}
            </div>
        </div>
    );
}
