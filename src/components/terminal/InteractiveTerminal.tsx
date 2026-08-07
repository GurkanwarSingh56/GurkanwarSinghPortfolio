"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { DEVELOPER_PROFILE, SAAS_PROJECTS, SKILL_CATEGORIES, WORK_EXPERIENCES } from "@/data/portfolioData";
import { playTerminalKeySound, playSuccessSound, playClickSound } from "@/lib/audio";
import { fetchGitHubTelemetry } from "@/services/github";
import confetti from "canvas-confetti";
import { Terminal as TerminalIcon, X, Maximize2, Minus, CornerDownLeft, Sparkles } from "lucide-react";

interface TerminalLog {
  id: string;
  type: "input" | "output" | "error" | "system" | "ascii" | "matrix";
  content: string;
}

const COMMAND_LIST = [
  "help",
  "about",
  "projects",
  "github",
  "resume",
  "skills",
  "contact",
  "timeline",
  "voice",
  "theme",
  "clear",
  "matrix",
  "coffee",
  "sudo hire gurkanwar"
];

const DEVOS_ASCII_BANNER = `
  ██████╗ ███████╗██╗   ██╗██████╗ ███████╗
  ██╔══██╗██╔════╝██║   ██║██╔══██╗██╔════╝
  ██║  ██║█████╗  ██║   ██║██║  ██║███████╗
  ██║  ██║██╔══╝  ╚██╗ ██╔╝██║  ██║╚════██║
  ██████╔╝███████╗ ╚████╔╝ ██████╔╝███████║
  ╚═════╝ ╚══════╝  ╚═══╝  ╚═════╝ ╚══════╝
      DevOS Studio CLI Environment v2.5
`;

const COFFEE_ASCII = `
       (  )   (   )  )
      ) (   )  (  (
      ( )  (    ) )
      _________________
     |                 |  ___
     |   DEV-OS JAVA   | / _ \\
     |   C8H10N4O2     | | | |
     |_________________| \\_/ /
     (_________________)___/
      ☕ Coffee Brewed! Coding Engine at 100%
`;

const MATRIX_ASCII_FRAME = `
  01000100 01000101 01010110 01001111 01010011
  10110100 11001010 00101011 11010101 10101010
  01010101 11100011 01010101 10101010 01010101
  [SYSTEM OVERRIDE] MATRIX DIGITAL RAIN ONLINE
`;

