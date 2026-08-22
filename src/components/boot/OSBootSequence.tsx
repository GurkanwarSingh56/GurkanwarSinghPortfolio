"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { playClickSound, playSuccessSound, playTerminalKeySound } from "@/lib/audio";
import { Cpu, Terminal, ShieldCheck, FastForward, Sparkles, CheckCircle2 } from "lucide-react";

interface BootStep {
  id: number;
  label: string;
  detail: string;
  durationMs: number;
}

const BOOT_STEPS: BootStep[] = [
  { id: 1, label: "Loading DevOS BIOS v4.82", detail: "POST diagnostic check passed. Firmware integrity 100%", durationMs: 800 },
  { id: 2, label: "Initializing Memory & WebGL", detail: "Allocated 32 GB VRAM • R3F Shader Engine loaded", durationMs: 900 },
  { id: 3, label: "Connecting GitHub API", detail: "Authenticated @gurkanwarsingh • 2,840+ YoY commits verified", durationMs: 900 },
  { id: 4, label: "Connecting AI Neural Engine", detail: "Gemini LLM pipeline linked • Initializing...", durationMs: 900 },
  { id: 5, label: "Loading Project Database", detail: "Ingested 4 SaaS Architecture Nodes & Metrics Matrix", durationMs: 900 },
  { id: 6, label: "Starting Microservices Mesh", detail: "WebSocket telemetry stream online • Edge latency 14ms", durationMs: 900 },
  { id: 7, label: "Mission Control Online", detail: "JARVIS PROTOCOL MARK-42 ACTIVE. WELCOME, BOSS.", durationMs: 700 },
];

export function OSBootSequence() {
  const { soundEnabled } = useAppStore();
  const [booting, setBooting] = useState<boolean>(true);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Check if user already completed boot in this session
    const hasBooted = sessionStorage.getItem("devos_booted");
    if (hasBooted === "true") {
      setBooting(false);
      return;
    }

    let stepCounter = 0;
    let accumulatedTime = 0;

    const totalDuration = BOOT_STEPS.reduce((acc, s) => acc + s.durationMs, 0);

    const progressInterval = setInterval(() => {
      accumulatedTime += 50;
      const currentPct = Math.min(Math.round((accumulatedTime / totalDuration) * 100), 100);
      setProgress(currentPct);
    }, 50);

    const stepInterval = setInterval(() => {
      stepCounter++;
      if (stepCounter < BOOT_STEPS.length) {
        setCurrentStepIdx(stepCounter);
        playTerminalKeySound(soundEnabled);
      } else {
        clearInterval(stepInterval);
        clearInterval(progressInterval);
        setProgress(100);
        playSuccessSound(soundEnabled);
        setTimeout(() => {
          setBooting(false);
          sessionStorage.setItem("devos_booted", "true");
        }, 800);
      }
    }, 850);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [soundEnabled]);

  const handleSkip = () => {
    playClickSound(soundEnabled);
    setBooting(false);
    sessionStorage.setItem("devos_booted", "true");
  };

  if (!booting) return null;

  const currentStep = BOOT_STEPS[currentStepIdx] || BOOT_STEPS[BOOT_STEPS.length - 1];

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 text-cyan-400 font-mono flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none animate-in fade-in duration-300">
      
      {/* Ambient Grid Backdrop & Scanlines */}
      <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-cyber-pulse pointer-events-none" />
      
      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-cyan-500/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <div className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
              DevOS Studio Kernel Boot v4.82
            </div>
            <div className="text-[10px] text-zinc-500">Gurkanwar Singh Systems Architecture</div>
          </div>
        </div>

        {/* Skip Sequence Button */}
        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <span>Skip Boot Sequence</span>
          <FastForward className="w-4 h-4 text-cyan-400" />
        </button>
      </div>

      {/* Central Cinematic Kernel Visualizer & Progress Ring */}
      <div className="relative z-10 max-w-2xl mx-auto w-full my-auto space-y-8 text-center">
        
        {/* Core Arc Reactor Graphic */}
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          {/* Outer Dashed Orbit Ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-spin"
            style={{ animationDuration: "12s" }}
          />
          {/* Middle Pulse Ring */}
          <div className="absolute inset-3 rounded-full border border-indigo-500/80 animate-pulse" />
          
          {/* Inner Glowing Core */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-amber-400 p-1 shadow-2xl shadow-cyan-400/70 flex items-center justify-center">
            <div className="w-full h-full bg-zinc-950 rounded-full flex flex-col items-center justify-center">
              <Cpu className="w-8 h-8 text-cyan-300 animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-400 font-bold mt-1">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Current Active Step Highlight */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>STEP 0{currentStep.id} / 07</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {currentStep.label}...
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono">
            {currentStep.detail}
          </p>
        </div>

        {/* Cinematic Progress Bar */}
        <div className="space-y-1 max-w-lg mx-auto">
          <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-500">
            <span>MEM: 32 GB OK</span>
            <span>GPU: R3F WEBGL OK</span>
            <span>LATENCY: 14MS</span>
          </div>
        </div>

      </div>

      {/* Bottom Step Logs Buffer */}
      <div className="relative z-10 border-t border-cyan-500/30 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex flex-wrap items-center gap-4">
          {BOOT_STEPS.map((step) => {
            const isCompleted = step.id <= currentStep.id;
            const isCurrent = step.id === currentStep.id;
            return (
              <div
                key={step.id}
                className={`flex items-center gap-1.5 transition-colors ${
                  isCurrent
                    ? "text-cyan-300 font-bold"
                    : isCompleted
                    ? "text-emerald-400 opacity-80"
                    : "text-zinc-600"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Terminal className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                )}
                <span className="hidden md:inline">{step.label}</span>
                <span className="md:hidden">0{step.id}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>PRESS ESC OR CLICK SKIP TO BYPASS</span>
        </div>
      </div>

    </div>
  );
}
