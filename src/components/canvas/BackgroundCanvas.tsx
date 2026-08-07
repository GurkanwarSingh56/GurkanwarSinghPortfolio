"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { CyberCosmosScene } from "./CyberCosmosScene";

export function BackgroundCanvas() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
    }
  }, []);

  if (!mounted || reducedMotion) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-radial from-indigo-900/20 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40 transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <CyberCosmosScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
