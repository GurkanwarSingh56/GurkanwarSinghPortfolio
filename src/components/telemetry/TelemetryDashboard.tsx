"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchGitHubTelemetry } from "@/services/github";
import { fetchLeetCodeTelemetry } from "@/services/leetcode";
import { TELEMETRY_INITIAL } from "@/data/portfolioData";
import { GithubIcon } from "@/components/common/SocialIcons";
import { Code2, Activity, Star, GitCommit, Award, Server, RefreshCw } from "lucide-react";

export function TelemetryDashboard() {
  const { data: githubData, isLoading: githubLoading, isRefetching: githubRefetching, refetch: refetchGithub } = useQuery({
    queryKey: ["githubTelemetry"],
    queryFn: () => fetchGitHubTelemetry(),
    initialData: TELEMETRY_INITIAL.github
  });

  const { data: leetcodeData, isLoading: leetcodeLoading, refetch: refetchLeetCode } = useQuery({
    queryKey: ["leetcodeTelemetry"],
    queryFn: () => fetchLeetCodeTelemetry(),
    initialData: TELEMETRY_INITIAL.leetcode
  });

  const handleRefresh = () => {
    refetchGithub();
    refetchLeetCode();
  };

  return (
    <section id="telemetry" className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Activity className="w-4 h-4" />
              <span>Realtime Telemetry &amp; Metrics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Live Engineering <span className="text-gradient-cyan">Telemetry</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live API Sync Active</span>
            </div>

            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              title="Refresh Telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${githubRefetching ? "animate-spin text-cyan-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Telemetry Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* GitHub Live Metrics Widget */}
          <div className="lg:col-span-6 p-6 rounded-2xl glass-panel glass-panel-hover border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-900 text-white border border-white/10 shadow-md">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-zinc-100">GitHub Telemetry</h3>
                  <p className="text-xs font-mono text-zinc-400">@{githubData.username}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30">
                REST API
              </span>
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-zinc-950/50 border border-white/5">
                <div className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Repos</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {githubLoading ? "..." : githubData.publicRepos}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/50 border border-white/5">
                <div className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span>Stars</span>
                </div>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
                  {githubLoading ? "..." : githubData.totalStars}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/50 border border-white/5">
                <div className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>YoY Commits</span>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {githubLoading ? "..." : githubData.contributionsThisYear}
                </div>
              </div>
            </div>

            {/* Top Language Breakdown */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
                <span>Codebase Stack Distribution</span>
                <span className="text-indigo-400">TypeScript Primary</span>
              </div>
              <div className="h-3 w-full rounded-full bg-zinc-950 overflow-hidden flex p-0.5 border border-white/5">
                <div className="h-full bg-indigo-500 rounded-l-full" style={{ width: "48%" }} title="TypeScript 48%" />
                <div className="h-full bg-cyan-400" style={{ width: "24%" }} title="Python 24%" />
                <div className="h-full bg-emerald-400" style={{ width: "16%" }} title="Go 16%" />
                <div className="h-full bg-purple-400 rounded-r-full" style={{ width: "12%" }} title="Rust/C++ 12%" />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-zinc-400 pt-1">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" /> TypeScript (48%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Python (24%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Go (16%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400" /> Rust / C++ (12%)</span>
              </div>
            </div>

          </div>

          {/* LeetCode Problem Solving Telemetry Widget */}
          <div className="lg:col-span-6 p-6 rounded-2xl glass-panel glass-panel-hover border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-900 text-amber-400 border border-white/10 shadow-md">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-zinc-100">LeetCode Algorithmic Rating</h3>
                  <p className="text-xs font-mono text-zinc-400">@{leetcodeData.username}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-400 px-2.5 py-1 rounded-md bg-amber-950/40 border border-amber-500/30">
                Rank Awaiting
              </span>
            </div>

            {/* Total Solved & Contest Rating */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Total Solved</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    {leetcodeLoading ? "..." : leetcodeData.totalSolved}
                  </div>
                </div>
                <Award className="w-6 h-6 text-amber-400 opacity-80" />
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Contest Rating</div>
                  <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                    {leetcodeLoading ? "..." : leetcodeData.contestRating}
                  </div>
                </div>
                <div className="text-right text-[11px] font-mono text-zinc-500">Global #{leetcodeData.globalRanking}</div>
              </div>
            </div>

            {/* Difficulty Breakdown Bars */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              
              {/* Easy */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-emerald-400">Easy Solved</span>
                  <span className="text-zinc-300 font-bold">{leetcodeData.easy}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-950 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "75%" }} />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-400">Medium Solved</span>
                  <span className="text-zinc-300 font-bold">{leetcodeData.medium}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-950 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-rose-400">Hard Solved</span>
                  <span className="text-zinc-300 font-bold">{leetcodeData.hard}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-950 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "40%" }} />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* System Health Telemetry Footer Bar */}
        <div className="mt-6 p-4 rounded-xl bg-zinc-900/50 border border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Region: {TELEMETRY_INITIAL.systemStatus.region}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Edge Latency: {TELEMETRY_INITIAL.systemStatus.latencyMs}ms</span>
          </div>
          <div className="text-zinc-500">
            Node Status: <span className="text-emerald-400 font-bold">{TELEMETRY_INITIAL.systemStatus.nodeStatus}</span>
          </div>
          <div className="text-zinc-500">
            Last Deployed: {TELEMETRY_INITIAL.systemStatus.lastDeploy}
          </div>
        </div>

      </div>
    </section>
  );
}
