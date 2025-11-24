"use client";

import { Suspense, useRef } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Fallback component
function TreeFallback() {
    return (
        <mesh position={[0, -1, 0]}>
            <cylinderGeometry args={[0.5, 0.8, 3, 8]} />
            <meshStandardMaterial color="#8B4513" />
        </mesh>
    );
}

function BaobabModel() {
    const groupRef = useRef<THREE.Group>(null);

    // Use the smaller baobab-1.glb model instead of the 34MB baobab.glb
    // This loads much faster and prevents production failures
    const { scene } = useGLTF("/models/baobab-1.glb", undefined, undefined, (error) => {
        console.warn("Failed to load baobab model:", error);
    });

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.getElapsedTime();
            // Gentle swaying like wind
            groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.03;
            groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.02;
        }
    });

    return (
        <Float
            speed={1}
            rotationIntensity={0.2}
            floatIntensity={0.4}
        >
            <group ref={groupRef} position={[0, -1, 0]}>
                <primitive
                    object={scene.clone()}
                    scale={0.8}
                />
            </group>
        </Float>
    );
}

export function BaobabTree() {
    return (
        <>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 10, 5]} intensity={2.5} color="#85d996" />
            <pointLight position={[-5, 5, -5]} intensity={1.5} color="#ffd700" />

            <Suspense fallback={<TreeFallback />}>
                <BaobabModel />
            </Suspense>
        </>
    );
}

// Preload the smaller model for better performance
if (typeof window !== 'undefined') {
    useGLTF.preload("/models/baobab-1.glb");
}
