/**
 * Project Narrative Storyteller Types
 * Defines the 11-chapter interactive case study data model.
 */

export interface NarrativeChapter {
  chapterNumber: number;
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  summary: string;
}

export interface ProblemChapter extends NarrativeChapter {
  painPoints: string[];
  impactOnUsers: string;
  industryContext: string;
}

export interface ResearchChapter extends NarrativeChapter {
  userPersona: string;
  keyFindings: string[];
  competitorGaps: string[];
}

export interface PlanningChapter extends NarrativeChapter {
  sprintMilestones: { phase: string; focus: string; duration: string }[];
  technicalRequirements: string[];
}

export interface WireframeChapter extends NarrativeChapter {
  layoutConcept: string;
  designTokensUsed: string[];
  prototypeNotes: string;
}

export interface ArchitectureChapter extends NarrativeChapter {
  overview: string;
  nodes: { id: string; name: string; role: string; latency: string }[];
  dataFlowSteps: string[];
}

export interface CodeSnippetSpec {
  fileName: string;
  language: string;
  code: string;
  explanation: string;
}

export interface ImplementationChapter extends NarrativeChapter {
  codeSnippets: CodeSnippetSpec[];
  keyModulesBuilt: string[];
}

export interface ChallengeItem {
  title: string;
  symptom: string;
  rootCause: string;
  resolution: string;
}

export interface ChallengesChapter extends NarrativeChapter {
  challengesList: ChallengeItem[];
}

export interface OptimizationItem {
  technique: string;
  beforeValue: string;
  afterValue: string;
  improvementPercentage: string;
}

export interface OptimizationsChapter extends NarrativeChapter {
  optimizationsList: OptimizationItem[];
}

export interface BenchmarkResultItem {
  metricName: string;
  valueAchieved: string;
  industryAverage: string;
  businessImpact: string;
}

export interface ResultsChapter extends NarrativeChapter {
  resultsList: BenchmarkResultItem[];
}

export interface RetrospectiveChapter extends NarrativeChapter {
  lessons: string[];
  whatWentWell: string[];
}

export interface FutureImprovementsChapter extends NarrativeChapter {
  roadmapItems: string[];
  nextMilestones: string[];
}

export interface ProjectStory {
  id: string;
  title: string;
  tagline: string;
  category: string;
  featuredDemoUrl: string;
  githubUrl: string;
  voiceTranscript: string;
  narrationDurationSeconds: number;

  ch1_problem: ProblemChapter;
  ch2_research: ResearchChapter;
  ch3_planning: PlanningChapter;
  ch4_wireframes: WireframeChapter;
  ch5_architecture: ArchitectureChapter;
  ch6_implementation: ImplementationChapter;
  ch7_challenges: ChallengesChapter;
  ch8_optimizations: OptimizationsChapter;
  ch9_results: ResultsChapter;
  ch10_lessons: RetrospectiveChapter;
  ch11_future: FutureImprovementsChapter;
}
