"use client";

import { useState } from "react";
import { FEATURED_TECHNOLOGIES, SKILL_GROUPS } from "@/data/skillVisualizerData";
import { TechnologySpec } from "@/types/skillVisualizer";
import { playClickSound, playTerminalKeySound } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";
import {
  Sparkles,
  Radio,
  Share2,
  GitBranch,
  X,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
  Code2,
  Globe,
  Box,
  Layout,
  Bot,
  Database
} from "lucide-react";

export function PremiumSkillVisualizer() {
  const { soundEnabled } = useAppStore();
  const [activeMode, setActiveMode] = useState<"constellation" | "radar" | "tree">("constellation");
  const [selectedTech, setSelectedTech] = useState<TechnologySpec | null>(null);
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  const handleSelectTech = (tech: TechnologySpec) => {
    playClickSound(soundEnabled);
    setSelectedTech(tech);
  };

  const handleCloseModal = () => {
    playClickSound(soundEnabled);
    setSelectedTech(null);
  };

  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe": return Globe;
      case "Code2": return Code2;
      case "Box": return Box;
      case "Layout": return Layout;
      case "Terminal": return Terminal;
      case "Cpu": return Cpu;
      case "Bot": return Bot;
      case "Database": return Database;
      default: return Sparkles;
    }
  };

  return (
    <section id="tech-skills" className="py-20 md:py-28 relative overflow-hidden bg-zinc-950/90 select-none">
      
      {/* Ambient Grid Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-amber-500/5 blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/30 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>NON-LINEAR TECH MATRIX • ZERO PROGRESS BARS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Skill <span className="text-gradient-cyan">Constellation &amp; Radar</span>
            </h2>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 font-mono text-xs overflow-x-auto pb-1">
            <button
              onClick={() => { playTerminalKeySound(soundEnabled); setActiveMode("constellation"); }}
              className={`px-3.5 py-2 rounded-xl border font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeMode === "constellation"
                  ? "bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-zinc-900 border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>3D Constellation Mesh</span>
            </button>

            <button
              onClick={() => { playTerminalKeySound(soundEnabled); setActiveMode("radar"); }}
              className={`px-3.5 py-2 rounded-xl border font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeMode === "radar"
                  ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/30"
                  : "bg-zinc-900 border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Radial Radar Scan</span>
            </button>

            <button
              onClick={() => { playTerminalKeySound(soundEnabled); setActiveMode("tree"); }}
              className={`px-3.5 py-2 rounded-xl border font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeMode === "tree"
                  ? "bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-500/30"
                  : "bg-zinc-900 border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>Architecture Skill Tree</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Canvas Views */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 min-h-[520px] relative flex items-center justify-center shadow-2xl overflow-hidden">
          
          {/* MODE 1: 3D Constellation Mesh */}
          {activeMode === "constellation" && (
            <div className="w-full space-y-8 animate-in fade-in duration-300">
              <div className="text-center font-mono text-xs text-zinc-400 space-y-1">
                <p className="text-cyan-300 font-bold">Interactive Technology Constellation Nodes</p>
                <p>Click any glowing node to inspect architecture rationale, production use cases, and key features.</p>
              </div>

              {/* Constellation Category Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SKILL_GROUPS.map((group) => (
                  <div key={group.categoryKey} className={`p-6 rounded-2xl glass-panel border space-y-4 ${group.accentColor}`}>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="font-mono text-sm font-bold tracking-wider">{group.title}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-400">
                        {group.technologies.length} Core Nodes
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {group.technologies.map((tech) => {
                        const Icon = getTechIcon(tech.iconName);
                        const isHovered = hoveredTechId === tech.id;

                        return (
                          <div
                            key={tech.id}
                            onClick={() => handleSelectTech(tech)}
                            onMouseEnter={() => setHoveredTechId(tech.id)}
                            onMouseLeave={() => setHoveredTechId(null)}
                            className={`p-3.5 rounded-xl bg-zinc-950/80 border transition-all duration-200 cursor-pointer space-y-2 group shadow-lg ${
                              isHovered
                                ? "border-cyan-400 scale-105 shadow-cyan-500/30"
                                : "border-white/10 hover:border-white/30"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-cyan-300 group-hover:scale-110 transition-transform">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-xs text-white group-hover:text-cyan-300 font-mono">
                                  {tech.name}
                                </span>
                              </div>

                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                                {tech.masteryTier}
                              </span>
                            </div>

                            <p className="text-[11px] text-zinc-400 font-sans line-clamp-1">{tech.tagline}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE 2: Radial Radar Scan */}
          {activeMode === "radar" && (
            <div className="w-full py-8 space-y-8 animate-in fade-in duration-300 text-center">
              <div className="font-mono text-xs text-zinc-400 space-y-1">
                <p className="text-purple-300 font-bold">Radial Competency Target Radar</p>
                <p>360° scanning orbital rings categorizing architectural mastery tiers.</p>
              </div>

              {/* Radar Orbital Scanner Visualizer */}
              <div className="relative w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] mx-auto flex items-center justify-center">
                {/* Concentric Radar Rings */}
                <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-pulse" />
                <div className="absolute inset-12 sm:inset-16 rounded-full border border-indigo-500/30" />
                <div className="absolute inset-24 sm:inset-32 rounded-full border border-cyan-500/30" />

                {/* Radar Rotating Beam Sweep */}
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent animate-spin pointer-events-none"
                  style={{ animationDuration: "8s" }}
                />

                {/* Central Core */}
                <div className="w-20 h-20 rounded-full bg-zinc-950 border-2 border-purple-400 flex flex-col items-center justify-center text-center shadow-xl shadow-purple-950/60 z-10">
                  <Radio className="w-6 h-6 text-purple-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-purple-300 font-bold mt-1">RADAR CORE</span>
                </div>

                {/* Orbital Technology Nodes Positioned in Orbit */}
                {FEATURED_TECHNOLOGIES.slice(0, 8).map((tech, idx) => {
                  const angleRad = (tech.orbitAngleDegrees * Math.PI) / 180;
                  const radius = tech.orbitalRadius * 0.9;
                  const x = Math.cos(angleRad) * radius;
                  const y = Math.sin(angleRad) * radius;
                  const Icon = getTechIcon(tech.iconName);

                  return (
                    <div
                      key={tech.id}
                      onClick={() => handleSelectTech(tech)}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      className="absolute p-2.5 rounded-xl bg-zinc-950/90 border border-purple-500/40 hover:border-cyan-400 text-white font-mono text-[10px] cursor-pointer flex items-center gap-1.5 shadow-lg shadow-purple-950/40 hover:scale-115 transition-all z-20"
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-bold whitespace-nowrap">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODE 3: Architecture Skill Tree */}
          {activeMode === "tree" && (
            <div className="w-full space-y-8 animate-in fade-in duration-300">
              <div className="text-center font-mono text-xs text-zinc-400 space-y-1">
                <p className="text-amber-300 font-bold">Branching Architecture Skill Tree</p>
                <p>From core fundamental building blocks to advanced autonomous AI multi-agent graphs.</p>
              </div>

              {/* Branching Flow Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                
                {/* Branch 1: Fundamentals */}
                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-amber-500/30 space-y-3">
                  <div className="font-bold text-amber-400 border-b border-white/10 pb-2 uppercase text-xs">
                    01. Foundations &amp; Core
                  </div>
                  {FEATURED_TECHNOLOGIES.filter((t) => t.category === "frontend").map((tech) => (
                    <div
                      key={tech.id}
                      onClick={() => handleSelectTech(tech)}
                      className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-amber-400 text-zinc-200 hover:text-white cursor-pointer transition-colors space-y-1"
                    >
                      <div className="font-bold text-white text-xs">{tech.name}</div>
                      <div className="text-[10px] text-zinc-400 line-clamp-1">{tech.tagline}</div>
                    </div>
                  ))}
                </div>

                {/* Branch 2: Distributed Backend */}
                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-purple-500/30 space-y-3">
                  <div className="font-bold text-purple-400 border-b border-white/10 pb-2 uppercase text-xs">
                    02. Distributed Services &amp; DBs
                  </div>
                  {FEATURED_TECHNOLOGIES.filter((t) => t.category === "backend" || t.category === "database").map((tech) => (
                    <div
                      key={tech.id}
                      onClick={() => handleSelectTech(tech)}
                      className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-purple-400 text-zinc-200 hover:text-white cursor-pointer transition-colors space-y-1"
                    >
                      <div className="font-bold text-white text-xs">{tech.name}</div>
                      <div className="text-[10px] text-zinc-400 line-clamp-1">{tech.tagline}</div>
                    </div>
                  ))}
                </div>

                {/* Branch 3: Autonomous AI */}
                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-cyan-500/30 space-y-3">
                  <div className="font-bold text-cyan-400 border-b border-white/10 pb-2 uppercase text-xs">
                    03. Autonomous AI &amp; Vector RAG
                  </div>
                  {FEATURED_TECHNOLOGIES.filter((t) => t.category === "ai_ml").map((tech) => (
                    <div
                      key={tech.id}
                      onClick={() => handleSelectTech(tech)}
                      className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-cyan-400 text-zinc-200 hover:text-white cursor-pointer transition-colors space-y-1"
                    >
                      <div className="font-bold text-white text-xs">{tech.name}</div>
                      <div className="text-[10px] text-zinc-400 line-clamp-1">{tech.tagline}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

      {/* Technology Deep-Dive Detail Drawer */}
      {selectedTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xl animate-in fade-in duration-200 select-text">
          
          <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-zinc-900/95 border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 glass-panel font-sans">
            
            {/* Header Bar */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 uppercase font-bold">
                    {selectedTech.masteryTier} • {selectedTech.yearsOfExperience}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 uppercase">
                    Category: {selectedTech.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedTech.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">{selectedTech.tagline}</p>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1. What is this technology? */}
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 space-y-1.5">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Technology Overview &amp; Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {selectedTech.explanation}
              </p>
            </div>

            {/* 2. Why Gurkanwar Chose it */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
              <div className="text-xs font-mono text-indigo-400 font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Architectural Rationale &amp; Why Chosen</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono">
                &quot;{selectedTech.whyChosen}&quot;
              </p>
            </div>

            {/* 3. Production Use Cases */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase">Production SaaS Use Cases</div>
              <ul className="space-y-2 font-mono text-xs">
                {selectedTech.productionUseCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-zinc-950/60 border border-white/5 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Key Architectural Features */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-amber-400 font-bold uppercase">Key Engineering Capabilities</div>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {selectedTech.keyFeatures.map((feat, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-zinc-950 text-cyan-300 border border-white/10 font-bold">
                    ⚡ {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Close Button */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md"
              >
                Close Deep-Dive View
              </button>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
