import { LifeMilestone } from "@/types/lifeTimeline";

export const LIFE_MILESTONES: LifeMilestone[] = [
  {
    year: "2003",
    title: "Born",
    subtitle: "The Genesis & Origin Story",
    tagline: "Where Curiosity Sparked a Passion for Technology & Problem Solving",
    iconName: "Sparkles",
    accentColor: "border-cyan-400 text-cyan-300 bg-cyan-950/40",
    bgGradient: "from-cyan-500/20 to-indigo-600/10",
    badgeText: "GENESIS",
    summary: "Born with an innate curiosity for how digital systems operate. Early childhood fascination with computers, electronics, and logical puzzles built the foundation for a lifelong passion in software engineering.",
    photos: [
      {
        url: "/images/timeline/born-childhood.jpg",
        caption: "Early curiosity with computer systems & logical puzzles",
        altText: "Childhood tinkering with electronics"
      }
    ],
    videos: [],
    certificates: [],
    projects: [],
    memories: [
      {
        headline: "First Encounter with Computers",
        reflection: "Dismantling old computer hardware to understand how processors and memory modules communicate.",
        impact: "Ignited a lifelong obsession with systems architecture and low-level performance."
      }
    ],
    keyHighlights: [
      "Early curiosity for computer electronics & mechanics",
      "Fascinated by logic puzzles and mathematical patterns",
      "Laid the mindset of a persistent builder"
    ]
  },

  {
    year: "2022",
    title: "Started Coding",
    subtitle: "First Lines of Code & Computer Science Deep-Dive",
    iconName: "Code2",
    accentColor: "border-indigo-400 text-indigo-300 bg-indigo-950/40",
    bgGradient: "from-indigo-500/20 to-violet-600/10",
    badgeText: "HELLO WORLD",
    summary: "Wrote the first lines of code in Python and C++. Mastered fundamental data structures, algorithms, and web technologies. Solved hundreds of algorithmic challenges to build computational muscle.",
    photos: [
      {
        url: "/images/timeline/started-coding.jpg",
        caption: "Late-night algorithm solving and terminal exploration",
        altText: "Terminal code workspace"
      }
    ],
    videos: [
      {
        url: "/videos/timeline/first-script.mp4",
        posterUrl: "/images/timeline/first-script-poster.jpg",
        title: "First Interactive CLI Utility Engine",
        duration: "0:45"
      }
    ],
    certificates: [
      {
        title: "Data Structures & Algorithms Mastery",
        issuer: "Coursera / Stanford Online",
        issueDate: "Nov 2022",
        credentialId: "DSA-2022-8841",
        verificationUrl: "https://coursera.org"
      },
      {
        title: "Fullstack Web Development Core",
        issuer: "FreeCodeCamp",
        issueDate: "Dec 2022",
        credentialId: "FCC-WEB-9912",
        verificationUrl: "https://freecodecamp.org"
      }
    ],
    projects: [
      {
        name: "CLI Task Automation Engine",
        category: "Utility Tool",
        linkUrl: "https://github.com/gurkanwarsingh",
        description: "Python CLI utility automating file organization and algorithmic benchmark logging."
      }
    ],
    memories: [
      {
        headline: "The 'Hello World' Moment",
        reflection: "Running the first successful compilation script and realizing that code can build anything imagined.",
        impact: "Committed to 100 consecutive days of algorithmic practice on LeetCode."
      }
    ],
    keyHighlights: [
      "Mastered Python, C++, and JavaScript fundamentals",
      "Solved 300+ LeetCode algorithmic problems",
      "Built initial responsive web layouts with Vanilla CSS"
    ]
  },

  {
    year: "2024",
    title: "First Project",
    subtitle: "Launching Production Web Applications",
    iconName: "Rocket",
    accentColor: "border-violet-400 text-violet-300 bg-violet-950/40",
    bgGradient: "from-violet-500/20 to-purple-600/10",
    badgeText: "PRODUCTION SHIP",
    summary: "Architected and shipped the first full-fledged production web platform using Next.js, React, and REST APIs. Experienced the thrill of live users interacting with production code for the first time.",
    photos: [
      {
        url: "/images/timeline/first-project.jpg",
        caption: "Dashboard UI for first production SaaS application",
        altText: "First project dashboard"
      }
    ],
    videos: [
      {
        url: "/videos/timeline/first-project-demo.mp4",
        posterUrl: "/images/timeline/first-project-poster.jpg",
        title: "First SaaS Platform Live Demo",
        duration: "1:20"
      }
    ],
    certificates: [
      {
        title: "Next.js & React 18 Production Architect",
        issuer: "Vercel Engineering Network",
        issueDate: "Aug 2024",
        credentialId: "VERCEL-NX-2024",
        verificationUrl: "https://vercel.com"
      }
    ],
    projects: [
      {
        name: "Nexus Cloud Visualizer",
        category: "Cloud SaaS",
        linkUrl: "https://github.com/gurkanwarsingh",
        description: "Interactive cloud infrastructure visualizer parsing Terraform HCL templates."
      }
    ],
    memories: [
      {
        headline: "Deploying to Production on Vercel",
        reflection: "Watching the green build status on Vercel and sharing the live URL with the community.",
        impact: "Shifted mindset from student coder to production software engineer."
      }
    ],
    keyHighlights: [
      "Shipped fullstack Next.js web application",
      "Integrated REST APIs with state management",
      "Achieved sub-100ms page load times"
    ]
  },

  {
    year: "2025",
    title: "Technovate President",
    subtitle: "Leading Tech Society & Organizing National Hackathons",
    iconName: "Award",
    accentColor: "border-amber-400 text-amber-300 bg-amber-950/40",
    bgGradient: "from-amber-500/20 to-orange-600/10",
    badgeText: "LEADERSHIP",
    summary: "Elected President of Technovate Tech Society. Spearheaded national hackathons, mentored 500+ student developers, organized technical workshops, and forged industry partnerships with leading SaaS companies.",
    photos: [
      {
        url: "/images/timeline/technovate-president.jpg",
        caption: "Keynote address at Technovate National Hackathon 2025",
        altText: "Technovate Hackathon stage"
      },
      {
        url: "/images/timeline/technovate-team.jpg",
        caption: "Technovate Executive Board & Organizers Team",
        altText: "Technovate Executive Board"
      }
    ],
    videos: [
      {
        url: "/videos/timeline/technovate-highlights.mp4",
        posterUrl: "/images/timeline/technovate-poster.jpg",
        title: "Technovate 2025 Hackathon Highlights Reel",
        duration: "2:15"
      }
    ],
    certificates: [
      {
        title: "Presidential Award for Outstanding Technical Leadership",
        issuer: "Technovate Executive Board",
        issueDate: "May 2025",
        credentialId: "TECH-PRES-2025",
        verificationUrl: "https://technovate.org"
      },
      {
        title: "National Hackathon Lead Convener Certificate",
        issuer: "Inter-College Tech Alliance",
        issueDate: "Mar 2025",
        credentialId: "HACK-CONVENER-2025"
      }
    ],
    projects: [
      {
        name: "Technovate Portal & Live Scoreboard",
        category: "Event Platform",
        linkUrl: "https://github.com/gurkanwarsingh",
        description: "Real-time hackathon submission portal and live leaderboard for 1,200+ participants."
      }
    ],
    memories: [
      {
        headline: "Organizing 36-Hour National Hackathon",
        reflection: "Managing 1,200+ student participants, 40 mentors, and live judging panels over an intense 36-hour hackathon weekend.",
        impact: "Developed executive leadership, crisis resolution, and public speaking mastery."
      }
    ],
    keyHighlights: [
      "Led Technovate Tech Society with 500+ active members",
      "Organized 36-hour National Hackathon for 1,200+ hackers",
      "Secured major SaaS company sponsorships & industry mentors"
    ]
  },

  {
    year: "2026",
    title: "Building Products",
    subtitle: "DevOS SaaS Studio & Autonomous AI Multi-Agent Systems",
    iconName: "Cpu",
    accentColor: "border-cyan-400 text-cyan-300 bg-cyan-950/40",
    bgGradient: "from-cyan-500/20 to-indigo-600/10",
    badgeText: "SAAS STUDIO",
    summary: "Architecting award-level SaaS products, R3F 3D WebGL experiences, and autonomous AI agent platforms. Operating as a Senior Staff Engineer building DevOS SaaS Developer Studio.",
    photos: [
      {
        url: "/images/timeline/building-products.jpg",
        caption: "DevOS SaaS Studio Control Plane & 3D Visualizers",
        altText: "DevOS Studio workspace"
      }
    ],
    videos: [
      {
        url: "/videos/timeline/devos-studio-walkthrough.mp4",
        posterUrl: "/images/timeline/devos-poster.jpg",
        title: "DevOS SaaS Studio Full Walkthrough",
        duration: "3:00"
      }
    ],
    certificates: [
      {
        title: "Senior Staff Engineering Architecture Certificate",
        issuer: "DevOS Systems Network",
        issueDate: "Jan 2026",
        credentialId: "DEVOS-STAFF-2026",
        verificationUrl: "https://devos.io"
      }
    ],
    projects: [
      {
        name: "NovaAgent AI Studio",
        category: "AI Multi-Agent SaaS",
        linkUrl: "https://novaagent-ai.vercel.app",
        description: "Autonomous LLM agent graph orchestrator with sub-120ms token streaming."
      },
      {
        name: "PulseCloud Telemetry",
        category: "Distributed Telemetry",
        linkUrl: "https://pulsecloud-telemetry.vercel.app",
        description: "50,000 req/sec log ingestion engine powered by Go and ClickHouse."
      }
    ],
    memories: [
      {
        headline: "Engineering the DevOS Control Plane",
        reflection: "Combining Three.js WebGL shaper core, Iron Man JARVIS HUD, and Zero-Hallucination AI Digital Twin into a unified SaaS experience.",
        impact: "Established a benchmark for premium developer portfolio interfaces."
      }
    ],
    keyHighlights: [
      "Built DevOS SaaS Developer Studio & JARVIS Control Plane",
      "Integrated Zero-Hallucination RAG AI Digital Twin with Voice Synthesis",
      "Pushed 2,840+ commits with 99.99% uptime architecture"
    ]
  },

  {
    year: "Future",
    title: "???",
    subtitle: "Quantum AI, Neural Interfaces & Beyond",
    iconName: "Terminal",
    accentColor: "border-emerald-400 text-emerald-300 bg-emerald-950/40",
    bgGradient: "from-emerald-500/20 to-cyan-600/10",
    badgeText: "INFINITE HORIZON",
    summary: "The journey has just begun. Exploring quantum computing algorithms, brain-computer neural interfaces, local WebGPU AI models, and next-generation autonomous software engineering paradigms.",
    photos: [],
    videos: [],
    certificates: [],
    projects: [
      {
        name: "Project Quantum Mesh",
        category: "Frontier AI",
        linkUrl: "https://github.com/gurkanwarsingh",
        description: "Experimental local WebGPU Llama 3 model execution with zero-latency speech pipelines."
      }
    ],
    memories: [
      {
        headline: "The Unwritten Future",
        reflection: "Software engineering is constantly evolving. The future belongs to those who continuously learn, build, and innovate.",
        impact: "Pledging lifelong commitment to engineering excellence."
      }
    ],
    keyHighlights: [
      "Quantum Computing & Local WebGPU AI Models",
      "Building multi-region autonomous agent ecosystems",
      "Mentoring the next generation of software architects"
    ]
  }
];
