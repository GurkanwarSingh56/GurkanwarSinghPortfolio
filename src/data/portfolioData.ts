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
  title: "Senior Staff Software Engineer & Systems Architect",
  handle: "@gurkanwarsingh",
  location: "India / Remote Worldwide",
  availabilityStatus: "Available for High-Impact Contracts & Staff Roles",
  statusColor: "emerald",
  bio: "Senior Staff Engineer with 8+ years architecting fault-tolerant microservices, real-time AI agents, distributed telemetry pipelines, and high-performance Web application platforms.",
  tagline: "Engineering resilient SaaS platforms & autonomous AI systems at scale.",
  metrics: [
    { label: "Code Uptime", value: "99.99%", detail: "SLA across cloud deploys" },
    { label: "GitHub Commits (YoY)", value: "2,840+", detail: "Top 1% active contributor" },
    { label: "LeetCode Solved", value: "850+", detail: "Top 2.5% Global Ranking" },
    { label: "Production Users", value: "1.2M+", detail: "Served across platforms" }
  ],
  socials: {
    github: "https://github.com/gurkanwarsingh",
    linkedin: "https://linkedin.com/in/gurkanwarsingh",
    twitter: "https://x.com/gurkanwar_dev",
    email: "contact@harryharvey.in",
    resume: "/resume.pdf"
  }
};

export const TELEMETRY_INITIAL = {
  github: {
    username: "gurkanwarsingh",
    publicRepos: 48,
    totalStars: 620,
    contributionsThisYear: 2842,
    currentStreakDays: 45,
    topLanguages: [
      { name: "TypeScript", percentage: 48 },
      { name: "Python", percentage: 24 },
      { name: "Go", percentage: 16 },
      { name: "Rust / C++", percentage: 12 }
    ]
  },
  leetcode: {
    username: "gurkanwarsingh",
    totalSolved: 852,
    easy: 310,
    medium: 442,
    hard: 100,
    acceptanceRate: "68.4%",
    globalRanking: 14230,
    contestRating: 1985
  },
  systemStatus: {
    region: "ap-south-1 (Mumbai)",
    latencyMs: 14,
    nodeStatus: "HEALTHY",
    activeSessions: 1420,
    lastDeploy: "3 minutes ago"
  }
};

