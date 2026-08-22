import fs from 'fs';

const tsContent = `import { ProjectStory } from "@/types/projectStory";

export const COLLEGE_ERP_STORY: ProjectStory = {
  id: "college-erp",
  title: "College ERP - Academic Management Platform",
  tagline: "Securing academic & financial data through PostgreSQL RLS",
  category: "Distributed Systems",
  featuredDemoUrl: "",
  githubUrl: "",
  voiceTranscript: "The College ERP system was built to decentralize administrative workloads securely, implementing Row Level Security policies directly at the database layer.",
  narrationDurationSeconds: 15,

  ch1_problem: {
    chapterNumber: 1,
    id: "ch1",
    title: "The Security Gap",
    subtitle: "Why frontend role checks aren't enough",
    iconName: "AlertTriangle",
    summary: "Colleges often manage sensitive data—like student marks, attendance, and fee payments—using legacy software or simple spreadsheets. When moving to modern web apps, developers frequently make the mistake of only protecting routes on the frontend, leaving APIs and the database vulnerable.",
    painPoints: [
      "Decentralized operations with scattered attendance and fee records",
      "Lack of strict role-based access control protecting student privacy",
      "Client-side authorization checks that can be easily bypassed",
      "Inefficient querying leading to slow dashboard load times"
    ],
    impactOnUsers: "Students cannot securely access their own data without risking exposure to others, and faculty lack centralized, secure administrative tools.",
    industryContext: "Educational institutions require strict data segregation between roles: Principal, HOD, Teacher, Student, and Admin."
  },

  ch2_research: {
    chapterNumber: 2,
    id: "ch2",
    title: "Architectural Planning",
    subtitle: "Choosing the right backend paradigm",
    iconName: "Search",
    summary: "The primary requirement was building a foundation that guaranteed data security regardless of the client connecting to it. We researched various BaaS (Backend-as-a-Service) options and traditional REST/GraphQL architectures.",
    userPersona: "Teachers marking attendance, students checking fees, and admins managing the institution.",
    keyFindings: [
      "Relational databases (PostgreSQL) are strictly required for the complex entity mapping (Students > Courses > Subjects > Attendance > Fees).",
      "Authentication must be deeply integrated with the database authorization layer.",
      "PostgreSQL Row Level Security (RLS) provides the strongest security guarantee by filtering data directly at the row level."
    ],
    competitorGaps: [
      "Legacy ERPs are often monolithic and hard to scale or extend.",
      "Many modern clones lack proper database-level security."
    ]
  },

  ch3_planning: {
    chapterNumber: 3,
    id: "ch3",
    title: "The MVP Roadmap",
    subtitle: "Scoping the essential modules",
    iconName: "Layout",
    summary: "To ensure a successful launch, we scoped the Minimum Viable Product to focus strictly on the most critical college workflows, leaving auxiliary features like Library or Hostel management for future iterations.",
    sprintMilestones: [
      { phase: "Sprint 1", focus: "Database Schema & Auth / RBAC", duration: "2 weeks" },
      { phase: "Sprint 2", focus: "Student & Faculty Management", duration: "2 weeks" },
      { phase: "Sprint 3", focus: "Attendance & Marks Modules", duration: "3 weeks" },
      { phase: "Sprint 4", focus: "Fees Module & Admin Dashboards", duration: "2 weeks" }
    ],
    technicalRequirements: [
      "Next.js App Router for Server Components",
      "Supabase Auth mapped to user roles",
      "PostgreSQL database with indexed foreign keys",
      "Strict Server Actions for data mutation"
    ]
  },

  ch4_wireframes: {
    chapterNumber: 4,
    id: "ch4",
    title: "UI & Component Design",
    subtitle: "Building the visual layer",
    iconName: "Layout",
    summary: "The interface was designed to be clean, modular, and fast. Using Tailwind CSS and shadcn/ui, we built shared components for data tables, forms, and role-based navigation sidebars.",
    layoutConcept: "Modular role-based dashboards.",
    designTokensUsed: ["Tailwind CSS", "shadcn/ui", "Lucide Icons", "Radix UI Primitives"],
    prototypeNotes: "Forms utilize React Hook Form and Zod for robust client-side validation before hitting Server Actions."
  },

  ch5_architecture: {
    chapterNumber: 5,
    id: "ch5",
    title: "System Architecture",
    subtitle: "Next.js + Supabase Integration",
    iconName: "Layers",
    summary: "The architecture follows a strict one-way data flow from the UI, through Zod validation, into Next.js Server Actions, ending in secure Supabase Postgres queries.",
    overview: "We decoupled the authentication (Who is the user?) from the authorization (What can they do?), enforcing the latter via PostgreSQL RLS policies.",
    nodes: [
      { id: "n1", name: "Next.js Client", role: "UI Render", latency: "0ms" },
      { id: "n2", name: "Server Actions", role: "Validation & Logic", latency: "15ms" },
      { id: "n3", name: "Supabase Auth", role: "Session Mgmt", latency: "30ms" },
      { id: "n4", name: "PostgreSQL", role: "RLS & Data", latency: "10ms" }
    ],
    dataFlowSteps: [
      "Client submits a form payload.",
      "Server Action validates the payload using Zod.",
      "Server Action authenticates the Supabase session.",
      "Database evaluates the query against RLS policies.",
      "Data is returned and the UI is revalidated."
    ]
  },

  ch6_implementation: {
    chapterNumber: 6,
    id: "ch6",
    title: "Implementation Details",
    subtitle: "Coding the core logic",
    iconName: "Code2",
    summary: "We structured the database using a robust relational model. Key tables included users, students, teachers, departments, courses, subjects, attendance, and fees.",
    codeSnippets: [
      {
        fileName: "attendance.sql",
        language: "sql",
        code: \`CREATE POLICY "Teachers can insert attendance for assigned subjects"
ON attendance FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IN (
    SELECT teacher_id FROM teacher_subjects 
    WHERE subject_id = attendance.subject_id
  )
);\`,
        explanation: "This PostgreSQL RLS policy ensures that a teacher can only submit attendance records for the specific subjects they are assigned to teach. It runs at the database level, making it impossible to bypass via API manipulation."
      }
    ],
    keyModulesBuilt: [
      "Role-Based Access Control Middleware",
      "Attendance Tracking System",
      "Fee Payment Tracking",
      "Academic Marks Management"
    ]
  },

  ch7_challenges: {
    chapterNumber: 7,
    id: "ch7",
    title: "Engineering Challenges",
    subtitle: "Overcoming roadblocks",
    iconName: "ShieldCheck",
    summary: "Building an ERP comes with significant domain complexity, particularly around how data relates to one another and how it should be protected.",
    challengesList: [
      {
        title: "Complex Query Performance",
        symptom: "Loading the attendance dashboard for an entire department was slow.",
        rootCause: "N+1 query issues and lack of composite indexes on the attendance table.",
        resolution: "Created composite indexes on (student_id, subject_id, date) and optimized the join queries to fetch required data in a single round trip."
      },
      {
        title: "Fee Payment Architecture",
        symptom: "Tracking partial fee payments was causing data duplication.",
        rootCause: "Fees and payments were initially grouped in a single table.",
        resolution: "Separated the architecture into 'fees' (total obligation) and 'fee_payments' (individual transactions) to correctly track pending balances."
      }
    ]
  },

  ch8_optimizations: {
    chapterNumber: 8,
    id: "ch8",
    title: "Performance Optimizations",
    subtitle: "Scaling the platform",
    iconName: "Zap",
    summary: "To ensure the system could handle large student datasets without degrading performance, we implemented several key optimizations.",
    optimizationsList: [
      {
        technique: "Server-side Pagination",
        beforeValue: "Loaded 2,000+ students on the client",
        afterValue: "Loads 20 students per page",
        improvementPercentage: "95% less payload size"
      },
      {
        technique: "Database Indexing",
        beforeValue: "Sequential scan on attendance",
        afterValue: "B-Tree Index scan",
        improvementPercentage: "80% faster queries"
      }
    ]
  },

  ch9_results: {
    chapterNumber: 9,
    id: "ch9",
    title: "Project Results",
    subtitle: "Impact of the MVP",
    iconName: "TrendingUp",
    summary: "The Minimum Viable Product successfully achieved its goal of providing a secure, centralized academic management platform.",
    resultsList: [
      {
        metricName: "Security Validation",
        valueAchieved: "100% RLS Coverage",
        industryAverage: "Client-side only",
        businessImpact: "Guaranteed data segregation between students and faculty."
      },
      {
        metricName: "Core Modules",
        valueAchieved: "5 Active Modules",
        industryAverage: "N/A",
        businessImpact: "Centralized Attendance, Marks, Fees, Students, and Faculty management."
      }
    ]
  },

  ch10_lessons: {
    chapterNumber: 10,
    id: "ch10",
    title: "Retrospective",
    subtitle: "Lessons learned",
    iconName: "BookOpen",
    summary: "Building the College ERP reinforced the importance of solid database fundamentals and security-first design.",
    lessons: [
      "Server-side authorization is non-negotiable for security.",
      "Database schema relationships must be designed thoroughly before building complex UI forms.",
      "RLS policies are powerful but require careful consideration to prevent recursive query errors."
    ],
    whatWentWell: [
      "Supabase integration provided rapid authentication scaffolding.",
      "Next.js Server Components eliminated the need for a separate backend API layer."
    ]
  },

  ch11_future: {
    chapterNumber: 11,
    id: "ch11",
    title: "Future Enhancements",
    subtitle: "The roadmap ahead",
    iconName: "Sparkles",
    summary: "The platform's modular design allows for seamless integration of new features as the institution's needs grow.",
    roadmapItems: [
      "Library, Hostel, and Transport Management modules.",
      "Online Fee Payment Integration (Razorpay/Stripe).",
      "Mobile Application for Students.",
      "Multi-tenant SaaS Architecture for supporting multiple colleges."
    ],
    nextMilestones: [
      "V2 Release",
      "Payment Gateway Integration"
    ]
  }
};
\`;

fs.writeFileSync('src/data/projectStoryData.ts', tsContent);
console.log('projectStoryData.ts generated successfully');
