"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Vector2,
  Color,
  BufferGeometry,
  BufferAttribute,
  AdditiveBlending,
} from "three";
import type { Points, ShaderMaterial } from "three";
import { Stars, Sparkles } from "@react-three/drei";

/**
 * Optimized Particle System Shader
 * - Uses dot product instead of distance for performance
 * - Avoids pow() where simple multiplication suffice
 * - Precision hints for mobile GPUs
 */
const vertexShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aSpeed;
  
  varying vec3 vColor;
  varying float vGlow;

  void main() {
    vColor = aColor;
    
    vec3 pos = position;
    
    // Gentle spiral motion
    float angle = atan(pos.z, pos.x);
    float dist = length(pos.xz);
    
    // Rotate based on distance from center
    float rotation = uTime * 0.05 * aSpeed;
    float cosA = cos(angle + rotation);
    float sinA = sin(angle + rotation);
    pos.x = cosA * dist;
    pos.z = sinA * dist;
    
    // Gentle vertical oscillation
    pos.y += sin(uTime * aSpeed + dist) * 0.1;
    
    // Mouse repulsion (optimized)
    vec2 toMouse = pos.xz - (uMouse * 10.0);
    float mouseDistSq = dot(toMouse, toMouse);
    if (mouseDistSq < 25.0) { // 5.0 * 5.0
        float mouseDist = sqrt(mouseDistSq);
        float force = (5.0 - mouseDist) * 0.1; // Reduced force for stability
        pos.xz += (toMouse / mouseDist) * force;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size based on distance (optimized for perspective)
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    
    // Glow intensity (linear is cheaper than clamp/exp)
    vGlow = max(0.0, 1.0 - dist * 0.066); // 1.0/15.0 approx 0.066
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec3 vColor;
  varying float vGlow;

  void main() {
    // Faster way to draw a point circle
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float rSq = dot(cxy, cxy);
    
    // Hard discard at radius 1.0 (optimized)
    if (rSq > 1.0) discard;
    
    // Smooth falloff using squared distance
    float strength = 1.0 - rSq;
    strength = strength * strength; // x^2 instead of pow(x, 2.0)
    
    float alpha = strength * vGlow * 0.6;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function HeroObject() {
  const pointsRef = useRef<Points>(null);
  const { mouse } = useThree();
  const smoothMouse = useRef(new Vector2(0, 0));

  // Adaptive particle count: fewer on mobile for better FPS
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  const particleCount = isMobile ? 2000 : 4500;

  const geometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    const color1 = new Color("#00f0ff");
    const color2 = new Color("#0088ff");
    const color3 = new Color("#ccff00");

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 8;
      const spinAngle = radius * 2;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;
      const angle = branchAngle + spinAngle;

      const randomX = (Math.random() - 0.5) * 1.5;
      const randomY = (Math.random() - 0.5) * 3 * (1 - radius / 8);
      const randomZ = (Math.random() - 0.5) * 1.5;

      positions[i * 3] = Math.cos(angle) * radius + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] = Math.sin(angle) * radius + randomZ;

      const colorMix = Math.random();
      let finalColor;
      if (colorMix < 0.5) {
        finalColor = color1.clone().lerp(color2, Math.random());
      } else {
        finalColor = color2.clone().lerp(color3, Math.random());
      }

      colors[i * 3] = finalColor.r;
      colors[i * 3 + 1] = finalColor.g;
      colors[i * 3 + 2] = finalColor.b;

      sizes[i] = Math.random() * 1.5 + 0.3;
      speeds[i] = 0.4 + Math.random() * 0.6;
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setAttribute("aColor", new BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new BufferAttribute(sizes, 1));
    geo.setAttribute("aSpeed", new BufferAttribute(speeds, 1));

    return geo;
  }, [particleCount]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    smoothMouse.current.lerp(mouse, 0.05);

    const material = pointsRef.current.material as ShaderMaterial;
    material.uniforms.uTime.value = time;
    material.uniforms.uMouse.value = smoothMouse.current;

    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <group>
      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 800 : 2000}
        factor={2}
        saturation={0}
        fade
        speed={0.2}
      />

      {!isMobile && (
        <Sparkles
          count={30}
          scale={15}
          size={1.5}
          speed={0.1}
          opacity={0.3}
          color="#00f0ff"
        />
      )}

      <points ref={pointsRef} geometry={geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}
