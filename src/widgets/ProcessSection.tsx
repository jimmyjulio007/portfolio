"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

interface ProcessStep {
  id: string;
  title: string;
  desc: string;
  color: string;
}

function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <div className="group relative p-8 bg-[#0a0a0a] border border-gray-800 hover:border-[#00f0ff] transition-colors duration-500 h-96 flex flex-col justify-between overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent opacity-10">
          {step.id}
        </span>
      </div>

      <div className="relative z-10">
        <div
          className="w-12 h-1 mb-6 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: step.color }}
        />
        <h3 className="text-2xl font-bold text-white mb-4 font-migumono">
          {step.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
      </div>

      <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
        <span className="text-xs font-mono text-[#00f0ff]">
          &gt; EXECUTE_STEP_{step.id}
        </span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

export function ProcessSection() {
  const t = useTranslations("Process");

  const steps = useMemo(
    () => [
      { id: "01", title: t("step1Title"), desc: t("step1Description"), color: "#00f0ff" },
      { id: "02", title: t("step2Title"), desc: t("step2Description"), color: "#ccff00" },
      { id: "03", title: t("step3Title"), desc: t("step3Description"), color: "#ffffff" },
      { id: "04", title: t("step4Title"), desc: t("step4Description"), color: "#00f0ff" },
    ],
    [t],
  );

  return (
    <section id="process" className="py-32 bg-[#050505] relative border-t border-gray-900 overflow-hidden">
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00f0ff]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute left-[-100px] bottom-0 w-[400px] h-[400px] bg-[#ccff00]/4 blur-[130px] rounded-full pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-[#ccff00] font-mono text-sm tracking-widest uppercase">
            {t("sectionLabel")}
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 font-migumono">
            {t("title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ccff00]">
              {t("titleHighlight")}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <ProcessCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
