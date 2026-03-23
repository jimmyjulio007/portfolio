"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () =>
    import("@/features/CustomCursor").then((mod) => ({
      default: mod.CustomCursor,
    })),
  { ssr: false },
);

const CookieConsent = dynamic(
  () =>
    import("@/features/CookieConsent").then((mod) => ({
      default: mod.CookieConsent,
    })),
  { ssr: false },
);

const ChatbotWrapper = dynamic(
  () =>
    import("@/shared/ui/ChatbotWrapper").then((mod) => ({
      default: mod.ChatbotWrapper,
    })),
  { ssr: false },
);

/**
 * Defers loading of non-critical UI components until after first paint.
 * Saves ~200-400 KiB of initial JS (GSAP for cookies, AI chatbot, cursor).
 */
export function DeferredComponents() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestIdleCallback(() => setReady(true), { timeout: 3000 });
    return () => cancelIdleCallback(id);
  }, []);

  if (!ready) return null;

  return (
    <>
      <CustomCursor />
      <CookieConsent />
      <ChatbotWrapper />
    </>
  );
}
