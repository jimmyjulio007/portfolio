"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const TECH_STACK = [
  {
    category: "BACKEND & REAL-TIME",
    techs: [
      { name: "NestJS", highlight: false },
      { name: "Node.js", highlight: false },
      { name: "Socket.io", highlight: true },
      { name: "Express.js", highlight: false },
      { name: "Rust", highlight: true },
      { name: "Tauri", highlight: false },
      { name: "FastAPI", highlight: false },
    ],
  },
  {
    category: "FRONTEND ENGINEERING",
    techs: [
      { name: "React 19", highlight: true },
      { name: "Next.js", highlight: false },
      { name: "TypeScript", highlight: false },
      { name: "Angular", highlight: false },
      { name: "Three.js", highlight: false },
      { name: "Tailwind CSS", highlight: false },
    ],
  },
  {
    category: "CLOUD & DATA",
    techs: [
      { name: "Supabase", highlight: false },
      { name: "Neon", highlight: false },
      { name: "PostgreSQL", highlight: true },
      { name: "MongoDB", highlight: false },
      { name: "Firebase", highlight: false },
    ],
  },
  {
    category: "STATE & LOGIC",
    techs: [
      { name: "TanStack Query", highlight: true },
      { name: "TanStack Router", highlight: false },
      { name: "Zustand", highlight: false },
      { name: "Redux", highlight: false },
      { name: "RxJS", highlight: false },
    ],
  },
  {
    category: "AI & AUTOMATION",
    techs: [
      { name: "Pandas", highlight: true },
      { name: "PyTorch", highlight: false },
      { name: "Streamlit", highlight: false },
      { name: "Zod", highlight: false },
      { name: "Excel Automation", highlight: false },
    ],
  },
  {
    category: "TOOLS & QA",
    techs: [
      { name: "Git", highlight: false },
      { name: "Vite", highlight: true },
      { name: "Postman", highlight: false },
      { name: "Figma", highlight: false },
      { name: "Supertest", highlight: false },
      { name: "Pytest", highlight: false },
    ],
  },
];

export function AboutSection() {
  const t = useTranslations("About");

  const softSkills = useMemo(
    () => [
      t("softSkill1"),
      t("softSkill2"),
      t("softSkill3"),
      t("softSkill4"),
      t("softSkill5"),
    ],
    [t],
  );

  return (
    <section id="about" className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute right-[-100px] top-1/4 w-[500px] h-[500px] bg-[#00f0ff]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute left-[-150px] bottom-1/3 w-[400px] h-[400px] bg-[#ccff00]/4 blur-[130px] rounded-full pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#ccff00] rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

              <div className="relative bg-black rounded-lg overflow-hidden border border-gray-800 aspect-[3/4]">
                <Image
                  src="/profile.png"
                  alt="Jimmy Julio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h2 className="text-2xl font-bold text-white font-migumono">
                    {t("name")}
                  </h2>
                  <p className="text-[#00f0ff] font-mono text-xs tracking-widest">
                    {t("role")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="text-[#ccff00] font-mono text-sm tracking-widest uppercase">
              {t("sectionLabel")}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white font-migumono">
              {t("title")}{" "}
              <span className="text-[#00f0ff]">{t("titleHighlight")}</span>
            </h2>

            <div className="space-y-6 text-gray-300 text-lg font-light leading-relaxed mb-12">
              <p dangerouslySetInnerHTML={{ __html: t.raw("paragraph1") }} />
              <p dangerouslySetInnerHTML={{ __html: t.raw("paragraph2") }} />

              <div className="pt-4">
                <h3 className="text-white font-bold mb-4 text-xl font-migumono">
                  {t("softSkillsTitle")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {softSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 border border-gray-800 rounded-full text-sm text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00] transition-colors duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Ecosystem */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="font-mono text-[#00f0ff] text-xs tracking-[0.4em] mb-4 uppercase">
                // TECH_STACK
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight uppercase font-migumono">
                {t("technicalArsenal")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_STACK.map((group) => (
              <div
                key={group.category}
                className="border border-gray-800/20 p-8 hover:bg-[#131313] transition-colors"
              >
                <h4 className="font-bold text-lg mb-6 tracking-widest flex items-center gap-4 font-migumono">
                  <span className="w-2 h-2 bg-[#ccff00]" />
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.techs.map((tech) => (
                    <span
                      key={tech.name}
                      className={`px-3 py-1 bg-white/5 text-[10px] font-mono tracking-widest uppercase ${
                        tech.highlight ? "text-[#00f0ff]" : "text-gray-400"
                      }`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
