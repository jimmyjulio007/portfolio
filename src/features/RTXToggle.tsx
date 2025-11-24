"use client";

import { useState } from "react";
import { Zap, ZapOff } from "lucide-react";
import { soundManager } from "@/shared/lib/sound-manager";

export function RTXToggle() {
    const [rtxEnabled, setRTXEnabled] = useState(false);

    const toggleRTX = () => {
        setRTXEnabled(!rtxEnabled);
        soundManager.play("click", { volume: 0.5 });

        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent("rtx-toggle", {
            detail: { enabled: !rtxEnabled }
        }));
    };

    return (
        <button
            onClick={toggleRTX}
            className={`fixed bottom-24 right-6 z-50 px-4 py-3 rounded-lg font-mono text-xs tracking-widest transition-all duration-300 flex items-center gap-2 ${rtxEnabled
                    ? "bg-gradient-to-r from-[#00f0ff] to-[#ccff00] text-black shadow-[0_0_20px_rgba(0,240,255,0.5)]"
                    : "bg-gray-900 text-gray-400 border border-gray-700 hover:border-gray-500"
                }`}
            aria-label="Toggle RTX Mode"
        >
            {rtxEnabled ? (
                <>
                    <Zap className="w-4 h-4" />
                    <span>RTX ON</span>
                </>
            ) : (
                <>
                    <ZapOff className="w-4 h-4" />
                    <span>RTX OFF</span>
                </>
            )}
        </button>
    );
}
