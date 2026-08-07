"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLiveTelemetry, INITIAL_LIVE_TELEMETRY } from "@/services/liveTelemetryService";
import { ContributionHeatmap } from "./ContributionHeatmap";
import { playClickSound, playTerminalKeySound } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";
import { GithubIcon } from "@/components/common/SocialIcons";
import {
  Radio,
  Clock,
  CloudSun,
  Music,
  GitCommit,
  GitBranch,
  Code2,
  BookOpen,
  RefreshCw,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export function LiveTelemetryControlCenter() {
  const { soundEnabled } = useAppStore();
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

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

  // TanStack React Query with auto-refresh every 30 seconds
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["live-telemetry-dashboard"],
    queryFn: fetchLiveTelemetry,
    initialData: INITIAL_LIVE_TELEMETRY,
    refetchInterval: 30000
  });

  const handleManualRefresh = () => {
    playClickSound(soundEnabled);
    refetch();
  };

  const telemetry = data || INITIAL_LIVE_TELEMETRY;

  return (
    <section id="live-dashboard" className="py-16 md:py-24 relative overflow-hidden bg-zinc-950/90">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/30 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>LIVE TELEMETRY COMMAND CENTER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Real-Time <span className="text-gradient-cyan">Telemetry Grid</span>
            </h2>
          </div>

          {/* Top HUD Clock & Weather Controls */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-cyan-500/40 text-cyan-300">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{timeStr || "21:37:23"} IST</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-400">{dateStr || "08 AUG 2026"}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-amber-500/40 text-amber-300">
              <CloudSun className="w-4 h-4 text-amber-400" />
              <span>{telemetry.weather.location} • {telemetry.weather.temperatureCelsius}°C</span>
            </div>

            <button
              onClick={handleManualRefresh}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-cyan-300 transition-transform active:scale-95 flex items-center gap-1"
              title="Refresh Live Telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${isRefetching ? "animate-spin text-cyan-400" : ""}`} />
              <span className="text-[10px] hidden sm:inline">Auto-Refetch (30s)</span>
            </button>
          </div>
        </div>

        {/* Offline / Cache Fallback Pill */}
        {isLoading && (
          <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-mono flex items-center justify-between animate-pulse">
            <span>Syncing live API telemetry feeds...</span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
        )}

        {/* Live Spotify Now Playing Bar */}
        <div className="p-4 rounded-2xl glass-panel border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Music className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <span>SPOTIFY LIVE NOW PLAYING</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs font-mono text-emerald-300">
                &quot;{telemetry.spotify.songTitle}&quot; — <span className="text-zinc-400">{telemetry.spotify.artist}</span>
              </p>
            </div>
          </div>

          <a
            href={telemetry.spotify.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTerminalKeySound(soundEnabled)}
            className="px-4 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 shrink-0"
          >
            <span>Spotify Stream</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 52-Week Contribution Heatmap */}
        <ContributionHeatmap
          days={telemetry.github.contributionDays}
          currentStreak={telemetry.github.currentStreakDays}
          totalContributions={telemetry.github.contributionsThisYear}
        />

        {/* 2-Column Dashboard Grid: Left (Latest Commit & GitHub) | Right (LeetCode & Blog) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (6 Cols): Latest Commit & Repositories */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Latest Commit Stream */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
                  <GitCommit className="w-4 h-4" />
                  <span>Latest GitHub Commit</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">{telemetry.github.latestCommit.commitDate}</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <GitBranch className="w-4 h-4 text-indigo-400" />
                  <span className="text-indigo-300 font-bold">{telemetry.github.latestCommit.repoName}</span>
                  <span className="text-zinc-500">({telemetry.github.latestCommit.branch})</span>
                </div>
                <p className="text-zinc-200 text-sm font-bold pl-6">&quot;{telemetry.github.latestCommit.commitMessage}&quot;</p>
                <div className="pl-6 text-[11px] text-zinc-400 flex items-center gap-2 pt-1">
                  <span>Commit Hash: <code className="text-cyan-300">{telemetry.github.latestCommit.commitHash}</code></span>
                  <a
                    href={telemetry.github.latestCommit.commitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>View Commit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Stats Cards */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-1">
                <div className="text-zinc-400 flex items-center justify-between">
                  <span>Public Repos</span>
                  <GithubIcon className="w-4 h-4 text-white" />
                </div>
                <div className="text-2xl font-bold text-cyan-300">{telemetry.github.publicRepos}</div>
                <div className="text-[10px] text-zinc-500">Top Repo: {telemetry.github.latestRepo}</div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-1">
                <div className="text-zinc-400 flex items-center justify-between">
                  <span>Total Stars</span>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-300">{telemetry.github.totalStars}</div>
                <div className="text-[10px] text-zinc-500">620+ Community Stars</div>
              </div>
            </div>

          </div>

          {/* Right Column (6 Cols): LeetCode & Engineering Blog Notes */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* LeetCode Algorithmic Diagnostic Widget */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase">
                  <Code2 className="w-4 h-4" />
                  <span>LeetCode Algorithmic Rating</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                  Top 2.5% Rank
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center font-mono">
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-emerald-500/30">
                  <div className="text-[10px] text-emerald-400 font-bold">EASY</div>
                  <div className="text-base font-bold text-white">{telemetry.leetcode.easy}</div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/60 border border-amber-500/30">
                  <div className="text-[10px] text-amber-400 font-bold">MEDIUM</div>
                  <div className="text-base font-bold text-white">{telemetry.leetcode.medium}</div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/60 border border-rose-500/30">
                  <div className="text-[10px] text-rose-400 font-bold">HARD</div>
                  <div className="text-base font-bold text-white">{telemetry.leetcode.hard}</div>
                </div>
              </div>
            </div>

            {/* Engineering Blog Articles List */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase">
                  <BookOpen className="w-4 h-4" />
                  <span>Latest Engineering Notes</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">Medium / Dev.to</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {telemetry.blog.map((article) => (
                  <div key={article.id} className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1.5 hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-zinc-100 hover:text-cyan-300 transition-colors cursor-pointer">
                        {article.title}
                      </h4>
                      <span className="text-[10px] text-zinc-500 shrink-0">{article.readTime}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{article.summary}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
