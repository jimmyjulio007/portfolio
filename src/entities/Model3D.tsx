"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

interface Model3DProps {
    modelPath: string;
    position?: [number, number, number];
    scale?: number;
    rotation?: [number, number, number];
    floatIntensity?: number;
    rotationSpeed?: number;
}

export function Model3D({
    modelPath,
    position = [0, 0, 0],
    scale = 1,
    rotation = [0, 0, 0],
    floatIntensity = 1,
    rotationSpeed = 0.5,
}: Model3DProps) {
    const modelRef = useRef<THREE.Group>(null);

    // Load the GLB model
    const { scene } = useGLTF(modelPath);

    // Gentle rotation animation
    useFrame((state) => {
        if (!modelRef.current) return;
        modelRef.current.rotation.y += 0.002 * rotationSpeed;
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={floatIntensity}
        >
            <group ref={modelRef}>
                <primitive
                    object={scene}
                    position={position}
                    scale={scale}
                    rotation={rotation}
                />
            </group>
        </Float>
    );
}

// Preload models for better performance
export function preloadModel(path: string) {
    useGLTF.preload(path);
}
