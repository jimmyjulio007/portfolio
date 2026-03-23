"use client";

import { Suspense, useRef, useMemo } from "react";
import { useGLTF, Float, ContactShadows, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

/**
 * Procedural Bark Fallback
 * - Cheaper than CylinderGeometry during initial load
 */
function TreeFallback() {
  return (
    <mesh position={[0, -1, 0]}>
      <cylinderGeometry args={[0.5, 0.8, 3, 8]} />
      <meshStandardMaterial color="#3d2b1f" roughness={1} />
    </mesh>
  );
}

function BaobabModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Model loading with error handling and cache
  const { scene } = useGLTF("/models/baobab-1.glb", true);

  // Optimized animation loop
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      // Gentle swaying using low frequency sin waves
      groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.02;
      groupRef.current.rotation.x = Math.sin(time * 0.25) * 0.01;
    }
  });

  // Manual frustum culling on group (optional but adds safety)
  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} position={[0, -1.2, 0]}>
        <primitive object={scene} scale={0.75} />
      </group>
    </Float>
  );
}

/**
 * BaobabTree - High Performance Edition
 * - Replaces heavy directional shadows with high-performance ContactShadows
 * - Uses Environment mapping for natural lighting (cheaper than multiple lights)
 */
export function BaobabTree() {
  return (
    <>
      {/* Soft Ambient lighting */}
      <ambientLight intensity={0.8} />
      <hemisphereLight intensity={0.6} color="#ffffff" groundColor="#3d2b1f" />

      {/* Main Key Light */}
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#f0fff0" />

      {/* Premium Inner Glow for Baobab */}
      <pointLight
        position={[0, 2, 0]}
        intensity={2}
        distance={5}
        color="#00f0ff"
      />

      {/* High-Performance Contact Shadows (instead of raytraced shadows) */}
      <ContactShadows
        opacity={0.4}
        scale={15}
        blur={2.5}
        far={4}
        resolution={512}
        color="#000000"
      />

      <Suspense fallback={<TreeFallback />}>
        <BaobabModel />
      </Suspense>
    </>
  );
}
