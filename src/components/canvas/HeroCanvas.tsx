"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { InteractiveSphere } from "./InteractiveSphere";
import { ParticleField } from "./ParticleField";
import { Loader2 } from "lucide-react";

export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Respect user reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLowPerformanceMode(true);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-950/40 rounded-2xl border border-white/10">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  if (lowPerformanceMode) {
    return (
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-2xl glass-panel">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-transparent blur-2xl animate-cyber-pulse" />
        <div className="relative z-10 text-center p-6">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-400 p-1 shadow-2xl shadow-indigo-500/30">
            <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
              <span className="text-3xl font-mono text-cyan-400">AGY</span>
            </div>
          </div>
          <p className="text-xs text-zinc-400 mt-4 font-mono">3D Mesh Simplified (Reduced Motion Active)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[380px] md:min-h-[500px] relative rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl shadow-indigo-950/30 group">
      {/* Ambient Radial Mesh Backdrop */}
      <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent opacity-80 pointer-events-none" />
      
      {/* Live Badge Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-xs font-mono text-cyan-300 border border-cyan-500/30">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>R3F Realtime Engine (60 FPS)</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <InteractiveSphere />
          <ParticleField count={220} />
        </Suspense>
      </Canvas>
    </div>
  );
}
