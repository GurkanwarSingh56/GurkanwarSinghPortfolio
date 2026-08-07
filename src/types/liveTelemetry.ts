/**
 * Live Telemetry Control Center Data Contracts
 * Defines Spotify, GitHub Commit, Contribution Graph, and Blog type definitions.
 */

export interface SpotifyStatus {
  isPlaying: boolean;
  songTitle: string;
  artist: string;
  album: string;
  albumArtUrl: string;
  trackUrl: string;
}

export interface LatestCommitSpec {
  repoName: string;
  commitMessage: string;
  commitHash: string;
  commitDate: string;
  branch: string;
  commitUrl: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // Heatmap intensity
}

export interface BlogArticleSpec {
  id: string;
  title: string;
  readTime: string;
  publishedDate: string;
  summary: string;
  url: string;
  tags: string[];
}

export interface LiveTelemetryState {
  github: {
    publicRepos: number;
    totalStars: number;
    contributionsThisYear: number;
    currentStreakDays: number;
    latestCommit: LatestCommitSpec;
    latestRepo: string;
    contributionDays: ContributionDay[];
  };
  leetcode: {
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    ranking: number;
    contestRating: number;
  };
  spotify: SpotifyStatus;
  weather: {
    location: string;
    temperatureCelsius: number;
    condition: string;
    humidityPct: number;
    windSpeedKmh: number;
  };
  blog: BlogArticleSpec[];
}
