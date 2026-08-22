export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "AI & ML" | "Fullstack SaaS" | "Distributed Systems" | "Cloud & DevOps";
  description: string;
  longDescription: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  architectureHighlights: string[];
  challengesSolved: string;
  featured: boolean;
  demoUrl: string;
  githubUrl: string;
  badgeColor: string;
  accentGradient: string;
  systemFlow: string[];
}

export interface SkillCategory {
  category: "Frontend & UI/UX" | "Backend & Microservices" | "AI / Machine Learning" | "Cloud & Infrastructure" | "Databases & Storage";
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
    tags: string[];
    isPrimary?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  keyMetrics: string[];
  technologies: string[];
  achievements: string[];
}

export interface ArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  type: "gateway" | "compute" | "ai-engine" | "database" | "telemetry";
  status: "optimal" | "active" | "standby";
  latency: string;
  throughput: string;
  details: string;
}

export const DEVELOPER_PROFILE = {
  name: "Gurkanwar Singh",
  title: "Computer Science Student · Full-Stack Developer · Technical Community Leader",
  handle: "@gurkanwarsingh",
  location: "India",
  availabilityStatus: "Open to opportunities",
  statusColor: "emerald",
  bio: "4th-year B.Tech CSE student building practical web applications, exploring modern technologies, and leading technical initiatives through Technovate.",
  tagline: "I build, learn, teach, and lead — turning ideas into working technology.",
  metrics: [
    { label: "GitHub Commits", value: "Awaiting live connection", detail: "Real data coming soon" },
    { label: "LeetCode Solved", value: "Awaiting live connection", detail: "Real data coming soon" },
    { label: "Projects", value: "5", detail: "Active repositories" }
  ],
  socials: {
    github: "https://github.com/GurkanwarSingh56",
    linkedin: "https://linkedin.com/in/gurkanwarsingh",
    twitter: "https://x.com/gurkanwar_dev",
    email: "contact@harryharvey.in",
    resume: "/resume.pdf"
  }
};

export const TELEMETRY_INITIAL = {
  github: {
    username: "GurkanwarSingh56",
    publicRepos: "Awaiting connection",
    totalStars: "Awaiting connection",
    contributionsThisYear: "Awaiting connection",
    currentStreakDays: "Awaiting connection",
    topLanguages: []
  },
  leetcode: {
    username: "gurkanwarsingh",
    totalSolved: "Awaiting connection",
    easy: "Awaiting connection",
    medium: "Awaiting connection",
    hard: "Awaiting connection",
    acceptanceRate: "Awaiting connection",
    globalRanking: "Awaiting connection",
    contestRating: "Awaiting connection"
  },
  systemStatus: {
    region: "ap-south-1 (Mumbai)",
    latencyMs: "Awaiting connection",
    nodeStatus: "ONLINE",
    activeSessions: "Awaiting connection",
    lastDeploy: "Recently"
  }
};

