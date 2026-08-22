import { DEVELOPER_PROFILE, SKILL_CATEGORIES, WORK_EXPERIENCES, TELEMETRY_INITIAL } from "@/data/portfolioData";
import { indexCmsProjectsForAI } from "@/lib/cmsParser";

export interface KnowledgeChunk {
  id: string;
  topic: string;
  keywords: string[];
  content: string;
  targetModuleId?: string;
  targetProjectId?: string;
}

export interface RAGResult {
  answer: string;
  confidence: number;
  sources: string[];
  targetModuleId?: string;
  targetProjectId?: string;
}

/**
 * Single source of truth RAG Knowledge Base indexed from portfolio data & CMS schema
 */
export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // Developer Profile & Bio
  {
    id: "kb-profile-1",
    topic: "Developer Profile & Title",
    keywords: ["name", "who", "title", "role", "gurkanwar", "singh", "bio", "background", "about"],
    content: `${DEVELOPER_PROFILE.name} is a ${DEVELOPER_PROFILE.title}. ${DEVELOPER_PROFILE.bio} Location: ${DEVELOPER_PROFILE.location}. Availability: ${DEVELOPER_PROFILE.availabilityStatus}.`,
    targetModuleId: "hero"
  },
  {
    id: "kb-profile-2",
    topic: "Contact & Hiring",
    keywords: ["contact", "hire", "email", "email address", "reach", "consulting", "contract", "linkedin", "github"],
    content: `You can contact Gurkanwar Singh directly via email at ${DEVELOPER_PROFILE.socials.email}, GitHub at ${DEVELOPER_PROFILE.socials.github}, or LinkedIn at ${DEVELOPER_PROFILE.socials.linkedin}. He is actively open to full-stack development opportunities and technical roles.`,
    targetModuleId: "contact"
  },

  // Telemetry & Metrics
  {
    id: "kb-telemetry-1",
    topic: "GitHub & Code Telemetry",
    keywords: ["github", "commits", "repos", "stars", "code", "streak", "metrics", "stats"],
    content: `GitHub Telemetry: Currently awaiting live connection to display real metrics. Once connected, it will show public repositories, total stars, YoY commits, and active commit streak.`,
    targetModuleId: "telemetry"
  },
  {
    id: "kb-telemetry-2",
    topic: "LeetCode Algorithmic Rank",
    keywords: ["leetcode", "algorithm", "solved", "contest", "rating", "rank", "easy", "medium", "hard"],
    content: `LeetCode Telemetry: Currently awaiting live connection to display real algorithmic metrics and global ranking.`,
    targetModuleId: "telemetry"
  },

  // Rich CMS Project Chunks (NovaAgent, PulseCloud, Nexus OS, etc.)
  ...indexCmsProjectsForAI(),

  // Tech Stack & Skills
  {
    id: "kb-tech-1",
    topic: "Primary Technical Stack & Skills",
    keywords: ["skills", "stack", "react", "next.js", "typescript", "tailwind", "three.js", "frontend", "backend", "python", "golang", "postgres", "firebase"],
    content: `Core Technical Stack: Exploring and building with Next.js, React, Tailwind CSS, Node.js, and web technologies.`,
    targetModuleId: "tech-matrix"
  },
  {
    id: "kb-tech-2",
    topic: "Architecture Pipeline & Infrastructure",
    keywords: ["architecture", "pipeline", "edge", "latency", "microservice", "fastapi", "firestore", "vercel", "aws"],
    content: `Architecture Pipeline: Currently building practical architectures for full-stack SaaS projects. Detailed verified architecture data coming soon.`,
    targetModuleId: "tech-matrix"
  },

  // Work History & Experience
  {
    id: "kb-exp-1",
    topic: "Work Experience & Career History",
    keywords: ["experience", "career", "history", "job", "student", "technovate"],
    content: `Career Timeline: 4th-year B.Tech CSE student building practical web applications, exploring modern technologies, and leading technical initiatives through the Technovate community.`,
    targetModuleId: "experience"
  }
];

/**
 * Strict RAG Query Engine returning zero-hallucination grounded responses
 */
export function queryDigitalTwinRAG(userQuery: string): RAGResult {
  const queryLower = userQuery.toLowerCase().trim();
  const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 2);

  let bestChunk: KnowledgeChunk | null = null;
  let maxScore = 0;
  const matchedSources: string[] = [];

  for (let i = 0; i < KNOWLEDGE_BASE.length; i++) {
    const chunk = KNOWLEDGE_BASE[i];
    let score = 0;

    for (let k = 0; k < chunk.keywords.length; k++) {
      const keyword = chunk.keywords[k];
      if (queryLower.includes(keyword)) {
        score += 3;
      } else {
        for (let w = 0; w < queryWords.length; w++) {
          const word = queryWords[w];
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 1;
          }
        }
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestChunk = chunk;
    }
  }

  if (!bestChunk) {
    return {
      answer: `I am Gurkanwar Singh's AI Digital Twin. I only answer questions strictly grounded in Gurkanwar's verified portfolio data and CMS project schemas. Ask me about project problem statements, tech stack choices, performance benchmarks, or lessons learned.`,
      confidence: 0,
      sources: ["Portfolio Verification Guardrail"]
    };
  }

  const foundChunk: KnowledgeChunk = bestChunk;
  matchedSources.push(foundChunk.topic);

  return {
    answer: foundChunk.content,
    confidence: Math.min(Math.round((maxScore / 9) * 100), 98),
    sources: matchedSources,
    targetModuleId: foundChunk.targetModuleId,
    targetProjectId: foundChunk.targetProjectId
  };
}
