import { TELEMETRY_INITIAL } from "@/data/portfolioData";

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  acceptanceRate: string;
  globalRanking: number;
  contestRating: number;
}

export async function fetchLeetCodeTelemetry(username: string = "gurkanwarsingh"): Promise<LeetCodeStats> {
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      return TELEMETRY_INITIAL.leetcode;
    }

    const data = await res.json();
    if (data.status === "error" || !data.totalSolved) {
      return TELEMETRY_INITIAL.leetcode;
    }

    return {
      username,
      totalSolved: data.totalSolved || TELEMETRY_INITIAL.leetcode.totalSolved,
      easy: data.easySolved || TELEMETRY_INITIAL.leetcode.easy,
      medium: data.mediumSolved || TELEMETRY_INITIAL.leetcode.medium,
      hard: data.hardSolved || TELEMETRY_INITIAL.leetcode.hard,
      acceptanceRate: `${data.acceptanceRate || 68.4}%`,
      globalRanking: data.ranking || TELEMETRY_INITIAL.leetcode.globalRanking,
      contestRating: TELEMETRY_INITIAL.leetcode.contestRating
    };
  } catch {
    return TELEMETRY_INITIAL.leetcode;
  }
}
