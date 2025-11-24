"use client";

import { cn } from "@/shared/lib/utils";
import { soundManager } from "@/shared/lib/sound-manager";
import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    withSound?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    withSound = true,
    className,
    children,
    onClick,
    ...props
}: ButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (withSound) {
            soundManager.play("click", { volume: 0.5 });
        }
        onClick?.(e);
    };

    const handleMouseEnter = () => {
        if (withSound) {
            soundManager.play("hover", { volume: 0.3 });
        }
    };

    const baseStyles =
        "relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden group uppercase tracking-wider clip-path-button";

    const variantStyles = {
        primary:
            "bg-white text-black hover:bg-[#00f0ff] hover:text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] border-none",
        secondary:
            "bg-transparent text-white border border-white/30 hover:border-[#ccff00] hover:text-[#ccff00] hover:bg-[#ccff00]/10 backdrop-blur-sm",
        ghost:
            "text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm",
    };

    const sizeStyles = {
        sm: "px-5 py-2 text-xs",
        md: "px-8 py-3 text-sm",
        lg: "px-10 py-4 text-base",
    };

    return (
        <button
            type="button"
            className={cn(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                className,
            )}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            {...props}
        >
            {/* Holographic Scan Effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />

            {/* Tech Corners */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </button>
    );
}
