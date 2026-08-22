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
    publicRepos: 0,
    totalStars: 0,
    contributionsThisYear: 0,
    currentStreakDays: 0,
    topLanguages: []
  },
  leetcode: {
    username: "gurkanwarsingh",
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    acceptanceRate: "0%",
    globalRanking: 0,
    contestRating: 0
  },
  systemStatus: {
    region: "ap-south-1 (Mumbai)",
    latencyMs: 0,
    nodeStatus: "ONLINE",
    activeSessions: 0,
    lastDeploy: "Recently"
  }
};

export const SAAS_PROJECTS: Project[] = [
  {
    id: "technovate-website",
    title: "Technovate Orientation",
    subtitle: "Technical Club Management Platform",
    category: "Fullstack SaaS",
    description: "Centralized platform for the Technical Innovation Club to manage events, registrations, and club member interactions.",
    longDescription: "A Next.js 14 App Router application structuring public pages, authenticated areas, and member dashboards to centralize technical club activities and eliminate fragmented communication channels.",
    metrics: [
      { label: "Active Members", value: "300+" },
      { label: "Events Managed", value: "25+" }
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    architectureHighlights: [
      "Modular Next.js 14 App Router",
      "Route Grouping for Authentication and Dashboards",
      "Secure Server Components",
      "Tailwind Utility-first Styling"
    ],
    challengesSolved: "Designed a cohesive schema for managing entities in a dedicated database to eliminate fragmented spreadsheet data.",
    featured: true,
    demoUrl: "https://technovateclub.vercel.app/",
    githubUrl: "https://github.com/GurkanwarSingh56/Orientation",
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
    accentGradient: "from-cyan-500 to-indigo-600",
    systemFlow: [
      "Public Website",
      "Authentication Middleware",
      "Next.js API Routes",
      "Database Layer"
    ]
  },
  {
    id: "learning-curve-academy",
    title: "Learning Curve Academy",
    subtitle: "Educational Learning Platform",
    category: "Fullstack SaaS",
    description: "An interactive educational web platform designed to facilitate student learning and course management.",
    longDescription: "A comprehensive educational platform built with modern web technologies to streamline the delivery of online courses, student tracking, and interactive learning experiences.",
    metrics: [
      { label: "Courses", value: "15+" },
      { label: "Students", value: "1.2k" }
    ],
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    architectureHighlights: [
      "React Single Page Application",
      "RESTful API Service",
      "Role-Based Access Control",
      "Document Database Modeling"
    ],
    challengesSolved: "Architected a scalable backend to handle concurrent video streaming and real-time student progress tracking.",
    featured: true,
    demoUrl: "https://learing-curve-academy.vercel.app/",
    githubUrl: "https://github.com/GurkanwarSingh56/learingCurveAcademy",
    badgeColor: "border-indigo-500/40 text-indigo-400 bg-indigo-950/30",
    accentGradient: "from-indigo-500 to-violet-600",
    systemFlow: [
      "React Client",
      "Express API",
      "Authentication",
      "MongoDB Storage"
    ]
  },
  {
    id: "travelflow",
    title: "TravelFlow",
    subtitle: "Complete Travel Booking Ecosystem",
    category: "Fullstack SaaS",
    description: "A unified, full-stack travel booking platform with intelligent round-trip combinations and multi-city search.",
    longDescription: "React 19 single-page application utilizing Vite, consuming RESTful APIs powered by an Express.js backend connected to MongoDB. Solves fragmented travel booking experiences.",
    metrics: [
      { label: "API Endpoints", value: "40+" },
      { label: "Integrations", value: "3" }
    ],
    techStack: ["React 19", "Vite", "Express.js", "MongoDB"],
    architectureHighlights: [
      "React 19 + Vite Frontend",
      "Express.js Business Logic Layer",
      "MongoDB Atlas Document Database",
      "Intelligent Combination Algorithm"
    ],
    challengesSolved: "Engineered a combination algorithm that analyzes outbound/return arrays to calculate optimal price and total duration metrics.",
    featured: true,
    demoUrl: "https://travelflow-psi.vercel.app/",
    githubUrl: "https://github.com/GurkanwarSingh56/final_project_training",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    accentGradient: "from-emerald-500 to-teal-600",
    systemFlow: [
      "React SPA",
      "API Service Layer",
      "Express Server",
      "MongoDB Atlas"
    ]
  },
  {
    id: "technovate-alt",
    title: "Technovate Platform",
    subtitle: "Club Innovation Portal",
    category: "Fullstack SaaS",
    description: "The main portal and presentation website for the Technovate Technical Innovation Club.",
    longDescription: "Brings technical club activities into a single web application, covering project showcases, event announcements, and collaborative learning resources.",
    metrics: [
      { label: "Page Views", value: "2.5k" },
      { label: "Load Time", value: "<1s" }
    ],
    techStack: ["Next.js", "Tailwind CSS", "Vercel"],
    architectureHighlights: [
      "Next.js App Router",
      "Server-Side Rendering",
      "Tailwind Utility System",
      "Vercel Edge Network"
    ],
    challengesSolved: "Centralized club data and announcements to prevent fragmentation across various social channels.",
    featured: false,
    demoUrl: "https://techonovate.vercel.app/",
    githubUrl: "https://github.com/GurkanwarSingh56/techonovate",
    badgeColor: "border-violet-500/40 text-violet-400 bg-violet-950/30",
    accentGradient: "from-violet-500 to-fuchsia-600",
    systemFlow: [
      "Client Browser",
      "Next.js Edge",
      "Data Fetching",
      "UI Rendering"
    ]
  },
  {
    id: "erp-system",
    title: "College ERP System",
    subtitle: "Enterprise Resource Planning",
    category: "Distributed Systems",
    description: "A modern, secure, and scalable College ERP for managing students, faculty, attendance, fees, and academic marks.",
    longDescription: "Built with Next.js and Supabase, it leverages Server Components and Server Actions backed by PostgreSQL Row Level Security (RLS) to enforce data privacy and access control.",
    metrics: [
      { label: "RLS Coverage", value: "100%" },
      { label: "Active Modules", value: "5" }
    ],
    techStack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript"],
    architectureHighlights: [
      "Next.js Server Components & Routing",
      "Next.js Server Actions Validation",
      "Supabase Authentication",
      "PostgreSQL Row Level Security (RLS)"
    ],
    challengesSolved: "Implemented comprehensive Role-Based Access Control (RBAC) combined with PostgreSQL Row Level Security to strictly segregate faculty and student data.",
    featured: true,
    demoUrl: "",
    githubUrl: "https://github.com/GurkanwarSingh56/ERPSystem",
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-950/30",
    accentGradient: "from-amber-500 to-orange-600",
    systemFlow: [
      "User Interface",
      "Next.js Server Actions",
      "Supabase Auth",
      "PostgreSQL RLS Database"
    ]
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
  {
    id: "client-ui",
    title: "1. Next.js App Router (UI)",
    subtitle: "React Server Components",
    type: "gateway",
    status: "active",
    latency: "0ms",
    throughput: "High",
    details: "The client interface where teachers submit attendance and admins manage students. Built with Next.js App Router, Tailwind CSS, and shadcn/ui for optimal rendering performance."
  },
  {
    id: "server-action",
    title: "2. Server Actions & Zod",
    subtitle: "Validation & Middleware",
    type: "compute",
    status: "active",
    latency: "15ms",
    throughput: "High",
    details: "Incoming form data is intercepted by Next.js Server Actions. Payloads are strictly validated using Zod before any database connection is attempted."
  },
  {
    id: "auth-layer",
    title: "3. Supabase Auth",
    subtitle: "Session Management",
    type: "telemetry",
    status: "active",
    latency: "30ms",
    throughput: "Medium",
    details: "Verifies the user's JWT token and establishes their role (Teacher, Student, HOD, Admin) to be passed into the PostgreSQL connection context."
  },
  {
    id: "database-rls",
    title: "4. PostgreSQL + RLS",
    subtitle: "Row Level Security Engine",
    type: "database",
    status: "active",
    latency: "10ms",
    throughput: "High",
    details: "The database evaluates the query against Row Level Security policies. For example, it ensures a teacher can only insert attendance for subjects they are mapped to in the teacher_subjects table."
  }
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
