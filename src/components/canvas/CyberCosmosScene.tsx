"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Cyber Earth Globe with Latitude Wireframe & Atmosphere Halo
 */
export function EarthGlobe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.08;
      // Mouse Parallax Sway
      const mouseX = state.pointer.x * 0.4;
      const mouseY = state.pointer.y * 0.4;
      globeRef.current.rotation.x = THREE.MathUtils.lerp(globeRef.current.rotation.x, mouseY, 0.04);
      globeRef.current.rotation.z = THREE.MathUtils.lerp(globeRef.current.rotation.z, mouseX, 0.04);
    }
  });

  return (
    <group ref={globeRef} position={[2.8, -0.5, -2]}>
      {/* Inner Globe Mesh */}
      <Sphere args={[2.2, 32, 32]}>
        <meshStandardMaterial
          color="#090914"
          roughness={0.4}
          metalness={0.8}
          wireframe={false}
        />
      </Sphere>

      {/* Cyber Latitude / Longitude Lines */}
      <Sphere args={[2.25, 24, 24]}>
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.2}
        />
      </Sphere>

      {/* Outer Atmospheric Halo Ring */}
      <Sphere args={[2.5, 32, 32]}>
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Satellite Orbital Trajectory Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[3.2, 3.22, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * Orbiting Satellites Tracing Orbital Paths
 */
export function Satellites() {
  const satelliteGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (satelliteGroupRef.current) {
      satelliteGroupRef.current.rotation.y += delta * 0.25;
      satelliteGroupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={satelliteGroupRef} position={[2.8, -0.5, -2]}>
      {/* Satellite 1 */}
      <mesh position={[3.2, 0, 0]}>
        <boxGeometry args={[0.12, 0.12, 0.2]} />
        <meshBasicMaterial color="#38bdf8" />
        <pointLight color="#38bdf8" intensity={2} distance={3} />
      </mesh>

      {/* Satellite 2 */}
      <mesh position={[-3.2, 0.8, 0]}>
        <octahedronGeometry args={[0.15]} />
        <meshBasicMaterial color="#a855f7" />
        <pointLight color="#a855f7" intensity={2} distance={3} />
      </mesh>
    </group>
  );
}

/**
 * Neural Network Constellation Mesh with Dynamic Line Connections
 */
export function NeuralConstellation({ count = 45 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // eslint-disable-next-line react-hooks/purity
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8
        ),
      });
    }
    return temp;
  }, [count]);

  const linePositions = useMemo(() => {
    const pos: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 3.2) {
          pos.push(nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
          pos.push(nodes[j].position.x, nodes[j].position.y, nodes[j].position.z);
        }
      }
    }
    return new Float32Array(pos);
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 0.5, 0.03);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.pointer.y * 0.5, 0.03);
    }
  });

  return (
    <group ref={groupRef} position={[-2, 0, -1]}>
      {/* Node Spheres */}
      {nodes.map((node, idx) => (
        <mesh key={idx} position={node.position}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#06b6d4" : "#818cf8"} />
        </mesh>
      ))}

      {/* Constellation Connection Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

/**
 * Floating Translucent Glass Polyhedrons
 */
export function FloatingGlassObjects() {
  return (
    <group>
      {/* Glass Tetrahedron 1 */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5} position={[-3.5, 2, -1]}>
        <mesh>
          <tetrahedronGeometry args={[0.8]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.9}
            ior={1.4}
            chromaticAberration={0.06}
            color="#818cf8"
          />
        </mesh>
      </Float>

      {/* Glass Octahedron 2 */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1} position={[3.2, 2.5, -3]}>
        <mesh>
          <octahedronGeometry args={[0.9]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.6}
            roughness={0.15}
            clearcoat={1}
            transmission={0.88}
            ior={1.5}
            chromaticAberration={0.08}
            color="#38bdf8"
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Main Combined Cyber Cosmos Scene Container
 */
export function CyberCosmosScene() {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#818cf8" />
      <pointLight position={[-10, -5, -5]} intensity={1.5} color="#06b6d4" />

      <EarthGlobe />
      <Satellites />
      <NeuralConstellation count={40} />
      <FloatingGlassObjects />
    </group>
  );
}
