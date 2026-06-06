"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SITE_CONFIG } from "@/shared/config/constants";
import type { Project } from "@/shared/types";
import { Button } from "@/shared/ui/Button";

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full text-left border border-gray-800/30 bg-gradient-to-br from-[#131313] to-[#0e0e0e] hover:border-[#00f0ff]/50 transition-all duration-500"
    >
      <div className="p-8 md:p-10 flex flex-col h-full min-h-[340px]">
        <div className="flex justify-between items-start mb-8">
          <span className="text-[#00f0ff] font-mono text-xs tracking-widest">
            {project.category}
          </span>
          <span className="text-white/10 font-bold font-mono text-4xl">
            0{index + 1}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-migumono group-hover:text-[#00f0ff] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap mt-auto">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/5 text-[10px] font-mono tracking-widest uppercase text-gray-400"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 bg-white/5 text-[10px] font-mono tracking-widest uppercase text-gray-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800/30 flex justify-between items-center">
          <span className="font-mono text-[10px] text-white/20 tracking-widest">
            {project.year}
          </span>
          <span className="font-mono text-xs text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            DETAILS →
          </span>
        </div>
      </div>
    </button>
  );
}

function ProjectDialog({
  project,
  onClose,
  viewLabel,
}: {
  project: Project;
  onClose: () => void;
  viewLabel: string;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
        aria-label="Close dialog"
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0e0e0e] border border-gray-800 overflow-hidden animate-[fadeInUp_0.3s_ease-out] max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Top accent line */}
        <div className="h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#ccff00]" />

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[#00f0ff] font-mono text-xs tracking-widest block mb-3">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-migumono">
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border border-gray-800 hover:border-[#00f0ff] transition-colors group"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:text-[#00f0ff] transition-colors" />
            </button>
          </div>

          {/* Description */}
          <div className="mb-8">
            <span className="font-mono text-[10px] text-white/30 tracking-widest block mb-3">
              OVERVIEW
            </span>
            <p className="text-gray-300 leading-relaxed text-sm">
              {project.details}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <span className="font-mono text-[10px] text-white/30 tracking-widest block mb-3">
              TECH_STACK
            </span>
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/5 border border-gray-800/50 text-xs font-mono tracking-widest uppercase text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Year */}
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-[10px] text-white/30 tracking-widest">
              YEAR
            </span>
            <span className="font-mono text-sm text-white">{project.year}</span>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-800/50 flex items-center justify-between">
            <span className="font-mono text-[10px] text-white/20 tracking-widest">
              PRIVATE_REPOSITORY
            </span>
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#00f0ff] text-black font-bold text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-transform"
              >
                {viewLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkSection() {
  const t = useTranslations("Work");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleClose = useCallback(() => setSelectedProject(null), []);

  const projects: Project[] = useMemo(
    () => [
      {
        id: "1",
        title: t("project1Title"),
        description: t("project1Description"),
        details: t("project1Details"),
        category: t("project1Category", { defaultValue: "FULL-STACK / ERP" }),
        year: 2025,
        tags: t("project1Tags").split(" • "),
      },
      {
        id: "2",
        title: t("project2Title"),
        description: t("project2Description"),
        details: t("project2Details"),
        category: t("project2Category", {
          defaultValue: "DESKTOP / REAL-TIME",
        }),
        year: 2026,
        tags: t("project2Tags").split(" • "),
      },
      {
        id: "3",
        title: t("project3Title"),
        description: t("project3Description"),
        details: t("project3Details"),
        category: t("project3Category", {
          defaultValue: "MOBILE / REACT NATIVE",
        }),
        year: 2026,
        tags: t("project3Tags").split(" • "),
      },
      {
        id: "4",
        title: t("project4Title", { defaultValue: "IGS" }),
        description: t("project4Description", {
          defaultValue:
            "Python automation system for data processing and intelligent workflow orchestration.",
        }),
        details: t("project4Details", {
          defaultValue:
            "IGS is a Python-based automation system designed for intelligent data processing and workflow orchestration. The project handles data extraction, transformation, and automated pipeline execution, streamlining repetitive tasks into efficient, reproducible workflows.",
        }),
        category: t("project4Category", {
          defaultValue: "PYTHON / AUTOMATION",
        }),
        year: 2026,
        tags: t("project4Tags", {
          defaultValue: "Python • Automation • Data",
        }).split(" • "),
      },
      {
        id: "5",
        title: t("project5Title", { defaultValue: "AVM OSGRIM" }),
        description: t("project5Description", {
          defaultValue:
            "Multi-tenant SaaS platform that digitizes the security operations daybook (main courante) for professional guarding companies — with a no-code WYSIWYG form builder, real-time SignalR notifications, validated reports and PDF export.",
        }),
        details: t("project5Details", {
          defaultValue:
            "AVM OSGRIM (codename OSGRIMXV) is a full-stack electronic security-operations logbook that replaces paper main courante daybooks with a real-time, auditable, multi-tenant web application. Built on ASP.NET Core 8 with Clean Architecture and a React 19 + TypeScript SPA, it lets administrators design no-code data-entry forms in a WYSIWYG editor that are sanitized and re-hydrated into live React controls at runtime. It covers interventions, incidents, people and equipment movements, personnel shifts, first-aid assessments and training, secured by fine-grained multi-tenant RBAC (Partitions / Zones / Elements) and Keycloak OIDC, with real-time SignalR notifications, validated reports with full history, and PDF export. Deployed on Azure via Terraform with GitLab CI/CD.",
        }),
        category: t("project5Category", { defaultValue: "FULL-STACK / SAAS" }),
        year: 2026,
        tags: t("project5Tags", {
          defaultValue:
            ".NET 8 • React 19 • SQL Server • Keycloak • SignalR • Azure",
        }).split(" • "),
      },
    ],
    [t],
  );

  return (
    <section id="work" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute left-[-150px] top-1/3 w-[500px] h-[500px] bg-[#ccff00]/4 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute right-[-100px] bottom-1/4 w-[400px] h-[400px] bg-[#00f0ff]/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-[#ccff00] font-mono text-sm tracking-widest uppercase mb-4 block">
            {t("sectionLabel")}
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white font-migumono">
            {t("title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ccff00]">
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="text-gray-300 mt-8 max-w-md text-lg font-light">
            {t("introDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="secondary">
              {t("viewGithub")}
            </Button>
          </Link>
        </div>
      </div>

      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={handleClose}
          viewLabel={t("viewCaseStudy")}
        />
      )}
    </section>
  );
}
