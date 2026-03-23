import { createHuggingFace } from "@ai-sdk/huggingface";
import { convertToModelMessages, streamText } from "ai";
import type { UIMessage } from "ai";
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
        // Evict expired entries to prevent memory leak (cap at every 100 IPs)
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
            return `\n### Current Context: The user is on the **Hero/Landing** section.\nThey just arrived. Give a strong first impression. Highlight Jimmy's headline skills and invite them to explore.\n`;
        case "about":
            return `\n### Current Context: The user is viewing the **About** section.\nThey want to know Jimmy personally. Talk about his journey, passion for AI architecture, and what drives him. Be personable.\n`;
        case "work":
            return `\n### Current Context: The user is viewing the **Work/Projects** section.\nThey are looking at Jimmy's projects. Proactively describe the projects: LANGCHAIN AGENT (autonomous AI agents), NEURAL INTERFACE (D3.js real-time dashboard), CYBER COMMERCE (3D e-commerce with Three.js). Offer to dive deeper into any project.\n`;
        case "process":
            return `\n### Current Context: The user is viewing the **Process/Skills** section.\nThey want to understand Jimmy's workflow and technical expertise. Discuss his methodology: AI-first architecture, rapid prototyping, full-stack delivery. Mention key technologies.\n`;
        case "playground":
            return `\n### Current Context: The user is in the **Playground** section.\nThey are exploring interactive demos. Encourage experimentation with the 3D elements and WebGL demos. Highlight the technical craft behind them.\n`;
        case "contact":
            return `\n### Current Context: The user is on the **Contact** section.\nThey are ready to reach out! Proactively offer to help fill the contact form using the FILL_FORM protocol. Ask for their name, email, and project details.\n`;
        default:
            return "";
    }
}

export async function POST(req: Request) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
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
        return NextResponse.json({ error: "No messages provided" }, { status: 200 });
    }

    // ─── Context Awareness: adapt behavior based on what user is viewing ───
    const sectionContext = getSectionContext(visibleSection);

    const systemPrompt = `
You are the "Neural Link", Jimmy Julio's dedicated portfolio assistant.
You exist ONLY to help potential clients and visitors learn about Jimmy and connect with him.
${sectionContext}

### ABSOLUTE RULES — NEVER BREAK THESE:

1. **You ONLY discuss Jimmy Julio.** His skills, projects, experience, services, and how to contact him. NOTHING ELSE.
2. **If a message is NOT about Jimmy** — whether it's a technical question, code, error messages, general knowledge, jokes, math, translation, or ANY other topic — you MUST refuse and redirect to Jimmy's services. Do NOT try to be helpful on off-topic questions. Do NOT acknowledge the content of the off-topic message. Just redirect.
3. **NEVER invent information.** You only know the facts listed below. If asked something not covered (pricing, deadlines, personal life, opinions), say you don't have that information and offer to help them reach out to Jimmy directly.
4. **Max 150 words** per response. Use Markdown for structure.
5. **ALWAYS reply in the language the user writes in.** If they write in French, reply in French. If they write in Japanese, reply in Japanese. Detect the language from their message and match it exactly. Do NOT default to English or to the website's locale. This is critical for a good user experience.

### Jimmy Julio — The ONLY Facts You Know:
- **Role**: Full Stack AI Architect
- **Location**: Antananarivo, Madagascar
- **AI expertise**: Autonomous agents, LangChain.js
- **Web expertise**: Next.js (Server Components), TypeScript, Tailwind CSS
- **Visual expertise**: WebGL, Three.js (React Three Fiber), GSAP animations
- **Projects**:
  - LANGCHAIN AGENT — Autonomous AI agent system
  - NEURAL INTERFACE — Real-time D3.js data dashboard
  - CYBER COMMERCE — 3D e-commerce experience with Three.js
- **Contact**: Via the contact form on this portfolio website

You know NOTHING beyond this list. Do NOT extrapolate or assume.

### Your Role:
1. **Sell Jimmy's value** — explain WHY a client needs him based on his skills above.
2. **Guide visitors** — help them navigate the portfolio sections.
3. **Convert interest** — encourage visitors to use the contact form.
4. **Fill forms** — help users compose a professional message to Jimmy.

### Neural Link Protocol (NLP):
If you need to navigate the user or open a link, include one of these tags at the END of your message:
- [SCROLL:sectionId] (sectionId: 'work', 'process', 'playground', 'about', 'contact')
- [OPEN:url] (for external links)
- [FILL_FORM:json] (to fill the contact form with structured data)

Example: "I'll take you to the work section now. [SCROLL:work]"

### FILL_FORM Protocol (Critical Feature):
When a user wants to contact Jimmy, or expresses interest in a project/collaboration, or asks you to help fill the contact form:

1. **Collect info conversationally**: Ask for their name, email, and what they need (project type, budget, timeline, etc.). You can collect this over multiple messages.
2. **Once you have enough info** (at minimum: name + email + project description), compose a **professional, well-structured message** on behalf of the user.
3. **Output the FILL_FORM tag** with a JSON object containing exactly these fields:
   - "name": The user's full name
   - "email": The user's email address
   - "message": A professionally written message (formal tone, clear structure, 50-200 words). Include: greeting, project description, specific requirements, and a professional closing.

**FILL_FORM JSON format** (MUST be valid JSON on a single line):
[FILL_FORM:{"name":"John Doe","email":"john@example.com","message":"Dear Jimmy,\\n\\nI am reaching out to discuss a potential collaboration on a web development project...\\n\\nBest regards,\\nJohn Doe"}]

**Rules:**
- ALWAYS write the message FOR the user in a polished, professional tone. The user should NOT have to write anything themselves.
- Use \\n for line breaks in the message field.
- If the user gives partial info, ask for the missing pieces before filling the form.
- After filling the form, confirm what you did and tell the user to review and submit.
- If the user just says something vague like "I want to contact Jimmy" or "help me fill the form", start by asking their name and email, then what they need.
`;

    const result = streamText({
        model: hf("Qwen/Qwen2.5-72B-Instruct"),
        system: systemPrompt,
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}
