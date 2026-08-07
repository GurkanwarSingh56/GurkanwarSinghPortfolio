"use client";

import { useState, useRef, useEffect } from "react";
import { TERMINAL_COMMANDS_HELP, DEVELOPER_PROFILE, SAAS_PROJECTS } from "@/data/portfolioData";
import { useAppStore } from "@/store/useAppStore";
import { playTerminalKeySound, playSuccessSound } from "@/lib/audio";
import confetti from "canvas-confetti";
import { Terminal as TerminalIcon, X, Maximize2, Minus, CornerDownLeft } from "lucide-react";

interface HistoryLog {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: string;
}

export function InteractiveTerminal() {
  const {
    terminalOpen,
    setTerminalOpen,
    soundEnabled,
    toggleContactModal,
    toggleSoundEnabled
  } = useAppStore();

  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryLog[]>([
    {
      id: "init-1",
      type: "system",
      content: "DevOS CLI Studio Environment v2.5 initialized. Type 'help' for available commands."
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [terminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!terminalOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playTerminalKeySound(soundEnabled);
    setInputVal(e.target.value);
  };

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Add input to history
    const newLogs: HistoryLog[] = [
      ...history,
      { id: `in-${Date.now()}`, type: "input", content: `devos@gurkanwar-singh:~$ ${rawCmd}` }
    ];

    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);
    setInputVal("");

    switch (cmd) {
      case "help":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: TERMINAL_COMMANDS_HELP.map((c) => `${c.cmd.padEnd(14, " ")} — ${c.desc}`).join("\n")
        });
        break;

      case "bio":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `${DEVELOPER_PROFILE.name} | ${DEVELOPER_PROFILE.title}\n${DEVELOPER_PROFILE.bio}\nLocation: ${DEVELOPER_PROFILE.location}\nStatus: ${DEVELOPER_PROFILE.availabilityStatus}`
        });
        break;

      case "skills":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: "CORE TECHNOLOGIES:\n• Next.js 15 (RSC / App Router)\n• React 19 / TypeScript / Tailwind CSS v4\n• Three.js / React Three Fiber / Shaders\n• Python FastAPI / LangChain / Pinecone Vector DB\n• Go / Microservices / Docker / AWS EKS"
        });
        break;

      case "projects":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: SAAS_PROJECTS.map((p) => `[${p.category}] ${p.title} — ${p.subtitle}\n  Demo: ${p.demoUrl}`).join("\n\n")
        });
        break;

      case "telemetry":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: "LIVE TELEMETRY:\n• GitHub: 48 public repos | 620 total stars | 2,840+ YoY commits\n• LeetCode: 850+ solved (Top 2.5% rank) | Contest Rating: 1985\n• System Status: 99.99% Uptime SLA | Latency: 14ms"
        });
        break;

      case "experience":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: "EXPERIENCE TIMELINE:\n• Senior Staff Software Engineer @ DevOS (2023 - Present)\n• Lead Fullstack & Systems Engineer @ CloudScale (2021 - 2023)\n• Senior Frontend Engineer @ Hyperion Digital (2019 - 2021)"
        });
        break;

      case "contact":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `Launching Direct Contact Modal...\nEmail: ${DEVELOPER_PROFILE.socials.email}\nGitHub: ${DEVELOPER_PROFILE.socials.github}`
        });
        toggleContactModal();
        break;

      case "sound":
        toggleSoundEnabled();
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `UI Sound effects toggled.`
        });
        break;

      case "clear":
        setHistory([]);
        return;

      case "sudo hire":
        playSuccessSound(soundEnabled);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: "🚀 ACCESS GRANTED! Launching priority recruitment channel for Gurkanwar Singh..."
        });
        toggleContactModal();
        break;

      default:
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "error",
          content: `Command not recognized: '${rawCmd}'. Type 'help' for available CLI commands.`
        });
        break;
    }

    setHistory(newLogs);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1 < commandHistory.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || "");
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal("");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Terminal Window Container */}
      <div className="w-full max-w-4xl h-[560px] bg-zinc-950/95 border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/50 flex flex-col overflow-hidden font-mono text-xs glass-panel">
        
        {/* macOS Window Title Header */}
        <div className="px-4 py-3 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 cursor-pointer" onClick={() => setTerminalOpen(false)} />
            <span className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 cursor-pointer" onClick={() => setTerminalOpen(false)} />
            <span className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 cursor-pointer" onClick={() => setTerminalOpen(false)} />
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-xs">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>devos@gurkanwar-singh: ~ (zsh)</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-500">
            <Minus className="w-3.5 h-3.5 cursor-pointer hover:text-zinc-300" onClick={() => setTerminalOpen(false)} />
            <Maximize2 className="w-3.5 h-3.5 cursor-pointer hover:text-zinc-300" />
            <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-400" onClick={() => setTerminalOpen(false)} />
          </div>
        </div>

        {/* Console Buffer Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-zinc-300 leading-relaxed">
          {history.map((log) => (
            <div key={log.id} className="whitespace-pre-wrap">
              {log.type === "input" && (
                <div className="text-cyan-300 font-bold">{log.content}</div>
              )}
              {log.type === "output" && (
                <div className="text-zinc-300 pl-2 border-l-2 border-indigo-500/40">{log.content}</div>
              )}
              {log.type === "error" && (
                <div className="text-rose-400 font-medium pl-2 border-l-2 border-rose-500/40">{log.content}</div>
              )}
              {log.type === "system" && (
                <div className="text-indigo-400 font-semibold">{log.content}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar Prompt */}
        <div className="p-3 bg-zinc-900/80 border-t border-white/10 flex items-center gap-2">
          <span className="text-emerald-400 font-bold shrink-0">devos@gurkanwar-singh:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'sudo hire'..."
            className="flex-1 bg-transparent text-cyan-300 placeholder-zinc-600 focus:outline-none font-mono text-xs"
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
        </div>

      </div>

    </div>
  );
}
