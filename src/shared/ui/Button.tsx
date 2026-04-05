"use client";

import { cn } from "@/shared/lib/utils";
import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden group uppercase tracking-wider";

  const variantStyles = {
    primary:
      "bg-white text-black hover:bg-[#00f0ff] hover:text-black border-none",
    secondary:
      "bg-transparent text-white border border-white/30 hover:border-[#ccff00] hover:text-[#ccff00] hover:bg-[#ccff00]/10 backdrop-blur-sm",
    ghost: "text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm",
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
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
