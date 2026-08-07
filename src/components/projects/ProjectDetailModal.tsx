"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { playClickSound } from "@/lib/audio";
import { GithubIcon } from "@/components/common/SocialIcons";
import { X, ExternalLink, Layers, Zap, CheckCircle2, ShieldCheck } from "lucide-react";

export function ProjectDetailModal() {
  const { selectedProject, setSelectedProject, soundEnabled } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, setSelectedProject]);

  if (!selectedProject) return null;

  const handleClose = () => {
    playClickSound(soundEnabled);
    setSelectedProject(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900/95 border border-indigo-500/30 rounded-2xl shadow-2xl shadow-indigo-950/60 z-10 p-6 md:p-8 space-y-6 glass-panel">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono border ${selectedProject.badgeColor} mb-2`}>
              {selectedProject.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {selectedProject.title}
            </h3>
            <p className="text-sm font-medium text-zinc-400 mt-1">
              {selectedProject.subtitle}
            </p>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close Project Detail Modal"
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3">
          {selectedProject.metrics.map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/10 text-center">
              <div className="text-lg sm:text-xl font-mono font-bold text-cyan-300">{m.value}</div>
              <div className="text-xs text-zinc-400 font-medium mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Description & Overview */}
        <div className="space-y-3">
          <h4 className="text-sm font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Product &amp; Architecture Overview</span>
          </h4>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {selectedProject.longDescription}
          </p>
        </div>

        {/* System Data Flow Pipeline */}
        <div className="space-y-3 p-4 rounded-xl bg-zinc-950/50 border border-white/10">
          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Distributed System Data Flow</span>
          </h4>
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs text-zinc-300">
            {selectedProject.systemFlow.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-zinc-800 border border-white/10 text-cyan-300">
                  {step}
                </span>
                {idx < selectedProject.systemFlow.length - 1 && (
                  <span className="text-zinc-500 font-bold">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Engineering Highlights */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Key Architectural Features</h4>
          <ul className="space-y-2">
            {selectedProject.architectureHighlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Engineering Challenge Solved */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1">
          <div className="text-xs font-mono text-indigo-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Key Challenge Solved</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300">
            {selectedProject.challengesSolved}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-zinc-400">Tech Stack &amp; Libraries</div>
          <div className="flex flex-wrap gap-2">
            {selectedProject.techStack.map((tech, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs font-mono border border-white/5">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <a
            href={selectedProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound(soundEnabled)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Repository Code</span>
          </a>

          <a
            href={selectedProject.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound(soundEnabled)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/30 transition-all"
          >
            <span>Launch Live Product Demo</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
}
