"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import { Magnetic } from "@/shared/ui/Magnetic";
import { soundManager } from "@/shared/lib/sound-manager";

const MENU_ITEMS = [
    { label: "HOME", href: "#home", index: "01" },
    { label: "PROCESS", href: "#process", index: "02" },
    { label: "WORK", href: "#work", index: "03" },
    { label: "PLAYGROUND", href: "#playground", index: "04" },
    { label: "ABOUT", href: "#about", index: "05" },
    { label: "CONTACT", href: "#contact", index: "06" },
];

const SOCIAL_LINKS = [
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter", href: "#" },
];

interface AwardMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AwardMenu({ isOpen, onClose }: AwardMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!menuRef.current || !overlayRef.current) return;

        const ctx = gsap.context(() => {
            if (isOpen && !isAnimating) {
                setIsAnimating(true);

                // Overlay fade in
                gsap.to(overlayRef.current, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                });

                // Menu slide in from right
                gsap.fromTo(menuRef.current,
                    { x: "100%" },
                    {
                        x: "0%",
                        duration: 0.8,
                        ease: "power4.out",
                        onComplete: () => setIsAnimating(false),
                    }
                );

                // Stagger menu items
                gsap.fromTo(".menu-item",
                    {
                        x: 100,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: "power3.out",
                        delay: 0.3,
                    }
                );

                // Animate decorative elements
                gsap.fromTo(".menu-decor",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1,
                        ease: "power2.out",
                        delay: 0.5,
                    }
                );

                // Social links
                gsap.fromTo(".social-link",
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        delay: 0.8,
                    }
                );

            } else if (!isOpen && isAnimating) {
                // Close animation
                gsap.to(menuRef.current, {
                    x: "100%",
                    duration: 0.6,
                    ease: "power3.in",
                    onComplete: () => setIsAnimating(false),
                });

                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.4,
                    delay: 0.2,
                });
            }
        }, menuRef);

        return () => ctx.revert();
    }, [isOpen]); // Only depend on isOpen

    const handleNavClick = (href: string) => {
        soundManager.play("transition");

        // Close menu first
        onClose();

        // Wait for close animation, then scroll
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 800); // Match menu close duration
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <>
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[998] opacity-0"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-gradient-to-br from-black via-[#0a0a0a] to-black border-l border-[#00f0ff]/20 z-[999] translate-x-full overflow-y-auto"
            >
                <div className="relative h-full p-12 flex flex-col">

                    {/* Close Button */}
                    <div className="absolute top-8 right-8">
                        <Magnetic strength={1}>
                            <button
                                onClick={onClose}
                                className="w-14 h-14 rounded-full border border-gray-700 hover:border-[#00f0ff] flex items-center justify-center transition-all duration-300 group"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6 text-gray-400 group-hover:text-[#00f0ff] group-hover:rotate-90 transition-all duration-300" />
                            </button>
                        </Magnetic>
                    </div>

                    {/* Header */}
                    <div className="mb-16">
                        <span className="text-[#00f0ff] font-mono text-xs tracking-widest">
                            // NAVIGATION
                        </span>
                        <div className="menu-decor w-20 h-[2px] bg-gradient-to-r from-[#00f0ff] to-transparent mt-2 origin-left" />
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1">
                        <ul className="space-y-1">
                            {MENU_ITEMS.map((item) => (
                                <li key={item.href} className="menu-item">
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        className="group flex items-baseline gap-6 py-4 border-b border-gray-800/50 transition-all duration-300 hover:border-[#00f0ff]/50"
                                        onMouseEnter={() => soundManager.play("hover", { volume: 0.2 })}
                                    >
                                        <span className="text-[#00f0ff]/40 font-mono text-sm group-hover:text-[#00f0ff] transition-colors">
                                            {item.index}
                                        </span>
                                        <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-[#00f0ff] transition-all duration-300 group-hover:translate-x-2">
                                            {item.label}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer Section */}
                    <div className="mt-12 pt-8 border-t border-gray-800">
                        <p className="text-gray-500 text-sm mb-4 font-mono">
                            // CONNECT
                        </p>
                        <div className="flex gap-6">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="social-link text-gray-400 hover:text-[#ccff00] transition-colors text-sm font-mono"
                                    onMouseEnter={() => soundManager.play("hover", { volume: 0.15 })}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <p className="text-gray-700 text-xs font-mono mt-8">
                            © 2026 JIMMY JULIO
                            <br />
                            Antananarivo, Madagascar
                        </p>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute bottom-12 left-12 w-24 h-24 border-l-2 border-b-2 border-[#ccff00]/20" />
                </div>
            </div>
        </>
    );
}
