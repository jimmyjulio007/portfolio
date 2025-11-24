"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Button } from "@/shared/ui/Button";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PRIVACY_CONTENT = {
    en: {
        title: "PRIVACY PROTOCOL",
        subtitle: "SECURE DATA TRANSMISSION & STORAGE",
        lastUpdated: "LAST UPDATED: 2024.11.24",
        sections: [
            {
                id: "01",
                title: "DATA COLLECTION",
                content: "We collect minimal data necessary for communication. When you use our contact form, we process your name, email address, and message content. This data is transmitted securely via encrypted channels."
            },
            {
                id: "02",
                title: "USAGE PROTOCOLS",
                content: "Your data is used exclusively for communication purposes. We do not sell, trade, or transfer your personally identifiable information to outside parties. Your digital footprint is respected."
            },
            {
                id: "03",
                title: "COOKIE SYSTEM",
                content: "Our system uses cookies to enhance interface responsiveness and analyze traffic patterns. You have full control over these tracking modules via our Cookie Consent Protocol."
            },
            {
                id: "04",
                title: "THIRD PARTY LINKS",
                content: "This interface may contain links to external networks (GitHub, LinkedIn). These third-party sites have separate and independent privacy policies. We have no responsibility or liability for the content and activities of these linked sites."
            },
            {
                id: "05",
                title: "DATA SECURITY",
                content: "We implement a variety of security measures to maintain the safety of your personal information. All sensitive data is transmitted via Secure Socket Layer (SSL) technology."
            }
        ],
        back: "RETURN TO BASE"
    },
    fr: {
        title: "PROTOCOLE DE CONFIDENTIALITÉ",
        subtitle: "TRANSMISSION & STOCKAGE SÉCURISÉS",
        lastUpdated: "DERNIÈRE MISE À JOUR : 24.11.2024",
        sections: [
            {
                id: "01",
                title: "COLLECTE DE DONNÉES",
                content: "Nous collectons un minimum de données nécessaires à la communication. Lorsque vous utilisez notre formulaire de contact, nous traitons votre nom, votre adresse e-mail et le contenu de votre message. Ces données sont transmises de manière sécurisée via des canaux cryptés."
            },
            {
                id: "02",
                title: "PROTOCOLES D'UTILISATION",
                content: "Vos données sont utilisées exclusivement à des fins de communication. Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers. Votre empreinte numérique est respectée."
            },
            {
                id: "03",
                title: "SYSTÈME DE COOKIES",
                content: "Notre système utilise des cookies pour améliorer la réactivité de l'interface et analyser les modèles de trafic. Vous avez un contrôle total sur ces modules de suivi via notre Protocole de Consentement aux Cookies."
            },
            {
                id: "04",
                title: "LIENS TIERS",
                content: "Cette interface peut contenir des liens vers des réseaux externes (GitHub, LinkedIn). Ces sites tiers ont des politiques de confidentialité distinctes et indépendantes. Nous n'avons aucune responsabilité quant au contenu et aux activités de ces sites liés."
            },
            {
                id: "05",
                title: "SÉCURITÉ DES DONNÉES",
                content: "Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Toutes les données sensibles sont transmises via la technologie Secure Socket Layer (SSL)."
            }
        ],
        back: "RETOUR À LA BASE"
    },
    ja: {
        title: "プライバシープロトコル",
        subtitle: "安全なデータ送信と保存",
        lastUpdated: "最終更新日: 2024.11.24",
        sections: [
            {
                id: "01",
                title: "データ収集",
                content: "通信に必要な最小限のデータを収集します。お問い合わせフォームを使用する際、お名前、メールアドレス、メッセージ内容を処理します。このデータは暗号化されたチャネルを通じて安全に送信されます。"
            },
            {
                id: "02",
                title: "使用プロトコル",
                content: "お客様のデータは通信目的でのみ使用されます。個人を特定できる情報を外部に販売、取引、または譲渡することはありません。デジタルフットプリントは尊重されます。"
            },
            {
                id: "03",
                title: "クッキーシステム",
                content: "当システムは、インターフェースの応答性を高め、トラフィックパターンを分析するためにクッキーを使用します。クッキー同意プロトコルを通じて、これらの追跡モジュールを完全に制御できます。"
            },
            {
                id: "04",
                title: "サードパーティリンク",
                content: "このインターフェースには、外部ネットワーク（GitHub、LinkedIn）へのリンクが含まれる場合があります。これらのサードパーティサイトには、独立したプライバシーポリシーがあります。リンク先サイトのコンテンツや活動について、当社は一切の責任を負いません。"
            },
            {
                id: "05",
                title: "データセキュリティ",
                content: "個人情報の安全性を維持するために、さまざまなセキュリティ対策を実施しています。すべての機密データは、Secure Socket Layer（SSL）技術を介して送信されます。"
            }
        ],
        back: "ベースに戻る"
    },
    zh: {
        title: "隐私协议",
        subtitle: "安全数据传输与存储",
        lastUpdated: "最后更新：2024.11.24",
        sections: [
            {
                id: "01",
                title: "数据收集",
                content: "我们仅收集通信所需的必要数据。当您使用我们的联系表单时，我们会处理您的姓名、电子邮件地址和消息内容。这些数据通过加密通道安全传输。"
            },
            {
                id: "02",
                title: "使用协议",
                content: "您的数据仅用于通信目的。我们不会向外界出售、交易或转让您的个人身份信息。您的数字足迹将受到尊重。"
            },
            {
                id: "03",
                title: "COOKIE 系统",
                content: "我们的系统使用 Cookie 来增强界面响应能力并分析流量模式。您可以通过我们的 Cookie 同意协议完全控制这些跟踪模块。"
            },
            {
                id: "04",
                title: "第三方链接",
                content: "此界面可能包含指向外部网络（GitHub、LinkedIn）的链接。这些第三方网站拥有独立且不同的隐私政策。我们对这些链接网站的内容和活动不承担任何责任。"
            },
            {
                id: "05",
                title: "数据安全",
                content: "我们实施各种安全措施以维护您个人信息的安全。所有敏感数据均通过安全套接字层 (SSL) 技术传输。"
            }
        ],
        back: "返回基地"
    },
    de: {
        title: "DATENSCHUTZ-PROTOKOLL",
        subtitle: "SICHERE DATENÜBERTRAGUNG & SPEICHERUNG",
        lastUpdated: "LETZTE AKTUALISIERUNG: 24.11.2024",
        sections: [
            {
                id: "01",
                title: "DATENERFASSUNG",
                content: "Wir erfassen nur minimale Daten, die für die Kommunikation notwendig sind. Wenn Sie unser Kontaktformular nutzen, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse und den Nachrichteninhalt. Diese Daten werden sicher über verschlüsselte Kanäle übertragen."
            },
            {
                id: "02",
                title: "NUTZUNGSPROTOKOLLE",
                content: "Ihre Daten werden ausschließlich zu Kommunikationszwecken verwendet. Wir verkaufen, handeln oder übertragen Ihre personenbezogenen Daten nicht an Dritte. Ihr digitaler Fußabdruck wird respektiert."
            },
            {
                id: "03",
                title: "COOKIE-SYSTEM",
                content: "Unser System verwendet Cookies, um die Reaktionsfähigkeit der Schnittstelle zu verbessern und Verkehrsmuster zu analysieren. Sie haben die volle Kontrolle über diese Tracking-Module über unser Cookie-Zustimmungsprotokoll."
            },
            {
                id: "04",
                title: "DRITTANBIETER-LINKS",
                content: "Diese Schnittstelle kann Links zu externen Netzwerken (GitHub, LinkedIn) enthalten. Diese Websites Dritter haben separate und unabhängige Datenschutzrichtlinien. Wir übernehmen keine Verantwortung oder Haftung für den Inhalt und die Aktivitäten dieser verlinkten Seiten."
            },
            {
                id: "05",
                title: "DATENSICHERHEIT",
                content: "Wir setzen eine Vielzahl von Sicherheitsmaßnahmen ein, um die Sicherheit Ihrer persönlichen Daten zu gewährleisten. Alle sensiblen Daten werden über die Secure Socket Layer (SSL)-Technologie übertragen."
            }
        ],
        back: "ZURÜCK ZUR BASIS"
    },
    ar: {
        title: "بروتوكول الخصوصية",
        subtitle: "نقل وتخزين البيانات الآمن",
        lastUpdated: "آخر تحديث: 24.11.2024",
        sections: [
            {
                id: "01",
                title: "جمع البيانات",
                content: "نجمع الحد الأدنى من البيانات اللازمة للتواصل. عند استخدام نموذج الاتصال الخاص بنا، نقوم بمعالجة اسمك وعنوان بريدك الإلكتروني ومحتوى الرسالة. يتم نقل هذه البيانات بشكل آمن عبر قنوات مشفرة."
            },
            {
                id: "02",
                title: "بروتوكولات الاستخدام",
                content: "تستخدم بياناتك حصرياً لأغراض التواصل. لا نقوم ببيع أو المتاجرة أو نقل معلوماتك الشخصية إلى أطراف خارجية. يتم احترام بصمتك الرقمية."
            },
            {
                id: "03",
                title: "نظام ملفات تعريف الارتباط",
                content: "يستخدم نظامنا ملفات تعريف الارتباط لتحسين استجابة الواجهة وتحليل أنماط الزيارات. لديك السيطرة الكاملة على وحدات التتبع هذه عبر بروتوكول الموافقة على ملفات تعريف الارتباط الخاص بنا."
            },
            {
                id: "04",
                title: "روابط الطرف الثالث",
                content: "قد تحتوي هذه الواجهة على روابط لشبكات خارجية (GitHub، LinkedIn). هذه المواقع التابعة لجهات خارجية لها سياسات خصوصية منفصلة ومستقلة. لا نتحمل أي مسؤولية أو التزام عن محتوى وأنشطة هذه المواقع المرتبطة."
            },
            {
                id: "05",
                title: "أمن البيانات",
                content: "نطبق مجموعة متنوعة من التدابير الأمنية للحفاظ على سلامة معلوماتك الشخصية. يتم نقل جميع البيانات الحساسة عبر تقنية طبقة المقابس الآمنة (SSL)."
            }
        ],
        back: "العودة للقاعدة"
    }
};

