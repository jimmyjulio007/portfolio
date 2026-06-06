"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
      <CookieConsent />
      <ChatbotWrapper />
    </>
  );
}