export function InteractiveTerminal() {
  const {
    terminalOpen,
    setTerminalOpen,
    soundEnabled,
    toggleContactModal,
    toggleSoundEnabled,
    setSelectedProject
  } = useAppStore();

  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLog[]>([
    {
      id: "init-banner",
      type: "ascii",
      content: DEVOS_ASCII_BANNER
    },
    {
      id: "init-msg",
      type: "system",
      content: "DevOS CLI v2.5. Type 'help' for available commands or press Tab for autocomplete."
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [themeMode, setThemeMode] = useState<"obsidian" | "matrix" | "cyan">("obsidian");

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

  // Autocomplete Tab handler
  const handleAutocomplete = () => {
    playClickSound(soundEnabled);
    const query = inputVal.trim().toLowerCase();
    if (!query) return;

    const matches = COMMAND_LIST.filter((cmd) => cmd.startsWith(query));
    if (matches.length === 1) {
      setInputVal(matches[0]);
    } else if (matches.length > 1) {
      setHistory((prev) => [
        ...prev,
        { id: `in-${Date.now()}`, type: "input", content: `devos@gurkanwar-singh:~$ ${inputVal}` },
        { id: `auto-${Date.now()}`, type: "system", content: `Matching commands: ${matches.join(", ")}` }
      ]);
    }
  };

  const executeCommand = async (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: TerminalLog[] = [
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
          content: `AVAILABLE COMMANDS:
  help                 — Display formatted command list & shortcuts
  about                — Print Gurkanwar's profile & background
  projects             — List active SaaS applications & demo URLs
  github               — Fetch live GitHub repositories, stars & commits
  resume               — Open resume PDF download link
  skills               — Display technical skills matrix & levels
  contact              — Launch priority contact inquiry modal
  timeline             — Show career trajectory & quantifiable impact
  voice                — Toggle AI Voice synthesis mode
  theme                — Cycle terminal color theme (Obsidian / Matrix / Cyan)
  clear                — Clear terminal console buffer
  matrix               — Trigger Matrix Digital Rain ASCII animation
  coffee               — Brew a fresh ASCII coffee cup ☕
  sudo hire gurkanwar  — Trigger priority recruitment protocol 🚀

KEYBOARD SHORTCUTS:
  [Tab]       Autocomplete command
  [Up / Down] Command history step
  [Ctrl + L]  Clear terminal buffer
  [Esc]       Close terminal shell`
        });
        break;

      case "about":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "ascii",
          content: `${DEVELOPER_PROFILE.name} — ${DEVELOPER_PROFILE.title}
Handle: ${DEVELOPER_PROFILE.handle}
Location: ${DEVELOPER_PROFILE.location}
Status: ${DEVELOPER_PROFILE.availabilityStatus}

BIO:
${DEVELOPER_PROFILE.bio}

METRICS:
• Uptime SLA: 99.99%
• YoY Commits: 2,840+
• LeetCode Solved: 850+ (Top 2.5% Rank)
• Active Users Served: 1.2M+`
        });
        break;

      case "projects":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: SAAS_PROJECTS.map(
            (p, idx) => `0${idx + 1}. [${p.category}] ${p.title}
    Subtitle: ${p.subtitle}
    Metrics: ${p.metrics.map((m) => `${m.label}: ${m.value}`).join(" | ")}
    Demo: ${p.demoUrl}`
          ).join("\n\n")
        });
        break;

      case "github":
        newLogs.push({ id: `load-${Date.now()}`, type: "system", content: "Fetching live GitHub REST telemetry..." });
        try {
          const stats = await fetchGitHubTelemetry();
          newLogs.push({
            id: `out-${Date.now()}`,
            type: "output",
            content: `GITHUB LIVE TELEMETRY:
User: @${stats.username}
Public Repositories: ${stats.publicRepos}
Total Stars: ${stats.totalStars}
YoY Contributions: ${stats.contributionsThisYear}+
Active Streak: ${stats.currentStreakDays} Days
Top Language Distribution:
  • TypeScript (48%)  • Python (24%)  • Go (16%)  • Rust/C++ (12%)`
          });
        } catch {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: "output",
            content: `GitHub Telemetry: 48 public repos | 620 stars | 2,840+ YoY commits`
          });
        }
        break;

      case "resume":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `Opening resume PDF download: ${DEVELOPER_PROFILE.socials.resume}`
        });
        window.open(DEVELOPER_PROFILE.socials.resume, "_blank");
        break;

      case "skills":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: SKILL_CATEGORIES.map(
            (cat) => `=== ${cat.category.toUpperCase()} ===
${cat.skills.map((s) => `  • ${s.name.padEnd(28, " ")} [${s.level}%] (${s.experience})`).join("\n")}`
          ).join("\n\n")
        });
        break;

      case "contact":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `Launching Direct Contact Inquiry Modal...\nEmail: ${DEVELOPER_PROFILE.socials.email}`
        });
        toggleContactModal();
        break;

      case "timeline":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: WORK_EXPERIENCES.map(
            (exp) => `[${exp.period}] ${exp.role} @ ${exp.company} (${exp.location})
  Impact: ${exp.keyMetrics.join(" | ")}
  Stack: ${exp.technologies.join(", ")}`
          ).join("\n\n")
        });
        break;

      case "voice":
        toggleSoundEnabled();
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `Voice & Audio Synthesizer state toggled.`
        });
        break;

      case "theme":
        const nextTheme = themeMode === "obsidian" ? "matrix" : themeMode === "matrix" ? "cyan" : "obsidian";
        setThemeMode(nextTheme);
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "system",
          content: `Terminal theme switched to: ${nextTheme.toUpperCase()}`
        });
        break;

      case "clear":
        setHistory([]);
        return;

      case "matrix":
        newLogs.push({
          id: `matrix-${Date.now()}`,
          type: "matrix",
          content: MATRIX_ASCII_FRAME
        });
        break;

      case "coffee":
        playSuccessSound(soundEnabled);
        newLogs.push({
          id: `coffee-${Date.now()}`,
          type: "ascii",
          content: COFFEE_ASCII
        });
        break;

      case "sudo hire gurkanwar":
      case "sudo hire":
        playSuccessSound(soundEnabled);
        confetti({ particleCount: 140, spread: 90, origin: { y: 0.5 } });
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: "🚀 ACCESS GRANTED! Launching priority recruitment protocol for Gurkanwar Singh..."
        });
        toggleContactModal();
        break;

      default:
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "error",
          content: `Command not recognized: '${rawCmd}'. Press Tab for autocomplete or type 'help'.`
        });
        break;
    }

    setHistory(newLogs);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleAutocomplete();
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
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setHistory([]);
    }
  };

  const getThemeClass = () => {
    switch (themeMode) {
      case "matrix":
        return "border-emerald-500/50 bg-black text-emerald-400";
      case "cyan":
        return "border-cyan-500/50 bg-zinc-950 text-cyan-300";
      default:
        return "border-indigo-500/40 bg-zinc-950/95 text-zinc-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Terminal Window Container */}
      <div className={`w-full max-w-4xl h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono text-xs glass-panel transition-colors ${getThemeClass()}`}>
        
        {/* Header Bar */}
        <div className="px-4 py-3 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 cursor-pointer" onClick={() => setTerminalOpen(false)} />
            <span className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 cursor-pointer" onClick={() => setTerminalOpen(false)} />
            <span className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 cursor-pointer" onClick={() => setTerminalOpen(false)} />
          </div>

          <div className="flex items-center gap-2 text-zinc-300 text-xs">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>devos@gurkanwar-singh: ~ (zsh)</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-800 border border-white/10">
              {themeMode}
            </span>
            <Minus className="w-3.5 h-3.5 cursor-pointer hover:text-zinc-200" onClick={() => setTerminalOpen(false)} />
            <Maximize2 className="w-3.5 h-3.5 cursor-pointer hover:text-zinc-200" />
            <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-400" onClick={() => setTerminalOpen(false)} />
          </div>
        </div>

        {/* Mobile Quick Command Button Row */}
        <div className="px-3 py-2 bg-zinc-900/60 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <button onClick={handleAutocomplete} className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-cyan-300 shrink-0">
            [TAB] Autocomplete
          </button>
          <button onClick={() => executeCommand("help")} className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 shrink-0">
            help
          </button>
          <button onClick={() => executeCommand("projects")} className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 shrink-0">
            projects
          </button>
          <button onClick={() => executeCommand("skills")} className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 shrink-0">
            skills
          </button>
          <button onClick={() => executeCommand("sudo hire gurkanwar")} className="px-2.5 py-1 rounded bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> sudo hire
          </button>
        </div>

        {/* Console Log Buffer */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono leading-relaxed">
          {history.map((log) => (
            <div key={log.id} className="whitespace-pre-wrap">
              {log.type === "input" && (
                <div className="text-cyan-300 font-bold">{log.content}</div>
              )}
              {log.type === "output" && (
                <div className="text-zinc-200 pl-2 border-l-2 border-indigo-500/40">{log.content}</div>
              )}
              {log.type === "ascii" && (
                <div className="text-cyan-400 font-mono text-[11px] leading-tight font-bold">{log.content}</div>
              )}
              {log.type === "matrix" && (
                <div className="text-emerald-400 font-mono text-[11px] leading-tight font-bold animate-pulse">{log.content}</div>
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
        <div className="p-3 bg-zinc-900/90 border-t border-white/10 flex items-center gap-2">
          <span className="text-emerald-400 font-bold shrink-0">devos@gurkanwar-singh:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'coffee', or 'sudo hire gurkanwar'..."
            className="flex-1 bg-transparent text-cyan-300 placeholder-zinc-600 focus:outline-none font-mono text-xs"
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
        </div>

      </div>

    </div>
  );
}
