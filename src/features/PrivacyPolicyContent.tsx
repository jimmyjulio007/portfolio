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
    // Fallbacks for other languages to English for now
    ja: null,
    zh: null,
    de: null,
    ar: null
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
