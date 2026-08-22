import { LiveTelemetryState, ContributionDay } from "@/types/liveTelemetry";

/**
 * Generates 52-week (364 days) GitHub contribution heatmap grid data
 */
export function generateContributionGrid(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    
    days.push({ date: dateStr, count: 0, level: 0 });
  }

  return days;
}

export const INITIAL_LIVE_TELEMETRY: LiveTelemetryState = {
  github: {
    publicRepos: 0,
    totalStars: 0,
    contributionsThisYear: 0,
    currentStreakDays: 0,
    latestCommit: {
      repoName: "Awaiting Live Connection",
      commitMessage: "Connect API to view",
      commitHash: "0000000",
      commitDate: "Just now",
      branch: "main",
      commitUrl: "#"
    },
    latestRepo: "Awaiting Connection",
    contributionDays: generateContributionGrid()
  },
  leetcode: {
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    ranking: 0,
    contestRating: 0
  },
  spotify: {
    isPlaying: false,
    songTitle: "Not playing",
    artist: "-",
    album: "-",
    albumArtUrl: "",
    trackUrl: "#"
  },
  weather: {
    location: "Mumbai / Remote",
    temperatureCelsius: 28,
    condition: "Haze & Clear Cyber Sky",
    humidityPct: 74,
    windSpeedKmh: 12
  },
  blog: []
};

export async function fetchLiveTelemetry(): Promise<LiveTelemetryState> {
  // Simulate sub-300ms live API refetch delay
  await new Promise((res) => setTimeout(res, 250));
  return INITIAL_LIVE_TELEMETRY;
}
