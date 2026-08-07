"use client";

import { useAppStore } from "@/store/useAppStore";
import { DEVELOPER_PROFILE } from "@/data/portfolioData";
import { playClickSound } from "@/lib/audio";
import { HeroCanvas } from "../canvas/HeroCanvas";
import { ArrowRight, Terminal, Search, ShieldCheck, Sparkles, MapPin, Zap } from "lucide-react";

export function HeroSection() {
  const { soundEnabled, setCommandPaletteOpen, toggleTerminal, toggleContactModal } = useAppStore();

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-purple-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-indigo-500/10 blur-[90px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & SaaS Branding */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Pill Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Next.js 15 & React 19 Engine</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 text-xs font-mono">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{DEVELOPER_PROFILE.location}</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Engineering <br className="hidden sm:block" />
                <span className="text-gradient-cyan">High-Impact SaaS</span> &amp; <br />
                <span className="text-gradient-gold">Autonomous AI Systems</span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-normal">
                {DEVELOPER_PROFILE.bio}
              </p>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* Primary CTA */}
              <a
                href="#projects"
                onClick={() => playClickSound(soundEnabled)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all group focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span>Explore SaaS Suite</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Terminal Launcher */}
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  toggleTerminal();
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-zinc-200 hover:text-cyan-300 font-mono text-xs transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Launch CLI Terminal</span>
              </button>

              {/* Cmd+K Quick Trigger */}
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setCommandPaletteOpen(true);
                }}
                className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/10 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Search className="w-3.5 h-3.5 text-indigo-400" />
                <span>Cmd + K</span>
              </button>
            </div>

            {/* Live Metrics Ticker Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              {DEVELOPER_PROFILE.metrics.map((metric, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-xl font-bold font-mono text-white tracking-tight">{metric.value}</div>
                  <div className="text-xs font-medium text-indigo-400">{metric.label}</div>
                  <div className="text-[10px] text-zinc-500 truncate mt-0.5">{metric.detail}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: 3D Canvas Visual Core */}
          <div className="lg:col-span-5 w-full h-[400px] lg:h-[500px]">
            <HeroCanvas />
          </div>

        </div>

        {/* Floating Quick Trust Banner */}
        <div className="mt-12 p-4 rounded-2xl glass-panel flex flex-wrap items-center justify-between gap-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-200">Production Ready Architectural Standard</div>
              <div className="text-[11px] text-zinc-400 font-mono">Clean Architecture • Mobile First • WCAG AA Accessible • Sub-100ms Latency</div>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound(soundEnabled);
              toggleContactModal();
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-medium group"
          >
            <span>Schedule Architectural Audit</span>
            <Zap className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