export const SAAS_PROJECTS: Project[] = [
  {
    id: "antigravity-ai-studio",
    title: "NovaAgent AI Studio",
    subtitle: "Autonomous Multi-Agent AI Orchestration SaaS Platform",
    category: "AI & ML",
    description: "Enterprise SaaS platform allowing engineering teams to design, simulate, evaluate, and deploy autonomous LLM agent graphs with real-time vector streaming.",
    longDescription: "NovaAgent AI Studio enables developers to compose complex multi-agent workflows using a drag-and-drop visual node graph. Features include real-time token streaming, automated regression benchmarking, sub-agent thread isolation, and enterprise security rule auditing.",
    metrics: [
      { label: "Token Processing Speed", value: "<120ms/tok" },
      { label: "Cost Savings", value: "42%" },
      { label: "Active Pipelines", value: "14,200+" }
    ],
    techStack: ["Next.js 15", "React 19", "Three.js / R3F", "Python FastAPI", "LangChain / AGY SDK", "Pinecone Vector DB", "Tailwind CSS v4"],
    architectureHighlights: [
      "Event-driven WebSocket telemetry stream for real-time agent output rendering.",
      "Distributed task execution queue powered by Redis Celery workers.",
      "Sub-millisecond prompt caching layer saving 42% on LLM API overhead."
    ],
    challengesSolved: "Eliminated deadlock states in recursive multi-agent communication by enforcing cyclic graph detection and async token yield handlers.",
    featured: true,
    demoUrl: "https://novaagent-ai.vercel.app",
    githubUrl: "https://github.com/gurkanwarsingh/novaagent-studio",
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
    accentGradient: "from-cyan-500 to-indigo-600",
    systemFlow: ["Web Client", "Next.js Edge Gateway", "FastAPI Agent Controller", "Pinecone Vector Store", "LLM Inference Engine"]
  },
  {
    id: "hyperpulse-db-telemetry",
    title: "PulseCloud Telemetry",
    subtitle: "Distributed Microservices & Database Monitoring SaaS",
    category: "Distributed Systems",
    description: "High-throughput observability platform providing sub-second distributed tracing, automated anomaly detection, and interactive 3D dependency graphs.",
    longDescription: "Built for cloud-native architectures, PulseCloud ingests over 50,000 metrics/sec per node. It renders interactive 3D node topology graphs in Three.js, allowing DevOps teams to pin-point latency bottlenecks instantly.",
    metrics: [
      { label: "Ingestion Throughput", value: "50k req/sec" },
      { label: "P99 Query Speed", value: "4.2ms" },
      { label: "Data Compression Ratio", value: "8.4x" }
    ],
    techStack: ["React 19", "Go (Golang)", "ClickHouse DB", "Three.js", "WebSockets", "Docker", "Kubernetes"],
    architectureHighlights: [
      "Columnar storage engine with ClickHouse achieving 8.4x compression on telemetry logs.",
      "Custom WebGL R3F node cluster visualizer rendering 10,000+ dynamic service nodes.",
      "Automated eBPF kernel probes for zero-code integration."
    ],
    challengesSolved: "Achieved smooth 60fps rendering of 10k connected microservice nodes by building a custom WebGL instance buffer manager in Three.js.",
    featured: true,
    demoUrl: "https://pulsecloud-telemetry.vercel.app",
    githubUrl: "https://github.com/gurkanwarsingh/pulsecloud-telemetry",
    badgeColor: "border-indigo-500/40 text-indigo-400 bg-indigo-950/30",
    accentGradient: "from-indigo-500 to-violet-600",
    systemFlow: ["eBPF Probes", "Kafka Stream", "Go Aggregator Service", "ClickHouse Cluster", "R3F Visualizer"]
  },
  {
    id: "nexus-cloud-visualizer",
    title: "Nexus Infrastructure OS",
    subtitle: "Infrastructure-as-Code Visualizer & Cost Optimizer",
    category: "Cloud & DevOps",
    description: "Visual Infrastructure Control Plane that parses Terraform & CloudFormation manifests into actionable interactive architecture diagrams with real-time cost breakdown.",
    longDescription: "Nexus OS acts as a unified cloud control plane. Engineers can import HCL files and receive an interactive node graph detailing security vulnerabilities, IAM permission over-privileging, and projected monthly cost optimizations.",
    metrics: [
      { label: "Cost Reduction", value: "35% avg" },
      { label: "HCL Parsing Speed", value: "<150ms" },
      { label: "Cloud Providers", value: "AWS, GCP, Azure" }
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Rust Wasm", "Zustand", "Terraform HCL Parser"],
    architectureHighlights: [
      "WebAssembly Rust engine compiled for client-side sub-100ms HCL manifest parsing.",
      "Real-time cloud pricing API synchronization with localized currency conversion.",
      "Automated automated PR bot generating visual diffs on Terraform code changes."
    ],
    challengesSolved: "Offloaded heavy graph calculation logic to WebAssembly worker threads to keep the main UI thread buttery smooth during massive cloud stack renders.",
    featured: true,
    demoUrl: "https://nexus-cloud-os.vercel.app",
    githubUrl: "https://github.com/gurkanwarsingh/nexus-cloud-os",
    badgeColor: "border-violet-500/40 text-violet-400 bg-violet-950/30",
    accentGradient: "from-violet-500 to-fuchsia-600",
    systemFlow: ["Terraform HCL", "Rust Wasm Compiler", "Dependency Tree", "Zustand Store", "SVG/Canvas Surface"]
  },
  {
    id: "omni-commerce-engine",
    title: "OmniStore Platform",
    subtitle: "Ultra-Low Latency Headless Commerce Platform",
    category: "Fullstack SaaS",
    description: "Next-gen headless e-commerce SaaS engine featuring sub-100ms page transitions, real-time inventory locking, dynamic localized pricing, and stripe payment flow.",
    longDescription: "Engineered for high-volume enterprise brands, OmniStore delivers instant page loads via Next.js App Router server components, edge cached GraphQL endpoints, and resilient offline cart sync.",
    metrics: [
      { label: "Lighthouse Performance", value: "100/100" },
      { label: "Checkout Conversion", value: "+28%" },
      { label: "Global Edge Latency", value: "<25ms" }
    ],
    techStack: ["Next.js 15", "React 19", "Tailwind CSS v4", "GraphQL", "PostgreSQL / Prisma", "Stripe API", "Vercel Edge"],
    architectureHighlights: [
      "Zero-bundle-size React Server Components architecture with incremental static regeneration.",
      "Redis distributed mutex locks preventing race conditions on limited inventory drops.",
      "Firebase Firestore integration for instant multi-device cart synchronization."
    ],
    challengesSolved: "Eliminated flash of unstyled content and data fetching waterfalls through parallel server component data streaming.",
    featured: false,
    demoUrl: "https://omnistore-saas.vercel.app",
    githubUrl: "https://github.com/gurkanwarsingh/omnistore-platform",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    accentGradient: "from-emerald-500 to-teal-600",
    systemFlow: ["User Request", "Vercel Edge Function", "GraphQL Gateway", "Postgres DB", "Stripe Payment Gateway"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend & UI/UX",
    iconName: "Layout",
    description: "Building responsive, modern, high-performance user interfaces with pixel perfection and tactile motion.",
    skills: [
      { name: "Next.js 15 (App Router)", level: 96, experience: "5+ yrs", tags: ["RSC", "Server Actions", "Edge Routing"], isPrimary: true },
      { name: "React 19 / Modern Hooks", level: 98, experience: "7+ yrs", tags: ["Concurrent Mode", "Suspense", "Custom Hooks"], isPrimary: true },
      { name: "TypeScript", level: 95, experience: "6+ yrs", tags: ["Strict Typing", "Generics", "AST Parsing"], isPrimary: true },
      { name: "Tailwind CSS v4", level: 96, experience: "5+ yrs", tags: ["CSS Variables", "Custom Tokens", "Design System"], isPrimary: true },
      { name: "Three.js / React Three Fiber", level: 88, experience: "3+ yrs", tags: ["Shaders", "Particle Systems", "GLTF"], isPrimary: true },
      { name: "Framer Motion & GSAP", level: 92, experience: "4+ yrs", tags: ["Spring Physics", "Scroll Animations", "Layout Morph"] }
    ]
  },
  {
    category: "Backend & Microservices",
    iconName: "Server",
    description: "Designing high-concurrency microservices, resilient APIs, and low-latency data channels.",
    skills: [
      { name: "Node.js & Express / NestJS", level: 94, experience: "7+ yrs", tags: ["Event Loop", "Streams", "Microservices"], isPrimary: true },
      { name: "Python / FastAPI", level: 90, experience: "5+ yrs", tags: ["AsyncIO", "Pydantic", "AI Wrappers"], isPrimary: true },
      { name: "Go (Golang)", level: 86, experience: "3+ yrs", tags: ["Goroutines", "Channels", "gRPC / Protobuf"], isPrimary: true },
      { name: "GraphQL & REST APIs", level: 92, experience: "6+ yrs", tags: ["Apollo", "Schema Stitching", "OpenAPI"] }
    ]
  },
  {
    category: "AI / Machine Learning",
    iconName: "Cpu",
    description: "Integrating modern LLMs, vector database pipelines, autonomous multi-agent orchestration, and local inference models.",
    skills: [
      { name: "LangChain & LlamaIndex", level: 90, experience: "2+ yrs", tags: ["Agentic Chains", "RAG Pipelines", "Tool Calling"], isPrimary: true },
      { name: "Vector DBs (Pinecone, Chroma)", level: 88, experience: "2+ yrs", tags: ["Embeddings", "HNSW Indexing", "Similarity Search"] },
      { name: "Firebase AI Logic / Gemini API", level: 92, experience: "2+ yrs", tags: ["Multimodal Prompting", "Structured Outputs"] }
    ]
  },
  {
    category: "Cloud & Infrastructure",
    iconName: "Cloud",
    description: "Automating cloud deployments, infrastructure provisioning, containerization, and continuous delivery.",
    skills: [
      { name: "AWS & Google Cloud Platform", level: 88, experience: "5+ yrs", tags: ["ECS/EKS", "Lambda", "Cloud Run", "S3"], isPrimary: true },
      { name: "Docker & Kubernetes", level: 86, experience: "4+ yrs", tags: ["Helm", "Cluster Scaling", "Service Mesh"] },
      { name: "Terraform & CI/CD Pipelines", level: 85, experience: "4+ yrs", tags: ["GitHub Actions", "IaC", "Automated Testing"] }
    ]
  },
  {
    category: "Databases & Storage",
    iconName: "Database",
    description: "Optimizing relational, document, columnar, and in-memory datastores for high-speed read/write throughput.",
    skills: [
      { name: "PostgreSQL & Prisma / Drizzle", level: 94, experience: "6+ yrs", tags: ["Indexing", "Transactions", "Partitioning"], isPrimary: true },
      { name: "Firebase Firestore / Realtime DB", level: 92, experience: "5+ yrs", tags: ["Realtime Sync", "Auth Rules", "Security Audit"], isPrimary: true },
      { name: "Redis & Memcached", level: 90, experience: "5+ yrs", tags: ["Caching", "Pub/Sub", "Rate Limiting"] }
    ]
  }
];

export const WORK_EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Senior Staff Software Engineer & Architect",
    company: "DevOS Technologies",
    period: "2023 — Present",
    location: "Remote",
    type: "Full-Time",
    description: "Leading the core platform architectural group, overseeing cloud microservices, AI pipeline integration, and developer experience tools.",
    keyMetrics: [
      "Architected cloud infrastructure serving 1.2M+ monthly active API users.",
      "Reduced p99 server response latency from 450ms to 85ms across global edge functions.",
      "Mentored a team of 14 senior fullstack and backend software engineers."
    ],
    technologies: ["Next.js 15", "Go", "Python FastAPI", "Pinecone", "AWS EKS", "Tailwind CSS v4"],
    achievements: [
      "Spearheaded the migration to Next.js App Router RSC, cutting client bundle sizes by 55%.",
      "Built an internal AI code review agent that reduced open PR review bottlenecks by 38%."
    ]
  },
  {
    id: "exp-2",
    role: "Lead Fullstack & Systems Engineer",
    company: "CloudScale Systems",
    period: "2021 — 2023",
    location: "Remote",
    type: "Full-Time",
    description: "Engineered real-time telemetry streaming platforms and custom web visualization dashboards for enterprise cloud clients.",
    keyMetrics: [
      "Built WebGL 3D dependency graph rendering 10,000+ nodes in real-time.",
      "Designed distributed event stream processing 50,000 events/second."
    ],
    technologies: ["React 18", "Three.js", "Node.js", "ClickHouse DB", "Docker", "GraphQL"],
    achievements: [
      "Won the internal Annual Engineering Innovation Award for high-performance WebGL memory management.",
      "Authored 12+ reusable open-source component packages adopted across 4 sub-teams."
    ]
  },
  {
    id: "exp-3",
    role: "Senior Frontend Engineer",
    company: "Hyperion Digital",
    period: "2019 — 2021",
    location: "Hybrid",
    type: "Full-Time",
    description: "Crafted accessible, pixel-perfect SaaS dashboards and component libraries for fintech and e-commerce platforms.",
    keyMetrics: [
      "Achieved 100/100 Lighthouse performance and WCAG AA compliance across 25+ product pages.",
      "Increased checkout flow conversion by 24% through micro-interaction optimization."
    ],
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Jest"],
    achievements: [
      "Established the core company design system used by 30+ developers across 5 product squads."
    ]
  }
];

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "client-edge",
    title: "1. Client & Vercel Edge Gateway",
    subtitle: "Global Edge Network",
    type: "gateway",
    status: "optimal",
    latency: "12ms",
    throughput: "14.2k rps",
    details: "Routes incoming user requests to optimal edge locations, terminates SSL, applies DDoS rate limiting, and streams React Server Components."
  },
  {
    id: "microservice-mesh",
    title: "2. High-Concurrency API Mesh",
    subtitle: "FastAPI / Go Services",
    type: "compute",
    status: "active",
    latency: "28ms",
    throughput: "9.8k rps",
    details: "Stateless microservice mesh handling user authentication, request transformation, business validation, and task queuing."
  },
  {
    id: "ai-vector-engine",
    title: "3. Vector RAG & Agent Pipeline",
    subtitle: "LangChain + Pinecone Vector DB",
    type: "ai-engine",
    status: "optimal",
    latency: "65ms",
    throughput: "1.4k tps",
    details: "Executes similarity vector search over 500k embedding chunks and passes contextual prompt graphs to Gemini AI / Claude LLM models."
  },
  {
    id: "datastore-cluster",
    title: "4. Resilient Datastore Layer",
    subtitle: "PostgreSQL + Firebase Firestore",
    type: "database",
    status: "optimal",
    latency: "4.1ms",
    throughput: "24.5k ops/s",
    details: "ACID compliant transactional storage with automated read replicas and real-time Firestore sync for instantaneous client updates."
  },
  {
    id: "telemetry-stream",
    title: "5. Realtime Telemetry & Audit",
    subtitle: "ClickHouse + WebSocket Feed",
    type: "telemetry",
    status: "optimal",
    latency: "2.5ms",
    throughput: "50k log/s",
    details: "Ingests operational metrics, system logs, and security audit rules in real-time, feeding the live dashboard telemetry widgets."
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
