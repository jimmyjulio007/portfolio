"use client";

import { useRef, useCallback, useEffect } from "react";

export function useSpeechSynthesis() {
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            synthRef.current = window.speechSynthesis;
        }
        return () => {
            synthRef.current?.cancel();
        };
    }, []);

    const speak = useCallback((text: string, lang: string = "en-US") => {
        if (!synthRef.current) return;

        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 1.1;
        utterance.pitch = 1.0;
        synthRef.current.speak(utterance);
    }, []);

    const cancel = useCallback(() => {
        synthRef.current?.cancel();
    }, []);

    return { speak, cancel };
}
