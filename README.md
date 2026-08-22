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

- **Living Portfolio Data Layer**: A single-source-of-truth Firestore backend powering the UI, AI Digital Twin, Hacker Terminal, and Voice Synthesizer simultaneously.
- **Iron Man JARVIS Mission Control (`JarvisMissionControl.tsx`)**: Real-time ticking HUD clock, live weather diagnostics, arc reactor AI core visualizer, and ticking activity feed stream.
- **Cinematic OS Boot Sequence (`OSBootSequence.tsx`)**: 6-second kernel initialization sequence with Web Audio sound synthesis and CRT scanlines.
- **3D Cyber Cosmos Visualizer (`CyberCosmosScene.tsx`)**: Real-time WebGL scene with an interactive wireframe Earth globe, orbiting satellites, and neural network constellation meshes.
- **Zero-Hallucination AI Digital Twin (`AIDigitalTwinWidget.tsx`)**: Grounded Retrieval-Augmented Generation (RAG) assistant supporting text & voice input/output and automated spatial navigation.
- **Secure Admin CMS (`/admin`)**: A fully private, authenticated dashboard to seamlessly publish and manage detailed engineering case studies without code deployments.

---

## 📐 Omnichannel System Architecture

The core of DevOS is its **Living Portfolio Data Layer**. Unlike static sites, data is decoupled into a strictly-typed Firestore database. This enables a robust "Write Once, Render Anywhere" architecture where a single JSON project schema feeds five distinct interfaces.

### Data Flow Pattern

1. **Storage (Firestore):** The highly detailed, strictly typed data model resides securely in Firebase Firestore.
2. **Data Access Layer (Firebase Admin SDK):** `src/services/db/api.ts` safely reads data server-side, never exposing raw database queries to the browser client.
3. **Next.js Server Components:** Receives the serialized data and distributes it to the visual components.
4. **Omnichannel Rendering:**
   - **Visual UI**: Renders beautiful SaaS case study cards and timeline milestones.
   - **AI Digital Twin**: Directly reads the tech stack rationale (e.g., "Why was Firebase chosen?") to answer user questions with zero hallucinations.
   - **Hacker Terminal**: Allows developers to `cat` project files, directly viewing the structural JSON.
   - **Voice Assistant**: Feeds project overviews into Text-To-Speech APIs for dynamic narration.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DEV-OS SYSTEM ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                            ┌─────────────────────┐                          │
│                            │  Private Admin CMS  │                          │
│                            │    (Auth Guarded)   │                          │
│                            └─────────┬───────────┘                          │
│                                      │ (Server Actions)                     │
│                                      ▼                                      │
│                            ┌─────────────────────┐                          │
│                            │  Google Firestore   │ (Single Source of Truth) │
│                            └─────────┬───────────┘                          │
│                                      │                                      │
│                            ┌─────────▼───────────┐                          │
│                            │  Data Access Layer  │ (Firebase Admin SDK)     │
│                            │  Next.js Server API │                          │
│                            └─────────┬───────────┘                          │
│                                      │                                      │
│        ┌────────────────────────┬────┴────┬────────────────────────┐        │
│        ▼                        ▼         ▼                        ▼        │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────────┐        │
│ │  Visual UI   │ │  AI Digital  │ │   Hacker     │ │ Voice Jarvis  │        │
│ │ (Case Studies│ │     Twin     │ │  Terminal    │ │  Synthesizer  │        │
│ │  & Timelines)│ │  (RAG Engine)│ │ (CLI Parser) │ │               │        │
│ └──────────────┘ └──────────────┘ └──────────────┘ └───────────────┘        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Top Bar: Telemetry Status │ Cmd+K Search │ Theme │ Audio FX │ Contact CTA │
├─────────────────────────────────────────────────────────────────────────────┤
│  Footer: Social Links │ Keyboard Guide │ WCAG AA Compliance Indicator       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | React Server Components, API Routes, Edge Routing, Static Optimization |
| **UI Library** | **React 19** | Concurrent Mode, Suspense Boundaries, Custom Hooks |
| **Language** | **TypeScript 5** | Strict Type Safety & Custom Interface Definitions |
| **Styling** | **Tailwind CSS v4** | CSS Variables, Obsidian Dark Tokens, Custom Glassmorphism |
| **Database (Server)**| **Firebase Admin SDK** | Secure Server-side reads, avoiding client-side Firestore exposure |
| **Backend** | **Firebase Firestore v12** | Database for Projects, Timelines, Leadership, Teaching, and Site Settings |
| **Storage** | **Firebase Storage** | Media asset hosting (images, videos, PDFs) avoiding Firestore document bloat |
| **3D Graphics** | **Three.js & React Three Fiber** | WebGL Shaders, Orbit Controls, Mesh Transmission Glass |
| **Animations** | **Framer Motion & GSAP** | Spring Physics, Layout Morphing, Modal Scale Transitions |
| **State Management** | **Zustand 5** | Global State (Audio, Command Palette, Selected Project) |
| **Data Fetching** | **TanStack React Query v5** | Caching, Stale Time Management & API Refetching |
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

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add your Firebase credentials:
```env
# Public Web App
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Server Only (Firebase Admin)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="your_private_key"
```

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
4. In Vercel Project Settings, add all Environment Variables from `.env.local`.
5. Set the Build Command to `npm run build` and Output Directory to `.next`.
6. Click **Deploy**.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

Developed with precision by **[Gurkanwar Singh](https://github.com/GurkanwarSingh56)**.
