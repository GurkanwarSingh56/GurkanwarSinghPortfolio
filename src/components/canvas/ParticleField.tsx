"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleField({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // eslint-disable-next-line react-hooks/purity
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a5b4fc"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}
