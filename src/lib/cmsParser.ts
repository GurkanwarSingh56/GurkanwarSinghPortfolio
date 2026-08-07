import { ProjectCMS } from "@/types/projectSchema";
import projectsJson from "@/data/projectsCms.json";

/**
 * Validates and retrieves all projects matching the ProjectCMS schema.
 */
export function getAllCmsProjects(): ProjectCMS[] {
  return projectsJson as ProjectCMS[];
}

/**
 * Retrieves a single project by ID conforming to the ProjectCMS schema.
 */
export function getCmsProjectById(id: string): ProjectCMS | undefined {
  const projects = getAllCmsProjects();
  return projects.find((p) => p.id === id);
}

/**
 * Indexes CMS projects into RAG Knowledge Chunks for AI Digital Twin retrieval
 */
export function indexCmsProjectsForAI(): { id: string; topic: string; content: string; keywords: string[]; targetProjectId: string }[] {
  const projects = getAllCmsProjects();
  return projects.map((p) => ({
    id: `rag-cms-${p.id}`,
    topic: `${p.title} (${p.category})`,
    keywords: [p.title.toLowerCase(), p.id, ...p.tags.map((t) => t.toLowerCase())],
    content: `
Project Title: ${p.title} (${p.subtitle})
Category: ${p.category}
Problem Statement: ${p.problem}
Architectural Solution: ${p.solution}
Architecture Overview: ${p.architecture.overview}
System Data Flow: ${p.architecture.systemFlow.join(" -> ")}
Technologies & Choice Rationale: ${p.techStack.map((t) => `${t.name} (${t.reasonForChoice})`).join("; ")}
Key Challenges & Resolutions: ${p.challenges.map((c) => `${c.title}: ${c.detail} -> ${c.resolution}`).join("; ")}
Lessons Learned: ${p.lessonsLearned.join("; ")}
Future Scope: ${p.futureScope.join("; ")}
Performance Metrics: ${p.performanceMetrics.map((m) => `${m.metric}: ${m.value} (${m.impact})`).join("; ")}
Demo URL: ${p.demoUrl}
GitHub URL: ${p.githubUrl}
    `.trim(),
    targetProjectId: p.id
  }));
}
