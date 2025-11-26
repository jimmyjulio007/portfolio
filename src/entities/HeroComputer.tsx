"use client";

import { Suspense, useRef } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ComputerModel({ enableRTX }: { enableRTX: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const gltf = useGLTF("/models/computer_and_laptop.glb");

    useFrame(() => {
        if (groupRef.current) {
            // Very subtle auto-rotation
            groupRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <group ref={groupRef} position={[0, -1, 0]} rotation={[0, -0.3, 0]}>
            <primitive
                object={gltf.scene.clone()}
                scale={0.8}
            />
        </group>
    );
}

export function HeroComputer({ enableRTX = false }: { enableRTX?: boolean }) {
    return (
        <>
            {/* Lighting - Enhanced when RTX is ON */}
            <ambientLight intensity={enableRTX ? 2 : 1.5} />
            <directionalLight
                position={[10, 10, 10]}
                intensity={enableRTX ? 4 : 3}
                castShadow={enableRTX}
                shadow-mapSize-width={enableRTX ? 1024 : 512}
                shadow-mapSize-height={enableRTX ? 1024 : 512}
            />
            <pointLight position={[5, 5, 3]} intensity={enableRTX ? 3 : 2} color="#00f0ff" />

            {enableRTX && (
                <>
                    <pointLight position={[-5, 3, 5]} intensity={2} color="#ccff00" />
                    <spotLight
                        position={[0, 10, 0]}
                        angle={0.4}
                        penumbra={1}
                        intensity={3}
                        castShadow
                    />
                </>
            )}

            {/* Interactive Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.8}
                autoRotate={false}
                rotateSpeed={0.3}
                enableDamping={true}
                dampingFactor={0.05}
            />

            <Suspense fallback={null}>
                <ComputerModel enableRTX={enableRTX} />
            </Suspense>
        </>
    );
}


