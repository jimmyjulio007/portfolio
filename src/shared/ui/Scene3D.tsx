"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type React from "react";

interface Scene3DProps {
    children?: React.ReactNode;
    className?: string;
    enableControls?: boolean;
}

/**
 * 3D Scene wrapper with React Three Fiber
 * Camera pulled back for better view of entire model
 */
export function Scene3D({
    children,
    className = "",
    enableControls = false,
}: Scene3DProps) {
    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 130], fov: 40 }}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance"
                }}
            >
                {children}
                {enableControls && <OrbitControls />}
            </Canvas>
        </div>
    );
}
