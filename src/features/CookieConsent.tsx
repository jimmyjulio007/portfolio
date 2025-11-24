"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";

export function CookieConsent() {
    const t = useTranslations("Common");
    const [isVisible, setIsVisible] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const cookieConsent = localStorage.getItem("cookie-consent");
        if (!cookieConsent) {
            // Show banner after a short delay
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    useEffect(() => {
        if (isVisible && !isAccepted) {
            // Animate entrance
            gsap.fromTo(
                ".cookie-banner",
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                }
            );
        }
    }, [isVisible, isAccepted]);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");

        // Animate exit
        gsap.to(".cookie-banner", {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                setIsAccepted(true);
                setIsVisible(false);
            },
        });
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");

        // Animate exit
        gsap.to(".cookie-banner", {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                setIsAccepted(true);
                setIsVisible(false);
            },
        });
    };

    if (!isVisible || isAccepted) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[1989998] pointer-events-none px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="cookie-banner pointer-events-auto max-w-6xl mx-auto">
                {/* Main Container */}
                <div className="relative bg-black border-2 border-[#00f0ff] overflow-hidden">
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div
                            className="h-full w-full"
                            style={{
                                backgroundImage:
                                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.1) 2px, rgba(0, 240, 255, 0.1) 4px)",
                            }}
                        />
                    </div>

                    {/* Neon Glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,240,255,0.2)]" />
                    </div>

                    {/* Content */}
                    <div className="relative px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            {/* Icon */}
                            <div className="hidden sm:flex items-center justify-center shrink-0">
                                <div className="relative">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#ccff00] flex items-center justify-center bg-[#ccff00]/10">
                                        <svg
                                            className="w-6 h-6 sm:w-7 sm:h-7 text-[#ccff00]"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                        </svg>
                                    </div>
                                    {/* Rotating ring */}
                                    <div
                                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00f0ff] animate-spin"
                                        style={{ animationDuration: "3s" }}
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2 font-mono tracking-tight">
                                    <span className="text-[#00f0ff]">// </span>
                                    COOKIE PROTOCOL DETECTED
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                                    This site uses cookies to enhance your experience and analyze
                                    performance. By accepting, you enable optimal functionality and help
                                    us improve the system.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-row sm:flex-col lg:flex-row gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 sm:flex-none relative group px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-black font-bold tracking-widest text-xs sm:text-sm overflow-hidden transition-all duration-300 hover:bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]"
                                >
                                    {/* Scanline effect */}
                                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                                        <div
                                            className="h-full w-full"
                                            style={{
                                                backgroundImage:
                                                    "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
                                            }}
                                        />
                                    </div>
                                    <span className="relative">ACCEPT</span>
                                </button>

                                <button
                                    onClick={handleDecline}
                                    className="flex-1 sm:flex-none relative px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-gray-700 text-gray-400 font-bold tracking-widest text-xs sm:text-sm transition-all duration-300 hover:border-[#ccff00] hover:text-[#ccff00] hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                                >
                                    <span className="relative">DECLINE</span>
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-900">
                            <p className="text-[10px] sm:text-xs text-gray-600 font-mono">
                                <span className="text-[#ccff00]">→</span> Learn more about our{" "}
                                <a
                                    href="/privacy"
                                    className="text-[#00f0ff] hover:underline underline-offset-2"
                                >
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] to-transparent" />
                        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#00f0ff] to-transparent" />
                    </div>
                    <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none">
                        <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#ccff00] to-transparent" />
                        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-[#ccff00] to-transparent" />
                    </div>
                </div>
            </div>
        </div>
    );
}
