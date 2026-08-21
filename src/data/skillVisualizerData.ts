import { TechnologySpec, SkillCategoryGroup } from "@/types/skillVisualizer";

export const FEATURED_TECHNOLOGIES: TechnologySpec[] = [
  // Frontend Constellation
  {
    id: "nextjs-15",
    name: "Next.js 15 (App Router)",
    category: "frontend",
    tagline: "Production React Framework for High-Performance Server Streaming",
    iconName: "Globe",
    colorHex: "#06b6d4",
    nodeSize: 38,
    orbitalRadius: 110,
    orbitAngleDegrees: 25,
    masteryTier: "Architect",
    yearsOfExperience: "4+ Years",
    explanation: "Next.js 15 is a cutting-edge React framework enabling React Server Components (RSC), Turbopack bundler, and zero-waterfall server-side streaming rendering.",
    whyChosen: "Selected for its unmatched zero-bundle initial rendering speeds and automatic edge routing optimization across production SaaS applications.",
    productionUseCases: [
      "DevOS SaaS Studio Control Plane with sub-100ms page load speeds.",
      "NovaAgent AI Studio streaming dashboard.",
      "Multi-tenant SaaS platforms with dynamic edge middleware authorization."
    ],
    keyFeatures: ["React Server Components (RSC)", "Turbopack Compiler", "Server Actions", "Edge Middleware"],
    relatedTechIds: ["react-19", "typescript", "tailwind-v4", "threejs"]
  },
  {
    id: "react-19",
    name: "React 19",
    category: "frontend",
    tagline: "Concurrent UI Engine with Native Compiler & Use Hooks",
    iconName: "Code2",
    colorHex: "#38bdf8",
    nodeSize: 36,
    orbitalRadius: 140,
    orbitAngleDegrees: 60,
    masteryTier: "Principal",
    yearsOfExperience: "5+ Years",
    explanation: "React 19 introduces automatic memoization via the React Compiler, Actions for async state transitions, and first-class async data loading hooks.",
    whyChosen: "Chosen for its declarative component model and seamless concurrency support when rendering complex 60 FPS WebGL canvases.",
    productionUseCases: [
      "Interactive 3D graph canvases with non-blocking UI threads.",
      "Real-time state updates in live telemetry dashboards."
    ],
    keyFeatures: ["React Compiler", "use() Hook", "Server Actions", "Concurrent Mode"],
    relatedTechIds: ["nextjs-15", "threejs", "zustand"]
  },
  {
    id: "threejs",
    name: "Three.js & R3F",
    category: "frontend",
    tagline: "3D WebGL Shader Graphics Engine & Physical Translucent Materials",
    iconName: "Box",
    colorHex: "#818cf8",
    nodeSize: 35,
    orbitalRadius: 170,
    orbitAngleDegrees: 100,
    masteryTier: "Expert",
    yearsOfExperience: "3+ Years",
    explanation: "Three.js and React Three Fiber (R3F) bring hardware-accelerated 3D graphics, custom GLSL shaders, and physical transmission materials to the web.",
    whyChosen: "Essential for creating award-level spatial interfaces, cyber Earth globes, and interactive neural node graphs that wow visitors.",
    productionUseCases: [
      "Cyber Cosmos 3D background canvas with particle networks.",
      "10,000-node instanced WebGL dependency graph for observability."
    ],
    keyFeatures: ["WebGL Shaders", "MeshTransmissionMaterial", "Instanced Buffer Pools", "Physics Engine"],
    relatedTechIds: ["react-19", "nextjs-15"]
  },
  {
    id: "tailwind-v4",
    name: "Tailwind CSS v4",
    category: "frontend",
    tagline: "High-Performance CSS Engine with Custom Obsidian Design Tokens",
    iconName: "Layout",
    colorHex: "#06b6d4",
    nodeSize: 32,
    orbitalRadius: 200,
    orbitAngleDegrees: 135,
    masteryTier: "Architect",
    yearsOfExperience: "4+ Years",
    explanation: "Tailwind CSS v4 is a utility-first CSS framework rewritten in Rust, featuring CSS variables, container queries, and ultra-fast build times.",
    whyChosen: "Used to construct cohesive obsidian dark design systems, sleek glassmorphism panels, and smooth micro-animations.",
    productionUseCases: [
      "DevOS Design System token palette.",
      "Responsive glassmorphism modals and interactive CLI windows."
    ],
    keyFeatures: ["Rust Compiler Engine", "CSS Variables", "Container Queries", "Glassmorphism Tokens"],
    relatedTechIds: ["nextjs-15", "react-19"]
  },

  // Backend Constellation
  {
    id: "python-fastapi",
    name: "Python FastAPI",
    category: "backend",
    tagline: "High-Concurrency AsyncIO Microservice API Framework",
    iconName: "Terminal",
    colorHex: "#a855f7",
    nodeSize: 37,
    orbitalRadius: 110,
    orbitAngleDegrees: 190,
    masteryTier: "Principal",
    yearsOfExperience: "4+ Years",
    explanation: "FastAPI is a modern Python Web framework built on ASGI and Pydantic for high-performance, asynchronous REST and WebSocket API microservices.",
    whyChosen: "Chosen for its sub-30ms P99 async execution times when orchestrating LLM agents and processing embedding vectors.",
    productionUseCases: [
      "NovaAgent AI Studio sub-agent thread execution mesh.",
      "Semantic Prompt Cache API layer saving 42% on token costs."
    ],
    keyFeatures: ["AsyncIO Event Loop", "Pydantic Type Validation", "WebSocket Streaming", "OpenAPI Auto-Docs"],
    relatedTechIds: ["pinecone", "golang", "postgres"]
  },
  {
    id: "golang",
    name: "Go (Golang)",
    category: "backend",
    tagline: "High-Throughput Goroutine Microservice & Systems Language",
    iconName: "Cpu",
    accentColor: "#38bdf8",
    colorHex: "#38bdf8",
    nodeSize: 36,
    orbitalRadius: 140,
    orbitAngleDegrees: 225,
    masteryTier: "Expert",
    yearsOfExperience: "3+ Years",
    explanation: "Go is an open-source programming language engineered for high concurrency, lightweight memory footprints, and raw CPU performance.",
    whyChosen: "Selected for building low-latency log stream aggregators handling 50,000 requests/sec with minimal garbage collection pause.",
    productionUseCases: [
      "PulseCloud 50,000 req/sec telemetry log ingestion engine.",
      "Kafka consumer workers distributing real-time WebSocket payloads."
    ],
    keyFeatures: ["Goroutine Concurrency", "Low Garbage Collection Latency", "Compiled Static Binary", "Standard Library Net/HTTP"],
    relatedTechIds: ["python-fastapi", "clickhouse", "docker-k8s"]
  },

  // AI & ML Constellation
  {
    id: "pinecone",
    name: "Pinecone Vector DB",
    category: "ai_ml",
    tagline: "Managed Vector Database for Sub-50ms Similarity Search & RAG",
    iconName: "Sparkles",
    colorHex: "#f59e0b",
    nodeSize: 36,
    orbitalRadius: 110,
    orbitAngleDegrees: 285,
    masteryTier: "Architect",
    yearsOfExperience: "3+ Years",
    explanation: "Pinecone is a cloud-native vector database engineered for ultra-fast similarity search over high-dimensional vector embeddings.",
    whyChosen: "Essential for building Zero-Hallucination Retrieval-Augmented Generation (RAG) engines with HNSW index indexing.",
    productionUseCases: [
      "AI Digital Twin RAG Knowledge Base indexing portfolio data.",
      "NovaAgent AI Studio sub-agent context retrieval."
    ],
    keyFeatures: ["HNSW Vector Indexing", "Top-K Similarity Search", "Metadata Filtering", "Sub-50ms Query Latency"],
    relatedTechIds: ["python-fastapi", "nextjs-15"]
  },
  {
    id: "langchain-gemini",
    name: "Gemini API & LangChain",
    category: "ai_ml",
    tagline: "Multimodal LLM Inference & Autonomous Agent Graphs",
    iconName: "Bot",
    colorHex: "#fbbf24",
    nodeSize: 35,
    orbitalRadius: 150,
    orbitAngleDegrees: 320,
    masteryTier: "Architect",
    yearsOfExperience: "3+ Years",
    explanation: "LangChain combined with Gemini API enables dynamic prompt chain composition, tool use, and multi-agent graph execution.",
    whyChosen: "Chosen for its long context window capability, sub-120ms token streaming speeds, and structured JSON output guarantees.",
    productionUseCases: [
      "DevOS AI Assistant answering complex technical architecture queries.",
      "Automated code review & prompt deadlock detection."
    ],
    keyFeatures: ["Multimodal Prompting", "Function Calling", "Streaming Token Yields", "Structured JSON Schema"],
    relatedTechIds: ["pinecone", "python-fastapi"]
  },

  // Database & DevOps
  {
    id: "postgres",
    name: "PostgreSQL & Firebase",
    category: "database",
    tagline: "Relational & Real-Time Cloud Document Datastores",
    iconName: "Database",
    colorHex: "#34d399",
    nodeSize: 34,
    orbitalRadius: 180,
    orbitAngleDegrees: 350,
    masteryTier: "Principal",
    yearsOfExperience: "5+ Years",
    explanation: "PostgreSQL provides ACID-compliant relational data management, while Firebase Cloud Firestore delivers real-time document synchronization.",
    whyChosen: "Used to handle real-time visitor guestbook messages, user accounts, and transactional SaaS data.",
    productionUseCases: [
      "Firebase Cloud Firestore real-time guestbook stream.",
      "PostgreSQL user accounts & API billing logs."
    ],
    keyFeatures: ["ACID Compliance", "Real-Time Document Listeners", "JSONB Column Storage", "Connection Pooling"],
    relatedTechIds: ["python-fastapi", "golang"]
  }
];

export const SKILL_GROUPS: SkillCategoryGroup[] = [
  {
    categoryKey: "frontend",
    title: "Frontend Engineering & 3D WebGL",
    accentColor: "text-cyan-400 border-cyan-500/40 bg-cyan-950/30",
    technologies: FEATURED_TECHNOLOGIES.filter((t) => t.category === "frontend")
  },
  {
    categoryKey: "backend",
    title: "High-Concurrency Backend Systems",
    accentColor: "text-purple-400 border-purple-500/40 bg-purple-950/30",
    technologies: FEATURED_TECHNOLOGIES.filter((t) => t.category === "backend")
  },
  {
    categoryKey: "ai_ml",
    title: "Autonomous AI & Vector RAG Engines",
    accentColor: "text-amber-400 border-amber-500/40 bg-amber-950/30",
    technologies: FEATURED_TECHNOLOGIES.filter((t) => t.category === "ai_ml")
  },
  {
    categoryKey: "database",
    title: "Datastores & Distributed Systems",
    accentColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/30",
    technologies: FEATURED_TECHNOLOGIES.filter((t) => t.category === "database")
  }
];
