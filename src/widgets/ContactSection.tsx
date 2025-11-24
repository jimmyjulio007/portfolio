"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/shared/ui/Button";
import { useTranslations } from 'next-intl';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
    const t = useTranslations('Contact');
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(formRef.current, {
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 75%",
                },
                y: 80,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        // Simulate email sending (Replace with actual API call like EmailJS or backend)
        setTimeout(() => {
            console.log("Email sent:", formState);
            setStatus("success");
            setFormState({ name: "", email: "", message: "" });

            // Reset status after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        }, 2000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-32 bg-[#050505] overflow-hidden"
        >
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[#ccff00] font-mono text-sm tracking-widest uppercase">
                        {t('sectionLabel')}
                    </span>
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold text-white tracking-tighter mt-4"
                    >
                        {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ccff00]">{t('titleHighlight')}</span>
                    </h2>
                </div>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="group relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                required
                                disabled={status === "sending"}
                                className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff] transition-colors duration-300 font-mono disabled:opacity-50"
                                placeholder={t('namePlaceholder')}
                            />
                        </div>

                        <div className="group relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                required
                                disabled={status === "sending"}
                                className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff] transition-colors duration-300 font-mono disabled:opacity-50"
                                placeholder={t('emailPlaceholder')}
                            />
                        </div>
                    </div>

                    <div className="group relative">
                        <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            required
                            disabled={status === "sending"}
                            rows={6}
                            className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff] transition-colors duration-300 font-mono resize-none disabled:opacity-50"
                            placeholder={t('messagePlaceholder')}
                        />
                    </div>

                    <div className="flex justify-center pt-8">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={status === "sending"}
                            className={`bg-white text-black hover:bg-[#00f0ff] hover:scale-105 transition-all duration-300 font-bold tracking-widest px-12 ${status === "success" ? "bg-[#ccff00] hover:bg-[#ccff00]" : ""
                                }`}
                        >
                            {status === "idle" && t('submitIdle')}
                            {status === "sending" && t('submitSending')}
                            {status === "success" && t('submitSuccess')}
                            {status === "error" && t('submitError')}
                        </Button>
                    </div>
                </form>

                <div className="mt-20 flex justify-center gap-12 border-t border-gray-900 pt-12">
                    {[t('socialGithub'), t('socialLinkedin'), t('socialTwitter'), t('socialInstagram')].map((social) => (
                        <a
                            key={social}
                            href="#"
                            className="text-gray-600 hover:text-[#ccff00] transition-colors duration-300 font-mono text-sm tracking-widest"
                        >
                            {social}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
