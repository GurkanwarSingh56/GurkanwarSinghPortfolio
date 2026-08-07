import { BackgroundCanvas } from "@/components/canvas/BackgroundCanvas";
import { OSBootSequence } from "@/components/boot/OSBootSequence";
import { HeaderNavbar } from "@/components/navbar/HeaderNavbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { JarvisMissionControl } from "@/components/jarvis/JarvisMissionControl";
import { TelemetryDashboard } from "@/components/telemetry/TelemetryDashboard";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { TechMatrixSection } from "@/components/tech/TechMatrixSection";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { GuestbookSection } from "@/components/guestbook/GuestbookSection";
import { Footer } from "@/components/footer/Footer";

import { CommandPalette } from "@/components/command/CommandPalette";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { ContactModal } from "@/components/contact/ContactModal";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
import { AIDigitalTwinWidget } from "@/components/ai/AIDigitalTwinWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 relative selection:bg-indigo-600/30 selection:text-white overflow-x-hidden">
      
      {/* 3D Animated Cyber Cosmos Background Canvas */}
      <BackgroundCanvas />

      {/* Cinematic OS Boot Sequence Overlay */}
      <OSBootSequence />

      {/* Ambient Grid Backdrop */}
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none opacity-30 z-0" />
      <div className="fixed inset-0 bg-ambient-glow pointer-events-none z-0" />

      {/* Main Page Layout Sections */}
      <div className="relative z-10">
        <HeaderNavbar />
        <HeroSection />
        <JarvisMissionControl />
        <TelemetryDashboard />
        <ProjectsSection />
        <TechMatrixSection />
        <ExperienceTimeline />
        <GuestbookSection />
        <Footer />
      </div>

      {/* Interactive Floating SaaS Modals & Overlays */}
      <CommandPalette />
      <ProjectDetailModal />
      <ContactModal />
      <InteractiveTerminal />
      <AIDigitalTwinWidget />

    </main>
  );
}
