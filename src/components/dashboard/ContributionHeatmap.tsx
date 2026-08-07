"use client";

import { ContributionDay } from "@/types/liveTelemetry";

interface Props {
  days: ContributionDay[];
  currentStreak: number;
  totalContributions: number;
}

export function ContributionHeatmap({ days, currentStreak, totalContributions }: Props) {
  const getLevelColor = (level: number) => {
    switch (level) {
      case 4:
        return "bg-emerald-400 border-emerald-300 shadow-sm shadow-emerald-400/50";
      case 3:
        return "bg-emerald-500/80 border-emerald-400/40";
      case 2:
        return "bg-emerald-600/50 border-emerald-500/30";
      case 1:
        return "bg-emerald-950/80 border-emerald-500/20";
      default:
        return "bg-zinc-900 border-white/5";
    }
  };

  return (
    <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <div className="font-bold text-zinc-100 text-sm flex items-center gap-2">
            <span>GitHub Contribution Heatmap</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-500/40 font-bold">
              🔥 {currentStreak} Day Active Streak
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">52-Week Year-over-Year Commit Density Stream</p>
        </div>

        <div className="text-right">
          <span className="text-base font-extrabold text-emerald-400 font-mono">{totalContributions.toLocaleString()}</span>
          <span className="text-[11px] text-zinc-400 block">Commits in 2026</span>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[680px]">
          {days.map((day, idx) => (
            <div
              key={idx}
              title={`${day.date}: ${day.count} contributions`}
              className={`w-2.5 h-2.5 rounded-[2px] border transition-transform hover:scale-125 cursor-pointer ${getLevelColor(day.level)}`}
            />
          ))}
        </div>
      </div>

      {/* Legend Bar */}
      <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/5 pt-2">
        <span>364 Days Monitored</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-900 border border-white/5" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-950 border border-emerald-500/20" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600/50 border border-emerald-500/30" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500/80 border border-emerald-400/40" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 border border-emerald-300 shadow-sm shadow-emerald-400/50" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
