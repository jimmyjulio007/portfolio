"use client";

import dynamic from "next/dynamic";

const AIChatbot = dynamic(() => import("@/features/AIChatbot").then(mod => mod.AIChatbot), {
    ssr: false,
});

export function ChatbotWrapper() {
    return <AIChatbot />;
}
