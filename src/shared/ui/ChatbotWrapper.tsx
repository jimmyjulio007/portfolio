"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MessageSquare } from "lucide-react";

const AIChatbot = dynamic(() => import("@/features/AIChatbot").then(mod => mod.AIChatbot), {
    ssr: false,
    loading: () => (
        <div className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-[#00f0ff] flex items-center justify-center animate-pulse">
            <MessageSquare className="w-6 h-6 text-black" />
        </div>
    ),
});

export function ChatbotWrapper() {
    const [loaded, setLoaded] = useState(false);

    if (loaded) {
        return <AIChatbot />;
    }

    return (
        <button
            type="button"
            onClick={() => setLoaded(true)}
            className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-[#00f0ff] text-black flex items-center justify-center hover:-translate-y-0.5 transition-transform shadow-lg shadow-[#00f0ff]/20"
            aria-label="Open chat"
        >
            <MessageSquare className="w-6 h-6" />
        </button>
    );
}
