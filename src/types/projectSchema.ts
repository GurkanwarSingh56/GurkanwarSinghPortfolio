/**
 * Comprehensive JSON/CMS Schema for DevOS SaaS Projects
 * Designed for 100% reusability by AI RAG engines, voice synthesizers, and UI component renderers.
 */

export interface TechStackChoice {
  name: string;
  category: "frontend" | "backend" | "database" | "ai" | "infrastructure";
  reasonForChoice: string; // Reason for choosing each technology
  version?: string;
  officialDocsUrl?: string;
}

export interface ArchitectureNodeSpec {
  id: string;
  name: string;
  role: string;
  latency: string;
  throughput?: string;
}

export interface ArchitectureSpec {
  overview: string;
  systemFlow: string[];
  diagramUrl?: string;
  nodes: ArchitectureNodeSpec[];
}

export interface ChallengeResolution {
  title: string;
  detail: string;
  resolution: string;
}

export interface PerformanceMetricSpec {
  metric: string;
  value: string;
  benchmark: string;
  impact: string;
}

export interface TimelinePhase {
  phase: string;
  duration: string;
  deliverables: string[];
}

export interface MediaScreenshot {
  url: string;
  caption: string;
  altText: string;
}

export interface MediaVideo {
  url: string;
  posterUrl: string;
  title: string;
  durationSeconds: number;
}

export interface VoiceNarrationSpec {
  url: string;
  transcript: string;
  durationSeconds: number;
  narrator: string;
}

export interface ProjectMediaSpec {
  screenshots: MediaScreenshot[];
  images: { url: string; type: string; altText: string }[];
  videos: MediaVideo[];
  voiceNarration: VoiceNarrationSpec;
}

export interface ProjectCMS {
  id: string;
  title: string;
  subtitle: string;
  category: "AI & ML" | "Fullstack SaaS" | "Distributed Systems" | "Cloud & DevOps";
  featured: boolean;
  badgeColor: string;
  accentGradient: string;

  // Problem & Solution
  problem: string;
  solution: string;

  // Software Design & Architecture
  architecture: ArchitectureSpec;

  // Tech Stack & Rationale
  techStack: TechStackChoice[];

  // Links
  demoUrl: string;
  githubUrl: string;

  // Engineering Diagnostics
  challenges: ChallengeResolution[];
  futureScope: string[];
  lessonsLearned: string[];
  performanceMetrics: PerformanceMetricSpec[];

  // Metadata & Timeline
  tags: string[];
  timeline: TimelinePhase[];

  // Multimodal Media (Screenshots, Images, Videos, Voice Narration)
  media: ProjectMediaSpec;
}
