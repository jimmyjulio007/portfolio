"use client";

import { useTranslations } from "next-intl";
import { ScrollLink } from "@/shared/ui/ScrollLink";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <>
      {/* Hero */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center px-6 md:px-24 border-b border-gray-800/20"
      >
        {/* Blueprint grid background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #494847 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px] bg-gradient-to-l from-[#00f0ff]/10 to-transparent blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="font-mono text-[#ccff00] text-xs tracking-[0.4em] mb-6 uppercase animate-[fadeInUp_0.6s_ease-out_both]">
            {"// FULL-STACK_ENGINEER // REAL-TIME_SYSTEMS"}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8 font-migumono animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
            {t("title_line1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#00e5ee]">
              {t("title_line2")}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-12 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
            {t("subtitle_long", {
              defaultValue:
                "Specializing in complex, real-time distributed systems and premium frontend experiences. Delivering technical excellence and architectural scalability.",
            })}
          </p>

          <div className="flex flex-wrap gap-4 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
            <ScrollLink
              href="#work"
              className="inline-block bg-[#00f0ff] text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:-translate-y-0.5 transition-all duration-200"
            >
              {t("viewWork")}
            </ScrollLink>
            <ScrollLink
              href="#contact"
              className="inline-block border border-gray-700 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-900 transition-all duration-200"
            >
              {t("contactNetwork")}
            </ScrollLink>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="absolute bottom-8 left-6 md:left-24 flex items-center gap-4 text-white/20 font-mono text-[10px] tracking-widest">
          <span>{t("locationName").toUpperCase()}</span>
          <span className="h-px w-12 bg-white/10" />
          <span>STATUS: AVAILABLE</span>
        </div>
      </section>

      {/* Rankings Section */}
      <section className="relative py-24 px-6 md:px-24 bg-[#131313] border-b border-gray-800/20 overflow-hidden">
        <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-[#00f0ff]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-[#ccff00]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[#00f0ff] text-[10px] tracking-[0.4em] mb-4 uppercase">
            {"// PERFORMANCE_METRICS"}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight uppercase mb-16 font-migumono">
            {t("rankingsTitle", { defaultValue: "Global Rankings" })}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Socket.io */}
            <div className="border border-gray-800/30 bg-gradient-to-br from-[#131313] to-[#0e0e0e] p-10 hover:border-[#00f0ff]/50 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[#ccff00] text-3xl font-mono">
                  {">"}_
                </span>
                <span className="font-mono text-[10px] text-white/30 tracking-widest">
                  REALTIME_CORE
                </span>
              </div>
              <div className="text-[#00f0ff] text-5xl font-bold font-migumono mb-2">
                0.01%
              </div>
              <div className="font-bold uppercase tracking-widest text-xs mb-4 text-white">
                Socket.io World Rank
              </div>
              <div className="w-full bg-white/5 h-1">
                <div
                  className="bg-[#00f0ff] h-full"
                  style={{ width: "99.99%" }}
                />
              </div>
            </div>

            {/* Next.js */}
            <div className="border border-gray-800/30 bg-gradient-to-br from-[#131313] to-[#0e0e0e] p-10 hover:border-[#00f0ff]/50 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[#ccff00] text-3xl font-mono">
                  {"{"}_
                </span>
                <span className="font-mono text-[10px] text-white/30 tracking-widest">
                  FRONTEND_OPS
                </span>
              </div>
              <div className="text-[#00f0ff] text-5xl font-bold font-migumono mb-2">
                Top 1%
              </div>
              <div className="font-bold uppercase tracking-widest text-xs mb-4 text-white">
                Next.js Global Index
              </div>
              <div className="w-full bg-white/5 h-1">
                <div className="bg-[#00f0ff] h-full" style={{ width: "99%" }} />
              </div>
            </div>

            {/* CodersRank */}
            <div className="border border-gray-800/30 bg-gradient-to-br from-[#131313] to-[#0e0e0e] p-10 hover:border-[#00f0ff]/50 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[#ccff00] text-3xl font-mono">
                  {"#"}_
                </span>
                <span className="font-mono text-[10px] text-white/30 tracking-widest">
                  ENGINEERING_TIER
                </span>
              </div>
              <div className="text-[#00f0ff] text-5xl font-bold font-migumono mb-2">
                Senior+
              </div>
              <div className="font-bold uppercase tracking-widest text-xs mb-4 text-white">
                CodersRank Top 0.01%
              </div>
              <div className="flex gap-1 mt-4">
                <span className="w-2 h-2 bg-[#ccff00]" />
                <span className="w-2 h-2 bg-[#ccff00]" />
                <span className="w-2 h-2 bg-[#ccff00]" />
                <span className="w-2 h-2 bg-[#ccff00]" />
                <span className="w-2 h-2 bg-[#ccff00] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
