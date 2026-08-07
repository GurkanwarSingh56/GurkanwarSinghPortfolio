"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { getCmsProjectById } from "@/lib/cmsParser";
import { playClickSound, playTerminalKeySound } from "@/lib/audio";
import { GithubIcon } from "@/components/common/SocialIcons";
import {
  X,
  ExternalLink,
  Layers,
  Zap,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Volume2,
  Video,
  BookOpen,
  Sparkles
} from "lucide-react";

export function ProjectDetailModal() {
  const { selectedProject, setSelectedProject, soundEnabled } = useAppStore();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

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

  const cmsData = getCmsProjectById(selectedProject.id);

  const handleClose = () => {
    playClickSound(soundEnabled);
    setSelectedProject(null);
  };

  const handlePlayVoice = (transcript: string) => {
    playTerminalKeySound(soundEnabled);
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      if (isPlayingAudio) {
        setIsPlayingAudio(false);
        return;
      }
      setIsPlayingAudio(true);
      const utterance = new SpeechSynthesisUtterance(transcript);
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-zinc-900/95 border border-indigo-500/30 rounded-2xl shadow-2xl shadow-indigo-950/60 z-10 p-6 md:p-8 space-y-8 glass-panel font-sans">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono border ${selectedProject.badgeColor} mb-2`}>
              {selectedProject.category}
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {selectedProject.title}
            </h3>
            <p className="text-sm font-mono text-cyan-400 mt-1">
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

        {/* 1. Problem Statement & Solution */}
        {cmsData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>Problem Statement</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {cmsData.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Architectural Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {cmsData.solution}
              </p>
            </div>
          </div>
        )}

        {/* 2. Performance Metrics & Impact Grid */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Benchmark Performance Metrics</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {cmsData ? (
              cmsData.performanceMetrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 text-left space-y-1">
                  <div className="text-xs text-zinc-400 font-mono">{m.metric}</div>
                  <div className="text-2xl font-mono font-extrabold text-cyan-300">{m.value}</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">{m.impact}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">VS {m.benchmark}</div>
                </div>
              ))
            ) : (
              selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/10 text-center">
                  <div className="text-xl font-mono font-bold text-cyan-300">{m.value}</div>
                  <div className="text-xs text-zinc-400 font-medium mt-0.5">{m.label}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Tech Stack & Reason for Choosing Each Technology */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Tech Stack &amp; Architectural Rationale</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cmsData ? (
              cmsData.techStack.map((tech, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-100 font-mono">{tech.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30 uppercase">
                      {tech.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    <strong className="text-cyan-400">Why Chosen:</strong> {tech.reasonForChoice}
                  </p>
                </div>
              ))
            ) : (
              selectedProject.techStack.map((tech, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 text-xs font-mono text-zinc-300">
                  {tech}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 4. Distributed System Data Flow */}
        <div className="space-y-3 p-5 rounded-xl bg-zinc-950/50 border border-white/10">
          <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Distributed System Pipeline Flow</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-300">
            {selectedProject.systemFlow.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-white/10 text-cyan-300 font-semibold">
                  {step}
                </span>
                {idx < selectedProject.systemFlow.length - 1 && (
                  <span className="text-zinc-500 font-bold">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 5. Engineering Challenges & Resolutions */}
        {cmsData && cmsData.challenges.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Engineering Challenges &amp; Technical Resolutions</span>
            </div>

            <div className="space-y-3">
              {cmsData.challenges.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950/70 border border-amber-500/30 space-y-1.5">
                  <div className="font-bold text-xs text-amber-300 font-mono">{c.title}</div>
                  <p className="text-xs text-zinc-300"><strong className="text-zinc-400">Challenge:</strong> {c.detail}</p>
                  <p className="text-xs text-emerald-300"><strong className="text-emerald-400">Resolution:</strong> {c.resolution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Lessons Learned & Future Scope */}
        {cmsData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 space-y-2">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase">Lessons Learned</div>
              <ul className="space-y-1 text-xs text-zinc-300">
                {cmsData.lessonsLearned.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 space-y-2">
              <div className="text-xs font-mono text-violet-400 font-bold uppercase">Future Scope</div>
              <ul className="space-y-1 text-xs text-zinc-300">
                {cmsData.futureScope.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-violet-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 7. Timeline Phases */}
        {cmsData && (
          <div className="space-y-2">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Project Delivery Timeline</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              {cmsData.timeline.map((t, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
                  <div className="font-bold text-white">{t.phase}</div>
                  <div className="text-indigo-400 text-[11px]">{t.duration}</div>
                  <div className="text-[10px] text-zinc-400 truncate mt-1">Deliverables: {t.deliverables.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. Voice Narration Component */}
        {cmsData && cmsData.media.voiceNarration && (
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePlayVoice(cmsData.media.voiceNarration.transcript)}
                className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md shrink-0"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-bounce text-cyan-300" : ""}`} />
              </button>
              <div>
                <div className="font-bold text-zinc-100 flex items-center gap-2">
                  <span>AI Voice Narration ({cmsData.media.voiceNarration.durationSeconds}s)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300">
                    {cmsData.media.voiceNarration.narrator}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 italic line-clamp-1 mt-0.5">
                  &quot;{cmsData.media.voiceNarration.transcript}&quot;
                </p>
              </div>
            </div>

            <button
              onClick={() => handlePlayVoice(cmsData.media.voiceNarration.transcript)}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs shrink-0"
            >
              {isPlayingAudio ? "Pause Narration" : "Listen Narration"}
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <a
            href={selectedProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound(soundEnabled)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>

          <a
            href={selectedProject.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound(soundEnabled)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-xl shadow-indigo-500/30 transition-all"
          >
            <span>Launch Live Product Demo</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
}
