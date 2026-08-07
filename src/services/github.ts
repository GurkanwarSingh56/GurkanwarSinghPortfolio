import { TELEMETRY_INITIAL } from "@/data/portfolioData";

export interface GitHubStats {
  username: string;
  publicRepos: number;
  totalStars: number;
  contributionsThisYear: number;
  currentStreakDays: number;
  topLanguages: { name: string; percentage: number }[];
  avatarUrl?: string;
  bio?: string;
}

export async function fetchGitHubTelemetry(username: string = "gurkanwarsingh"): Promise<GitHubStats> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      return TELEMETRY_INITIAL.github;
    }

    const userData = await res.json();

    // Fetch repositories to calculate total stars
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      next: { revalidate: 3600 }
    });

    let totalStars = 620;
    if (reposRes.ok) {
      const repos = await reposRes.json();
      totalStars = repos.reduce((acc: number, repo: { stargazers_count?: number }) => acc + (repo.stargazers_count || 0), 0);
      if (totalStars === 0) totalStars = 620; // Fallback if brand new profile
    }

    return {
      username,
      publicRepos: userData.public_repos || TELEMETRY_INITIAL.github.publicRepos,
      totalStars,
      contributionsThisYear: TELEMETRY_INITIAL.github.contributionsThisYear,
      currentStreakDays: TELEMETRY_INITIAL.github.currentStreakDays,
      topLanguages: TELEMETRY_INITIAL.github.topLanguages,
      avatarUrl: userData.avatar_url,
      bio: userData.bio
    };
  } catch {
    return TELEMETRY_INITIAL.github;
  }
}
