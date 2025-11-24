"use client";

import { useRef, useEffect, ReactElement } from "react";
import { gsap } from "gsap";

interface MagneticProps {
    children: ReactElement;
    strength?: number; // How strong the magnetic pull is (default: 1)
}

export function Magnetic({ children, strength = 1 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Only activate if close enough
            if (Math.abs(x) < width && Math.abs(y) < height) {
                xTo(x * 0.35 * strength);
                yTo(y * 0.35 * strength);
            } else {
                xTo(0);
                yTo(0);
            }
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={ref} className="inline-block">
            {children}
        </div>
    );
}
