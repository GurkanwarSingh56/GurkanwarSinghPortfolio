"use client";

import { useEffect } from "react";
import { Command } from "cmdk";
import { useAppStore } from "@/store/useAppStore";
import { SAAS_PROJECTS, DEVELOPER_PROFILE } from "@/data/portfolioData";
import { playClickSound, playModalOpenSound } from "@/lib/audio";
import { GithubIcon, LinkedinIcon } from "@/components/common/SocialIcons";
import {
  Search,
  Code2,
  Terminal,
  Send,
  Volume2,
  VolumeX,
  FileText,
  Sparkles,
  Layers,
  Cpu,
  X
} from "lucide-react";

export function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    soundEnabled,
    toggleSoundEnabled,
    setSelectedProject,
    toggleContactModal,
    toggleTerminal,
    toggleAIChat
  } = useAppStore();

  // Listen for Cmd+K or Ctrl+K keypress shortcut globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        playModalOpenSound(soundEnabled);
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen, soundEnabled]);

  if (!commandPaletteOpen) return null;

  const runAction = (action: () => void) => {
    playClickSound(soundEnabled);
    action();
    setCommandPaletteOpen(false);
  };

  const scrollToSection = (id: string) => {
    runAction(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-zinc-950/80 backdrop-blur-md transition-all">
      
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0"
        onClick={() => setCommandPaletteOpen(false)}
        aria-hidden="true"
      />

      {/* Command Palette Modal Container */}
      <div className="relative w-full max-w-2xl bg-zinc-900/95 border border-indigo-500/30 rounded-2xl shadow-2xl shadow-indigo-950/50 overflow-hidden z-10 glass-panel animate-in fade-in zoom-in-95 duration-200">
        
        <Command className="w-full">
          
          {/* Search Input Bar */}
          <div className="flex items-center px-4 border-b border-white/10">
            <Search className="w-4 h-4 text-indigo-400 mr-3 shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Type a command, project name, or navigation target..."
              className="w-full py-4 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-mono"
            />
            <button
              onClick={() => setCommandPaletteOpen(false)}
              className="p-1 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <Command.List className="max-h-96 overflow-y-auto p-2 space-y-1 font-sans">
            <Command.Empty className="py-8 text-center text-xs font-mono text-zinc-500">
              No matching commands or projects found. Try searching for &quot;Projects&quot;, &quot;Skills&quot;, or &quot;Hire&quot;.
            </Command.Empty>

            {/* Quick Actions */}
            <Command.Group heading={<span className="px-2 py-1 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Quick Actions</span>}>
              <Command.Item
                onSelect={() => runAction(() => toggleContactModal())}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-indigo-600/20 hover:border hover:border-indigo-500/30 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">Direct Priority Inquiry / Hire Me</span>
                <span className="ml-auto text-[11px] font-mono text-emerald-400/80">Action</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runAction(() => toggleAIChat())}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-indigo-600/20 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Launch DevOS AI Assistant</span>
                <span className="ml-auto text-[11px] font-mono text-cyan-400/80">AI Agent</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runAction(() => toggleTerminal())}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-indigo-600/20 cursor-pointer transition-all"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Open Interactive Developer Terminal</span>
                <span className="ml-auto text-[11px] font-mono text-zinc-500">CLI Mode</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runAction(() => toggleSoundEnabled())}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-indigo-600/20 cursor-pointer transition-all"
              >
                {soundEnabled ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
                <span>Toggle Tactile Sound Effects ({soundEnabled ? "ON" : "OFF"})</span>
              </Command.Item>
            </Command.Group>

            {/* Navigation Jumps */}
            <Command.Group heading={<span className="px-2 py-1 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Navigation</span>}>
              <Command.Item
                onSelect={() => scrollToSection("telemetry")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/80 cursor-pointer transition-all"
              >
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Live Developer Telemetry &amp; Stats</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollToSection("projects")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/80 cursor-pointer transition-all"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Featured SaaS Projects Showcase</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollToSection("tech-matrix")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/80 cursor-pointer transition-all"
              >
                <Layers className="w-4 h-4 text-violet-400" />
                <span>Tech Stack Matrix &amp; Architecture Flow</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollToSection("experience")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/80 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Career Experience &amp; Impact Timeline</span>
              </Command.Item>
            </Command.Group>

            {/* SaaS Projects */}
            <Command.Group heading={<span className="px-2 py-1 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">SaaS Projects</span>}>
              {SAAS_PROJECTS.map((proj) => (
                <Command.Item
                  key={proj.id}
                  onSelect={() => runAction(() => setSelectedProject(proj))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-indigo-950/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <div>
                      <div className="font-medium text-zinc-200">{proj.title}</div>
                      <div className="text-xs text-zinc-500">{proj.subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {proj.category}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* External Links */}
            <Command.Group heading={<span className="px-2 py-1 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Social Links</span>}>
              <Command.Item
                onSelect={() => runAction(() => window.open(DEVELOPER_PROFILE.socials.github, "_blank"))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Profile</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runAction(() => window.open(DEVELOPER_PROFILE.socials.linkedin, "_blank"))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn Profile</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runAction(() => window.open(DEVELOPER_PROFILE.socials.resume, "_blank"))}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Resume (PDF)</span>
              </Command.Item>
            </Command.Group>

          </Command.List>

          {/* Footer Guide */}
          <div className="p-3 border-t border-white/10 bg-zinc-950/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300">↑↓</kbd> Navigate</span>
              <span><kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300">↵</kbd> Select</span>
              <span><kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300">ESC</kbd> Close</span>
            </div>
            <span className="text-indigo-400">DevOS Studio</span>
          </div>

        </Command>

      </div>

    </div>
  );
}