export const SAAS_PROJECTS: Project[] = [
  {
    id: "technovate-website",
    title: "Technovate Website",
    subtitle: "Events Platform for Technovate Club",
    category: "Fullstack SaaS",
    description: "Official event and community platform for Technovate.",
    longDescription: "Data unavailable. Detailed project case study coming soon.",
    metrics: [],
    techStack: ["Next.js", "React", "Tailwind CSS"],
    architectureHighlights: ["Data unavailable"],
    challengesSolved: "Data unavailable",
    featured: true,
    demoUrl: "https://technovateclub.vercel.app/",
    githubUrl: "https://github.com/GurkanwarSingh56/Orientation",
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
    accentGradient: "from-cyan-500 to-indigo-600",
    systemFlow: []
  },
  {
    id: "learning-curve-academy",
    title: "Learning Curve Academy",
    subtitle: "Educational Platform",
    category: "Fullstack SaaS",
    description: "Web application for Learning Curve Academy.",
    longDescription: "Data unavailable. Detailed project case study coming soon.",
    metrics: [],
    techStack: ["React", "Web Technologies"],
    architectureHighlights: ["Data unavailable"],
    challengesSolved: "Data unavailable",
    featured: true,
    demoUrl: "https://learing-curve-academy.vercel.app/",
    githubUrl: "https://github.com/GurkanwarSingh56/learingCurveAcademy",
    badgeColor: "border-indigo-500/40 text-indigo-400 bg-indigo-950/30",
    accentGradient: "from-indigo-500 to-violet-600",
    systemFlow: []
  },
  {
    id: "travelflow",
    title: "TravelFlow",
    subtitle: "Travel Training Project",
    category: "Fullstack SaaS",
    description: "A final project focused on travel experiences.",
    longDescription: "Data unavailable. Detailed project case study coming soon.",
    metrics: [],
    techStack: ["Web Technologies"],
    architectureHighlights: ["Data unavailable"],
    challengesSolved: "Data unavailable",
    featured: true,
    demoUrl: "https://travelflow-psi.vercel.app/",
    githubUrl: "https://github.com/GurkanwarSingh56/final_project_training",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    accentGradient: "from-emerald-500 to-teal-600",
    systemFlow: []
  },
  {
    id: "technovate-alt",
    title: "Technovate",
    subtitle: "Alternative Technovate Project",
    category: "Fullstack SaaS",
    description: "Secondary repository for Technovate initiatives.",
    longDescription: "Data unavailable. Detailed project case study coming soon.",
    metrics: [],
    techStack: ["Web Technologies"],
    architectureHighlights: ["Data unavailable"],
    challengesSolved: "Data unavailable",
    featured: false,
    demoUrl: "https://techonovate.vercel.app/",
    githubUrl: "https://github.com/GurkanwarSingh56/techonovate",
    badgeColor: "border-violet-500/40 text-violet-400 bg-violet-950/30",
    accentGradient: "from-violet-500 to-fuchsia-600",
    systemFlow: []
  },
  {
    id: "erp-system",
    title: "ERP System",
    subtitle: "Enterprise Resource Planning",
    category: "Distributed Systems",
    description: "An ERP system currently in development.",
    longDescription: "Data unavailable. Detailed project case study coming soon.",
    metrics: [],
    techStack: ["Web Technologies"],
    architectureHighlights: ["Data unavailable"],
    challengesSolved: "Data unavailable",
    featured: false,
    demoUrl: "",
    githubUrl: "https://github.com/GurkanwarSingh56/ERPSystem",
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-950/30",
    accentGradient: "from-amber-500 to-orange-600",
    systemFlow: []
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend & UI/UX",
    iconName: "Layout",
    description: "Building responsive, modern user interfaces.",
    skills: [
      { name: "Next.js", level: 0, experience: "Student", tags: ["Web"] },
      { name: "React", level: 0, experience: "Student", tags: ["Web"] },
      { name: "Tailwind CSS", level: 0, experience: "Student", tags: ["Styling"] }
    ]
  },
  {
    category: "Backend & Microservices",
    iconName: "Server",
    description: "Server-side programming and API design.",
    skills: [
      { name: "Node.js", level: 0, experience: "Student", tags: ["Backend"] }
    ]
  }
];

export const WORK_EXPERIENCES: ExperienceItem[] = [
  // Empty until verified information is provided
];

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  // Empty until verified architecture data is provided
];

export const TERMINAL_COMMANDS_HELP = [
  { cmd: "help", desc: "Display available CLI commands & keyboard shortcuts" },
  { cmd: "bio", desc: "Print summary of Gurkanwar Singh's background & experience" },
  { cmd: "skills", desc: "List core technical matrix and stack proficiencies" },
  { cmd: "projects", desc: "Show active featured SaaS applications & metrics" },
  { cmd: "telemetry", desc: "Fetch live GitHub and LeetCode operational stats" },
  { cmd: "experience", desc: "Display career trajectory and key achievements" },
  { cmd: "contact", desc: "Launch direct contact modal & copy email address" },
  { cmd: "sound", desc: "Toggle tactile UI sound effects (on/off)" },
  { cmd: "clear", desc: "Clear terminal console buffer" },
  { cmd: "sudo hire", desc: "Trigger instant priority recruitment sequence 🚀" }
];
