/**
 * DevOS SaaS Studio — Mission Modules Information Architecture
 * Replaces traditional page routing with dynamic, spatial Mission Modules.
 */

export interface MissionModule {
  id: string;
  code: string;
  name: string;
  purpose: string;
  components: string[];
  interactions: string[];
  animations: string[];
  dataSource: string;
  api: string;
  transitions: string;
  loadingState: string;
  errorState: string;
}

export const MISSION_MODULES: MissionModule[] = [
  {
    id: "module-telemetry-core",
    code: "MM-01",
    name: "Telemetry Command & Control",
    purpose: "Provide instantaneous, real-time spatial visual metrics of developer code contributions, 3D architecture core, and live operational stats.",
    components: ["HeroCanvas", "InteractiveSphere", "ParticleField", "TelemetryDashboard", "HeaderNavbar"],
    interactions: [
      "3D canvas cursor sway and rotation parallax on mouse move",
      "Live API sync refresh trigger button",
      "Language distribution bar hover tooltips"
    ],
    animations: [
      "60 FPS WebGL shader deformation",
      "Staggered number counter roll-ups",
      "Live status indicator pulse animation"
    ],
    dataSource: "GitHub REST API & LeetCode GraphQL / Heroku Telemetry API",
    api: "/api/github, /api/leetcode, @tanstack/react-query cache",
    transitions: "Smooth spring physics scale on hover, ambient radial glow expansion",
    loadingState: "Skeleton pulse cards with animated loading spinners; fallback R3F reduced-motion badge",
    errorState: "Resilient fallback to localized TELEMETRY_INITIAL seed data with offline indicator"
  },
  {
    id: "module-saas-projects",
    code: "MM-02",
    name: "SaaS Production Applications Matrix",
    purpose: "Showcase production-grade SaaS platforms, AI agent tools, and distributed cloud systems with instant architecture deep-dives.",
    components: ["ProjectsSection", "ProjectCard", "ProjectDetailModal"],
    interactions: [
      "Category filter pill selection",
      "Project card hover tilt effect",
      "Architecture Deep-Dive modal trigger",
      "Live demo and repository external links"
    ],
    animations: [
      "Category filter layout re-ordering",
      "Modal entry scale (zoom-95 to scale-100)",
      "System flow arrow animation"
    ],
    dataSource: "SAAS_PROJECTS static dataset",
    api: "Client-side Zustand state store select",
    transitions: "Framer Motion layout re-ordering, backdrop blur fade-in",
    loadingState: "Instant RSC hydration with blur-up preview cards",
    errorState: "Fallback to default 'All' category if filter selection yields zero items"
  },
  {
    id: "module-tech-playground",
    code: "MM-03",
    name: "Architecture Playground & Tech Matrix",
    purpose: "Demonstrate technical stack capabilities and provide an interactive simulation of end-to-end fullstack request pipelines.",
    components: ["TechMatrixSection", "ArchitecturePlayground", "NodeSimulator"],
    interactions: [
      "Skill category tab switching",
      "Interactive node step trigger in architecture flow",
      "Automated End-to-End Pipeline simulation sequence"
    ],
    animations: [
      "Skill level percentage bar expansion",
      "Node highlight glow sweep during pipeline simulation",
      "Throughput counter tick animation"
    ],
    dataSource: "SKILL_CATEGORIES & ARCHITECTURE_NODES datasets",
    api: "Interactive client state machine",
    transitions: "Sub-100ms tab panel cross-fade",
    loadingState: "Default node state initialized with 100% health indicators",
    errorState: "Graceful node isolation with fallback to static architecture topology map"
  },
  {
    id: "module-career-impact",
    code: "MM-04",
    name: "Career Trajectory & Impact Engine",
    purpose: "Detail professional leadership trajectory, measurable business metrics, and delivered architectural achievements.",
    components: ["ExperienceTimeline", "TimelineNodeCard"],
    interactions: [
      "Scroll-triggered timeline node expansion",
      "Metric pill highlight on hover",
      "Technology tag filtering"
    ],
    animations: [
      "Vertical line glow animation on scroll",
      "Timeline node scale bump on hover"
    ],
    dataSource: "WORK_EXPERIENCES dataset",
    api: "Static server component prop stream",
    transitions: "Smooth vertical parallax fade",
    loadingState: "RSC pre-rendered server html",
    errorState: "Safe render of static experience items"
  },
  {
    id: "module-guestbook-stream",
    code: "MM-05",
    name: "Realtime Guestbook & Feedback Stream",
    purpose: "Enable real-time public visitor feedback, architecture reviews, and testimonial submission synced across visitors.",
    components: ["GuestbookSection", "FeedbackStreamCard", "ReactionPicker"],
    interactions: [
      "Guestbook form input submission",
      "Reaction badge picker selection (🚀, 🔥, ⚡, 💎, 🧠)",
      "Live message stream auto-scroll"
    ],
    animations: [
      "Confetti particle explosion on submit",
      "New entry slide-down animation",
      "Reaction scale bounce"
    ],
    dataSource: "Firebase Firestore Database",
    api: "getDocs(query(guestbook)), addDoc(collection(guestbook))",
    transitions: "Optimistic UI insertion with spring slide-in",
    loadingState: "Animated pulse skeleton entries with loader spinner",
    errorState: "Fallback to MOCK_GUESTBOOK_STORAGE in-memory queue when Firebase credentials are unconfigured"
  },
  {
    id: "module-cli-terminal",
    code: "MM-06",
    name: "Developer Command Line Environment",
    purpose: "Provide a full interactive CLI shell for power-user keyboard navigation, command execution, and easter egg triggers.",
    components: ["InteractiveTerminal", "ConsoleBuffer", "TerminalPrompt"],
    interactions: [
      "Command typing & execution (`help`, `skills`, `projects`, `sudo hire`)",
      "Up/Down arrow key history navigation",
      "Window control dot clicks (close/minimize)"
    ],
    animations: [
      "Blinking cursor caret animation",
      "Terminal buffer line-by-line stream",
      "Confetti blast on `sudo hire` command"
    ],
    dataSource: "TERMINAL_COMMANDS_HELP registry",
    api: "Client-side command parser & Web Audio API synthesizer",
    transitions: "Backdrop blur popover entry (0.15s)",
    loadingState: "Instant shell boot message 'DevOS CLI Studio Environment initialized'",
    errorState: "Command not recognized error log with suggestion to type 'help'"
  },
  {
    id: "module-ai-agent",
    code: "MM-07",
    name: "Autonomous AI Agent Intelligence",
    purpose: "Offer an interactive AI assistant to answer questions about Gurkanwar's architecture capabilities, skills, and contract availability.",
    components: ["AIChatWidget", "PresetChipRow", "MessageStream"],
    interactions: [
      "Preset question chip clicks",
      "Custom query typing & submit",
      "Priority hire call-to-action jump"
    ],
    animations: [
      "AI thinking indicator pulse",
      "Simulated token typing delay stream",
      "Avatar pulse animation"
    ],
    dataSource: "DevOS Knowledge Base & Firebase AI Logic / Gemini API",
    api: "Client LLM simulator & Gemini API wrapper",
    transitions: "Slide-up drawer transition",
    loadingState: "Blinking AI agent thinking spinner 'Generating LLM inference response...'",
    errorState: "Fallback to structured preset answer tree"
  },
  {
    id: "module-command-palette",
    code: "MM-08",
    name: "Global Command & Search Matrix",
    purpose: "Serve as the unified keyboard navigation hub (`Cmd + K`) for instant jumping to any section, project, or system action.",
    components: ["CommandPalette", "CommandInput", "CommandGroupList"],
    interactions: [
      "Cmd+K / Ctrl+K keyboard shortcut toggle",
      "Arrow key list selection",
      "Quick action selection (Hire Me, AI Assistant, Terminal, Sound toggle)"
    ],
    animations: [
      "Modal backdrop blur fade-in",
      "Active item highlight scale"
    ],
    dataSource: "cmdk registry & app state store",
    api: "Zustand global store setCommandPaletteOpen",
    transitions: "Zoom-95 entry transition",
    loadingState: "Instant keyboard focus trap on mount",
    errorState: "No matching commands message with suggested queries"
  },
  {
    id: "module-hiring-channel",
    code: "MM-09",
    name: "Priority Hiring & Technical Discovery Channel",
    purpose: "Facilitate direct contract inquiries, technical discovery calls, and instant email communication.",
    components: ["ContactModal", "InquiryForm", "CalendarSchedulerLink"],
    interactions: [
      "Form validation input typing",
      "One-click copy email button (`contact@harryharvey.in`)",
      "Calendar scheduling link trigger"
    ],
    animations: [
      "Checkmark success state animation",
      "Confetti celebration on inquiry submission"
    ],
    dataSource: "Firebase Firestore Contacts collection",
    api: "addDoc(collection(contacts))",
    transitions: "Smooth form-to-success screen crossfade",
    loadingState: "Submit button spinner 'Transmitting inquiry...'",
    errorState: "Fallback to direct email client launcher"
  }
];
