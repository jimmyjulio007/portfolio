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

        // Use quickSetter for performance
        const setCursorX = gsap.quickSetter(cursor, "x", "px");
        const setCursorY = gsap.quickSetter(cursor, "y", "px");
        const setFollowerX = gsap.quickSetter(follower, "x", "px");
        const setFollowerY = gsap.quickSetter(follower, "y", "px");

        const moveCursor = (e: MouseEvent) => {
            setCursorX(e.clientX);
            setCursorY(e.clientY);

            // Add slight delay/smoothing for follower manually or use GSAP ticker if needed, 
            // but for now direct quickSetter is fastest. 
            // To keep the smooth follow effect, we might still need a tween for the follower,
            // but let's optimize the main cursor first.

            // Actually, for the follower to be smooth, we need a tween. 
            // But we can optimize the tween to not create new objects every frame.
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power3.out",
                overwrite: "auto", // Prevent stacking
            });
        };

        const expandCursor = () => {
            gsap.to(cursor, {
                scale: 0.5,
                backgroundColor: "#ccff00",
                duration: 0.2,
                overwrite: true,
            });
            gsap.to(follower, {
                scale: 2,
                borderColor: "#ccff00",
                duration: 0.2,
                overwrite: true,
            });
        };

        const shrinkCursor = () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: "#00f0ff",
                duration: 0.2,
                overwrite: true,
            });
            gsap.to(follower, {
                scale: 1,
                borderColor: "#00f0ff",
                duration: 0.2,
                overwrite: true,
            });
        };

        window.addEventListener("mousemove", moveCursor);

        // Use event delegation instead of attaching to every element
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, .cursor-pointer')) {
                expandCursor();
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, .cursor-pointer')) {
                shrinkCursor();
            }
        };

        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
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
                className="fixed top-0 left-0 w-2 h-2 bg-[#00f0ff] rounded-full pointer-events-none z-[19990005] mix-blend-difference"
                style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-[#00f0ff] rounded-full pointer-events-none z-[19990005] mix-blend-difference"
                style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
            />
        </>
    );
}
