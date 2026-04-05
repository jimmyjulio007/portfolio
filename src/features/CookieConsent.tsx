"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const COOKIE_TRANSLATIONS = {
  en: {
    title: "COOKIE PROTOCOL DETECTED",
    description:
      "This site uses cookies to enhance your experience and analyze performance. By accepting, you enable optimal functionality and help us improve the system.",
    accept: "ACCEPT",
    decline: "DECLINE",
    learnMore: "Learn more about our",
    privacyPolicy: "Privacy Policy",
  },
  fr: {
    title: "PROTOCOLE DE COOKIES DÉTECTÉ",
    description:
      "Ce site utilise des cookies pour améliorer votre expérience et analyser les performances. En acceptant, vous activez des fonctionnalités optimales et nous aidez à améliorer le système.",
    accept: "ACCEPTER",
    decline: "REFUSER",
    learnMore: "En savoir plus sur notre",
    privacyPolicy: "Politique de confidentialité",
  },
  ja: {
    title: "クッキープロトコル検出",
    description:
      "このサイトはクッキーを使用して、エクスペリエンスを向上させパフォーマンスを分析します。受け入れることで、最適な機能を有効にし、システムの改善に貢献できます。",
    accept: "同意",
    decline: "拒否",
    learnMore: "詳細はこちら",
    privacyPolicy: "プライバシーポリシー",
  },
  zh: {
    title: "检测到 COOKIE 协议",
    description:
      "本网站使用 Cookie 来增强您的体验并分析性能。接受后，您将启用最佳功能并帮助我们改进系统。",
    accept: "接受",
    decline: "拒绝",
    learnMore: "了解更多关于我们的",
    privacyPolicy: "隐私政策",
  },
  de: {
    title: "COOKIE-PROTOKOLL ERKANNT",
    description:
      "Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern und die Leistung zu analysieren. Durch Akzeptieren aktivieren Sie optimale Funktionalität und helfen uns, das System zu verbessern.",
    accept: "AKZEPTIEREN",
    decline: "ABLEHNEN",
    learnMore: "Erfahren Sie mehr über unsere",
    privacyPolicy: "Datenschutzrichtlinie",
  },
  ar: {
    title: "تم اكتشاف بروتوكول ملفات تعريف الارتباط",
    description:
      "يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربتك وتحليل الأداء. من خلال القبول، تمكن الوظائف المثلى وتساعدنا على تحسين النظام.",
    accept: "قبول",
    decline: "رفض",
    learnMore: "تعرف على المزيد حول",
    privacyPolicy: "سياسة الخصوصية",
  },
};

export function CookieConsent() {
  const locale = useLocale() as keyof typeof COOKIE_TRANSLATIONS;
  const t = COOKIE_TRANSLATIONS[locale] || COOKIE_TRANSLATIONS.en;

  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleDismiss = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", choice);
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 400);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] pointer-events-none px-4 pb-4 sm:px-6 sm:pb-6">
      <div
        className={`cookie-banner pointer-events-auto max-w-6xl mx-auto transition-all duration-400 ${
          isClosing
            ? "translate-y-full opacity-0"
            : "animate-[slideUp_0.5s_ease-out]"
        }`}
      >
        <div className="relative bg-black border-2 border-[#00f0ff] overflow-hidden">
          <div className="relative px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2 font-mono tracking-tight">
                  <span className="text-[#00f0ff]">// </span>
                  {t.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {t.description}
                </p>
              </div>

              <div className="flex flex-row sm:flex-col lg:flex-row gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => handleDismiss("accepted")}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-black font-bold tracking-widest text-xs sm:text-sm transition-all duration-300 hover:bg-[#00f0ff]"
                >
                  {t.accept}
                </button>

                <button
                  onClick={() => handleDismiss("declined")}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-gray-700 text-gray-400 font-bold tracking-widest text-xs sm:text-sm transition-all duration-300 hover:border-[#ccff00] hover:text-[#ccff00]"
                >
                  {t.decline}
                </button>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-900">
              <p className="text-[10px] sm:text-xs text-gray-600 font-mono">
                <span className="text-[#ccff00]">→</span> {t.learnMore}{" "}
                <Link
                  href="/privacy"
                  className="text-[#00f0ff] hover:underline underline-offset-2"
                >
                  {t.privacyPolicy}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
