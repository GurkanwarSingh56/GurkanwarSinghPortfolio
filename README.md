# DevOS — Senior Staff Developer Studio & SaaS Interactive Portfolio

> A next-generation, high-performance interactive developer portfolio engineered as a **SaaS Product Control Plane** with an Iron Man JARVIS Mission Control dashboard, 3D spatial WebGL visualizers, dynamic real-time telemetries, command line environment, and a Zero-Hallucination AI Digital Twin.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.3.0-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-v12.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

---

## 🌟 Overview

**DevOS** redefines traditional portfolio sites by replacing flat static pages with an **Iron Man JARVIS-inspired spatial Mission Control Control Plane**. Engineered for maximum visual impact and engineering rigor, it features:

- **Iron Man JARVIS Mission Control (`JarvisMissionControl.tsx`)**: Real-time ticking HUD clock, live weather diagnostics, arc reactor AI core visualizer, command protocol triggers, and ticking activity feed stream.
- **Cinematic OS Boot Sequence (`OSBootSequence.tsx`)**: 6-second kernel initialization sequence with Web Audio sound synthesis, CRT scanlines, and one-click `[ESC]` skip persistence.
- **3D Cyber Cosmos Visualizer (`CyberCosmosScene.tsx`)**: Real-time WebGL scene with an interactive wireframe Earth globe, orbiting satellites, neural network constellation mesh, and floating translucent glass polyhedrons reacting to cursor motion.
- **Zero-Hallucination AI Digital Twin (`AIDigitalTwinWidget.tsx`)**: Grounded Retrieval-Augmented Generation (RAG) assistant supporting text & voice input/output, token typing streaming, and automated spatial module navigation.
- **Global Command Matrix (`Cmd + K`) (`CommandPalette.tsx`)**: Accessible search overlay for instant section jumps, project deep-dives, audio FX toggles, and direct priority contract inquiries.
- **Live Telemetry Dashboard (`TelemetryDashboard.tsx`)**: Integrates GitHub REST API & LeetCode API via `@tanstack/react-query` to render live public repos, star count, commit velocity, and algorithmic problem-solving ratings.
- **Interactive Tech Matrix & Pipeline Simulator (`ArchitecturePlayground.tsx`)**: 5-step end-to-end fullstack SaaS architecture pipeline simulator with real-time latency & throughput counters.
- **Real-Time Visitor Guestbook (`GuestbookSection.tsx`)**: Cloud Firestore database integration for live public visitor feedback and reaction badges (🚀, 🔥, ⚡, 💎, 🧠).

---

## 📐 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DEV-OS SYSTEM ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Top Bar: Telemetry Status │ Cmd+K Search │ Theme │ Audio FX │ Contact CTA │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────┐   ┌──────────────────────────────────────┐  │
│  │ 3D Cyber Cosmos Engine    │   │ JARVIS Mission Control HUD           │  │
│  │ Three.js / R3F Canvas     │   │ Arc Reactor Core │ Activity Stream   │  │
│  │ Cyber Earth & Satellites  │   │ Diagnostics │ Direct Protocols       │  │
│  └───────────────────────────┘   └──────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Live Engineering Telemetry Dashboard                                  │  │
│  │ GitHub API Stream (Repos, Stars, YoY Commits) │ LeetCode Stats        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Featured SaaS Projects Showcase & Architecture Drawer                 │  │
│  │ Category Filter Matrix │ Systems Flow Drawer │ Live Demo Links        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────┐   ┌──────────────────────────────────────┐  │
│  │ End-to-End Pipeline Sim   │   │ Zero-Hallucination AI Digital Twin   │  │
│  │ 5-Step Node Simulator     │   │ RAG Knowledge Base │ Voice & Text    │  │
│  └───────────────────────────┘   └──────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────┐   ┌──────────────────────────────────────┐  │
│  │ Developer CLI Shell       │   │ Firebase Realtime Guestbook          │  │
│  │ Command Parser            │   │ Firestore Live Feed & Reactions      │  │
│  └───────────────────────────┘   └──────────────────────────────────────┘  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Footer: Social Links │ Keyboard Guide │ WCAG AA Compliance Indicator       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | React Server Components, Edge Routing, Static Optimization |
| **UI Library** | **React 19** | Concurrent Mode, Suspense Boundaries, Custom Hooks |
| **Language** | **TypeScript 5** | Strict Type Safety & Custom Interface Definitions |
| **Styling** | **Tailwind CSS v4** | CSS Variables, Obsidian Dark Tokens, Custom Glassmorphism |
| **3D Graphics** | **Three.js & React Three Fiber** | WebGL Shaders, Orbit Controls, Mesh Transmission Glass |
| **Animations** | **Framer Motion & GSAP** | Spring Physics, Layout Morphing, Modal Scale Transitions |
| **State Management** | **Zustand 5** | Global State (Audio, Command Palette, Selected Project) |
| **Data Fetching** | **TanStack React Query v5** | Caching, Stale Time Management & API Refetching |
| **Backend & Database**| **Firebase Firestore v12** | Real-time Public Guestbook & Priority Inquiry Form Logs |
| **Search & Command** | **CmdK & Radix Primitives** | Keyboard-accessible Command Palette Overlay (`Cmd + K`) |
| **Audio Engine** | **Web Audio API** | Real-time Synthesized Metallic Micro-Interaction Sounds |

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js**: v20.0.0 or higher
- **npm**: v10.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/GurkanwarSingh56/GurkanwarSinghPortfolio.git
cd GurkanwarSinghPortfolio
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables (Optional)
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
*(Note: If Firebase environment variables are omitted, DevOS automatically falls back to an in-memory storage queue without breaking UI functionality).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🎮 Key Features & Keyboard Shortcuts

- **`Cmd + K` / `Ctrl + K`**: Open Global Command Matrix.
- **`ESC`**: Close active modal, drawer, terminal, or skip the OS boot sequence.
- **`sudo hire`**: Type inside the CLI terminal to trigger the priority recruitment sequence with celebratory confetti.
- **Voice Recognition**: Click the microphone icon inside the AI Digital Twin widget to speak queries directly.
- **Audio FX Toggle**: Click the volume speaker icon in the top header bar to toggle tactile UI sound synthesis on or off.

---

## 🚢 Vercel Deployment Guide

1. Push your code to GitHub.
2. Import your repository into [Vercel](https://vercel.com/).
3. Vercel will automatically detect **Next.js**.
4. Set the Build Command to `npm run build` and Output Directory to `.next`.
5. Click **Deploy**.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

Developed with precision by **[Gurkanwar Singh](https://github.com/GurkanwarSingh56)**.
