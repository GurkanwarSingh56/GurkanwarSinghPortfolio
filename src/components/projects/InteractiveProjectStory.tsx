"use client";

import { useState } from "react";
import { NOVA_AGENT_STORY } from "@/data/projectStoryData";
import { playClickSound, playTerminalKeySound } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";
import {
  AlertTriangle,
  Search,
  Calendar,
  Layout,
  Layers,
  Code2,
  ShieldCheck,
  Zap,
  TrendingUp,
  BookOpen,
  Sparkles,
  Volume2,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check
} from "lucide-react";

export function InteractiveProjectStory() {
  const { soundEnabled } = useAppStore();
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const story = NOVA_AGENT_STORY;

  const chapters = [
    { title: "1. Problem", icon: AlertTriangle },
    { title: "2. Research", icon: Search },
    { title: "3. Planning", icon: Calendar },
    { title: "4. Wireframes", icon: Layout },
    { title: "5. Architecture", icon: Layers },
    { title: "6. Code", icon: Code2 },
    { title: "7. Challenges", icon: ShieldCheck },
    { title: "8. Optimizations", icon: Zap },
    { title: "9. Results", icon: TrendingUp },
    { title: "10. Lessons", icon: BookOpen },
    { title: "11. Future", icon: Sparkles },
  ];

  const handleSelectChapter = (idx: number) => {
    playClickSound(soundEnabled);
    setActiveChapterIdx(idx);
  };

  const handleCopyCode = (code: string, idx: number) => {
    playTerminalKeySound(soundEnabled);
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
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
    <section id="interactive-story" className="py-20 md:py-28 relative overflow-hidden bg-zinc-950/80">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-cyan-500/10 via-indigo-600/10 to-violet-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>INTERACTIVE CASE STUDY NARRATIVE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Story of <span className="text-gradient-cyan">{story.title}</span>
          </h2>
          <p className="text-xs sm:text-base font-mono text-zinc-400 leading-relaxed">
            {story.tagline}
          </p>

          {/* Voice Narration Bar */}
          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 text-left">
              <button
                onClick={() => handlePlayVoice(story.voiceTranscript)}
                className="p-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-lg shadow-cyan-500/30 shrink-0"
              >
                <Volume2 className={`w-5 h-5 ${isPlayingAudio ? "animate-bounce" : ""}`} />
              </button>
              <div>
                <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <span>Listen Case Study Story ({story.narrationDurationSeconds}s)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    Voice Narration
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-mono line-clamp-1 italic mt-0.5">
                  &quot;{story.voiceTranscript}&quot;
                </p>
              </div>
            </div>

            <a
              href={story.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-cyan-300 font-mono border border-white/10 flex items-center gap-1.5 shrink-0"
            >
              <span>GitHub Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 11-Chapter Stepper Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 border-b border-white/10 no-scrollbar">
          {chapters.map((ch, idx) => {
            const Icon = ch.icon;
            const isActive = activeChapterIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectChapter(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 scale-105"
                    : "bg-zinc-900/90 text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-zinc-500"}`} />
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Active Chapter View Container */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 space-y-8 shadow-2xl">
          
          {/* Chapter 1: The Problem */}
          {activeChapterIdx === 0 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch1_problem.title}</h3>
                  <p className="text-xs font-mono text-rose-300">{story.ch1_problem.subtitle}</p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans">
                {story.ch1_problem.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                {story.ch1_problem.painPoints.map((pain, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                    <div className="text-rose-400 font-bold">PAIN POINT 0{idx + 1}</div>
                    <p className="text-zinc-300 leading-relaxed">{pain}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 text-xs font-mono text-zinc-400 space-y-1">
                <strong className="text-cyan-400">User Impact:</strong> {story.ch1_problem.impactOnUsers}
              </div>
            </div>
          )}

          {/* Chapter 2: Research & Market Audit */}
          {activeChapterIdx === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Search className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch2_research.title}</h3>
                  <p className="text-xs font-mono text-cyan-300">{story.ch2_research.subtitle}</p>
                </div>
              </div>

              <p className="text-sm text-zinc-200 leading-relaxed font-sans">{story.ch2_research.summary}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-cyan-500/30 space-y-2">
                  <div className="text-cyan-400 font-bold uppercase">Key Research Findings</div>
                  <ul className="space-y-2 text-zinc-300">
                    {story.ch2_research.keyFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-indigo-500/30 space-y-2">
                  <div className="text-indigo-400 font-bold uppercase">Competitor Architecture Gaps</div>
                  <ul className="space-y-2 text-zinc-300">
                    {story.ch2_research.competitorGaps.map((gap, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 3: Strategic Planning */}
          {activeChapterIdx === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Calendar className="w-6 h-6 text-indigo-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch3_planning.title}</h3>
                  <p className="text-xs font-mono text-indigo-300">{story.ch3_planning.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                {story.ch3_planning.sprintMilestones.map((sprint, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-2">
                    <div className="text-indigo-400 font-bold">{sprint.phase}</div>
                    <div className="text-white font-semibold">{sprint.focus}</div>
                    <div className="text-zinc-500 text-[11px]">{sprint.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 4: Wireframes & Visual Prototypes */}
          {activeChapterIdx === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Layout className="w-6 h-6 text-violet-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch4_wireframes.title}</h3>
                  <p className="text-xs font-mono text-violet-300">{story.ch4_wireframes.subtitle}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-3 font-mono text-xs">
                <div><strong className="text-violet-400">Layout Concept:</strong> {story.ch4_wireframes.layoutConcept}</div>
                <div><strong className="text-cyan-400">Prototype Notes:</strong> {story.ch4_wireframes.prototypeNotes}</div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {story.ch4_wireframes.designTokensUsed.map((token, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-white/10">
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chapter 5: System Architecture */}
          {activeChapterIdx === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Layers className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch5_architecture.title}</h3>
                  <p className="text-xs font-mono text-cyan-300">{story.ch5_architecture.subtitle}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 text-xs font-mono text-zinc-300">
                <strong className="text-cyan-400">Architecture Overview:</strong> {story.ch5_architecture.overview}
              </div>

              {/* Data Flow Pipeline Sequence */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">Sequential Data Flow Pipeline</div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  {story.ch5_architecture.dataFlowSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-cyan-500/30 text-cyan-300 font-bold">
                        {idx + 1}. {step}
                      </span>
                      {idx < story.ch5_architecture.dataFlowSteps.length - 1 && (
                        <span className="text-zinc-500 font-bold">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Node Latency Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                {story.ch5_architecture.nodes.map((node) => (
                  <div key={node.id} className="p-4 rounded-2xl bg-zinc-950/70 border border-cyan-500/40 space-y-1 shadow-lg shadow-cyan-950/40 hover:scale-105 transition-transform">
                    <div className="font-bold text-white text-sm">{node.name}</div>
                    <div className="text-zinc-400 text-[11px]">{node.role}</div>
                    <div className="text-cyan-400 font-extrabold text-sm pt-2">Latency: {node.latency}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 6: Core Implementation & Code Snippets */}
          {activeChapterIdx === 5 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Code2 className="w-6 h-6 text-indigo-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch6_implementation.title}</h3>
                  <p className="text-xs font-mono text-indigo-300">{story.ch6_implementation.subtitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                {story.ch6_implementation.codeSnippets.map((snippet, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 font-mono text-xs">
                    <div className="px-4 py-2.5 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
                      <span className="text-cyan-300 font-bold">{snippet.fileName}</span>
                      <button
                        onClick={() => handleCopyCode(snippet.code, idx)}
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center gap-1 text-[11px]"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIndex === idx ? "Copied" : "Copy Code"}</span>
                      </button>
                    </div>
                    <pre className="p-4 text-zinc-200 overflow-x-auto text-[11px] leading-relaxed">
                      <code>{snippet.code}</code>
                    </pre>
                    <div className="px-4 py-2 bg-zinc-900/60 border-t border-white/5 text-[11px] text-zinc-400 italic">
                      {snippet.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 7: Technical Challenges */}
          {activeChapterIdx === 6 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch7_challenges.title}</h3>
                  <p className="text-xs font-mono text-amber-300">{story.ch7_challenges.subtitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                {story.ch7_challenges.challengesList.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-zinc-950/60 border border-amber-500/30 space-y-2 font-mono text-xs">
                    <div className="text-amber-300 font-bold text-sm">{item.title}</div>
                    <div><strong className="text-rose-400">Symptom:</strong> {item.symptom}</div>
                    <div><strong className="text-zinc-400">Root Cause:</strong> {item.rootCause}</div>
                    <div><strong className="text-emerald-400">Resolution:</strong> {item.resolution}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 8: Optimizations */}
          {activeChapterIdx === 7 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Zap className="w-6 h-6 text-emerald-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch8_optimizations.title}</h3>
                  <p className="text-xs font-mono text-emerald-300">{story.ch8_optimizations.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                {story.ch8_optimizations.optimizationsList.map((opt, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-zinc-950/60 border border-emerald-500/30 space-y-3 shadow-lg">
                    <div className="text-white font-bold text-sm">{opt.technique}</div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-rose-400">
                        <span>Before:</span>
                        <span>{opt.beforeValue}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-emerald-400 font-bold">
                        <span>After:</span>
                        <span>{opt.afterValue}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-extrabold text-center text-xs">
                      ⚡ {opt.improvementPercentage}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 9: Results */}
          {activeChapterIdx === 8 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch9_results.title}</h3>
                  <p className="text-xs font-mono text-cyan-300">{story.ch9_results.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                {story.ch9_results.resultsList.map((res, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-zinc-950/60 border border-cyan-500/40 text-left space-y-2">
                    <div className="text-zinc-400 text-[11px]">{res.metricName}</div>
                    <div className="text-3xl font-extrabold text-cyan-300">{res.valueAchieved}</div>
                    <div className="text-emerald-400 font-bold">{res.businessImpact}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 10: Lessons */}
          {activeChapterIdx === 9 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch10_lessons.title}</h3>
                  <p className="text-xs font-mono text-indigo-300">{story.ch10_lessons.subtitle}</p>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {story.ch10_lessons.lessons.map((lesson, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-200">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 11: Future Improvements */}
          {activeChapterIdx === 10 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{story.ch11_future.title}</h3>
                  <p className="text-xs font-mono text-amber-300">{story.ch11_future.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-amber-500/30 space-y-2">
                  <div className="text-amber-400 font-bold">Planned Roadmap Items</div>
                  <ul className="space-y-2 text-zinc-300">
                    {story.ch11_future.roadmapItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-cyan-500/30 space-y-2">
                  <div className="text-cyan-400 font-bold">Upcoming Technical Milestones</div>
                  <ul className="space-y-2 text-zinc-300">
                    {story.ch11_future.nextMilestones.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
