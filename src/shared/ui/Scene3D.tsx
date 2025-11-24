"use client";

import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { THREE_CONFIG } from "@/shared/config/constants";
import type React from "react";

interface Scene3DProps {
    children?: React.ReactNode;
    className?: string;
    enableControls?: boolean;
    enablePostProcessing?: boolean;
}

/**
 * 3D Scene wrapper with React Three Fiber
 * Abstraction following Dependency Inversion Principle (SOLID)
 */
export function Scene3D({
    children,
    className = "",
    enableControls = false,
    enablePostProcessing = true,
}: Scene3DProps) {
    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >
                <PerspectiveCamera
                    makeDefault
                    fov={THREE_CONFIG.camera.fov}
                    near={THREE_CONFIG.camera.near}
                    far={THREE_CONFIG.camera.far}
                    position={THREE_CONFIG.camera.position}
                />

                {/* Lighting setup */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <spotLight
                    position={[-10, 10, -5]}
                    intensity={0.5}
                    angle={0.3}
                    penumbra={1}
                    castShadow
                />

                {/* Environment */}
                <Environment preset="city" />

                {/* Scene content */}
                {children}

                {/* Post-processing disabled to prevent errors */}
                {/* {enablePostProcessing && (
                    <EffectComposer>
                        <Bloom
                            intensity={THREE_CONFIG.bloom.intensity}
                            luminanceThreshold={THREE_CONFIG.bloom.luminanceThreshold}
                            luminanceSmoothing={THREE_CONFIG.bloom.luminanceSmoothing}
                        />
                        <Vignette eskil={false} offset={0.1} darkness={0.5} />
                    </EffectComposer>
                )} */}

                {/* Optional controls for debugging */}
                {enableControls && <OrbitControls enableDamping dampingFactor={0.05} />}
            </Canvas>
        </div>
    );
}
