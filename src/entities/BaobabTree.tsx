"use client";

import { Suspense, useRef } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function BaobabModel() {
    const groupRef = useRef<THREE.Group>(null);
    const gltf = useGLTF("/models/baobab.glb");

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
                    object={gltf.scene.clone()}
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

            <Suspense fallback={null}>
                <BaobabModel />
            </Suspense>
        </>
    );
}

useGLTF.preload("/models/baobab.glb");
