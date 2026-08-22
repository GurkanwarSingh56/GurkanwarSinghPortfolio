"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { playClickSound, playSuccessSound } from "@/lib/audio";
import { TELEMETRY_INITIAL, SAAS_PROJECTS } from "@/data/portfolioData";
import { GithubIcon } from "@/components/common/SocialIcons";
import confetti from "canvas-confetti";
import {
  Cpu,
  Activity,
  CloudSun,
  Clock,
  ShieldCheck,
  Terminal,
  Code2,
  Sparkles,
  Zap,
  Radio,
  ExternalLink
} from "lucide-react";

export function JarvisMissionControl() {
  const { soundEnabled, toggleTerminal, toggleContactModal, setSelectedProject } = useAppStore();
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

  // Live ticking clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDateStr(now.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const latestProject = SAAS_PROJECTS[0];

  const handleProtocolClick = (protoName: string, action: () => void) => {
    playClickSound(soundEnabled);
    setActiveProtocol(protoName);
    action();
    setTimeout(() => setActiveProtocol(null), 1500);
  };

  const handleExecutiveHire = () => {
    playSuccessSound(soundEnabled);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    toggleContactModal();
  };

  return (
    <section id="jarvis-mission-control" className="py-16 md:py-24 relative overflow-hidden">
      
      {/* Ambient Cyber Light Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/10 via-indigo-600/10 to-amber-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/30 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>JARVIS SYSTEM OVERRIDE • PROTOCOL MARK-42</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              JARVIS <span className="text-gradient-cyan">Mission Control</span>
            </h2>
          </div>

          {/* Top HUD Clock & Weather Diagnostics */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            {/* Clock Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-950/50">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{timeStr || "21:37:23"} IST</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-400">{dateStr || "08 AUG 2026"}</span>
            </div>

            {/* Weather Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-amber-500/40 text-amber-300">
              <CloudSun className="w-4 h-4 text-amber-400" />
              <span>Mumbai / Remote • 28°C</span>
            </div>

            {/* System Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>SYS HEALTH: 99.99% OPTIMAL</span>
            </div>
          </div>
        </div>

        {/* Core Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (8 Columns): AI Core & Live Command Center */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* JARVIS AI Arc Reactor Core Card */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-500/40 relative overflow-hidden shadow-2xl shadow-cyan-950/40">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                
                {/* Arc Reactor Core Graphic */}
                <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                  {/* Outer Orbit Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-spin" style={{ animationDuration: "20s" }} />
                  {/* Middle Ring */}
                  <div className="absolute inset-2 rounded-full border border-indigo-500/80 animate-pulse" />
                  {/* Glowing Core */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-400 p-1 shadow-2xl shadow-cyan-400/60 flex items-center justify-center animate-cyber-pulse">
                    <div className="w-full h-full bg-zinc-950 rounded-full flex flex-col items-center justify-center">
                      <Cpu className="w-8 h-8 text-cyan-300" />
                      <span className="text-[9px] font-mono text-cyan-400 mt-0.5">CORE AI</span>
                    </div>
                  </div>
                </div>

                {/* AI Core Voice & Diagnostics */}
                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-500/40 uppercase">
                      Neural Engine v4.8
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      JARVIS Active
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    &quot;Good evening, Boss. All microservice telemetry channels are operating at peak efficiency.&quot;
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                    Gurkanwar Singh&apos;s architecture stack is 100% online. Ready to deploy autonomous agent graphs or initiate priority technical interviews.
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 font-mono text-xs">
                    <button
                      onClick={() => handleProtocolClick("HIRE", handleExecutiveHire)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Initiate Executive Hire Protocol</span>
                    </button>

                    <button
                      onClick={() => handleProtocolClick("CLI", toggleTerminal)}
                      className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                    >
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span>CLI Shell</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Live Command Center Matrix */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>JARVIS Command Center Protocols</span>
                </h4>
                <span className="text-[11px] font-mono text-zinc-500">5 Active Directives</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <button
                  onClick={() => handleProtocolClick("P1", () => setSelectedProject(latestProject))}
                  className="p-3.5 rounded-xl bg-zinc-950/60 hover:bg-indigo-950/40 border border-white/10 hover:border-cyan-400/50 text-left transition-all group"
                >
                  <div className="text-[10px] font-mono text-cyan-400 font-bold mb-1">PROTO-01</div>
                  <div className="text-xs font-bold text-zinc-100 group-hover:text-cyan-300">Inspect Latest Project</div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1">Multi-Agent Graph</div>
                </button>

                <button
                  onClick={() => handleProtocolClick("P2", () => {
                    const el = document.getElementById("telemetry");
                    el?.scrollIntoView({ behavior: "smooth" });
                  })}
                  className="p-3.5 rounded-xl bg-zinc-950/60 hover:bg-indigo-950/40 border border-white/10 hover:border-indigo-400/50 text-left transition-all group"
                >
                  <div className="text-[10px] font-mono text-indigo-400 font-bold mb-1">PROTO-02</div>
                  <div className="text-xs font-bold text-zinc-100 group-hover:text-indigo-300">Run Telemetry Audit</div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1">GitHub &amp; LeetCode</div>
                </button>

                <button
                  onClick={() => handleProtocolClick("P3", () => {
                    const el = document.getElementById("tech-matrix");
                    el?.scrollIntoView({ behavior: "smooth" });
                  })}
                  className="p-3.5 rounded-xl bg-zinc-950/60 hover:bg-indigo-950/40 border border-white/10 hover:border-violet-400/50 text-left transition-all group"
                >
                  <div className="text-[10px] font-mono text-violet-400 font-bold mb-1">PROTO-03</div>
                  <div className="text-xs font-bold text-zinc-100 group-hover:text-violet-300">Pipeline Simulator</div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1">End-to-End Test</div>
                </button>
              </div>

              {activeProtocol && (
                <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center justify-between animate-pulse">
                  <span>JARVIS Executing Directive [{activeProtocol}]...</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            {/* Latest Mission Project Spotlight Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-mono text-zinc-200 uppercase">Latest SaaS Mission Deployment</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                  {latestProject.category}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-1">
                  <h5 className="text-xl font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer" onClick={() => setSelectedProject(latestProject)}>
                    {latestProject.title}
                  </h5>
                  <p className="text-xs font-mono text-zinc-400">{latestProject.subtitle}</p>
                  <p className="text-xs text-zinc-300 pt-2 leading-relaxed max-w-xl">{latestProject.description}</p>
                </div>

                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProject(latestProject)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Architecture Deep-Dive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (4 Columns): GitHub, LeetCode, Activity Feed & System Diagnostics */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* GitHub & LeetCode Diagnostic Highlights */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center justify-between">
                <span>Codebase Diagnostics</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              {/* GitHub Stat */}
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-white" />
                    <span>GitHub Activity</span>
                  </span>
                  <span className="font-mono text-cyan-300 font-bold">Awaiting Data</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500">Connecting to GitHub API...</div>
              </div>

              {/* LeetCode Stat */}
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>LeetCode Rating</span>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">Awaiting Data</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500">Connecting to LeetCode API...</div>
              </div>
            </div>

            {/* JARVIS Live Ticking Activity Feed Stream */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <h4 className="text-xs font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>JARVIS Activity Stream</span>
                </h4>
                <span className="text-[10px] font-mono text-emerald-400">STREAMING</span>
              </div>

              <div className="space-y-2.5 font-mono text-[11px]">
                <div className="p-2 rounded bg-zinc-950/70 border border-white/5 text-zinc-300">
                  <span className="text-cyan-400 font-bold">[SYS]</span> Awaiting live telemetry stream connection...
                </div>
              </div>
            </div>

            {/* System Diagnostics Health Grid */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase">System Diagnostics</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5">
                  <div className="text-[10px] text-zinc-500">CPU LOAD</div>
                  <div className="text-sm font-bold text-cyan-300">12.4%</div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5">
                  <div className="text-[10px] text-zinc-500">MEMORY</div>
                  <div className="text-sm font-bold text-indigo-300">3.8 / 32 GB</div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5">
                  <div className="text-[10px] text-zinc-500">DEFCON LEVEL</div>
                  <div className="text-sm font-bold text-emerald-400">DEFCON 5</div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5">
                  <div className="text-[10px] text-zinc-500">SSL SECURITY</div>
                  <div className="text-sm font-bold text-emerald-400">ENCRYPTED</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
