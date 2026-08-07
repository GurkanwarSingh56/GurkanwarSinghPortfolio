"use client";

import { useState } from "react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { useAppStore } from "@/store/useAppStore";
import { playClickSound } from "@/lib/audio";
import { ArchitecturePlayground } from "./ArchitecturePlayground";
import { Layers, Sparkles, Layout, Server, Cpu, Cloud, Database } from "lucide-react";

export function TechMatrixSection() {
  const { soundEnabled } = useAppStore();
  const [activeTabCategory, setActiveTabCategory] = useState<string>("Frontend & UI/UX");

  const activeCategoryData = SKILL_CATEGORIES.find((cat) => cat.category === activeTabCategory) || SKILL_CATEGORIES[0];

  const getIcon = (catName: string) => {
    switch (catName) {
      case "Frontend & UI/UX":
        return <Layout className="w-4 h-4 text-cyan-400" />;
      case "Backend & Microservices":
        return <Server className="w-4 h-4 text-indigo-400" />;
      case "AI / Machine Learning":
        return <Cpu className="w-4 h-4 text-violet-400" />;
      case "Cloud & Infrastructure":
        return <Cloud className="w-4 h-4 text-emerald-400" />;
      case "Databases & Storage":
        return <Database className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-indigo-400" />;
    }
  };

  const handleTabChange = (catName: string) => {
    playClickSound(soundEnabled);
    setActiveTabCategory(catName);
  };

  return (
    <section id="tech-matrix" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Architectural Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical <span className="text-gradient-cyan">Matrix</span> &amp; Stack
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            Deep technical expertise across modern web engineering, distributed systems, vector AI models, and cloud automation.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeTabCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => handleTabChange(cat.category)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isActive
                    ? "bg-zinc-800 text-white border border-indigo-500/50 shadow-lg shadow-indigo-950/50 font-bold"
                    : "bg-zinc-900/60 hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-white/5"
                }`}
              >
                {getIcon(cat.category)}
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Description & Skill Grid */}
        <div className="p-6 md:p-8 rounded-2xl glass-panel border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {getIcon(activeCategoryData.category)}
              <span>{activeCategoryData.category}</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {activeCategoryData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategoryData.skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 hover:border-indigo-500/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-zinc-100 flex items-center gap-1.5">
                    {skill.name}
                    {skill.isPrimary && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400" title="Core Primary Competency" />
                    )}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">{skill.level}%</span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Exp: {skill.experience}</span>
                  <div className="flex flex-wrap gap-1">
                    {skill.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Architecture Playground Component */}
        <ArchitecturePlayground />

      </div>
    </section>
  );
}
