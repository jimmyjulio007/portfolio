"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
            });

            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const expandCursor = () => {
            gsap.to(cursor, {
                scale: 0.5,
                backgroundColor: "#ccff00",
                duration: 0.3,
            });
            gsap.to(follower, {
                scale: 2,
                borderColor: "#ccff00",
                duration: 0.3,
            });
        };

        const shrinkCursor = () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: "#00f0ff",
                duration: 0.3,
            });
            gsap.to(follower, {
                scale: 1,
                borderColor: "#00f0ff",
                duration: 0.3,
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
    }, []);

    if (typeof window !== "undefined" && window.innerWidth < 768) {
        return null;
    }

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-[#00f0ff] rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ transform: "translate(-50%, -50%)" }}
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-[#00f0ff] rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ transform: "translate(-50%, -50%)" }}
            />
        </>
    );
}
