"use client";

import { useState, useEffect } from "react";
import { LIFE_MILESTONES } from "@/data/lifeTimelineData";
import { LifeMilestone } from "@/types/lifeTimeline";
import { playClickSound, playTerminalKeySound } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";
import {
  Sparkles,
  Code2,
  Rocket,
  Award,
  Cpu,
  Terminal,
  ArrowDown,
  X,
  Video,
  Award as CertIcon,
  ExternalLink,
  BookOpen,
  Image as ImageIcon,
  CheckCircle2,
  Layers
} from "lucide-react";

export function LifeTimeline() {
  const { soundEnabled } = useAppStore();
  const [selectedMilestone, setSelectedMilestone] = useState<LifeMilestone | null>(null);
  const [activeMediaTab, setActiveMediaTab] = useState<"highlights" | "videos" | "certificates" | "projects" | "memories">("highlights");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedMilestone) {
        setSelectedMilestone(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMilestone]);

  const handleOpenMilestone = (m: LifeMilestone) => {
    playClickSound(soundEnabled);
    setSelectedMilestone(m);
    setActiveMediaTab("highlights");
  };

  const handleCloseModal = () => {
    playClickSound(soundEnabled);
    setSelectedMilestone(null);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles": return Sparkles;
      case "Code2": return Code2;
      case "Rocket": return Rocket;
      case "Award": return Award;
      case "Cpu": return Cpu;
      default: return Terminal;
    }
  };

  return (
    <section id="life-timeline" className="py-20 md:py-28 relative overflow-hidden bg-zinc-950/90">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/10 via-indigo-600/10 to-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>INTERACTIVE LIFE TRAJECTORY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Animated <span className="text-gradient-cyan">Life Timeline</span>
          </h2>
          <p className="text-xs sm:text-base font-mono text-zinc-400 leading-relaxed">
            Click any milestone node to expand photos, videos, certificates, projects, and personal engineering memories.
          </p>
        </div>

        {/* Vertical Timeline Stream Node Chain */}
        <div className="relative max-w-3xl mx-auto space-y-8">
          
          {/* Vertical Glowing Line Stream */}
          <div className="absolute top-8 bottom-8 left-6 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 via-amber-400 to-emerald-400 opacity-60 pointer-events-none" />

          {LIFE_MILESTONES.map((m, idx) => {
            const Icon = getIcon(m.iconName);
            const isEven = idx % 2 === 0;

            return (
              <div key={m.year} className="relative space-y-4">
                
                {/* Node Row */}
                <div className={`flex flex-col sm:flex-row items-start sm:items-center ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"} gap-6 group`}>
                  
                  {/* Content Card */}
                  <div className="w-full sm:w-1/2 pl-14 sm:pl-0">
                    <div
                      onClick={() => handleOpenMilestone(m)}
                      className={`p-6 rounded-2xl glass-panel border transition-all duration-300 cursor-pointer space-y-3 shadow-xl hover:-translate-y-1 ${
                        isEven ? "sm:mr-6" : "sm:ml-6"
                      } ${m.accentColor}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-extrabold font-mono text-white tracking-tight">
                          {m.year}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold border border-white/20">
                          {m.badgeText}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {m.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-400 mt-0.5">{m.subtitle}</p>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed font-sans line-clamp-2">
                        {m.summary}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px] font-mono text-cyan-400 font-semibold">
                        <span>Expand Media &amp; Story ➔</span>
                        <span className="text-zinc-500 text-[10px]">
                          {m.certificates.length > 0 ? `${m.certificates.length} Certs` : ""} {m.projects.length > 0 ? `• ${m.projects.length} Projects` : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Central Node Circle */}
                  <div
                    onClick={() => handleOpenMilestone(m)}
                    className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-zinc-950 border-2 border-cyan-400/80 p-1 shadow-xl shadow-cyan-950/60 flex items-center justify-center cursor-pointer group-hover:scale-115 transition-transform z-10"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
                      <Icon className="w-5 h-5 animate-pulse" />
                    </div>
                  </div>

                  {/* Empty Spacer Column for Alignment */}
                  <div className="hidden sm:block sm:w-1/2" />
                </div>

                {/* Down Arrow Divider (Except last item) */}
                {idx < LIFE_MILESTONES.length - 1 && (
                  <div className="flex justify-start sm:justify-center pl-6 sm:pl-0 py-1">
                    <div className="p-1 rounded-full bg-zinc-900 border border-white/10 text-cyan-400 animate-bounce">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

      {/* Expandable Milestone Detail Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xl animate-in fade-in duration-200">
          
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900/95 border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 glass-panel font-sans">
            
            {/* Header Bar */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300">
                    {selectedMilestone.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-xs font-mono border border-cyan-500/40 uppercase">
                    {selectedMilestone.badgeText}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedMilestone.title} — {selectedMilestone.subtitle}
                </h3>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono bg-zinc-950/60 p-4 rounded-xl border border-white/10">
              {selectedMilestone.summary}
            </p>

            {/* Media Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 font-mono text-xs overflow-x-auto">
              <button
                onClick={() => { playTerminalKeySound(soundEnabled); setActiveMediaTab("highlights"); }}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeMediaTab === "highlights" ? "bg-cyan-600 text-white font-bold" : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Highlights</span>
              </button>

              {selectedMilestone.videos.length > 0 && (
                <button
                  onClick={() => { playTerminalKeySound(soundEnabled); setActiveMediaTab("videos"); }}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeMediaTab === "videos" ? "bg-indigo-600 text-white font-bold" : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Videos ({selectedMilestone.videos.length})</span>
                </button>
              )}

              {selectedMilestone.certificates.length > 0 && (
                <button
                  onClick={() => { playTerminalKeySound(soundEnabled); setActiveMediaTab("certificates"); }}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeMediaTab === "certificates" ? "bg-amber-600 text-white font-bold" : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <CertIcon className="w-3.5 h-3.5" />
                  <span>Certificates ({selectedMilestone.certificates.length})</span>
                </button>
              )}

              {selectedMilestone.projects.length > 0 && (
                <button
                  onClick={() => { playTerminalKeySound(soundEnabled); setActiveMediaTab("projects"); }}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeMediaTab === "projects" ? "bg-violet-600 text-white font-bold" : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Projects ({selectedMilestone.projects.length})</span>
                </button>
              )}

              {selectedMilestone.memories.length > 0 && (
                <button
                  onClick={() => { playTerminalKeySound(soundEnabled); setActiveMediaTab("memories"); }}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeMediaTab === "memories" ? "bg-emerald-600 text-white font-bold" : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Memories ({selectedMilestone.memories.length})</span>
                </button>
              )}
            </div>

            {/* Tab Content Display */}
            <div className="space-y-4 font-mono text-xs">
              
              {/* Highlights Tab */}
              {activeMediaTab === "highlights" && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyan-400 font-bold uppercase">Key Milestone Accomplishments</div>
                  <ul className="space-y-2 text-zinc-200">
                    {selectedMilestone.keyHighlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-zinc-950/60 border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Videos Tab */}
              {activeMediaTab === "videos" && (
                <div className="space-y-3">
                  {selectedMilestone.videos.map((vid, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-950/80 border border-indigo-500/30 space-y-2">
                      <div className="font-bold text-white flex items-center justify-between">
                        <span>{vid.title}</span>
                        <span className="text-[10px] text-zinc-500">{vid.duration}</span>
                      </div>
                      <div className="p-8 rounded-lg bg-zinc-900 border border-white/10 text-center text-zinc-400 flex flex-col items-center justify-center gap-2">
                        <Video className="w-8 h-8 text-indigo-400 animate-pulse" />
                        <span>Interactive Demo Video Stream ({vid.title})</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Certificates Tab */}
              {activeMediaTab === "certificates" && (
                <div className="space-y-3">
                  {selectedMilestone.certificates.map((cert, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-950/80 border border-amber-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-amber-300 text-sm">{cert.title}</div>
                        <span className="text-[10px] text-zinc-500">{cert.issueDate}</span>
                      </div>
                      <div className="text-zinc-400 text-xs">Issuer: <strong className="text-white">{cert.issuer}</strong></div>
                      {cert.credentialId && (
                        <div className="text-[10px] text-zinc-500">ID: {cert.credentialId}</div>
                      )}
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:underline pt-1 text-xs"
                        >
                          <span>Verify Credential Certificate</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Projects Tab */}
              {activeMediaTab === "projects" && (
                <div className="space-y-3">
                  {selectedMilestone.projects.map((proj, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-950/80 border border-violet-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-violet-300 text-sm">{proj.name}</div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-500/30">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-zinc-300 font-sans">{proj.description}</p>
                      <a
                        href={proj.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:underline text-xs pt-1"
                      >
                        <span>Open Project Repository</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* Memories Tab */}
              {activeMediaTab === "memories" && (
                <div className="space-y-3">
                  {selectedMilestone.memories.map((mem, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-950/80 border border-emerald-500/30 space-y-2">
                      <div className="font-bold text-emerald-300 text-sm">{mem.headline}</div>
                      <p className="text-zinc-300 font-sans italic">&quot;{mem.reflection}&quot;</p>
                      <div className="text-[11px] text-cyan-400"><strong className="text-zinc-400">Impact:</strong> {mem.impact}</div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
