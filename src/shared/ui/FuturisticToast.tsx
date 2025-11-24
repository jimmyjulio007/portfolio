"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";

interface FuturisticToastProps {
    type: "success" | "error" | "info";
    message: string;
    onClose: () => void;
    duration?: number;
}

export function FuturisticToast({
    type,
    message,
    onClose,
    duration = 5000,
}: FuturisticToastProps) {
    const toastRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const toast = toastRef.current;
        const progress = progressRef.current;
        if (!toast || !progress) return;

        // Entrance animation
        gsap.fromTo(
            toast,
            {
                x: 400,
                opacity: 0,
                scale: 0.8,
            },
            {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
            }
        );

        // Progress bar animation
        gsap.fromTo(
            progress,
            { scaleX: 1 },
            {
                scaleX: 0,
                duration: duration / 1000,
                ease: "linear",
                onComplete: onClose,
            }
        );

        // Glow pulse animation
        gsap.to(toast, {
            boxShadow:
                type === "success"
                    ? "0 0 30px rgba(0, 240, 255, 0.5)"
                    : type === "error"
                        ? "0 0 30px rgba(239, 68, 68, 0.5)"
                        : "0 0 30px rgba(251, 191, 36, 0.5)",
            duration: 1,
            repeat: -1,
            yoyo: true,
        });
    }, [duration, onClose, type]);

    const handleClose = () => {
        const toast = toastRef.current;
        if (!toast) return;

        gsap.to(toast, {
            x: 400,
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.in",
            onComplete: onClose,
        });
    };

    const config = {
        success: {
            icon: CheckCircle2,
            borderColor: "border-[#00f0ff]",
            bgColor: "bg-[#00f0ff]/10",
            textColor: "text-[#00f0ff]",
            progressColor: "bg-[#00f0ff]",
        },
        error: {
            icon: XCircle,
            borderColor: "border-red-500",
            bgColor: "bg-red-500/10",
            textColor: "text-red-500",
            progressColor: "bg-red-500",
        },
        info: {
            icon: AlertCircle,
            borderColor: "border-amber-500",
            bgColor: "bg-amber-500/10",
            textColor: "text-amber-500",
            progressColor: "bg-amber-500",
        },
    };

    const Icon = config[type].icon;

    return (
        <div
            ref={toastRef}
            className={`
        fixed top-6 right-6 z-[1999999] min-w-[320px] max-w-[400px]
        ${config[type].bgColor} ${config[type].borderColor}
        border-2 rounded-lg backdrop-blur-xl
        shadow-2xl overflow-hidden
      `}
        >
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative p-4">
                <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`${config[type].textColor} mt-0.5`}>
                        <Icon size={24} strokeWidth={2.5} />
                    </div>

                    {/* Message */}
                    <div className="flex-1">
                        <p className="text-white font-mono text-sm leading-relaxed">
                            {message}
                        </p>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className={`
              ${config[type].textColor} hover:bg-white/10
              transition-colors rounded p-1
            `}
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/10">
                <div
                    ref={progressRef}
                    className={`h-full ${config[type].progressColor} origin-left`}
                    style={{ transformOrigin: "left" }}
                />
            </div>
        </div>
    );
}