export function PrivacyPolicyContent() {
    const locale = useLocale() as keyof typeof PRIVACY_CONTENT;
    const content = PRIVACY_CONTENT[locale] || PRIVACY_CONTENT.en;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.from(".privacy-header", {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            });

            // Sections Animation
            gsap.utils.toArray<HTMLElement>(".privacy-section").forEach((section, i) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });

            // Decorative lines animation
            gsap.to(".scan-line", {
                y: "100%",
                duration: 3,
                repeat: -1,
                ease: "linear"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-[#00f0ff] selection:text-black">
            {/* Background Grid */}
            <div className="fixed inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Vignette */}
            <div className="fixed inset-0 z-0 bg-radial-gradient from-transparent to-black pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">

                {/* Header */}
                <header className="privacy-header mb-20 text-center relative">
                    <div className="inline-block mb-4 px-4 py-1 border border-[#ccff00] text-[#ccff00] text-xs font-mono tracking-widest bg-[#ccff00]/10 rounded-full">
                        SYSTEM_DOC_V.1.0
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 glitch-text" data-text={content.title}>
                        {content.title}
                    </h1>
                    <p className="text-[#00f0ff] font-mono tracking-widest text-sm md:text-base">
                        // {content.subtitle}
                    </p>
                    <div className="mt-4 text-gray-500 text-xs font-mono">
                        {content.lastUpdated}
                    </div>
                </header>

                {/* Content Sections */}
                <div className="space-y-12">
                    {content.sections.map((section, index) => (
                        <div key={section.id} className="privacy-section relative group">
                            {/* Section Border/Card */}
                            <div className="absolute -inset-4 bg-gray-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 border border-[#00f0ff]/20" />

                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* ID Number */}
                                <div className="hidden md:block text-4xl font-bold text-gray-800 font-mono select-none group-hover:text-[#00f0ff]/20 transition-colors duration-300">
                                    {section.id}
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="md:hidden text-[#00f0ff] font-mono text-sm">{section.id}</span>
                                        {section.title}
                                        <div className="h-[1px] flex-1 bg-gray-800 group-hover:bg-[#00f0ff]/50 transition-colors duration-500" />
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer / Back Button */}
                <div className="mt-24 text-center">
                    <Link href="/">
                        <Button
                            variant="secondary"
                            className="border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black tracking-widest font-mono"
                        >
                            {content.back}
                        </Button>
                    </Link>
                </div>

                {/* Decorative Scan Line */}
                <div className="scan-line fixed top-0 left-0 w-full h-[2px] bg-[#00f0ff]/20 pointer-events-none z-50" />
            </div>
        </main>
    );
}
