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
    
    // Simulate commit distribution with active streak pattern
    const rand = Math.random();
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (rand > 0.35) {
      count = Math.floor(Math.random() * 12) + 1;
      if (count > 9) level = 4;
      else if (count > 6) level = 3;
      else if (count > 3) level = 2;
      else level = 1;
    }

    days.push({ date: dateStr, count, level });
  }

  return days;
}

export const INITIAL_LIVE_TELEMETRY: LiveTelemetryState = {
  github: {
    publicRepos: 48,
    totalStars: 620,
    contributionsThisYear: 2840,
    currentStreakDays: 45,
    latestCommit: {
      repoName: "novaagent-studio",
      commitMessage: "feat: integrate sub-120ms vector RAG token streaming",
      commitHash: "890980c",
      commitDate: "12 mins ago",
      branch: "main",
      commitUrl: "https://github.com/gurkanwarsingh/novaagent-studio/commit/890980c"
    },
    latestRepo: "novaagent-studio",
    contributionDays: generateContributionGrid()
  },
  leetcode: {
    totalSolved: 852,
    easy: 290,
    medium: 442,
    hard: 120,
    ranking: 14250,
    contestRating: 1985
  },
  spotify: {
    isPlaying: true,
    songTitle: "Midnight Coding Session (Lofi Synthwave)",
    artist: "ChilledCow & DevOS Audio Labs",
    album: "Deep Focus Architecture Vol. 4",
    albumArtUrl: "/images/spotify-album.jpg",
    trackUrl: "https://open.spotify.com"
  },
  weather: {
    location: "Mumbai / Remote",
    temperatureCelsius: 28,
    condition: "Haze & Clear Cyber Sky",
    humidityPct: 74,
    windSpeedKmh: 12
  },
  blog: [
    {
      id: "blog-1",
      title: "Building Sub-120ms LLM RAG Vector Systems with Pinecone & FastAPI",
      readTime: "6 min read",
      publishedDate: "Aug 2026",
      summary: "Architecting zero-hallucination vector similarity pipelines streaming tokens over WebSockets.",
      url: "https://medium.com",
      tags: ["AI", "RAG", "FastAPI", "Python"]
    },
    {
      id: "blog-2",
      title: "WebGL Memory Leak Disposal Patterns in Three.js & React 19",
      readTime: "8 min read",
      publishedDate: "Jul 2026",
      summary: "How we eliminated GPU VRAM leaks in 10,000-node dynamic 3D dependency graphs.",
      url: "https://medium.com",
      tags: ["Three.js", "WebGL", "React 19"]
    }
  ]
};

export async function fetchLiveTelemetry(): Promise<LiveTelemetryState> {
  // Simulate sub-300ms live API refetch delay
  await new Promise((res) => setTimeout(res, 250));
  return INITIAL_LIVE_TELEMETRY;
}
