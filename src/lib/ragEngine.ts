import { DEVELOPER_PROFILE, SAAS_PROJECTS, SKILL_CATEGORIES, WORK_EXPERIENCES, TELEMETRY_INITIAL } from "@/data/portfolioData";

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
 * Single source of truth RAG Knowledge Base indexed from portfolio data
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
    content: `You can contact Gurkanwar Singh directly via email at ${DEVELOPER_PROFILE.socials.email}, GitHub at ${DEVELOPER_PROFILE.socials.github}, or LinkedIn at ${DEVELOPER_PROFILE.socials.linkedin}. He is actively available for Senior Staff / Principal level contract roles and technical discovery calls.`,
    targetModuleId: "contact"
  },

  // Telemetry & Metrics
  {
    id: "kb-telemetry-1",
    topic: "GitHub & Code Telemetry",
    keywords: ["github", "commits", "repos", "stars", "code", "streak", "metrics", "stats"],
    content: `GitHub Telemetry: ${TELEMETRY_INITIAL.github.publicRepos} public repositories, ${TELEMETRY_INITIAL.github.totalStars} total stars, ${TELEMETRY_INITIAL.github.contributionsThisYear}+ YoY commits, and a ${TELEMETRY_INITIAL.github.currentStreakDays}-day active commit streak. Primary language: TypeScript (48%), Python (24%), Go (16%), Rust/C++ (12%).`,
    targetModuleId: "telemetry"
  },
  {
    id: "kb-telemetry-2",
    topic: "LeetCode Algorithmic Rank",
    keywords: ["leetcode", "algorithm", "solved", "contest", "rating", "rank", "easy", "medium", "hard"],
    content: `LeetCode Telemetry: ${TELEMETRY_INITIAL.leetcode.totalSolved}+ problems solved (${TELEMETRY_INITIAL.leetcode.easy} Easy, ${TELEMETRY_INITIAL.leetcode.medium} Medium, ${TELEMETRY_INITIAL.leetcode.hard} Hard). Ranked in the Top 2.5% globally with a Contest Rating of ${TELEMETRY_INITIAL.leetcode.contestRating}.`,
    targetModuleId: "telemetry"
  },

  // Projects Knowledge
  {
    id: "kb-proj-1",
    topic: "NovaAgent AI Studio",
    keywords: ["novaagent", "ai studio", "agent", "llm", "multi-agent", "pinecone", "fastapi", "langchain", "rag"],
    content: `${SAAS_PROJECTS[0].title} (${SAAS_PROJECTS[0].subtitle}): ${SAAS_PROJECTS[0].longDescription} Key metrics: Token speed ${SAAS_PROJECTS[0].metrics[0].value}, Cost savings ${SAAS_PROJECTS[0].metrics[1].value}. Tech stack: Next.js 15, React 19, Three.js, Python FastAPI, Pinecone Vector DB.`,
    targetModuleId: "projects",
    targetProjectId: "antigravity-ai-studio"
  },
  {
    id: "kb-proj-2",
    topic: "PulseCloud Telemetry",
    keywords: ["pulsecloud", "telemetry", "clickhouse", "golang", "webgl", "go", "ingestion", "3d graph", "observability"],
    content: `${SAAS_PROJECTS[1].title} (${SAAS_PROJECTS[1].subtitle}): ${SAAS_PROJECTS[1].longDescription} Key metrics: Ingestion ${SAAS_PROJECTS[1].metrics[0].value}, P99 query speed ${SAAS_PROJECTS[1].metrics[1].value}, Compression ${SAAS_PROJECTS[1].metrics[2].value}. Tech stack: Go, ClickHouse DB, Three.js, WebSockets, Kubernetes.`,
    targetModuleId: "projects",
    targetProjectId: "hyperpulse-db-telemetry"
  },
  {
    id: "kb-proj-3",
    topic: "Nexus Infrastructure OS",
    keywords: ["nexus", "terraform", "hcl", "wasm", "rust", "cloud", "cost", "aws", "gcp"],
    content: `${SAAS_PROJECTS[2].title} (${SAAS_PROJECTS[2].subtitle}): ${SAAS_PROJECTS[2].longDescription} Key metrics: Cost reduction ${SAAS_PROJECTS[2].metrics[0].value}, HCL parsing ${SAAS_PROJECTS[2].metrics[1].value}. Tech stack: Next.js 15, Rust WebAssembly, Terraform HCL parser, Zustand.`,
    targetModuleId: "projects",
    targetProjectId: "nexus-cloud-visualizer"
  },

  // Tech Stack & Skills
  {
    id: "kb-tech-1",
    topic: "Primary Technical Stack & Skills",
    keywords: ["skills", "stack", "react", "next.js", "typescript", "tailwind", "three.js", "frontend", "backend", "python", "golang", "postgres", "firebase"],
    content: `Core Technical Stack: Next.js 15 (96%), React 19 (98%), TypeScript (95%), Tailwind CSS v4 (96%), Three.js/R3F (88%), Python FastAPI (90%), Go (86%), PostgreSQL (94%), Firebase Firestore (92%), and Pinecone Vector DB (88%).`,
    targetModuleId: "tech-matrix"
  },
  {
    id: "kb-tech-2",
    topic: "Architecture Pipeline & Infrastructure",
    keywords: ["architecture", "pipeline", "edge", "latency", "microservice", "fastapi", "firestore", "vercel", "aws"],
    content: `Architecture Pipeline: 1. Vercel Edge Gateway (12ms) -> 2. FastAPI/Go High-Concurrency API Mesh (28ms) -> 3. LangChain + Pinecone Vector RAG Pipeline (65ms) -> 4. PostgreSQL + Firebase Firestore Datastore (4.1ms) -> 5. Realtime Telemetry WebSocket Feed.`,
    targetModuleId: "tech-matrix"
  },

  // Work History & Experience
  {
    id: "kb-exp-1",
    topic: "Work Experience & Career History",
    keywords: ["experience", "career", "history", "job", "devos", "cloudscale", "hyperion", "senior staff", "lead engineer"],
    content: `Career Timeline: 1. Senior Staff Engineer & Architect @ DevOS Technologies (2023-Present) - Architected platform for 1.2M+ active API users, reduced p99 latency to 85ms. 2. Lead Fullstack Engineer @ CloudScale Systems (2021-2023) - Built WebGL 3D dependency graph for 10,000+ nodes. 3. Senior Frontend Engineer @ Hyperion Digital (2019-2021) - 100/100 Lighthouse performance & WCAG AA design system.`,
    targetModuleId: "experience"
  }
];

/**
 * Strict RAG Query Engine returning zero-hallucination grounded responses
 */
export function queryDigitalTwinRAG(userQuery: string): RAGResult {
  const queryLower = userQuery.toLowerCase().trim();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);

  // Score knowledge chunks based on keyword matches
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
      answer: `I am Gurkanwar Singh's AI Digital Twin. I only answer questions strictly grounded in Gurkanwar's verified portfolio data to prevent hallucinations. You can ask me about his Next.js 15 / React 19 tech stack, SaaS projects (NovaAgent, PulseCloud, Nexus OS), GitHub & LeetCode stats, or career history.`,
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
