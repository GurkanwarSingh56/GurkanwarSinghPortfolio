"use client";

import { useAppStore } from "@/store/useAppStore";
import { playClickSound, playToggleSound } from "@/lib/audio";
import { DEVELOPER_PROFILE } from "@/data/portfolioData";
import { Search, Volume2, VolumeX, Terminal, Send, FileText, Sparkles } from "lucide-react";

export function HeaderNavbar() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    soundEnabled,
    toggleSoundEnabled,
    toggleContactModal,
    toggleTerminal,
    toggleAIChat
  } = useAppStore();

  const handleSoundToggle = () => {
    playToggleSound(!soundEnabled);
    toggleSoundEnabled();
  };

  const handleCmdKClick = () => {
    playClickSound(soundEnabled);
    setCommandPaletteOpen(!commandPaletteOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-zinc-950/75 border-b border-white/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Title & Availability Badge */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={() => playClickSound(soundEnabled)}
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[6px] flex items-center justify-center font-mono font-bold text-xs text-cyan-300">
                GS
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-semibold text-sm text-zinc-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                {DEVELOPER_PROFILE.name}
              </div>
              <div className="text-[11px] font-mono text-zinc-400">DevOS Studio v2.5</div>
            </div>
          </a>

          {/* Live Operational Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="truncate max-w-[200px]">{DEVELOPER_PROFILE.availabilityStatus}</span>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2">
          
          {/* Cmd + K Command Palette Launcher */}
          <button
            onClick={handleCmdKClick}
            aria-label="Open Command Palette (Cmd + K)"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-zinc-100 text-xs font-mono transition-all group focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:text-cyan-300" />
            <span className="hidden sm:inline">Search & Actions</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-zinc-950 border border-white/10 text-[10px] text-zinc-400">
              ⌘K
            </kbd>
          </button>

          {/* AI Assistant Quick Trigger */}
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              toggleAIChat();
            }}
            aria-label="Open AI Assistant"
            className="p-2 rounded-lg bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-500/40 text-indigo-300 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Ask DevOS AI Assistant"
          >
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          </button>

          {/* Terminal CLI Toggle Button */}
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              toggleTerminal();
            }}
            aria-label="Open Interactive CLI Terminal"
            className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-cyan-300 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Launch Interactive Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Audio Synthesizer FX Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            aria-label={soundEnabled ? "Mute UI Audio Effects" : "Enable UI Audio Effects"}
            className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-indigo-400 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title={soundEnabled ? "Audio FX: ON" : "Audio FX: OFF"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>

          {/* Resume PDF Download */}
          <a
            href={DEVELOPER_PROFILE.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound(soundEnabled)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span>CV</span>
          </a>

          {/* Contact Direct Modal CTA */}
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              toggleContactModal();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </button>
        </div>

      </div>
    </header>
  );
}
