"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export function useSpeechRecognition(lang: string = "en-US") {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    const startListening = useCallback((onResult: (text: string) => void, onError?: (error: string) => void) => {
        if (!window.isSecureContext) {
            if (onError) onError("not-allowed");
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            if (onError) onError("not-supported");
            return;
        }

        // Request microphone permission explicitly before starting recognition
        // This prevents the SpeechRecognition API from throwing "not-allowed" silently
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                // Permission granted - stop the stream immediately (we only needed the permission)
                stream.getTracks().forEach(track => track.stop());

                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = true;
                recognition.lang = lang;

                recognition.onstart = () => setIsListening(true);
                recognition.onend = () => setIsListening(false);
                recognition.onerror = (event: any) => {
                    // Expected user-facing errors — don't use console.error (triggers Next.js overlay)
                    if (event.error !== "aborted") {
                        console.warn("[SpeechRecognition]", event.error);
                    }
                    if (onError) onError(event.error);
                    setIsListening(false);
                };

                recognition.onresult = (event: any) => {
                    let finalTranscript = "";
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        }
                    }
                    if (finalTranscript) onResult(finalTranscript);
                };

                recognition.start();
                recognitionRef.current = recognition;
            })
            .catch(() => {
                // Microphone permission denied
                if (onError) onError("not-allowed");
            });
    }, [lang]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    }, []);

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    return { isListening, startListening, stopListening };
}
