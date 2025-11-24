"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Register GSAP plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(MorphSVGPlugin);
}

/**
 * SVG Morphing Animation Component
 * Beautiful organic shape transitions
 * Follows Single Responsibility Principle (SOLID)
 */
export function SVGMorph() {
    const morphRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (!morphRef.current) return;

        // Define morphing shapes
        const shapes = [
            // Organic blob 1
            "M50,25 C25,25 12.5,37.5 12.5,50 S25,75 50,75 75,62.5 75,50 62.5,25 50,25 Z",
            // Organic blob 2
            "M50,20 C30,20 15,35 15,50 S30,80 50,80 85,65 85,50 70,20 50,20 Z",
            // Organic blob 3
            "M50,22 C28,22 18,38 18,50 S28,78 50,78 82,62 82,50 72,22 50,22 Z",
            // Organic blob 4
            "M50,24 C26,24 14,36 14,50 S26,76 50,76 86,64 86,50 74,24 50,24 Z",
        ];

        const timeline = gsap.timeline({ repeat: -1 });

        shapes.forEach((shape, index) => {
            timeline.to(
                morphRef.current,
                {
                    morphSVG: shape,
                    duration: 2,
                    ease: "power2.inOut",
                },
                index * 2,
            );
        });

        return () => {
            timeline.kill();
        };
    }, []);

    return (
        <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            <defs>
                <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <path
                ref={morphRef}
                d="M50,25 C25,25 12.5,37.5 12.5,50 S25,75 50,75 75,62.5 75,50 62.5,25 50,25 Z"
                fill="url(#morphGradient)"
                filter="url(#glow)"
                opacity="0.7"
            />
        </svg>
    );
}
