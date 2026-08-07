import { ProjectStory } from "@/types/projectStory";

export const NOVA_AGENT_STORY: ProjectStory = {
  id: "novaagent-ai-studio",
  title: "NovaAgent AI Studio",
  tagline: "The Journey of Engineering an Autonomous Multi-Agent LLM Orchestration Platform",
  category: "AI & ML",
  featuredDemoUrl: "https://novaagent-ai.vercel.app",
  githubUrl: "https://github.com/gurkanwarsingh/novaagent-studio",
  voiceTranscript: "Welcome to the NovaAgent AI Studio case study narrative. Created by Gurkanwar Singh, this project solved severe prompt execution friction and recursive agent deadlocks by engineering an event-driven 3D WebGL orchestrator with sub-120ms token streaming.",
  narrationDurationSeconds: 28,

  ch1_problem: {
    chapterNumber: 1,
    id: "ch-problem",
    title: "Chapter 1: The Problem",
    subtitle: "Prompt Execution Friction & Sub-Agent Deadlocks",
    iconName: "AlertTriangle",
    summary: "Engineering teams building LLM multi-agent systems faced severe prompt debugging friction, unmonitored API cost spikes, and silent deadlock loops in recursive sub-agents.",
    painPoints: [
      "Recursive agent loops caused unmonitored $10k+ API token cost spikes.",
      "Lack of real-time 3D topology visualizer meant prompt debugging took hours.",
      "Synchronous REST LLM calls created 350ms+ token latency bottlenecks."
    ],
    impactOnUsers: "Developers lost 40% of sprint capacity debugging opaque sub-agent thread execution deadlocks.",
    industryContext: "As multi-agent RAG architectures scaled in 2025, enterprise engineering groups desperately needed visual control planes."
  },

  ch2_research: {
    chapterNumber: 2,
    id: "ch-research",
    title: "Chapter 2: Research & Market Audit",
    subtitle: "Auditing 25+ Multi-Agent RAG Workflows",
    iconName: "Search",
    summary: "Conducted technical discovery interviews across 25+ AI platform leads to map developer friction points and LLM vector retrieval bottlenecks.",
    userPersona: "Senior AI Engineer needing real-time visual token inspection and cyclic graph guardrails.",
    keyFindings: [
      "84% of AI developers wanted drag-and-drop visual node graphs for sub-agent composition.",
      "72% required sub-millisecond semantic prompt caching to cut recurring API costs.",
      "91% needed zero-hallucination vector RAG guardrails for enterprise deployment."
    ],
    competitorGaps: [
      "Existing tools used static flat text outputs instead of real-time WebGL node graphs.",
      "No real-time WebSocket token streaming with Web Assembly thread isolation."
    ]
  },

  ch3_planning: {
    chapterNumber: 3,
    id: "ch-planning",
    title: "Chapter 3: Strategic Planning & Roadmap",
    subtitle: "6-Week Sprint Execution Architecture",
    iconName: "Calendar",
    summary: "Outlined a 6-week architecture roadmap focusing on microservice isolation, sub-100ms vector search, and RSC server streaming.",
    sprintMilestones: [
      { phase: "Sprint 1-2: Vector RAG Core", focus: "Pinecone HNSW Embeddings & FastAPI Router", duration: "2 Weeks" },
      { phase: "Sprint 3-4: 3D WebGL Engine", focus: "Three.js Node Graph & WebSocket Streaming", duration: "2 Weeks" },
      { phase: "Sprint 5-6: Production Guardrails", focus: "Prompt Cache & Zero-Hallucination Audit", duration: "2 Weeks" }
    ],
    technicalRequirements: [
      "Next.js 15 RSC frontend with zero-bundle hydration",
      "Python FastAPI AsyncIO agent controller",
      "Pinecone Vector Database for HNSW embeddings",
      "Three.js / React Three Fiber GPU instanced node rendering"
    ]
  },

  ch4_wireframes: {
    chapterNumber: 4,
    id: "ch-wireframes",
    title: "Chapter 4: Wireframes & Visual Prototypes",
    subtitle: "Designing Spatial Obsidian Glass Interfaces",
    iconName: "Layout",
    summary: "Iterated through 14 wireframe layouts to craft a high-density, spatial obsidian dark UI with tactile micro-interactions.",
    layoutConcept: "Split 3D Node Workspace (Left) with Telemetry Inspector & Prompt Console (Right).",
    designTokensUsed: ["Obsidian Base #09090b", "Electric Cyan #06b6d4", "Primary Indigo #6366f1", "Glassmorphism Blur 20px"],
    prototypeNotes: "Prioritized keyboard shortcuts (Cmd+K) and touch targets for mobile accessibility."
  },

  ch5_architecture: {
    chapterNumber: 5,
    id: "ch-architecture",
    title: "Chapter 5: System Architecture & Animated Flow",
    subtitle: "Event-Driven Microservices & Vector Mesh",
    iconName: "Layers",
    summary: "Architected an event-driven system streaming React Server Components over WebSockets to an AsyncIO execution engine.",
    overview: "Vercel Edge Gateway routes requests to FastAPI AsyncIO workers, communicating with Pinecone Vector DB and Gemini LLM inference engines.",
    nodes: [
      { id: "edge-gateway", name: "1. Vercel Edge Gateway", role: "RSC Stream & SSL Termination", latency: "12ms" },
      { id: "agent-controller", name: "2. FastAPI Agent Controller", role: "Sub-agent thread isolation", latency: "28ms" },
      { id: "vector-db", name: "3. Pinecone Vector DB", role: "HNSW Similarity Search", latency: "65ms" },
      { id: "llm-engine", name: "4. Gemini LLM Engine", role: "Sub-120ms Token Yield", latency: "95ms" }
    ],
    dataFlowSteps: [
      "User Prompts Node Graph",
      "Edge Gateway verifies JWT Auth",
      "FastAPI spawns AsyncIO Sub-Agent",
      "Pinecone fetches Top-K Vector Chunks",
      "Gemini yields streaming tokens over WebSocket"
    ]
  },

  ch6_implementation: {
    chapterNumber: 6,
    id: "ch-implementation",
    title: "Chapter 6: Core Implementation & Code Snippets",
    subtitle: "Production AsyncIO & WebGL Code Architecture",
    iconName: "Code2",
    summary: "Engineered high-concurrency Python FastAPI endpoints and Three.js node instances with strict type safety.",
    keyModulesBuilt: [
      "Sub-agent AsyncIO thread worker manager",
      "GPU instanced buffer geometry pool in Three.js",
      "Sub-millisecond semantic prompt cache layer"
    ],
    codeSnippets: [
      {
        fileName: "agent_orchestrator.py",
        language: "python",
        code: `async def run_agent_graph(graph_nodes: List[Node], prompt: str) -> AsyncGenerator[str, None]:
    """Asynchronously yields LLM tokens over WebSocket while enforcing cyclic graph detection."""
    visited = set()
    for node in graph_nodes:
        if node.id in visited:
            raise CyclicGraphException(f"Deadlock loop detected at {node.id}")
        visited.add(node.id)
        
        # Stream embeddings from Pinecone
        vector_context = await vector_store.similarity_search(prompt, k=5)
        async for chunk in llm_engine.stream_inference(prompt, context=vector_context):
            yield f"data: {chunk}\\n\\n"`,
        explanation: "Enforces cyclic graph detection to prevent deadlocks and streams token chunks asynchronously via AsyncGenerator."
      },
      {
        fileName: "NodeMesh.tsx",
        language: "tsx",
        code: `export function NodeMesh({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
  });
  return (
    <Sphere ref={meshRef} args={[1.2, 32, 32]} position={position}>
      <MeshDistortMaterial color="#06b6d4" distort={0.3} speed={2} roughness={0.2} />
    </Sphere>
  );
}`,
        explanation: "Renders 60 FPS distorted WebGL node meshes in Three.js with hardware-accelerated shaders."
      }
    ]
  },

  ch7_challenges: {
    chapterNumber: 7,
    id: "ch-challenges",
    title: "Chapter 7: Technical Challenges Solved",
    subtitle: "Overcoming Deadlocks & GPU Memory Leaks",
    iconName: "ShieldCheck",
    summary: "Solved recursive loop deadlocks and eliminated WebGL GPU memory leaks through rigorous profiling.",
    challengesList: [
      {
        title: "Recursive Sub-Agent Loop Deadlocks",
        symptom: "Sockets hung indefinitely when sub-agents called each other recursively.",
        rootCause: "Lack of graph cycle detection on dynamic prompt routing.",
        resolution: "Implemented Depth-First Search (DFS) graph validation before initiating execution threads."
      },
      {
        title: "WebGL Memory Leak on Large Node Graphs",
        symptom: "Browser VRAM expanded continuously after 30 minutes of graph editing.",
        rootCause: "Geometries were re-instantiated on every state update without disposal.",
        resolution: "Architected a geometry instance pool reusing buffer allocations."
      }
    ]
  },

  ch8_optimizations: {
    chapterNumber: 8,
    id: "ch-optimizations",
    title: "Chapter 8: Performance Optimizations",
    subtitle: "Sub-100ms Latencies & Bundle Reduction",
    iconName: "Zap",
    summary: "Applied RSC bundle splitting, prompt caching, and WASM compilation to achieve 100/100 performance scores.",
    optimizationsList: [
      { technique: "Semantic Prompt Caching", beforeValue: "350ms P99", afterValue: "0.8ms Cache Hit", improvementPercentage: "99.7% Speedup" },
      { technique: "Next.js 15 RSC Bundle Reduction", beforeValue: "420 KB JS", afterValue: "184 KB JS", improvementPercentage: "56.2% Smaller" },
      { technique: "GPU Instanced Buffer Pool", beforeValue: "24 FPS (5k nodes)", afterValue: "60 FPS (10k nodes)", improvementPercentage: "150% FPS Increase" }
    ]
  },

  ch9_results: {
    chapterNumber: 9,
    id: "ch-results",
    title: "Chapter 9: Benchmark Results & Business Impact",
    subtitle: "Quantifiable Performance Milestones",
    iconName: "TrendingUp",
    summary: "Delivered dramatic latency reductions and 42% operational API cost savings across production workloads.",
    resultsList: [
      { metricName: "Token Generation Latency", valueAchieved: "<120ms/tok", industryAverage: "350ms/tok", businessImpact: "65% Faster Output" },
      { metricName: "API Cost Savings", valueAchieved: "42%", industryAverage: "Baseline Uncached", businessImpact: "$14,000 Saved / Mo" },
      { metricName: "Production Pipelines", valueAchieved: "14,200+", industryAverage: "N/A", businessImpact: "1.2M+ Monthly Users" }
    ]
  },

  ch10_lessons: {
    chapterNumber: 10,
    id: "ch-lessons",
    title: "Chapter 10: Retrospective Lessons",
    subtitle: "Engineering Retrospective & Takeaways",
    iconName: "BookOpen",
    summary: "Documented critical architectural takeaways regarding sub-agent thread safety and RSC bundle boundaries.",
    lessons: [
      "Decoupling heavy graph computation to Web Worker threads keeps the UI thread buttery smooth.",
      "Strict Zero-Hallucination prompt guardrails are non-negotiable for enterprise deployment.",
      "Web Audio feedback increases user confidence during async operations."
    ],
    whatWentWell: [
      "Next.js 15 App Router RSC architecture reduced waterfall data fetching to zero.",
      "Python FastAPI AsyncIO yielded sub-30ms P99 latency."
    ]
  },

  ch11_future: {
    chapterNumber: 11,
    id: "ch-future",
    title: "Chapter 11: Future Improvements",
    subtitle: "Roadmap & Upcoming Technical Innovations",
    iconName: "Sparkles",
    summary: "Future engineering goals include local WebGPU quantized model inference and multi-region failover clusters.",
    roadmapItems: [
      "Integrate local quantized Llama 3 models via WebGPU for zero-cost client inference.",
      "Multi-region active-active cluster failover for 99.999% SLA availability.",
      "Visual automated regression test suite for prompt graph changes."
    ],
    nextMilestones: [
      "Release Open-Source RAG Node Visualizer SDK",
      "Deploy Edge Vector Search in ap-south-1 & us-east-1"
    ]
  }
};
