"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale, useTranslations } from "next-intl";
import { Loader2, Send } from "lucide-react";
import { getContactFormSchema, type ContactFormData } from "@/shared/lib/validations/contact";
import { FuturisticToast } from "@/shared/ui/FuturisticToast";
import { Magnetic } from "@/shared/ui/Magnetic";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
    const t = useTranslations("Contact");
    const locale = useLocale();
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{
        show: boolean;
        type: "success" | "error" | "info";
        message: string;
    }>({ show: false, type: "info", message: "" });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(getContactFormSchema(locale)),
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
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

            // Form animation
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

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    locale,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            // Success animation
            if (formRef.current) {
                gsap.to(formRef.current, {
                    scale: 0.95,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                });
            }

            // Show success toast with translation
            setToast({
                show: true,
                type: "success",
                message: t("toast.success"),
            });

            // Reset form
            reset();
        } catch (error) {
            console.error("Error sending message:", error);
            setToast({
                show: true,
                type: "error",
                message: t("toast.error"),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-32 bg-[#050505] overflow-hidden"
        >
            {/* Background grid effect */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(#00f0ff 1px, transparent 1px),
              linear-gradient(90deg, #00f0ff 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#ccff00] font-mono text-sm tracking-widest uppercase">
                        {t("sectionLabel")}
                    </span>
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold text-white tracking-tighter mt-4"
                    >
                        {t("title")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ccff00]">
                            {t("titleHighlight")}
                        </span>
                    </h2>
                </div>

                {/* Form */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {/* Name & Email Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Name Input */}
                        <div className="group relative">
                            <input
                                {...register("name")}
                                type="text"
                                disabled={isSubmitting}
                                className={`
                  w-full bg-transparent border-b-2 py-4 text-white 
                  placeholder-gray-600 focus:outline-none transition-all duration-300 
                  font-mono disabled:opacity-50
                  ${errors.name ? "border-red-500" : "border-gray-800 focus:border-[#00f0ff]"}
                `}
                                placeholder={t("namePlaceholder")}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs font-mono mt-2 animate-pulse">
                                    {errors.name.message}
                                </p>
                            )}
                            {/* Cyber glow effect */}
                            <div className="absolute -bottom-[2px] left-0 h-[2px] bg-[#00f0ff] w-0 group-focus-within:w-full transition-all duration-500" />
                        </div>

                        {/* Email Input */}
                        <div className="group relative">
                            <input
                                {...register("email")}
                                type="email"
                                disabled={isSubmitting}
                                className={`
                  w-full bg-transparent border-b-2 py-4 text-white 
                  placeholder-gray-600 focus:outline-none transition-all duration-300 
                  font-mono disabled:opacity-50
                  ${errors.email ? "border-red-500" : "border-gray-800 focus:border-[#00f0ff]"}
                `}
                                placeholder={t("emailPlaceholder")}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs font-mono mt-2 animate-pulse">
                                    {errors.email.message}
                                </p>
                            )}
                            <div className="absolute -bottom-[2px] left-0 h-[2px] bg-[#00f0ff] w-0 group-focus-within:w-full transition-all duration-500" />
                        </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="group relative">
                        <textarea
                            {...register("message")}
                            disabled={isSubmitting}
                            rows={6}
                            className={`
                w-full bg-transparent border-b-2 py-4 text-white 
                placeholder-gray-600 focus:outline-none transition-all duration-300 
                font-mono resize-none disabled:opacity-50
                ${errors.message ? "border-red-500" : "border-gray-800 focus:border-[#00f0ff]"}
              `}
                            placeholder={t("messagePlaceholder")}
                        />
                        {errors.message && (
                            <p className="text-red-500 text-xs font-mono mt-2 animate-pulse">
                                {errors.message.message}
                            </p>
                        )}
                        <div className="absolute -bottom-[2px] left-0 h-[2px] bg-[#00f0ff] w-0 group-focus-within:w-full transition-all duration-500" />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-8">
                        <Magnetic>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`
                  relative group px-12 py-4 bg-white text-black font-bold 
                  tracking-widest rounded-none overflow-hidden
                  transition-all duration-300 font-mono
                  hover:bg-[#00f0ff] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  ${isSubmitting ? "animate-pulse" : ""}
                `}
                            >
                                {/* Scanline effect */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <div
                                        className="h-full w-full animate-scan"
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
                                        }}
                                    />
                                </div>

                                {/* Button content */}
                                <span className="relative flex items-center gap-3">
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            {t("submitSending")}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {t("submitIdle")}
                                        </>
                                    )}
                                </span>
                            </button>
                        </Magnetic>
                    </div>
                </form>

                {/* Social Links */}
                <div className="mt-20 flex flex-wrap justify-center gap-6 md:gap-12 border-t border-gray-900 pt-12">
                    {[
                        t("socialGithub"),
                        t("socialLinkedin"),
                        t("socialTwitter"),
                        t("socialInstagram"),
                    ].map((social) => (
                        <Link
                            key={social}
                            href="#"
                            className="text-gray-600 hover:text-[#ccff00] transition-colors duration-300 font-mono text-sm tracking-widest group relative"
                        >
                            {social}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ccff00] group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </div>


            </div>

            {/* Toast Notification */}
            {toast.show && (
                <FuturisticToast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </section>
    );
}
