"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { gsap } from "gsap";

// Cookie consent translations
const COOKIE_TRANSLATIONS = {
    en: {
        title: "COOKIE PROTOCOL DETECTED",
        description: "This site uses cookies to enhance your experience and analyze performance. By accepting, you enable optimal functionality and help us improve the system.",
        accept: "ACCEPT",
        decline: "DECLINE",
        learnMore: "Learn more about our",
        privacyPolicy: "Privacy Policy"
    },
    fr: {
        title: "PROTOCOLE DE COOKIES DÉTECTÉ",
        description: "Ce site utilise des cookies pour améliorer votre expérience et analyser les performances. En acceptant, vous activez des fonctionnalités optimales et nous aidez à améliorer le système.",
        accept: "ACCEPTER",
        decline: "REFUSER",
        learnMore: "En savoir plus sur notre",
        privacyPolicy: "Politique de confidentialité"
    },
    ja: {
        title: "クッキープロトコル検出",
        description: "このサイトはクッキーを使用して、エクスペリエンスを向上させパフォーマンスを分析します。受け入れることで、最適な機能を有効にし、システムの改善に貢献できます。",
        accept: "同意",
        decline: "拒否",
        learnMore: "詳細はこちら",
        privacyPolicy: "プライバシーポリシー"
    },
    zh: {
        title: "检测到 COOKIE 协议",
        description: "本网站使用 Cookie 来增强您的体验并分析性能。接受后，您将启用最佳功能并帮助我们改进系统。",
        accept: "接受",
        decline: "拒绝",
        learnMore: "了解更多关于我们的",
        privacyPolicy: "隐私政策"
    },
    de: {
        title: "COOKIE-PROTOKOLL ERKANNT",
        description: "Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern und die Leistung zu analysieren. Durch Akzeptieren aktivieren Sie optimale Funktionalität und helfen uns, das System zu verbessern.",
        accept: "AKZEPTIEREN",
        decline: "ABLEHNEN",
        learnMore: "Erfahren Sie mehr über unsere",
        privacyPolicy: "Datenschutzrichtlinie"
    },
    ar: {
        title: "تم اكتشاف بروتوكول ملفات تعريف الارتباط",
        description: "يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربتك وتحليل الأداء. من خلال القبول، تمكن الوظائف المثلى وتساعدنا على تحسين النظام.",
        accept: "قبول",
        decline: "رفض",
        learnMore: "تعرف على المزيد حول",
        privacyPolicy: "سياسة الخصوصية"
    }
};

export function CookieConsent() {
    const locale = useLocale() as keyof typeof COOKIE_TRANSLATIONS;
    const t = COOKIE_TRANSLATIONS[locale] || COOKIE_TRANSLATIONS.en;

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
        <div className="fixed bottom-0 left-0 right-0 z-[9998] pointer-events-none px-4 pb-4 sm:px-6 sm:pb-6">
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
                                    {t.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                                    {t.description}
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
                                    <span className="relative">{t.accept}</span>
                                </button>

                                <button
                                    onClick={handleDecline}
                                    className="flex-1 sm:flex-none relative px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-gray-700 text-gray-400 font-bold tracking-widest text-xs sm:text-sm transition-all duration-300 hover:border-[#ccff00] hover:text-[#ccff00] hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                                >
                                    <span className="relative">{t.decline}</span>
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-900">
                            <p className="text-[10px] sm:text-xs text-gray-600 font-mono">
                                <span className="text-[#ccff00]">→</span> {t.learnMore}{" "}
                                <a
                                    href="/privacy"
                                    className="text-[#00f0ff] hover:underline underline-offset-2"
                                >
                                    {t.privacyPolicy}
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
