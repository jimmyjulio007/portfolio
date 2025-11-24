"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
    Stars,
    Sparkles,
} from "@react-three/drei";

// Simpler, more reliable particle system
const vertexShader = `
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
    pos.x = cos(angle + rotation) * dist;
    pos.z = sin(angle + rotation) * dist;
    
    // Gentle vertical oscillation
    pos.y += sin(uTime * aSpeed + dist) * 0.1;
    
    // Mouse repulsion (very subtle)
    vec2 mousePos = uMouse * 10.0;
    vec2 toMouse = pos.xz - mousePos;
    float mouseDist = length(toMouse);
    if (mouseDist < 5.0) {
        float force = (5.0 - mouseDist) / 5.0;
        pos.xz += normalize(toMouse) * force * 0.5;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size based on distance
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    
    // Glow intensity based on distance from center
    vGlow = 1.0 - clamp(dist / 15.0, 0.0, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vGlow;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 2.0);
    
    // Moderate alpha to prevent blowout
    float alpha = strength * vGlow * 0.6;
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function HeroObject() {
    const pointsRef = useRef<THREE.Points>(null);
    const { mouse } = useThree();
    const smoothMouse = useRef(new THREE.Vector2(0, 0));

    const particleCount = 5000; // Reduced for 120 FPS performance

    const geometry = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const speeds = new Float32Array(particleCount);

        const color1 = new THREE.Color("#00f0ff"); // Cyan
        const color2 = new THREE.Color("#0088ff"); // Blue
        const color3 = new THREE.Color("#ccff00"); // Lime

        for (let i = 0; i < particleCount; i++) {
            // Spiral galaxy distribution
            const radius = Math.random() * 8;
            const spinAngle = radius * 2;
            const branchAngle = ((i % 3) / 3) * Math.PI * 2;

            const angle = branchAngle + spinAngle;

            // Add randomness
            const randomX = (Math.random() - 0.5) * 2;
            const randomY = (Math.random() - 0.5) * 4 * (1 - radius / 8);
            const randomZ = (Math.random() - 0.5) * 2;

            positions[i * 3] = Math.cos(angle) * radius + randomX;
            positions[i * 3 + 1] = randomY;
            positions[i * 3 + 2] = Math.sin(angle) * radius + randomZ;

            // Color mixing
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

            sizes[i] = Math.random() * 2 + 0.5;
            speeds[i] = 0.5 + Math.random() * 0.5;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

        return geo;
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
    }), []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        smoothMouse.current.lerp(mouse, 0.05);

        const material = pointsRef.current.material as THREE.ShaderMaterial;
        material.uniforms.uTime.value = time;
        material.uniforms.uMouse.value = smoothMouse.current;

        // Gentle overall rotation
        pointsRef.current.rotation.y = time * 0.03;
        pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
    });

    return (
        <group>
            {/* Background stars */}
            <Stars
                radius={100}
                depth={50}
                count={3000}
                factor={3}
                saturation={0}
                fade
                speed={0.3}
            />

            {/* Subtle sparkles */}
            <Sparkles
                count={50}
                scale={20}
                size={2}
                speed={0.2}
                opacity={0.4}
                color="#00f0ff"
            />

            {/* Main particle system */}
            <points ref={pointsRef} geometry={geometry}>
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}
