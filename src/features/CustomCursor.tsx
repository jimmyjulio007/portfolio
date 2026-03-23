"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pure CSS Custom Cursor — zero animation libraries.
 * - Dot: tracks mouse instantly via CSS `left/top`
 * - Ring: follows with CSS `transition` (smooth delay)
 * - Hover state: CSS class toggle (no GSAP tweens)
 * - Crosshair lines: futuristic targeting reticle
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, [role='button'], .cursor-pointer")) {
        setHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, [role='button'], .cursor-pointer")) {
        setHovering(false);
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [isDesktop, visible]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dot — instant tracking, no transition */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "#ccff00" : "#00f0ff",
          transform: `translate(-50%, -50%) scale(${pressed ? 0.5 : hovering ? 0.6 : 1})`,
        }}
      />

      {/* Ring — smooth follow via CSS transition */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          opacity: visible ? 1 : 0,
          borderColor: hovering ? "#ccff00" : "#00f0ff",
          transform: `translate(-50%, -50%) scale(${pressed ? 0.8 : hovering ? 1.8 : 1})`,
          width: hovering ? "48px" : "36px",
          height: hovering ? "48px" : "36px",
        }}
      >
        {/* Crosshair lines */}
        <span
          className="cursor-crosshair-h"
          style={{
            opacity: hovering ? 0 : 0.4,
            backgroundColor: hovering ? "#ccff00" : "#00f0ff",
          }}
        />
        <span
          className="cursor-crosshair-v"
          style={{
            opacity: hovering ? 0 : 0.4,
            backgroundColor: hovering ? "#ccff00" : "#00f0ff",
          }}
        />
      </div>
    </>
  );
}
