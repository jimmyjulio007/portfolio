"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useState, useRef, useEffect, useCallback, memo, useMemo } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, X, Send, Bot, User, Minimize2, Mic, MicOff,
    Volume2, VolumeX, Briefcase, Cpu, Mail, HelpCircle, Zap, Trash2,
    ThumbsUp, ThumbsDown, Copy
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLocale, useTranslations } from "next-intl";
import { Magnetic } from "@/shared/ui/Magnetic";
import { cn, smoothScroll } from "@/shared/lib/utils";
import { soundManager } from "@/shared/lib/sound-manager";
import { SOUND_CONFIG } from "@/shared/config/constants";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";

// ─── Stable singletons (prevents re-creation on every render) ───
let currentVisibleSection: string | null = null;

const chatTransport = new DefaultChatTransport({
    api: "/api/chat",
    body: () => ({ visibleSection: currentVisibleSection }),
});

const getInitialMessages = () => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(sessionStorage.getItem("chatbot-messages") || "[]"); }
    catch { return []; }
};

const markdownComponents = {
    p: ({ children }: ComponentPropsWithoutRef<"p">) => <p className="mb-2 last:mb-0 break-words">{children}</p>,
    ul: ({ children }: ComponentPropsWithoutRef<"ul">) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
    ol: ({ children }: ComponentPropsWithoutRef<"ol">) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
    li: ({ children }: ComponentPropsWithoutRef<"li">) => <li className="mb-1 break-words">{children}</li>,
    strong: ({ children }: ComponentPropsWithoutRef<"strong">) => <strong className="text-[#00f0ff] font-bold">{children}</strong>,
    code: ({ children }: ComponentPropsWithoutRef<"code">) => <code className="bg-white/10 px-1 rounded font-mono text-xs break-all inline-block max-w-full">{children}</code>,
};

function cleanNLPTags(text: string): string {
    return text
        .replace(/<thought>[\s\S]*?<\/thought>/gi, "")
        .replace(/\[(SCROLL|OPEN):.*?\]/g, "")
        .replace(/\[FILL_FORM:[\s\S]*?\]/g, "")
        .replace(/\[FILL_FORM:[\s\S]*$/g, "")
        .trim();
}

/** Strip markdown formatting for TTS so it reads naturally */
function stripMarkdownForTTS(text: string): string {
    return text
        .replace(/#{1,6}\s*/g, "")          // headings
        .replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1") // bold/italic
        .replace(/_{1,3}([^_]+)_{1,3}/g, "$1")   // bold/italic underscore
        .replace(/~~([^~]+)~~/g, "$1")       // strikethrough
        .replace(/`{1,3}[^`]*`{1,3}/g, "")  // inline/block code
        .replace(/^\s*[-*+]\s+/gm, "")       // list markers
        .replace(/^\s*\d+\.\s+/gm, "")       // ordered list markers
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1") // images
        .replace(/>\s*/g, "")                // blockquotes
        .replace(/\n{2,}/g, ". ")            // multiple newlines to pause
        .replace(/\n/g, " ")                 // single newlines to space
        .replace(/\s{2,}/g, " ")             // collapse whitespace
        .trim();
}

/** Strip incomplete markdown tokens from streaming text to prevent flicker */
function sanitizeStreamingMarkdown(text: string): string {
    let result = text;

    // Strip trailing incomplete emphasis markers (*, **, ***, _, __, ___)
    result = result.replace(/(\*{1,3}|_{1,3})$/, "");

    // Strip incomplete link/image at end: ![alt or [text or [text](url…
    result = result.replace(/!?\[[^\]]*$/, "");
    result = result.replace(/!?\[[^\]]*\]\([^)]*$/, "");

    // Close unclosed fenced code blocks so they render as code instead of leaking
    const fenceCount = (result.match(/```/g) || []).length;
    if (fenceCount % 2 !== 0) {
        result += "\n```";
    }

    return result;
}

// ─── Cyberpunk Loading Messages ───
const LOADING_MESSAGES = [
    "Decrypting neural pathway...",
    "Syncing with mainframe...",
    "Compiling response matrix...",
    "Traversing knowledge graph...",
    "Bootstrapping cognition...",
    "Establishing secure channel...",
    "Parsing quantum data...",
    "Rendering thought vector...",
];

