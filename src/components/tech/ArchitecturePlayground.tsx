"use client";

import { useState } from "react";
import { ARCHITECTURE_NODES } from "@/data/portfolioData";
import { useAppStore } from "@/store/useAppStore";
import { playClickSound } from "@/lib/audio";
import { Cpu, CheckCircle, Zap, RefreshCw } from "lucide-react";

export function ArchitecturePlayground() {
  const { soundEnabled } = useAppStore();
  const [activeNodeId, setActiveNodeId] = useState<string>("client-edge");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const activeNode = ARCHITECTURE_NODES.find((n) => n.id === activeNodeId) || ARCHITECTURE_NODES[0];

  const triggerSimulation = () => {
    playClickSound(soundEnabled);
    setIsSimulating(true);
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % ARCHITECTURE_NODES.length;
      setActiveNodeId(ARCHITECTURE_NODES[stepIndex].id);
      if (stepIndex === ARCHITECTURE_NODES.length - 1) {
        clearInterval(interval);
        setTimeout(() => setIsSimulating(false), 800);
      }
    }, 600);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl glass-panel border border-indigo-500/30 space-y-6">
      
      {/* Play Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
            <Zap className="w-4 h-4" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Fullstack SaaS Architecture Pipeline</h3>
        </div>

        <button
          onClick={triggerSimulation}
          disabled={isSimulating}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            isSimulating
              ? "bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg shadow-indigo-600/30"
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isSimulating ? "animate-spin text-cyan-400" : ""}`} />
          <span>{isSimulating ? "Simulating Request..." : "Simulate End-to-End Pipeline Request"}</span>
        </button>
      </div>

      {/* Node Pipeline Step Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {ARCHITECTURE_NODES.map((node, index) => {
          const isActive = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              onClick={() => {
                playClickSound(soundEnabled);
                setActiveNodeId(node.id);
              }}
              className={`p-3 rounded-xl text-left border transition-all ${
                isActive
                  ? "bg-indigo-950/70 border-cyan-400 shadow-lg shadow-cyan-500/20 text-white"
                  : "bg-zinc-950/50 border-white/10 hover:border-white/20 text-zinc-400"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className={isActive ? "text-cyan-300 font-bold" : "text-zinc-500"}>Node 0{index + 1}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs font-bold truncate">{node.title.split(". ")[1]}</div>
              <div className="text-[10px] font-mono text-zinc-500 mt-1 truncate">{node.latency}</div>
            </button>
          );
        })}
      </div>

      {/* Active Node Detail Card */}
      <div className="p-5 rounded-xl bg-zinc-950/80 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-500/40 text-cyan-300">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">{activeNode.title}</h4>
              <div className="text-xs font-mono text-cyan-400">{activeNode.subtitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Status: {activeNode.status.toUpperCase()}</span>
            </span>
            <span className="px-2.5 py-1 rounded bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
              Latency: {activeNode.latency}
            </span>
            <span className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
              Throughput: {activeNode.throughput}
            </span>
          </div>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed font-normal">
          {activeNode.details}
        </p>
      </div>

    </div>
  );
}
