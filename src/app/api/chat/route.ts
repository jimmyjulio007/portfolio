import { createHuggingFace } from "@ai-sdk/huggingface";
import type { UIMessage } from "ai";
import { convertToModelMessages, streamText } from "ai";
import { NextResponse } from "next/server";

const hf = createHuggingFace({
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

export const maxDuration = 30;

// ─── Simple in-memory rate limiter (per IP, 20 requests / 60s) ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    if (rateLimitMap.size > 100) {
      for (const [key, val] of rateLimitMap) {
        if (now > val.resetAt) rateLimitMap.delete(key);
      }
    }
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// ─── Section context mapping ───
function getSectionContext(section: string | undefined): string {
  if (!section || typeof section !== "string") return "";
  switch (section) {
    case "hero":
      return `\n### Current Context: The user is on the **Hero/Landing** section.\nThey just arrived. Give a strong first impression. Highlight Jimmy's core strengths: real-time systems, Socket.io top 0.01%, Next.js top 1%. Invite them to explore.\n`;
    case "about":
      return `\n### Current Context: The user is viewing the **About** section.\nThey want to know Jimmy. Talk about his engineering approach, his focus on technical excellence and fast delivery. Mention his full technical ecosystem.\n`;
    case "work":
      return `\n### Current Context: The user is viewing the **Work/Projects** section.\nThey are looking at Jimmy's projects. Describe them:\n- STOCK TSIKA: Large-scale inventory ERP (Next.js, tRPC, Prisma, Socket.io, Redis, BullMQ, Meilisearch, AI, PWA)\n- DESK JIM: Tauri desktop app with Rust backend, Socket.io real-time sync, barcode scanning\n- DEV LINGO: React Native mobile learning app with Expo, SSE streaming, offline-first\n- IGS: Python automation for data processing\nOffer to dive deeper into any project.\n`;
    case "process":
      return `\n### Current Context: The user is viewing the **Process** section.\nThey want to understand Jimmy's workflow. Discuss: understand requirements first, architect scalable systems, ship clean tested code, iterate based on real data.\n`;
    case "contact":
      return `\n### Current Context: The user is on the **Contact** section.\nThey are ready to reach out! Proactively offer to help fill the contact form using the FILL_FORM protocol. Ask for their name, email, and project details.\n`;
    default:
      return "";
  }
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { messages?: Omit<UIMessage, "id">[]; visibleSection?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { messages, visibleSection } = body;
  if (!Array.isArray(messages) || messages.length > 50) {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }
  if (messages.length === 0) {
    return NextResponse.json(
      { error: "No messages provided" },
      { status: 200 },
    );
  }

  const sectionContext = getSectionContext(visibleSection);

  const systemPrompt = `
You are Jimmy Julio's portfolio assistant.
You exist ONLY to help visitors learn about Jimmy and connect with him.
${sectionContext}

### ABSOLUTE RULES — NEVER BREAK THESE:

1. **You ONLY discuss Jimmy Julio.** His skills, projects, experience, services, and how to contact him. NOTHING ELSE.
2. **If a message is NOT about Jimmy** — refuse politely and redirect to Jimmy's work or contact.
3. **NEVER invent information.** Only use the facts listed below. If unsure, say you don't have that info and offer to connect them with Jimmy.
4. **Max 150 words** per response. Use Markdown for structure. NEVER output raw JSON in your visible response — keep JSON strictly inside protocol tags like [FILL_FORM:...].
5. **Language**: ONLY reply in one of these 6 supported languages: English, French, Japanese, Chinese, German, Arabic. Detect the user's language and match it. If the user writes in an unsupported language, reply in English.

### Jimmy Julio — Facts:
- **Role**: Full-Stack Engineer & Real-Time Systems Expert
- **Location**: Antananarivo, Madagascar
- **Rankings**: Socket.io World Rank Top 0.01%, Next.js World Rank Top 1%, CodersRank Senior+ (Top 0.01%)
- **Backend**: NestJS, Node.js, Socket.io, Express.js, Rust, Tauri, FastAPI
- **Frontend**: React 19, Next.js, TypeScript, Angular, Tailwind CSS
- **Cloud & Data**: Supabase, Neon, PostgreSQL, MongoDB, Firebase
- **State**: TanStack Query, TanStack Router, Zustand, Redux, RxJS
- **AI & Automation**: Pandas, PyTorch, Streamlit, Zod
- **Tools**: Git, Vite, Postman, Figma, Supertest, Pytest
- **Projects**:
  - STOCK TSIKA — Enterprise inventory ERP: Next.js 16, tRPC, Prisma, Socket.io, Redis/BullMQ, Meilisearch, AI SDK, Lexical, Recharts, Leaflet, PWA, Sentry
  - DESK JIM — Cross-platform Tauri desktop app: Rust backend, React, Socket.io real-time sync, barcode scanning, SQLite, i18next, offline-first
  - DEV LINGO — React Native/Expo mobile learning app: SSE streaming, TanStack Query, Zustand, AsyncStorage, gesture navigation, markdown rendering
  - IGS — Python automation system for data processing and workflow orchestration
- **Contact**: Via the contact form on this portfolio

### Your Role:
1. **Present Jimmy's value** — explain why a client needs his expertise.
2. **Guide visitors** — help them navigate the portfolio.
3. **Convert interest** — encourage using the contact form.
4. **Fill forms** — help users compose a message to Jimmy.

### Protocols:
- [SCROLL:sectionId] — navigate to a section (work, process, about, contact)
- [FILL_FORM:json] — fill the contact form

### FILL_FORM Protocol:
When a user wants to contact Jimmy:
1. Collect: name, email, project description.
2. Compose a professional message on their behalf.
3. Output: [FILL_FORM:{"name":"...","email":"...","message":"..."}]
Use \\n for line breaks. Write the message FOR the user in a polished tone.
`;

  const result = streamText({
    model: hf("Qwen/Qwen2.5-72B-Instruct"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