// ─── Quick Action Chips ───
const QUICK_ACTIONS = [
    { label: "View Projects", icon: Briefcase, message: "Show me Jimmy's projects" },
    { label: "Skills", icon: Cpu, message: "What are Jimmy's technical skills?" },
    { label: "Contact", icon: Mail, message: "I want to contact Jimmy" },
    { label: "Help", icon: HelpCircle, message: "/help" },
];

// ─── Slash Command Handler ───
function handleSlashCommand(cmd: string): string | null {
    const lower = cmd.trim().toLowerCase();
    switch (lower) {
        case "/projects":
        case "/work":
            return "[SCROLL:work]";
        case "/skills":
        case "/process":
            return "[SCROLL:process]";
        case "/contact":
            return "[SCROLL:contact]";
        case "/playground":
            return "[SCROLL:playground]";
        case "/about":
            return "[SCROLL:about]";
        case "/help":
            return null; // Let the AI respond with help info
        default:
            return null;
    }
}

// ─── Context Awareness Hook ───
function useVisibleSection(): string | null {
    const [visible, setVisible] = useState<string | null>(null);

    useEffect(() => {
        const sections = ["hero", "about", "work", "process", "playground", "contact"];
        const observers: IntersectionObserver[] = [];

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setVisible(id);
                },
                { threshold: 0.3 }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return visible;
}

function getContextHint(section: string | null): string | null {
    switch (section) {
        case "work": return "You're viewing projects — ask me about any of them!";
        case "process": return "Curious about Jimmy's workflow? I can explain.";
        case "contact": return "Ready to reach out? I can help fill the form.";
        case "playground": return "Exploring the playground? Try the 3D demos!";
        case "about": return "Want to know more about Jimmy's journey?";
        default: return null;
    }
}

// ─── Sound FX helpers ───
let soundsPreloaded = false;
function preloadChatSounds() {
    if (soundsPreloaded) return;
    soundsPreloaded = true;
    soundManager.preload("chat-open", SOUND_CONFIG.sounds.click);
    soundManager.preload("chat-send", SOUND_CONFIG.sounds.hover);
    soundManager.preload("chat-receive", SOUND_CONFIG.sounds.transition);
}

// ─── Notification Pulse Messages ───
const TEASER_MESSAGES = [
    "Need a full-stack AI architect? I'm online.",
    "Curious about Jimmy's work? Let's talk.",
    "I can walk you through the portfolio.",
    "Looking for a developer? Ask me anything.",
];

// ─── Main Component ───
export function AIChatbot() {
    const t = useTranslations("Chatbot");
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState("");
    const [isAppReady, setIsAppReady] = useState(false);
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("chatbot-voice-enabled");
                return saved !== null ? JSON.parse(saved) : true;
            } catch { return true; }
        }
        return true;
    });
    const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
    const [showPulse, setShowPulse] = useState(false);
    const [pulseMessage] = useState(() =>
        TEASER_MESSAGES[Math.floor(Math.random() * TEASER_MESSAGES.length)]
    );
    const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const [unreadCount, setUnreadCount] = useState(0);
    const prevMsgCountRef = useRef(0);
    const [isMobile, setIsMobile] = useState(false);
    const [reactions, setReactions] = useState<Record<string, "up" | "down">>(() => {
        if (typeof window === "undefined") return {};
        try { return JSON.parse(sessionStorage.getItem("chatbot-reactions") || "{}"); }
        catch { return {}; }
    });
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const locale = useLocale();
    const visibleSection = useVisibleSection();
    currentVisibleSection = visibleSection; // Sync to module-level for transport body
    const { speak, cancel } = useSpeechSynthesis();
    const { isListening, startListening, stopListening } = useSpeechRecognition(locale);

    const [initialMessages] = useState(getInitialMessages);
    const { messages, sendMessage, setMessages, status, error, regenerate } = useChat({
        transport: chatTransport,
        experimental_throttle: 50,
        messages: initialMessages,
    });

    const isLoading = status === "submitted" || status === "streaming";
    const scrollRef = useRef<HTMLDivElement>(null);
    const chatPanelRef = useRef<HTMLDivElement>(null);
    const persistTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const lastProcessedIdRef = useRef<string | null>(null);
    const lastSpokenIdRef = useRef<string | null>(null);
    const loadingIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
    const isSecure = typeof window !== "undefined" ? window.isSecureContext : false;

    // Context hint (memoized to avoid recalculating)
    const contextHint = useMemo(() => getContextHint(visibleSection), [visibleSection]);

    // ─── Preload sounds on mount ───
    useEffect(() => { preloadChatSounds(); }, []);

    // ─── Mobile detection ───
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // ─── Rotate loading messages ───
    useEffect(() => {
        if (isLoading) {
            setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
            loadingIntervalRef.current = setInterval(() => {
                setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
            }, 2000);
        } else {
            clearInterval(loadingIntervalRef.current);
        }
        return () => clearInterval(loadingIntervalRef.current);
    }, [isLoading]);

    // ─── App readiness ───
    useEffect(() => {
        setIsAppReady(true);
    }, []);

    // ─── Notification Pulse (first visit only, 10s delay) ───
    useEffect(() => {
        if (!isAppReady || isOpen) return;
        const dismissed = sessionStorage.getItem("chatbot-pulse-dismissed");
        if (dismissed) return;

        pulseTimerRef.current = setTimeout(() => {
            setShowPulse(true);
            // Sound removed: browsers block play() before user interaction
        }, 10000);

        return () => clearTimeout(pulseTimerRef.current);
    }, [isAppReady, isOpen]);

    // Auto-dismiss pulse when chat opens
    useEffect(() => {
        if (isOpen && showPulse) {
            setShowPulse(false);
            sessionStorage.setItem("chatbot-pulse-dismissed", "true");
        }
    }, [isOpen, showPulse]);

    // ─── Debounced localStorage persist ───
    useEffect(() => {
        if (messages.length === 0) return;
        clearTimeout(persistTimeoutRef.current);
        persistTimeoutRef.current = setTimeout(() => {
            sessionStorage.setItem("chatbot-messages", JSON.stringify(messages.slice(-30)));
        }, 500);
        return () => clearTimeout(persistTimeoutRef.current);
    }, [messages]);

    useEffect(() => {
        localStorage.setItem("chatbot-voice-enabled", JSON.stringify(isVoiceEnabled));
    }, [isVoiceEnabled]);

    // ─── Persist reactions ───
    useEffect(() => {
        sessionStorage.setItem("chatbot-reactions", JSON.stringify(reactions));
    }, [reactions]);

    // ─── Auto-resize textarea ───
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
    }, [input]);

    // ─── NLP Protocol: Handle tags only once per completed message ───
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage || lastMessage.role !== "assistant" || status !== "ready") return;
        if (lastProcessedIdRef.current === lastMessage.id) return;
        lastProcessedIdRef.current = lastMessage.id;

        const text = lastMessage.parts
            .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
            .map((p) => p.text)
            .join(" ");

        // Sound FX on receive
        soundManager.play("chat-receive", { volume: 0.3 });

        // Handle Scroll
        const scrollMatch = text.match(/\[SCROLL:(.*?)\]/);
        if (scrollMatch) smoothScroll(`#${scrollMatch[1].trim()}`, 80);

        // Handle Open (validate URL)
        const openMatch = text.match(/\[OPEN:(.*?)\]/);
        if (openMatch) {
            const url = openMatch[1].trim();
            try {
                const parsed = new URL(url);
                if (parsed.protocol === "https:" || parsed.protocol === "http:") {
                    window.open(url, "_blank", "noopener,noreferrer");
                }
            } catch { /* invalid URL — ignore */ }
        }

        // Handle Fill Form
        const fillMatch = text.match(/\[FILL_FORM:([\s\S]*?)\]/);
        if (fillMatch) {
            try {
                const formData = JSON.parse(fillMatch[1].trim());
                if (formData.name && formData.email && formData.message) {
                    window.dispatchEvent(new CustomEvent("fill-contact-form", { detail: formData }));
                    smoothScroll("#contact", 80);
                }
            } catch (e) {
                console.warn("[AIChatbot] Failed to parse FILL_FORM data:", e);
            }
        }
    }, [messages, status]);

    // ─── TTS: Speak only once per completed assistant message ───
    useEffect(() => {
        if (!isVoiceEnabled || status !== "ready" || messages.length === 0) return;
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage || lastMessage.role !== "assistant") return;
        if (lastSpokenIdRef.current === lastMessage.id) return;
        lastSpokenIdRef.current = lastMessage.id;

        const fullText = lastMessage.parts
            .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
            .map((p) => p.text)
            .join(" ");

        const cleanText = stripMarkdownForTTS(cleanNLPTags(fullText));
        if (cleanText) speak(cleanText, document.documentElement.lang || "en-US");
    }, [messages, status, isVoiceEnabled, speak]);

    // ─── Unread badge: track new assistant messages while chat is closed ───
    useEffect(() => {
        const newCount = messages.length;
        if (newCount > prevMsgCountRef.current && !isOpen) {
            const newMessages = messages.slice(prevMsgCountRef.current);
            const assistantCount = newMessages.filter((m) => m.role === "assistant").length;
            if (assistantCount > 0) setUnreadCount(c => c + assistantCount);
        }
        prevMsgCountRef.current = newCount;
    }, [messages, isOpen]);

    // Reset unread when chat opens
    useEffect(() => {
        if (isOpen) setUnreadCount(0);
    }, [isOpen]);

    // ─── Auto-scroll ───
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, status]);

    // ─── doSend: wraps sendMessage with slash command support ───
    const doSend = useCallback((text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        // Check slash commands
        if (trimmed.startsWith("/")) {
            const result = handleSlashCommand(trimmed);
            if (result) {
                // Direct scroll action — extract section ID from result
                const scrollMatch = result.match(/\[SCROLL:(.*?)\]/);
                if (scrollMatch) {
                    smoothScroll(`#${scrollMatch[1].trim()}`, 80);
                }
                return;
            }
            // /help → send as normal message to AI
        }

        soundManager.play("chat-send", { volume: 0.2 });
        sendMessage({ text: trimmed });
    }, [sendMessage]);

    // ─── Handlers ───
    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            doSend(input);
            setInput("");
            if (textareaRef.current) textareaRef.current.style.height = "auto";
            if (isListening) stopListening();
        }
    }, [input, doSend, isListening, stopListening]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            const target = e.currentTarget;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            setInput(prev => prev.substring(0, start) + "\n" + prev.substring(end));
            requestAnimationFrame(() => {
                target.selectionStart = target.selectionEnd = start + 1;
            });
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (input.trim() && !isLoading) {
                doSend(input);
                setInput("");
                if (textareaRef.current) textareaRef.current.style.height = "auto";
                if (isListening) stopListening();
            }
        }
    }, [input, isLoading, doSend, isListening, stopListening]);

    const handleToggleListen = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening(
                (text) => setInput(prev => prev + (prev ? " " : "") + text),
                (err) => {
                    if (err === "not-allowed") {
                        alert("Microphone access blocked. \n\n1. Check if you are on HTTPS (required).\n2. Click the 'Lock' icon in the URL bar to reset permissions.\n3. Ensure no other app is using the microphone.");
                    } else if (err === "network") {
                        alert("Speech recognition network error. Please try again.");
                    } else {
                        console.warn("Speech Error:", err);
                    }
                }
            );
        }
    }, [isListening, startListening, stopListening]);

    const handleToggleVoice = useCallback(() => {
        if (isVoiceEnabled) cancel();
        setIsVoiceEnabled((v: boolean) => !v);
    }, [isVoiceEnabled, cancel]);

    const handleClose = useCallback(() => {
        cancel();
        setIsOpen(false);
    }, [cancel]);

    const handleQuickAction = useCallback((message: string) => {
        doSend(message);
    }, [doSend]);

    const handleToggle = useCallback(() => {
        setIsOpen(o => {
            if (!o) soundManager.play("chat-open", { volume: 0.2 });
            return !o;
        });
    }, []);

    const handlePulseClick = useCallback(() => {
        setShowPulse(false);
        sessionStorage.setItem("chatbot-pulse-dismissed", "true");
        soundManager.play("chat-open", { volume: 0.2 });
        setIsOpen(true);
    }, []);

    const handlePulseDismiss = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setShowPulse(false);
        sessionStorage.setItem("chatbot-pulse-dismissed", "true");
    }, []);

    const handleClearHistory = useCallback(() => {
        cancel();
        setMessages([]);
        sessionStorage.removeItem("chatbot-messages");
        sessionStorage.removeItem("chatbot-reactions");
        lastProcessedIdRef.current = null;
        lastSpokenIdRef.current = null;
        prevMsgCountRef.current = 0;
        setUnreadCount(0);
        setReactions({});
    }, [cancel, setMessages]);

    const handleReact = useCallback((messageId: string, reaction: "up" | "down") => {
        setReactions(prev => {
            const next = { ...prev };
            if (next[messageId] === reaction) {
                delete next[messageId];
            } else {
                next[messageId] = reaction;
            }
            return next;
        });
    }, []);

    const handleExport = useCallback(async () => {
        const text = messages
            .map((m) => {
                const role = m.role === "user" ? "You" : "Neural Link";
                const content = m.parts
                    .filter((p) => p.type === "text")
                    .map((p) => p.type === "text" ? cleanNLPTags(p.text) : "")
                    .join(" ");
                return `${role}: ${content}`;
            })
            .join("\n\n");

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "chat-export.txt";
            a.click();
            URL.revokeObjectURL(url);
        }
    }, [messages]);

    // ─── Keyboard shortcuts (Ctrl+K toggle, Escape close) ───
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                handleToggle();
            }
            if (e.key === "Escape" && isOpen) {
                e.preventDefault();
                handleClose();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, handleToggle, handleClose]);

    // ─── Focus trap: keep Tab cycling inside chat panel ───
    useEffect(() => {
        if (!isOpen || isMinimized) return;
        const panel = chatPanelRef.current;
        if (!panel) return;

        const handler = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;
            const focusable = panel.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        // Auto-focus the textarea on open
        const textarea = panel.querySelector("textarea");
        if (textarea) requestAnimationFrame(() => textarea.focus());

        panel.addEventListener("keydown", handler);
        return () => panel.removeEventListener("keydown", handler);
    }, [isOpen, isMinimized]);

    // ─── Swipe-to-close gesture (mobile) ───
    const touchStartY = useRef<number | null>(null);
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    }, []);
    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (touchStartY.current === null) return;
        const deltaY = e.changedTouches[0].clientY - touchStartY.current;
        // Swipe down > 80px on header → close
        if (deltaY > 80) {
            handleClose();
        }
        touchStartY.current = null;
    }, [handleClose]);

    // ─── Hidden until app loading is done ───
    if (!isAppReady) return null;

    return (
        <div className={cn(
            "fixed z-[99999] flex flex-col items-end pointer-events-none",
            isOpen && isMobile ? "inset-0" : "bottom-0 right-0 sm:bottom-6 sm:right-6"
        )}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatPanelRef}
                        initial={{ opacity: 0, scale: isMobile ? 1 : 0.8, y: isMobile ? 20 : 30, filter: "blur(10px)" }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            filter: "blur(0px)",
                            height: isMinimized ? "80px" : isMobile ? "100dvh" : "550px"
                        }}
                        exit={{ opacity: 0, scale: isMobile ? 1 : 0.8, y: isMobile ? 20 : 30, filter: "blur(10px)" }}
                        className={cn(
                            "glass-panel border border-[#00f0ff]/20 flex flex-col overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_0_20px_rgba(0,240,255,0.1)] pointer-events-auto rounded-none",
                            "before:absolute before:inset-0 before:bg-noise before:opacity-[0.03] before:pointer-events-none",
                            isMobile ? "w-full" : "w-[calc(100vw-32px)] sm:w-[350px] md:w-[400px] mb-4",
                            isMinimized && "h-[80px]"
                        )}
                    >
                        {/* Cyber Header */}
                        <div
                            className="p-4 bg-black/60 border-b border-white/5 flex items-center justify-between relative overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            {/* Mobile drag indicator */}
                            {isMobile && (
                                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/20 rounded-full" />
                            )}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50" />

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-[#00f0ff]/5 flex items-center justify-center border border-[#00f0ff]/20">
                                        <Bot className={cn("w-5 h-5 text-[#00f0ff]", isLoading && "animate-pulse")} />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#ccff00] rounded-full border-2 border-black" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white font-migumono tracking-widest">{t("title")}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-[#00f0ff] font-mono block opacity-70 tracking-tighter uppercase">{t("subtitle")}</span>
                                        <span className="w-1 h-1 rounded-full bg-[#ccff00] animate-pulse" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleToggleVoice}
                                    className={cn(
                                        "p-2 hover:bg-white/5 rounded-lg transition-all duration-300",
                                        isVoiceEnabled ? "text-[#00f0ff]" : "text-gray-500"
                                    )}
                                    title={isVoiceEnabled ? "Mute Bot" : "Unmute Bot"}
                                    type="button"
                                >
                                    {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                </button>
                                {messages.length > 0 && (
                                    <>
                                        <button
                                            onClick={handleExport}
                                            className={cn(
                                                "p-2 hover:bg-white/5 rounded-lg transition-all duration-300",
                                                copied ? "text-[#ccff00]" : "text-gray-500 hover:text-[#00f0ff]"
                                            )}
                                            title={copied ? "Copied!" : "Copy chat"}
                                            aria-label="Export chat"
                                            type="button"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={handleClearHistory}
                                            className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 text-gray-500 hover:text-red-400"
                                            title="Clear history"
                                            aria-label="Clear chat history"
                                            type="button"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => setIsMinimized(m => !m)}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 text-gray-500 hover:text-white"
                                    title={t("minimize")}
                                    aria-label={t("minimize")}
                                    type="button"
                                >
                                    <Minimize2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 text-gray-500 hover:text-[#00f0ff]"
                                    title={t("close")}
                                    aria-label={t("close")}
                                    type="button"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Neural Pathway (Messages) */}
                        {!isMinimized && (
                            <>
                                <div
                                    ref={scrollRef}
                                    data-lenis-prevent
                                    className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-black/10 relative"
                                >
                                    {/* Welcome Message + Context Hint + Quick Actions */}
                                    {messages.length === 0 && (
                                        <div className="space-y-3">
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center shrink-0">
                                                    <Bot className="w-4 h-4 text-[#00f0ff]" />
                                                </div>
                                                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                                                    <p className="text-sm text-gray-300 leading-relaxed font-light font-sans">
                                                        {t("welcome")}
                                                    </p>
                                                    {contextHint && (
                                                        <p className="text-xs text-[#ccff00]/70 mt-2 font-mono flex items-center gap-1">
                                                            <Zap className="w-3 h-3" />
                                                            {contextHint}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Quick Action Chips */}
                                            <QuickActionChips onAction={handleQuickAction} />
                                        </div>
                                    )}

                                    {messages.map((m, idx) => (
                                        <div key={m.id}>
                                            <MessageBubble message={m} reaction={reactions[m.id]} onReact={handleReact} />
                                            {/* Show quick actions after last assistant message when idle */}
                                            {m.role === "assistant" && idx === messages.length - 1 && status === "ready" && (
                                                <div className="mt-3 ml-11">
                                                    <QuickActionChips onAction={handleQuickAction} compact />
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Cyberpunk Loading Indicator */}
                                    {isLoading && !messages[messages.length - 1]?.parts.some((p) => p.type === "text") && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center shrink-0">
                                                <Bot className="w-4 h-4 text-[#00f0ff] animate-pulse" />
                                            </div>
                                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex gap-1">
                                                        <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                        <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                        <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce" />
                                                    </div>
                                                </div>
                                                <p className="text-[10px] font-mono text-[#00f0ff]/60 mt-2 uppercase tracking-widest animate-pulse">
                                                    {loadingMsg}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex flex-col items-center gap-3">
                                            <p className="text-xs text-red-100 font-mono text-center tracking-tight bg-red-500/10 px-4 py-2 border border-red-500/20">{t("error")}</p>
                                            <button
                                                onClick={() => regenerate()}
                                                className="px-4 py-1.5 text-xs bg-red-500/20 text-white border border-red-500/40 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold tracking-widest"
                                                type="button"
                                            >
                                                {t("retry")}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Slash Command Hint */}
                                {input.startsWith("/") && (
                                    <div className="px-4 py-2 bg-black/80 border-t border-[#00f0ff]/10">
                                        <div className="flex flex-wrap gap-1">
                                            {["/projects", "/skills", "/contact", "/playground", "/about", "/help"].filter(
                                                cmd => cmd.startsWith(input.toLowerCase())
                                            ).map(cmd => (
                                                <button
                                                    key={cmd}
                                                    type="button"
                                                    onClick={() => { setInput(""); doSend(cmd); }}
                                                    className="text-[10px] font-mono px-2 py-1 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 hover:bg-[#00f0ff]/20 transition-colors"
                                                >
                                                    {cmd}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Input Neural Bridge */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="p-4 bg-black/60 border-t border-white/5 flex items-center gap-3 relative"
                                    style={{ paddingBottom: isMobile ? "max(1rem, env(safe-area-inset-bottom, 1rem))" : undefined }}
                                >
                                    <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent" />

                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder={t("placeholder")}
                                        rows={1}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]/50 transition-all duration-500 font-mono placeholder:text-gray-700 resize-none custom-scrollbar max-h-24"
                                    />
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={handleToggleListen}
                                            className={cn(
                                                "w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-500 rounded-none border border-white/10 relative overflow-hidden group",
                                                isListening
                                                    ? "bg-red-500/20 text-red-500 border-red-500/40"
                                                    : "bg-white/5 text-gray-400 hover:text-[#00f0ff] hover:bg-[#00f0ff]/5"
                                            )}
                                            title={isListening ? t("voiceStop") : (isSecure ? t("voiceStart") : "Voice requires HTTPS/Localhost")}
                                        >
                                            {isListening && (
                                                <span className="absolute inset-0 bg-red-500/20 animate-ping" />
                                            )}
                                            {isListening ? <MicOff className="w-5 h-5 sm:w-4 sm:h-4" /> : <Mic className={cn("w-5 h-5 sm:w-4 sm:h-4", !isSecure && "opacity-20")} />}
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isLoading || !input.trim()}
                                            aria-label="Send message"
                                            className={cn(
                                                "w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-500 disabled:opacity-30 disabled:grayscale",
                                                input.trim() ? "bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]" : "bg-white/5 text-gray-500"
                                            )}
                                        >
                                            <Send className="w-5 h-5 sm:w-4 sm:h-4" />
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notification Pulse Toast */}
            <AnimatePresence>
                {showPulse && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={handlePulseClick}
                        className="mb-3 pointer-events-auto cursor-pointer max-w-[280px] relative group"
                    >
                        <div className="bg-black/90 border border-[#00f0ff]/30 p-3 pr-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                            {/* Scanline top */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-60" />

                            <div className="flex items-start gap-2.5">
                                <div className="w-6 h-6 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center shrink-0 mt-0.5">
                                    <Zap className="w-3 h-3 text-[#00f0ff]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-[#00f0ff]/60 uppercase tracking-widest mb-1">
                                        Neural Link
                                    </p>
                                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                                        {pulseMessage}
                                    </p>
                                </div>
                            </div>

                            {/* Dismiss X */}
                            <button
                                onClick={handlePulseDismiss}
                                className="absolute top-2 right-2 p-1 text-gray-600 hover:text-white transition-colors"
                                aria-label="Dismiss"
                                type="button"
                            >
                                <X className="w-3 h-3" />
                            </button>

                            {/* Bottom accent */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#ccff00]/30 via-transparent to-[#00f0ff]/30" />
                        </div>

                        {/* Connector line to button */}
                        <div className="flex justify-end mr-7">
                            <div className="w-[1px] h-2 bg-[#00f0ff]/30" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Futuristic Toggle Trigger */}
            <Magnetic strength={0.3}>
                <div className="relative group pointer-events-auto">
                    {/* Glow Effects */}
                    {!isOpen && (
                        <>
                            <div className="absolute -inset-4 bg-[#00f0ff]/20 rounded-full blur-2xl animate-pulse group-hover:bg-[#ccff00]/20 transition-colors duration-1000" />
                            <div className="absolute -inset-1 bg-gradient-to-tr from-[#00f0ff] to-[#ccff00] rounded-full opacity-20 group-hover:opacity-40 blur-md transition-opacity duration-700" />
                        </>
                    )}

                    <button
                        onClick={handleToggle}
                        aria-label={isOpen ? t("close") : t("title")}
                        aria-expanded={isOpen}
                        className={cn(
                            "relative w-16 h-16 flex items-center justify-center transition-all duration-700 transform overflow-hidden",
                            isOpen
                                ? "bg-black border border-[#00f0ff] rotate-90 scale-90 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                                : "bg-black border border-[#00f0ff]/50 hover:border-[#ccff00] group-hover:scale-105"
                        )}
                    >
                        {/* Background Grid Pattern */}
                        {!isOpen && (
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                backgroundImage: `linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)`,
                                backgroundSize: '8px 8px'
                            }} />
                        )}

                        {isOpen ? (
                            <X className="w-8 h-8 text-white" />
                        ) : (
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut"
                                }}
                                className="relative z-10"
                            >
                                <MessageSquare className={cn(
                                    "w-7 h-7 transition-all duration-700",
                                    isOpen ? "text-white" : "text-[#00f0ff] group-hover:text-[#ccff00]"
                                )} />
                            </motion.div>
                        )}

                        {/* Status Indicator / Unread Badge / Typing */}
                        {!isOpen && isLoading ? (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-50" />
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00f0ff] items-center justify-center">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                </span>
                            </span>
                        ) : !isOpen && unreadCount > 0 ? (
                            <span className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center bg-[#ccff00] text-black text-[10px] font-bold font-mono rounded-full shadow-[0_0_10px_rgba(204,255,0,0.5)] z-20">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        ) : !isOpen ? (
                            <span className="absolute top-3 right-3 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ccff00] shadow-[0_0_5px_#ccff00]"></span>
                            </span>
                        ) : null}

                        {/* Scan Line Detail */}
                        {!isOpen && (
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00f0ff]/50 animate-scan opacity-30" />
                        )}
                    </button>
                </div>
            </Magnetic>
        </div>
    );
}

// ─── Quick Action Chips Component ───
const QuickActionChips = memo(function QuickActionChips({
    onAction,
    compact = false,
}: {
    onAction: (message: string) => void;
    compact?: boolean;
}) {
    return (
        <div className={cn("flex flex-wrap gap-2", compact ? "gap-1.5" : "pl-11")}>
            {QUICK_ACTIONS.map((action) => (
                <button
                    key={action.label}
                    type="button"
                    onClick={() => onAction(action.message)}
                    className={cn(
                        "flex items-center gap-1.5 font-mono uppercase tracking-wider border transition-all duration-300 group/chip",
                        "bg-white/[0.03] border-white/10 text-gray-400 hover:border-[#00f0ff]/40 hover:text-[#00f0ff] hover:bg-[#00f0ff]/5",
                        compact ? "text-[9px] px-2 py-1" : "text-[10px] px-3 py-1.5"
                    )}
                >
                    <action.icon className={cn(
                        "text-gray-500 group-hover/chip:text-[#00f0ff] transition-colors",
                        compact ? "w-2.5 h-2.5" : "w-3 h-3"
                    )} />
                    {action.label}
                </button>
            ))}
        </div>
    );
});

// ─── Timestamp formatter ───
function formatTimestamp(date: Date | string | undefined): string | null {
    if (!date) return null;
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return null;
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Memoized Message Bubble ───
const MessageBubble = memo(function MessageBubble({
    message,
    reaction,
    onReact,
}: {
    message: UIMessage;
    reaction?: "up" | "down";
    onReact?: (messageId: string, reaction: "up" | "down") => void;
}) {

    const timestamp = formatTimestamp((message as UIMessage & { createdAt?: Date | string }).createdAt);

    return (
        <div
            className={cn(
                "flex items-start gap-3 w-full",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
        >
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border shrink-0",
                message.role === "user" ? "bg-white/5 border-white/10" : "bg-[#00f0ff]/10 border-[#00f0ff]/20 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
            )}>
                {message.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-[#00f0ff]" />}
            </div>
            <div className="max-w-[85%] flex flex-col">
                <div className={cn(
                    "p-4 text-sm leading-relaxed font-sans break-words overflow-hidden",
                    message.role === "user"
                        ? "bg-[#ccff00] text-black font-semibold rounded-2xl rounded-tr-none shadow-[0_10px_20px_rgba(204,255,0,0.1)]"
                        : "bg-white/5 text-gray-200 border border-white/10 rounded-2xl rounded-tl-none"
                )}>
                    {message.parts.map((p, i) => {
                        if (p.type === "text") {
                            const cleanText = cleanNLPTags(p.text);

                            if (!cleanText && message.role === "assistant") return null;

                            if (message.role === "user") return <p key={i} className="break-words">{p.text}</p>;
                            const displayText = sanitizeStreamingMarkdown(cleanText);
                            return (
                                <div key={i} className="markdown-content break-words">
                                    <ReactMarkdown components={markdownComponents}>
                                        {displayText}
                                    </ReactMarkdown>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className={cn(
                    "flex items-center gap-1 mt-1",
                    message.role === "user" ? "justify-end" : "justify-start"
                )}>
                    {message.role === "assistant" && onReact && (
                        <div className="flex items-center gap-0.5">
                            <button
                                type="button"
                                onClick={() => onReact(message.id, "up")}
                                className={cn(
                                    "p-1 rounded transition-all duration-200",
                                    reaction === "up"
                                        ? "text-[#ccff00] bg-[#ccff00]/10"
                                        : "text-gray-600 hover:text-gray-400 hover:bg-white/5"
                                )}
                                aria-label="Thumbs up"
                            >
                                <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button
                                type="button"
                                onClick={() => onReact(message.id, "down")}
                                className={cn(
                                    "p-1 rounded transition-all duration-200",
                                    reaction === "down"
                                        ? "text-red-400 bg-red-400/10"
                                        : "text-gray-600 hover:text-gray-400 hover:bg-white/5"
                                )}
                                aria-label="Thumbs down"
                            >
                                <ThumbsDown className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                    {timestamp && (
                        <span className={cn(
                            "text-[9px] font-mono opacity-40",
                            message.role === "user" ? "text-gray-400" : "text-gray-500"
                        )}>
                            {timestamp}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
});
