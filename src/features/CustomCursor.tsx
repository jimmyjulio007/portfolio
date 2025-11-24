"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        // Ultra-smooth cursor tracking at 200 FPS
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.05, // 200 FPS smoothness
                ease: "power3.out",
            });

            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power3.out",
            });
        };

        const expandCursor = () => {
            gsap.to(cursor, {
                scale: 0.5,
                backgroundColor: "#ccff00",
                duration: 0.2,
            });
            gsap.to(follower, {
                scale: 2,
                borderColor: "#ccff00",
                duration: 0.2,
            });
        };

        const shrinkCursor = () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: "#00f0ff",
                duration: 0.2,
            });
            gsap.to(follower, {
                scale: 1,
                borderColor: "#00f0ff",
                duration: 0.2,
            });
        };

        window.addEventListener("mousemove", moveCursor);

        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, .cursor-pointer"
        );
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", expandCursor);
            el.addEventListener("mouseleave", shrinkCursor);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", expandCursor);
                el.removeEventListener("mouseleave", shrinkCursor);
            });
        };
    }, [isClient]);

    // Don't render on server or mobile
    if (!isClient || (typeof window !== "undefined" && window.innerWidth < 768)) {
        return null;
    }

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-[#00f0ff] rounded-full pointer-events-none z-[10005] mix-blend-difference"
                style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-[#00f0ff] rounded-full pointer-events-none z-[10005] mix-blend-difference"
                style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
            />
        </>
    );
}
