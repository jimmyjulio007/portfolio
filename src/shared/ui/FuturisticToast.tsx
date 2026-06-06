"use client";

import { AlertCircle, CheckCircle2, X, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";

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
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

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
      className={`
        fixed top-6 right-6 z-[1999999] min-w-[320px] max-w-[400px]
        ${config[type].bgColor} ${config[type].borderColor}
        border-2 rounded-lg backdrop-blur-xl
        shadow-2xl overflow-hidden
        animate-[slideInFromRight_0.4s_ease-out]
      `}
    >
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          <div className={`${config[type].textColor} mt-0.5`}>
            <Icon size={24} strokeWidth={2.5} />
          </div>

          <div className="flex-1">
            <p className="text-white font-mono text-sm leading-relaxed">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`
              ${config[type].textColor} hover:bg-white/10
              transition-colors rounded p-1
            `}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="h-1 bg-white/10">
        <div
          ref={progressRef}
          className={`h-full ${config[type].progressColor} origin-left`}
          style={{
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}
